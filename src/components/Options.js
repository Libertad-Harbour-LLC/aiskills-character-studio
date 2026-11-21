"use client";

import { STYLES, SCENES, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import { PresetGrid, LabeledChips, TextField } from "./Presets";

export default function Options({ state, set, Chips }) {
  const { t } = useLang();
  const describe = state.mode === "describe";
  return (
    <>
      <TextField id="who" rows={3} required={describe} max={400} value={state.who} onChange={(v) => set({ who: v })}
        label={describe ? { en: "Who is the character", ru: "Кто персонаж" } : { en: "About the character (optional)", ru: "О персонаже (необязательно)" }}
        placeholder={{ en: "e.g. a cheerful red fox detective in a green coat and round glasses", ru: "например: весёлый лис-детектив в зелёном пальто и круглых очках" }} />
      <PresetGrid label={{ en: "Scene", ru: "Сцена" }} items={SCENES} value={state.scene} onChange={(v) => set({ scene: v })} />
      <TextField id="action" max={300} value={state.action} onChange={(v) => set({ action: v })}
        label={{ en: "Or your own scene (optional)", ru: "Или своя сцена (необязательно)" }}
        placeholder={{ en: "e.g. surfing a huge wave at sunrise", ru: "например: катается на огромной волне на рассвете" }} />
      <LabeledChips label={{ en: "Style", ru: "Стиль" }} items={STYLES} value={state.style} onChange={(v) => set({ style: v })} />
      <Chips label={t("aspect")} options={ASPECTS} value={state.aspect} onChange={(v) => set({ aspect: v })} />
      <Chips label={t("resolution")} options={RESOLUTIONS} value={state.resolution} onChange={(v) => set({ resolution: v })} render={(v) => v.toUpperCase()} />
    </>
  );
}
