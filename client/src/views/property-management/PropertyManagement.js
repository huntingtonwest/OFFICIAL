import React, { Component } from "react";
import { Grid, Image, Row, Col } from "react-bootstrap";
import ConsultationForm from "../../components/ScheduleForm";
import CitySearchLinked from "./CitySearchLinked";
import Banner from '../../components/Banner';
import { Tabs } from "antd";
import Footer from '../../components/Footer';

const TabPane = Tabs.TabPane;
const services = [
  "Although, as the owner of the property, you will be consulted on all important decisions, the Account Manager is responsible for the daily supervision of your income property and our support staff. The manager oversees everything from the marketing of a vacant unit, negotiating leases and collecting rent to maintenance. As your agent and adviser, the Account Manager will suggest strategic financial and maintenance goals, such as rent rate increases and property improvements. Additionally, he/she will schedule routine service, negotiate contracts, solicit bids and handle requests from the tenants. Your Account Manager is available twenty-four hours a day to respond to emergencies and answer your questions.",
   "The Property Manager routinely inspects your property to determine safety hazards and needed repairs. The manager monitors the performance of all the property vendors and investigates and resolves complaints. When possible, minor repairs will be performed at your property at no additional cost. The manager is available, on a full time basis, to show vacant units to prospective residents and explain the occupancy terms. The manager works closely with tenants enforcing rules and lease restrictions, as well as posting collection notices.",
   "The Credit/ Collection Associate performs a variety of administrative and clerical tasks to assist the Account Manager in maintaining the smooth and efficient management of your rental property. The Credit Associate investigates and thoroughly screens rental applicants. The Associate is responsible for creating all rental agreements and other legal documents. The Collection Associate handles the typing and mailing of Three Day Notices, Final Accounting letters and facilitates the administrative functions for all assigned collection accounts.",
   "The Accounting Supervisor presides over each property's financial records. The Accountant's staff prepares and mails your monthly rental income statements. The Accountant maintains your property's bank account and is able to pay all property related bills from the account. The Accounting staff prepares and sends each tenant a monthly rental statement and regularly assesses all payments, charges or fines.",
   "There are two receptionists available to greet visitors and to answer telephones. The receptionists are able to schedule and confirm appointments to see vacant units immediately. They are in constant contact with the manager who hows vacant property. Prospective residents can receive detailed information on each vacant rental. Receptionists take property service requests and coordinate with the Account Manager to have all needed repairs completed in a timely manner."
 ];

class PropertyManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: 0,
      open: []
    };
    this.toggleServices = this.toggleServices.bind(this);
  }

  toggleServices(e) {
    // if (window.innerWidth < 775) {
    //   if (this.state.open[e.target.id]) {
    //     this.setState({open[e.target.id]: false});
    //   }
    //   else {
    //     this.setState({open[e.target.id]: true});
    //   }
    //   var y = document.getElementById("responsive-" + e.target.id);
    // }
    // var x = document.getElementsByClassName("grey-text")[0];
    // x.className = "white-text";
    // e.target.className = "grey-text"
    // this.setState({services: e.target.id})

  }

  render() {
    return (
      <div className="App">
        <Banner
          title={`PROPERTY\nMANAGEMENT`}
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/propertymanagementimg.jpg"
        />
        <div className="under-banner">
          <div className="desc-container services-container">
            <h1 className="title-container" id="our-services">
              OUR SERVICES
            </h1>
            <br />
            <Grid>
              <Row className="services-row">
                <Col xs={12} sm={5} lg={5} className="roles">
                  <a onClick={this.toggleServices}><h2 className="grey-text" id="0">ACCOUNT MANAGER</h2></a>
                  <p className="responsive-services" id="responsive-0" style={{display: this.state.open[0] ? 'block' : 'none'}}>{services[0]}</p>
                  <a onClick={this.toggleServices}><h2 id="1">PROPERTY MANAGER</h2></a>
                  <p className="responsive-services" style={{display: this.state.open[1] ? 'block' : 'none'}}>{services[1]}</p>
                  <a onClick={this.toggleServices}><h2 id="2">CREDIT/COLLECTION ASSOCIATE</h2></a>
                  <p className="responsive-services" style={{display: this.state.open[2] ? 'block' : 'none'}}>{services[2]}</p>
                  <a onClick={this.toggleServices}><h2 id="3">ACOUNTING SUPERVISOR</h2></a>
                  <p className="responsive-services" style={{display: this.state.open[3] ? 'block' : 'none'}}>{services[3]}</p>
                  <a onClick={this.toggleServices}><h2 id="4">RECEPTIONIST</h2></a>
                  <p className="responsive-services" style={{display: this.state.open[4] ? 'block' : 'none'}}>{services[4]}</p>
                </Col>
                <Col xs={12} sm={7} lg={7} className="service-col">
                  <p>
                    {services[this.state.services]}
                  </p>
                </Col>
              </Row>
            </Grid>
          </div>

          <div className="desc-container grey">
            <h1 className="title-container" id="areas">
              AREAS WE SERVE
            </h1>
            <br/>
            <Grid>
              <CitySearchLinked />
            </Grid>
            <br />
          </div>
        </div>
        <Footer bg="grey" />
      </div>
    );
  }
}

export default PropertyManagement;
