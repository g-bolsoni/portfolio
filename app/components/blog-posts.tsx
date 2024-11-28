import Link from "next/link";
import { FaCalendar, FaThumbsUp } from "react-icons/fa";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  tabcoins: number;
}

async function getBlogPosts() {
  const res = await fetch(
    "https://www.tabnews.com.br/api/v1/contents/gbolsoni",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return res.json();
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPosts() {
  const posts = await getBlogPosts();

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Meus Artigos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:border-[#8257E5] border-2 border-transparent transition-all duration-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white hover:text-[#8257E5] transition-colors duration-200">
                  <Link
                    href={`https://www.tabnews.com.br/gbolsoni/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <span className="flex items-center">
                    <FaCalendar className="mr-2 text-[#8257E5]" />
                    {formatDate(post.created_at)}
                  </span>
                  <span className="flex items-center">
                    <FaThumbsUp className="mr-2 text-[#8257E5]" />
                    {post.tabcoins}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="https://www.tabnews.com.br/gbolsoni/conteudos/1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8257E5] text-white px-6 py-2 rounded hover:bg-[#9466FF] transition-colors duration-200"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  );
}
