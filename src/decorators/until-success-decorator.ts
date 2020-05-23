import Decorator from '@/decorators/decorator'
import {NodeState} from '@/enums'

export class UntilSuccessDecorator<T> extends Decorator<T> {
  public tick(blackBoard: T): NodeState {
    const state = super.tick(blackBoard)

    return state === NodeState.Succeeded
      ? NodeState.Succeeded
      : NodeState.Running
  }
}
