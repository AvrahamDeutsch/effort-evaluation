import React, { Component } from 'react';
import './App.css';
import ComponentSelect from './componentSelect';
// import UserStorySelect from './userStorySelect';
import TaskUserStorySelect from './taskUserStorySelect';
import {  FormGroup,  Input, Row, Col } from 'reactstrap';



class Line extends Component {



    render() {
        var learningDaysNumber = this.props.learningDaysNumber;
        var complexityNumber = this.props.complexity;
        var riskNumber = this.props.risk;
        var taskWeightedEffort = ((learningDaysNumber + complexityNumber) * riskNumber).toFixed(1);

        return (


            <div >
            <div  className="LineDetail">
                    <Row >
                        <Col sm='6' md='2'>Task Name:</Col>
                        <Col sm='6' md='3'>
                            <Input  size='30' type="text" 
                                onChange={this.props.taskNameChange}
                                lineindex={this.props.lineIndex} /*defaultValue={this.props.taskName}*/></Input>
                        </Col>
                        <Col sm='6' md='3'>
                            <ComponentSelect onChange={this.props.onChange} arrayResult={this.props.arrayResult} />
                        </Col>
                        <Col sm='6' md='4'>
                            <FormGroup tag="fieldset">
                                <legend>Complexity:</legend>
                                <input type="radio" id='low' name="complexity" value="L" lineindex={this.props.lineIndex} onClick={this.props.onClick} />low{' '}
                                <input type="radio" id='med' name="complexity" value="M" lineindex={this.props.lineIndex} onClick={this.props.onClick} />med{' '}
                                <input type="radio" id='high' name="complexity" value="H" lineindex={this.props.lineIndex} onClick={this.props.onClick} />high{' '}
                                {/* <div className='complexityNumber'>{this.props.risk}</div> */}
                                <div className='complexityNumber'>{this.props.complexity}</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6' md='2'>
                            Task user story:
                        </Col>
                        <Col sm='6' md='3'>
                            <TaskUserStorySelect 
                                className='floatLeft' 
                                taskContainerUserStory={this.props.taskContainerUserStory}
                                lineIndex={this.props.lineIndex}
                                userStories={this.props.userStories} 
                                taskUserStorySelectChange={this.props.taskUserStorySelectChange} />
                        </Col>

                        <Col sm='6' md='2'>
                            Learning days:
                        </Col>
                        <Col sm='6' md='1'>
                            <Input className='complexityNumber' style={{  padding: '0px' }}
                                lineindex={this.props.lineIndex} onChange={this.props.learningDaysChange}  type='number' min='0' max='10' defaultValue='0'></Input>

                        </Col>

                        <Col sm='6' md='4'>

                            <FormGroup tag="fieldset">
                                <legend>Risk:</legend>
                                 <input type="radio" id='low' name="complexity" value="L" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />low{' '}
                                <input type="radio" id='med' name="complexity" value="M" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />med{' '}
                                <input type="radio" id='high' name="complexity" value="H" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />high{' '}
                                <div className='complexityNumber'>{this.props.risk}</div>
                                {/* <div className='complexityNumber'>{this.props.complexity}</div> */}
                            </FormGroup>

                        </Col>

                    </Row>
                    <Row>
                        <Col sm='6' md='4'>
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder='DETAILS' lineindex={this.props.lineIndex} onBlur={this.props.detailsHandler}/>
                            </FormGroup>
                        </Col>
                        <Col sm='6' md='4'>
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder='ASSUMPTIONS' lineindex={this.props.lineIndex} onBlur={this.props.assumptionsHandler}  />
                            </FormGroup>
                        </Col>
                        <Col  sm='6' md='4'>
                            <div><b>w.e. : {taskWeightedEffort}</b></div>

                        </Col>



                    </Row>

               
            </div>
           
            <br/>
            </div>
        );
    }
}
export default Line;


