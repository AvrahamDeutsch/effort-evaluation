import React, { Component } from 'react';
import './App.css';

class MyComponent extends Component {

    render() {
        return (
            <input className='component' linekey={this.props.linekey} type='text' id='componentInput'  onChange={this.props.onChange} defaultValue={this.props.component}/>
        );
    }
}

export default MyComponent;