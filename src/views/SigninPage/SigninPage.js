import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel/TabPanel.js';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { useForm } from "react-hook-form";

import LockIcon from '@material-ui/icons/Lock';
import InfoIcon from '@material-ui/icons/Info';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles(styles);

export default function SigninPage(props) {
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const { register, getValues, trigger, errors, handleSubmit } = useForm({
    shouldUnregister: false,
    
  });
  const [tabValue, handleTab] = React.useState(0);

  //connexion ici
  const onSubmit = (data)=>{
    alert(JSON.stringify(data));
  }
  const handleChange = (event, newValue) => {
    handleTab(newValue);
  }; 


  
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="THINK"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Inscription</h4>
                    
                  </CardHeader>
                  <CardBody>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example">
                    <Tab icon={<PersonPinIcon />} aria-label="phone" {...a11yProps(0)} disabled/>
                    <Tab icon={<InfoIcon />} aria-label="favorite" {...a11yProps(1)} disabled/>
                    <Tab icon={<LockIcon />} aria-label="person" {...a11yProps(2)} disabled/>
                </Tabs>
                    <TabPanel value={tabValue}  index={0}>
                    
                        <div className={"d-flex flex-column"}>
                        <CustomInput
                        labelText= {!errors.surname?"Prénom":"Prénom requis"}
                        id="surname"
                        
                        formControlProps={{
                            fullWidth: true,
                            
                        }}
                        inputProps={{
                            type: "text",
                            autoComplete: "on",
                            name: "surname",
                            inputRef: register({required: true}),
                            error: errors.surname?true:false
                        }}
                        
                        />
                        <CustomInput
                        labelText= {!errors.name?"Nom":"Nom requis"}
                        id="name"
                        
                        formControlProps={{
                            fullWidth: true,
                            
                        }}
                        inputProps={{
                            type: "text",
                            autoComplete: "on",
                            name: "name",
                            inputRef: register({required: true }),
                            error: errors.name?true:false
                        }}
                        
                        />
                        <div className={"d-flex flex-row-reverse"}>
                        <Button simple color="primary" size="lg" onClick={async(e)=>{
                            
                        
                            await trigger("surname");
                            await trigger("name");
                            if(errors.surname || errors.name){
                                
                            }else{
                                handleChange("ok", 1);
                            }
                        }} type="button">
                            SUIVANT
                        </Button>
                        </div>
                        
                        </div>
                    </TabPanel>
                    
                    <TabPanel value={tabValue} index={1}>
                    <div className={"d-flex flex-column"}>
                        <CustomInput
                            labelText= {!errors.email?"Email...":"Email requis"}
                            id="email"
                            
                            formControlProps={{
                                fullWidth: true,
                                
                            }}
                            inputProps={{
                                type: "email",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className={classes.inputIconsColor}>
                                        mail_outline
                                    </Icon>
                                </InputAdornment>
                                ),
                                autoComplete: "on",
                                name: "email",
                                inputRef: register({required: true }),
                                error: errors.email?true:false
                            }}
                        
                        />
                        <CustomInput
                            labelText= {!errors.email?"Téléphone":"Numéro de Téléphone requis"}
                            id="phone"
                            
                            formControlProps={{
                                fullWidth: true,
                                
                            }}
                            inputProps={{
                                type: "tel",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className={classes.inputIconsColor}>
                                        smartphone
                                    </Icon>
                                </InputAdornment>
                                ),
                                autoComplete: "on",
                                name: "phone",
                                inputRef: register({required: true }),
                                error: errors.phone?true:false
                            }}
                    
                        />
                        <div className={"d-flex flex-row-reverse"}>
                            <Button simple color="primary" size="lg" onClick={()=>handleChange("ok", 2)} onClick={async()=>{
                                await trigger("email");
                                await trigger("phone");
                                if(errors.email || errors.phone){
                                    
                                }else{
                                    handleChange("ok", 2);
                                }
                            }}>
                                SUIVANT
                            </Button>
                            <Button simple color="danger" size="lg" onClick={()=>handleChange("ok", 0)}>
                                RETOUR
                            </Button>
                            
                        </div>
                    </div>
                    </TabPanel>
                    
                    <TabPanel value={tabValue} index={2}>
                        <div className={"d-flex flex-column"}>
                            <CustomInput
                                labelText={!errors.password?"Mot de passe":"Mot de passe requis"}
                                id="pass"
                                formControlProps={{
                                    fullWidth: true,
                                    
                                }}
                                inputProps={{
                                    type: "password",
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon className={classes.inputIconsColor}>
                                        lock_outline
                                        </Icon>
                                    </InputAdornment>
                                    ),
                                    autoComplete: "on",
                                    name: "password",
                                    inputRef: register({required: true }),
                                    error: errors.password?true:false
                                    }}
                            
                            />
                            <CustomInput
                                labelText={!errors.confirm?"Confirmation mot de passe":"Confirmation requise"}
                                id="confirm"
                                formControlProps={{
                                    fullWidth: true,
                                    
                                }}
                                inputProps={{
                                    type: "password",
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon className={classes.inputIconsColor}>
                                        lock_outline
                                        </Icon>
                                    </InputAdornment>
                                    ),
                                    autoComplete: "on",
                                    name: "confirm",
                                    inputRef: register({required: true }),
                                    error: errors.confirm?true:false
                                    }}
                        
                            />
                            <div className={"d-flex flex-row-reverse"}>
                                <Button simple color="primary" size="lg" type="submit">
                                    Envoyer
                                </Button>
                                <Button simple color="danger" size="lg" onClick={()=>{handleChange("ok", 1)}}>
                                    RETOUR
                                </Button>
                                
                            </div>
                        </div>
                    </TabPanel>
                    
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    
                  </CardFooter>      
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
