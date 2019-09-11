import React, { Component } from 'react';

// import components
import FilterString from '../Controls/FilterString';
import TaskItem from './TaskItem';

class TaskList extends Component {

  
    render() {
      let {tasks, filterType, filterProgress,changeFilterSearch,filterSearch,sortType,sortPriority,filterLabel} = this.props;
      let filterTasks = [];
      switch (filterType){

        case 'filterProgress':
        if(filterProgress === -1){
          filterTasks = tasks
        }else {
          for(let task of tasks){
            if(parseInt(task.status, 10) === filterProgress){
              filterTasks = [...filterTasks, task]
            }
          }
        }
        break;

        case 'filterSearch':
        filterTasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1;
        })
        break;


        case 'filterLabel':
        if(filterLabel === 'Tất cả'){
          filterTasks = tasks;
          console.log(filterTasks)
        }else {
          for(let task of tasks){
              if(task.labelArr.includes(filterLabel)){
                filterTasks = [...filterTasks, task];
            }
          }
        }
        break;

        case 'Priority':
        if(sortPriority === -1){
          filterTasks = tasks
        }else {
          for(let task of tasks){
            if(task.priority === parseInt(sortPriority,10)){
              filterTasks = [...filterTasks, task]
            }
          }
        }
        break;


        case 'Sort':
        filterTasks = tasks;
        if(sortType === 'asc'){
          filterTasks.sort((a,b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase()
            if(x<y) {return -1;}
            if(x>y) {return 1;}
            return 0
          })
        }
        if(sortType === 'desc'){
          filterTasks.sort((a,b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase()
            if(x>y) {return -1;}
            if(x<y) {return 1;}
            return 0
          })
        }
        break;

        default: filterTasks = tasks
        break;
      }
      let elmItem = filterTasks.map((item, index) => {
        return <TaskItem 
        key={index} 
        item={item} 
        index={index} 
        findTaskToEdit={this.props.findTaskToEdit}
        changeProgress={this.props.changeProgress}
        onDelete={this.props.onDelete}
        />
      })
      
        return (
            <div className="col-md-9 px-0">
                <div className="container-fluid px-0">
                  <div className="row header header--right d-flex align-items-center mx-0">
                    <div className="col-md-6">
                      <div className=" d-flex justify-content-between">
                        <h3 className="text-left ml-2 ">Danh sách công việc</h3>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <FilterString changeFilterSearch={changeFilterSearch}/>
                    </div>
                    
                  </div>
                </div>
                <div className="px-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                      
                        <th className="text-center">STT</th>
                        <th className="text-center">Công việc</th>
                        <th className="text-center">Nhãn</th>
                        <th className="text-center">Độ ưu tiên</th>
                        <th className="text-center">Người thực hiện</th>
                        <th className="text-center">Xử lý</th>
                        <th className="text-center">Tình trạng</th>
                        <th className="text-center">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elmItem }                      
                    </tbody>
                  </table>
                </div>
              </div>
        );
    }
}

export default TaskList;