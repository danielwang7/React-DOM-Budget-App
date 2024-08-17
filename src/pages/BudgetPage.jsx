// rrd imports
import { useLoaderData } from 'react-router'

// helpers
import { getMatchingItems, createExpense, deleteItem } from '../helpers'

// libraries
import { toast } from "react-toastify";


// components
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import ExpenseTable from "../components/ExpenseTable"


// loader
export async function budgetLoader({ params }) {

    const budget = await getMatchingItems({
        category: "budgetData",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    if (!budget) {
        throw new Error("The budget you are trying to find doesn't exist");
    }

    return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
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
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();

    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.color,
            }}
        >
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budgetData={budget} showDelete={true} />
                <AddExpenseForm budgetData={[budget]} />

            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name} </span>
                        Expenses
                    </h2>
                    <ExpenseTable expenses={expenses} showBudget={false} />
                </div>
            )}
        </div>

    )
}

export default BudgetPage