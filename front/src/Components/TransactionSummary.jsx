import React from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionSummary.css"; // Import the CSS file

const TransactionSummary = ({ transaction, logo }) => {
  const navigate = useNavigate();

  const handleNavigateToDetails = () => {
    navigate(`/transaction/${transaction._id}`);
  };

  const isApproved =
    transaction.status === "completed" ||
    transaction.status === "complete" ||
    transaction.approved;
  const transactionAmount = transaction.amount;
  let transactionSymbol = "UNKNOWN";
  if (transaction.selectedSymbol) {
    transactionSymbol = transaction.selectedSymbol.toUpperCase();
  } else if (transaction.symbol) {
    transactionSymbol = transaction.symbol.toUpperCase();
  } else if (transaction.fromSymbol && transaction.toSymbol) {
    transactionSymbol = `${transaction.fromSymbol.toUpperCase()}-${transaction.toSymbol.toUpperCase()}`;
  }

  const statusClass = isApproved ? "completed" : "pending";
  const statusIcon = isApproved ? "✓" : "⏳";
  const statusMessage = isApproved ? "Completed" : "Pending";

  return (
    <div
      className="transaction-summary"
      onClick={handleNavigateToDetails}
      style={{ backgroundColor: "#f0f0f0be" }}
    >
      <div className="summary-header">
        <div style={{ fontSize: "20px", display: "block" }}>
          <h1>
            <b>{transactionSymbol}</b>
          </h1>
        </div>
        <div
          className="transaction-details"
          style={{ backgroundColor: "#f0f0f0be" }}
        >
          <p className="label">
            Amount: <span className="value">{transactionAmount}</span>
          </p>
        </div>
      </div>
      <div>
        <p>{new Date(transaction.createdAt).toLocaleString()}</p>
        <p className={`status ${statusClass}`}>
          {statusIcon} <span>{statusMessage}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionSummary;
