import "./RateLimitUI.css";

const RateLimitUI = () => {
  return (
    <div className="rate-limit-container">
      <p className="rate-limit-message">
        Too many requests in a short period. Please try again later.
      </p>
    </div>
  );
};

export default RateLimitUI;
