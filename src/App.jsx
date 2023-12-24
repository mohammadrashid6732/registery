import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PersonalData from "./pages/PersonalData";
import HomePage from "./pages/HomePage";
import AuthRequired from "./components/AuthRequired";
import NotFound from "./pages/NotFound";
import IsCompleted from "./components/IsCompleted";
import ProfilePage from "./pages/ProfilePage";
import Contact from "./components/Contact";
import AboutUS from "./components/AboutUS";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequired>
            <IsCompleted>
              <HomePage />
            </IsCompleted>
          </AuthRequired>
        }
      />
      <Route
        path="/personaldata"
        element={
          <AuthRequired>
            <PersonalData />
          </AuthRequired>
        }
      />
      <Route path="/profilepage" element={<AuthRequired><ProfilePage /></AuthRequired>} />
      <Route path="/auth">
        <Route index element={<StartPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/aboutus" element={<AboutUS />} />
    </Routes>
  );
}

export default App;
