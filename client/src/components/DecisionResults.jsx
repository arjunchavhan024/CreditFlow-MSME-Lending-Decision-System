import React from 'react';
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const DecisionResults = ({ result, onReset }) => {
  const { status, creditScore, reasons } = result;
  
  const isApproved = status === 'Approved';

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        {isApproved ? (
          <CheckCircle size={64} color="#00ff88" style={{ marginBottom: '1rem' }} />
        ) : (
          <XCircle size={64} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
        )}
        <h2 style={{ color: isApproved ? '#00ff88' : '#ff4d4d', fontSize: '2rem', margin: '0' }}>
          Loan {status}
        </h2>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <TrendingUp size={20} color="#00d2ff" />
          <span style={{ color: '#a8dadc', fontWeight: '500' }}>Credit Score</span>
        </div>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>
          {creditScore}
          <span style={{ fontSize: '1rem', color: '#a8dadc' }}>/100</span>
        </div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h4 style={{ color: '#00d2ff', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
          Assisted Decision Logic
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {reasons.map((reason, index) => (
            <div 
              key={index}
              style={{ 
                background: isApproved ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                color: isApproved ? '#00ff88' : '#ff4d4d',
                padding: '0.4rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.85rem',
                border: `1px solid ${isApproved ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 77, 77, 0.2)'}`
              }}
            >
              {reason.replace(/_/g, ' ')}
            </div>
          ))}
        </div>
      </div>

      <button onClick={onReset} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
        Back to Application
      </button>
    </div>
  );
};

export default DecisionResults;
