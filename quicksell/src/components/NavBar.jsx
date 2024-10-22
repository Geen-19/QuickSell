import React, { useState } from "react";
import '../styes/NavBar.css'
import { BoardContext } from "../context/BoardContext";
import { useContext } from "react";
const NavBar = () => {
  const { grouping, setGrouping, sortOption, setSortOption } = useContext(BoardContext);
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
      <div className="dropdown-container">
        <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
          <i className="bx bx-slider"></i>
          <div className="btn-txt"><p>Display</p></div>
          <i className="bx bx-chevron-down"></i>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="Grouping">
              <label>Grouping</label>
              <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status"><p>Status</p></option>
                <option value="user"><p>User</p></option>
                <option value="priority"><p>Priority</p></option>
              </select>
            </div>
            <div className="Ordering">
              <label>Ordering</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="priority"><p>Priority</p></option>
                <option value="title"><p>Title</p></option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
