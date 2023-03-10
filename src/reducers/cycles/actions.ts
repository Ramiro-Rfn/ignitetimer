import { Cycle } from './reducer'

export enum actionTypes {
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISH = 'MARK_CURRENT_CYCLE_AS_FINISH',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: actionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: actionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleFinishedAction() {
  return {
    type: actionTypes.MARK_CURRENT_CYCLE_AS_FINISH,
  }
}
