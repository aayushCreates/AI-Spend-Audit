import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AuditWizard from "./pages/audit/AuditWizard";
import ResultPage from "./pages/result";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/audit" element={<AuditWizard />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
