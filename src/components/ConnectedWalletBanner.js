import React, { useState } from "react";

const ConnectedWalletBanner = ({ address, onDisconnect }) => {
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

  return (
    <div className="connected-wallet-banner fade-in" id="connected-wallet-banner">
      <div className="banner-top">
        <div className="banner-status">
          <div className="wallet-status-dot connected" />
          <span className="banner-status-text">Connected</span>
        </div>
        <button className="banner-disconnect-btn" onClick={onDisconnect} aria-label="Disconnect wallet">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Disconnect
        </button>
      </div>

      <div className="banner-address-card">
        <div className="banner-address-label">Your Address</div>
        <div className="banner-address-row">
          <div className="banner-address-full">{address}</div>
          <button
            className="banner-copy-btn"
            onClick={copyAddress}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <span className="icon success">✓</span>
            ) : (
              <span className="icon">📋</span>
            )}
          </button>
        </div>
      </div>

      <a
        className="banner-explorer-link"
        href={`https://stellar.expert/explorer/testnet/account/${address}`}
        target="_blank"
        rel="noreferrer"
      >
        View on Stellar Expert →
      </a>
    </div>
  );
};

export default ConnectedWalletBanner;
