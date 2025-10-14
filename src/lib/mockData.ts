import { FileMetadata, StorageNode } from "@/types/file";

export const mockFiles: FileMetadata[] = [
  {
    id: "1",
    filename: "sales_data_2024.csv",
    size: 524288000, // 500MB
    user: "aditya",
    uploadDate: new Date("2024-01-15"),
    storageNode: "node-1",
    replicationNodes: ["node-2", "node-3"],
    mimeType: "text/csv",
    chunks: 50,
  },
  {
    id: "2",
    filename: "customer_analytics.parquet",
    size: 1073741824, // 1GB
    user: "aditya",
    uploadDate: new Date("2024-01-20"),
    storageNode: "node-2",
    replicationNodes: ["node-1", "node-4"],
    mimeType: "application/octet-stream",
    chunks: 100,
  },
  {
    id: "3",
    filename: "logs_archive.tar.gz",
    size: 2147483648, // 2GB
    user: "kanish",
    uploadDate: new Date("2024-01-25"),
    storageNode: "node-3",
    replicationNodes: ["node-2", "node-5"],
    mimeType: "application/gzip",
    chunks: 200,
  },
  {
    id: "4",
    filename: "ml_model_weights.h5",
    size: 786432000, // 750MB
    user: "aditya",
    uploadDate: new Date("2024-02-01"),
    storageNode: "node-4",
    replicationNodes: ["node-1", "node-3"],
    mimeType: "application/octet-stream",
    chunks: 75,
  },
  {
    id: "5",
    filename: "video_dataset.zip",
    size: 3221225472, // 3GB
    user: "ganesh",
    uploadDate: new Date("2024-02-05"),
    storageNode: "node-5",
    replicationNodes: ["node-2", "node-4"],
    mimeType: "application/zip",
    chunks: 300,
  },
];

export const mockStorageNodes: StorageNode[] = [
  {
    id: "node-1",
    name: "Storage Node 1",
    capacity: 10737418240, // 10GB
    used: 5242880000, // 5GB
    status: "online",
    location: "US-East",
  },
  {
    id: "node-2",
    name: "Storage Node 2",
    capacity: 10737418240,
    used: 7516192768, // 7GB
    status: "online",
    location: "US-West",
  },
  {
    id: "node-3",
    name: "Storage Node 3",
    capacity: 10737418240,
    used: 4294967296, // 4GB
    status: "online",
    location: "EU-Central",
  },
  {
    id: "node-4",
    name: "Storage Node 4",
    capacity: 10737418240,
    used: 6442450944, // 6GB
    status: "online",
    location: "Asia-Pacific",
  },
  {
    id: "node-5",
    name: "Storage Node 5",
    capacity: 10737418240,
    used: 8589934592, // 8GB
    status: "degraded",
    location: "EU-West",
  },
];

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
