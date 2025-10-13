import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload as UploadIcon, File } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { UploadProgress } from "@/types/file";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const newUpload: UploadProgress = {
      filename: selectedFile.name,
      progress: 0,
      status: "uploading",
    };

    setUploads((prev) => [...prev, newUpload]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploads((prev) =>
          prev.map((u) =>
            u.filename === selectedFile.name
              ? { ...u, progress: 100, status: "completed" }
              : u
          )
        );
        toast({
          title: "Upload complete",
          description: `${selectedFile.name} has been uploaded successfully`,
        });
        setSelectedFile(null);
      } else {
        setUploads((prev) =>
          prev.map((u) =>
            u.filename === selectedFile.name ? { ...u, progress } : u
          )
        );
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload File</h2>
        <p className="text-muted-foreground">
          Upload files to the distributed storage system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Select a file to upload. Files will be automatically distributed and replicated across storage nodes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <div className="flex gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button onClick={handleUpload} disabled={!selectedFile}>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>

          {selectedFile && (
            <div className="rounded-lg border p-4 flex items-center gap-3">
              <File className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {uploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploads.map((upload, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{upload.filename}</span>
                  <span className="text-muted-foreground">
                    {upload.progress.toFixed(0)}%
                  </span>
                </div>
                <Progress value={upload.progress} />
                <p className="text-xs text-muted-foreground">
                  Status: {upload.status}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
