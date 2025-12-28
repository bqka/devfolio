export const EFFECTS_CONFIG = {
  snow: {
    flakeCount: 150,
    windSpeed: 0.15,

    minSize: 1.2,
    maxSize: 5.2,

    minOpacity: 0.25,
    maxOpacity: 0.8,

    minFallSpeed: 0.2,
    maxFallSpeed: 0.9,

    minWobbleAmplitude: 4,
    maxWobbleAmplitude: 30,

    minWobbleSpeed: 0.002,
    maxWobbleSpeed: 0.01,

    colorVar: "--snow-color",
    glowColorVar: "--snow-glow",
    glow: true,
    glowBlur: 5,
  },
  cursor: {
    radius: 350,
    colorVar: "--cursor-glow",
    intensity: 0.15,

    followSpeed: 0.8,
    followDelay: 8,
  },
} as const;
