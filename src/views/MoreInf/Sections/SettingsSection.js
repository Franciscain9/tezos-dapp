import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";



// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Muted from "components/Typography/Muted.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";


//images
import group from "assets/img/mp/group.svg";
import setting from "assets/img/mp/setting.svg";
import vote from "assets/img/mp/vote.svg";
const useStyles = makeStyles(styles);


export default function SettingsSection() {
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
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Paramétrez votre vote</h2>
          <GridContainer style={{color: "black"}} direction="row" justify="space-between" >
            <GridItem xs={12} sm={12} md={12} lg={2}>
                <img alt="..." src={group} style={{maxWidth: "200px"}} className={imageClasses} />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6} className='text-center text-md-left' style={{textAlign: "left"}}>
               <Muted ><h2>Liste des candidats</h2></Muted>
               <div className={shift}>
                   <p>Rentrez le nom et prénom de chaque candidat</p>
                   <p>Ajoutez une photo pour chaque candidat</p>
                   <p>Donnez leurs slogan</p>
               </div>
            </GridItem>
          </GridContainer>
          <hr/>
          <GridContainer style={{color: "black"}} direction="row" justify="space-between" >
            <GridItem xs={12} sm={12} md={12} lg={2}>
                <img alt="..." src={setting} style={{maxWidth: "200px"}} className={imageClasses } />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6} className='text-center text-md-left' style={{textAlign: "left"}}>
               <Muted><h2>Informations du vote</h2></Muted>
               <div className={shift}>
                   <p>L'heure d'ouverture et de fermeture des votes. En dehors de cette plage personne ne pourra voter.</p>
                   <p>Le nombre de tours avec le nombre candidats restant par itération.</p>
                   <p>Choisissez l'option temps réel pour un résultat en live.</p>
               </div>
            </GridItem>
          </GridContainer>
          <hr/>
          <GridContainer style={{color: "black"}} direction="row" justify="space-between" >
            <GridItem xs={12} sm={12} md={12} lg={2}>
                <img alt="..." src={vote} style={{maxWidth: "200px"}} className={imageClasses} />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6} className='text-center text-md-left' style={{textAlign: "left"}}>
               <Muted><h2>Liste des votants</h2></Muted>
               <div className={shift}>
                   <p>Choisissez d'envoyer le lien aux votant par mail ou par sms</p>
                   <p>Une liste des mails ou numéro de téléphone des votants que vous
                        pouvez renseigner directement ou via un fichier Excel</p>
                   <p>Une fois le vote configuré les participants recevrons le lien
                        leurs permettant de voter une seule fois. Le vote effectué ce lien n'est plus utlisable.</p>
               </div>
            </GridItem>
          </GridContainer>
          <hr/>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
