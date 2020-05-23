import {RetryDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'

describe('RetryDecorator', () => {
  it('should retry as long as child returns failed state', () => {
    const mockAction = jest.fn()
    const node = new RetryDecorator(3, new ActionLeaf(mockAction))

    mockAction.mockReturnValue(NodeState.Failed)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(3)
  })

  it('should return succeeded state when child returns succeeded state', () => {
    const node = new RetryDecorator(
      3,
      new ActionLeaf(() => NodeState.Succeeded)
    )

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should return to parent when child returns succeeded state', () => {
    const mockAction = jest.fn()
    const node = new RetryDecorator(3, new ActionLeaf(mockAction))

    mockAction
      .mockReturnValueOnce(NodeState.Failed)
      .mockReturnValueOnce(NodeState.Succeeded)
      .mockReturnValueOnce(NodeState.Failed)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(2)
  })

  it('should return to parent when child returns running state', () => {
    const mockAction = jest.fn()
    const node = new RetryDecorator(3, new ActionLeaf(mockAction))

    mockAction
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Failed)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(1)
  })

  it('should return running state when child returns running state', () => {
    const node = new RetryDecorator(3, new ActionLeaf(() => NodeState.Running))

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
  })
})
