import { useEffect, useMemo, useState } from "react";
import { X, Sparkles } from "lucide-react";

const PHRASES: { category: string; text: string }[] = [
  // Bienestar y Actitud
  { category: "Bienestar y Actitud", text: "La calma es el nuevo lujo." },
  { category: "Bienestar y Actitud", text: "Un corazón agradecido es un imán de milagros." },
  { category: "Bienestar y Actitud", text: "Regálate un momento de paz en medio del caos." },
  { category: "Bienestar y Actitud", text: "Tu energía es tu posesión más valiosa: cuídala." },
  { category: "Bienestar y Actitud", text: "Hoy es un buen día para empezar con una sonrisa." },
  { category: "Bienestar y Actitud", text: "Respira, hidrata tu alma y sigue adelante." },
  { category: "Bienestar y Actitud", text: "La felicidad está en los detalles más simples." },
  { category: "Bienestar y Actitud", text: "Siembra pensamientos positivos y cosecharás alegría." },
  { category: "Bienestar y Actitud", text: "Tu mente es un jardín, cultiva flores, no maleza." },
  { category: "Bienestar y Actitud", text: "Donde pones tu atención, pones tu energía." },
  // Constancia y Éxito
  { category: "Constancia y Éxito", text: "El éxito es la suma de pequeños esfuerzos diarios." },
  { category: "Constancia y Éxito", text: "Grandes cosas tienen comienzos pequeños." },
  { category: "Constancia y Éxito", text: "La constancia es el puente entre tus metas y tus logros." },
  { category: "Constancia y Éxito", text: "Tu ritmo es el correcto, no te compares." },
  { category: "Constancia y Éxito", text: "Cada paso, por pequeño que sea, te acerca a tu meta." },
  { category: "Constancia y Éxito", text: "La disciplina es la forma más alta de amor propio." },
  { category: "Constancia y Éxito", text: "Lo que siembras hoy, lo cosecharás mañana." },
  { category: "Constancia y Éxito", text: "No te detengas hasta que te sientas orgullosa." },
  { category: "Constancia y Éxito", text: "La paciencia es la clave de toda maestría." },
  { category: "Constancia y Éxito", text: "El mejor momento para empezar siempre es ahora." },
  // Autenticidad y Ser
  { category: "Autenticidad y Ser", text: "Sé tu mejor versión, no una copia de los demás." },
  { category: "Autenticidad y Ser", text: "La magia ocurre cuando te atreves a ser tú misma." },
  { category: "Autenticidad y Ser", text: "Tu autenticidad es tu superpoder." },
  { category: "Autenticidad y Ser", text: "Brilla con luz propia, el mundo necesita tu brillo." },
  { category: "Autenticidad y Ser", text: "Que tus sueños sean más grandes que tus miedos." },
  { category: "Autenticidad y Ser", text: "Cree en ti tanto como nosotros creemos en tu potencial." },
  { category: "Autenticidad y Ser", text: "Eres suficiente tal cual eres en este momento." },
  { category: "Autenticidad y Ser", text: "Tu valor no depende de tu productividad." },
  { category: "Autenticidad y Ser", text: "Confía en el proceso de tu propia evolución." },
  { category: "Autenticidad y Ser", text: "Lo que te hace diferente es lo que te hace especial." },
];

export function GiftModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [seed, setSeed] = useState(0);
  const phrase = useMemo(
    () => PHRASES[Math.floor(Math.random() * PHRASES.length)],
    [seed, open],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-leaf-deep/60 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-cream p-8 md:p-10 shadow-2xl border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="flex items-center gap-2 text-leaf">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] font-semibold uppercase tracking-widest">
            Un regalo para ti
          </span>
        </div>

        <p className="mt-6 font-display text-3xl md:text-4xl font-black text-leaf-deep leading-tight">
          “{phrase.text}”
        </p>

        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          {phrase.category}
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="text-xs font-semibold uppercase tracking-wider text-leaf-deep hover:text-leaf transition-colors"
          >
            Otra frase →
          </button>
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 grid place-items-center h-11 w-11 rounded-full bg-cream text-leaf-deep shadow-lg hover:scale-110 active:scale-95 transition-transform"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
