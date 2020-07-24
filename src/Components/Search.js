import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './../actions/index'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyword: ''
        }
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    onChange = (event) => {
        const name = event.target.name;
        const value= event.target.value;
        this.setState({
            [name] : value
        });
    }
    
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" name="keyword" onChange={this.onChange} className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onSearch}  type="button">
                            <span className="fa fa-search mr-3" />Tìm
                  </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      onSearch : (keyword) => {
        dispatch(actions.searchTask(keyword));
      }
    }
  }
  
export default connect(null, mapDispatchToProps)(Search);
  