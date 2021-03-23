import React, { Component, useEffect, useState } from 'react';
import './Home.css';
import RegionElement from './region-element';
const RegionList = () => {
   const [regions, setRegions] = useState(
      <div className="listContainer">
         <h1>Loading...</h1>
      </div>
   );

   useEffect(() => {
      fetch("http://localhost:9000/trails")
      .then(res => res.json())
      .then(
         (json) => {
            console.log(json);
            let regions = json["regions"];
            setRegions(
            <div className="listContainer">
               {regions.map((region) => <RegionElement key={region.name} json={region}/>)}
            </div>
            )
         },
         (error) => {
            console.log(error);
            setRegions(
               <div className="listContainer">
               <h1>API is down</h1></div>
            )
         }
      );
   }, [])

   return regions
}


export default class Home extends Component {
   render() {
      return (
         <RegionList key="list"/>
      )
   }
}