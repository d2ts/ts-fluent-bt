import {InverterDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'

describe('InverterDecorator', () => {
  it('should return running state when child returns running state', () => {
    const node = new InverterDecorator(new ActionLeaf(() => NodeState.Running))

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
  })

  it('should return failed state when child returns succeeded state', () => {
    const node = new InverterDecorator(
      new ActionLeaf(() => NodeState.Succeeded)
    )

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should return succeeded state when child returns failed state', () => {
    const node = new InverterDecorator(new ActionLeaf(() => NodeState.Failed))

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })
})
