import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BoardContext } from "../context/BoardContext";
import useTicketGroups from "../hooks/useTicketGroups";
import UserAvatar from "../components/userAvatar";
import Card from "./Card";
import Add from "../assets/add.svg";
import Dots from "../assets/dots.svg";
import { getStatusIcon, getPriorityIcon } from "../utils/iconMapper";
import "../styes/DashBoard.css";
const DashBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const { grouping, sortOption } = useContext(BoardContext);
  const { getGroupedTickets, sortTickets } = useTicketGroups(
    tickets,
    users,
    grouping,
    sortOption
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="board">
        {getGroupedTickets().map((group) => (
          <div key={group.group} className="column">
            <div className="column-header">
              <div className="header-left">
                <div className="header-icon">
                  {grouping === "user" && (
                    <UserAvatar
                      userId={group.tickets[0]?.userId}
                      available={
                        users.find(
                          (user) => user.id === group.tickets[0]?.userId
                        )?.available
                      }
                    />
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
                <Card
                  key={ticket.id}
                  ticket={ticket}
                  grouping={grouping}
                  users={users}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
