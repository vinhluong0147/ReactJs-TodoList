import React, { Component } from 'react';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProgress: ''
        }
    }
    
    getLabelColor = (label) => {
        let labelColor;
        switch(label) {
            case 'Frontend':
                return labelColor = '#389E0D'
            case 'Backend':
                return labelColor = '#722ED1'
            case 'API':
                return labelColor = '#13C2C2'
            case 'Database':
                return labelColor = '#CF1322'
            default:

            break;
        }
        return labelColor;
    }

    getPriority = (priority) => {
        switch(parseInt(priority, 10)) {
            case 1:
                return 'Cao';
            case 2:
                return 'Trung bình';
            case 3:
                return 'Thấp';
            default:
            return '';
        }

    }

    getPriorityClass = (priority) => {
        switch(parseInt(priority, 10)) {
            case 1:
                return 'text-danger'
            case 2:
                return 'text-success'
            case 3:
                return 'text-info'
            default:
                return '';
        }

    }
    
    getProgressIcon = (status) => {
        switch (parseInt(status, 10)) {
            case 1:
                return "fa-hourglass-start"
            case 2:
                return "fa-anchor"
            case 3:
                return "fa-check-square-o"
            case 4:
                return "fa-trash-o"
        
            default:
                return ""
        }
    }

    handleFindTask = (item) => {
        this.props.findTaskToEdit(item)
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        }, () =>{
            this.props.changeProgress(this.props.item.id, this.state.selectedProgress)
        })
        
    }

    handleDelete = (name) => {
        this.props.onDelete(this.props.item.name)
        console.log(this.props.item.id)
    }

    render() {
       const {index,item} = this.props
      
        let elmLabel = item.labelArr.map((label, index) => {
            return <i
            className="fa fa-circle"
            style={{color: this.getLabelColor(label)}}
            key={index}
            />
        })

        const userElm = item.memberIDArr.map((member, index) => {
            return <img
                key={index}
                src={`./img/${member}.jpg`} 
                className="user" alt="user" 
            />
        })
        
        return (
            <tr>
                <td className="text-center">
                {index + 1}
                </td>
                <td className="text-center">
                {item.name}
                </td>
                <td className="text-center">
                {elmLabel}
                </td>
                <td className={`${this.getPriorityClass(item.priority)} font-weight-bold text-center`}>
                {this.getPriority(item.priority)}
                </td>
                <td className="text-center">
                {userElm}
                </td>
                <td className="text-center d-flex">
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        data-toggle="modal"
                        data-target="#modalTask"
                        onClick={this.handleFindTask}
                    >Sửa</button>

                    <div className="form-group mx-2 my-0">
                      <select className="form-control" name="selectedProgress" id="" onChange={this.onChange}>
                        <option value={-1}>Chọn tình trạng</option>
                        <option value={1}>Bắt đầu</option>
                        <option value={2}>Tạm ngưng</option>
                        <option value={3}>Hoàn thành</option>
                        <option value={4}>Hủy bỏ</option>
                      </select>
                    </div>                    
                </td>
                <td className="text-center">

                <i className={`fa ${this.getProgressIcon(item.status)}  mr-2`} />
                </td>
                <td className="text-center">

                <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={this.handleDelete}
                        
                    >Xóa</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;