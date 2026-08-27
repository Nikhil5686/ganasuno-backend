import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "studio.ganasuno.app",
  appName: "GanaSuno",
  webDir: "out",

  server: {
    url: "https://ganasuno.studio",
    cleartext: false,
  },
};

export default config;