// React imports
import { useEffect, useRef } from 'react';

// rrd imports
import { useFetcher } from 'react-router-dom';

// library imports
import { PlusCircleIcon } from '@heroicons/react/16/solid';

const AddExpenseForm = ({ budgetData }) => {
    const fetcher = useFetcher();
    const formRef = useRef();

    const isSubmitting = fetcher.state === "submitting";

    // useEffect to clear form
    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
        }
    })

    // form returns newExpenseInput & newExpenseAmount
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New <span className="accent">
                {budgetData.length === 1 && `${budgetData.map((b) => b.name)}`}
            </span> {" "}
                Expense
            </h2>

            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className='grid-sm'>
                        <label htmlFor="newExpenseInput">Name</label>
                        <input
                            type="text"
                            name="newExpenseInput"
                            id="newExpenseInput"
                            placeholder="e.g., Milk, Coffee"
                            required
                        />

                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g., $25"
                            required
                        />
                    </div>
                </div>

                <div className="grid-xs" hidden={budgetData.length === 1}>

                    <label htmlFor="newExpense">Budget Category</label>
                    <select
                        name="newExpense"
                        id="newExpense"
                        required
                    >
                        {
                            budgetData
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        <option key={budget.id} value={budget.id}>
                                            {budget.name}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>

                <input type="hidden" name="_action" value="createExpense" />
                <button
                    type="submit"
                    className="btn btn--dark"
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting ?
                            (<span>Adding Expense...</span>)
                            :
                            (<>
                                <span>Add Expense</span>
                                <PlusCircleIcon width={20} />
                            </>)
                    }
                </button>
            </fetcher.Form>
        </div >
    )
}

export default AddExpenseForm;