import React, { Component } from 'react';
import './App.css';

// import component
import Controls from './Components/Controls/Controls';
import TaskList from './Components/TaskList/TaskList';
import Modal from './Components/Modal/Modal';

// import data
import listOfTask from './Model/getData'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskInfor: null,
      isAddNewTask: true,
      filterType: '',
      filterProgress: -1,
      filterSearch: '',
      filterLabel: '',
      sortType: '',
      sortPriority: -1
    }
  }
  setLocalStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(listOfTask.list))
      window.location.reload()
    }
  componentDidMount = () => {
    if(!localStorage.getItem('tasks')){
      localStorage.setItem('tasks', JSON.stringify(listOfTask.list))
    }
    let tasksItem = JSON.parse(localStorage.getItem('tasks'))
    this.setState({
      tasks: tasksItem
    })
    
    
    
  }


  addNewTask = (task) => {
    if(this.state.isAddNewTask){
      let tasksItem = JSON.parse(localStorage.getItem('tasks'))
      tasksItem = [...tasksItem, task]
      this.setState({
        tasks: tasksItem,
      })
      localStorage.setItem('tasks', JSON.stringify(tasksItem))
    }
    
  }

  findTaskToEdit = (task) => {
    this.setState({
      taskInfor: task,
      isAddNewTask: false
      
    })
  }

  editTask = (task) => {
    if(!this.state.isAddNewTask){
      let tasksItem = JSON.parse(localStorage.getItem('tasks'))
      for(let i in tasksItem){
        if(tasksItem[i].id === task.id){
          tasksItem[i].name = task.name
          tasksItem[i].priority = task.priority
          tasksItem[i].labelArr = task.labelArr
          tasksItem[i].memberIDArr = task.memberIDArr
          tasksItem[i].status = task.status
          tasksItem[i].description = task.description
        }
      }
      this.setState({
      tasks: tasksItem
    })
    localStorage.setItem('tasks', JSON.stringify(tasksItem))
    }
  }

  clearForm = () => {
    this.setState({
      isAddNewTask: true
    })
  }

  changeProgress = (id, progress) => {
    console.log(progress)
    let tasksItem = JSON.parse(localStorage.getItem('tasks'));
    for(let index in tasksItem){
      if(tasksItem[index].id === id){
        tasksItem[index].status = progress
      }
    }
    this.setState({
      tasks: tasksItem
    })
    localStorage.setItem('tasks', JSON.stringify(tasksItem))
  } 

  changeFilterProgress = (filterProgress) => {
    this.setState({
      filterType: 'filterProgress',
      filterProgress: filterProgress
    })
  }

  changeFilterSearch = (filterSearch) => {
    this.setState({
      filterType: 'filterSearch',
      filterSearch: filterSearch
    })
    
  }
  changeFilterLabel = (filterLabel)=> {
    this.setState({
      filterType: 'filterLabel',
      filterLabel: filterLabel
})
  }


  onDelete = (name) => {
    let tasksItem = JSON.parse(localStorage.getItem('tasks'));
    for(let index in tasksItem){
      if(tasksItem[index].name === name){
        tasksItem.splice(index, 1)
      }
    }
    this.setState({
      tasks: tasksItem
    })
    localStorage.setItem('tasks', JSON.stringify(tasksItem))
  }

  onSortPriority = (sortPriority) => {
    this.setState({
      filterType: 'Priority',
      sortPriority: sortPriority
    })
  }
  onSortList = (sortType) => {
    this.setState({
      filterType: 'Sort',
      sortType: sortType
    })
  }



  render() {

    let {tasks,taskInfor,isAddNewTask,filterType,filterProgress,filterSearch,sortType,sortPriority,filterLabel} = this.state
    return (
      <div className="App">
        <div>
          <h1 className="text-center my-2">QUẢN LÝ CÔNG VIỆC</h1>
          <div className="container-fluid">
            <div className="row">
              
              {/* PANEL */}
              <Controls 
              setLocalStorage={this.setLocalStorage}
              isAddNewTask={this.clearForm}
              changeFilterProgress={this.changeFilterProgress}
              onSortList={this.onSortList}
              onSortPriority={this.onSortPriority}
              changeFilterLabel={this.changeFilterLabel}
              />

              {/* DISPLAY */}
              <TaskList 
              tasks={tasks}
              findTaskToEdit={this.findTaskToEdit}
              changeProgress={this.changeProgress}
              filterType={filterType}
              filterProgress={filterProgress}
              changeFilterSearch={this.changeFilterSearch}
              filterSearch={filterSearch}
              onDelete={this.onDelete}
              sortType={sortType}
              sortPriority={sortPriority}
              filterLabel={filterLabel}
              />

            </div>
          </div>
          {/* The Modal */}
          <Modal addNewTask={this.addNewTask}
          taskInfor={taskInfor}
          isAddNewTask={isAddNewTask}
          editTask={this.editTask}
          />
          
        </div>

      </div>
    );
  }
}

export default App;
