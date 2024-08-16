
// library
import { BanknotesIcon, TrashIcon } from "@heroicons/react/16/solid";

// helper
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

// rrd imports
import { Form, Link } from "react-router-dom";

const BudgetItem = ({ budgetData, showDelete = false }) => {
    const { id, name, amount, color } = budgetData;
    const spent = calculateSpentByBudget(id);

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div>
                        <Form
                            method="post"
                            action="delete"
                            onSubmit={
                                (event) => {
                                    if (!confirm("Are you sure you want to permanently delete this budget?")) {
                                        event.preventDefault();
                                    }
                                }
                            }
                        >
                            <button type="submit" className="btn btn--warning">
                                Delete
                                <TrashIcon width={20} />
                            </button>

                        </Form>
                    </div>
                ) : (
                    <Link
                        to={`/budget/${budgetData.id}`}
                        className="btn"
                        style={{
                            height: 35
                        }}
                    >
                        <span>View Details</span>
                        <BanknotesIcon width={24} />
                    </Link>
                )

            }
        </div >

    )
}

export default BudgetItem;