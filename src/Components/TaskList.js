import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index'
class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //all : 0, active: 1, deactive: 0

        }
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });

        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
    }

    render() {
        var { listTask, filterTable, keyword, sort } = this.props;  //lay tu store
        var { filterName, filterStatus } = this.state;

        //Filter
        if (filterTable.name) {
            listTask = listTask.filter(({ name }) => {
                return name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
            })
        }
        if (filterTable.status > -1) {
            listTask = listTask.filter(({ status }) => +status === +filterTable.status)
        }

        //Search
        if (keyword) {
            listTask = listTask.filter(({ name }) => {
                return name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            })
        }

        if (sort.by === 'name') {
            listTask = listTask.sort((a, b) => {
                if (a.name < b.name) return -sort.value;
                else return sort.value
            })
        } else {
            listTask = listTask.sort((a, b) => {
                if (sort.value === 1) return a.status - b.status;
                else return b.status - a.status;
            })
        }


        var elmTask = listTask.map((item, index) => {
            return <TaskItem onUpdate={this.props.onUpdate} key={item.id} index={index} task={item} />
        })
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input name="filterName"
                                onChange={this.onChange}
                                value={filterName} type="text" className="form-control" />
                        </td>
                        <td>
                            <select onChange={this.onChange} name="filterStatus" value={filterStatus} className="form-control">
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {elmTask}
                </tbody>
            </table>
        );
    }
}

// lay state cua store chuyen thanh props
const mapStateToProps = (state) => {
    return {
        listTask: state.tasks, // reducer/tasks
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTable(filter));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);