import {Node} from './node'

export default abstract class ParentNode<T> extends Node<T> {
  public abstract registerChild(child: Node<T>): ParentNode<T>
}
