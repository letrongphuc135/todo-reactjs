import * as types from '../contains/ActionType'


var initialState = {
    by: '',
    value: 1 // 1 tăng dần, - 1 là giảm dần
};
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                by : action.sort.by,
                value: action.sort.value
            }
        default:
            return state;
    }

}

export default myReducer;