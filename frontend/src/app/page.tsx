import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThumbnailImage from "@/components/ThumbnailImage";
import { getPosts, Post } from "@/lib/wordpress";

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await getPosts();
    console.log("Posts data:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section
          className="relative bg-cover bg-top min-h-[350px] md:min-h-[450px] flex items-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        >
          {/* コンテンツ（ハイライト風テキスト） */}
          <div className="relative max-w-[1200px] mx-auto px-6 py-12 w-full">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
              <span className="inline bg-white/90 px-2 py-1 text-[var(--text)] whitespace-nowrap">
                小さな「できたよ！」を自信に変える
              </span>
              <br />
              <span className="inline bg-white/90 px-2 py-1 text-[var(--text)] mt-2 inline-block whitespace-nowrap">
                プログラミング教育の情報メディア
              </span>
            </h1>
          </div>
        </section>

        {/* 最新ニュース */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-8">
              最新ニュース
            </h2>
            {posts.length === 0 ? (
              <p className="text-center text-[var(--text-secondary)]">
                読み込み中...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 6).map((post) => (
                  <Link key={post.id} href={`/posts/${post.slug}`} className="block h-full">
                    <article className="bg-white rounded-lg border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      {/* サムネイル */}
                      <div className="aspect-video bg-[var(--surface)] overflow-hidden">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <ThumbnailImage
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">📰</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <span className="text-xs text-[var(--primary)] font-medium">ニュース</span>
                        <h3 className="font-bold text-[var(--secondary)] mt-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <div
                          className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2 flex-1"
                          dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                        />
                        <time className="text-xs text-[var(--text-secondary)] mt-3 block">
                          {new Date(post.date).toLocaleDateString("ja-JP")}
                        </time>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                href="/media"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                すべてのニュースを見る →
              </Link>
            </div>
          </div>
        </section>

        {/* カテゴリから探す */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-8">
              カテゴリから探す
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "新規開校", icon: "🎉", slug: "new-opening" },
                { name: "新コース", icon: "📚", slug: "new-course" },
                { name: "イベント・大会", icon: "🏆", slug: "event" },
                { name: "受賞・認定", icon: "🏅", slug: "award" },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow border border-[var(--border)]"
                >
                  <span className="text-3xl block mb-2">{category.icon}</span>
                  <span className="font-medium text-[var(--secondary)]">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 教室掲載のご案内 */}
        <section className="py-16 bg-[var(--secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  教室情報を無料掲載
                </h2>
                <p className="opacity-90 mb-2">
                  プログラミング教室・ロボット教室を運営されている方へ
                </p>
                <ul className="text-sm opacity-80 space-y-1">
                  <li>✓ 掲載料は完全無料</li>
                  <li>✓ 保護者に教室の魅力をアピール</li>
                  <li>✓ 新規開校・イベント情報も掲載OK</li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-white px-8 py-4 rounded-md font-bold text-[var(--secondary)] hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                無料で掲載する
              </Link>
            </div>
          </div>
        </section>

        {/* 運営について */}
        <section className="py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)] mb-8">
              運営について
            </h2>
            <div className="bg-[var(--surface)] rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-[var(--border)]">
                <span className="text-4xl">🏢</span>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  「できたよ！」は、子どもの自己肯定感を育むプログラミング教育の情報メディアです。
                  教室選びに役立つ情報や、教育に関するコラムをお届けしています。
                </p>
                <Link
                  href="/about"
                  className="inline-block mt-4 text-[var(--primary)] font-medium hover:underline"
                >
                  詳しく見る →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
