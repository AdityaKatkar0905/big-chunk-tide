export interface FileMetadata {
  id: string;
  filename: string;
  size: number;
  user: string;
  uploadDate: Date;
  storageNode: string;
  replicationNodes: string[];
  mimeType: string;
  chunks: number;
}

export interface StorageNode {
  id: string;
  name: string;
  capacity: number;
  used: number;
  status: "online" | "offline" | "degraded";
  location: string;
}

export interface UploadProgress {
  filename: string;
  progress: number;
  status: "uploading" | "completed" | "failed";
}
