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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import SettingsSection from "./Sections/SettingsSection.js";
import BlockchainSection from "./Sections/BlockchainSection.js";

import bg from "assets/img/blockchain2.jpg";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function MoreInf(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="THINK"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={bg}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Les votes automatisés par THINK.</h1>
              <h4>
                Grâce à notre implémentation de la blockchain, les votes sont fiable à 100%. 
                Les votants peuvent faire leurs choix n'importe où et n'importe quand.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <SettingsSection />
          <BlockchainSection/>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
