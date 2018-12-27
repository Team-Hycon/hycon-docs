import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import remark from 'remark';
import slug from 'remark-slug';
import content from './custom/content';
import RoundedToggle from './components/rounded_toggle';

// Hycon Public Blockchain
const storage = window.localStorage
const version = [
  { title: 'api/v1',
    short: 'v1',
    value: '0',
  },
  {
    title: 'api/v3',
    short: 'v3',
    value: '1',
  }
]

var api_version = storage.getItem("version") === null ? version[1] : JSON.parse(storage.getItem("version"))
var ast = remark()
  .use(slug)
  .runSync(remark().parse(content[api_version.value]));

ReactDOM.render(
  <div>
    <div style={{ width: "100%", height: 32, zIndex: 1, position: "fixed", backgroundColor: "#404040", paddingLeft: 10 }}>
      <RoundedToggle
        options={version}
        onChange={(version) => {
          storage.setItem("version", JSON.stringify(version))
          location.reload()
        }}
        active={api_version}/>
    </div>
    { api_version.value === "0" ? 
      <App ast={ast} content={content[0]} /> :
      <App ast={ast} content={content[1]} />
    }
  </div>,
  document.getElementById('app'));
