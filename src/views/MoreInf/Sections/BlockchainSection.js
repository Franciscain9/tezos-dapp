import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";



// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Muted from "components/Typography/Muted.js";
import blockchainImg from "assets/img/blockchain3.png";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";



const useStyles = makeStyles(styles);


export default function BlockchainSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
    'hideme'
  );
  const shift = classNames(
      'my-5'
  )
  return (
    <div className={classes.section}>
      <GridContainer justify="center" className="text-dark">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Technologie blockchain</h2>
          <p>La blockchain est une technologie de stockage et
             de transmission d’informations, transparente,
             sécurisée, et fonctionnant sans organe central de contrôle</p>
             <img src={blockchainImg} className={imageClasses+" my-5 rounded"} style={{maxWidth: "500px", width: "100%", height: "auto"}}/>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
