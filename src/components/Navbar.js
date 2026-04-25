import React, { useState } from "react";
import { Copy, Check, LogOut, Wallet, Sparkles } from "lucide-react";

const Navbar = ({ address, onConnect, onDisconnect, onOpenWalletModal }) => {
  const [copied, setCopied] = useState(false);

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 4) + "..." + addr.slice(-4);
  };

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 ring-2 ring-white/10">
          <Sparkles size={22} className="animate-pulse" />
        </div>
        <div>
          <div className="text-xl font-black text-white tracking-tighter leading-none mb-0.5">StellarPay</div>
          <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400/80 uppercase">Universal Node</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {address ? (
          <>
            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-sm font-medium text-slate-300">Connected</span>
              <span className="text-[10px] font-bold text-amber-400 ml-1 px-1.5 py-0.5 bg-amber-500/10 rounded">TESTNET</span>
            </div>

            {/* Address bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm font-mono text-slate-300 shadow-inner">
              <span>{shortenAddress(address)}</span>
              <button 
                onClick={copyAddress}
                className="p-1.5 rounded-md hover:bg-slate-700 active:scale-95 transition-all duration-200 text-slate-400 hover:text-white relative group"
                title="Copy Address"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500/20 border border-green-500/30 text-[10px] rounded text-green-400 whitespace-nowrap font-medium">
                    Copied! ✅
                  </span>
                )}
              </button>
            </div>

            {/* Disconnect Button */}
            <button 
              onClick={onDisconnect}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 hover:scale-105 transition-all duration-200 font-medium text-sm group"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenWalletModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 active:scale-100"
          >
            <Wallet size={18} />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
