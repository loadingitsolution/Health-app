import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import { ForgotPassword } from "../pages/ForgotPassword";
import { HealthCalendar } from "../pages/HealthCalendar";
import { HealthChat } from "../pages/HealthChat";
import { Login } from "../pages/Login";
import { OtpVerification } from "../pages/OTPVerification";
import { PersonalInformation } from "../pages/PersonalInformation";
import { Register } from "../pages/Register";
import { ResetPassword } from "../pages/ResetPassword";
import { VerificationCodeSent } from "../pages/VerificationCodeSent";
import { theme } from "../theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    ),
  },
  {
    path: "/otp-verification",
    element: (
      <AuthLayout>
        <OtpVerification />
      </AuthLayout>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthLayout>
        <ResetPassword />
      </AuthLayout>
    ),
  },
  {
    path: "/verification-code-sent",
    element: (
      <AuthLayout>
        <VerificationCodeSent />
      </AuthLayout>
    ),
  },
  {
    path: "/health-chat",
    element: <HealthChat />,
  },
  {
    path: "/health-calendar",
    element: <HealthCalendar />,
  },
  {
    path: "/personal-information",
    element: <PersonalInformation />,
  },
]);

const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default AppRouter;
