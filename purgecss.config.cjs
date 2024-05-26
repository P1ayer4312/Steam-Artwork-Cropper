// eslint-disable-next-line no-undef
module.exports = {
  content: ["dist/index.html", "dist/assets/*.js"],
  css: ["dist/assets/*.css"],
  output: "dist/assets",
  safelist: {
    greedy: [/lvl$/, /friendPlayerLevel$/],
  },
};
