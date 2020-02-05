import React, { Component, useState, useEffect } from 'react';
import Trail from './Trail'

function apiGet(url, onReturn) {
   let xhr = new XMLHttpRequest();
 
   xhr.open("GET", "/api", true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         onReturn(JSON.parse(xhr.responseText));
      }
   }
   xhr.send();
}


const Thing = () => {
   const [trails, setTrails] = useState(null);

   const updateData = () => {
      const response = (json) => setTrails((JSON.parse(json["region_data"])["trail_status"]).map((trail) => <Trail key="" json={trail} />));

      apiGet("/scrape", response);
   }
   
   
   useEffect(() => {
      updateData();
    }, []);


   return (
      <div>
         {trails}
      </div>
   )
}


export default class Home extends Component {
   render() {
      return (
         <Thing />
      )
   }
}
