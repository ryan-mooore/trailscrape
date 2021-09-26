import Grade1 from "../../../assets/icons/grade/1";
import Grade2 from "../../../assets/icons/grade/2";
import Grade3 from "../../../assets/icons/grade/3";
import Grade4 from "../../../assets/icons/grade/4";
import Grade5 from "../../../assets/icons/grade/5";
import Grade6 from "../../../assets/icons/grade/6";
import Grade7 from "../../../assets/icons/grade/7";

const GradeIcon = ({ size, grade }) => {
  switch (+grade) {
    case 1:
      return <Grade1 size={size} />;
    case 2:
      return <Grade2 size={size} />;
    case 3:
      return <Grade3 size={size} />;
    case 4:
      return <Grade4 size={size} />;
    case 5:
      return <Grade5 size={size} />;
    case 6:
      return <Grade6 size={size} />;
    case 7:
      return <Grade7 size={size} />;

    default:
      return <svg width="30" height="30"></svg>;
  }
};

export default GradeIcon;
