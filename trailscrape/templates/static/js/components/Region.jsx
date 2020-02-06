import React from 'react'

export default function Region(props) {

    if (Object.entries(props.json).length === 0) {
        return (
            <div>
                <h1>Park information not currently available</h1>
                <br />
            </div>
        )
    } else {
        console.log(props.json)
        const name = props.json["name"];
        const parkIsOpen = props.json["park_is_open"];
        const liftIsOpen = props.json["lift_is_open"];
        
        const parkMessage = <h4>Park {parkIsOpen ? "is" : "is not"} open</h4>
        const liftMessage = <h4>Lift {liftIsOpen ? "is" : "is not"} open</h4>
        return (
            <div>
                <h1>{name}</h1>
                {parkMessage}
                {liftIsOpen == null ? <></> : liftMessage}
                <br />
            </div>
        )
    }
}
