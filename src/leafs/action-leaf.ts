import Leaf from '@/leafs/leaf'
import {NodeState} from '@/enums/node-state.enum'

export class ActionLeaf<T> extends Leaf<T, NodeState> {
  tick(blackBoard: T): NodeState {
    return this.task(blackBoard)
  }
}
