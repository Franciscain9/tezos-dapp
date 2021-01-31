import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Settings from "@material-ui/icons/Settings";
import HowToVote from "@material-ui/icons/HowToVote";
import Assessment from "@material-ui/icons/Assessment";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Comment sont organisés les votes ?</h2>
          <h5 className={classes.description}>
            THINK permet à n'importe quelle structure d'organiser des votes
            de façon automatisée et sécurisée. Ces derniers sont basés sur une 
            technologie Blockchain, assurant à tous un résultat sûr à 100%
            (sans modification ni ajouts des voix).
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4} className={"hideme"}>
            <InfoArea
              title="Paramétrage du vote"
              description="Les informations des candidats,
               la date d'ouverture et de cloture,
               la liste des votants (mail ou numéro de téléphone),
                Le nombre de tours, avec au choix une option de résultats en temps réel."
              icon={Settings}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={"hideme"}>
            <InfoArea
              title="Tous au vote !"
              description="Les votants recoivent un lien les permettant de
               voter de façon simple et sécurisé. Ce lien n'est utilisable
                qu'une seule vois pour effectuer le vote"
              icon={HowToVote}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={"hideme"}>
            <InfoArea
              title="Résultat du vote"
              description="Les résultats du vote sont donnés en temps réel
               selon votre choix, à chaque tour, et à la fin des échéances"
              icon={Assessment}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
