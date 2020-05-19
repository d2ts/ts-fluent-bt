import ParentNode from '@/parent-node'
import Node from '@/node'
import {NodeState} from '@/enums/node-state.enum'

export default abstract class Decorator<T> extends ParentNode<T> {
  protected child!: Node<T>

  public registerChild(child: Node<T>): ParentNode<T> {
    if (this.child) {
      throw new RangeError('Decorators can register only one child node.')
    }

    this.child = child

    return this
  }

  public tick(blackBoard: T): NodeState {
    if (!this.child) {
      throw new Error('Decorators must register a child node.')
    }

    return this.child.tick(blackBoard)
  }
}
