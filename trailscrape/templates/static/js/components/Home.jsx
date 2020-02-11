import React, { Component, useState, useEffect } from 'react';
import Region from './Region'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

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
   const [regions, setRegions] = useState(
      <div className="listContainer">
         <h1>Loading...</h1>
      </div>
   );

   const updateData = () => {
      const response = (json) => {
         let regions = json["regions"]
         setRegions(
            <div className="listContainer">
               {regions.map((region) => <RegionElement key={region.name} json={region}/>)}
            </div>
            )
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
         <div className="regionElement">
            region information not currently available
         </div>
      )
} else {
      const name = props.json["name"];
      const liftIsOpen = props.json["lift_is_open"]
      const parkIsOpen = props.json["park_is_open"]
         
      return (
         <div className="regionElement">
            <Link to={{
               pathname: '/' + props.json["name"],
               state: props.json
            }}>
               <h1>{name}</h1>
               <div className="statusContainer">
                  <div className="status">
                     <div className="statusMessage">park status</div>   
                     <div className="statusIndicator" style={{backgroundColor: parkIsOpen ? "#2ecc71" : "#e74c3c"}}></div>
                  </div>
                  {liftIsOpen == null ?
                     <></>
                     :
                     <>
                        <div className="status">
                           <div className="statusMessage">lift status</div>   
                           <div className="statusIndicator" style={{backgroundColor: liftIsOpen ? "#2ecc71" : "#e74c3c"}}></div>
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