import React, { useState, useEffect, Component } from 'react';
import Trail from './Trail';
import { Link } from 'react-router-dom';

const TrailList = (json) => {
    const [trails, setTrails] = useState(<h1>load</h1>);
 
    const updateData = (json) => {
            setTrails (
                json.map((trail) => {
                    return <Trail key="" json={trail}/>
                })
            )
       }
 
    useEffect(() => {
        updateData(json.json.trails);
    }, []);

    return (
       <div>{trails}</div>
    )
}

export default class Region extends Component {

    render() {
        console.log(this.props.location.state)
        return <TrailList json={this.props.location.state} />
    }
}

