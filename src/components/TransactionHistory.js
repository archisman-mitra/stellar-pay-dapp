import React, { useState, useEffect, useCallback } from "react";
import { server } from "../stellar";
import { History, RefreshCw, ArrowUpRight, ArrowDownLeft, ExternalLink, Loader2, Rocket } from "lucide-react";

const TransactionHistory = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const shortenAddr = (addr) => {
    if (!addr) return "—";
    return addr.slice(0, 4) + "..." + addr.slice(-4);
  };

  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 10) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const fetchTransactions = useCallback(async () => {
    if (!address) return;
    try {
      setLoading(true);
      const payments = await server
        .payments()
        .forAccount(address)
        .order("desc")
        .limit(10)
        .call();

      const parsed = payments.records
        .filter(
          (r) => r.type === "payment" || r.type === "create_account"
        )
        .map((record) => {
          const isSent = record.from === address;
          return {
            id: record.id,
            type: isSent ? "Sent" : "Received",
            isSent,
            amount: record.amount || record.starting_balance || "0",
            from: record.from || record.source_account || "",
            to: record.to || record.account || "",
            time: record.created_at,
            hash: record.transaction_hash,
          };
        });

      setTransactions(parsed);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTransactions();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 sm:p-8 transition-all duration-200 hover:translate-y-[-2px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <History size={24} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Transactions</h2>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 hover:rotate-180 transition-all duration-300"
          title="Refresh Transactions"
        >
          <RefreshCw size={20} className={isRefreshing ? "animate-spin text-indigo-400" : ""} />
        </button>
      </div>

      {/* Loading State */}
      {loading && transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 size={40} className="text-indigo-500 animate-spin mb-4" />
          <div className="text-slate-300 font-medium">Loading transactions...</div>
        </div>

      ) : transactions.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-5 shadow-inner">
            <Rocket size={32} className="text-slate-500" />
          </div>
          <div className="text-white font-bold text-lg mb-2">No transactions yet 🚀</div>
          <div className="text-slate-400 text-sm">Start by sending a payment</div>
        </div>

      ) : (
        /* Transaction List */
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80 hover:bg-slate-800 hover:border-slate-700 transition-all duration-200 group"
            >
              {/* TOP ROW: Icon + Label  |  Amount */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                    tx.isSent
                      ? "bg-red-500/10 text-red-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {tx.isSent ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">
                    {tx.type}
                  </span>
                </div>

                <div className={`text-lg font-semibold ${
                  tx.isSent ? "text-red-400" : "text-green-400"
                }`}>
                  {tx.isSent ? "−" : "+"}
                  {parseFloat(tx.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  XLM
                </div>
              </div>

              {/* MIDDLE: From / To Grid */}
              <div className="grid grid-cols-2 gap-4 mb-3 pl-12">
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">From</div>
                  <div className="text-sm font-mono text-slate-300">{shortenAddr(tx.from)}</div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide mb-0.5">To</div>
                  <div className="text-sm font-mono text-slate-300">{shortenAddr(tx.to)}</div>
                </div>
              </div>

              {/* BOTTOM ROW: Time  |  Details Link */}
              <div className="flex items-center justify-between pl-12">
                <span className="text-xs text-slate-500">{timeAgo(tx.time)}</span>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  Details <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
