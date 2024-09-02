/* eslint-disable no-nested-ternary */
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobCategories } from '../../pages/Home/store/jobCategoriesSlice';
import Button from '../Button/Button';
import FooterItems from './components/FooterItems/FooterItems';
import './Footer.css';

function Footer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobCategories());
  }, []);
  return (

    <footer>
      <div className="pt-16 pb-10 bg-black-10">
        <div className="w-9/12 mx-auto">
          <div className="grid-items">
            {/* first list of items */}
            <div >
              <h6 className="footer-title">Get in touch</h6>
              <p className="footer-items">Are you interested in jobs, need to get latest updates and information?</p>
              <form className="flex items-center mt-5"><input className="footer-input" type="email" name="email" placeholder="Enter email" />
                <Button onClick={() => alert('oh waww')} customClassName="text-white-standard text-sm font-medium px-3 py-3.5 rounded-r-lg  duration-300  hover:bg-red-900 focus:outline-none bg-red-10">
                  <FontAwesomeIcon className="mr-2" icon={faPaperPlane} />
                </Button></form>
            </div>
            {/* second list of items */}
            <FooterItems />
            {/* third list of items */}
            <FooterItems />
            {/* fourth list of items */}
            <FooterItems />
            {/* fifth list of items */}
            <FooterItems />

          </div>
          <div className="footer-bottom">
            <p className="bottom-title">© 2023 SQli . All rights reserved | Designed by Chrigui Nader</p>
          </div>
        </div>

      </div>
    </footer >
  );
}

export default Footer;
