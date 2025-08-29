import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

import { EntrepreneurDashboard } from "./pages/dashboard/EntrepreneurDashboard";
import { InvestorDashboard } from "./pages/dashboard/InvestorDashboard";

import { EntrepreneurProfile } from "./pages/profile/EntrepreneurProfile";
import { InvestorProfile } from "./pages/profile/InvestorProfile";

import { InvestorsPage } from "./pages/investors/InvestorsPage";
import { EntrepreneursPage } from "./pages/entrepreneurs/EntrepreneursPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { NotificationsPage } from "./pages/notifications/NotificationsPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { HelpPage } from "./pages/help/HelpPage";
import { DealsPage } from "./pages/deals/DealsPage";

import { ChatPage } from "./pages/chat/ChatPage";

import NexusCalendar from "./components/NexusCalendar";
import VideoCall from "./components/VideoCall";
import DocumentChamber from "./components/DocumentChamber";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Global Navbar */}
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/welcome" className="hover:underline">Welcome</Link>
          <Link to="/calendar" className="hover:underline">Calendar</Link>
          <Link to="/video-call" className="hover:underline">Video Call</Link>
          <Link to="/document-chamber" className="hover:underline">Document Chamber</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>

        <Routes>
          {/* 🔐 Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 📊 Dashboards */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
            <Route path="investor" element={<InvestorDashboard />} />
          </Route>

          {/* 👤 Profiles */}
          <Route path="/profile" element={<DashboardLayout />}>
            <Route path="entrepreneur/:id" element={<EntrepreneurProfile />} />
            <Route path="investor/:id" element={<InvestorProfile />} />
          </Route>

          {/* 📂 Core pages */}
          <Route path="/investors" element={<DashboardLayout />}>
            <Route index element={<InvestorsPage />} />
          </Route>

          <Route path="/entrepreneurs" element={<DashboardLayout />}>
            <Route index element={<EntrepreneursPage />} />
          </Route>

          <Route path="/messages" element={<DashboardLayout />}>
            <Route index element={<MessagesPage />} />
          </Route>

          <Route path="/notifications" element={<DashboardLayout />}>
            <Route index element={<NotificationsPage />} />
          </Route>

          <Route path="/documents" element={<DashboardLayout />}>
            <Route index element={<DocumentsPage />} />
          </Route>

          <Route path="/settings" element={<DashboardLayout />}>
            <Route index element={<SettingsPage />} />
          </Route>

          <Route path="/help" element={<DashboardLayout />}>
            <Route index element={<HelpPage />} />
          </Route>

          <Route path="/deals" element={<DashboardLayout />}>
            <Route index element={<DealsPage />} />
          </Route>

          <Route path="/chat" element={<DashboardLayout />}>
            <Route index element={<ChatPage />} />
            <Route path=":userId" element={<ChatPage />} />
          </Route>

          {/* 📅 Calendar */}
          <Route
            path="/calendar"
            element={
              <div className="p-6">
                <h1 className="text-primary font-bold text-3xl mb-6">📅 Meeting Calendar</h1>
                <NexusCalendar />
              </div>
            }
          />

          {/* 🎥 Video Call */}
          <Route
            path="/video-call"
            element={
              <div className="p-6">
                <h1 className="text-primary font-bold text-3xl mb-6">🎥 Video Call</h1>
                <VideoCall />
              </div>
            }
          />

          {/* 📑 Document Chamber */}
          <Route
            path="/document-chamber"
            element={
              <div className="p-6">
                <h1 className="text-primary font-bold text-3xl mb-6">📂 Document Chamber</h1>
                <DocumentChamber />
              </div>
            }
          />

          {/* 👋 Welcome Page */}
          <Route
            path="/welcome"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-blue-600">Welcome to Nexus 🚀</h1>
                <p className="text-lg text-gray-700 mt-4">Investor & Entrepreneur Collaboration Platform</p>
              </div>
            }
          />

          {/* 🏠 Home Page */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <h1 className="text-5xl font-bold text-indigo-600 mb-6">Nexus Platform</h1>
                <p className="text-lg text-gray-700 mb-8">Choose where you want to go 🚀</p>
                <div className="flex gap-6">
                  <Link to="/welcome" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Go to Welcome</Link>
                  <Link to="/calendar" className="px-6 py-3 bg-green-600 text-white rounded-lg">Go to Calendar</Link>
                  <Link to="/video-call" className="px-6 py-3 bg-red-600 text-white rounded-lg">Go to Video Call</Link>
                  <Link to="/document-chamber" className="px-6 py-3 bg-yellow-600 text-white rounded-lg">Go to Document Chamber</Link>
                  <Link to="/dashboard" className="px-6 py-3 bg-purple-600 text-white rounded-lg">Go to Dashboard</Link>
                </div>
              </div>
            }
          />

          {/* 🚨 Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
