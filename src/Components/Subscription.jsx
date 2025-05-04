import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const plans = [
    { name: "1 month", price: 199, description: "Access for 1 month" },
    { name: "6 months", price: 999, description: "Access for 6 months" },
    { name: "1 year", price: 1799, description: "Access for 1 year" },
  ];

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setError(null);
  };

  const handlePayment = () => {
    if (!selectedPlan) {
      setError("Please select a subscription plan.");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      localStorage.setItem("paymentCompleted", "true");
      localStorage.setItem("selectedPlan", selectedPlan.name);
      alert(`Payment for ${selectedPlan.name} completed!`);
      navigate("/signup"); // Redirect to signup
    }, 2000);
  };

  return (
    <div className="subscription-container">
      <h1 className="subscription-title">Select Your Subscription Plan</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="plan-selection">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-option ${selectedPlan === plan ? "selected" : ""}`}
            onClick={() => handlePlanSelection(plan)}
          >
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <p className="plan-price">₹{plan.price}</p>
            </div>
            {selectedPlan === plan && (
              <div className="plan-details">
                <p>{plan.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="payment-section">
        <button
          className={`payment-btn ${loading ? "loading" : ""}`}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? <span className="spinner-circle"></span> : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Subscription;
