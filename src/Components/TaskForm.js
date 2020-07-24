import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }


    componentWillMount() {
        if (this.props.itemEditing) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        } else if (!nextProps.itemEditing) {
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }


    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if (name === 'status') {
            value = event.target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSave = (event) => {
        event.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onSaveTask(this.state)
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.state.id ? 'Sửa công việc' : 'Thêm Công Việc'}</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input value={this.state.name} name="name" onChange={this.isChange} type="text" className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select onChange={this.isChange}
                            value={this.state.status}
                            name="status" className="form-control" required="required">
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={() => this.props.onCloseForm()}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

//mapStateToProps : chuyển state từ store thành props của component
const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    }
}

//mapDispatchToProps : chuyển các action thành props.
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);