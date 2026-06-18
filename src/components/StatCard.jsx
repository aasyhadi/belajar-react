import {
  FaUserGraduate,
  FaBook,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

function StatCard({
  title,
  value,
  className,
  icon,
}) {
  return (
    <div className="col-md-3 mb-3">
      <div className={`card shadow-sm ${className}`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6>{title}</h6>
            <h2>{value}</h2>
          </div>

          <div style={{ fontSize: "2rem" }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;