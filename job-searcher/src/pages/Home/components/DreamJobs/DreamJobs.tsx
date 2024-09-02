import Button from '../../../../components/Button/Button';
import './DreamJobs.css';

function DreamJobs() {
  return (
    <section className="block">
      <div className="dreamjobs-container bg-dreamJobBanner">
        <div className=" w-3/4 mx-auto x flex">
          <div className="py-28 max-w-lg justify-start">
            <h4 className="text-4xl font-light text-white-standard ">
              Your Dream Jobs Are Waiting
            </h4>
            <p className="subtitle-dreamjob">
              Over 2.5 million interactions, 30,000 success stories Make yours now.
            </p>
            <Button customClassName="apply-job-button" onClick={() => alert('clicked')} >Apply Job</Button>
            <Button customClassName="search-job-button" onClick={() => alert('clicked')} >Search Jobs </Button>
          </div>
        </div>
      </div>
    </section>);
}
export default DreamJobs;
