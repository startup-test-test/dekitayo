"use client";

import { useState } from "react";

interface ThumbnailImageProps {
  src: string;
  alt: string;
}

export default function ThumbnailImage({ src, alt }: ThumbnailImageProps) {
  const [error, setError] = useState(false);

  // WordPress画像はプロキシ経由でアクセス（Basic認証対応）
  const proxyUrl = `/api/image?url=${encodeURIComponent(src)}`;

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl">📰</span>
      </div>
    );
  }

  return (
    <img
      src={proxyUrl}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  );
}
