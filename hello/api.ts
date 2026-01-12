import { api } from "encore.dev/api";
import { getCachedUser, setCachedUser } from "../cache/userCache";

export const getUser = api(
    { method: "GET", path: "/user/:id" },
    async ({ id }: { id: string }) => {
        const cached = getCachedUser(id);
        if (cached) {
            return { source: "cache", data: cached };
        }

        // fake fetch
        const user = { id, name: "Demo User" };

        setCachedUser(id, user);
        return { source: "db", data: user };
    }
);
