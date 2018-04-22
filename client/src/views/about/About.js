import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Image } from 'react-bootstrap';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';

class TeamMember extends Component {

  render() {
    return (
      <Col xs={12} sm={6} md={4} lg={3} className="team-desc">
        <div className="team-img-container">
          <img style={{objectFit: 'cover'}} className="img-responsive team-img" src={this.props.image} />
        </div>
          <p className="about-name">{this.props.name}</p>
          <p className="about-position">{this.props.position}</p>
            <hr className="about-hr" />
          <p className="about-contact">{this.props.email}</p>
          <p className="about-contact about-margin">{this.props.phone}</p>
      </Col>
    );
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-about')
    .then(results => {
      return results.json();
    }).then(data => {
      let team = data.people.map((person) => {
        return (
          <TeamMember
            name={person.first + ' ' + person.last}
            position={person.position}
            email={person.email}
            phone={person.phone}
            image={person.img_url}
          />
        )
      });
      this.setState({team: team});
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="About">
        <Banner
          title="OUR STORY"
          img="https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/ourstory1.jpg"
        />
        <div className="under-banner">
          <br/>
            <br/>
              <br/>
<br/>

          <div className="desc-container about-desc">
            <p>
              Huntington West Properties, Inc. was founded in 1979 and has
              served clients in Orange, Los Angeles and San Diego Counties for
              more than 30 years. Our firm has experience managing Community
              Associations, Condominiums, Planned Unit Developments and both
              residential and commercial rental properties.
            </p>
          </div>
          <div className="desc-container services-container">
            <Grid className="about-desc mission-grid">
              <Row className="mission-row">
                <Col xs={12} sm={6} lg={6} className="mission-col padding-right">
                    <div className="about-row-info">
                  <h1 className="about-row-title title-container">OUR MISSION</h1>
                  <p>
                    Huntington West Properties Inc. will be the real estate
                    company of choice, making the needs of our clients and
                    employees the highest priority, while achieving excellence
                    of service and sustainable growth.
                  </p>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={6} className="mission-col padding-left">
                    <div className="about-row-info">
                  <h1 className="about-row-title title-container">OUR VALUES</h1>
                    <p>
                      Our actions are based on the highest standard of
                      integrity and Christian ethics.
                    </p>
                    <p>
                      We perform our work with dilligence and professionalism.
                    </p>
                    <p>
                      We will strive to improve our performance and service
                      wherever possible.
                    </p>
                    <p>
                      We are loyal to our customers, our vendors, our company
                      and each other.
                    </p>
                </div>
                </Col>
              </Row>
            </Grid>
          </div>

          <br/>
            <br/>

          <br/>
          <br/>
            <br/>

          <div id="team">
            <h1 className="title-container">OUR TEAM</h1>
            <br />
              <br/>

            <Grid className="about-grid">
              <Row className="team-row">
                <Col xs={12} className="team-col">
                {this.state.team}
              </Col>
              </Row>
            </Grid>;
          </div>
        </div>
        <Footer logo="hide"/>
      </div>
    );
  }
}


export default About;
