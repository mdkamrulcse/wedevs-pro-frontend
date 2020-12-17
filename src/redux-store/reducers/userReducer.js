const INITIAL_STATE = {
    user: {}
};

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                user: action.payload
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        default:
            return state;
    }
}

export default userReducer;
