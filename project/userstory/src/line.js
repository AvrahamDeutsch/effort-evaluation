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
                                <input type="radio" id='low' name="complexity" value="L" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />low{' '}
                                <input type="radio" id='med' name="complexity" value="M" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />med{' '}
                                <input type="radio" id='high' name="complexity" value="H" lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} />high{' '}
                                <div className='complexityNumber'>{this.props.risk}</div>
                                {/* <div className='complexityNumber'>{this.props.complexity}</div> */}
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
                                <Input type="textarea" name="text" id="exampleText" placeholder='DETAILS' />
                            </FormGroup>
                        </Col>
                        <Col sm='6' md='4'>
                            <FormGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder='ASSUMPTIONS' />
                            </FormGroup>
                        </Col>
                        <Col  sm='6' md='4'>
                            <div><b>w.e. : {taskWeightedEffort}</b></div>

                        </Col>



                    </Row>

               
            </div>
            <br/>
             <div className="LineDetail">
                     <div className='TaskContainerVisibleText'>Task Name:</div>
                     <Input style={{ fontSize: '20px', border: '1px inset', padding: '0px' }} size='30' type="text" 
                        onChange={this.props.taskNameChange}
                         lineindex={this.props.lineIndex} /*defaultValue={this.props.taskName}*/></Input>
                 </div>
                 <div className="LineDetail">
                     <ComponentSelect onChange={this.props.onChange} arrayResult={this.props.arrayResult} />
                 </div>
                 <div className="LineDetail">
                     <div className='TaskContainerVisibleText'>Complexity:</div>
                     <form className='TaskContainerVisibleText'>
                         <input type="radio" id='low' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="L" />low
                         <input type="radio" id='med' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="M" />med
                         <input type="radio" id='high' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="H" />high
                     </form>
                     <div className='complexityNumber'>{this.props.risk}</div>
                 </div>
                 <div className="LineDetail">
                     <textarea rows="1" cols="50" scroll="true" placeholder='DETAILS' />
                 </div>

                 {/**************************** second string of a Line *********************************/}
                 <div className="LineDetail ">
                     <div className='TaskContainerVisibleText taskUserStoryLable'>Task user story:</div>
                     <TaskUserStorySelect className='floatLeft' 
                        taskContainerUserStory={this.props.taskContainerUserStory}
                         lineIndex={this.props.lineIndex}
                         userStories={this.props.userStories} 
                         taskUserStorySelectChange={this.props.taskUserStorySelectChange} />
                 </div>
                 <div className="LineDetail" style={{ textAlign: 'left' }}>
                     <div className='TaskContainerVisibleText risk'>Learning days:</div>
                     <input className='complexityNumber' style={{ fontSize: '20px', padding: '0px' }}
                         lineindex={this.props.lineIndex} onChange={this.props.learningDaysChange} size='3' type='number' min='0' max='10' defaultValue='0'></input>
                 </div>
                 <div className="LineDetail">
                     <div className='TaskContainerVisibleText risk'>Risk:</div>
                     <form className='TaskContainerVisibleText'>
                         <input type="radio" id='low' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="L" />low
                         <input type="radio" id='med' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="M" />med
                         <input type="radio" id='high' lineindex={this.props.lineIndex} onClick={this.props.riskClickHandler} name="complexity" value="H" />high
                     </form>
                     <div className='complexityNumber'>{this.props.risk}</div>
                </div>
                 <div className="LineDetail">
                     <textarea style={{ width: '65%', float: 'left' }} rows="1" cols="50" scroll="true" placeholder='ASSUMPTIONS' />
                     <div className='complexityNumber'>w.e. : {taskWeightedEffort}</div>
                 </div>



//                 <div className="break"></div> 

            </div>
        );
    }
}
export default Line;


