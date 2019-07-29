import React from "react";

function Footer({ nItemsLeft, setCurrentFilter, currentFilter }) {
  const FILTER_TYPES = ["ALL", "ACTIVE", "COMPLETED"];

  return (
    <footer id="footer" style={{ display: "block" }}>
      <span id="todo-count">
        <strong>{nItemsLeft}</strong> items left
      </span>
      <ul id="filters">
        {FILTER_TYPES.map(filterType => (
          <Liste
            currentFilter={currentFilter}
            filterType={filterType}
            setCurrentFilter={setCurrentFilter}
          />
        ))}
      </ul>
    </footer>
  );
}

function Liste({ currentFilter, filterType, setCurrentFilter }) {
  return (
    <li key={filterType}>
      <a
        className={currentFilter === filterType ? "selected" : ""}
        href="#/"
        onClick={e => {
          e.preventDefault();
          setCurrentFilter(filterType);
        }}
      >
        {filterType}
      </a>
    </li>
  );
}

export default Footer;
