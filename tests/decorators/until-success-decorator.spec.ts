import {UntilSuccessDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('UntilSuccessDecorator', () => {
  it('should return succeeded state when child returns succeeded state', () => {
    const node = new UntilSuccessDecorator(
      new ActionLeaf(() => NodeState.Succeeded)
    )

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  each([NodeState.Running, NodeState.Failed]).it(
    'should return running state for %s state',
    (state) => {
      const node = new UntilSuccessDecorator(new ActionLeaf(() => state))

      expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    }
  )
})
