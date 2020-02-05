import React, { useState, Component } from 'react';

function apiPost(url, data, onReturn) {
  let xhr = new XMLHttpRequest();

  xhr.open("POST", "/api" + url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        onReturn(JSON.parse(xhr.responseText));
      }
    }

    console.log(JSON.stringify(data))
  xhr.send(JSON.stringify(data));
}




function Thing() {
  const [trails, setTrails] = useState(null);

  const response = (json) => setTrails(json);
  
  apiPost("/scrape", {"region": "craigieburn"}, response);
  

  return (
    <div>
      {JSON.stringify(trails)}
    </div>
  )
}


export default class Bruh extends Component {
    render() {
       return (
            <Thing />
       )
    }
}
