import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";

const WHATSAPP_NUMBER = "526682502760";

const schema = z.object({
  message: z.string().trim().min(10, "Mensaje muy corto").max(1000),
});

export function Contact() {
  const [form, setForm] = useState({ message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const lines = [
      "¡Hola Yùnqi! Me gustaría conversar con ustedes:",
      "",
      form.message,
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setForm({ message: "" });
  };

  return (
    <section id="contacto" className="py-32 px-6 bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="reveal">
          <span className="text-xs font-semibold uppercase tracking-widest text-leaf">Conversemos</span>
          <h2 className="mt-3 font-display text-5xl md:text-7xl font-black text-leaf-deep">
            Cuéntanos<br />
            <span className="italic font-light">cómo estás hoy.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Tu opinión nos importa y queremos escucharte. Ya sea una duda, una idea o una propuesta de colaboración, nuestra puerta (y la botella) están siempre abiertas.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="reveal">
            <label className="block text-xs font-semibold uppercase tracking-widest text-leaf-deep mb-2">
              Cómo estás hoy
            </label>
            <textarea
              rows={5}
              placeholder="Mensaje…"
              value={form.message}
              onChange={(e) => setForm({ message: e.target.value })}
              className={`w-full rounded-2xl border-2 bg-background px-5 py-4 text-foreground transition-all focus:outline-none focus:ring-4 focus:ring-leaf/20 ${
                errors.message ? "border-berry" : "border-border focus:border-leaf"
              }`}
            />
            {errors.message && <p className="mt-2 text-sm text-berry">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="reveal group inline-flex items-center gap-3 rounded-full bg-leaf-deep hover:bg-leaf px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-all hover:scale-105 active:scale-95"
          >
            Enviar por WhatsApp
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
}
