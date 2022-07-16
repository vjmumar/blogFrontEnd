/* eslint-disable require-jsdoc */
import React from "react";
// Components
import { Heading, VStack } from "@chakra-ui/react";
// Pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import Notification from "./Pages/Notification";
import MyStories from "./Pages/MyStories";
import CreateStory from "./Pages/CreateStory";
import SearchPage from "./Pages/SearchPage";
import ProfilePage from "./Pages/ProfilePage";
import MessagePage from "./Pages/MessagePage";
import ReadStoryPage from "./Pages/ReadStoryPage";
import ForgotPassword from "./Pages/ForgotPassword";
import EmailVerification from "./Pages/EmailVerificationPage";
import ChangePassword from "./Pages/ChangePassword";
// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Routes
import {
	HOME_ROUTE,
	CREATE_STORY_ROUTE,
	SEARCH_ROUTE,
	MY_STORIES_ROUTE,
	SIGN_IN,
	PROFILE_ROUTE,
	MESSAGE_ROUTE,
	READ_STORY_ROUTE,
	SIGN_UP,
	EMAIL_VERIFICATION_ROUTE,
	NOTIFICATION_ROUTE,
	FORGOT_PASSWORD_ROUTE,
	CHANGE_PASSWORD_ROUTE,
} from "./Routes/index";
// Toastify
import ToastContainer from "./Components/ToastContainer/index";
// Io
import { io } from "socket.io-client";
// Context
import { ContextProvider } from "./context";
// Protected Route
import ProtectedRoute from "./ProtectedRoute";
// Socket
export const socket = io(process.env.REACT_APP_BACK_END_HOST);

function App() {
	return (
		<VStack
			w={"100%"}
			justifyContent={"center"}
			alignItems={"center"}
			minH={"100vh"}
			maxW={"1536px"}
			m={"0 auto !important"}
		>
			<Router>
				<ToastContainer />
				<ContextProvider>
					<Routes>
						{/* Public Routes */}
						<Route element={<SignIn />} path={SIGN_IN} />
						<Route element={<SignUp />} path={SIGN_UP} />
						<Route element={<HomePage />} path={HOME_ROUTE} />
						<Route element={<EmailVerification />} path={EMAIL_VERIFICATION_ROUTE} />
						<Route element={<SearchPage />} path={`${SEARCH_ROUTE}/:search`} />
						<Route element={<ProfilePage />} path={`${PROFILE_ROUTE}/:profileId`} />
						<Route element={<ReadStoryPage />} path={`${READ_STORY_ROUTE}/:id`} />
						<Route element={<ForgotPassword />} path={FORGOT_PASSWORD_ROUTE} />
						<Route element={<ChangePassword />} path={CHANGE_PASSWORD_ROUTE} />

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							<Route element={<MyStories />} path={MY_STORIES_ROUTE} />
							<Route element={<Notification />} path={`${NOTIFICATION_ROUTE}`} />
							<Route element={<CreateStory />} path={CREATE_STORY_ROUTE} />
							<Route element={<MessagePage />} path={`${MESSAGE_ROUTE}/:id`} />
						</Route>

						{/* 404 Route */}
						<Route
							element={<Heading textAlign={"center"}>404 Page Not Found</Heading>}
							path={`*` || "/404"}
						/>
					</Routes>
				</ContextProvider>
			</Router>
		</VStack>
	);
}

export default App;
