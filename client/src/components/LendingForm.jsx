import React, { useState } from 'react';

const LendingForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    pan: '',
    businessType: 'Retail',
    monthlyRevenue: '',
    amount: '',
    tenure: '',
    purpose: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card">
      <h2 style={{ marginBottom: '2rem', textAlign: 'left', color: '#00d2ff' }}>Apply for MSME Loan</h2>
      
      <div className="grid">
        <div className="form-group">
          <label>Owner Name</label>
          <input 
            type="text" 
            name="ownerName" 
            value={formData.ownerName} 
            onChange={handleChange} 
            placeholder="John Doe" 
            required 
          />
        </div>
        <div className="form-group">
          <label>PAN Card (ABCDE1234F)</label>
          <input 
            type="text" 
            name="pan" 
            value={formData.pan} 
            onChange={handleChange} 
            placeholder="ABCDE1234F" 
            required 
          />
        </div>
      </div>

      <div className="grid">
        <div className="form-group">
          <label>Business Type</label>
          <select name="businessType" value={formData.businessType} onChange={handleChange}>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Services">Services</option>
          </select>
        </div>
        <div className="form-group">
          <label>Monthly Revenue (₹)</label>
          <input 
            type="number" 
            name="monthlyRevenue" 
            value={formData.monthlyRevenue} 
            onChange={handleChange} 
            placeholder="e.g. 100000" 
            required 
          />
        </div>
      </div>

      <div className="grid">
        <div className="form-group">
          <label>Loan Amount (₹)</label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            placeholder="e.g. 500000" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Tenure (Months)</label>
          <input 
            type="number" 
            name="tenure" 
            value={formData.tenure} 
            onChange={handleChange} 
            placeholder="e.g. 12" 
            required 
          />
        </div>
      </div>

      <div className="form-group">
        <label>Loan Purpose</label>
        <textarea 
          name="purpose" 
          value={formData.purpose} 
          onChange={handleChange} 
          placeholder="Why do you need this loan?" 
          rows="3"
          required 
        />
      </div>

      <button type="submit" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }} disabled={loading}>
        {loading ? 'Evaluating...' : 'Check Eligibility'}
      </button>
    </form>
  );
};

export default LendingForm;
