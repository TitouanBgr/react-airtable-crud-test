import React from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyWEQKiVPAlEteEK' }).base('apppDj8zvQ5FWzaYD');

export class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Edit form needs the record data. empty for create form 
      name: this.props.record ? this.props.record.get('TitreArticle') : '',
      notes: this.props.record  ? this.props.record.get('Description') : '',
      emplacement: this.props.record  ? this.props.record.get('Emplacement') : ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.createRecord = this.createRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
  }

  // handle multiple inputs
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();  
    if (this.props.record) {
      this.updateRecord(this.props.closeModal, this.props.listRecords);
    }
    else {
      this.createRecord();
    }
  }

  createRecord() {
    base('Articles').create({
      "TitreArticle": this.state.name,
      "Description": this.state.notes,
      "Emplacement": this.state.emplacement
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    });
    this.props.listRecords();
    this.setState({
      name: '',
      notes: '',
      emplacement: ''
    });
  }

  updateRecord(closeModal, listRecords) {
    base('Articles').update(this.props.record.id, {
        "TitreArticle": this.state.name,
        "Description": this.state.notes,
        "Emplacement": this.state.emplacement
    }, function(err, record) {
        if (err) {
            console.error(err);
            return;
        }
        closeModal();
        listRecords();
        console.log(record.get('TitreArticle'));
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col form-group">
            <label>Titre</label>
            <input 
              name="name"
              type="text" 
              value={this.state.name} 
              onChange={this.handleInputChange} 
              className="form-control form-control-sm" />
          </div>
          <div className="col form-group">
            <label>Emplacement</label>
            <input
              name="emplacement"
              type="text" 
              value={this.state.emplacement} 
              onChange={this.handleInputChange}
              className="form-control form-control-sm" />
          </div>
          <div className="">
            <label>Description</label>
            <input
              name="notes"
              type="text" 
              value={this.state.notes} 
              onChange={this.handleInputChange}
              className="form-control form-control-sm" />
          </div>
          <div className="col form-group">
            <label>&nbsp;</label>
            <input type="submit" value="Enregistrer" className="btn btn-success btn-sm mb-2 form-control form-control-sm"/>
          </div> 
        </div>
      </form>
    );
  }
}