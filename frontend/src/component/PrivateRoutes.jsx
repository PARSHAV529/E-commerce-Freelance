import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, requiredUserType }) {
  const account = useSelector((state) => state.user.user); // Get user data from Redux store

  if (!account) {
    // Redirect to home with alert if user is not logged in
    alert("Please log in first to access this page");
    return <Navigate to="/" replace />;
  }

  const userType = account.userType; // Extract userType from account

  if (requiredUserType && userType !== requiredUserType) {
    // Restrict admin from accessing user routes and vice versa
    alert(`Access denied: This page is restricted to ${requiredUserType}s.`);
    return <Navigate to={userType === 'admin' ? '/admin-order' : '/'} replace />;
  }

  // Render children if userType matches or no specific role is required
  return children;
}

export default PrivateRoute;
