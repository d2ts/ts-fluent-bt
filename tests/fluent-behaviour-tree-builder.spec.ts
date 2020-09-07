import {FluentBehaviourTreeBuilder} from '@/fluent-behaviour-tree-builder'
import {testBlackboard, TestBlackboard} from '@test/test-blackboard'
import {NodeState} from '@/enums'
import {ActionLeaf} from '@/leafs'

describe('FluentBehaviourTreeBuilder', () => {
  const createBuilder = (): FluentBehaviourTreeBuilder<TestBlackboard> =>
    new FluentBehaviourTreeBuilder()

  it('should throw an error when `end` is called without registering a parent node', () => {
    const builder = createBuilder()

    expect(builder.end).toThrowError()
  })

  it('should execute a sequence', () => {
    const builder = createBuilder()
    const mockAction = jest.fn()
    const mockCondition = jest.fn()

    mockAction.mockReturnValue(NodeState.Succeeded)
    mockCondition.mockReturnValue(true)

    const tree = builder
      .sequence()
      .condition(mockCondition)
      .action(mockAction)
      .end()
      .build()

    tree.tick(testBlackboard)

    expect(mockCondition).toBeCalled()
    expect(mockAction).toBeCalled()
  })

  it('should execute a selector', () => {
    const builder = createBuilder()
    const mockCondition = jest.fn()
    const mockAction = jest.fn()

    mockCondition.mockReturnValue(false)
    mockAction.mockReturnValue(NodeState.Running)

    const tree = builder
      .selector()
      .condition(mockCondition)
      .action(mockAction)
      .end()
      .build()

    tree.tick(testBlackboard)

    expect(mockCondition).toBeCalled()
    expect(mockAction).toBeCalled()
  })

  it('should execute a inverter', () => {
    const builder = createBuilder()
    const tree = builder
      .invert()
      .action((blackboard) => NodeState.Succeeded)
      .end()
      .build()

    expect(tree.tick(testBlackboard)).toBe(NodeState.Failed)
  })

  it('should execute a inserted subtree', () => {
    const builder = createBuilder()
    const mockCondition = jest.fn()
    const mockAction = jest.fn()

    mockCondition.mockReturnValue(false)
    mockAction.mockReturnValue(NodeState.Running)

    const subTree = builder
      .selector()
      .condition(mockCondition)
      .action(mockAction)
      .end()
      .build()
    const tree = builder.sequence().insert(subTree).end().build()

    tree.tick(testBlackboard)

    expect(mockCondition).toBeCalled()
    expect(mockAction).toBeCalled()
  })
})
