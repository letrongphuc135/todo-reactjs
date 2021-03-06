import * as types from './../contains/ActionType'
export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task  // task : task
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id //id: id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id //id: id
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task //task: task
    }
}

export const filterTable = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter //filter : filter -> filterName, filterStatus
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH,
        keyword 
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT,
        sort //sort : sort -> by, value
    }
}