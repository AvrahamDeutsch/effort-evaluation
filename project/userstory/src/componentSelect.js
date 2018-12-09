import React, { Component } from 'react';
import './App.css';
import { Input} from 'reactstrap';


class ComponentSelect extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = { renderedData: [] };
    // }
    // ComponentDidMount() {
    //     var key = -1;
    //     var array = this.props.arrayResult.slice();
    //     this.setState(
    //         {
    //             renderedData: array.map(current => {
    //                 return <option onChange={this.props.onChange} className='option' key={key++}>{current.component}</option>
    //             })
    //         });

    // }


    render() {
        var array = this.props.arrayResult.slice();
        var renderedData = array.map((current, index) => {
            return <option onChange={this.props.onChange} dbid={current._id} className='option' key={index}>{current.component}</option>
        })


        return (
            <Input type="select" onChange={this.props.onChange} className='select componentSelect' >
            <option selected disabled hidden className='option'>Component</option>
                {renderedData}
            </Input>
        );
    }
}

export default ComponentSelect;