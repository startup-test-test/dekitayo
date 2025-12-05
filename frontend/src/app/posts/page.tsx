import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPosts, Post } from "@/lib/wordpress";

function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
      <div className="aspect-video bg-[var(--surface)] flex items-center justify-center">
        <span className="text-4xl">📝</span>
      </div>
      <div className="p-4">
        <time className="text-xs text-[var(--text-secondary)]">
          {new Date(post.date).toLocaleDateString("ja-JP")}
        </time>
        <h3 className="font-bold mt-1 text-[var(--secondary)] line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <div
            className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}
      </div>
    </article>
  );
}

export default async function PostsPage() {
  let posts: Post[] = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* パンくずリスト */}
          <nav className="text-sm text-[var(--text-secondary)] mb-8">
            <Link href="/" className="hover:text-[var(--primary)]">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">記事一覧</span>
          </nav>

          <h1 className="text-3xl font-bold text-[var(--secondary)] mb-8">
            記事一覧
          </h1>

          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)] py-12">
              記事がありません
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`}>
                  <ArticleCard post={post} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
