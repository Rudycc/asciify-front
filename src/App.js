import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dropzone from  'react-dropzone';
import './App.css';

const Console = ({text}) => ((
  <div className="console" >
    <div style={{fontFamily: ['Menlo', 'Consolas', 'DejaVu Sans Mono', 'monospace']}}>
      {text}
    </div>
  </div>
))

class App extends Component {
  constructor(props) { 
    super(props)
    
    this.state = {
      text: '',
      preview: '',
      image: undefined,
      fileName: '',
    }
  }

  handleDrop = (acceptedFile) => {
    if(acceptedFile.length === 0){
      alert('File unsupported')
      return
    }
    console.log(acceptedFile[0])
    const reader = new FileReader();
    reader.onload = () => {
        const image = reader.result;
        console.log(image)
        this.setState({
          preview: acceptedFile[0].preview,
          image,
          fileName: acceptedFile[0].name,
        })  
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsDataURL(acceptedFile[0]);
  }

  asciify = () => {
    fetch('https://r9l2cw9nk7.execute-api.us-east-2.amazonaws.com/Production',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: this.state.image,
        fileName: this.state.fileName,
      })
    }).then(res => res.json()).then((text) => {
      window.URL.revokeObjectURL(this.state.preview)
      this.setState({
        preview: '',
        image: undefined,
        text,
      })
    }).catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <div className="svg-container">
          <svg viewBox="0 0 800 400" className="svg">
            <path id="curve" fill="#50c6d8" d="M 800 300 Q 400 350 0 300 L 0 0 L 800 0 L 800 300 Z">
            </path>
          </svg>
        </div>
        <header className="App-header">
          <h1 className="App-title">Asciify</h1>
        </header>
        <div className="main-container">
          <div className="drag-container">
            <Dropzone className="photoDragNew" onDrop={this.handleDrop}
                                accept="image/jpeg,image/jpg,image/png" multiple={false} >
              {this.state.preview === ''? 'Arrastra aqui tu foto':
                <img alt="ParaQueNoTruene" className="photUrlNew" src={this.state.preview} />
              }
            </Dropzone>
            <button className="btn" onClick={this.asciify} disabled={!this.state.image}>Asciify image</button>
          </div>
          <div className="console-container">
            <Console text={this.state.text}/>
            <CopyToClipboard text={this.state.text} onCopy={() => {alert('copied')}}>
              <button className="btn">Copy to clipboard</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
