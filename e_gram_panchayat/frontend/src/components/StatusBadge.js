const StatusBadge = ({ status }) => {
    let className = "status-badge";
    if (status === "Approved") className += " status-approved";
    else if (status === "Rejected") className += " status-rejected";
    else className += " status-pending";
    return <span className={className}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };
  
  export default StatusBadge;
  