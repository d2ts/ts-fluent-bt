import ParentNode from '@/parent-node'
import {Node} from '@/node'
import {NodeState} from '@/enums'

export default abstract class Composite<T> extends ParentNode<T> {
  private readonly children: Node<T>[] = []
  private currentChildIndex = 0

  constructor(children?: Node<T>[]) {
    super()

    if (children) {
      this.children = children
    }
  }

  public tick(blackBoard: T): NodeState {
    for (
      ;
      this.currentChildIndex < this.children.length;
      this.currentChildIndex += 1
    ) {
      const state = this.children[this.currentChildIndex].tick(blackBoard)

      if (this.shouldReturnState(state)) {
        this.currentChildIndex += 1

        return state
      }
    }

    this.currentChildIndex = 0

    return this.defaultResult
  }

  public registerChild(child: Node<T>): Composite<T> {
    this.children.push(child)

    return this
  }

  protected abstract shouldReturnState(state: NodeState): boolean
  protected abstract get defaultResult(): NodeState
}
