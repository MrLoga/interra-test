import GoogleFontsPlugin from "google-fonts-webpack-plugin";

export const plugins = [
  new GoogleFontsPlugin({
    fonts: [{ family: "Ubuntu", variants: ["400", "500"] }],
  }),
];
