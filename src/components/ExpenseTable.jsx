import ExpenseItem from "./ExpenseItem"

const ExpenseTable = ({ expenses, showBudget }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date"].map((i, index) =>
                                (<th key={index}>{i}</th>))
                        }
                        {
                            showBudget ?? (
                                <th key="4">Budget</th>
                            )
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        expenses.map((expense, index) => (
                            <tr key={index}>
                                <ExpenseItem expense={expense} showBudget={showBudget} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable