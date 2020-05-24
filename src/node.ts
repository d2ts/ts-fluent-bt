import {NodeState} from './enums'

export default abstract class Node<T> {
  public abstract tick(blackBoard: T): NodeState
}
