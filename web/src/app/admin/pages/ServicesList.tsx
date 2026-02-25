/**
 * Admin: edit services list (heading, subheading, items).
 */

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useContentState } from "../../context/ContentContext";
import { useAdminLang } from "../AdminLangContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { toast } from "sonner";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function ServicesList() {
  const { content, loading, refetch } = useContentState();
  const adminLang = useAdminLang();
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [items, setItems] = useState<{ key: string; name: string; description: string; path: string; order: number }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content?.services) {
      setHeading(content.services.heading);
      setSubheading(content.services.subheading);
      setItems([...content.services.items].sort((a, b) => a.order - b.order));
    }
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const lang = adminLang?.adminLang ?? "it";
      const res = await fetch(`/api/admin/content/services?lang=${lang}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          heading,
          subheading,
          items: items.map((item, i) => ({ ...item, order: i })),
        }),
      });
      if (res.ok) {
        toast.success("Saved");
        refetch();
      } else {
        let msg = "Save failed";
        try {
          const data = await res.json();
          msg = data.error || msg;
        } catch {
          msg = `Save failed (${res.status})`;
        }
        toast.error(msg);
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { key: "", name: "", description: "", path: "", order: prev.length },
    ]);
  };

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-light text-gray-900">Servizi</h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Section</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="subheading">Subheading</Label>
            <Input
              id="subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-medium">Items</h2>
          <Button onClick={addItem} variant="outline" size="sm">
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg space-y-2 flex flex-col gap-2"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="Key (e.g. macbook)"
                  value={item.key}
                  onChange={(e) => updateItem(index, "key", e.target.value)}
                />
                <Input
                  placeholder="Path (e.g. /servizi/macbook)"
                  value={item.path}
                  onChange={(e) => updateItem(index, "path", e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </Button>
              </div>
              <Input
                placeholder="Name"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
              />
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
              />
              <Link
                to={`/admin/services/${item.key}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit page content →
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
