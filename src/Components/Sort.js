import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './../actions/index'

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state ={
            sort:{
                by: 'name',
                value: 1
            }
        }
    }
    

    // sort = async (sortName, sortValue) => {
    //     await this.setState({
    //         sort: {
    //             by: sortName,
    //             value: sortValue
    //         }
    //     })
    //     this.props.onSort(this.state.sort);
    // }

    sort = (sortName, sortValue) => {
        this.props.onSort({
            by: sortName,
           value: sortValue
        });
    }

    render() {
        console.log(this.props.sort);
        var {sort} = this.props;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-3" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.sort('name', 1)}>
                            <div role="button">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                                <i className={(sort.by==='name'&& sort.value===1)?'fa fa-check float-right':''}/>
                            </div>
                        </li>
                        <li onClick={() => this.sort('name', -1)}>
                            <div  role="button">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                                <i className={(sort.by==='name'&& sort.value=== -1)?'fa fa-check float-right':''}/>
                            </div>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => this.sort('status', 1)}>
                            <div  role="button">Trạng Thái Kích Hoạt <i className={(sort.by==='status'&& sort.value===1)?'fa fa-check float-right':''}/></div>
                        </li>
                        <li onClick={() => this.sort('status', -1)}>
                            <div role="button">Trạng Thái Ẩn <i className={(sort.by==='status'&& sort.value=== -1)?'fa fa-check float-right':''}/></div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort : state.sort
    }
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onSort : (sort) => {
        dispatch(actions.sortTask(sort));
      },
     
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sort);