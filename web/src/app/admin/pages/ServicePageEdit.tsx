/**
 * Admin: edit one service page (hero, services[], problems[], FAQ, answer-first, section titles).
 */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useContentState } from "../../context/ContentContext";
import { useAdminLang } from "../AdminLangContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { toast } from "sonner";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function StringListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <Button variant="outline" size="sm" onClick={() => remove(i)}>
            −
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}>
        + Add
      </Button>
    </div>
  );
}

function FaqEditor({
  items,
  onChange,
}: {
  items: { question: string; answer: string }[];
  onChange: (items: { question: string; answer: string }[]) => void;
}) {
  const update = (index: number, field: "question" | "answer", value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };
  const add = () => onChange([...items, { question: "", answer: "" }]);
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">FAQ #{i + 1}</span>
            <Button variant="outline" size="sm" onClick={() => remove(i)}>
              − Remove
            </Button>
          </div>
          <Input
            value={item.question}
            onChange={(e) => update(i, "question", e.target.value)}
            placeholder="Question"
          />
          <Textarea
            value={item.answer}
            onChange={(e) => update(i, "answer", e.target.value)}
            placeholder="Answer"
            rows={2}
          />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}>
        + Add FAQ
      </Button>
    </div>
  );
}

export function ServicePageEdit() {
  const { key } = useParams<{ key: string }>();
  const { content, loading, refetch } = useContentState();
  const adminLang = useAdminLang();
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    servicesSectionTitle: "",
    problemsSectionTitle: "",
    services: [] as string[],
    problems: [] as string[],
    metaDescription: "",
    answerFirstIntro: "",
    keywords: "",
    faq: [] as { question: string; answer: string }[],
  });
  const [saving, setSaving] = useState(false);

  const pageData = content?.servicePages?.[key ?? ""];

  useEffect(() => {
    if (pageData) {
      setForm({
        heroTitle: pageData.heroTitle,
        heroSubtitle: pageData.heroSubtitle,
        servicesSectionTitle: pageData.servicesSectionTitle,
        problemsSectionTitle: pageData.problemsSectionTitle,
        services: [...pageData.services],
        problems: [...pageData.problems],
        metaDescription: pageData.metaDescription,
        answerFirstIntro: pageData.answerFirstIntro ?? "",
        keywords: pageData.keywords ?? "",
        faq: [...(pageData.faq ?? [])],
      });
    }
  }, [pageData]);

  const handleSave = async () => {
    if (!key) return;
    setSaving(true);
    try {
      const lang = adminLang?.adminLang ?? "it";
      const res = await fetch(`/api/admin/content/servicePages/${key}?lang=${lang}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
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

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (!key || !pageData) return <p className="text-gray-600">Service not found</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/admin/services" className="text-gray-600 hover:underline">
          ← Servizi
        </Link>
        <h1 className="text-3xl font-light text-gray-900">{key}</h1>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Hero</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Hero Title</Label>
            <Input
              value={form.heroTitle}
              onChange={(e) => setForm((f) => ({ ...f, heroTitle: e.target.value }))}
            />
          </div>
          <div>
            <Label>Hero Subtitle</Label>
            <Textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm((f) => ({ ...f, heroSubtitle: e.target.value }))}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Sections</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Services Section Title</Label>
            <Input
              value={form.servicesSectionTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, servicesSectionTitle: e.target.value }))
              }
            />
          </div>
          <div>
            <Label>Problems Section Title</Label>
            <Input
              value={form.problemsSectionTitle}
              onChange={(e) =>
                setForm((f) => ({ ...f, problemsSectionTitle: e.target.value }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Services List</h2>
        </CardHeader>
        <CardContent>
          <StringListEditor
            items={form.services}
            onChange={(services) => setForm((f) => ({ ...f, services }))}
            placeholder="Service item"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Problems List</h2>
        </CardHeader>
        <CardContent>
          <StringListEditor
            items={form.problems}
            onChange={(problems) => setForm((f) => ({ ...f, problems }))}
            placeholder="Problem item"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Answer-first intro (GEO SEO)</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={form.answerFirstIntro}
            onChange={(e) => setForm((f) => ({ ...f, answerFirstIntro: e.target.value }))}
            placeholder="Direct answer to 'dove riparare X a Roma?' — 120–160 words recommended"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Page-specific keywords</h2>
        </CardHeader>
        <CardContent>
          <Input
            value={form.keywords}
            onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
            placeholder="e.g. dove riparare macbook roma, riparazione MacBook Roma"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">FAQ</h2>
        </CardHeader>
        <CardContent>
          <FaqEditor
            items={form.faq}
            onChange={(faq) => setForm((f) => ({ ...f, faq }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Meta Description</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={form.metaDescription}
            onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
            rows={3}
          />
          <p className="text-sm text-gray-500">
            The suffix &quot; | ex AvaTech&quot; is automatically appended on the site for SEO. Do not add it here.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
