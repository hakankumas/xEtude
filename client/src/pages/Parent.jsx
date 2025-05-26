import Activities from "../components/Parent/Activities";
import Announces from "../components/Parent/Announces";
import MessagesForStudent from "../components/Parent/MessagesForStudent";

function Parent() {
    return (
        <div>
            <div className="col-12 mx-5 d-flex flex-row gap-3 align-items-center">
                <h1>Parent</h1>
            </div>
            <hr />
            <div className="col-12 mx-5 d-flex flex-row gap-3 align-items-center">
                <div className="col-4">
                    <Announces />
                </div>
                <div className="col-4">
                    <Activities />
                </div>
                <div className="col-4">
                    <MessagesForStudent />
                </div>
            </div>
        </div>
    );
}

export default Parent;
