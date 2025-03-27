import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");

	console.log(token);

	return token ? <div>{children}</div> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
