import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPosts, Post } from "@/lib/wordpress";

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section
          className="relative bg-cover bg-center min-h-[350px] md:min-h-[450px] flex items-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        >
          {/* コンテンツ（ハイライト風テキスト） */}
          <div className="relative max-w-[1200px] mx-auto px-6 py-12 w-full">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
              <span className="inline bg-white/90 px-2 py-1 text-[var(--text)] whitespace-nowrap">
                小さな「できたよ！」を自信に変える
              </span>
              <br />
              <span className="inline bg-white/90 px-2 py-1 text-[var(--text)] mt-2 inline-block whitespace-nowrap">
                ロボット・プログラミング教室を探そう。
              </span>
            </h1>
          </div>
        </section>

        {/* 掲載教室 */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)] mb-4">
              掲載教室
            </h2>
            <p className="text-center text-[var(--text-secondary)] mb-8">
              全国のプログラミング教室を無料で掲載中
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 教室カード（サンプル） */}
              <article className="bg-white rounded-lg border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-[var(--surface)] flex items-center justify-center">
                  <span className="text-4xl">🏫</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-[var(--primary)] font-medium">東京都 渋谷区</span>
                  <h3 className="font-bold text-[var(--secondary)] mt-1">
                    テックキッズスクール 渋谷校
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    小学生向けプログラミング教室。Scratch、Unityなど多彩なコース。
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-xs text-[var(--text-secondary)]">4.2</span>
                  </div>
                </div>
              </article>
              <article className="bg-white rounded-lg border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-[var(--surface)] flex items-center justify-center">
                  <span className="text-4xl">🤖</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-[var(--primary)] font-medium">神奈川県 横浜市</span>
                  <h3 className="font-bold text-[var(--secondary)] mt-1">
                    ロボ団 横浜校
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    ロボットプログラミングを通じて論理的思考力を育成。
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-xs text-[var(--text-secondary)]">4.8</span>
                  </div>
                </div>
              </article>
              <article className="bg-white rounded-lg border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-[var(--surface)] flex items-center justify-center">
                  <span className="text-4xl">🎮</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-[var(--primary)] font-medium">大阪府 大阪市</span>
                  <h3 className="font-bold text-[var(--secondary)] mt-1">
                    プログラボ 梅田校
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    ゲーム制作を通じてプログラミングの基礎を楽しく学習。
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-xs text-[var(--text-secondary)]">4.5</span>
                  </div>
                </div>
              </article>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/area"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                すべての教室を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* 地域から探す */}
        <section className="py-16 bg-[var(--surface)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)] mb-8">
              地域から探す
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["東京都", "神奈川県", "大阪府", "愛知県", "埼玉県", "千葉県", "福岡県", "北海道", "兵庫県", "京都府", "静岡県", "広島県"].map(
                (area) => (
                  <Link
                    key={area}
                    href={`/area/${area}`}
                    className="bg-white rounded-lg p-4 text-center font-medium text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-colors border border-[var(--border)]"
                  >
                    {area}
                  </Link>
                )
              )}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/area"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                その他の地域 →
              </Link>
            </div>
          </div>
        </section>

        {/* ニュース */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)] mb-4">
              ニュース
            </h2>
            <p className="text-center text-[var(--text-secondary)] mb-8">
              プログラミング教室の最新情報
            </p>
            {posts.length === 0 ? (
              <p className="text-center text-[var(--text-secondary)]">
                ニュースの読み込み中...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/posts/${post.slug}`}>
                    <article className="bg-white rounded-lg p-6 border border-[var(--border)] hover:shadow-md transition-shadow">
                      <span className="text-xs text-[var(--primary)] font-medium">ニュース</span>
                      <h3 className="font-bold text-[var(--secondary)] mt-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <div
                          className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      )}
                      <time className="text-xs text-[var(--text-secondary)] mt-3 block">
                        {new Date(post.date).toLocaleDateString("ja-JP")}
                      </time>
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

        {/* 教室掲載のご案内 */}
        <section className="py-16 bg-[var(--secondary)]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  教室の無料掲載を受付中
                </h2>
                <p className="opacity-90 mb-2">
                  プログラミング教室・ロボット教室を運営されている方へ
                </p>
                <ul className="text-sm opacity-80 space-y-1">
                  <li>✓ 掲載料は完全無料</li>
                  <li>✓ Googleレビューと連携</li>
                  <li>✓ 被リンク効果でSEO強化</li>
                </ul>
              </div>
              <Link
                href="/listing"
                className="inline-block bg-white px-8 py-4 rounded-md font-bold text-[var(--secondary)] hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                無料で掲載する
              </Link>
            </div>
          </div>
        </section>

        {/* 運営会社について */}
        <section className="py-16 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--secondary)] mb-8">
              運営会社について
            </h2>
            <div className="bg-[var(--surface)] rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-[var(--border)]">
                <span className="text-4xl">🏢</span>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  「できたよ！」は、全国のプログラミング教室・ロボット教室を紹介するメディアです。
                  お子さまに合った教室選びをサポートします。
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
