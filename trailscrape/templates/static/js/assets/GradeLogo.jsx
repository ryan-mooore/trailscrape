import React, { Component } from 'react';

import Grade1 from "./grade_logos/1";
import Grade2 from "./grade_logos/2";
import Grade3 from "./grade_logos/3";
import Grade4 from "./grade_logos/4";
import Grade5 from "./grade_logos/5";
import Grade6 from "./grade_logos/6";

const GradeLogo = (props) => {
    const grade = parseInt(props.grade);
    
    switch (grade) {
        case 1:
            return <Grade1 size="30"/>
            break;
        case 2:
            return <Grade2 size="30"/>
            break;
        case 3:
            return <Grade3 size="30"/>
            break;
        case 4:
            return <Grade4 size="30"/>
            break;
        case 5:
            return <Grade5 size="30"/>
            break;
        case 6:
            return <Grade6 size="30"/>
            break;

    default:
        return (
            <svg width="30" height="30"></svg>
        )
        break;
    }
}

export default GradeLogo;