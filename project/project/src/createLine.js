import React, { Component } from 'react';
import { create } from 'domain';
import './App.css';
import axios from 'axios'

class createLine extends Component {

    constructor(props) {
        super(props);

        this.myData = {
            category: "",
            component: "",
            low_complexity: 0,
            med_complexity: 0,
            high_complexity: 0
        };
    }

    clickHandler = () => {
        var res = window.confirm('add new component?')
        if (res == false) {
            return
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/app/save_to_db',
            data:
                this.myData
        })
            .then(response => {
                console.log(response.data);
                alert(JSON.stringify(response.data));
            })
    }

    render() {
        return (
            <div className='line'>
                <input placeholder='Enter category name' id='category' className="category" type='text' onChange={() => { this.myData.category = document.getElementById("category").value }} name='category' required />
                <input placeholder='Enter component name' id='component' className="component" type='text' onChange={() => { this.myData.component = document.getElementById("component").value }} name='component' required />
                <input placeholder='Low complexity man days number' id='low' min="1" type='number' onChange={() => { this.myData.low_complexity = document.getElementById("low").value }} name='low_complexity' required />
                <input placeholder='Medium complexity man days number' id='med' min="1" type='number' onChange={() => { this.myData.med_complexity = document.getElementById("med").value }} name='med_complexity' required />
                <input placeholder='High complexity man days number' id='high' min="1" type='number' onChange={() => { this.myData.high_complexity = document.getElementById("high").value }} name='high_complexity' required />
                <input type="button" id="createNewLineSubmit" className="addInput" onClick={() => { this.clickHandler() }} value="Save New Line into DB" />
            </div>
        );
    }
}

export default createLine;






