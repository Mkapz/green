import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Container } from '../../components/Grid';
import { withUser } from '../../services/withUser';
import "./HomePage.css";

class HomePage extends Component {

    state = {
        user: ''
    };


  render() {
    // get the user prop from props
    const { user } = this.props; 
    const divStyle = {
          backgroundImage: "url('./assets/images/Green(Environment)(3).jpeg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: -1,
          color: "#90ee90",
          width: "100%",
          height: "100%"
        };
    return (
      <div className="Container">
      
        <Row>


          <img src={require("./images/GreenWaveLogo.jpg")} alt="GreenWaveLogo" className="img-responsive" />
          <h1>Welcome to GreenWave</h1>

          {/* if user signed in */}

          {user &&
            <div>Hi there, {user.username}!</div>
          }
          {!user &&
            <div>
            <h2>Hey! I do not recognize you! Log in using the link above.</h2>
            </div>
          }
        </Row>

        
        <div className="main-container" style={divStyle}>
        <div className="Heading">
        <h2><br/><br/>          GreenWave is a community of environmentally<br/>
                                conscious individuals looking to promote<br/>
                                more sustainable living in their local communities<br/><br/><br/><br/><br/><br/>
        </h2>
        </div>
        </div>
    
      
      <div className="footer">
      <h3>Footer<br/><br/><br/></h3>
      </div>
      </div>
    );
  }
}


export default withUser(HomePage);
