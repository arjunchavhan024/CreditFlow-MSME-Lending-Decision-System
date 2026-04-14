# CreditFlow: MSME Lending Decision System

A complete end-to-end lending decision system for MSMEs, designed for quick eligibility checks and automated credit scoring.

## 🚀 Teck Stack
- **Frontend**: React (Vite) + Vanilla CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Validation**: Joi / Regex Match
- **Icons**: Lucide-React

## 🛠️ Features
- **Business Profiling**: Comprehensive collection of business data including PAN validation.
- **Decision Engine**: Automated 100-point scoring system based on:
    - Revenue-to-EMI Ratio
    - Sector Stability (Manufacturing/Services/Retail)
    - Tenure Risk
    - Absolute Capacity Checks
- **Audit Logs**: Comprehensive logging of profile changes and loan submissions.
- **Premium UI**: Modern glassmorphic design with responsive layout.

## 📦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running on `localhost:27017` or configurable via `.env`)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd CreditFlow-MSME-Lending-Decision-System
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   # Configure .env (optional, defaults provided)
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🧠 Decision logic (Scoring)
The system evaluates applications out of **100 points**:
- **Revenue Health (40pts)**: Based on debt-to-income ratio.
- **Stability (30pts)**: Sector-based risk assessment.
- **Tenure Risk (30pts)**: Weighted for shorter, lower-risk durations.

**Thresholds**:
- **Approval**: Score >= 60.
- **Auto-Reject**: Revenue < ₹50k, EMI > 40% of revenue, or Loan > 3x annual revenue.

## 📄 License
ISC
