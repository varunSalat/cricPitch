import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PitchesPage from "./pages/PitchesPage";
import MyBookingPage from "./components/pitchesPage/MyBookingPage";
import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/general/ErrorPage";
import NotFoundPage from "./pages/general/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import PitchDetailsPage from "./pages/PitchDetailsPage";
import SignUpPage from "./pages/auth/SignUpPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        {/*Protected Route  */}
        <Route index element={<HomePage />} />
        <Route path="pitches" element={<PitchesPage />} />
        <Route path="bookings" element={<MyBookingPage />} />
        <Route path="pitches/:pitchId" element={<PitchDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
