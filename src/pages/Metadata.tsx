import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes, formatDate } from "@/lib/mockData";
import { useFiles } from "@/contexts/FileContext";
import { Badge } from "@/components/ui/badge";
import { FileText, HardDrive, Copy, Calendar, User } from "lucide-react";

export default function Metadata() {
  const { files } = useFiles();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">File Metadata</h2>
        <p className="text-muted-foreground">
          Detailed metadata and replication information for all files
        </p>
      </div>

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {file.filename}
              </CardTitle>
              <CardDescription>File ID: {file.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Size:</span>
                    <span className="text-sm text-muted-foreground">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Uploaded by:</span>
                    <Badge variant="secondary">{file.user}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Upload Date:</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(file.uploadDate)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Primary Node:</span>
                    </div>
                    <Badge variant="outline">{file.storageNode}</Badge>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Copy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Replication Nodes:</span>
                    </div>
                    <div className="flex gap-2">
                      {file.replicationNodes.map((node) => (
                        <Badge key={node} variant="secondary">
                          {node}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Chunks:</span>
                    <span className="text-sm text-muted-foreground">
                      {file.chunks} chunks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">MIME Type:</span>
                    <span className="text-sm text-muted-foreground font-mono">
                      {file.mimeType}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
