import Decorator from './decorator'
import {NodeState} from '@/enums'

export class UntilFailDecorator<T> extends Decorator<T> {
  public tick(blackBoard: T): NodeState {
    const state = super.tick(blackBoard)

    return state === NodeState.Failed ? NodeState.Succeeded : NodeState.Running
  }
}
