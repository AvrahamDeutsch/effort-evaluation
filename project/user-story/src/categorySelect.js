import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Input} from 'reactstrap';





class CategorySelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderedData: [],
            currentCategory:''
        };
    }

   componentDidMount() {
    
        axios.get(`http://10.2.2.114:8080/app/category_value_list`)
            .then((response) => {
                console.log(response.data);
                
                var array = [];
                array = response.data.arrayResult.slice();

                this.setState(
                    {
                        renderedData: array.map((current, index) => {
                            return (<option /*onChange={this.props.onChange}*/ className='option' key={index}>{current}</option>)
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
                {/* <option disabled hidden className='option'>Select Category</option> */}
                <option  hidden className='option'>Select Category</option>
                {this.state.renderedData}
            </Input>
        );
    }
}

// export default  connect(store=>store)(CategorySelect);
export default  CategorySelect;