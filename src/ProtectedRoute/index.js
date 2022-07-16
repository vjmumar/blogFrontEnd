import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Components
import { Outlet } from 'react-router-dom';
import SignIn from '../Pages/SignIn';

const ProtectedRoute = () => {
  const isSignIn = useSelector(state => state.signInStates.isSignIn);

  return isSignIn ? <Outlet /> : <SignIn />
}

export default ProtectedRoute