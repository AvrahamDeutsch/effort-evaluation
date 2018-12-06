import React, { Component } from 'react';
import './App.css';

class Select extends Component {
    render() {
        var key = -1;
        var x = this.props.categoryorcomp;
        var array = this.props.selectArray;
        var renderedData = array.map(current => {
            return <option onChange={this.props.onChange} categoryorcomp={x} className='option' key={key++}>{current}</option>
        });

        return (
            <div className='selectBlock'>
                <div className='selectComment'>{x}:</div>
                <select onChange={this.props.onChange} categoryorcomp={x} className='select'>
                    {renderedData}
                </select>
            </div>
        );
    }
}

export default Select;