"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-3xl font-bold text-[var(--text)]">
          できたよ！
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/area"
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors"
          >
            教室を探す
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors"
          >
            記事
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors"
          >
            運営会社
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
            style={{ backgroundColor: "#FF6B35", color: "#ffffff" }}
          >
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6 text-[var(--secondary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--border)]">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="/area"
              className="text-sm font-medium text-[var(--text)] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              教室を探す
            </Link>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--text)] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              記事
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[var(--text)] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              運営会社
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-md text-sm font-medium text-center"
              style={{ backgroundColor: "#FF6B35", color: "#ffffff" }}
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
