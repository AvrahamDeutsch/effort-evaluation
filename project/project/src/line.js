import React, { Component } from 'react';
import Category from './category'
import MyComponent from './component'
import Complexity from './complexity';

class Line extends Component {
    render() {

        return (
            <div className='line'>
                <Category onChange = {this.props.onChange} linekey={this.props.linekey} category={this.props.document.category} />
                <MyComponent onChange = {this.props.onChange} linekey={this.props.linekey} component={this.props.document.component} />
                <Complexity onChange={this.props.onChange} linekey={this.props.linekey} low_complexity={this.props.document.low_complexity} med_complexity={this.props.document.med_complexity} high_complexity={this.props.document.high_complexity} />
                <button document={this.props.document} className = 'dltBtn' onClick = {this.props.onClick1}> Delete </button>                
                <button document={this.props.document} linekey={this.props.linekey} className = 'SaveBtn' onClick = {this.props.onClick2}> Save changes </button>
            </div>
        );
    }
}



export default Line;