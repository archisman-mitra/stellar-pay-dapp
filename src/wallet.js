import {
    isConnected,
    requestAccess,
    getAddress,
    getNetwork
} from "@stellar/freighter-api";

export const connectWallet = async () => {
    // Check network
    const network = await getNetwork();
    console.log("Network:", network);

    // Request access ALWAYS (force popup)
    const access = await requestAccess();

    if (access.error) {
        throw new Error(access.error);
    }

    return access.address;
};