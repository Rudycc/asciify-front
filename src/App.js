import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dropzone from  'react-dropzone';
import './App.css';

const Console = ({text}) => ((
  <div style={{width: '100%', height: '500px', overflow: 'auto', background: '#efefef'}} >
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
        <header className="App-header">
          <h1 className="App-title">Asciify</h1>
        </header>
        <div>
          <div style={{width: '50%', display: 'inline-block'}}>
            <Dropzone className="photoDragNew" onDrop={this.handleDrop}
                                accept="image/jpeg,image/jpg,image/png" multiple={false} >
              {this.state.preview === ''? 'Arrastra aqui tu foto':
                <img alt="ParaQueNoTruene" className="photUrlNew" src={this.state.preview} />
              }
            </Dropzone>
            <button style={{display: 'inline-block'}} onClick={this.asciify} disabled={!this.state.image}>Asciify image</button>
          </div>
          <div style={{width: '50%', display: 'inline-block'}}>
            <Console text={this.state.text}/>
            <CopyToClipboard text={this.state.text} onCopy={() => {alert('copied')}}>
              <button>Copy to clipboard</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
