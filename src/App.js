import React, { Component } from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { API, Storage } from 'aws-amplify';

class App extends Component {
  state = { forms: [], fileUrl: '', file: '', fileName: ''};

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

  async componentDidMount() {
    const data = await API.get('forms', '/forms');
    this.setState({forms: data.forms});
  }

  render() {
    return (
      <div className="App">
        <h1>Forms</h1>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.saveFile}>Upload File</button>
        <hr/>
        <div>
          <h4>Forms</h4>
          <table>
            <tbody>
              {
                this.state.forms.map((form, i) => (
                  <tr key={form.id}>
                    <td>{form.id}</td>
                    <td>{form.status}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, {includeGreetings: true});
