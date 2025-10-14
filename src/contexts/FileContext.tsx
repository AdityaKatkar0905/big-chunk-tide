import React, { createContext, useContext, useState, useEffect } from "react";
import { FileMetadata } from "@/types/file";
import { mockFiles } from "@/lib/mockData";

interface FileContextType {
  files: FileMetadata[];
  users: string[];
  addFile: (file: FileMetadata) => void;
  deleteFile: (id: string) => void;
  addUser: (user: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileMetadata[]>(() => {
    const stored = localStorage.getItem("uploaded-files");
    return stored ? JSON.parse(stored) : mockFiles;
  });

  const [users, setUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem("system-users");
    return stored ? JSON.parse(stored) : ["aditya", "kanish", "ganesh"];
  });

  useEffect(() => {
    localStorage.setItem("uploaded-files", JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem("system-users", JSON.stringify(users));
  }, [users]);

  const addFile = (file: FileMetadata) => {
    setFiles((prev) => [file, ...prev]);
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const addUser = (user: string) => {
    if (!users.includes(user.toLowerCase())) {
      setUsers((prev) => [...prev, user.toLowerCase()]);
    }
  };

  return (
    <FileContext.Provider value={{ files, users, addFile, deleteFile, addUser }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used within FileProvider");
  }
  return context;
}
