"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { activeWorkspace, workspaces } from "@/lib/mock-data";
import { Workspace } from "@/types";

interface WorkspaceContextValue {
  selectedWorkspace: Workspace;
  selectedWorkspaceId: string;
  setSelectedWorkspaceId: (workspaceId: string) => void;
  workspaces: Workspace[];
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(activeWorkspace.id);

  const value = useMemo<WorkspaceContextValue>(() => {
    const selectedWorkspace = workspaces.find((workspace) => workspace.id === selectedWorkspaceId) ?? activeWorkspace;

    return {
      selectedWorkspace,
      selectedWorkspaceId,
      setSelectedWorkspaceId,
      workspaces,
    };
  }, [selectedWorkspaceId]);

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}
