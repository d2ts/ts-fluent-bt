import Decorator from './decorator'
import {Node} from '@/node'
import {NodeState} from '@/enums'

export class RetryDecorator<T> extends Decorator<T> {
  public static RETRY_INFINITE = -1
  private counter = 0

  constructor(private retryAmount: number, child?: Node<T>) {
    super(child)
  }

  public tick(blackBoard: T): NodeState {
    while (
      this.counter < this.retryAmount ||
      this.retryAmount === RetryDecorator.RETRY_INFINITE
    ) {
      const state = super.tick(blackBoard)

      switch (state) {
        case NodeState.Succeeded:
          this.counter = 0

          return NodeState.Succeeded
        case NodeState.Failed:
          this.counter += 1

          break
        case NodeState.Running:
          return NodeState.Running
      }
    }

    this.counter = 0

    return NodeState.Failed
  }
}
