import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
//import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";


import BC from "bc.js";
import { ResponsiveBar } from '@nivo/bar'

const dashboardRoutes = [];

//const useStyles = makeStyles(styles);

export default class ResultPage extends React.Component {
 
  async componentDidMount(){
    await this.setState({loading: true});
    await this.setState({contractAdress: this.props.match.params.token});
    await this.setState({bc: new BC(this.state.contractAdress)});
    await this.setState({vote: await this.state.bc.GetVote()});
    await this.setState({loading: false});
  }
  constructor(props){
    super(props);
    this.state = {
      contractAdress: '',
      bc: '',
      vote: '',
      loading: 'true',
    }

  }

  getData(hashmap){
    let data = []
    let keys = [];
    hashmap.forEach((value, key)=>{
        var d = new Map();
        keys.push(key.replaceAll('"', ""));
        d["vote"] = value.c[0];
        d["id"] = key.replaceAll('"', "");
        data.push(d);
    });
    return(data);
  }

  render(){
    if(this.state.vote && !this.state.loading){
      const data = this.getData(this.state.vote.votesRecord.valueMap);
    
    
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
          
          <div className={"d-flex flex-column align-items-center justify-content-center"} style={{height: "75vh", width: "100wh"}}>
          <ResponsiveBar
            data={data}
            keys={['vote']}
            indexBy="id"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'vote'
                    },
                    id: 'dots'
                }
            ]}
            
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'candidats',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'votes',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
          </div>
        </div>
        <Footer />
      </div>
    );
  }else{
    return(<div style={{height: "100vh", width: "100vw"}} className={"d-flex flex-row justify-content-center align-items-center bg-white"}>
    <div className={"lds-hourglass"}></div>
  </div>
  )

  }
}
    
}
