import React from "react";
import { X, ChevronRight, Info } from "lucide-react";

const wallets = [
  { name: "Freighter", icon: "🦊", available: true, description: "Popular Stellar wallet extension" },
  { name: "Albedo", icon: "🔺", available: true, description: "Web-based Stellar wallet" },
  { name: "xBull", icon: "🐂", available: true, description: "Full-featured Stellar wallet" },
  { name: "HOT Wallet", icon: "🔥", available: false, description: "NEAR & multi-chain wallet" },
  { name: "Rabet", icon: "🐇", available: false, description: "Stellar browser extension" },
  { name: "LOBSTR", icon: "🦞", available: false, description: "Mobile-first Stellar wallet" },
  { name: "Hana Wallet", icon: "🌸", available: false, description: "Multi-chain browser wallet" },
  { name: "Klever Wallet", icon: "💎", available: false, description: "Self-custody crypto wallet" },
];

const WalletModal = ({ isOpen, onClose, onSelectWallet }) => {
  if (!isOpen) return null;

  const handleSelect = (wallet) => {
    if (wallet.available) {
      onSelectWallet(wallet.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Info Column (Hidden on very small screens) */}
        <div className="hidden md:block w-1/3 bg-slate-800/30 p-8 border-r border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Connect</h2>
          
          <div className="mb-8">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
              <Info size={16} />
              <span>What is a Wallet?</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Wallets are used to send, receive, and store the keys you use to sign blockchain transactions securely.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
              <Info size={16} />
              <span>What is Stellar?</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stellar is a decentralized, public blockchain that gives developers the tools to create experiences that are more like cash than crypto.
            </p>
          </div>
        </div>

        {/* Wallets Column */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Select a Wallet</h3>
            <button 
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              onClick={onClose}
              id="modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* List */}
          <div className="flex flex-col gap-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleSelect(wallet)}
                disabled={!wallet.available}
                id={`wallet-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${
                  wallet.available 
                    ? "bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-indigo-500/50 cursor-pointer"
                    : "bg-slate-900/40 border-slate-800/60 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl bg-slate-800 ${wallet.available ? 'shadow-inner' : ''}`}>
                    {wallet.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-200 mb-0.5">{wallet.name}</div>
                    <div className="text-[11px] text-slate-400">{wallet.description}</div>
                  </div>
                </div>

                {wallet.available ? (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                    <ChevronRight size={20} />
                  </div>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-slate-800 text-slate-500 rounded">
                    Not Available
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
