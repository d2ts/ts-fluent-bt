import {UntilFailDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('UntilFailDecorator', () => {
  it('should return succeeded state when child returns failed state', () => {
    const node = new UntilFailDecorator(new ActionLeaf(() => NodeState.Failed))

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  each([NodeState.Succeeded, NodeState.Running]).it(
    'should return running state for %s state',
    (state) => {
      const node = new UntilFailDecorator(new ActionLeaf(() => state))

      expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    }
  )
})
