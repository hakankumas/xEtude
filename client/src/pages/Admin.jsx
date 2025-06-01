import AdminCards from "../components/Admin/AdminCards";
import GraphicCountEtudeByLesson from "../components/Admin/GraphicCountEtudeByLesson";
import GraphicCountEtudeByTeachers from "../components/Admin/GraphicCountEtudeByTeachers";
import GraphicCountEtudeByClassNumber from "../components/Admin/GraphicCountEtudeByClassNumber";

function Admin() {
    return (
        <div className="m-4">
            <div>
                <AdminCards />
            </div>
            <div className="col-12 d-flex flex-row py-3 gap-5">
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicCountEtudeByLesson />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicCountEtudeByTeachers />
                </div>
                <div className="col shadow rounded-4 p-3 my-3">
                    <GraphicCountEtudeByClassNumber />
                </div>
            </div>
        </div>
    );
}

export default Admin;
