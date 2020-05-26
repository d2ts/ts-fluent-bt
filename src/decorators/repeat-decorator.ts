import Decorator from './decorator'
import {NodeState} from '@/enums'
import {Node} from '@/node'

export class RepeatDecorator<T> extends Decorator<T> {
  public static REPEAT_INFINITE = -1
  private counter = 0

  constructor(private repeatAmount: number, child?: Node<T>) {
    super(child)
  }

  public tick(blackBoard: T): NodeState {
    while (
      this.counter < this.repeatAmount ||
      this.repeatAmount === RepeatDecorator.REPEAT_INFINITE
    ) {
      const state = super.tick(blackBoard)

      switch (state) {
        case NodeState.Succeeded:
          this.counter += 1

          break
        case NodeState.Failed:
          this.counter = 0

          return NodeState.Failed
        case NodeState.Running:
          return NodeState.Running
      }
    }

    this.counter = 0

    return NodeState.Succeeded
  }
}
