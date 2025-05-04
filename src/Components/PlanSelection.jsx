import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './PlanSelection.css'; // Link to your stylesheet

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/payment');
  };

  return (
    <div className="plan-selection-container">
      <h1>Select a Subscription Plan</h1>
      <div className="plans">
        {['1-month', '6-months', '1-year'].map((plan) => (
          <div
            key={plan}
            className={`plan-card ${selectedPlan === plan ? 'selected' : ''}`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h2>{plan.replace('-', ' ')}</h2>
            <p>
              {plan === '1-month'
                ? '₹199'
                : plan === '6-months'
                ? '₹999'
                : '₹1799'}
            </p>
          </div>
        ))}
      </div>
      <button onClick={handleProceedToPayment} className="btn">
        Proceed to Simulated Payment
      </button>
    </div>
  );
};

export default PlanSelection;
