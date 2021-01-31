import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";


import Typing from 'react-typing-animation';
import BC from "bc.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default class VotePage extends React.Component {
  /**const [contractAdress, setCA] = useState();
  const [bc, setBC] = useState(); 
  const [vote, setVote] = useState();
  useEffect(async() => {
    await setCA(props.match.params.token);
    setBC(new BC(contractAdress)).then((d)=>{
      console.log("ended");
    });
    bc.GetCandidates("Tezos").then(async (data) => {
      await setVote(data);
      console.log(vote);
    })
    

 }, []);**/
  async componentDidMount(){
    await this.setState({contractAdress: this.props.match.params.token});
    await this.setState({bc: new BC(this.state.contractAdress)});
    await this.setState({vote: await this.state.bc.GetVote()});
    console.log(this.state.vote);
    this.state.vote.votesRecord.valueMap.forEach((value, key) => {
      console.log(value.c[0], key.trim())
    })
    //this.state.vote.votesRecord.valueMap.map((elt,i)=>console.log(elt));

    /**setBC(new BC(contractAdress)).then((d)=>{
      console.log("ended");
    });
    bc.GetCandidates("Tezos").then(async (data) => {
      await setVote(data);
      console.log(vote);
    })**/
  }
  constructor(props){
    super(props);
    this.state = {
      contractAdress: '',
      bc: '',
      vote: '',
    }

  }

  getComponents(myHashMap) {
    const comps = [];
    myHashMap.forEach((value, key) => comps.push(<Card style={{maxWidth: "800px"}} myKey={key} myValue={value.c[0]}>
      <CardBody>
        
        <h2 className={"text-center my-4"}>{key.replaceAll('"', "")}</h2>
        <hr/>
        <GridContainer
        className={"my-4"}
            container
            direction="row"
            justify="center"
            alignItems="center">
            <Button color="primary" size="lg" onClick={() =>{
              this.state.bc.VotingFunction(key)
            }}>JE VOTE {key.replaceAll('"', "")}</Button>
            </GridContainer>
      </CardBody>
    </Card>));
    return comps;
  }


  render(){
    if(this.state.vote){
      const componentsToRender = this.getComponents(this.state.vote.votesRecord.valueMap);
    
    
    return (
      <div>
        <Header
          color="white"
          routes={dashboardRoutes}
          brand="THINK"
          rightLinks={<HeaderLinks />}
          fixed
          
          {...this.props}
        />
       <div className={"text-center bg-white border rounded py-4"} style={{marginTop: "75px"}}>
            <h2 className={"display-3"}>{this.state.vote.description}</h2>
            <h3>Organisé par {this.state.vote.owner}</h3>
            <h3 className={"text-warning"}>{this.state.vote.votesRecord.size} candidats</h3>
          </div>
        <div  style={{width: '98%', minHeight: '100vh', marginTop: "100px",}} className={"mx-auto"}>
          
          <div className={"d-flex flex-column align-items-center justify-content-center"}>
            {componentsToRender}
          </div>
        </div>
        <Footer />
      </div>
    );
  }else{
    return(<div></div>)

  }
}
    
}
