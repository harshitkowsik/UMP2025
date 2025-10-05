import UserDashboard from './UserDashboard';
import BusinessDashboard from './BusinessDashboard';
import InvestorDashboard from './InvestorDashboard';
import BankerDashboard from './BankerDashboard';
import AdvisorDashboard from './AdvisorDashboard';

const Dashboard = ({ user }) => {
  if (!user) return <p>Please login to view dashboard</p>;

  switch (user.role) {
    case 'user':
      return <UserDashboard user={user} />;
    case 'business':
      return <BusinessDashboard user={user} />;
    case 'investor':
      return <InvestorDashboard user={user} />;
    case 'banker':
      return <BankerDashboard user={user} />;
    case 'advisor':
      return <AdvisorDashboard user={user}/>;
    default:
      return <p>Role {user.role} not recognized.</p>;
  }
};

export default Dashboard;
