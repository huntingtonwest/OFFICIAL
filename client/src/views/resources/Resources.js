import React, { Component } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Glyphicon
} from "react-bootstrap";
import ManagerForm from "./ManagerForm";
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Modal } from 'antd';
const { Meta } = Card;

class Resources extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }


  cardClick(e){
    var loc = '/';
    switch(e) {
      case 'forms':
        this.setModalVisible(true);
        break;
      case 'payments':
        window.location.assign('http://www.paylease.com');
        break;
      case 'condocerts':
        window.location.assign('https://secure.condocerts.com/resale/');
        break;
    }
  }

  render() {
    return (
      <div className="Contact">
        <Banner
          title="RESIDENT / OWNER RESOURCES"
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/resources-banner.jpg"
        />
        <div className="desc-container">
        <Grid>
        <Row>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card forms-button"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('forms')}
            id="forms"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h1.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Rental Forms</p>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('payments')}
            id="payments"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h3.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Make Payments</p>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={4} className="card-col">
          <Card
            className="home-card"
            hoverable
            bodyStyle={{ padding: 5, paddingBottom: 0 }}
            onClick={() => this.cardClick('condocerts')}
            id="condocerts"
            >
            <div className="custom-image">
              <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/h2.jpg" />
            </div>
            <div className="custom-card">
              <h1></h1>
              <p>Condocerts</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Grid>
    <Modal
  title="RENTAL FORMS"
  wrapClassName="vertical-center-modal"
  visible={this.state.modalVisible}
  onCancel={() => this.setModalVisible(false)}
  footer={[
  ]}
  >
  <ListGroup className="form-list">
    <ListGroupItem
      className="form-item"
      href="http://www.huntingtonwest.com/pdf/131_Enter-Exit_Checklist.pdf"
    >
        Enter-exit
        Checklist
    </ListGroupItem>
    <ListGroupItem
      className="form-item"
      href="http://www.huntingtonwest.com/pdf/30DayNotice.pdf"
    >
        30-Day Notice
    </ListGroupItem>

  </ListGroup>
</Modal>

  </div>
        <div className="grey" id="resource-form">
          <ManagerForm title="WORK ORDER / CONTACT YOUR MANAGER" />
        </div>
        <Footer bg="grey" />
      </div>
    );
  }
}

export default Resources;

//OLD RENTAL FORMS + BUTTONS

// <Grid>
//   <Row className="contact-first-row" id="rental-forms">
//     <Col xs={12} md={6}>
//       <h1 className="title-container title-left" id="forms">
//         RENTAL FORMS
//       </h1>
//       <ListGroup className="form-list">
//         <ListGroupItem
//           className="form-item"
//           href="http://www.huntingtonwest.com/pdf/131_Enter-Exit_Checklist.pdf"
//         >
//           <span>
//             <Glyphicon className="glyph" glyph="plus" />Enter-exit
//             Checklist
//           </span>
//         </ListGroupItem>
//         <ListGroupItem
//           className="form-item"
//           href="http://www.huntingtonwest.com/pdf/30DayNotice.pdf"
//         >
//           <span>
//             <Glyphicon className="glyph" glyph="plus" />30-Day Notice
//           </span>
//         </ListGroupItem>
//         <ListGroupItem
//           className="form-item"
//           href="http://www.huntingtonwest.com/pdf/CleaningChecklist.pdf"
//         >
//           <span>
//             <Glyphicon className="glyph" glyph="plus" />Cleaning
//             Checklist
//           </span>
//         </ListGroupItem>
//         <ListGroupItem
//           className="form-item"
//           href="http://www.huntingtonwest.com/pdf/146_Satellite_Dish_Addendum.pdf"
//         >
//           <span>
//             <Glyphicon className="glyph" glyph="plus" />Satellite Dish
//             Addendum
//           </span>
//         </ListGroupItem>
//         <ListGroupItem
//           className="form-item"
//           href="http://www.huntingtonwest.com/pdf/GeneralRulesAndPolicies.pdf"
//         >
//           <span>
//             <Glyphicon className="glyph" glyph="plus" />General Rules &
//             Policies
//           </span>
//         </ListGroupItem>
//       </ListGroup>
//     </Col>
//     <Col xs={12} md={6} className="resource-buttons">
//       <Button
//         id="payment"
//         bsStyle="default"
//         className="resource-button"
//         href="http://www.paylease.com"
//       >
//         Payment
//       </Button>
//       <Button
//         id="condocerts"
//         bsStyle="default"
//         className="resource-button"
//         href="https://secure.condocerts.com/resale/"
//       >
//         Condocerts
//       </Button>
//     </Col>
//   </Row>
// </Grid>
