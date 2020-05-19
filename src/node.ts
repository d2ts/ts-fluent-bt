import {NodeState} from '@/enums/node-state.enum'

export default abstract class Node<T> {
  public abstract tick(blackBoard: T): NodeState
}
