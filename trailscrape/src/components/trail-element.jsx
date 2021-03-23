import GradeLogo from './grade-icon'
import StatusIcon from './status-icon'

const TrailElement = (props) => {
    const json = props.json;
    const name = json.name;
    const grade = json.grade;
    const isOpen = json.is_open;

    return (
        <div className="trailElement">
            <div className="trailName">{name}</div>
            <div className="gradeIndicator"><GradeLogo grade={grade}/></div>
            {StatusIcon(isOpen)}
        </div>
    )
}

export default TrailElement;