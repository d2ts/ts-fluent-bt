import {Node} from '@/node'

export default abstract class Leaf<T, U> extends Node<T> {
  protected task!: (blackboard: T) => U

  constructor(task?: (blackboard: T) => U) {
    super()

    if (task) {
      this.task = task
    }
  }

  public registerTask(task: (blackboard: T) => U): Leaf<T, U> {
    this.task = task

    return this
  }
}
