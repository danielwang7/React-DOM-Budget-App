// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({ key }) => {
    return localStorage.removeItem(key);
};


// random color generator
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgetData")?.length ?? 0;
    return `${existingBudgetsLength * 20} 40% 50%`
}

// time tester
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// create budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAT: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    };

    const existingBudgets = fetchData("budgetData") ?? [];
    return localStorage.setItem("budgetData", JSON.stringify([...existingBudgets, newItem]));
}

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAT: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    };

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}

// total spent percent calculation
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc;

        return acc += expense.amount;
    }, 0)
    return budgetSpent;
}

// formatting
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

// formatting
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}