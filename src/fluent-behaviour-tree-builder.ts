import ParentNode from './parent-node'
import {Node} from './node'
import {SelectorComposite, SequenceComposite} from './composites'
import {
  ActionLeaf,
  ActionLeafTask,
  ConditionLeaf,
  ConditionLeafTask,
} from './leafs'

export class FluentBehaviourTreeBuilder<T> {
  // Needs to be a union with undefined due to the Array.pop method.
  private currentParentNode!: ParentNode<T> | undefined
  private readonly parentNodeStack: ParentNode<T>[] = []

  public action(
    task: ActionLeaf<T> | ActionLeafTask<T>
  ): FluentBehaviourTreeBuilder<T>
  public action(task: ActionLeafTask<T>): FluentBehaviourTreeBuilder<T> {
    if (task instanceof ActionLeaf) {
      return this.registerChild(task)
    }

    return this.registerChild(new ActionLeaf(task))
  }

  public condition(
    task: ConditionLeaf<T> | ConditionLeafTask<T>
  ): FluentBehaviourTreeBuilder<T>
  public condition(task: ConditionLeafTask<T>): FluentBehaviourTreeBuilder<T> {
    if (task instanceof ConditionLeaf) {
      return this.registerChild(task)
    }

    return this.registerChild(new ConditionLeaf(task))
  }

  public sequence(): FluentBehaviourTreeBuilder<T> {
    return this.registerParent(new SequenceComposite())
  }

  public selector(): FluentBehaviourTreeBuilder<T> {
    return this.registerParent(new SelectorComposite())
  }

  public end(): FluentBehaviourTreeBuilder<T> {
    if (!this.parentNodeStack.length) {
      throw new RangeError(
        'You must register a parent node before calling end.'
      )
    }

    this.currentParentNode = this.parentNodeStack.pop()

    return this
  }

  public insert(subTree: Node<T>): FluentBehaviourTreeBuilder<T> {
    return this.registerChild(subTree)
  }

  public build(): Node<T> {
    if (!this.currentParentNode) {
      throw new ReferenceError(
        'You must register a parent node before calling end.'
      )
    }

    return this.currentParentNode
  }

  public createAction(task: ActionLeafTask<T>): ActionLeaf<T> {
    return new ActionLeaf(task)
  }

  public createCondition(task: ConditionLeafTask<T>): ConditionLeaf<T> {
    return new ConditionLeaf(task)
  }

  private registerChild(node: Node<T>): FluentBehaviourTreeBuilder<T> {
    this.peekParentNode().registerChild(node)

    return this
  }

  private registerParent(node: ParentNode<T>): FluentBehaviourTreeBuilder<T> {
    if (this.parentNodeStack.length) {
      this.peekParentNode().registerChild(node)
    }

    this.parentNodeStack.push(node)

    return this
  }

  private peekParentNode(): ParentNode<T> {
    return this.parentNodeStack[this.parentNodeStack.length - 1]
  }
}
