import React, { Component, useState, useEffect } from 'react';
import Trail from './Trail'
import Region from './Region'

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

const RegionList = () => {
   const [regions, setRegions] = useState(<h1>Loading...</h1>);

   const updateData = () => {
      const response = (json) => {
         setRegions(json["regions"].map((region) => {
            return <Region key={region.name} json={region}/>
         }))
      }

      apiGet('/', response)
   }

   useEffect(() => {
      updateData();
   }, []);

   return (
      <div>{regions}</div>
   )
}

const TrailList = () => {
   const [trails, setTrails] = useState(<h1>Loading...</h1>);

   const updateData = () => {
      const response = (json) => {
         setRegions(json["trails"].map((region) => {
            return <Region key={region.name} json={region}/>
         }))
      }

      apiGet('/', response)
   }

   useEffect(() => {
      updateData();
   }, []);

   return (
      <div>{regions}</div>
   )
}

export default class Home extends Component {
   render() {
      return (
         <RegionList key="list"/>
      )
   }
}
