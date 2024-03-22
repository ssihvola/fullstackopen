const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const stateGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return stateGood
    case 'OK':
      const stateOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
      return stateOk
    case 'BAD':
      const stateBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
      return stateBad
    case 'ZERO':
      const stateZero = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return stateZero
    default: return state
  }
  
}

export default counterReducer
