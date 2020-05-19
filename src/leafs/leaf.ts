import Node from '@/node'

export default abstract class Leaf<T, U> extends Node<T> {
  protected task!: (blackboard: T) => U

  public registerTask(task: (blackboard: T) => U): Node<T> {
    this.task = task

    return this
  }
}
