// rrd imports
import { useLoaderData } from 'react-router'

// helpers
import { getMatchingItems } from '../helpers'

export async function budgetLoader({ params }) {

    const budget = await getMatchingItems({
        category: "budgetData",
        key: "id",
        value: params.id,
    })[0];

    if (!budget) {
        throw new Error("The budget you are trying to find doesn't exist");
    }

    return { budget };
}

const BudgetPage = () => {
    const { budget } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
        </div>

    )
}

export default BudgetPage