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
            TaskContainerNamesArray: [
                'Student UI',
                // 'Teacher UI',
                // 'Admin UI', 
                // 'Cluster leader UI', 
                // 'Backend',
            ],

        }
    }

    async componentDidMount() {
        await axios.get(`http://10.2.2.114:5000/api/project/allProjects`)
        .then((response) => {
            var array = [];
            var data = response.data;
            data.map(elm => array.push(elm))
            this.setState({ projectsArray: array });
        })
        .catch(function (error) {
            console.log(error);
        });
        await this.getAllDataSpecificProject(this.state.currentProject)
    }
        
        
        
        getAllDataSpecificProject (currentProject){
            axios.get(`http://10.2.2.114:5000/api/userStory/allStories/${currentProject}`)
            .then((response) => {
                var arr = []
                
                var data = response.data;
                console.log(data);
                data.subjects.map((subject, index)=>{
                    subject.requirements.map(story=>{
                         arr.push(story.userStory)
                    }) 
                })
                this.setState({userStories:arr})
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
           
        }
        
        render() {
            var renderedData = this.state.TaskContainerNamesArray.map((current, index) => {
                return <TaskContainer currentProject={this.state.currentProject} userStories={this.state.userStories} taskContainerName={current} key={index}></TaskContainer>
                // return <TaskContainer taskContainerName={current} key={index}></TaskContainer>
            });
            
            
            return (
                <div className="ProjectManager">
                <Row>
                    {/* <Col md='3'><SelectProject projectarray={this.state.projectsArray} */}
                     <Col md='3'><SelectProject defaultValue={this.state.currentProject} projectarray={this.state.projectsArray}
                        onChange={(e) => this.projectChangede(e.target.value)} /></Col>
                    <Col md='3'><Button onClick={() => this.createNewTaskContainer()} >Create task-container</Button></Col>
                    <Col md='6'>
                        <Row>
                            <Col> <Input placeholder='new project name...' onChange={(i) => this.state.newProjectName = i} /></Col>
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




