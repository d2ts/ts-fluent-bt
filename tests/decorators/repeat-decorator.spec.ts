import {RepeatDecorator} from '@/decorators'
import {ActionLeaf} from '@/leafs'
import {NodeState} from '@/enums'
import {testBlackboard} from '@test/test-blackboard'

describe('RepeatDecorator', () => {
  it('should repeat as long as child returns success state', () => {
    const mockAction = jest.fn()
    const node = new RepeatDecorator(3, new ActionLeaf(mockAction))

    mockAction.mockReturnValue(NodeState.Succeeded)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(3)
  })

  it('should return succeeded state when child returns succeeded state', () => {
    const node = new RepeatDecorator(
      3,
      new ActionLeaf(() => NodeState.Succeeded)
    )

    expect(node.tick(testBlackboard)).toBe(NodeState.Succeeded)
  })

  it('should return to parent when child returns failed state', () => {
    const mockAction = jest.fn()
    const node = new RepeatDecorator(3, new ActionLeaf(mockAction))

    mockAction
      .mockReturnValueOnce(NodeState.Succeeded)
      .mockReturnValueOnce(NodeState.Failed)
      .mockReturnValueOnce(NodeState.Succeeded)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(2)
  })

  it('should return failed state when child returns failed state', () => {
    const node = new RepeatDecorator(3, new ActionLeaf(() => NodeState.Failed))

    expect(node.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should return to parent when child returns running state', () => {
    const mockAction = jest.fn()
    const node = new RepeatDecorator(3, new ActionLeaf(mockAction))

    mockAction
      .mockReturnValueOnce(NodeState.Running)
      .mockReturnValueOnce(NodeState.Succeeded)
    node.tick(testBlackboard)

    expect(mockAction).toBeCalledTimes(1)
  })

  it('should return running state when child returns running state', () => {
    const node = new RepeatDecorator(3, new ActionLeaf(() => NodeState.Running))

    expect(node.tick(testBlackboard)).toBe(NodeState.Running)
  })
})
