import { useNavigate } from 'react-router-dom';
// import './PaymentPage.css'; // Link to its CSS

const PaymentPage = () => {
  const navigate = useNavigate();
  const selectedPlan = localStorage.getItem('selectedPlan');

  const handleSimulatedPayment = () => {
    localStorage.setItem('paymentComplete', 'true');
    alert('Simulated payment successful!');
    navigate('/client-signup');
  };

  return (
    <div className="payment-page">
      <h1>Simulated Payment</h1>
      <p>Selected Plan: <strong>{selectedPlan?.replace('-', ' ')}</strong></p>
      <p>Total Cost: {
        selectedPlan === '1-month' ? '₹199' :
        selectedPlan === '6-months' ? '₹999' : '₹1799'
      }</p>
      <button onClick={handleSimulatedPayment} className="pay-button">
        Simulate Payment
      </button>
    </div>
  );
};

export default PaymentPage;
