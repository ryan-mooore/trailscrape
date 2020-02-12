//TODO:
//remove whitespace from url
//reroute region url to get trail info

import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import GradeLogo from '../assets/GradeLogo'

const TrailList = (json) => {

    const [trails, setTrails] = useState(<h1>Loading...</h1>);
 
    const updateData = (json) => {
            setTrails (
                <>  
                    <Link to="/">
                        <div className="backButton">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                    </Link>
                    <div className="trailsContainer">
                        {json.map((trail) => <Trail key="" json={trail}/>)}
                    </div>
                </>
            )
       }
 
    useEffect(() => {
        updateData(json.json.trails);
    }, []);

    return (
       <div>{trails}</div>
    )
}

const Trail = (props) => {
    const json = props.json;
    const name = json["name"];
    const grade = json["grade"];
    const isOpen = json["is_open"];

    let trailMessage = "Null"
    if (isOpen === true) {
        trailMessage = "Open";
    } 
    else if (isOpen === false) {
        trailMessage = "Closed"
    }
    let trailStatusDiv = <div></div>
    
    if (isOpen) {
        trailStatusDiv = <div className="trailStatusIndicator" style={{backgroundColor:"#2ecc71"}}>open</div>
    } 
    if (!isOpen) {
        trailStatusDiv = <div className="trailStatusIndicator" style={{backgroundColor:"#e74c3c"}}>closed</div>
    }

    if (isOpen === null) {
        trailStatusDiv = <div className="trailStatusIndicator" style={{backgroundColor:"#BABECC"}}>error</div>
    }

    return (
        <div className="trailElement">
            <div className="trailName">{name}</div>
            <div className="gradeIndicator"><GradeLogo grade={grade}/></div>
            {trailStatusDiv}
        </div>
    )
}

export default class Region extends Component {

    render() {
        return <TrailList json={this.props.location.state} />
    }
}