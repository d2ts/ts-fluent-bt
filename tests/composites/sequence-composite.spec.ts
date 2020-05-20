import {SelectorComposite, SequenceComposite} from '@/composites'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('SequenceComposite', () => {
  it('should return succeeded state if all children return succeeded state', () => {
    const node = new SequenceComposite([
      new ActionLeaf(() => NodeState.Succeeded),
      new ActionLeaf(() => NodeState.Succeeded),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should return running state until child returns succeeded', () => {
    const node = new SelectorComposite([
      new ActionLeaf(() => NodeState.Succeeded),
      new ActionLeaf(() => NodeState.Running),
      new ActionLeaf(() => NodeState.Running),
      new ActionLeaf(() => NodeState.Succeeded),
    ])

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  each([[NodeState.Failed], [NodeState.Running]]).it(
    'should return immediately when child returns %s state',
    (state) => {
      const mockTask = jest.fn()

      mockTask.mockReturnValue(NodeState.Failed)

      const node = new SequenceComposite([
        new ActionLeaf(() => NodeState.Succeeded),
        new ActionLeaf(() => state),
        new ActionLeaf(mockTask),
      ])

      expect(node.tick(testBlackboard)).toBe(state)
      expect(mockTask).not.toBeCalled()
    }
  )
})
