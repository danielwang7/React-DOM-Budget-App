// rrd imports
import { useLoaderData } from "react-router";

// helper functions
import { fetchData } from "../helpers";

// loader
export function dashBoardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const Dashboard = () => {

    const { userName } = useLoaderData();
    return (
        <div>
            Dashboard
            <p>{userName}</p>
        </div>
    );
}

export default Dashboard;