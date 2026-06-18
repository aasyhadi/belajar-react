import Skeleton from "react-loading-skeleton";

function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="card p-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="row mb-2" key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div className="col" key={colIndex}>
              <Skeleton height={25} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;