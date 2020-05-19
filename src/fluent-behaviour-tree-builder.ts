import ParentNode from '@/parent-node'
import Node from '@/node'
import {SelectorComposite, SequenceComposite} from '@/composites'

export class FluentBehaviourTreeBuilder<T> {
  // Needs to be a union with undefined due to the Array.pop method.
  private currentParentNode!: ParentNode<T> | undefined
  private readonly parentNodeStack: ParentNode<T>[] = []

  public sequence(): FluentBehaviourTreeBuilder<T> {
    return this.registerParent(new SequenceComposite<T>())
  }

  public selector(): FluentBehaviourTreeBuilder<T> {
    return this.registerParent(new SelectorComposite<T>())
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
