// React imports
import { useEffect, useRef } from 'react';

// rrd imports
import { Form, useFetcher } from 'react-router-dom'

// assets
import { CurrencyDollarIcon } from '@heroicons/react/16/solid'

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
        }
    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                AddBudgetForm
            </h2>
            <fetcher.Form
                method="post"
                ref={formRef}
                className="grid-sm"
            >
                <div className="grid-xs">
                    <label htmlFor="newBudgetName">Budget Name</label>
                    <input
                        type="text"
                        name="newBudgetName"
                        id="newBudgetName"
                        placeholder='e.g., Groceries, Travel'
                        required
                    />
                </div>

                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                        type="number"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        step="0.01"
                        placeholder="e.g., $350"
                        inputMode="decimal"
                        required
                    />
                </div>

                <input type="hidden" name="_action" value="newBudget" />
                <button
                    type="submit"
                    className="btn btn--dark"
                    disabled={isSubmitting}
                >
                    {isSubmitting ?
                        <span>Creating Budget...</span>
                        :
                        (<>
                            <span>Create Budget</span>
                            <CurrencyDollarIcon width={21} />
                        </>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm