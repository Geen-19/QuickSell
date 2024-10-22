import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BoardContext } from "../context/BoardContext";
import "../styes/DashBoard.css";
import Add from "../assets/add.svg";
import Dots from "../assets/dots.svg";
import High from "../assets/High.svg";
import BackLog from "../assets/Backlog.svg";
import TODO from "../assets/To-do.svg";
import Progress from "../assets/in-progress.svg";
import Done from "../assets/Done.svg";
import Cancelled from "../assets/Cancelled.svg";
import Urgent from "../assets/Urgent.svg";
import Medium from "../assets/Medium.svg";
import Low from "../assets/Low.svg";
import NO from "../assets/No-priority.svg";
import profile from "../assets/profile1.png";
import profile1 from "../assets/profile1.png";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";
import profile6 from "../assets/profile6.png";
import profile7 from "../assets/profile7.png";
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
        return <img src={Urgent} alt="Urgent priority" />; // Urgent
      case 3:
        return <img src={High} alt="high priority" />; // High
      case 2:
        return <img src={Medium} alt="high priority" />; // Medium
      case 1:
        return <img src={Low} alt="high priority" />; // Low
      case 0:
      default:
        return <img src={NO} alt="high priority" />; // No priority
    }
  };

  const getStatusIcon = (status) => {
    console.log(status);
    if (status === undefined) return;
    switch (status.toLowerCase()) {
      case "backlog":
        return <img src={BackLog} alt="high priority" />;
      case "todo":
        return <img src={TODO} alt="high priority" />;
      case "in progress":
        return <img src={Progress} alt="high priority" />;
      case "done":
        return <img src={Done} alt="high priority" />;
      case "cancelled":
        return <img src={Cancelled} alt="high priority" />;
      default:
        return "";
    }
  };
  return (
    <div className="dashboard">
      <div className="board">
        {groupTickets().map((group) => (
          <div key={group.group} className="column">
            <div className="column-header">
              <div className="header-left">
                <div className="header-icon ">
                  {grouping === "user" && (
                    <div className="user-avatar-container user-avatar">
                      <img
                        src={
                          group.tickets[0]?.userId === "usr-1"
                            ? profile1
                            : group.tickets[0]?.userId === "usr-2"
                            ? profile6
                            : group.tickets[0]?.userId === "usr-3"
                            ? profile7
                            : group.tickets[0]?.userId === "usr-4"
                            ? profile5
                            : group.tickets[0]?.userId === "usr-5"
                            ? profile4
                            : profile1
                        }
                        alt="user"
                      />
                      <div
                        className={`availability-indicator ${
                          users.find(
                            (user) => user.id === group.tickets[0]?.userId
                          )?.available
                            ? "available"
                            : "unavailable"
                        }`}
                      ></div>
                    </div>
                  )}

                  {grouping === "priority" &&
                    getPriorityIcon(group.tickets[0]?.priority)}
                  {grouping === "status" &&
                    getStatusIcon(group.tickets[0]?.status)}
                </div>
                <h1 className="group-name">{group.group}</h1>
                <span className="ticket-count">{group.tickets.length}</span>
              </div>
              <div className="header-actions">
                <button className="icon-button">
                  <img src={Add} alt="Add" />
                </button>
                <button className="icon-button">
                  <img src={Dots} alt="Options" />
                </button>
              </div>
            </div>
            <div className="tickets-container">
              {sortTickets(group.tickets).map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <span className="ticket-id">{ticket.id}</span>
                    {grouping !== "user" && (
                      <div className="user-avatar-container">
                        <div
                          className={"user-avatar"}
                          title={
                            users.find((u) => u.id === ticket.userId)?.name ||
                            "User"
                          }
                        >
                          <img
                            src={
                              ticket.userId === "usr-1"
                                ? profile1
                                : ticket.userId === "usr-2"
                                ? profile6
                                : ticket.userId === "usr-3"
                                ? profile7
                                : ticket.userId === "usr-4"
                                ? profile5
                                : ticket.userId === "usr-5"
                                ? profile4
                                : profile5
                            }
                            alt="user"
                          />
                          <div
                            className={`availability-indicator ${
                              users.find((user) => user.id === ticket.userId)
                                ?.available
                                ? "available"
                                : "unavailable"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="ticket-title">
                    {grouping !== "status" && (
                      <p>{getStatusIcon(ticket.status)}</p>
                    )}
                    <h3>{ticket.title}</h3>
                  </div>
                  <div className="ticket-footer">
                    <div className="ticket-footer-sub">
                      {grouping !== "priority" && (
                        <div className="tag priority-tag">
                          {getPriorityIcon(ticket.priority)}
                        </div>
                      )}

                      <div className="tag">
                        <div className="tag-dot"></div>
                        <span className="tag-text">{ticket.tag[0]}</span>
                      </div>
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
