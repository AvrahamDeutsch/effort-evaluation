import React, { Component } from 'react';
import './App.css';
import { Input} from 'reactstrap';
import axios from 'axios'


class TaskUserStorySelect extends Component {

    constructor(props) {
        super(props)
        this.state = { renderedData: [] };
    }

//     ComponentDidMount() {
//         axios.get(`http://10.2.1.106:5000/api/allStories/:5bfbe195d9c0d0126cc8681f`)
//         .then((response) => {
//             console.log(response.data);
//             var key = 0;
//             var array = [];
//             array = response.data.arrayResult.slice();

//             this.setState(
//                 {
//                     renderedData: array.map(current => {
//                         return (<option onChange={this.props.onChange} className='option' key={key++}>{current}</option>)
//                     })
//                 });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

    render() {
        var key = 0;
        var array = this.props.userStories.slice();
        var renderedData = array.map(current => {
            if ( this.props.taskContainerUserStory.trim() === current.trim()) {
                return <option selected taskcontaineruserstory={this.props.taskContainerUserStory} onChange={this.props.taskUserStorySelectChange} 
                       lineindex={this.props.lineIndex}
                       dbid={current._id} className='option' key={key++}>{current.trim()}</option>
            }
            else {
                return <option taskcontaineruserstory={this.props.taskContainerUserStory} onChange={this.props.taskUserStorySelectChange} 
                       lineindex={this.props.lineIndex}
                       dbid={current._id} className='option' key={key++}>{current.trim()}</option>
            }
        })


        return (
            <Input type="select"  taskcontaineruserstory={this.props.taskContainerUserStory} onChange={this.props.taskUserStorySelectChange} 
                    lineindex={this.props.lineIndex}
                    className='select floatLeft userStorySelect' style={{ border: '1px inset', padding: '1px' }}>
                <option selected disabled hidden className='option'>Choose user story</option>
                {renderedData}
            </Input>
        );
    }
}

export default TaskUserStorySelect;