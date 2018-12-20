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
            // projectsArray: ['project1', 'project2', 'project3', 'project4'],
            currentProject: this.props.projectId,
            projectsArray: [],
            userStories: [
                'as a teacher i want a huge display',
                'as a teacher i want a chat',
                'as a teacher i want a automatic mark grader grader grader grader grader grader grader grader grader grader grader grader grader',
            ],
            containers: [],
            TaskContainerNamesArray: [
                
            ],
            category: null,
            container: {
                name: null,
                numberOfTasks: null,
                mileStone: null,
                category: null,
                userStory: null,
                tasks: []
            }



        }
    }
 a=[]
    async componentDidMount() {
        await axios.get(`http://10.2.2.114:5000/api/project/allProjects`)
            .then((response) => {
                var array = [];
                var data = response.data;
                console.log('data', data);

                data.map(elm => array.push(elm))
                this.setState({ projectsArray: array });
                console.log('state', this.state.projectsArray);

            })
            .catch(function (error) {
                console.log(error);
            });
        await this.getAllDataSpecificProject(this.state.currentProject)

        await axios.get(`http://10.2.2.114:5000/api/effort/allData/${this.state.currentProject}`)
            .then((response) => {
                console.log('response', response);
                this.setState({ containers: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });


    }



    getAllDataSpecificProject(currentProject) {
        axios.get(`http://10.2.2.114:5000/api/userStory/allStories/${currentProject}`)
            .then((response) => {
                var arr = []

                var data = response.data;
                console.log(data);
                data.subjects.map((subject, index) => {
                    subject.requirements.map(story => {
                        arr.push(story.userStory)
                    })
                })
                this.setState({ userStories: arr })
            })
            .catch(function (error) {
                console.log(error);

            });
    }


    createNewTaskContainer() {

        console.log('a');
        var copy = this.state.TaskContainerNamesArray
        copy.push(<TaskContainer />)
        this.setState({ TaskContainerNamesArray: copy })
    }

    projectChangede(e) {
        this.setState({ currentProject: e })
        this.getAllDataSpecificProject(e)
        axios.get(`http://10.2.2.114:5000/api/effort/allData/${e}`)
            .then((response) => {
                console.log('response', response);
                this.setState({ containers: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    containerSelect(e){

    }

    render() {

        var arr = this.state.containers.slice();
        var containersName = []
        arr.map((current, index) => {
            current.containers.map((containers, index) => {
                console.log(containers);
                containersName.push(
                    <TaskContainer
                    currentProject={this.state.currentProject}
                    userStories={this.state.userStories}
                    taskContainerName={containers.containerName}
                    key={index}>
                </TaskContainer>)
            
            })
        });
       

        return (
            <div className="ProjectManager">
                <Row>
                    {/* <Col md='3'><SelectProject projectarray={this.state.projectsArray} */}
                    <Col md='3'><SelectProject defaultValue={this.state.currentProject} projectarray={this.state.projectsArray}
                        onChange={(e) => this.projectChangede(e.target.value)} /></Col>
                    <Col md='3'><Button onClickCapture={() => this.createNewTaskContainer()} >Create task-container</Button></Col>
                    <Col md='6'>
                        <Row>
                            <Col> <select onChange={(e) => this.containerSelect(e.target.value)}>
                                <option hidden >select container</option>
                                {this.a.map((con, index) => {
                                    return <option key={index}>{con}</option>
                                })}
                            </select> </Col>
                            <Col> </Col>
                        </Row>
                        {/* <Row>
                            <Col> <Input placeholder='new project name...' onChange={(i) => this.state.newProjectName = i} /></Col>
                            <Col><Button type="submit" onClick={() => this.createNewProject()} >Create new project</Button></Col>
                        </Row> */}
                    </Col>
                </Row>

                <div>
                    <br />
                    {/* {this.state.containers.map((current, index)=>{
                    
                        return <TaskContainer currentProject={this.state.currentProject} userStories={this.state.userStories} taskContainerName={current} key={index}></TaskContainer>
                    })} */}
                    {containersName}
                </div>


            </div>

        );
    }
}

export default ProjectManager;




