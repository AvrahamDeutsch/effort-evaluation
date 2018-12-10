import React, { Component } from 'react';
import './App.css';
import { Input} from 'reactstrap';

 


class SelectProject extends Component {

    render() {
        var renderedData = [];
        var projectArray = this.props.projectarray;
        renderedData = projectArray.map((current, index) => {
            return <option className='option' id={current.projectId} key={index}>{current.projectName}</option>
        });

        return (
            <Input  type='select' className="selectProject" onChange={this.props.onChange}>
                {renderedData}
            </Input>
        );
    }
}

export default SelectProject;