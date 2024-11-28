export const getRepositories = async () => {
  const res = await fetch(
    "https://api.github.com/users/g-bolsoni/repos?per_page=6&sort=pushed&direction=desc",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
};
