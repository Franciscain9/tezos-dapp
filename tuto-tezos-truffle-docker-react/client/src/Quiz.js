

import React, { Component, Fragment } from "react";
import quizdata from './data'
import Answer from "./Answer";

class Quiz extends Component{

  state={
    dataQuestion:[],
  }
 

 setStatefunstion = () =>{
   
//  use reactjs setState 
  this.setState( {
    dataQuestion:quizdata
  })
}
 
 
  componentDidMount(){
    this.setStatefunstion();
  }


  render() {
    return(

      <Fragment> 
    
         {
          this.state.dataQuestion.map( data => {
            console.log( data);
          return <div key={ data.id} className="card"> 
                      <h2> { data.quiz}</h2> 
                     <Answer key={ data.id} rightAnaswer={ data.rightAnaswer} anwer={ data.FindAnswer} />
                 </div>
          })
         }
        
      </Fragment>
    );
  }
}

export default Quiz;