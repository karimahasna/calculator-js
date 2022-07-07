import { Textfit } from "react-textfit";
import "./Result.css";

const Result = ({value}) => {
    return <div className="result">
            End Result : {value}
            </div>
    // return (
    // <Textfit className="result" mode="single" max={70}>
    //     End Result HALOOOOOOO: {value}
    //     </Textfit>
    // );
};

export default Result;