import JobPostStepper from './components/JobPostStepper';

function JobPostForm() {
  const token = localStorage.getItem('token');
  const loggedInUser = token ? JSON.parse(token).user : null;
  const loggedInUserRole = loggedInUser ? loggedInUser.role : null;
  return (
    <div>
      {loggedInUserRole === 'RH' ? <JobPostStepper />
        : <div>Get out you dont have the right to access this </div>}
    </div>
  );
}

export default JobPostForm;
