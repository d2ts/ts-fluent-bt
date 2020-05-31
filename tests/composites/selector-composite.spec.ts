import {SelectorComposite} from '@/composites'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('SelectorComposite', () => {
  it('should return failed state if all children return failed state', () => {
    const node = new SelectorComposite([
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(() => NodeState.Failed),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should re-execute nodes that return a running state', () => {
    const mockTask = jest.fn()

    mockTask
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Succeeded)

    const node = new SelectorComposite([
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(mockTask),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should restart children iteration when child returns succeeded state', () => {
    const mockSuccess = jest.fn()
    const mockFailure = jest.fn()
    const mockFinalNode = jest.fn()

    mockSuccess.mockReturnValue(NodeState.Failed)
    mockFailure
      .mockReturnValueOnce(NodeState.Succeeded)
      .mockReturnValueOnce(NodeState.Failed)
    mockFinalNode.mockReturnValue(NodeState.Succeeded)

    const node = new SelectorComposite([
      new ActionLeaf(mockSuccess),
      new ActionLeaf(mockFailure),
      new ActionLeaf(mockFinalNode),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    expect(mockSuccess).toBeCalledTimes(2)
    expect(mockFailure).toBeCalledTimes(2)
    expect(mockFinalNode).toBeCalledTimes(1)
  })

  each([[NodeState.Succeeded], [NodeState.Running]]).it(
    'should return immediately when child returns %s state',
    (state) => {
      const mockTask = jest.fn()

      mockTask.mockReturnValue(NodeState.Succeeded)

      const node = new SelectorComposite([
        new ActionLeaf(() => NodeState.Failed),
        new ActionLeaf(() => state),
        new ActionLeaf(mockTask),
      ])

      expect(node.tick(testBlackboard)).toBe(state)
      expect(mockTask).not.toBeCalled()
    }
  )
})
