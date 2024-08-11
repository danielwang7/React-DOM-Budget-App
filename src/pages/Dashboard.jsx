// rrd imports
import { useLoaderData } from "react-router";

// helper functions
import { fetchData } from "../helpers";

// loader
export function dashBoardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

// libraries
import { toast } from "react-toastify";

// action 
export async function dashBoardAction({ request }) {
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    console.log("🚀 ~ formData:", formData);
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}`);
    }
    catch (e) {
        throw new Error("There was a problem creating your account");
    }

}

// components
import Intro from "../components/Intro";

const Dashboard = () => {

    const { userName } = useLoaderData();
    return (
        <>
            {userName ?
                (<p>{userName}</p>)
                :
                (<Intro />)
            }
        </>
    );
}

export default Dashboard;