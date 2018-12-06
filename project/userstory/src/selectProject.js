import React, { Component } from 'react';
import './App.css';
import { Input} from 'reactstrap';

 


class SelectProject extends Component {

    render() {
        var renderedData = [];
        var key = -1;
        var projectArray = this.props.projectarray;
        renderedData = projectArray.map(current => {
            return <option className='option' key={key++}>{current}</option>
        });

        return (
            <Input type='select' className="selectProject">
                {renderedData}
            </Input>
        );
    }
}

export default SelectProject;