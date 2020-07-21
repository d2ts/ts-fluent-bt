import {SequenceComposite} from '@/composites'
import {NodeState} from '@/enums'

/**
 * Reactive sequences tick all their children on every tick no matter what is returned by a child.
 * This is essentially the sequence version of priority selectors.
 */
export class ReactiveSequence<T> extends SequenceComposite<T> {
  public tick(blackboard: T): NodeState {
    this.reset()
    return super.tick(blackboard)
  }
}
