// Character Studio — one consistent character in any scene and style: from your reference photos or from a description.
// Models: nano-banana-2-1-edit (keeps the character from up to 14 reference photos) and
// nano-banana-2-1 (creates a new character from text).

export const MODELS = { photos: "nano-banana-2-1-edit", describe: "nano-banana-2-1" };

export const STYLES = [
  { id: "photo", label: { en: "Photorealistic", ru: "Фотореализм" }, prompt: "photorealistic photography, natural skin and fabric detail" },
  { id: "3d", label: { en: "3D animation", ru: "3D-мультфильм" }, prompt: "high-end 3D animated feature film style, soft global illumination, expressive stylized proportions" },
  { id: "anime", label: { en: "Anime", ru: "Аниме" }, prompt: "clean modern anime illustration style, cel shading, crisp line art" },
  { id: "comic", label: { en: "Comic book", ru: "Комикс" }, prompt: "western comic book art style, bold ink outlines, halftone shading" },
  { id: "watercolor", label: { en: "Watercolor", ru: "Акварель" }, prompt: "delicate watercolor illustration with paper texture" },
  { id: "pixel", label: { en: "Pixel art", ru: "Пиксель-арт" }, prompt: "detailed 16-bit pixel art" },
  { id: "clay", label: { en: "Clay figure", ru: "Пластилин" }, prompt: "handmade clay stop-motion figure look, visible fingerprints in the clay" },
  { id: "oil", label: { en: "Oil painting", ru: "Масло" }, prompt: "classical oil painting with visible brush strokes" },
];

export const SCENES = [
  { id: "portrait", label: { en: "Portrait", ru: "Портрет" }, prompt: "a head-and-shoulders portrait on a simple soft background" },
  { id: "sheet", label: { en: "Character sheet", ru: "Лист персонажа" }, prompt: "a character turnaround sheet: front, three-quarter, side and back full-body views of the same character on a plain light background, evenly spaced" },
  { id: "expressions", label: { en: "Expressions", ru: "Эмоции" }, prompt: "an expression sheet: a 2×3 grid of the same character's face showing happy, sad, angry, surprised, thinking and laughing" },
  { id: "action", label: { en: "Action pose", ru: "В действии" }, prompt: "a dynamic full-body action pose with motion and energy" },
  { id: "cafe", label: { en: "In a café", ru: "В кафе" }, prompt: "sitting in a cozy café by the window with a cup of coffee" },
  { id: "office", label: { en: "At work", ru: "На работе" }, prompt: "working at a desk in a modern bright office" },
  { id: "city", label: { en: "City at night", ru: "Ночной город" }, prompt: "walking down a neon-lit city street at night" },
  { id: "fantasy", label: { en: "Fantasy world", ru: "Фэнтези" }, prompt: "in an epic fantasy landscape with castles and floating islands, adventurer outfit" },
  { id: "space", label: { en: "Sci-fi", ru: "Космос" }, prompt: "aboard a futuristic spaceship bridge with stars outside the window, sci-fi suit" },
  { id: "nature", label: { en: "Nature", ru: "Природа" }, prompt: "in a sunny forest clearing with soft light rays" },
];

export const ASPECTS = ["1:1", "3:4", "4:5", "16:9", "9:16"];
export const RESOLUTIONS = ["1k", "2k"];

export const APP = {
  id: "character-studio",
  name: "Character Studio",
  theme: "slate-indigo",
  tagline: { en: "One character, any scene", ru: "Один персонаж — любые сцены" },
  kicker: { en: "Consistent characters", ru: "Узнаваемый персонаж" },
  headline: { en: "Your character in any scene and any style", ru: "Ваш персонаж в любой сцене и любом стиле" },
  description: {
    en: "Add reference photos of a person, a mascot or a drawing — or describe a new character. Get them in 10 scenes and 8 styles, recognisable every time.",
    ru: "Добавьте фото человека, маскота или рисунок — или опишите нового персонажа. Получите его в 10 сценах и 8 стилях, узнаваемым каждый раз.",
  },
  cta: { en: "Create the character", ru: "Создать персонажа" },
  models: Object.values(MODELS),
  upload: { types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"], maxBytes: 20 * 1024 * 1024 },
  modes: [
    { id: "photos", label: { en: "From reference photos", ru: "По фото-референсам" },
      desc: { en: "Keep a real person, mascot or drawing recognisable.", ru: "Сохраняет узнаваемость человека, маскота или рисунка." } },
    { id: "describe", label: { en: "From a description", ru: "По описанию" },
      desc: { en: "No photos — invent a new character in words.", ru: "Без фото — придумайте нового персонажа словами." } },
  ],
  slots: [{
    key: "refs", kind: "image", min: 1, max: 5, modes: ["photos"],
    label: { en: "Reference photos", ru: "Фото-референсы" },
    hint: { en: "1–5 images of the same character from different angles.", ru: "1–5 изображений одного персонажа с разных ракурсов." },
  }],
  counts: [1, 2, 4],
  compare: false,
  initialState: () => ({ mode: "photos", style: "photo", scene: "portrait", who: "", action: "", aspect: "1:1", resolution: "1k", count: 1 }),
  check: (s) => (s.mode === "describe" && !s.who.trim()
    ? { en: "Describe the character first.", ru: "Сначала опишите персонажа." } : null),
  priceModel: (s) => MODELS[s.mode] || MODELS.photos,
  label: (s, tx) => [tx(SCENES.find((x) => x.id === s.scene)?.label), tx(STYLES.find((x) => x.id === s.style)?.label)].filter(Boolean).join(" · "),
};
