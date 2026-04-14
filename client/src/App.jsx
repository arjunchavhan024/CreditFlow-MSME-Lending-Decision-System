import React, { useState } from "react";
import axios from "axios";
import LendingForm from "./components/LendingForm";
import DecisionResults from "./components/DecisionResults";
import "./App.css";

const API_BASE = "https://creditflow-msme-lending-decision-system.onrender.com";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleApplication = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Create/Update Business Profile
      const businessRes = await axios.post(`${API_BASE}/business`, {
        ownerName: formData.ownerName,
        pan: formData.pan,
        businessType: formData.businessType,
        monthlyRevenue: Number(formData.monthlyRevenue),
      });

      const businessId = businessRes.data.data._id;

      // Step 2: Submit Loan Application
      const applicationRes = await axios.post(`${API_BASE}/loan/apply`, {
        businessId,
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        purpose: formData.purpose,
      });

      setResult(applicationRes.data.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please check your inputs.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header style={{ marginBottom: "3rem" }}>
        <h1>
          CreditFlow{" "}
          <span
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              verticalAlign: "middle",
              opacity: 0.6,
            }}
          >
            Decision System
          </span>
        </h1>
        <p style={{ color: "#a8dadc" }}>
          Enterprise-grade MSME Lending Decisions in Seconds
        </p>
      </header>

      <main>
        {error && (
          <div
            style={{
              background: "rgba(255, 77, 77, 0.1)",
              color: "#ff4d4d",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              border: "1px solid rgba(255, 77, 77, 0.2)",
            }}
          >
            {error}
          </div>
        )}

        {result ? (
          <DecisionResults result={result} onReset={() => setResult(null)} />
        ) : (
          <LendingForm onSubmit={handleApplication} loading={loading} />
        )}
      </main>

      <footer style={{ marginTop: "4rem", opacity: 0.5, fontSize: "0.8rem" }}>
        &copy; 2026 CreditFlow MSME Lending. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
