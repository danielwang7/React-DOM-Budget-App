// helpers
import { deleteItem, getMatchingItems } from '../helpers';

// rrd imports
import { redirect } from 'react-router';

export function deleteBudget({ params }) {

    // delete all related expenses
    try {
        const expenses = getMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        expenses.forEach(expense => {
            console.log("deleting:", expense.id)
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        });

        deleteItem({
            key: "budgetData",
            id: params.id,
        })


    } catch (e) {
        throw new Error("There was a problem deleting your budget.");
    }

    return redirect("/");
}
