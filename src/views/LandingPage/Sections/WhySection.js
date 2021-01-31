import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import security from "assets/img/security.jpg";
import track from "assets/img/track.jpg";
import simple from "assets/img/simple.jpg";

const useStyles = makeStyles(styles);

export default function WhySection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
    "hideme"
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Pourquoi un vote avec THINK</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={simple} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Accessibilité
                <br />
                <small className={classes.smallTitle}>Un système de vote simplifié</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Grâce à ce système,
                   les votants peuvent faire leurs choix quelque soit leurs localités,
                  grâce à leurs appareils.b THINK est également la meilleur solution pour les malvoyants.
                </p>
              </CardBody>
              
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={security} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Sécurité  
                <br />
                <small className={classes.smallTitle}>Système Blockchain</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Grâce à la technologie Blockchain,
                  les votants sont assurés que leurs voix ne sont pas biaisés.
                </p>
              </CardBody>
              
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={track} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Traçabilité
                <br />
                <small className={classes.smallTitle}>l'information à tous</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Les informations des votes en temps réel et à la fin pour vos statistiques, un rapport vous est généré.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    </div>
  );
}
