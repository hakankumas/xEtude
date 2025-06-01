import NoticesByAdmin from "../components/Parent/NoticesByAdmin";
import NoticesByTeacher from "../components/Parent/NoticesByTeacher";

function Parent() {
    const parent_id = localStorage.getItem("user_id");
    return (
        <div className="mx-5 my-4 d-flex flex-row gap-3">
            <div className="col-6">
                <NoticesByAdmin parent_id={parent_id} />
            </div>
            <div className="col-6">
                <NoticesByTeacher parent_id={parent_id} />
            </div>
        </div>
    );
}

export default Parent;
