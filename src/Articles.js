import React from 'react';
import './App.css';
import Airtable from 'airtable';
import { EntryForm } from './EntryForm';
import Modal from 'react-modal';
const base = new Airtable({ apiKey: 'keyWEQKiVPAlEteEK' }).base('apppDj8zvQ5FWzaYD');

Modal.setAppElement('#root')

class Articles extends React.Component {
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
      base('Articles').destroy(recordId, function(err, deletedRecord) {
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
          <h3>Articles</h3>
          {/* <h5>Default Base - CRUD records</h5> */}

          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-muted">Publier un article</h5>
              <EntryForm listRecords={this.listRecords}/>
            </div>
          </div>


          <ul className="list-group mb-4 pt-4">
            <div className="list-group-item d-flex">
              <div className="p-2">Titre</div>
              <div className="p-2 flex-grow-1"></div>
              <div className="p-2 flex-grow-1">Emplacement</div>
              <div className="p-2 flex-grow-1">Description</div>
              <div className="p-2 flex-grow-1"></div>
              <div className="p-2"></div>
              <div className="p-2 flex-grow-1"></div>
            </div>
          </ul>

          <div></div>

          <ul className="list-group">
            {this.state.records.length > 0 ? ( this.state.records.map((record, index) =>
              <li key={'entry_' + index} className="list-group-item d-flex">
                <div className="p-4 flex-grow-1">{record.get('TitreArticle')}</div>
                <div className="p-4 flex-grow-1">{record.fields['Emplacement']}</div>
                <div className="p-4">{record.fields['Description']}</div>
                <div className="p-4">
                  {record.get('Picture') ? ( record.get('Picture').map((file, i) => 
                    <a key={'file_' + i} className="badge badge-primary badge-pill" href={file.url} target="_blank" rel="noopener noreferrer" title={file.filename}>attachment</a>
                    ) ) : ''
                  }  
                </div>
               
                <div className="p-1"><button className="btn btn-primary btn-sm mb-2" onClick={this.handleOpenModal.bind(this, record)}>Edit</button></div>
                <Modal 
                  isOpen={this.state.showModal}
                  onRequestClose={this.handleCloseModal}
                >
                  <button className="btn btn-light btn-sm mb-2" onClick={this.handleCloseModal}>Close Modal</button>
                  <h5 className="text-muted">Edit</h5>
                  <EntryForm 
                    listRecords={this.listRecords} 
                    record={this.state.updateRecord} 
                    closeModal={this.handleCloseModal}
                    />
                </Modal>

                <div className="p-1"><button className="btn btn-danger btn-sm mb-2" onClick={this.handleDelete.bind(this, record.getId())}>Delete</button></div>
              </li>) ) : (<p>Loading...</p>)
            }
          </ul>      
        </div>
      </div>
    )
  }
}

export default Articles;
