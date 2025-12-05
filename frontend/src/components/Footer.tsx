import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ロゴ・説明 */}
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold text-[var(--text)]">
              できたよ！
            </Link>
            <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              「できたよ！」は、教育心理学の視点から子どもの自己肯定感を高めるプログラミング教室を紹介するメディアです。お子さまの成長をサポートする教室選びをお手伝いします。
            </p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--secondary)]">メニュー</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/area" className="hover:text-[var(--primary)] transition-colors">
                  教室を探す
                </Link>
              </li>
              <li>
                <Link href="/self-esteem" className="hover:text-[var(--primary)] transition-colors">
                  自己肯定感
                </Link>
              </li>
              <li>
                <Link href="/non-cognitive" className="hover:text-[var(--primary)] transition-colors">
                  非認知能力
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[var(--primary)] transition-colors">
                  書籍レビュー
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-bold mb-4 text-[var(--secondary)]">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                  お問い合わせフォーム
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-sm text-[var(--text-secondary)]">
          <p>© 2024 できたよ！ All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
