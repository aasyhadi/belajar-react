function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="text-center my-4">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2">{text}</p>
    </div>
  );
}

export default LoadingSpinner;