// rrd imports
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers";

// libraries
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import ExpenseTable from "../components/ExpenseTable"

// loader
export function dashBoardLoader() {
    const userName = fetchData("userName");
    const budgetData = fetchData("budgetData");
    const expenses = fetchData("expenses");
    return { userName, budgetData, expenses };
}

// action 
export async function dashBoardAction({ request }) {
    await wait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    // new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        }
        catch (e) {
            throw new Error("There was a problem creating your account");
        }
    }
    else if (_action === "newBudget") {
        try {
            createBudget({
                name: values.newBudgetName,
                amount: values.newBudgetAmount,
            })
            return toast.success(`New budget for ${values.newBudgetName} created!`);
        }
        catch (e) {
            throw new Error(`There was a problem creating your budget; ${e}`);

        }
    }
    else if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpenseInput,
                amount: values.newExpenseAmount,
                budgetId: values.newExpense
            })
            return toast.success(`Expense for ${values.newExpenseInput} created!`)
        }
        catch (e) {
            throw new Error(`There was a problem creating your expense; ${e}`);
        }
    }
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

const Dashboard = () => {

    const { userName, budgetData, expenses } = useLoaderData();
    return (
        <>
            {userName ?
                (
                    <div className="dashboard">
                        <h1>Welcome, <span className="accent">{userName}</span></h1>
                        <div className="grid-sm">
                            {
                                budgetData && budgetData.length > 0 ?
                                    (
                                        <div className="grid-lg">
                                            <div className="grid-lg">
                                                <div className="flex-lg">
                                                    <AddBudgetForm />
                                                    <AddExpenseForm budgetData={budgetData} />
                                                </div>
                                                <h2>Existing Budgets</h2>
                                                <div className="budgets">
                                                    {
                                                        budgetData.map((budgetData) => (
                                                            <BudgetItem budgetData={budgetData} key={budgetData.id} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            {
                                                expenses && expenses.length > 0 && (
                                                    <div className="grid-md">
                                                        <h2>Recent Expenses</h2>
                                                        <ExpenseTable
                                                            expenses={expenses
                                                                .sort((a, b) => b.createdAt - a.createdAt)
                                                                .slice(0, 8)}
                                                        />
                                                        {expenses.length > 8 && (
                                                            <Link
                                                                to="expenses"
                                                                className="btn btn--dark"
                                                            >
                                                                View all expenses
                                                            </Link>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                    :
                                    (
                                        /* Displayed for no budget form */
                                        <div className="grid-lg">
                                            <h3>You have no budgets!</h3>
                                            <div className="grid-lg">
                                                <div className="flex-lg">
                                                    <AddBudgetForm />
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                )
                :
                (<Intro />)
            }
        </>
    );
}

export default Dashboard;