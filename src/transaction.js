import {
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  rpc,
} from "@stellar/stellar-sdk";

import { signTransaction } from "@stellar/freighter-api";

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

export const sendXLM = async (source, destination, amount) => {
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

  // 🔐 Sign with Freighter
  // v6+ returns { signedTxXdr, signerAddress } instead of a raw string
  const signResult = await signTransaction(transaction.toXDR(), {
    networkPassphrase: Networks.TESTNET,
  });

  // ✅ Extract the signed XDR string (handle both v5 and v6 formats)
  const signedXDR =
    typeof signResult === "string" ? signResult : signResult.signedTxXdr;

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