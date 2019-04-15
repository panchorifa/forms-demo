import React, {Component} from "react"
import './Uploader.css';

class Uploader extends Component {
  state = { fileUrl: '', file: '', fileName: ''};

  handleChange = e => {
    const file = e.target.files[0];
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      fileName: file.name
    });
  };

  saveFile = () => {
    Storage.put(this.state.fileName, this.state.file)
      .then(() => {
        console.log('File saved.');
        this.setState({fileUrl: '', file: '', fileName: ''});
      })
      .catch(err => {
        console.log('Error uploading file!', err);
      });
  };

  render() {
    return (
      <div className="Uploader">
        <div className="Uploader-Content">
          <input type="file" onChange={this.handleChange}/>
          <button onClick={this.saveFile}>Upload XLSX File</button>
        </div>
      </div>
    )
  }
}

export default Uploader;
