export const increment = () => {
    return {
        type: 'Increment',
        count: 1
    }
}

export const reset = () => {
    return {
        type: 'Reset'
    }
}