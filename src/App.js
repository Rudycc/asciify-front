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
      height: 40,
      width: 40,
      sending: false,
      url: '',
    }
  }

  handleDrop = (acceptedFile) => {
    if(acceptedFile.length === 0){
      alert('File unsupported')
      return
    }
    const reader = new FileReader();
    reader.onload = () => {
        const image = reader.result;
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
    this.setState({
      sending: true,
    })
    fetch('https://r9l2cw9nk7.execute-api.us-east-2.amazonaws.com/Production',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: this.state.image,
        fileName: this.state.fileName,
        width: this.state.width,
        height: this.state.height,
        url: this.state.url === '' ? undefined: this.state.url
      })
    }).then(res => res.json()).then((text) => {
      window.URL.revokeObjectURL(this.state.preview)
      this.setState({
        preview: '',
        image: undefined,
        text,
        sending: false,
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        sending: false,
      })
    })
  }

  updateSize = dim => ({target: { value }}) => {
    this.setState({
      [dim]: value <= 0 ? 1: value >= 100? 100: value,
    })
  }

  updateUrl = ({target: { value : url}}) => {
    this.setState({ url })
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
            {this.state.url === ''?<Dropzone className="photoDragNew" onDrop={this.handleDrop}
                                accept="image/jpeg,image/jpg,image/png" multiple={false} >
              {this.state.preview === ''? 'Tap or drag your photo here':
                <img alt="ParaQueNoTruene" className="photUrlNew" src={this.state.preview} />
              }
              {this.state.sending? <span className="wait" >Please wait...</span>: null}
            </Dropzone>: null}
            {!this.state.image?
            this.state.sending?<span> Espera un poco </span>:
            <div className="meassure">
              <span>URL: </span>
              <input type="text" value={this.state.url} onChange={this.updateUrl} />
            </div> : null}
            <div className="meassure">
              <span>Height: </span>
              <input type="number" value={this.state.height} onChange={this.updateSize('height')} />
            </div>
            <div className="meassure">
              <span>Width: </span>
              <input type="number" value={this.state.width} onChange={this.updateSize('width')} />
            </div>
            <button className="btn" onClick={this.asciify} disabled={(!this.state.image && this.state.url === '') || this.state.sending}>Asciify image</button>
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
