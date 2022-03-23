async function forcePageRevalidation(res: Res, path: string) {
  try {
    await res.unstable_revalidate(path);
  } catch(err) {
    console.log("Error in page revalidation");
  };
};

export { forcePageRevalidation };