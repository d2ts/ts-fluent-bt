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

  it('should return running state until child returns succeeded', () => {
    const node = new SelectorComposite([
      new ActionLeaf(() => NodeState.Failed),
      new ActionLeaf(() => NodeState.Running),
      new ActionLeaf(() => NodeState.Running),
      new ActionLeaf(() => NodeState.Running),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
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
