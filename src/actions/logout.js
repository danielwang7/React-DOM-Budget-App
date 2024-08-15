// rrd imports
import { redirect } from "react-router";

// helpers
import { deleteItem } from "../helpers";

// library
import { toast } from "react-toastify";

export async function logoutAction() {
    const toDelete = ["userName", "budgetData", "expenses"]

    toDelete.map((item) => {
        deleteItem({
            key: item
        })
    })

    toast.success("Account deleted successfully!")

    return redirect("/");
}