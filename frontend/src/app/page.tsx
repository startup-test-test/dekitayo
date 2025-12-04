import { getPosts } from "@/lib/wordpress";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white p-8">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          できたよ！ - WordPress連携テスト
        </h1>
        <p className="text-gray-600 mb-8">
          ヘッドレスCMS構成（WordPress + Next.js）の検証ページです。12月4日のテストです。
          WordPressで管理しているコンテンツをGraphQL API経由で取得し、Next.jsで表示しています。
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            WordPressから取得した投稿一覧
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">投稿がありません</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <h3 className="text-lg font-medium text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.date).toLocaleDateString("ja-JP")}
                  </p>
                  {post.excerpt && (
                    <div
                      className="text-gray-600 mt-2 text-sm"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            ✅ 連携成功！
          </h2>
          <p className="text-green-700 text-sm">
            WordPressのGraphQL APIからデータを取得できています。
          </p>
        </section>
      </main>
    </div>
  );
}
