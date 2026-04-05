function Button({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) {
  const baseStyles = "ui-btn disabled:cursor-not-allowed";
  
  const variants = {
    primary: "ui-btn--primary",
    secondary: "ui-btn--secondary",
    success: "ui-btn--success",
    danger: "ui-btn--danger",
    outline: "ui-btn--outline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
