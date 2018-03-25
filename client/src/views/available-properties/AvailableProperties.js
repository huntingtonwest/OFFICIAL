import React, {Component} from 'react';
import ConsultationForm from '../../components/ScheduleForm';
import BannerProperties from './BannerProperties';
import MapContainer from '../../components/Map'
import FetchProperties from './FetchProperties'
import Footer from '../../components/Footer';

class AvailableProperties extends Component {
  render() {
    return (
      <div className="AvailableProperties" id="search">
        <BannerProperties title="AVAILABLE PROPERTIES"/>
        <div className="under-banner">
          <div className="search-map" id="map">
            <MapContainer/>
          </div>
          <FetchProperties/>
          <div id="consultation">
            <ConsultationForm title="SCHEDULE CONSULTATION"/>
          </div>
        </div>
        <Footer bg="white"/>
      </div>
    );
  }
}

export default AvailableProperties;
