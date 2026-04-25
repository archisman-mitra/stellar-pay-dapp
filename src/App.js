import React, { useState } from "react";
import "./App.css";
import { connectWallet } from "./wallet";
import { getBalance } from "./balance";
import { sendXLM } from "./transaction";

import Navbar from "./components/Navbar";
import ConnectHero from "./components/ConnectHero";
import WalletOverview from "./components/WalletOverview";
import SendPayment from "./components/SendPayment";
import TransactionHistory from "./components/TransactionHistory";
import WalletModal from "./components/WalletModal";
import WalletCard from "./components/WalletCard";

function App() {
  const [address, setAddress] = useState("GC6NUHJZOYIKZ4ZQYVYHFEFOKV24B05IZVR73ZDE34J5JDD6ERAI4PYT");
  const [balance, setBalance] = useState("10,000.00");
  const [txRefreshKey, setTxRefreshKey] = useState(0);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleOpenWalletModal = () => {
    setWalletModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    setWalletModalOpen(false);
  };

  const handleSelectWallet = async (walletName) => {
    setWalletModalOpen(false);
    try {
      // Currently only Freighter is implemented, but the modal shows all options
      const addr = await connectWallet();
      setAddress(addr);
      const bal = await getBalance(addr);
      setBalance(bal);
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const handleDisconnect = () => {
    setAddress("");
    setBalance("");
  };

  const handleRefreshBalance = async () => {
    if (!address) return;
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (err) {
      console.error("Failed to refresh balance:", err);
    }
  };

  const handleSend = async (recipient, amount) => {
    const result = await sendXLM(address, recipient, amount);

    // Refresh balance after successful send
    const bal = await getBalance(address);
    setBalance(bal);

    // Trigger transaction history refresh
    setTxRefreshKey((prev) => prev + 1);

    return result;
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Navbar
        address={address}
        onConnect={handleSelectWallet}
        onDisconnect={handleDisconnect}
        onOpenWalletModal={handleOpenWalletModal}
      />

      <WalletModal
        isOpen={walletModalOpen}
        onClose={handleCloseWalletModal}
        onSelectWallet={handleSelectWallet}
      />

      {!address ? (
        <ConnectHero
          onConnect={handleSelectWallet}
          onOpenWalletModal={handleOpenWalletModal}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <WalletCard address={address} onDisconnect={handleDisconnect} />
              <SendPayment address={address} onSend={handleSend} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <WalletOverview
                balance={balance}
                onRefresh={handleRefreshBalance}
              />
              <TransactionHistory
                address={address}
                key={`tx-${txRefreshKey}`}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;