import React, { Component } from 'react';
import './App.css';
import { Input} from 'reactstrap';
import axios from 'axios'


class UserStorySelect extends Component {

    constructor(props) {
        super(props)
        this.state = { renderedData: [] };
    }
    
    ComponentDidMount() {
        
}


    render() {
        var key = 0;
        var array = this.props.userStories.slice();
        var renderedData = array.map(current => {
            return <option onChange={this.props.onChange} dbid={current._id} className='option' key={key++}>{current.trim()}</option>
        })


        return (
            <Input type="select" onChange={this.props.onChange} className='select floatLeft userStorySelect' >
            <option selected disabled hidden className='option'>Choose user story</option>
                {renderedData}
            </Input>
        );
    }
}

export default UserStorySelect;