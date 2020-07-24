
import React, { Component } from 'react';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import './Style.css'
//Redux
import {connect} from 'react-redux'
import * as actions from './actions/index'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // tasks: [],
      // isDisplayForm: false,
      taskEdit: null,
      filter: {
        name: '',
        status: -1
      },
      sort:{
        by: 'name',
        value: 1
      }
    }
  }




  // componentWillMount() {
  //   if (localStorage && localStorage.getItem('tasks')) {
  //     var tasks = JSON.parse(localStorage.getItem('tasks'));
  //     this.setState({
  //       tasks: tasks
  //     });
  //   }
  // }


  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: 1,
  //       name: 'A',
  //       status: true
  //     },
  //     {
  //       id: 2,
  //       name: 'B',
  //       status: false
  //     },
  //     {
  //       id: 3,
  //       name: 'C',
  //       status: true
  //     },
  //     {
  //       id: 4,
  //       name: 'D',
  //       status: true
  //     },
  //   ]
  //   this.setState({
  //     tasks: tasks
  //   });
  //   console.log(tasks);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  openForm = () => {
    // this.setState({
    //   isDisplayForm: true,
    // });
    this.props.onOpenForm()
  }

  addForm = () => {
    var {itemEditing} = this.props;
    if (itemEditing && itemEditing.id !== '') {
      this.openForm();
    } else {
      this.props.onToggleForm();
    }
    this.onClearForm();


  }

  // closeForm = () => {
  //   this.setState({
  //     isDisplayForm: false
  //   });
  // }



  // onChangeStatus = (id) => {
  //   let { tasks } = this.state;
  //   console.log(id);
  //   // let index = this.findIndex(id);
  //   // console.log(index)
  //   // if(index !== -1){
  //   //   tasks[index].status = !tasks[index].status;
  //   //   this.setState({
  //   //     tasks: tasks
  //   //   });
  //   // }
  //   var newTasks = tasks.map((item, index) => {
  //     if (item.id === id) {
  //       item.status = !item.status
  //     }
  //     return item;
  //   })
  //   this.setState({
  //     tasks: newTasks
  //   });
  // }

  findIndex = (id) => {
    let { tasks } = this.state;
    var result = -1;
    tasks.forEach((item, index) => {
      if (item.id === id) {
        result = index;
      }
    })
    return result;
  }

  onUpdate = (id) => {
    console.log(id);
    this.openForm();
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit,
    });

  }


  // onDelete = (id) => {
  //   console.log(id);
  //   let { tasks } = this.state;
  //   var newTasks = tasks.filter(item => item.id !== id);
  //   this.setState({
  //     tasks: newTasks
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   this.closeForm();
  // }

  // onSubmit = (data) => {
  //   var { tasks } = this.state;
  //   if (data.id === '') {
  //     data.id = uuidv1();
  //     tasks.push(data);
  //   } else {
  //     var index = this.findIndex(data.id);
  //     tasks[index] = data;
  //   }
  //   this.setState({
  //     tasks: tasks,
  //     taskEdit: {}
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks))
  //   console.log(data);
  // }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onClearForm = () => {
    this.props.onClearForm({
      id: '',
      name: '',
      status: false
    })
  }

  onSearch = (keyword) => {
    console.log(keyword);
    this.setState({
      keyword: keyword
    });
  }

  onSort = (sort) => {
    console.log(sort);
    this.setState({
      sort: sort
    });
  }

  render() {
    // var { tasks, isDisplayForm, taskEdit, filter, keyword, sort } = this.state;
    // var { taskEdit} = this.state;
    var {isDisplayForm} = this.props;
    console.log(isDisplayForm)
    var elmForm = isDisplayForm ? <TaskForm  /> : ''
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter(({ name }) => {
    //       return name.toLowerCase().indexOf(filter.name) !== -1
    //     })
    //   }
    //   if (filter.status > -1) {
    //     tasks = tasks.filter(({ status }) => +status === filter.status)
    //   }
    // }
    // if(keyword){
    //   tasks = tasks.filter(({name}) => {
    //     return name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    //   })
    // }

    // if(sort.by === 'name'){
    //   console.log('sort')
    //   tasks = tasks.sort((a ,b)=>{
    //     if(a.name < b.name) return -sort.value;
    //     else return sort.value;

    //   })
    //   console.log(tasks);
    // }else{
    //   tasks = tasks.sort((a,b)=>{
    //     if(sort.value === 1) return a.status - b.status;
    //     else return b.status -a.status;
    //   })
    // }
    
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? "col-4" : ""}>
              {elmForm}
            </div>
            <div className={isDisplayForm ? "col-8" : "col-12"}>
              <button type="button" className="btn btn-primary" onClick={() => this.addForm()}>
                <span className="fa fa-plus mr-3" />Thêm Công Việc
              </button>
              <button onClick={() => this.onGenerateData()} type="button" className="btn btn-danger ml-3">
                Generate data
              </button>
              <Control  onSort={this.onSort}/>
              <div className="row mt-3">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    onUpdate={this.onUpdate}
                    onFilter={this.onFilter}
                      />
                    {/* listTask={tasks} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onOpenForm : () => {
      dispatch(actions.openForm());
    },
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onClearForm : (task) => {
      dispatch(actions.editTask(task));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
