import React, { Component, useState, useEffect } from 'react';
import Region from './Region'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import style from '../../../public/css/home.css'

function getJson(url, onReturn) {
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
         setRegions(
            json["regions"].map((region) => {
               return (
                  <div>
                     <RegionElement key={region.name} json={region}/>
                        
                     <br />
                  </div>
               )
            }))
         }
      
      getJson('/', response)
   }

   useEffect(() => {
      updateData();
   }, []);

   return (
      <div>{regions}</div>
   )
}


const RegionElement = (props) => {
   
   if (Object.entries(props.json).length === 0) {
      return (
         <div className={style.regionElement}>
            Park information not currently available
         </div>
      )
} else {
      const name = props.json["name"];
      const parkMessage = <h4>Park {props.json["park_is_open"] ? "is" : "is not"} open</h4>
      const liftMessage = <h4>Lift {props.json["lift_is_open"] ? "is" : "is not"} open</h4>
         
      return (
         <div className={style.regionElement}>
            <h1>{name}</h1>
            {parkMessage}
            {props.json["lift_is_open"] == null ? <></> : liftMessage}
            <br />

            <Link to={{
                           pathname: '/' + props.json["name"],
                           state: props.json
                        }}>Region Link</Link>
         </div>
      )
   }
}

export default class Home extends Component {
   render() {
      return (
         <RegionList key="list"/>
      )
   }
}