import Leaf from '@/leafs/leaf'
import {NodeState} from '@/enums/node-state.enum'

export type ConditionLeafTask<T> = (blackboard: T) => boolean

export class ConditionLeaf<T> extends Leaf<T, boolean> {
  tick(blackBoard: T): NodeState {
    return this.task(blackBoard) ? NodeState.Succeeded : NodeState.Failed
  }
}
