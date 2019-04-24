import React, {Component} from "react"
import { Storage } from 'aws-amplify';
import './Uploader.css';

class Uploader extends Component {
  state = { fileUrl: '', file: '', fileName: '', saving: false};

  handleChange = e => {
    const file = e.target.files[0];
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      fileName: file.name
    });
  };

  saveFile = () => {
    this.setState({saving: true})
    Storage.put(this.state.fileName, this.state.file)
      .then(() => {
        console.log('File saved.');
        this.setState({fileUrl: '', file: '', fileName: '', saving: false});
      })
      .catch(err => {
        console.log('Error uploading file!', err);
      });
  };

  render() {
    const {saving} = this.state
    if(saving) {
      return null;
    }
    return (
      <div className="uploader">
        <div className="content">
          <h1 className="page-header">
            Form Definition Upload
          </h1>
          <hr/>
          <input type="file" onChange={this.handleChange}/>
          <button className="primary" onClick={this.saveFile}>Upload XLSX</button>
        </div>
      </div>
    )
  }
}

export default Uploader;
