import Composite from '@/composites/composite'
import {NodeState} from '@/enums'

export class SelectorComposite<T> extends Composite<T> {
  protected get defaultResult(): NodeState {
    return NodeState.Failed
  }

  protected shouldReturnState(state: NodeState): boolean {
    return state == NodeState.Running || state == NodeState.Succeeded
  }
}
