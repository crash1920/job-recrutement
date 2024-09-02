import { configureStore } from '@reduxjs/toolkit';
import jobCategoriesReducer from '../pages/Home/store/jobCategoriesSlice';
import countriesReducer from '../pages/Home/store/countriesSlice';
import featuredJobsReducer from '../pages/Home/store/featuredJobsSlice';
import latestNewsReducer from '../pages/Home/store/LatestNewsSlice';
import candidatesReducer from '../pages/Candidates/store/CandidatesSlice';
import CandidateDetailsSlice from '../pages/CandidateDetails/store/CandidateDetailsSlice';
import jobDetailsSlice from '../pages/JobDetails/store/jobDetailsSlice';
import SignupSlice from '../pages/SignUp/store/SignupSlice';
import authSlice from '../pages/Login/store/LoginSlice';
import applyJobSlice from '../pages/ApplyJobForm/store/ApplyJobSlice';
import searchSlice from '../pages/Home/components/Top-home-section/SearchBar/store/searchSlice';
import jobPostSlice from '../pages/JobPostForm/store/jobPostSlice';

export const store = configureStore({
  reducer: {
    jobCategories: jobCategoriesReducer,
    countries: countriesReducer,
    latestNews: latestNewsReducer,
    featuredJobs: featuredJobsReducer,
    candidates: candidatesReducer,
    candidateDetails: CandidateDetailsSlice,
    jobDetails: jobDetailsSlice,
    users: SignupSlice,
    auth: authSlice,
    applyJob: applyJobSlice,
    search: searchSlice,
    postJob: jobPostSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
