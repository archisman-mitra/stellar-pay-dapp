import {
    requestAccess,
    getNetwork,
    isConnected
} from "@stellar/freighter-api";
import albedo from "@albedo-link/intent";
import { xBullWalletConnect } from "@creit.tech/xbull-wallet-connect";

export const connectWallet = async (walletName) => {
    if (walletName === "Freighter") {
        const isFreighterInstalled = await isConnected();
        if (!isFreighterInstalled) {
            window.open("https://freighter.app/", "_blank");
            return null;
        }

        // Check network
        const network = await getNetwork();
        console.log("Network:", network);

        // Request access ALWAYS (force popup)
        const access = await requestAccess();

        if (access.error) {
            throw new Error(access.error);
        }

        return access.address;
    }
    
    if (walletName === "Albedo") {
        const res = await albedo.publicKey({
            token: 'stellar-dapp-connection'
        });
        return res.pubkey;
    }
    
    if (walletName === "xBull") {
        if (typeof window.xBullSDK === "undefined") {
            window.open("https://xbull.app/", "_blank");
            return null;
        }
        
        const bridge = new xBullWalletConnect({
            preferredTarget: 'extension'
        });
        const publicKey = await bridge.connect();
        bridge.closeConnections();
        return publicKey;
    }

    throw new Error(`Unsupported wallet: ${walletName}`);
};