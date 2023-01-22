
 
import React, { Component } from 'react';
import './App.css';
let n=0
class App extends Component {

  render() {
    return (
      <div className="container">
        <h1>Bonjour le gens</h1>
       
        <span>0</span>
      </div>
    );

    window.setInterval(()=>{
      n++
      this.render()
    },100)
  }
  
}



export default App;



