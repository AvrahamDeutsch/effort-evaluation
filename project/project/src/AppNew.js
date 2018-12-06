import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Redux from 'redux';
import axios from 'axios'
//import Router from './router';
import Category from './category'
import MyComponent from './component'
import Complexity from './complexity';
import Line from './line'
import Select from './select'
import CreateLine from './createLine'
var key = 0;
var linekey = 0;

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
      data: [],
      selectionCategory: "All",
      selectionComponent: "All",
      addComponentDisplay:"hidden"
    }
    this.inputArray = [];
  }

  selectChangeCategoryHandler(e) {
    console.log(e.target.value)
    this.setState({ selectionCategory: e.target.value, selectionComponent:"All"});
  }
  selectChangeComponentHandler(e) {
    console.log(e.target.value)
    this.setState({ selectionComponent: e.target.value });
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
    axios.get(`http://localhost:3000/app/find_${categoryOrComp}/?${categoryOrComp}=${value}`)
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
      url: 'http://localhost:3000/app/delete_due_to_id',
      data: { id: id }
    })
      .then((response) => {
        console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

    this.loadDataFromDB();

    // newFilteredArr = newArr.filter(current => current._id !== id)
    // console.log('newArr ', newFilteredArr);
    // renderedData = newFilteredArr.map(current => {
    //   return <Line onChange={this.inputChangeHandler} onClick1={this.deleteClick} onClick2={this.saveEditClick} linekey={linekey++} key={key++} document={current} />
    // });
    // this.setState({ newData: renderedData });
    // this.setState({ notRendered: newFilteredArr });
    // this.inputArray = this.state.notRendered.slice();
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
      url: 'http://localhost:3000/app/edit_due_to_id',
      data: inputObj
    })
      .then((response) => {
        console.log(response.data);
        // this.setState({ notRendered: this.inputArray });
        this.loadDataFromDB();
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
        <Select onChange={this.selectChangeCategoryHandler.bind(this)} categoryorcomp={"All"} selectArray={this.generateSelectOptions(this.state.data,true)} />
        <Select onChange={this.selectChangeComponentHandler.bind(this)} categoryorcomp={"All"} selectArray={this.generateSelectOptions(this.state.data,false)} />
        <br />

        <Line document={document.first} />
        <CreateLine display={this.state.addComponentDisplay}/>
        {/* <div>{document.newData}</div> */}
        <div>{document.data.filter(this.selectFiltering).map(this.componentRenderer)}</div>
      </div>
    );
  }

  generateSelectOptions(array, category = false) {
    let arr;
    if (category) {
      arr = array.map((elem) => { return elem.category });
    }
    else {
      arr = array.map((elem) => { return elem.component });
    }
    let result = []
    for (let i = 0; i < arr.length; i++) {
      if (!result.includes(arr[i])){
        result.push(arr[i])
      }
    }
    return result
  }

  selectFiltering = (elem) => {
    // filter by categoty / component
    let category = (this.state.selectionCategory === "All") || (elem.category === this.state.selectionCategory)
    let component = (this.state.selectionComponent === "All") || (elem.component === this.state.selectionComponent)
    return category && component;
  }

  componentRenderer = (elem) => {
    return <Line onClick1={this.deleteClick} onClick2={this.saveEditClick} onChange={this.inputChangeHandler} linekey={linekey++} key={key++} document={elem} />
  }

  componentDidMount() {
    this.setState({ selectionCategory: "All", selectionComponent: "All" });
    this.loadDataFromDB();
  }

  loadDataFromDB() {
    var renderedData = []
    this.setState({ newData: renderedData });   // ????????????????????????????????????
    var key = 0;
    var linekey = 0;
    axios.get('/app')
      .then(response => {
        console.log('this ' + this);
        console.log(response.data);
        // this.setState({ notRendered: response.data.arrayResult });
        this.inputArray = this.state.notRendered;
        // renderedData = response.data.arrayResult.map(current => {
        //   return <Line onClick1={this.deleteClick} onClick2={this.saveEditClick} onChange={this.inputChangeHandler} linekey={linekey++} key={key++} document={current} />
        // });
        this.setState({ data: response.data.arrayResult })
        console.log(this.state.data);
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
