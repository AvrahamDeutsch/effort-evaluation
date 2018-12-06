import React, { Component } from 'react';
import './App.css';

class complexity extends Component {
    render() {
        return (
            <div className='complexity'>
                <span> <input linekey={this.props.linekey} placeholder='low' type='number' min="1" onChange={this.props.onChange} className='low_complexity' id='lowInput' defaultValue={this.props.low_complexity}></input> </span>
                <span> <input linekey={this.props.linekey} placeholder='med' type='number' min="1" onChange={this.props.onChange}  className='med_complexity' id='medInput' defaultValue={this.props.med_complexity}></input></span>
                <span> <input linekey={this.props.linekey} placeholder='high' type='number' min="1" onChange={this.props.onChange}  className='high_complexity' id='highInput' defaultValue={this.props.high_complexity}></input></span>
            </div>
        );
    }
}

export default complexity;