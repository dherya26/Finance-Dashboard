function Card({ children, className = "" }) {
  return (
    <div className={`ui-card p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;
