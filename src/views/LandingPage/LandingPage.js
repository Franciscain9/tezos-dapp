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
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import WhySection from "./Sections/WhySection.js";
import ContactSection from "./Sections/ContactSection.js";

import Typing from 'react-typing-animation';
import bg from 'assets/img/landing-bg.jpg';
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
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
              <h1 className={classes.title+" d-flex flex-column flex-lg-row "} style={{height: "120px"}}>
              <span>Un vote &nbsp;</span>
              <Typing speed={1} loop={true} >
                <span>simple.</span>
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={7} />
                <span>sécurisé.</span>
                <Typing.Delay ms={2000} />
                <Typing.Backspace count={9} />
                <span>fiable.</span>
                <Typing.Delay ms={2000} />
                <Typing.Reset/>
              </Typing>
              </h1>
              <h4>
                Parce que chaque voix compte pour faire le bon choix,
                 misé sur la sureté, grâce à notre système de vote basé sur la <strong>Blockchain</strong>.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=QphJEO9ZX6s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                <span className="ml-3">En savoir plus</span>
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised, "m-auto")} style={{width: '98%'}}>
        <div className={classes.container}>
          <ProductSection />
          <GridContainer
            container
            direction="row"
            justify="center"
            alignItems="center"
>
            <Button 
            size = "lg"
            color="rose"
            href="/informations/vote" className={classes.textCenter}>
              COMMENT CREER UN VOTE
            </Button>
          </GridContainer>
          <WhySection />
          <GridContainer
            container
            direction="row"
            justify="center"
            alignItems="center"
>
            <Button 
            size = "lg"
            color="rose"
            href="/new-vote" className={classes.textCenter}>
              JE CREE UN VOTE
            </Button>
          </GridContainer>
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
