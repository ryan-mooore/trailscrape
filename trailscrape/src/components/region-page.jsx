import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import StatusIcon from './status-icon'
import TrailElement from './trail-element'

const TrailList = (json) => {

    const [trails, setTrails] = useState(<h1>Loading...</h1>);
 
    useEffect(() => {
        let park = json.json
        console.log(park)
            setTrails (
                <>  
                    <Link to="/">
                        <div className="backButton">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                    </Link>
                    <div className="mainContainer">
                        <div className="parkInfoContainer">
                            <h1>{park.name}</h1>
                            <div className="infoElement">
                                <div className="statusText">park status</div>
                                {StatusIcon(park.park_is_open)}
                            </div>
                            {park.lift_is_open !== null ?
                            <>  
                                <div className="infoElement">
                                    <div className="statusText">uplift status</div>
                                    {StatusIcon(park.lift_is_open)}
                                </div>
                            </>
                            :
                            <></>}
                        </div>

                        <div className="trailsContainer">
                            {park.trails.map((trail) => <TrailElement key="" json={trail}/>)}
                        </div>
                    </div>
                </>
            )
    }, [json]);

    return trails
}

export default class RegionPage extends Component {
    render() {
        return <TrailList json={this.props.location.state} />
    }
}