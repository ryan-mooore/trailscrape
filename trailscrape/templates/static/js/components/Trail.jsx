import React from 'react';

export default function Trail(props) {
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
        <div>
            <h3>{name}</h3>
            <p>Grade: {grade}</p>
            <p>{trailMessage}</p>
        </div>
    )
}
