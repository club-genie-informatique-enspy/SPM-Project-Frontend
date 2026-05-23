import React from "react";
import Sidebar from "./Sidebar";
import { WorkspaceProvider } from "@/components/WorkspaceProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <WorkspaceProvider>
      <div className="flex h-screen bg-[#f9fafb] dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </WorkspaceProvider>
  );
};

export default DashboardLayout;
