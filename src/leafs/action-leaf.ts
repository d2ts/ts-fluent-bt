import Leaf from './leaf'
import {NodeState} from '../enums'

export type ActionLeafTask<T> = (blackboard: T) => NodeState

export class ActionLeaf<T> extends Leaf<T, NodeState> {
  tick(blackBoard: T): NodeState {
    return this.task(blackBoard)
  }
}
