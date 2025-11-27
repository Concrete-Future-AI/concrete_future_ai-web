import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { KnowledgeHub } from "./components/KnowledgeHub";
import { AIAssistant } from "./components/AIAssistant";
import { Analytics } from "./components/Analytics";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");
  const [initialQuestion, setInitialQuestion] = useState<string>();

  const handleLogin = (role: "admin" | "user") => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSearchClick = () => {
    setInitialQuestion(undefined);
    setIsAIAssistantOpen(true);
  };

  const handleAskQuestion = (question: string) => {
    setInitialQuestion(question);
    setIsAIAssistantOpen(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearchClick={handleSearchClick}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={userRole}
      />
      
      {currentPage === "dashboard" && <Dashboard onAskQuestion={handleAskQuestion} />}
      {currentPage === "knowledge" && <KnowledgeHub />}
      {currentPage === "analytics" && <Analytics />}
      {currentPage === "admin" && <AdminPanel />}

      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => {
          setIsAIAssistantOpen(false);
          setInitialQuestion(undefined);
        }}
        initialQuestion={initialQuestion}
      />
    </div>
  );
}
