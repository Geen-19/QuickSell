import React, { useEffect, useState } from "react";
import axios from "axios";

const DashBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("priority"); // default grouping by status
  const [sortOption, setSortOption] = useState('title');

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
    const statuses = ["Backlog", "Todo", "In progress", "Done"];
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
  return (
    <div>
      <div className="columns">
        {groupTickets().map((group) => (
          <div key={group.group} className="column">
            <h2>{group.group}</h2>
            <ul>
              {sortTickets(group.tickets).map((ticket) => (
                <li key={ticket.id} className="ticket">
                  <strong>{ticket.title}</strong>
                  <p>Priority: {ticket.priority}</p>
                  <p>Status: {ticket.status}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
