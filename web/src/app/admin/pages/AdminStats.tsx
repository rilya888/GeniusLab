/**
 * Admin: visitor statistics (total visits, unique visitors, referrers, devices, top pages).
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";
import { toast } from "sonner";
import { BarChart3, Users, Eye, Monitor, Tablet, Smartphone } from "lucide-react";

interface StatsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  byDevice: { mobile: number; tablet: number; desktop: number };
  byReferrer: Record<string, number>;
  byPath: Record<string, number>;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function AdminStats() {
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(30);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/stats?days=${days}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized");
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as StatsSummary;
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [days]);

  if (loading && !stats) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-light text-gray-900">Statistiche</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-light text-gray-900">Statistiche</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="days" className="text-sm text-gray-600">
            Periodo
          </Label>
          <Select
            value={String(days)}
            onValueChange={(v) => setDays(parseInt(v, 10))}
          >
            <SelectTrigger id="days" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 giorni</SelectItem>
              <SelectItem value="30">30 giorni</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            disabled={loading}
          >
            {loading ? "..." : "Aggiorna"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p>{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={fetchStats}
          >
            Riprova
          </Button>
        </div>
      )}

      {stats && !error && (
        <>
          {stats.totalVisits === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <BarChart3 className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Nessun dato ancora</p>
                <p className="mt-1 text-sm">
                  I dati appariranno quando i visitatori inizieranno a navigare
                  il sito.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Visite totali
                    </Label>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-light">{stats.totalVisits}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Label className="text-sm font-medium text-gray-600">
                      Visitatori unici
                    </Label>
                    <Users className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-light">{stats.uniqueVisitors}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Dispositivi</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-gray-500" />
                      <span>Desktop:</span>
                      <span className="font-medium">
                        {stats.byDevice.desktop ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tablet className="h-5 w-5 text-gray-500" />
                      <span>Tablet:</span>
                      <span className="font-medium">
                        {stats.byDevice.tablet ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <span>Mobile:</span>
                      <span className="font-medium">
                        {stats.byDevice.mobile ?? 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Fonti (referrer)</h2>
                </CardHeader>
                <CardContent>
                  {Object.keys(stats.byReferrer).length === 0 ? (
                    <p className="text-sm text-gray-500">Nessun dato</p>
                  ) : (
                    <ul className="space-y-2">
                      {Object.entries(stats.byReferrer).map(([ref, count]) => (
                        <li
                          key={ref}
                          className="flex justify-between text-sm"
                        >
                          <span className="truncate font-mono">{ref}</span>
                          <span className="ml-2 font-medium">{count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium">Pagine più visitate</h2>
                </CardHeader>
                <CardContent>
                  {Object.keys(stats.byPath).length === 0 ? (
                    <p className="text-sm text-gray-500">Nessun dato</p>
                  ) : (
                    <ul className="space-y-2">
                      {Object.entries(stats.byPath).map(([p, count]) => (
                        <li
                          key={p}
                          className="flex justify-between text-sm"
                        >
                          <span className="truncate font-mono">{p}</span>
                          <span className="ml-2 font-medium">{count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
