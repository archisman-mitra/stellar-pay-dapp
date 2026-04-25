import React, { useState } from "react";
import { Copy, Check, LogOut, ExternalLink } from "lucide-react";

const WalletCard = ({ address, onDisconnect }) => {
  const [copied, setCopied] = useState(false);

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

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-6);
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-5 sm:p-6 transition-all duration-200 hover:translate-y-[-2px]">
      {/* Top Row: Connected + Disconnect */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-sm font-medium text-green-400">Connected</span>
        </div>
        <button
          onClick={onDisconnect}
          className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut size={14} />
          Disconnect
        </button>
      </div>

      {/* Address Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 mb-4">
        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-1">Your Address</div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-mono text-slate-200 truncate">
            {shortenAddress(address)}
          </span>
          <button
            onClick={copyAddress}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95 transition-all duration-200 shrink-0 relative"
            title="Copy Address"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied && (
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-[10px] rounded text-green-400 whitespace-nowrap font-medium">
                Copied! ✅
              </span>
            )}
          </button>
        </div>
      </div>

      {/* View on Stellar Expert */}
      <a
        href={`https://stellar.expert/explorer/testnet/account/${address}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        View on Stellar Expert <ExternalLink size={14} />
      </a>
    </div>
  );
};

export default WalletCard;
