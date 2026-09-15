(() => {
  const el = document.getElementById("git-edit-button");
  if (!el) return;
  const anchor = el.closest("a");
  if (!anchor) return;
  const clickHandler = async (e) => {
    try {
      const uri = new URL(anchor.href);
      const pathname = uri.pathname;
      const rewriteMatchers = [
        {
          pattern: /\/content\/chapter\/categories\/\w+\/index\.md/,
          rewrite: () => {
            return `/layouts/category-root.md`;
          },
        },
        {
          pattern: /\/content\/chapter\/categories\/\w+\/methods\.md/,
          rewrite: () => {
            return `/layouts/integration-methods.md`;
          },
        },
        {
          pattern: /\/index\.md/,
          rewrite: async () => {
            const [, owner, repo, , ref, ...path] = pathname.split("/");
            const res = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/${path.join("/")}?ref=${ref}`,
              { method: "HEAD" },
            );

            const contentSegment = path.findIndex((v) => v === "content");
            const contentSlice = path.slice(contentSegment);
            if (res.status === 404) {
              contentSlice[contentSlice.length - 1] = "_index.md";
            }
            return contentSlice.join("/");
          },
        },
      ];

      for (const matcher of rewriteMatchers) {
        if (matcher.pattern.test(uri.pathname)) {
          e.preventDefault();
          const [basePath] = pathname.split("/content");
          uri.pathname =
            basePath +
            "/" +
            (await Promise.resolve(matcher.rewrite())).replace(/^\//g, "");
          window.open(uri.toString());
          return;
        }
      }
    } catch (e) {
      console.error("failed to open link", e);
    }
  };
  anchor.addEventListener("auxclick", clickHandler);
  anchor.addEventListener("click", clickHandler);
})();
