import React, { Component } from 'react';
import './App.css';
import Line from './line';


class Lines extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linesArray: [this.props.numberOfTasks],
        };
    }

    componentDidMount() {
        var numberOfTasks = this.props.numberOfTasks;
        console.log('numberOfTasks: ', numberOfTasks);

        var linesArray = new Array(numberOfTasks);
        linesArray.forEach(element => {
            element = 1;
        });

        this.setState({linesArray : linesArray});
    }


    render() {        
        var numberOfTasks = this.props.numberOfTasks;
        console.log('numberOfTasks: ', numberOfTasks);
        var linesArray = new Array(numberOfTasks);
        for(var i=0; i<numberOfTasks; i++){
            linesArray[i] = <Line 
                            taskContainerUserStory={this.props.taskContainerUserStory} 
                            userStories={this.props.userStories} 
                            arrayResult={this.props.arrayResult}  
                            lineIndex={i} 
                            complexity={this.props.complexArray[i]} 
                            risk={this.props.riskArray[i]} 
                            onClick={this.props.onClick} 
                            riskClickHandler={this.props.riskClickHandler}
                            learningDaysChange={this.props.learningDaysChange} 
                            learningDaysNumber={this.props.learningDaysArray[i]}
                            onChange={this.props.onChange} 
                            taskUserStorySelectChange={this.props.taskUserStorySelectChange}
                            taskNameChange={this.props.taskNameChange}
                            detailsHandler={this.props.detailsHandler}             
                            assumptionsHandler={this.props.assumptionsHandler}
                            total={this.props.total}/>;             
        }
        return (
            <div className="Lines">
                {
                    linesArray
                }
            </div>
        );
    }
}
export default Lines;