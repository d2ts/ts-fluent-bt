import {ConditionLeaf} from '@/leafs'
import {testBlackboard} from '@test/test-blackboard'
import {NodeState} from '@/enums'

describe('ConditionLeaf', () => {
  it('should return succeeded state if task returns true', () => {
    const node = new ConditionLeaf(() => true)

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should return failed state if task returns false', () => {
    const node = new ConditionLeaf(() => false)

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })
})
