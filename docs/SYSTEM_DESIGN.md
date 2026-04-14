# System Design: CreditFlow MSME Lending Decision System

## 1. Overview
CreditFlow is a high-performance, automated lending decision platform specifically tailored for the MSME (Micro, Small, and Medium Enterprises) sector. It evaluates business health and loan feasibility in real-time using a deterministic scoring engine.

## 2. Architecture
The system employs a **Micro-service ready Monolithic Architecture** with clear separation of concerns:

- **Frontend (Client)**: React SPA focusing on high-integrity data collection and user feedback visualization.
- **Backend (API)**: Node.js/Express RESTful API providing stateless endpoints.
- **Decision Engine (Service Layer)**: An idempotent business logic module that separates "how we decide" from "how we store data".
- **Database (Persistence)**: MongoDB utilized for its flexible schema (ideal for varying business attributes) and high write throughput.

### Data Flow Diagram (Textual)
`User` -> `React Form` -> `POST /business` -> `MongoDB`
`User` -> `React Form` -> `POST /loan/apply` -> `Decision Engine` -> `Result` -> `MongoDB` -> `UI`

## 3. Decision Logic Depth
The heart of the system is the `DecisionEngine`. Unlike simple threshold checks, it uses a **compounded scoring model**:

| Factor | Metric | Rationale |
| :--- | :--- | :--- |
| **Liquidity** | EMI-to-Revenue | Ensures the business isn't "living to pay debt". |
| **Industry Risk** | Sector Weights | Manufacturing (high assets) vs Services (low overhead) vs Retail (high churn). |
| **Credit Maturity** | Tenure Weighting | Rewards shorter, high-velocity loan cycles. |
| **Absolute Caps** | Loan-to-Annual-Revenue | Prevents over-leveraging beyond 3 years of grossing capacity. |

## 4. Technical Specifications
- **Security**: Basic input sanitization via Mongoose middleware and regex PAN validation.
- **Scalability**: Stateless backend design allows horizontal scaling behind a Load Balancer.
- **Resilience**: Integrated error handling for database failures and invalid business logic states.

## 5. Future Roadmap
- **OCR Integration**: Automate PAN and GST certificate extraction.
- **Bureau Integration**: Connect to CIBIL/Experian for real-time history.
- **Machine Learning**: Transition from deterministic scoring to a probabilistic Random Forest model as data volume grows.
