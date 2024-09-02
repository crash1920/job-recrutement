import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../components/Loader/Loader';
import { fetchLatestNews } from '../../store/LatestNewsSlice';
import { INews } from '../../../../models/home.interfaces';
import './LatestNews.css';
import { RootState } from '../../../../store/store';

function LatestNews() {
  const dispatch = useDispatch();
  const { news, isLoading } = useSelector((state: RootState) => state.latestNews);

  useEffect(() => {
    dispatch(fetchLatestNews());
  }, []);

  return (
    <section className="py-16 bg-dirtyWhite">
      <h3 className="title-categories">Latest News</h3>
      <div className="w-9/12 mx-auto ">
        <div className="grid grid-cols-3 gap-8" >
          {isLoading ? (
            <Loader />
          ) : (
            news?.map((n: INews) => (

              <div className="latest-news-info" key={n._id}>
                <img className="block w-full rounded-t-lg" src={`${process.env.PUBLIC_URL}/assets/Blogs/${n.newsImage}`} />
                <div className="latest-news-description">
                  <h5 className="font-normal text-base leading-6 text-gray-dark">{n.date}</h5>
                  <h4 className="text-xl leading-8 block font-medium mt-5">{n.newsTitle}</h4>
                  <p className="font-normal text-base leading-6 text-gray-dark mt-4">{n.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
