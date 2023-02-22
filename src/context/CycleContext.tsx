import { createContext, ReactNode, useReducer, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleFinished: () => void
  amountSecondsPast: number
  setSecondsPast: (second: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  cycles: Cycle[]
}

export const CycleContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
  children: ReactNode
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null,
        }
      }

      return state
    },
    { cycles: [], activeCycleId: null },
  )

  const { cycles, activeCycleId } = cyclesState

  const [amountSecondsPast, setAmountSecondsPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: CreateCycleData) {
    const id = String(Date.now())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    // setCycles((state) => [...state, newCycle])
    setAmountSecondsPast(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        data: activeCycleId,
      },
    })
    /* setCycles((state) =>
      ,
    ) */
  }

  function markCurrentCycleFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISH',
      payload: {
        data: activeCycleId,
      },
    })

    /* setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    ) */
  }

  function setSecondsPast(second: number) {
    setAmountSecondsPast(second)
  }

  return (
    <CycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleFinished,
        amountSecondsPast,
        setSecondsPast,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
