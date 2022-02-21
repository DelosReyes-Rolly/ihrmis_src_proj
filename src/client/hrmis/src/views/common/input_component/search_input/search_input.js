import React from "react";

const SearchComponent = ({ placeholder, onChange, value }) => {
  return (
    <div className="input-div">
      <input
        className="custom-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchComponent;
