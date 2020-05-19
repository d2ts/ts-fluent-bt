import Composite from '@/composites/composite'
import {NodeState} from '@/enums/node-state.enum'

export class SequenceComposite<T> extends Composite<T> {
  protected get defaultResult(): NodeState {
    return NodeState.Succeeded
  }

  protected shouldReturnState(state: NodeState): boolean {
    return state === NodeState.Failed || state === NodeState.Running
  }
}
