import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BoardContext } from "../context/BoardContext";
import "../styes/DashBoard.css";
const DashBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const { grouping, sortOption } = useContext(BoardContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      console.log(response.data);
      setTickets(response.data.tickets);
      setUsers(response.data.users);
    };
    fetchData();
  }, []);
  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return groupByStatus();
      case "user":
        return groupByUser();
      case "priority":
        return groupByPriority();
      default:
        return [];
    }
  };

  const groupByStatus = () => {
    const statuses = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
    return statuses.map((status) => ({
      group: status,
      tickets: tickets.filter((ticket) => ticket.status === status),
    }));
  };

  const groupByUser = () => {
    return users.map((user) => ({
      group: user.name,
      tickets: tickets.filter((ticket) => ticket.userId === user.id),
    }));
  };
  const groupByPriority = () => {
    const priorities = [4, 3, 2, 1, 0];
    const priorityLabels = ["Urgent", "High", "Medium", "Low", "No priority"];
    return priorities.map((priority, index) => ({
      group: priorityLabels[index],
      tickets: tickets.filter((ticket) => ticket.priority === priority),
    }));
  };
  const sortTickets = (ticketArray) => {
    if (sortOption === "priority") {
      return ticketArray.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === "title") {
      return ticketArray.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketArray;
  };
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return "⚡"; // Urgent
      case 3:
        return "🔴"; // High
      case 2:
        return "🟡"; // Medium
      case 1:
        return "🔵"; // Low
      case 0:
      default:
        return "⚪"; // No priority
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return "📋";
      case "todo":
        return "📝";
      case "in progress":
        return "🔄";
      case "done":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📌";
    }
  };
  return (
    <div className="dashboard">
      <div className="board">
        {groupTickets().map((group) => (
          <div key={group.group} className="column">
            <div className="column-header">
              <div className="header-left">
                <span className="header-icon">
                  {grouping === "priority"
                    ? getPriorityIcon(group.tickets[0]?.priority)
                    : grouping === "status"
                    ? getStatusIcon(group.group)
                    : "👤"}
                </span>
                <span className="group-name">{group.group}</span>
                <span className="ticket-count">{group.tickets.length}</span>
              </div>
              <div className="header-actions">
                <button className="icon-button">+</button>
                <button className="icon-button">⋯</button>
              </div>
            </div>
            <div className="tickets-container">
              {sortTickets(group.tickets).map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <span className="ticket-id">{ticket.id}</span>
                    <div
                      className="user-avatar"
                      title={
                        users.find((u) => u.id === ticket.userId)?.name ||
                        "User"
                      }
                    >
                      {users
                        .find((u) => u.id === ticket.userId)
                        ?.name.charAt(0) || "U"}
                    </div>
                  </div>
                  <h3 className="ticket-title">
                    {grouping !== "status" && (
                      <span className="status-indicator">
                        {getStatusIcon(ticket.status)}
                      </span>
                    )}
                    {ticket.title}
                  </h3>
                  <div className="ticket-footer">
                    {grouping !== "priority" && (
                      <div className="tag priority-tag">
                        <span className="priority-icon">
                          {getPriorityIcon(ticket.priority)}
                        </span>
                      </div>
                    )}
                    <div className="tag">
                      <div className="tag-dot"></div>
                      <span className="tag-text">Feature Request</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
