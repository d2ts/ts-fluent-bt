import {TimeoutDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

jest.useFakeTimers()

describe('TimeoutDecorator', () => {
  it('should return failed state when timeout is reached', () => {
    const actionNode = new ActionLeaf(() => NodeState.Running)
    const node = new TimeoutDecorator(200, actionNode)

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)

    jest.runAllTimers()

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should return success state when child returns success state', () => {
    const actionNode = new ActionLeaf(() => NodeState.Succeeded)
    const node = new TimeoutDecorator(200, actionNode)

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  each([NodeState.Failed, NodeState.Running]).it(
    'should return running state when child returns state',
    (state) => {
      const actionNode = new ActionLeaf(() => state)
      const node = new TimeoutDecorator(250, actionNode)

      expect(node.tick(testBlackboard)).toBe(NodeState.Running)
    }
  )
})
