import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import GradeLogo from '../assets/GradeLogo'

const TrailList = (json) => {

    const [trails, setTrails] = useState(<h1>Loading...</h1>);
 
    const updateData = (park) => {

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
                                {statusIcon(park.park_is_open)}
                            </div>
                            {park.lift_is_open !== null ?
                            <>  
                                <div className="infoElement">
                                    <div className="statusText">uplift status</div>
                                    {statusIcon(park.lift_is_open)}
                                </div>
                            </>
                            :
                            <></>}
                        </div>

                        <div className="trailsContainer">
                            {park.trails.map((trail) => <Trail key="" json={trail}/>)}
                        </div>
                    </div>
                </>
            )
       }
 
    useEffect(() => {
        updateData(json.json);
    }, []);

    return (
       <div>{trails}</div>
    )
}

const statusIcon = (status) => {
    let statusDiv = <div></div>
    if (status) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#2ecc71"}}>open</div>;
    } 
    if (!status) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#e74c3c"}}>closed</div>;
    }

    if (status === null) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#BABECC"}}>error</div>;
    }

    return statusDiv;
}

const Trail = (props) => {
    const json = props.json;
    const name = json.name;
    const grade = json.grade;
    const isOpen = json.is_open;

    return (
        <div className="trailElement">
            <div className="trailName">{name}</div>
            <div className="gradeIndicator"><GradeLogo grade={grade}/></div>
            {statusIcon(isOpen)}
        </div>
    )
}

export default class Region extends Component {

    render() {
        return <TrailList json={this.props.location.state} />
    }
}