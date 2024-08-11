// rrd imports
import { redirect } from "react-router";

// helpers
import { deleteItem } from "../helpers";

// library
import { toast } from "react-toastify";

export async function logoutAction() {

    deleteItem({
        key: "userName"
    })

    toast.success("Account deleted successfully!")

    return redirect("/");
}