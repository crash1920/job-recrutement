import DescriptionSection from './components/DescriptionSection/DescriptionSection';
import DreamJobs from './components/DreamJobs/DreamJobs';
import FeaturedJobs from './components/FeaturedJobs/FeaturedJobs';
import LatestNews from './components/LatestNews/LatestNews';
import TopHomeSection from './components/Top-home-section/Top-home-section';

function Home() {
  return (
    <div>
      <TopHomeSection />
      <DreamJobs />
      <FeaturedJobs />
      <DescriptionSection />
      <LatestNews />
    </div>
  );
}

export default Home;
