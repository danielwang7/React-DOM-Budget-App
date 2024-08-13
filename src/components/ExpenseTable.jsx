import React from 'react'

const ExpenseTable = ({ expenses }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date"].map((i, index) =>
                                (<th key={index}>{i}</th>))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                {expense.name}
                                {/* <ExpenseItem /> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable