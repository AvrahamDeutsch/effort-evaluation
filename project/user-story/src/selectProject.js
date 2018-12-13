import React, { Component } from 'react';
import './App.css';
import { Input } from 'reactstrap';




class SelectProject extends Component {

    render() {
        var renderedData = [];
        var projectArray = this.props.projectarray;
        renderedData = projectArray.map((current, index) => {
            // return <option className='option' value={current.projectId} key={index}>{current.projectName}</option>
            return <option className='option' value={current._id} key={index}>{current.projectName}</option>
        });

        return (
            <Input type='select' className="selectProject" onChange={this.props.onChange} >
                <option className='option' value={0} key={0}>{this.props.defaultValue}</option>
                {renderedData}
            </Input>
        );
    }
}

export default SelectProject;