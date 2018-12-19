import React, { Component } from 'react';
import './App.css';
import ProjectManager from './projectManager';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <ProjectManager projectId = {'5c12522a2f91183a3ca92763'}/> */}
      <ProjectManager projectId = {'5c12523e2f91183a3ca92765'}/>
      </div>
    );
  }
}

export default App;
