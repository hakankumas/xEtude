import { useParams } from "react-router-dom";
import AnalysisCard from "./AnalysisCard";
import ChildItem from "./ChildItem";
import Graphic1 from "./Graphic1";
import Graphic2 from "./Graphic2";

function Child() {
    console.log("Child rendered.");
    const { student_id } = useParams();

    return (
        <div className="mt-3">
            <div className="row px-5">
                <div className="col-12">
                    <AnalysisCard student_id={student_id} />
                </div>
            </div>
            <div className="row p-5">
                <div className="col-7">
                    <ChildItem student_id={student_id} />
                </div>
                <div className="col-5">
                    <Graphic1 student_id={student_id} />
                    <Graphic2 />
                </div>
            </div>
        </div>
    );
}

export default Child;
