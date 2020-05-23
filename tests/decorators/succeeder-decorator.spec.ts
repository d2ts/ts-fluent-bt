import each from 'jest-each'
import {SucceederDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'

describe('SucceederDecorator', () => {
  it('should return running state when child returns running state', () => {
    const node = new SucceederDecorator(new ActionLeaf(() => NodeState.Running))

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
  })

  each([NodeState.Succeeded, NodeState.Failed]).it(
    'should return succeeded state when child returns %s state',
    (state) => {
      const node = new SucceederDecorator(new ActionLeaf(() => state))

      expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    }
  )
})
