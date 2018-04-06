import React, { Component } from "react";
import { Grid, Image } from "react-bootstrap";
import ConsultationForm from "../../components/ScheduleForm";
import CitySearch from "./CitySearch";
import Banner from '../../components/Banner';
import { Tabs } from "antd";
import Footer from '../../components/Footer';

const TabPane = Tabs.TabPane;

class PropertyManagement extends Component {
  render() {
    return (
      <div className="App">
        <Banner
          title="PROPERTY MANAGEMENT"
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/management-banner.jpg"
        />
        <div className="under-banner">
          <div className="desc-container">
            <h1 className="title-container" id="our-services">
              OUR SERVICES
            </h1>
            <br />
            <div className="my-tabs">
              <Tabs className="my-tabs" defaultActiveKey="1">
                <TabPane
                  className="tab-desc"
                  tab={
                    <span>
                      <Image
                        src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/account+manager.jpg"
                        responsive
                        className="tabs-img"
                      />ACCOUNT MANAGER
                    </span>
                  }
                  key="1"
                >
                  Although, as the owner of the property, you will be consulted on all important decisions, the Account Manager is responsible for the daily supervision of your income property and our support staff. The manager oversees everything from the marketing of a vacant unit, negotiating leases and collecting rent to maintenance. As your agent and adviser, the Account Manager will suggest strategic financial and maintenance goals, such as rent rate increases and property improvements. Additionally, he/she will schedule routine service, negotiate contracts, solicit bids and handle requests from the tenants. Your Account Manager is available twenty-four hours a day to respond to emergencies and answer your questions.
                </TabPane>
                <TabPane
                  className="tab-desc"
                  tab={
                    <span>
                      <Image
                        src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/property+manager.jpg"
                        responsive
                        className="tabs-img"
                      />PROPERTY MANAGER
                    </span>
                  }
                  key="2"
                >
                  The Property Manager routinely inspects your property to determine safety hazards and needed repairs. The manager monitors the performance of all the property vendors and investigates and resolves complaints. When possible, minor repairs will be performed at your property at no additional cost. The manager is available, on a full time basis, to show vacant units to prospective residents and explain the occupancy terms. The manager works closely with tenants enforcing rules and lease restrictions, as well as posting collection notices.
                </TabPane>
                <TabPane
                  className="tab-desc"
                  tab={
                    <span>
                      <Image
                        src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/credit+associate.jpg"
                        responsive
                        className="tabs-img"
                      />CREDIT / COLLECTION ASSOCIATE
                    </span>
                  }
                  key="3"
                >
                  The Credit/ Collection Associate performs a variety of administrative and clerical tasks to assist the Account Manager in maintaining the smooth and efficient management of your rental property. The Credit Associate investigates and thoroughly screens rental applicants. The Associate is responsible for creating all rental agreements and other legal documents. The Collection Associate handles the typing and mailing of Three Day Notices, Final Accounting letters and facilitates the administrative functions for all assigned collection accounts.
                </TabPane>
                <TabPane
                  className="tab-desc"
                  tab={
                    <span>
                      <Image
                        src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/accounting+supervisor.jpg"
                        responsive
                        className="tabs-img"
                      />ACCOUNTING SUPERVISOR
                    </span>
                  }
                  key="4"
                >
                  The Accounting Supervisor presides over each property's financial records. The Accountant's staff prepares and mails your monthly rental income statements. The Accountant maintains your property's bank account and is able to pay all property related bills from the account. The Accounting staff prepares and sends each tenant a monthly rental statement and regularly assesses all payments, charges or fines.
                </TabPane>
                <TabPane
                  className="tab-desc"
                  tab={
                    <span className="tab-title">
                      <Image
                        src="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/receptionist.jpg"
                        responsive
                        className="tabs-img"
                      />RECEPTIONIST
                    </span>
                  }
                  key="5"
                >
                There are two receptionists available to greet visitors and to answer telephones. The receptionists are able to schedule and confirm appointments to see vacant units immediately. They are in constant contact with the manager who hows vacant property. Prospective residents can receive detailed information on each vacant rental. Receptionists take property service requests and coordinate with the Account Manager to have all needed repairs completed in a timely
manner.
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="desc-container grey">
            <h1 className="title-container" id="areas">
              AREAS WE SERVE
            </h1>
            <Grid>
              <CitySearch />
            </Grid>
            <br />
          </div>
          <ConsultationForm title="SCHEDULE CONSULTATION" />
        </div>
        <Footer bg="white" />
      </div>
    );
  }
}

export default PropertyManagement;
