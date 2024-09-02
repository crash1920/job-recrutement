import './styles/reset.css';
import './styles/elements.css';
import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import FeaturedJobs from './pages/FeaturedJobs/FeaturedJobs';
import Candidates from './pages/Candidates/Candidates';
import CandidateDetails from './pages/CandidateDetails/CandidateDetails';
import JobDetails from './pages/JobDetails/JobDetails';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import ApplyJobForm from './pages/ApplyJobForm/ApplyJobForm';
import SearchResultPage from './pages/SearchResults/SearchResultPage';
import TokenExpirationManager from './components/TokenExpirationManager/TokenExpirationManager ';
import JobPostForm from './pages/JobPostForm/JobPostForm';
import SuccessPage from './pages/SuccessPage/SuccessPage';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/featuredJobs', element: <FeaturedJobs /> },
    { path: '/featuredJobs/:id', element: <JobDetails /> },
    { path: '/Candidates', element: <Candidates /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/Candidates/:id', element: <CandidateDetails /> },
    { path: '/Login', element: <Login /> },
    { path: '/ApplyJobForm', element: <ApplyJobForm /> },
    { path: '/SearchResult', element: <SearchResultPage /> },
    { path: '/JobPost', element: <JobPostForm /> },
    { path: '/Success', element: <SuccessPage /> },

  ]);
  return routes;
};

function App() {
  return (
    <Router>
      <Navbar />
      <TokenExpirationManager />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
