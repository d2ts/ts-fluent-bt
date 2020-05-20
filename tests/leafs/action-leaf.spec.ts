import each from 'jest-each'
import {NodeState} from '@/enums'
import {ActionLeaf} from '@/leafs'
import {testBlackboard} from '@test/test-blackboard'

describe('ActionLeaf', () => {
  each([NodeState.Succeeded, NodeState.Running, NodeState.Failed]).it(
    'should return the correct state',
    (state) => {
      const node = new ActionLeaf(() => state)

      expect(node.tick(testBlackboard)).toBe(state)
    }
  )
})
