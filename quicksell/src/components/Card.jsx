import { getStatusIcon, getPriorityIcon } from "../utils/iconMapper.jsx";
import UserAvatar from "./userAvatar";
import '../styes/Dashboard.css'
const Card = ({ ticket, grouping, users }) => {
  const user = users.find(u => u.id === ticket.userId);

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== "user" && (
          <UserAvatar 
            userId={ticket.userId} 
            available={user?.available}
          />
        )}
      </div>
      <div className="ticket-title">
        {grouping !== "status" && getStatusIcon(ticket.status)}
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
            <div className="tag-dot" />
            <span className="tag-text">{ticket.tag[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;