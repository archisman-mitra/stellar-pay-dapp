import {
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  rpc,
} from "@stellar/stellar-sdk";

import { signTransaction as freighterSign } from "@stellar/freighter-api";
import albedo from "@albedo-link/intent";
import { xBullWalletConnect } from "@creit.tech/xbull-wallet-connect";

// ✅ Use RPC server
const server = new rpc.Server("https://soroban-testnet.stellar.org");

// ✅ Poll until transaction is confirmed or fails
const waitForConfirmation = async (hash, maxAttempts = 15) => {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await server.getTransaction(hash);

    if (response.status === "SUCCESS") {
      return response;
    } else if (response.status === "FAILED") {
      throw new Error("Transaction failed on-chain");
    }

    // Still pending — wait 2 seconds before retrying
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error("Transaction confirmation timed out");
};

export const sendXLM = async (source, destination, amount, walletName) => {
  const account = await server.getAccount(source);

  const fee = "100";

  const transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination,
        asset: Asset.native(),
        amount: amount.toString(),
      })
    )
    .setTimeout(30)
    .build();

  const xdr = transaction.toXDR();
  let signedXDR;

  if (walletName === "Freighter") {
    // 🔐 Sign with Freighter
    // v6+ returns { signedTxXdr, signerAddress } instead of a raw string
    const signResult = await freighterSign(xdr, {
      networkPassphrase: Networks.TESTNET,
    });
    signedXDR = typeof signResult === "string" ? signResult : signResult.signedTxXdr;
  } 
  else if (walletName === "Albedo") {
    const signResult = await albedo.tx({
      xdr: xdr,
      network: "testnet"
    });
    signedXDR = signResult.signed_envelope_xdr;
  }
  else if (walletName === "xBull") {
    const bridge = new xBullWalletConnect({
        preferredTarget: 'extension'
    });
    signedXDR = await bridge.sign({
      xdr: xdr,
      network: Networks.TESTNET
    });
    bridge.closeConnections();
  }
  else {
    throw new Error(`Unsupported wallet for signing: ${walletName}`);
  }

  // ✅ Rebuild and submit
  const tx = TransactionBuilder.fromXDR(signedXDR, Networks.TESTNET);
  const sendResponse = await server.sendTransaction(tx);

  // ✅ If pending, wait for confirmation before returning
  if (sendResponse.status === "PENDING") {
    const confirmed = await waitForConfirmation(sendResponse.hash);
    return { hash: sendResponse.hash, ...confirmed };
  }

  if (sendResponse.status === "ERROR") {
    throw new Error("Transaction submission failed");
  }

  return sendResponse;
};