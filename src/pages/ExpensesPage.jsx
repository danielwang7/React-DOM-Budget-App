// rrd imports
import { useLoaderData } from "react-router";

// helper
import { deleteItem, fetchData } from "../helpers";

// components
import ExpenseTable from "../components/ExpenseTable";

// libraries
import { toast } from "react-toastify";

// loader
export function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses };
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            deleteItem({ key: "expenses", id: values.expenseId });
            return toast.success(`Expense of ${values.expenseName} deleted!`)
        }
        catch (e) {
            throw new Error(`There was a problem creating your expense; ${e}`);
        }
    }

}

const ExpensesPage = () => {
    const { expenses } = useLoaderData();
    return (
        <div className="grid-lg">
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Recent Expenses
                        <small className="accent"> ({expenses.length} total)</small>
                    </h2>
                    <ExpenseTable expenses={expenses} />
                </div>
            ) : (
                <p><span style={{ fontWeight: "bold" }}>No expenses found! </span></p>
            )}
        </div>
    )
}

export default ExpensesPage