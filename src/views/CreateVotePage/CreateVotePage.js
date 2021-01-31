import React from "react";
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
import Button from "components/CustomButtons/Button";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import BC  from "bc.js";



const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function CreateVotePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="white"
        routes={dashboardRoutes}
        brand="THINK"
        rightLinks={<HeaderLinks />}
        fixed
        
        {...rest}
      />
     
      <div  style={{width: '98%', minHeight: '100vh'}}>
        <div className={classes.container}>
         
        </div>
      </div>
      <Footer />
    </div>
  );
}
