import React, { createContext, useContext, useState, useEffect } from "react";
import { FileMetadata } from "@/types/file";
import { mockFiles } from "@/lib/mockData";

interface FileContextType {
  files: FileMetadata[];
  addFile: (file: FileMetadata) => void;
  deleteFile: (id: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileMetadata[]>(() => {
    const stored = localStorage.getItem("uploaded-files");
    return stored ? JSON.parse(stored) : mockFiles;
  });

  useEffect(() => {
    localStorage.setItem("uploaded-files", JSON.stringify(files));
  }, [files]);

  const addFile = (file: FileMetadata) => {
    setFiles((prev) => [file, ...prev]);
  };

  const deleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FileContext.Provider value={{ files, addFile, deleteFile }}>
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
