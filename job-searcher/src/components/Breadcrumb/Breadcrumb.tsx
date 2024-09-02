import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Breadcrumbs() {
  const { pathname } = useLocation();
  return (
    <section className="bg-gray-100 pt-24">
      <div className="pb-3">
        <ul className="flex w-3/4 mx-auto">
          <li>
            <a href="/" className="breadcrums-font">
              Home
            </a>
            <FontAwesomeIcon className="w-1/12" icon={faChevronRight} />
            <FontAwesomeIcon className="mr-2 w-1/12" icon={faChevronRight} />
          </li>
          <li>
            <a href="/" className="breadcrums-font">
              Pages
            </a>
            <FontAwesomeIcon className="w-1/12" icon={faChevronRight} />
            <FontAwesomeIcon className="mr-2 w-1/12" icon={faChevronRight} />
          </li>
          <li>
            <a href="#" className="breadcrums-font">
              {pathname.substring(1)}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default Breadcrumbs;
