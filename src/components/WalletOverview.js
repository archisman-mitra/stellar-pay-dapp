import React, { useState } from "react";
import { Wallet, RefreshCw, Clock, Lightbulb } from "lucide-react";

const WalletOverview = ({ balance, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const formatBalance = (bal) => {
    if (!bal) return "0.00";
    const num = parseFloat(bal);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 5,
    });
  };

  const estimateUSD = (bal) => {
    if (!bal) return "0.00";
    const xlmPrice = 0.12; // approximate
    const usd = parseFloat(bal) * xlmPrice;
    return usd.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getTimeSince = () => {
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    return `${Math.floor(seconds / 60)}m ago`;
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 sm:p-8 transition-all duration-200 hover:translate-y-[-2px]">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Wallet size={24} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Wallet Balance</h2>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 hover:rotate-180 transition-all duration-300"
          title="Refresh Balance"
          id="refresh-balance-btn"
        >
          <RefreshCw size={20} className={isRefreshing ? "animate-spin text-indigo-400" : ""} />
        </button>
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <div className="text-sm font-medium text-slate-300">Available Balance</div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {formatBalance(balance)}
          </span>
          <span className="text-xl font-bold text-indigo-400">XLM</span>
        </div>
        <div className="text-slate-400 font-medium mt-1">
          ≈ ${estimateUSD(balance)} USD
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-sm text-slate-400 font-medium">
          <Clock size={14} />
          Updated: {getTimeSince()}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
        <Lightbulb size={18} className="shrink-0 mt-0.5" />
        <p>Keep at least 1 XLM for network reserves</p>
      </div>
    </div>
  );
};

export default WalletOverview;
