import { combineReducers } from "redux";
// Reducers
import signInReducer from "../Slices/SignIn";
import signUpReducer from "../Slices/SignUp";
import emailVerificationReducer from "../Slices/EmailVerification";
import authenticatedUserDataReducer from '../Slices/AuthenticatedUserData';
import  getPubAndDraftAndBookmarkedStoriesReducer from "../Slices/GetPubAndDraftAndBookmarkedStories";
import createStoryReducer from '../Slices/CreateStory';
import getAuthenticatedUserStoryReducer from '../Slices/GetAuthenticatedUserStory';
import getHomeStoriesReducer from '../Slices/HomeStories';
import userActionsReducer from "../Slices/UserAction";
import getProfileReducer from '../Slices/GetProfile';
import getUserFriendsReducer from "../Slices/GetUserFriends";
import getRandomStoriesReducer from "../Slices/GetRandomStories";
import getUserFollowedPeopleReducer from "../Slices/GetUserFollowedPeople";
import selectedUserReducer from '../Slices/SelectedUser';
import searchStoriesReducer from "../Slices/SearchStories";
import searchPeopleReducer from "../Slices/SearchPeople";
import storyWithAuthorReducer from "../Slices/GetStoryWithAuthor/";
import getCommentsReducer from "../Slices/GetComments/";
import storyActionReducer from "../Slices/StoryActions";
import getNotificationsReducer from "../Slices/GetNotifications";
import forgotPasswordReducer from "../Slices/ForgotPassword";

export const reducers = combineReducers({
  signInStates: signInReducer,
  signUpStates: signUpReducer,
  profileStates: getProfileReducer,
  createStoryStates: createStoryReducer,
  storyActionsStates: storyActionReducer,
  storyCommentsStates: getCommentsReducer,
  selectedUserStates: selectedUserReducer,
  searchPeopleStates: searchPeopleReducer,
  homeStoriesStates: getHomeStoriesReducer,
  userFriendsStates: getUserFriendsReducer,
  searchStoriesStates: searchStoriesReducer,
  userActionsStates: userActionsReducer,
  storyWithAuthorStates: storyWithAuthorReducer,
  getRandomStoriesStates: getRandomStoriesReducer,
  emailVerificationStates: emailVerificationReducer,
  pubAndDraftAndBookmarkedStoriesStates: getPubAndDraftAndBookmarkedStoriesReducer, 
  userFollowedPeopleStates: getUserFollowedPeopleReducer,
  authenticatedUserDataStates: authenticatedUserDataReducer,
  notificationStates: getNotificationsReducer,
  authenticatedUserStoryStates: getAuthenticatedUserStoryReducer,
  forgotPasswordStates: forgotPasswordReducer
});
