import ParentNode from '@/parent-node'
import {Node} from '@/node'
import {NodeState} from '@/enums'

export default abstract class Composite<T> extends ParentNode<T> {
  protected readonly children: Node<T>[] = []
  protected currentChildIndex = 0

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

      if (state === NodeState.Running) {
        return state
      }

      if (this.shouldReturnState(state)) {
        this.reset()

        return state
      }
    }

    this.reset()

    return this.defaultResult
  }

  public registerChild(child: Node<T>): Composite<T> {
    this.children.push(child)

    return this
  }

  protected reset(): void {
    this.currentChildIndex = 0
  }

  protected abstract shouldReturnState(state: NodeState): boolean
  protected abstract get defaultResult(): NodeState
}
