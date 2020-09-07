import Decorator from './decorator'
import {NodeState} from '@/enums'
import {Node} from '@/node'

export class TimeoutDecorator<T> extends Decorator<T> {
  private timerHandle = 0
  private timeoutReached = false

  constructor(private timeoutMs: number, child?: Node<T>) {
    super(child)
  }

  public tick(blackBoard: T): NodeState {
    if (this.timeoutReached) {
      this.reset()

      return NodeState.Failed
    }

    if (!this.timerHandle) {
      this.setTimer()
    }

    const state = super.tick(blackBoard)

    if (state === NodeState.Succeeded) {
      this.reset()

      return state
    }

    return NodeState.Running
  }

  private setTimer() {
    this.timerHandle = setTimeout(() => {
      this.timeoutReached = true
    }, this.timeoutMs) as any
  }

  private reset() {
    clearTimeout(this.timerHandle as any)
    this.timerHandle = 0
    this.timeoutReached = false
  }
}
