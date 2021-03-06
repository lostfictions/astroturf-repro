/* eslint no-undef: error */
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    () => ({
      webpack(cfg) {
        // enable astroturf
        cfg.module.rules.push({
          test: /\.tsx$/,
          use: [
            {
              loader: "astroturf/loader",
              // options: { useAltLoader: true },
            },
          ],
        });
        return cfg;
      },
    }),
  ],
  {
    webpack5: true,
    eslint: { ignoreDuringBuilds: true },
  }
);
