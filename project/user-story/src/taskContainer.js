import React, { Component } from 'react';
import './App.css';
import Lines from './lines';
import CategorySelect from './categorySelect';
import axios from 'axios'
import UserStorySelect from './userStorySelect';
import { Button, Input, Row, Col } from 'reactstrap';



class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div></div>
        )

    }
}



class TaskContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {

            //---by ad ----//
            currentCategory: '',
            currentProject: this.props.currentProject,
            //-------end-------//
            arrayResult: [],
            taskContainerName: '',
            mileStoneNumber: 0,
            numberOfTasks: 1,
            totalWorkNumber: 0,
            catAndCompFilteredObject: {},

            taskName: '',
            taskNamesArray: [],
            complexArray: [0],
            riskArray: [0],
            learningDaysArray: [0],
            learningDays: 0,
            tasksUserStoryArray: [''],
            taskContainerUserStory: '',
            detailsArray: [],
            assumptionsArray: [],

            taskMode: false

        };
    }

    async save() {
        console.log('current---------""', this.state.currentProject);


        var taskContainer =  {
            containerName: this.state.taskContainerName,
            category: this.state.currentCategory,
            days: this.getTotalWeightedEffort(),
            tasks: [],
            milestoneName: this.state.mileStoneNumber
        }

        for (let i = 0; i < this.state.numberOfTasks; i++) {
            taskContainer.tasks.push({
                taskName: this.state.taskNamesArray[i],
                days: ((this.state.complexArray[i] + this.state.learningDaysArray[i]) * this.state.riskArray[i]).toFixed(1),
                milestoneName: this.state.mileStoneNumber,
                complexity: this.state.complexArray[i],
                details: this.state.detailsArray[i],
                assumptions: this.state.assumptionsArray[i]
            })
        }
        console.log(taskContainer);
        await axios.put(`http://10.2.2.114:5000/api/effort/createContainer/${this.state.currentProject}/${this.state.mileStoneNumber}`, taskContainer)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    taskContainerNameChange = (e) => {
        e.persist();
        var taskContainerName = e.target.value;
        this.setState({ taskContainerName: taskContainerName });
    }

    categoryChange = (e) => {
        var value = e.target.value;
        axios.get(`http://10.2.2.114:8080/app/find_category/?category=${value}`)
            .then(response => {
                console.log(response.data);
                this.setState({ arrayResult: response.data.arrayResult });
            })
    }

    mileStoneChange = (e) => {
        e.persist();
        var mileStoneNumber = parseInt(e.target.value);
        console.log('Entered mileStoneNumber:', mileStoneNumber);

        if (mileStoneNumber > -1 && mileStoneNumber < 6) {
            this.setState({ mileStoneNumber: mileStoneNumber });
        }
        else {
            window.alert('Please enter the number from 0 to 5');
            e.target.value = this.state.mileStoneNumber;
        }
    }

    numberOfTasksChange = (e) => {
        try {
            e.persist();
            var value = parseInt(e.target.value);
            if (value > 0 && value < 31) {

                var deletedLinesNumber = this.state.numberOfTasks - value;
                var complexArray = this.state.complexArray.slice();
                var riskArray = this.state.riskArray.slice();
                var learningDaysArray = this.state.learningDaysArray.slice();
                var tasksUserStoryArray = this.state.tasksUserStoryArray.slice();
                var taskNamesArray = this.state.taskNamesArray.slice();

                if (deletedLinesNumber > 0) {   // here deletedLinesNumber - is DELETED lines number                                   
                    console.log('number of deleted lines ', deletedLinesNumber);
                    for (var i = 0; i < deletedLinesNumber; i++) {
                        complexArray.pop();
                        riskArray.pop();
                        learningDaysArray.pop();
                        tasksUserStoryArray.pop()
                        taskNamesArray.pop();
                    }
                }
                if (deletedLinesNumber < 0) {     // here deletedLinesNumber - is ADDED lines number
                    console.log('number of deleted lines ', deletedLinesNumber);
                    for (var i = 0; i < Math.abs(deletedLinesNumber); i++) {
                        complexArray.push(0);
                        riskArray.push(0);
                        learningDaysArray.push(0);
                        tasksUserStoryArray.push(this.state.taskContainerUserStory);
                        taskNamesArray.push('');
                    }
                }
                console.log('complexArray ', complexArray);
                console.log('riskArray ', riskArray);
                console.log('learningDaysArray ', learningDaysArray);
                console.log('tasksUserStoryArray', tasksUserStoryArray);
                console.log('taskNamesArray', taskNamesArray);

                this.setState({ learningDaysArray: learningDaysArray });
                this.setState({ complexArray: complexArray });
                this.setState({ riskArray: riskArray });
                this.setState({ tasksUserStoryArray: tasksUserStoryArray });
                this.setState({ taskNamesArray: taskNamesArray });

                this.setState({ numberOfTasks: value });
            }
            else {
                window.alert('Please enter the number from 1 to 30');
                e.target.value = this.state.numberOfTasks;
            }
        } catch (error) {
            console.log('error');
        }
    }

    taskNameChange = (e) => {
        e.persist();
        var taskName = e.target.value;
        var lineIndex = e.target.attributes.lineindex.nodeValue;
        var taskNamesArray = this.state.taskNamesArray.slice();
        taskNamesArray[lineIndex] = taskName;
        this.setState({ taskNamesArray: taskNamesArray });
        console.log('taskNamesArray', taskNamesArray);
    }

    learningDaysChange = (e) => {
        e.persist();
        var value = parseInt(e.target.value);
        var lineIndex = e.target.attributes.lineindex.nodeValue;
        console.log('lineIndex', lineIndex);
        var learningDaysArray = this.state.learningDaysArray;

        if (value >= 0 && value < 11) {
            this.setState({ learningDays: value });      // learning days amount validation

            learningDaysArray[lineIndex] = value;     // learning days array filling for future Weighted Effort and Total Weighted Effort calculation
            this.setState({ learningDaysArray: learningDaysArray });
        }
        else {
            window.alert('Please enter the number from 0 to 10');
            e.target.value = this.state.learningDays;   // display the previous learning days amount 
        }
    }

    complexityClickHandler = (e) => {


        e.persist();
        var value = e.target.value;
        console.log('complexity :', value);

        var lineIndex = e.target.attributes.lineindex.nodeValue;
        console.log('lineIndex', lineIndex);
        var complexArray = this.state.complexArray;

        if (value === 'L') {
            complexArray[lineIndex] = parseFloat(this.state.catAndCompFilteredObject.low_complexity);
            this.setState({ complexArray: complexArray });
        }
        if (value === 'M') {
            complexArray[lineIndex] = parseFloat(this.state.catAndCompFilteredObject.med_complexity);
            this.setState({ complexArray: complexArray });
        }
        if (value === 'H') {
            complexArray[lineIndex] = parseFloat(this.state.catAndCompFilteredObject.high_complexity);
            this.setState({ complexArray: complexArray });
        }
    }
    riskClickHandler = (e) => {
        e.persist();
        var value = e.target.value;
        console.log('risk level :', value);

        var lineIndex = e.target.attributes.lineindex.nodeValue;
        console.log('lineIndex', lineIndex);

        var riskArray = this.state.riskArray;
        if (value === 'L') {
            riskArray[lineIndex] = 1.1;
            this.setState({ riskArray: riskArray });
        }
        if (value === 'M') {
            riskArray[lineIndex] = 1.2;
            this.setState({ riskArray: riskArray });
        }
        if (value === 'H') {
            riskArray[lineIndex] = 1.3;
            this.setState({ riskArray: riskArray });
        }
    }

    getTotalWeightedEffort = () => {
        var weightedEffortArray = [];
        var complexArray = this.state.complexArray;
        var riskArray = this.state.riskArray;
        var learningDaysArray = this.state.learningDaysArray;

        for (var i = 0; i < complexArray.length; i++) {
            weightedEffortArray[i] = (learningDaysArray[i] + complexArray[i]) * riskArray[i];      // calculate each task's weighted effort
        }
        var total = weightedEffortArray.reduce((total, currValue, initialValue) => total + currValue).toFixed(1);    // calculate whole task container weighted effort

        return total
    }

    componentChange = (e) => {
        e.persist();
        var value = e.target.value;
        console.log(value);
        var arrayResult = this.state.arrayResult.slice();
        var catAndCompFilteredArray = arrayResult.filter(current => current.component === value);   // we need to find a document with category={category}&component={component}  and we know that category is same for each taskcontainer
        console.log(catAndCompFilteredArray);
        var catAndCompFilteredObject = catAndCompFilteredArray[0];
        this.setState({ catAndCompFilteredObject: catAndCompFilteredObject });
    }

    userStorySelectChange = (e) => {  // if user changes Task Container user story => each Task user story should be changed to Task Container user story
        e.persist();
        var taskContainerUserStory = e.target.value;
        this.setState({ taskContainerUserStory: taskContainerUserStory });

        //  HERE WE also HAVE TO CHANGE this.state.tasksUserStoryArray    !!!! 
        var tasksUserStoryArray = this.state.tasksUserStoryArray.slice();
        for (let i = 0; i < tasksUserStoryArray.length; i++) {
            tasksUserStoryArray[i] = taskContainerUserStory;

        }
        this.setState({ tasksUserStoryArray: tasksUserStoryArray });
    }

    taskUserStorySelectChange = (e) => {
        e.persist();

        var taskUserStory = e.target.value;
        var lineIndex = e.target.attributes.lineindex.nodeValue;

        console.log('lineIndex', lineIndex);
        console.log('lineIndex', e);

        var tasksUserStoryArray = this.state.tasksUserStoryArray.slice();
        tasksUserStoryArray[lineIndex] = taskUserStory;
        this.setState({ tasksUserStoryArray: tasksUserStoryArray });
    }

    detailsHandler = (e) => {
        e.persist()
        var lineIndex = e.target.attributes.lineindex.nodeValue;
        var arr = this.state.detailsArray.slice()
        arr[lineIndex] = e.target.value;
        this.setState({ detailsArray: arr });
    }

    assumptionsHandler = (e) => {
        e.persist()
        var lineIndex = e.target.attributes.lineindex.nodeValue;
        var arr = this.state.assumptionsArray.slice()
        arr[lineIndex] = e.target.value;
        this.setState({ assumptionsArray: arr });
    }

    isOpen = () => {
        this.setState({ taskMode: !this.state.taskMode })
    }


    render() {
        return (



            <div style={{ width: '100%', border: 'solid gray 1px', margin: '5px', marginLeft: '0px' }}>

                <Row style={{ width: '100%', /*borderBottom: 'solid gray 1px'*/ margin: '5px', marginLeft: '0px', textAlign: 'left' }}>
                    <Col sm="6" md="3" ><b>Task Container Name:</b></Col>
                    <Col sm="6" md="3">
                        <Input style={{ fontSize: '20px', width: '100%' }} size='40' onChange={this.taskContainerNameChange} type="text" defaultValue={this.props.taskContainerName}></Input>
                    </Col>
                    <Col sm="6" md='2'>Number Of Tasks:</Col>
                    <Col sm="6" md="1">
                        <Input onChange={this.numberOfTasksChange} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='1' max='30' defaultValue='1'></Input>
                    </Col>
                    <Col sm="6" md="2">Milestone:</Col>
                    <Col sm="6" md="1">
                        <Input onChange={this.mileStoneChange} style={{ fontSize: '20px', width: '100%', paddingLeft: '3px' }} type="number" min='0' max='5' defaultValue='0'></Input>

                    </Col>
                </Row>
                <Row style={{ width: '100%', margin: '5px', marginLeft: '0px' }} >
                    <Col style={{ textAlign: 'left' }} sm="6" md='6'>
                        <Row>
                            <Col sm="6" md='6'>
                                Category:
                            </Col>
                            <Col sm="6" md='6'>
                                <CategorySelect onChange={this.categoryChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6" md='6'>
                                User Story:
                            </Col>
                            <Col sm="6" md='6'>
                                <UserStorySelect className='floatLeft' userStories={this.props.userStories} onChange={this.userStorySelectChange} />

                            </Col>
                        </Row>
                    </Col>
                    <Col sm="6" md='6'>
                        <Row>
                            <Col>
                                <b> Total W.E.</b>
                            </Col>
                        </Row>
                        <Col><b>{this.getTotalWeightedEffort()} {/*sum of all tasks weightedEffort*/}</b></Col>
                    </Col>
                </Row>
                <Row style={{ width: '90%', margin: '5px', marginLeft: '0px' }}>
                    <Col>
                        <Button onClick={() => this.isOpen()}>Tasks</Button>

                        {this.state.taskMode ? <Lines
                            taskContainerUserStory={this.state.taskContainerUserStory}
                            numberOfTasks={this.state.numberOfTasks}
                            arrayResult={this.state.arrayResult}
                            complexArray={this.state.complexArray}
                            riskArray={this.state.riskArray}
                            onClick={this.complexityClickHandler}
                            riskClickHandler={this.riskClickHandler}
                            learningDaysChange={this.learningDaysChange}
                            learningDaysArray={this.state.learningDaysArray}
                            onChange={this.componentChange}
                            taskUserStorySelectChange={this.taskUserStorySelectChange}
                            userStories={this.props.userStories}
                            taskNameChange={this.taskNameChange}
                            detailsHandler={this.detailsHandler}
                            assumptionsHandler={this.assumptionsHandler}
                        />
                            : null}

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* {this.state.taskMode ? <Button onClick={() => (this.props.dispatch({ type: "SAVE_TASK_CONTAINER_DATA", payload: this.state }))}>Save</Button> : null} */}
                        <Button onClick={() => this.save()}>Save container</Button>
                    </Col>
                </Row>

            </div>


        );
    }
}
// export default connect(store => store)(TaskContainer);
export default TaskContainer;


