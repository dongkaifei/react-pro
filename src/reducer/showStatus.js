function counter(state = false, action) {
    console.log(action, '2222')
    switch (action.type) {
        case 'TOGGLE':
            return !state
        default:
            return state
    }
}

export default counter;