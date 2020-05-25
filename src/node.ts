import {NodeState} from './enums'

export abstract class Node<T> {
  public abstract tick(blackBoard: T): NodeState
}
