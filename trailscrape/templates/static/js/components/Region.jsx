import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';

const TrailList = (json) => {
    const [trails, setTrails] = useState(<h1>Loading...</h1>);
 
    const updateData = (json) => {
            setTrails (
                <div className="listContainer">
                    {json.map((trail) => <Trail key="" json={trail}/>)}
                </div>
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

    return (
        <div className="trailElement">
            <div className="trailName">{name}</div>
            <div className="gradeIndicator">{grade}</div>
            <div className="trailStatusIndicator" style={{backgroundColor: isOpen ? "#2ecc71" : "#e74c3c"}}></div>
        </div>
    )
}

export default class Region extends Component {

    render() {
        return <TrailList json={this.props.location.state} />
    }
}