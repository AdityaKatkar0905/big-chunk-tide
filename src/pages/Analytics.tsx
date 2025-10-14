import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStorageNodes, formatBytes } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useFiles } from "@/contexts/FileContext";

export default function Analytics() {
  const { files } = useFiles();
  
  // Storage distribution data
  const storageData = mockStorageNodes.map((node) => ({
    name: node.name,
    used: node.used / (1024 * 1024 * 1024), // Convert to GB
    free: (node.capacity - node.used) / (1024 * 1024 * 1024),
  }));

  // User upload statistics
  const userStats = files.reduce((acc, file) => {
    acc[file.user] = (acc[file.user] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userUploadData = Object.entries(userStats).map(([user, count]) => ({
    name: user,
    uploads: count,
  }));

  // File size distribution
  const fileSizeData = files.map((file) => ({
    name: file.filename.substring(0, 20) + "...",
    size: file.size / (1024 * 1024 * 1024), // GB
  }));

  const COLORS = ["hsl(217.2, 91.2%, 59.8%)", "hsl(142.1, 76.2%, 36.3%)", "hsl(262.1, 83.3%, 57.8%)", "hsl(346.8, 77.2%, 49.8%)", "hsl(24.6, 95%, 53.1%)"];

  const totalStorage = mockStorageNodes.reduce((acc, node) => acc + node.used, 0);
  const totalCapacity = mockStorageNodes.reduce((acc, node) => acc + node.capacity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Storage usage and performance metrics across the distributed system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatBytes(totalCapacity)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across {mockStorageNodes.length} nodes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Used Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatBytes(totalStorage)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {((totalStorage / totalCapacity) * 100).toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatBytes(totalCapacity - totalStorage)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ready for new uploads
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Storage Distribution by Node</CardTitle>
            <CardDescription>Used vs. available storage per node</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Storage (GB)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" fill="hsl(var(--primary))" name="Used (GB)" />
                <Bar dataKey="free" fill="hsl(var(--muted))" name="Free (GB)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploads by User</CardTitle>
            <CardDescription>Distribution of file uploads across users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userUploadData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, uploads }) => `${name}: ${uploads}`}
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="uploads"
                >
                  {userUploadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Size Distribution</CardTitle>
          <CardDescription>Individual file sizes across the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fileSizeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Size (GB)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="size" fill="hsl(var(--accent))" name="File Size (GB)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
