import React, { Component } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Glyphicon,
  Thumbnail,
  Image
} from "react-bootstrap";
import ManagerForm from "./ManagerForm";
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Modal } from 'antd';
const { Meta } = Card;

class Resources extends Component {

  state = {
    modalVisible: false,
    files: []
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
        window.location.assign('https://www.paylease.com/registration/pay_portal/2386660/ACC?vpw=800');
        break;
      case 'condocerts':
        window.location.assign('https://secure.condocerts.com/resale/');
        break;
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-files')
    .then(results => {
      return results.json();
    }).then(data => {

      let files = data.files.map((file) => {
        return (
          <ListGroupItem
            className="form-item"
            href={file.file_url}
          >
              {file.file_name}
          </ListGroupItem>
        )
      });

      this.setState({files: files});
    });
  }


  render() {
    return (
      <div className="Contact">
        <Banner
          title="RESIDENT / OWNER RESOURCES"
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/resources2.jpg"
        />

          <br/>
            <br/>

      <div className="desc-container" id="tenant-options">
        <h1 className="title-container">RESOURCE LINKS</h1>
<br/>
  <br/>

        <Grid className="card-grid">
        <Row className="card-row">
        <Col xs={12} sm={12} md={12} lg={4} className="card-col">
          <a onClick={() => this.cardClick('forms')}>
          <div className="text-center res-banner" style={{backgroundImage: 'url("https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/forms.png")'}}>
            <div className="ban-inner">
              <h1 className="title-banner title-lower-banner">{(window.innerWidth < 991)? 'RENTAL FORMS' : 'RENTAL\nFORMS'}</h1>
              <br />
            </div>

          </div>
  </a>
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} className="card-col">
          <a onClick={() => this.cardClick('payments')}>
          <div className="text-center res-banner" style={{backgroundImage: 'url("https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/payment.png")'}}>
            <div className="ban-inner">
              <h1 className="title-banner title-lower-banner">MAKE PAYMENT</h1>
              <br />
            </div>

          </div>
</a>
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} className="card-col">
          <a onClick={() => this.cardClick('condocerts')}>
          <div className="text-center res-banner" style={{backgroundImage: 'url("https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/condo-04.png")'}}>
            <div className="ban-inner">
              <h1 className="title-banner title-lower-banner">CONDOCERTS</h1>
              <br />
            </div>

          </div>
</a>

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
    {this.state.files}
  </ListGroup>
</Modal>

  </div>
        <div className="grey" id="resource-form">
          <ManagerForm title="WORK ORDER / CONTACT YOUR MANAGER" />
        </div>
        <Footer bg="grey" logo="hide"/>
      </div>
    )
  }
}

export default Resources;
//
//
// <Card
//   className="home-card"
//   hoverable
//   bodyStyle={{ padding: 5, paddingBottom: 0 }}
//   onClick={() => this.cardClick('condocerts')}
//   id="condocerts"
//   >
//   <div className="custom-image">
//     <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/condocerts.jpg" />
//   </div>
//   <div className="custom-card">
//     <h1></h1>
//     <p>Condocerts</p>
//   </div>
// </Card>
//
//
// <Card
//   className="home-card forms-button"
//   hoverable
//   bodyStyle={{ padding: 5, paddingBottom: 0 }}
//   onClick={() => this.cardClick('forms')}
//   id="forms"
//   >
//   <div className="custom-image">
//     <img alt="example" width="100%" src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/rentalforms.jpg" />
//   </div>
//   <div className="custom-card">
//     <h1></h1>
//     <p>Rental Forms</p>
//   </div>
// </Card>


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
