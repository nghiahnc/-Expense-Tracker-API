import { api } from "encore.dev/api";
import { getSummaryCache, setSummaryCache } from "../cache/summaryCache";

type Expense = {
    id: string;
    amount: number;
    category: string;
    date: string; // YYYY-MM-DD
};

const expenses: Expense[] = [];

/* Add expense */
export const addExpense = api(
    { method: "POST", path: "/expenses" },
    async (e: Expense) => {
        expenses.push(e);
        return { status: "added", data: e };
    }
);

/* Update expense */
export const updateExpense = api(
    { method: "PUT", path: "/expenses/:id" },
    async ({ id, ...data }: any) => {
        const idx = expenses.findIndex(e => e.id === id);
        if (idx === -1) return { error: "Not found" };
        expenses[idx] = { ...expenses[idx], ...data };
        return { status: "updated", data: expenses[idx] };
    }
);

/* Monthly summary by category (CACHED) */
export const monthlySummary = api(
    { method: "GET", path: "/expenses/summary/:month" },
    async ({ month }: { month: string }) => {
        const cached = getSummaryCache(month);
        if (cached) return { source: "cache", data: cached };

        const summary: Record<string, number> = {};
        expenses
            .filter(e => e.date.startsWith(month))
            .forEach(e => {
                summary[e.category] = (summary[e.category] || 0) + e.amount;
            });

        setSummaryCache(month, summary);
        return { source: "calculated", data: summary };
    }
);
