const couterReducer = (state = 0, action) => {
    if (action.type === 'Increment') {
        return state + action.count
    } else if (action.type === 'Reset') {
        return state = 0
    }
    return state
}

export default couterReducer