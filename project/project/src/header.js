import React, { Component } from 'react';
import Category from './category'
import MyComponent from './component'
import Complexity from './complexity';

class LineHeader extends Component {
    render() {

        return (
            <div className='line' id='lineHeader' >
                <div className='category' id='categoryHeader'> {this.props.document.category} </div>
                <div className='component' id='componentHeader'> {this.props.document.component} </div>
                <div className='complexityHeader'> 
                    <div className='complexityHeaders'>complexity</div>
                    <span ><div className='low_complexity' id='lowInput'>{this.props.document.low_complexity}</div> </span>
                    <span> <div className='med_complexity' id='medInput'>{this.props.document.med_complexity}</div></span>
                    <span> <div className='high_complexity' id='highInput'>{this.props.document.high_complexity}</div></span>
                </div>
            </div>
        );
    }
}

export default LineHeader;