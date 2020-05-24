import Decorator from './decorator'
import {NodeState} from '../enums'

export class SucceederDecorator<T> extends Decorator<T> {
  public tick(blackBoard: T): NodeState {
    const state = super.tick(blackBoard)

    return state === NodeState.Running ? NodeState.Running : NodeState.Succeeded
  }
}
