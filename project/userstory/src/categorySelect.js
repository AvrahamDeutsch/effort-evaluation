import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Input} from 'reactstrap';
import {connect} from 'react-redux'
import store from './store/store'




class CategorySelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderedData: [],
            currentCategory:''
        };
    }

   componentDidMount() {
    
        axios.get(`http://10.2.1.106:8080/app/category_value_list`)
            .then((response) => {
                console.log(response.data);
                var key = 0;
                var array = [];
                array = response.data.arrayResult.slice();

                this.setState(
                    {
                        renderedData: array.map(current => {
                            return (<option onChange={this.props.onChange} className='option' key={key++}>{current}</option>)
                        })
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
    
    render() {
        return (
        <Input type="select" onChange={this.props.onChange} className='select'>
                <option selected disabled hidden className='option'>Select Category</option>
                {this.state.renderedData}
            </Input>
        );
    }
}

// export default  connect(store=>store)(CategorySelect);
export default  CategorySelect;