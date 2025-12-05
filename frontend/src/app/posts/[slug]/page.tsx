import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <article className="max-w-[800px] mx-auto px-6">
          {/* パンくずリスト */}
          <nav className="text-sm text-[var(--text-secondary)] mb-8">
            <Link href="/" className="hover:text-[var(--primary)]">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/posts" className="hover:text-[var(--primary)]">
              記事一覧
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">{post.title}</span>
          </nav>

          {/* 記事ヘッダー */}
          <header className="mb-8">
            <time className="text-sm text-[var(--text-secondary)]">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--secondary)] mt-2">
              {post.title}
            </h1>
          </header>

          {/* 記事本文 */}
          {post.content && (
            <div
              className="prose prose-lg max-w-none"
              style={{
                lineHeight: "1.8",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* 記事フッター */}
          <footer className="mt-12 pt-8 border-t border-[var(--border)]">
            <Link
              href="/posts"
              className="inline-flex items-center text-[var(--primary)] font-medium hover:underline"
            >
              ← 記事一覧に戻る
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
