import Decorator from '@/decorators/decorator'
import {NodeState} from '@/enums/node-state.enum'

export class SucceederDecorator<T> extends Decorator<T> {
  public tick(blackBoard: T): NodeState {
    this.child.tick(blackBoard)

    return NodeState.Succeeded
  }
}
