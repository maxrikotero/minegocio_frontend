const characterReducer = (state:any = {list : []}, action: any) => {
    switch (action.type) {
        case 'ADD_CHARACTER':
            return {
                ...state,
                list: state.list.some((char: any)=> char.id === action.data.id) ? state.list : state.list.concat(action.data)
            }
            break;
        case "REMOVE_CHARACTER":
            return {
                ...state,
                list: state.list.filter((tag: any) => tag !== action.data)
            }
        default:
            return state
            break;
    }
}

export default characterReducer;