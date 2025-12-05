import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    // Basic認証ヘッダーを作成
    const authUser = process.env.WORDPRESS_AUTH_USER;
    const authPass = process.env.WORDPRESS_AUTH_PASS;
    const headers: Record<string, string> = {};

    if (authUser && authPass) {
      const auth = Buffer.from(`${authUser}:${authPass}`).toString("base64");
      headers["Authorization"] = `Basic ${auth}`;
    }

    // 画像を取得
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: response.status });
    }

    // レスポンスを返す
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
