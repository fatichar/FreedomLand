const { DateTime } = require("luxon");
const navigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Add navigation plugin
  eleventyConfig.addPlugin(navigation);

  // Add Nunjucks filter for date formatting
  eleventyConfig.addFilter("dateFormat", function(date, format) {
    return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat(format);
  });

  // Copy assets directory to output
  eleventyConfig.addPassthroughCopy({
    "src/assets": "/assets"
  });

  // Copy all HTML files to the output
  eleventyConfig.addPassthroughCopy("src/**/*.html");

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget("./src/assets/");
  eleventyConfig.addWatchTarget("./src/_includes/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
