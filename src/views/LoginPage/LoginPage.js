import React from "react";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const { register, errors, handleSubmit } = useForm();

  //connexion ici
  const onSubmit = (data)=>{
    alert(JSON.stringify(data));
  } 
  
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Se connecter</h4>
                    
                  </CardHeader>
                  <CardBody>
                    
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      ACCEDER
                    </Button>
                  </CardFooter>
                  <div className={"d-flex justify-content-center my-2"}>
                    <Button simple color="primary" href="/signin">Je me crée un compte</Button>
                  </div>
                  
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
