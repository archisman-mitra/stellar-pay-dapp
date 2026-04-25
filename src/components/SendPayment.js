import React, { useState } from "react";
import { Send, AlertTriangle, AlertCircle, CheckCircle2, Loader2, ExternalLink } from "lucide-react";

const SendPayment = ({ address, onSend }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!recipient.trim()) {
      newErrors.recipient = "Recipient address is required";
    } else if (recipient.length < 56) {
      newErrors.recipient = "Invalid Stellar address format";
    } else if (recipient === address) {
      newErrors.recipient = "Cannot send to your own address";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      address &&
      recipient.trim().length >= 56 &&
      amount.trim() &&
      !isNaN(amount) &&
      parseFloat(amount) > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Clear old status explicitly before starting new flow
    if (!validate()) return;

    try {
      setLoading(true);
      setStatus({ type: "warning", message: "Processing transaction..." });

      const result = await onSend(recipient, amount);

      setStatus({
        type: "success",
        message: "Payment Successful",
        hash: result.hash,
      });

      // Reset form after success
      setRecipient("");
      setAmount("");
      setMemo("");
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Transaction failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 sm:p-8 transition-all duration-200 hover:translate-y-[-2px]">
      
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
          <Send size={24} />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Send Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Recipient Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="recipient-input">
            Recipient Address
          </label>
          <input
            id="recipient-input"
            className={`w-full bg-slate-800/50 text-slate-200 border rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-600 ${
              errors.recipient 
                ? "border-red-500/50 focus:ring-2 focus:ring-red-500" 
                : "border-slate-700 focus:ring-2 focus:ring-indigo-500"
            }`}
            type="text"
            placeholder="GABCD...WXYZ"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              if (errors.recipient)
                setErrors((prev) => ({ ...prev, recipient: "" }));
            }}
            disabled={loading}
          />
          {errors.recipient && (
            <div className="flex items-center gap-1.5 mt-2 text-sm text-red-400">
              <AlertCircle size={14} />
              {errors.recipient}
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="amount-input">
            Amount (XLM)
          </label>
          <input
            id="amount-input"
            className={`w-full bg-slate-800/50 text-slate-200 border rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-600 ${
              errors.amount 
                ? "border-red-500/50 focus:ring-2 focus:ring-red-500" 
                : "border-slate-700 focus:ring-2 focus:ring-indigo-500"
            }`}
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errors.amount)
                setErrors((prev) => ({ ...prev, amount: "" }));
            }}
            disabled={loading}
          />
          {errors.amount && (
            <div className="flex items-center gap-1.5 mt-2 text-sm text-red-400">
              <AlertCircle size={14} />
              {errors.amount}
            </div>
          )}
        </div>

        {/* Memo Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="memo-input">
            Memo (Optional)
          </label>
          <input
            id="memo-input"
            className="w-full bg-slate-800/50 text-slate-200 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
            type="text"
            placeholder="Payment note..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!address || loading || !isFormValid()}
          className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 active:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              ⏳ Sending...
            </>
          ) : (
            "Send Payment"
          )}
        </button>
      </form>

      {!address && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 text-sm text-center">
          🔗 Connect your wallet to send payments
        </div>
      )}

      {/* Warning Box */}
      {address && (
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-sm">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>
            Transactions are irreversible. Double-check the recipient address before sending.
          </p>
        </div>
      )}

      {/* Feedback Alerts */}
      {status && (
        <div 
          className={`mt-6 p-4 rounded-xl border animate-fade-in ${
            status.type === "success" 
              ? "bg-green-500/10 border-green-500/20 text-green-400" 
              : status.type === "error" 
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
          }`}
        >
          <div className="flex items-start gap-3">
            {status.type === "success" && <CheckCircle2 size={20} className="shrink-0 mt-0.5" />}
            {status.type === "error" && <AlertCircle size={20} className="shrink-0 mt-0.5" />}
            {status.type === "warning" && <Loader2 size={20} className="shrink-0 mt-0.5 animate-spin" />}
            
            <div className="flex-1">
              <h4 className="font-bold mb-1">
                {status.type === "success" && "✅ Payment Successful"}
                {status.type === "error" && "❌ Transaction Failed"}
                {status.type === "warning" && "⏳ Processing..."}
              </h4>
              <p className="text-sm opacity-90">{status.message}</p>
              
              {status.hash && (
                <div className="mt-4 pt-3 border-t border-green-500/20">
                  <p className="text-xs font-mono break-all mb-3 text-green-300">
                    {status.hash}
                  </p>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${status.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded transition-colors"
                  >
                    View on Stellar Expert <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SendPayment;
