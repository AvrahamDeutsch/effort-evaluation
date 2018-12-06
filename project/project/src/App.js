import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Category from './category'
import MyComponent from './component'
import Complexity from './complexity';
import Line from './line'
import LineHeader from './header'
import Select from './select'
import CreateLine from './createLine'


var url = '/app'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: {
        category: 'category',
        component: 'component',
        low_complexity: 'low',
        med_complexity: 'med',
        high_complexity: 'high'
      },
      newData: [],
      notRendered: [],
    }
    this.inputArray = [];
    this.selectCategoryArray = [];
    this.selectComponentArray = [];
  }

  handleChange = (e) => {

    e.persist();
    console.log(e.target.value);
    console.log(e.target);
    console.log(e);
    var value = e.target.value;
    var categoryOrComp = e.target.attributes.categoryorcomp.nodeValue;
    console.log(categoryOrComp);

    var renderedData = []
    this.setState({ newData: renderedData });   // ????????????????????????????????????
    var key = 0;
    var linekey = 0;
    axios.get(`${url}/find_${categoryOrComp}/?${categoryOrComp}=${value}`)
      .then(response => {
        console.log('this ', this);
        console.log(response.data);
        renderedData = response.data.arrayResult.map(current => {
          return <Line onChange={this.inputChangeHandler} onClick1={this.deleteClick} onClick2={this.saveEditClick} linekey={linekey++} key={key++} document={current} />
        });
        this.setState({ notRendered: response.data.arrayResult })
        this.setState({ newData: renderedData });
        this.inputArray = this.state.notRendered.slice();
        //      this.inputArray = response.data.arrayResult.slice();
      });
  }

  AddNewClick = () => {
    var renderedData = [];
    this.setState({ newData: renderedData });   // ????????????????????????????????????
    renderedData.push(<CreateLine />);
    console.log('inputs = ', renderedData);
    this.setState({ newData: renderedData })
  }

  homeClick = () => {
    this.updateDisplayedData();
  }

  deleteClick = (e) => {
    var res = window.confirm('delete component?')
    if (res == false) {
      return
    }
    e.persist();
    var id = e._targetInst.memoizedProps.document._id;
    console.log(id);
    var renderedData = []
    this.setState({ newData: renderedData });   // ????????????????????????????????????
    this.setState({ notRendered: renderedData });  // ????????????????????????????????????


    var key = 0;
    var linekey = 0;
    var newArr = [];
    var newFilteredArr = [];
    newArr = this.state.notRendered.slice();
    console.log('newArr ' + newArr);
    axios({
      method: 'delete',
      url: `${url}/delete_due_to_id`,
      data: { id: id }
    })
      .then((response) => {
        console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

    newFilteredArr = newArr.filter(current => current._id !== id)
    console.log('newArr ', newFilteredArr);
    renderedData = newFilteredArr.map(current => {
      return <Line onChange={this.inputChangeHandler} onClick1={this.deleteClick} onClick2={this.saveEditClick} linekey={linekey++} key={key++} document={current} />
    });
    this.setState({ newData: renderedData });
    this.setState({ notRendered: newFilteredArr });
    this.inputArray = this.state.notRendered.slice();
  }

  saveEditClick = (e) => {
    e.persist();
    var id = e._targetInst.memoizedProps.document._id;
    var index = e._targetInst.memoizedProps.linekey;
    var inputObj = this.inputArray[index];
    console.log('id ' + id);
    console.log('index ' + index);
    console.log(`inputArray [${index}] : `, inputObj);
    console.log(`notRendered[${index}] :`, this.state.notRendered[index]);
    var res = window.confirm('save changes?')
    if (res == false) {
      return
    }

    // if (JSON.stringify(inputObj) === JSON.stringify(this.state.notRendered[index])) {
    //   console.log('no change to commit');
    //   console.log(`notRendered [${index}] : `, this.state.notRendered[index]);

    // }
    // else if (JSON.stringify(inputObj) === JSON.stringify(this.state.notRendered[index])) {

    //   console.log('save changes')
    // }
    axios({
      method: 'post',
      url:  `${url}/edit_due_to_id`,
      data: inputObj
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ notRendered: this.inputArray });
        console.log("notRendered", this.state.notRendered);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  inputChangeHandler = (e) => {
    e.persist();
    var index = e._targetInst.memoizedProps.linekey;
    var key = e.target.className;
    console.log("e.target.className: " + key);


    this.inputArray[index][key] = e.target.value;

    console.log('linekey ' + index); //

    console.log(`inputArray [${index}].${key} : ` + this.inputArray[index][key]);

    console.log(this.state.notRendered[index][key]);

  }


  render() {
    var document = this.state;
    return (
      <div className="App">
        <button className='btn' onClick={this.homeClick}>Home</button>
        <button className='btn' onClick={this.AddNewClick}> Add component</button>
        <br/>
        <Select onChange={this.handleChange} categoryorcomp={document.first.category} selectArray={this.selectFiltering(document.first.category)} />
        <Select onChange={this.handleChange} categoryorcomp={document.first.component} selectArray={this.selectFiltering(document.first.component)} />
        <br />

        <LineHeader document={document.first} />
        <div className='break' />
        <div>{document.newData}</div>
      </div>
    );
  }

  selectFiltering = (elem) => {
    // get category /component values  
    axios.get( `${url}/${elem}_value_list`)
      .then((response) => {
        console.log(response.data);
        
        if (elem == this.state.first.category) {
          this.selectCategoryArray = response.data.arrayResult.slice();
        }
        if (elem == this.state.first.component) {
          this.selectComponentArray = response.data.arrayResult.slice();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      if (elem == this.state.first.category) {
        return this.selectCategoryArray;
      }
      if (elem == this.state.first.component) {
        return this.selectComponentArray;
      }
  }

  componentRenderer(elem) {
    // creates the HTML to display
  }

  componentDidMount() {
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    var renderedData = []
    this.setState({ newData: renderedData });   // ????????????????????????????????????
    var key = 0;
    var linekey = 0;
    axios.get(url)
      .then(response => {
        console.log('this ' + this);
        console.log(response.data);
        this.setState({ notRendered: response.data.arrayResult });
        this.inputArray = this.state.notRendered;
        renderedData = response.data.arrayResult.map(current => {
          return <Line onClick1={this.deleteClick} onClick2={this.saveEditClick} onChange={this.inputChangeHandler} linekey={linekey++} key={key++} document={current} />
        });
        this.setState({ newData: renderedData })
        console.log(this.state.newData);
      });
  }




  /*
  componentDidUpdate(prevProps) {
    var renderedData = []
    axios.get('http://localhost:3000/app')
      .then(function (response) {
 
        console.log(response.data);
        renderedData = response.data.arrayResult.map(current => {
          return <Line document={current} />
        });
 
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ newData: renderedData })
    console.log(this.state.newData);
 
  }
  */
}
export default App;
