import { useLocation } from 'react-router';
import CandidateStepper from './components/CandidateStepper';

function ApplyJobForm() {
  const location = useLocation();
  const jobId = location.state ? location.state.jobId : null;
  const jobTitle = location.state ? location.state.jobTitle : null;
  console.log(jobId, jobTitle);

  return (
    <div>
      <CandidateStepper jobId={jobId} jobTitle={jobTitle} />
    </div>
  );
}

export default ApplyJobForm;
