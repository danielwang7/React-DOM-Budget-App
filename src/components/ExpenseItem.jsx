// rrd imports
import { Link, useFetcher } from 'react-router-dom';

// helper imports
import { formatCurrency, formatDate, getMatchingItems } from '../helpers'

// library
import { TrashIcon } from '@heroicons/react/16/solid';

const ExpenseItem = ({ expense, showBudget }) => {

    if (!expense) {
        console.error("Expense data is missing or incomplete.", expense);
        return <td>Error: Expense data is missing.</td>;
    }

    const fetcher = useFetcher();

    const budget = getMatchingItems({
        category: "budgetData",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDate(expense.createdAt)}</td>
            {showBudget ?? (
                <td>
                    <Link
                        to={`/budget/${budget.id}`}
                        style={{
                            "--accent": budget.color
                        }}
                    >
                        {budget.name}
                    </Link>

                </td>
            )}
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseName" value={expense.name} />
                    <input type="hidden" name="expenseId" value={expense.id} />

                    <button
                        type="submit"
                        className="btn btn--warning"
                        aria-label={`Delete ${expense.name} expense`}
                    >
                        Delete
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}

export default ExpenseItem