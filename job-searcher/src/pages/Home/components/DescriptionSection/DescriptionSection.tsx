import Button from '../../../../components/Button/Button';
import './DescriptionSection.css';

function DescriptionSection() {
  return (
    <section className="py-16">
      <div className="m-auto w-3/4 ">
        <div className="flex flex-row content-between gap-14">
          <div className="left-content">
            <h3 className="text-4xl font-light text-left   ">Looking for resources? Want to apply for a job ?</h3>
            <p className="mt-6 leading-6 text-left">Phasellus aliquam sit
              amet justo eget sollicitudin.
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Suspendisse efficitur orci urna.
              In et augue ornare, tempor massa in,
              luctus sapien. Proin a diam et dui fermentum molestie
              vel id neque. Donec sed tempus enim, a
              congue risus. Pellentesque euismod massa a quam viverra interdum.
              Vivamus vitae euismod magna.</p>
            <div className=" mt-9 flex content-start" >
              <Button customClassName="apply-job-button" onClick={() => alert('clicked')} >Apply Job</Button>
            </div>
          </div>
          <div className="right-content">
            <img src={`${process.env.PUBLIC_URL}/assets/description.jpg`} className=" max-w-full rounded" />
          </div>
        </div>
      </div>
    </section>);
}
export default DescriptionSection;
