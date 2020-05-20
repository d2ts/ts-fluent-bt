import each from 'jest-each'
import {SucceederDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'

describe('SucceederDecorator', () => {
  each([NodeState.Succeeded, NodeState.Failed, NodeState.Running]).it(
    'should return succeeded state when child returns %s state',
    (state) => {
      const node = new SucceederDecorator(new ActionLeaf(() => state))

      expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
    }
  )
})
