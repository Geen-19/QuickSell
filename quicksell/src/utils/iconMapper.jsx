import Urgent from '../assets/Urgent.svg';
import High from '../assets/High.svg';
import Medium from '../assets/Medium.svg';
import Low from '../assets/Low.svg';
import BackLog from '../assets/Backlog.svg';
import TODO from '../assets/To-do.svg';
import Progress from '../assets/in-progress.svg';
import Done from '../assets/Done.svg';
import Cancelled from '../assets/Cancelled.svg';
import NO from '../assets/No-priority.svg';  

import { PRIORITIES, STATUSES } from "../Constants/Constants";

export const getPriorityIcon = (priority) => {
  const iconMap = {
    [PRIORITIES.URGENT]: Urgent,
    [PRIORITIES.HIGH]: High,
    [PRIORITIES.MEDIUM]: Medium,
    [PRIORITIES.LOW]: Low,
    [PRIORITIES.NO_PRIORITY]: NO,
  };

  return iconMap[priority] ? (
    <img
      src={iconMap[priority]}
      alt={`${priority} priority`}  // Ensure this is a valid label
    />
  ) : null;
};

export const getStatusIcon = (status) => {
  if (!status) return null;

  const iconMap = {
    backlog: BackLog,
    todo: TODO,
    'in progress': Progress,
    done: Done,
    cancelled: Cancelled,
  };

  return iconMap[status.toLowerCase()] ? (
    <img src={iconMap[status.toLowerCase()]} alt={`${status} status`} />
  ) : null;
};

