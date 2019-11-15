function counter(state = 0, action) {
    console.log(action, '1111')
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

export default counter;