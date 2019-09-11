import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      priority: '',
      memberIDArr: [],
      labelArr: []
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      id: new Date().getTime() + 1
    })
    this.props.addNewTask(this.state)
    this.props.editTask(this.state)
  }

  memberChanged = (member) => {
    this.setState({
      memberIDArr: member
    })
  }

  labelChanged = (label) => {
    this.setState({
      labelArr: label
    })
  }

  componentWillReceiveProps = (nextprops) => {

    if(nextprops && nextprops.isAddNewTask){
      this.clearForm()
    }
    if(nextprops && nextprops.taskInfor && !nextprops.isAddNewTask){
      this.setState({
        id: nextprops.taskInfor.id,
        name: nextprops.taskInfor.name,
        description: nextprops.taskInfor.description,
        priority: nextprops.taskInfor.priority,
        memberIDArr: nextprops.taskInfor.memberIDArr,
        labelArr: nextprops.taskInfor.labelArr
      })
    }
    
  }

  clearForm = () => {
    this.setState({
      id: '',
      name: '',
      description: '',
      priority: '',
      memberIDArr: [],
      labelArr: []
    })
  }
  render() {

    return (
      <div className="modal fade" id="modalTask">
        <div className="modal-dialog modal-lg">
          <form onSubmit={this.onSubmit}>
            <div className="modal-content">


              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">
                {this.props.isAddNewTask ? 'Thêm task': 'Sửa task'}
                </h4>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>

              {/* Modal body */}
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Tên công việc:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Mô tả:</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    id="description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Độ ưu tiên:</label>
                  <select
                    className="form-control"
                    id="priority"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={-1} >Chọn độ ưu tiên</option>
                    <option value={3}>Thấp</option>
                    <option value={2}>Trung bình</option>
                    <option value={1}>Cao</option>
                  </select>
                </div>
                <label>Người thực hiện:</label>
                <br />

                <CheckboxGroup
                  checkboxDepth={2} // This is needed to optimize the checkbox group
                  name="memberIDArr"
                  value={this.state.memberIDArr}
                  onChange={this.memberChanged}

                  >

                  <label><Checkbox value="user_1" /> Phó Văn Nghĩa</label>
                  <label><Checkbox value="user_2" /> Nguyễn Tiến Minh Tuấn</label>
                  <label><Checkbox value="user_3" /> Đặng Trung Hiếu</label>
                  <label><Checkbox value="user_4" /> Trương Tấn Khải</label>
                </CheckboxGroup>

                <br /><br />
                <label >Nhãn:</label>
                <br />
                <CheckboxGroup
                  checkboxDepth={2} // This is needed to optimize the checkbox group
                  name="labelArr"
                  value={this.state.labelArr}
                  onChange={this.labelChanged}
                  
                > 

                  <label><Checkbox value="Frontend" /> Frontend</label>
                  <label><Checkbox value="Backend" /> Backend</label>
                  <label><Checkbox value="API" /> API</label>
                  <label><Checkbox value="Issue" /> Issue</label>
                </CheckboxGroup>
              </div>
              {/* Modal footer */}

              <div className="modal-footer">
              <button type="submit" className="btn btn-success" >{this.props.isAddNewTask ? 'Thêm task': 'Sửa task'}</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;