import React, { useState } from "react";
import '../styes/NavBar.scss'
import { BoardContext } from "../context/BoardContext";

const NavBar = () => {
  const { grouping, setGrouping, sortOption, setSortOption } = useContext(BoardContext);
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="Navbar">
      <div className="dropdown-container">
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <i className="bx bx-slider"></i>
          <div className="btn-txt">Display</div>
          <i className="bx bx-chevron-down"></i>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="Grouping">
              <label>Grouping</label>
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="users">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="Ordering">
              <label>Ordering</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
