import React from 'react';
import './App.css';
import Airtable from 'airtable';
import Modal from 'react-modal';
import Iframe from 'react-iframe'
const base = new Airtable({ apiKey: 'keyWEQKiVPAlEteEK' }).base('apppDj8zvQ5FWzaYD');

Modal.setAppElement('#root')

class Alertes extends React.Component {
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
    base('Alertes').select({
      view: 'Grid view'
    }).eachPage(
      (records, fetchNextPage) => { // This function will get called for each page of records.
        this.setState({
          records
        });
        console.log(records);
        /* records.forEach(function(record) {
          console.log('Retrieved', record.get('Picture'));
        }); */

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.        
        fetchNextPage();
      }
    );
  }

  handleDelete(recordId, event) {
    this.deleteRecord(recordId, event, this.listRecords);
  }
  deleteRecord(recordId, event, listRecords) {
    if (window.confirm("Please confirm delete")) {
      base('Alertes').destroy(recordId, function(err, deletedRecord) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted record', deletedRecord.id);
        listRecords();
      });
    }
  }

  handleOpenModal (record) {
    this.setState({ showModal: true , updateRecord: record });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3>Carte des serres</h3>
          
          <Iframe url="https://app.miniextensions.com/map-view/L9mPicVrGY0uIkAwQqVS"
          width="100%"
          height="700px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"/>
        </div>
      </div>
    )
  }
}

export default Alertes;
