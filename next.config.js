/* eslint no-undef: error */
const withPlugins = require("next-compose-plugins");

const astroturfAltLoaderMatcher = /astroturf\/inline-loader/;

function traverse(rules) {
  for (const rule of rules) {
    if (typeof rule.loader === "string" && rule.loader.includes("css-loader")) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === "function"
      ) {
        const nextGetLocalIdent = rule.options.modules.getLocalIdent;
        rule.options.modules.getLocalIdent = (
          context,
          localIdentName,
          localName,
          options
        ) => {
          const nextLocalIdent = nextGetLocalIdent(
            context,
            localIdentName,
            localName,
            options
          );

          return astroturfAltLoaderMatcher.test(context.request)
            ? `${nextLocalIdent}_${context.resourceQuery.slice(1)}`
            : nextLocalIdent;
        };
      }
    }
    if (typeof rule.use === "object") {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf);
    }
  }
}

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
              options: { useAltLoader: true },
            },
          ],
        });

        traverse(cfg.module.rules);
        return cfg;
      },
    }),
  ],
  {
    webpack5: true,
    eslint: { ignoreDuringBuilds: true },
  }
);
