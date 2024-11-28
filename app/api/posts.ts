import { BlogPost } from "../components/blog-posts";

export const getBlogPosts = async () => {
  const res = await fetch(
    "https://www.tabnews.com.br/api/v1/contents/gbolsoni",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Failed to fetch blog posts");

  const posts = await res.json();

  if (!posts.length) return [];

  const parent_posts = posts.filter((post: BlogPost) => !post.parent_id);

  return parent_posts;
};
