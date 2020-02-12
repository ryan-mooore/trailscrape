import React, { Component } from 'react'

const Grade1 = props => {
    return (
        <svg width={props.size} height={props.size} viewBox="0 0 400 400">
            <ellipse ry="200" rx="200" cy="200" cx="200" fill="#2ecc71"/>
            <ellipse ry="160" rx="160" cy="200" cx="200" fill="white"/>
        </svg>
    )
}

export default Grade1;