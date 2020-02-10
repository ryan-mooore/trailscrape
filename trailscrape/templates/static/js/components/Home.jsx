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
                  <div className={style.regionContainer}>
                     <RegionElement key={region.name} json={region}/>
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
            region information not currently available
         </div>
      )
} else {
      const name = props.json["name"];
      const liftIsOpen = props.json["lift_is_open"]
      const parkIsOpen = props.json["park_is_open"]
         
      return (
         <div className={style.regionElement}>
            <Link to={{
               pathname: '/' + props.json["name"],
               state: props.json
            }}>
               <h1>{name}</h1>
               <div className={style.statusContainer}>
                  <div className={style.status}>
                     <div className={style.statusMessage}>park status</div>   
                     <div className={style.statusIndicator} style={{backgroundColor: parkIsOpen ? "green" : "red"}}></div>
                  </div>
                  {liftIsOpen == null ?
                     <></>
                     :
                     <>
                        <div className={style.delimiter}></div>
                        <div className={style.status}>
                           <div className={style.statusMessage}>lift status</div>   
                           <div className={style.statusIndicator} style={{backgroundColor: liftIsOpen ? "green" : "red"}}></div>
                        </div>
                     </>
                  }
               </div>
            </Link>
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