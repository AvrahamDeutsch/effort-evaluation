import React, { Component } from 'react';
import './App.css';

class Category extends Component {

    render() {
        return (
            <input className='category' linekey={this.props.linekey} type='text' id='categoryInput' onChange={this.props.onChange} defaultValue={this.props.category} />
        );
    }
}

export default Category; 