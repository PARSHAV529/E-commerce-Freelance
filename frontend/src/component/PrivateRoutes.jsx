import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, requiredUserType, isHomePage }) {
  const account = useSelector((state) => state.user.user); // Get user data from Redux store
  const location = useLocation(); // Get the current location (for redirect after login)

  if (!account && !isHomePage) {
    // Restrict access to non-home pages if the user is not logged in
    // Optionally, you could store the attempted page URL in localStorage and redirect the user back after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!account && isHomePage) {
    // Allow access to the home page even if the user is not logged in
    return children;
  }

  const userType = account?.userType; // Extract userType from account

  if (requiredUserType && userType !== requiredUserType) {
    // Restrict access based on userType
    // Redirect to a relevant page based on the user's type
    return <Navigate to={userType === 'admin' ? '/admin-order' : '/'} replace />;
  }

  // Render children if userType matches or no specific role is required
  return children;
}

export default PrivateRoute;
