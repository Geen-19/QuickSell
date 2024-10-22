import { STATUSES } from "../Constants/Constants";
import { PRIORITIES } from "../Constants/Constants";
import { PRIORITY_LABELS } from "../Constants/Constants";
const useTicketGroups = (tickets, users, grouping, sortOption) => {
  const groupByStatus = () =>
    Object.values(STATUSES).map((status) => ({
      group: status,
      tickets: tickets.filter((ticket) => ticket.status === status),
    }));

  const groupByUser = () =>
    users.map((user) => ({
      group: user.name,
      tickets: tickets.filter((ticket) => ticket.userId === user.id),
    }));

  const groupByPriority = () =>
    Object.entries(PRIORITY_LABELS).map(([priority, label]) => ({
      group: label,
      tickets: tickets.filter((ticket) => ticket.priority === Number(priority)),
    }));

  const sortTickets = (ticketArray) => {
    const sortFunctions = {
      priority: (a, b) => b.priority - a.priority,
      title: (a, b) => a.title.localeCompare(b.title),
    };
    return sortFunctions[sortOption]
      ? [...ticketArray].sort(sortFunctions[sortOption])
      : ticketArray;
  };

  const getGroupedTickets = () => {
    const groupingFunctions = {
      status: groupByStatus,
      user: groupByUser,
      priority: groupByPriority,
    };
    return groupingFunctions[grouping]?.() || [];
  };

  return { getGroupedTickets, sortTickets };
};

export default useTicketGroups;
