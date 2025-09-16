import React, { createContext, useContext, useState, useEffect, Children } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";

const MAINTAINANCE_MODE_ENABLED = false;
const ENFORCE_ROUTE_PROTECTION = false;

const isTokenValid = () => {
    let token = sessionStorage.getItem('token')
    if (!token) {
        token = localStorage.getItem('token')
    }

    return !!token;
}

const clearSessionData = () => {
    // Clear both sessionStorage and localStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
};

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null)
    const [isAuthenticate, setIsAuthenticate] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const initializeAuth = () => {
            if (isTokenValid()) {
                let storedRole = sessionStorage.getItem('role') || localStorage.getItem('role')
                let storedUser = sessionStorage.getItem('user') || localStorage.getItem('user')
                let storedToken = sessionStorage.getItem('token') || localStorage.getItem('token')
                if (storedUser) {
                    try {

                        setRole(storedRole)
                        setUser(storedUser)
                        setIsAuthenticate(true)
                        if (!sessionStorage.getItem('token') && storedToken) {
                            sessionStorage.setItem('token', storedToken)
                            sessionStorage.setItem('role', storedRole)
                            sessionStorage.setItem('user', storedUser)
                        }
                    } catch (error) {
                        clearSessionData()
                    }
                }
            }
            else {
                clearSessionData()
            }
            setIsLoading(false)
        }
        initializeAuth()
    }, [])

    const login = (userData, userRole, token) => {
        // Always store in sessionStorage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setRole(userRole);
        setIsAuthenticate(true);
    };

    const logout = () => {
        clearSessionData();
        setUser(null);
        setRole(null);
        setIsAuthenticate(false);
    };

    const value = {
        user,
        role,
        isAuthenticate,
        isLoading,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found</p>
      <button
        onClick={() =>
          (window.location.href = ENFORCE_ROUTE_PROTECTION
            && "/")
        }
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  </div>
);

const Unauthorized = () => {
  const { role, logout } = useAuth();

  useEffect(() => {
    // Get the role before clearing session data
    const currentRole =
      role || sessionStorage.getItem("role") || localStorage.getItem("role");

    // Clear all session data
    logout();

    // Redirect based on role after a short delay to ensure cleanup is complete
    const redirectTimer = setTimeout(() => {
      if (currentRole === "superadmin") {
        window.location.href = "/";
      } else {
        // Default to superadmin login for superadmin role or unknown role
        window.location.href = "/";
      }
    }, 100);

    // Cleanup timer on component unmount
    return () => clearTimeout(redirectTimer);
  }, [role, logout]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
        <p className="text-lg text-gray-600 mt-4">
          You don't have permission to access this page
        </p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="text-lg text-gray-600 mt-4">Loading...</p>
    </div>
  </div>
);

// *** PROTECTION COMPONENTS ***
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticate, role, isLoading } = useAuth();

  // Show loading screen while auth is initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!ENFORCE_ROUTE_PROTECTION) {
    return children; // If protection is disabled, allow access
  }

  if (!isAuthenticate) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function Approuters() {

    return (
        <div>Approuters</div>
    )
}

export default Approuters