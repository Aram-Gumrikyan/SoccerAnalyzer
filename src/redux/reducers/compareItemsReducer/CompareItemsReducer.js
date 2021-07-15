function compareItemsReducer(state = [], action) {
    switch (action.type) {
        case "ADD_COMPARE_ITEM": {
            const item = { name: action.payload.name, role: action.payload.role };

            if (state.length === 0) {
                return [item];
            }

            const index = state.length === 1 ? 0 : 1;

            return [state[index], item];
        }
        default: {
            return state;
        }
    }
}
export default compareItemsReducer;
