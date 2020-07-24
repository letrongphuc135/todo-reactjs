import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';
class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
        
    }

    onUpdate = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
    render() {
        var {task, index} = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={(task.status === true ? 'badge badge-success' : 'badge badge-danger')}>
                    {(task.status === true ? 'Kich hoat': 'An')}
            </span>
                </td>
                <td className="text-center">
                    <button  type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5" />Sửa
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Xóa
            </button>
                </td>
            </tr>
        );
    }
}

//mapStateToProps : chuyển state từ store thành props của component
const mapStateToProps = (state) => {
    return {}
}

//mapDispatchToProps : chuyển các action thành props.
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
