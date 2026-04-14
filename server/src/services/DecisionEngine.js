/**
 * Decision Engine Service
 * Handles the logic for credit scoring and loan approval/rejection.
 */

class DecisionEngine {
    /**
     * Calculate credit score and decision
     * @param {Object} business - Business profile data
     * @param {Object} application - Loan application data
     * @returns {Object} result - { status, score, reasons }
     */
    static evaluate(business, application) {
        let score = 50; // Base score
        const reasons = [];
        let status = 'Approved';

        const { monthlyRevenue, businessType } = business;
        const { amount, tenure } = application;

        // 1. Minimum Revenue Check
        if (monthlyRevenue < 50000) {
            status = 'Rejected';
            reasons.push('LOW_REVENUE');
        }

        // 2. EMI-to-Revenue Ratio (Monthly Load)
        const estimatedEMI = amount / tenure;
        const emiToRevenueRatio = (estimatedEMI / monthlyRevenue) * 100;

        if (emiToRevenueRatio > 40) {
            status = 'Rejected';
            reasons.push('HIGH_DEBT_RATIO');
        } else if (emiToRevenueRatio < 10) {
            score += 40;
        } else if (emiToRevenueRatio <= 25) {
            score += 25;
        } else {
            score += 10;
        }

        // 3. Business Stability (Score weight)
        switch (businessType) {
            case 'Manufacturing':
                score += 30;
                break;
            case 'Services':
                score += 20;
                break;
            case 'Retail':
                score += 10;
                break;
            default:
                break;
        }

        // 4. Tenure Risk
        if (tenure <= 12) {
            score += 30;
        } else if (tenure <= 24) {
            score += 20;
        } else {
            score += 10;
        }

        // 5. Loan-to-Revenue Check (Sanity check)
        const annualRevenue = monthlyRevenue * 12;
        if (amount > (annualRevenue * 3)) {
            status = 'Rejected';
            reasons.push('LOAN_EXCEEDS_CAPACITY');
        }

        // Final decision based on score if not already rejected
        if (status !== 'Rejected') {
            if (score < 60) {
                status = 'Rejected';
                reasons.push('INSUFFICIENT_CREDIT_SCORE');
            }
        }

        // Normalize score to 100 cap
        const finalScore = Math.min(score, 100);

        return {
            status,
            score: finalScore,
            reasons: reasons.length > 0 ? reasons : ['GOOD_CREDIT_HEALTH']
        };
    }
}

module.exports = DecisionEngine;
