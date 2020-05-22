import {GuardDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'
import each from 'jest-each'

describe('GuardDecorator', () => {
  it('should return failed state if predicate returns false', () => {
    const node = new GuardDecorator(
      () => false,
      new ActionLeaf(() => NodeState.Succeeded)
    )

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should not tick child if predicate returns false', () => {
    const mockAction = jest.fn()
    const node = new GuardDecorator(() => false, new ActionLeaf(mockAction))

    mockAction.mockReturnValue(NodeState.Running)
    node.tick(testBlackboard)

    expect(mockAction).not.toBeCalled()
  })

  it('should tick child if predicate returns true', () => {
    const mockAction = jest.fn()
    const node = new GuardDecorator(() => true, new ActionLeaf(mockAction))

    mockAction.mockReturnValue(NodeState.Running)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalled()
  })

  each([NodeState.Running, NodeState.Failed, NodeState.Succeeded]).it(
    'should return child state if child is ticked',
    (state) => {
      const node = new GuardDecorator(() => true, new ActionLeaf(() => state))

      expect(node.tick(testBlackboard)).toBe(state)
    }
  )
})
