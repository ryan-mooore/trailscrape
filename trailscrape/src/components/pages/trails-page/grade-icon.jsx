import Grade1 from "../../../assets/grade-icons/1";
import Grade2 from "../../../assets/grade-icons/2";
import Grade3 from "../../../assets/grade-icons/3";
import Grade4 from "../../../assets/grade-icons/4";
import Grade5 from "../../../assets/grade-icons/5";
import Grade6 from "../../../assets/grade-icons/6";


const GradeIcon = (props) => {
    const grade = parseInt(props.grade);
    
    switch (grade) {
        case 1:
            return <Grade1 size={props.size}/>
        case 2:
            return <Grade2 size={props.size}/>
        case 3:
            return <Grade3 size={props.size}/>
        case 4:
            return <Grade4 size={props.size}/>
        case 5:
            return <Grade5 size={props.size}/>
        case 6:
            return <Grade6 size={props.size}/>

    default:
        return (
            <svg width="30" height="30"></svg>
        )
    }
}

export default GradeIcon;