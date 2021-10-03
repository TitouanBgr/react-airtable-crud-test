import React from 'react';
import './App.css';
import Airtable from 'airtable';
// import citrouille from './img/citrouille.png'
import potageons from './img/Potageons.gif'
// import { EntryForm } from './EntryForm';

import Iframe from 'react-iframe';

import Modal from 'react-modal';
const base = new Airtable({ apiKey: 'keyWEQKiVPAlEteEK' }).base('apppDj8zvQ5FWzaYD');

Modal.setAppElement('#root')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      updateRecord: '',
      showModal: false
    };

    this.listRecords = this.listRecords.bind(this);
    //this.handleOpenModal = this.handleOpenModal.bind(this); // Not needed here, because is binded when passing args
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.listRecords();
  }
  listRecords() {
    base('Articles').select({
      view: 'Grid view'
    }).eachPage(
      (records, fetchNextPage) => {
        this.setState({
          records
        });
        console.log(records);    
        fetchNextPage();
      }
    );
  }

  handleDelete(recordId, event) {
    this.deleteRecord(recordId, event, this.listRecords);
  }
  deleteRecord(recordId, event, listRecords) {
    if (window.confirm("Please confirm delete")) {
      base('Articles').destroy(recordId, function (err, deletedRecord) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted record', deletedRecord.id);
        listRecords();
      });
    }
  }

  handleOpenModal(record) {
    this.setState({ showModal: true, updateRecord: record });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="Home">
        <div className="Img">
          <img src={potageons} alt="citrouille" width="100%" />
        </div>
        
        <h3 className="Title">Carte des serres</h3>
        <Iframe url="https://app.miniextensions.com/map-view/L9mPicVrGY0uIkAwQqVS"
          width="100%"
          height="700px"
          id="myId"
          className="map"
          display="initial"
          position="relative"/>

      </div>
    )
  }
}

export default App;