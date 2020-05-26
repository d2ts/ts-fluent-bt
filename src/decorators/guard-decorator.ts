import Decorator from './decorator'
import {Node} from '@/node'
import {NodeState} from '@/enums'

export class GuardDecorator<T> extends Decorator<T> {
  constructor(private predicate: (blackboard: T) => boolean, child?: Node<T>) {
    super(child)
  }

  public tick(blackBoard: T): NodeState {
    if (!this.predicate(blackBoard)) {
      return NodeState.Failed
    }

    return super.tick(blackBoard)
  }
}
