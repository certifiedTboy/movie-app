export const seo = (data) => {
  document.title = data?.title || "Movie App";
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      data?.metaDescription || "A movie app to explore and discover films."
    );
};
