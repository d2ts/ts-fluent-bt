import Decorator from '@/decorators/decorator'
import {NodeState} from '@/enums/node-state.enum'

export class SucceederDecorator<T> extends Decorator<T> {
  public tick(blackBoard: T): NodeState {
    const state = super.tick(blackBoard)

    return state === NodeState.Running ? NodeState.Running : NodeState.Succeeded
  }
}
