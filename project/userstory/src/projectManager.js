import React, { Component } from 'react';
import './App.css';
import TaskContainer from './taskContainer';
import SelectProject from './selectProject';
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Input, Row, Col, Form } from 'reactstrap';
import store from './store/store.js'


class ProjectManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectsArray: ['project1', 'project2', 'project3', 'project4'],
            userStories: [
                'as a teacher i want a huge display',
                'as a teacher i want a chat',
                'as a teacher i want a automatic mark grader grader grader grader grader grader grader grader grader grader grader grader grader',
            ],
            TaskContainerNamesArray: [
                'Student UI',
                // 'Teacher UI',
                // 'Admin UI', 
                // 'Cluster leader UI', 
                // 'Backend',
            ],
           
        }
    }

    componentDidMount() {


        // store.dispatch({ type: 'GET_ALL_DATA' })



        // axios.get(`http://10.2.1.106:8080/app/allStories/:projectID`)
        // .then((response) => {
        //     console.log(response.data);
        //     var key = 0;
        //     var array = [];
        //     array = response.data.arrayResult.slice();

        //     this.setState(
        //         {
        //             renderedData: array.map(current => {
        //                 return (<option onChange={this.props.onChange} className='option' key={key++}>{current}</option>)
        //             })
        //         });
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });

    }

    createNewTaskContainer() {

        console.log('a');
        var copy = this.state.TaskContainerNamesArray
        copy.push(<TaskContainer />)
        this.setState({ TaskContainerNamesArray: copy })
    }

    createNewProject() {
        store.dispatch({ type: 'CREATE_NEW_PROJECT', payload:{projectName:this.state.newProjectName, projectID:2}})

    }

    render() {
        var key = -1;
        var renderedData = this.state.TaskContainerNamesArray.map(current => {
            return <TaskContainer userStories={this.state.userStories} taskContainerName={current} key={key++}></TaskContainer>
        });



        return (
            <div className="ProjectManager">
                <Row>
                    <Col md='3'><SelectProject projectarray={this.state.projectsArray} /></Col>
                    <Col md='3'><Button onClick={() => this.createNewTaskContainer()} >Create task-container</Button></Col>
                    <Col md='6'>
                        <Row>
                            <Col> <Input placeholder='new project name...' onChange={(i) => this.state.newProjectName = i.target.value} /></Col>
                            <Col><Button type="submit" onClick={() => this.createNewProject()} >Create new project</Button></Col>
                        </Row>
                    </Col>
                </Row>

                <div>
                    <br />
                    {renderedData}

                </div>


            </div>

        );
    }
}

export default connect(store => store)(ProjectManager);




