function StatCard({ title, value, className = "text-bg-primary" }) {
  return (
    <div className="col-md-3">
      <div className={`card text-center ${className}`}>
        <div className="card-body">
          <h2>{value ?? 0}</h2>
          <p className="mb-0">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;