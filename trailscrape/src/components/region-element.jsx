import { Link } from 'react-router-dom';

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

export default RegionElement;