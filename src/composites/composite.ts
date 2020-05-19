import ParentNode from '@/parent-node'
import Node from '@/node'
import {NodeState} from '@/enums/node-state.enum'

export default abstract class Composite<T> extends ParentNode<T> {
  private readonly children: Node<T>[] = []
  private currentChildIndex = 0

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

    this.currentChildIndex = -1

    return this.defaultResult
  }

  public registerChild(child: Node<T>): ParentNode<T> {
    this.children.push(child)

    return this
  }

  protected abstract shouldReturnState(state: NodeState): boolean
  protected abstract get defaultResult(): NodeState
}
