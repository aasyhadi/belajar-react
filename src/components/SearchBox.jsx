function SearchBox({ value, onChange, placeholder = "Cari data..." }) {
  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;