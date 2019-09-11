/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

class InitializeTask extends Component {

    InitializeTask = () => {
        this.props.setLocalStorage()
    }
    render() {
        return (
            <button 
                type="button" 
                className="btn my-3 btn-warning"
                onClick={this.InitializeTask}
                >
                Lấy dữ liệu từ LocalStortage
            </button>
        );
    }
}

export default InitializeTask