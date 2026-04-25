import React from "react";
import { Wallet, ShieldCheck, Link as LinkIcon, Key, Coins, Send, Sparkles } from "lucide-react";

const ConnectHero = ({ onConnect, onOpenWalletModal }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[80vh]">
      
      {/* Top Split Section */}
      <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-20 animate-fade-in">
        {/* Left - Brand */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-20 h-20 mb-8 rounded-[2rem] bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 ring-4 ring-white/5 relative">
            <Sparkles size={44} className="animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            StellarPay
          </h1>
          <p className="text-lg text-cyan-400 font-bold tracking-[0.3em] uppercase mb-8">
            Universal Payment Node
          </p>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed font-medium">
            The secure, next-generation portal for managing balances and global payments on the Stellar network.
          </p>
        </div>

        {/* Right - Connect Card */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
            </div>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              Connect your Stellar wallet to view your balance, manage assets, and initiate secure transactions.
            </p>

            <button
              onClick={onOpenWalletModal}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <Wallet size={20} />
              Connect Wallet
            </button>

            {/* Supported Wallets */}
            <div className="mt-8 pt-6 border-t border-slate-800/60">
              <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-medium">
                <Key size={16} />
                <span>Supported Wallets</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                {["Freighter", "xBull", "Albedo", "Rabet", "Lobstr", "Hana", "WalletConnect"].map(w => (
                  <span key={w} className="px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50 transition-colors hover:bg-slate-700 hover:text-slate-300 cursor-default">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-20" />

      {/* Bottom Section - Features */}
      <div className="w-full max-w-6xl text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold text-white mb-4">Unlock the Future of Payments</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Connect your wallet to send XLM, track transactions, and manage your balance instantly on the <strong className="text-indigo-400 font-semibold">Stellar Testnet</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {/* Feature 1 */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
              <Wallet size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Get Wallet</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Install a Stellar-compatible wallet extension like Freighter or xBull to begin.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
              <LinkIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use the 'Connect Wallet' button to safely pair your account's public key.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5">
              <Coins size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fund Testnet</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use Friendbot built into the wallets to get free Testnet XLM for network fees.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-5">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Send & Track</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Send fast XLM payments globally and view your transaction history instantly.
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ConnectHero;
