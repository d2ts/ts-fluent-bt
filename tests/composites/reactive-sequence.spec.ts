import {ReactiveSequence} from '@/composites'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('ReactiveSequence', () => {
  it('should return succeeded state if all children return succeeded state', () => {
    const node = new ReactiveSequence([
      new ActionLeaf(() => NodeState.Succeeded),
      new ActionLeaf(() => NodeState.Succeeded),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should restart children iteration when child returns running state', () => {
    const mockFirstTask = jest.fn()

    mockFirstTask.mockReturnValue(NodeState.Succeeded)

    const mockMiddleTask = jest.fn()

    mockMiddleTask
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Succeeded)

    const mockFinalTask = jest.fn()

    mockFinalTask.mockReturnValue(NodeState.Succeeded)

    const node = new ReactiveSequence([
      new ActionLeaf(mockFirstTask),
      new ActionLeaf(mockMiddleTask),
      new ActionLeaf(mockFinalTask),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    expect(mockFirstTask).toBeCalledTimes(2)
    expect(mockMiddleTask).toBeCalledTimes(2)
    expect(mockFinalTask).toBeCalledTimes(1)
  })

  it('should restart children iteration when child returns failed state', () => {
    const mockSuccess = jest.fn()
    const mockFailure = jest.fn()
    const mockFinalNode = jest.fn()

    mockSuccess.mockReturnValue(NodeState.Succeeded)
    mockFailure
      .mockReturnValueOnce(NodeState.Failed)
      .mockReturnValueOnce(NodeState.Succeeded)
    mockFinalNode.mockReturnValue(NodeState.Succeeded)

    const node = new ReactiveSequence([
      new ActionLeaf(mockSuccess),
      new ActionLeaf(mockFailure),
      new ActionLeaf(mockFinalNode),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    expect(mockSuccess).toBeCalledTimes(2)
    expect(mockFailure).toBeCalledTimes(2)
    expect(mockFinalNode).toBeCalledTimes(1)
  })

  each([[NodeState.Failed], [NodeState.Running]]).it(
    'should return immediately when child returns %s state',
    (state) => {
      const mockTask = jest.fn()

      mockTask.mockReturnValue(NodeState.Failed)

      const node = new ReactiveSequence([
        new ActionLeaf(() => NodeState.Succeeded),
        new ActionLeaf(() => state),
        new ActionLeaf(mockTask),
      ])

      expect(node.tick(testBlackboard)).toBe(state)
      expect(mockTask).not.toBeCalled()
    }
  )
})
