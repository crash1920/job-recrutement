import Login from '../Login/Login';
import CandidatesList from './components/CandidatesList';

function Candidates() {
  const token = localStorage.getItem('token');
  const userIsConnected = !!token;
  const loggedInUser = token ? JSON.parse(token).user : null;
  const loggedInUserRole = loggedInUser ? loggedInUser.role : null;

  return (
    <div>
      {userIsConnected && loggedInUserRole === 'RH' ? (
        <CandidatesList />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Candidates;
