import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PitchesPage from "./pages/PitchesPage";
import MyBookingPage from "./pages/MyBookingPage";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/general/ErrorPage";
import NotFoundPage from "./pages/general/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import PitchDetailsPage from "./pages/PitchDetailsPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthLayout from "./layout/AuthLayout";
import ProtectedLayout from "./layout/ProtectedLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="pitches" element={<PitchesPage />} />
        <Route path="pitches/:pitchId" element={<PitchDetailsPage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="bookings" element={<MyBookingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
