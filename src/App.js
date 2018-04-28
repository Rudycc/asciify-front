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
      text: `@@@@@@@@@@@@@@GGLLtt11iiiittffGG@@@@@@@@@@@@@@
            @@@@@@@@@@GGttiiiiiiiiiiiiiiiiii11GG@@@@@@@@@@
            @@@@@@@@CC11iiiiiiiiiiiiiiiiiiiiii11CC@@@@@@@@
            @@@@@@@@@@CCLLff11iiiiiiiiiiiiffCCGG@@@@@@@@@@
            @@@@LL@@CCiiiiiittttiiiiiittff11iiiiLL@@CC@@@@
            @@00ii@@CCiiiiiiii11ff11ff11iiiiiiiiLL@@11GG@@
            @@ttiiGG88iiiiiiiiii11LL11iiiiiiiiiiGG00iitt@@
            00iiiiff@@ffiiiiiitttttt11ttiiiiiitt@@LLiiii00
            LLiiiiii0000iiiitt11iiLLii11ttiiiiGG88iiiiiiLL
            ttiiiiiitt@@LLtt11iiiiLLiiii11ttff@@ffiiiiiitt
            11iiiiiiiiCC@@ffttLLLLGGLLLLttff88CCiiiiiiii11
            11iiiiiiii11888811iiiiLLiiii11008811iiiiiiii11
            11iiiiiiiiff11880011iiLLii11008811ffiiiiiiii11
            ttiiiiiitt11iitt880011tt110088ttii11ttiiiiiitt
            LLiiiiiiffiiiiiitt8800tt0088ttiiiiiiffiiiiiiLL
            00iiiiff11iiiiiiiitt88@@88ttiiiiiiii11ffiiii00
            @@ttiiLLiiiiiiiiiiLL@@@@88ffiiiiiiiiiiCCiitt@@
            @@0011GGiiiiiitt00@@CC11CC@@00ttiiiiiiGG1100@@
            @@@@CC@@GGCC88@@00ttiiiiiitt88@@00LLCC@@CC@@@@
            @@@@@@@@@@@@GGffiiiiiiiiiiiiiiff00@@@@@@@@@@@@
            @@@@@@@@CCiiiiiiiiiiiiiiiiiiiiiiii11CC@@@@@@@@
            @@@@@@@@@@00ttiiiiiiiiiiiiiiiiiitt00@@@@@@@@@@
            @@@@@@@@@@@@@@00CCtt111111ttLL00@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@88@@@@
            ffCCGGCCffffGG88LLffGGCC@@CCCCGGGG@@GGCCGGtt00
            LLCC@@@@CCCC@@@@CCLL@@@@@@ttCC@@@@@@ff@@@@00tt
            LLCC@@@@CCCC@@@@CCffGG88@@00tt110088tt@@@@@@11
            LLCC@@@@CCCC@@@@GGLL@@@@@@@@@@CCtt@@1188@@@@tt
            CCCC@@@@CCCC@@@@00ttGG00@@GGGGLLCC@@GGttGGCC00
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@88@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@88888888@@888888880088@@00@@888888@@880088@@
            @@CCCCGGCCCCCCGGCCLLCCLLCCCC88CCCCLLCCCCGGff@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@00GGGG88CC0088GG00GGGGGGGG00GG0000@@@@@@
            @@@@@@00GGGG@@GGGGGGCC00GGGGGGCCGGGG0000@@@@@@`,
      preview: '',
      formData: undefined,
    }
  }

  handleDrop = (acceptedFile) => {
    if(acceptedFile.length === 0){
      alert('File unsupported')
      return
    }
    let formData = new FormData();
    formData.append('image', acceptedFile[0])

    this.setState({
      preview: acceptedFile[0].preview,
      formData
    })
  }

  handleDropRejected = () => {
    alert('Something wrong')
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
                                accept="image/jpeg,image/jpg,image/png" multiple={false}
                                onDropRejected={this.handleDropRejected}>
              {this.state.preview === ''? 'Arrastra aqui tu foto':
                <img className="photUrlNew" src={this.state.preview} />
              }
            </Dropzone>
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
