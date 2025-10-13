import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, HardDrive, Server, Activity } from "lucide-react";
import { mockFiles, mockStorageNodes, formatBytes } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const totalFiles = mockFiles.length;
  const totalStorage = mockStorageNodes.reduce((acc, node) => acc + node.used, 0);
  const totalCapacity = mockStorageNodes.reduce((acc, node) => acc + node.capacity, 0);
  const activeNodes = mockStorageNodes.filter((n) => n.status === "online").length;
  const utilizationPercent = (totalStorage / totalCapacity) * 100;

  const recentFiles = mockFiles.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your distributed file system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFiles}</div>
            <p className="text-xs text-muted-foreground">
              Across {mockStorageNodes.length} nodes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(totalStorage)}</div>
            <p className="text-xs text-muted-foreground">
              of {formatBytes(totalCapacity)} capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeNodes}</div>
            <p className="text-xs text-muted-foreground">
              {mockStorageNodes.length} total nodes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationPercent.toFixed(1)}%</div>
            <Progress value={utilizationPercent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Storage Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStorageNodes.map((node) => {
                const percent = (node.used / node.capacity) * 100;
                return (
                  <div key={node.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            node.status === "online"
                              ? "bg-green-500"
                              : node.status === "degraded"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{node.name}</span>
                        <span className="text-muted-foreground">
                          ({node.location})
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {formatBytes(node.used)} / {formatBytes(node.capacity)}
                      </span>
                    </div>
                    <Progress value={percent} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {file.filename}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded by {file.user}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatBytes(file.size)}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.chunks} chunks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
