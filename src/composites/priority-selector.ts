import {SelectorComposite} from '@/composites'
import {NodeState} from '@/enums'

/**
 * Priority selectors restart child iteration on every tick.
 * See: https://gamedev.stackexchange.com/questions/51693/difference-between-decision-trees-behavior-trees-for-game-ai/51722#51722
 * And: https://www.youtube.com/watch?v=NypZNVNskx4 (I don't think child sequences should also be reset like in the video).
 */
export class PrioritySelector<T> extends SelectorComposite<T> {
  public tick(blackBoard: T): NodeState {
    this.reset()
    return super.tick(blackBoard)
  }
}
