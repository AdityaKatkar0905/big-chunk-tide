import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Trash2 } from "lucide-react";
import { formatBytes, formatDate } from "@/lib/mockData";
import { useFiles } from "@/contexts/FileContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function Files() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { files, deleteFile } = useFiles();

  const filteredFiles = files.filter(
    (file) =>
      file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (filename: string) => {
    // Create mock file content
    const content = `Filename: ${filename}\nDownloaded: ${new Date().toISOString()}\n\nThis is a sample file from the distributed storage system.`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download complete",
      description: `${filename} has been downloaded`,
    });
  };

  const handleDelete = (id: string, filename: string) => {
    deleteFile(id);
    toast({
      title: "File deleted",
      description: `${filename} has been removed from the system`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manage Files</h2>
        <p className="text-muted-foreground">
          View and manage all files in the distributed storage system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Search</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by filename or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Storage Node</TableHead>
                <TableHead>Chunks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.filename}</TableCell>
                  <TableCell>{formatBytes(file.size)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{file.user}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(file.uploadDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{file.storageNode}</Badge>
                  </TableCell>
                  <TableCell>{file.chunks}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(file.filename)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(file.id, file.filename)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
