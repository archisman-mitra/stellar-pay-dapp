import { server } from "./stellar";

export const getBalance = async (address) => {
    const account = await server.loadAccount(address);

    const balance = account.balances.find(
        (b) => b.asset_type === "native"
    );

    return balance.balance;
};