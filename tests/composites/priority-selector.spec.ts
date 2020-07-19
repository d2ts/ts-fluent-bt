import {PrioritySelector} from '@/composites'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('PrioritySelector', () => {
  it('should return failed state if all children return failed state', () => {
    const node = new PrioritySelector([
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(() => NodeState.Failed),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should restart children iteration every tick', () => {
    const mockTask = jest.fn()

    mockTask
      .mockReturnValueOnce(NodeState.Failed)
      .mockReturnValueOnce(NodeState.Running)

    const mockMiddleTask = jest.fn()

    mockMiddleTask
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Failed)

    const node = new PrioritySelector([
      new ActionLeaf(mockTask),
      new ActionLeaf(mockMiddleTask),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(mockTask).toBeCalledTimes(2)
    expect(mockMiddleTask).toBeCalledTimes(1)
  })

  each([[NodeState.Succeeded], [NodeState.Running]]).it(
    'should return immediately when child returns %s state',
    (state) => {
      const mockTask = jest.fn()

      mockTask.mockReturnValue(NodeState.Succeeded)

      const node = new PrioritySelector([
        new ActionLeaf(() => NodeState.Failed),
        new ActionLeaf(() => state),
        new ActionLeaf(mockTask),
      ])

      expect(node.tick(testBlackboard)).toBe(state)
      expect(mockTask).not.toBeCalled()
    }
  )
})
