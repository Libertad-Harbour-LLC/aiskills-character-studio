import "server-only";
import { MODELS, STYLES, SCENES, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { pick, urls, text, PlanError } from "@/lib/plan-helpers";

export function plan(body) {
  const style = STYLES.find((s) => s.id === body.style) || STYLES[0];
  const scene = SCENES.find((s) => s.id === body.scene) || SCENES[0];
  const who = text(body.who, 400);
  const action = text(body.action, 300);
  const count = pick(Number(body.count), [1, 2, 4], 1);
  const params = { aspect_ratio: pick(body.aspect, ASPECTS, "1:1"), resolution: pick(body.resolution, RESOLUTIONS, "1k") };
  const where = action ? `${action}` : scene.prompt;
  let job;
  if (body.mode === "describe") {
    if (!who) throw new PlanError("Describe the character", "missing_input");
    job = {
      model: MODELS.describe,
      prompt: `Original character design. The character: ${who}. Show the character: ${where}. Style: ${style.prompt}. ` +
        "Distinctive, memorable design with clear silhouette and consistent details, high quality, no text, no watermark.",
      params,
    };
  } else {
    const refs = urls(body.inputs, "refs", { min: 1, max: 5, name: "reference photo" });
    job = {
      model: MODELS.photos,
      prompt: `Keep the exact same character as in the reference image${refs.length > 1 ? "s" : ""}: the same face, identity, proportions, hair, colors, outfit details and distinctive features, recognisable at a glance. ` +
        `Show the character: ${where}. Render the image in this style: ${style.prompt}.` +
        (who ? ` About the character: ${who}.` : "") + " High quality, no text, no watermark.",
      params,
      inputs: { image_urls: refs },
    };
  }
  return Array.from({ length: count }, () => job);
}
