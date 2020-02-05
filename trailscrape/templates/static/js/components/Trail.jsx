import React from 'react';

export default function Trail(props) {
    const json = props.json;
    const name = json["name"];
    const grade = json["grade"];
    const isOpen = json["is_open"];

    return (
        <div>
            <h3>{name}</h3>
            <p>Grade: {grade}</p>
            <p>Trail is{isOpen ? "" : "n't"} open</p>
        </div>
    )
}
