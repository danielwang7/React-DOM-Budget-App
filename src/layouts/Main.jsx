// rrd imports
import { Outlet, useLoaderData } from "react-router";

// helper functions
import { fetchData } from "../helpers";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// loader
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const Main = () => {

    const { userName } = useLoaderData();
    return (
        <div className="layout">
            <Nav userName={userName}></Nav>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    );
}

export default Main;