import Decorator from '@/decorators/decorator'
import {NodeState} from '@/enums'

export class InverterDecorator<T> extends Decorator<T> {
  public tick(blackboard: T): NodeState {
    const state = super.tick(blackboard)

    if (state === NodeState.Running) {
      return state
    }

    return state === NodeState.Succeeded
      ? NodeState.Failed
      : NodeState.Succeeded
  }
}
