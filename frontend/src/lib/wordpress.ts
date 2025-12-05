import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.WORDPRESS_API_URL!;

// Basic認証ヘッダーを作成
const authUser = process.env.WORDPRESS_AUTH_USER;
const authPass = process.env.WORDPRESS_AUTH_PASS;
const headers: Record<string, string> = {};

if (authUser && authPass) {
  const auth = Buffer.from(`${authUser}:${authPass}`).toString("base64");
  headers["Authorization"] = `Basic ${auth}`;
}

export const client = new GraphQLClient(endpoint, { headers });

// 投稿一覧を取得
export const GET_POSTS = gql`
  query GetPosts {
    posts(first: 10) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// 投稿詳細を取得
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
    }
  }
`;

// 型定義
export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}

export interface PostResponse {
  post: Post;
}

// 投稿一覧を取得する関数
export async function getPosts(): Promise<Post[]> {
  const data = await client.request<PostsResponse>(GET_POSTS);
  return data.posts.nodes;
}

// 投稿詳細を取得する関数
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // URLデコードされたスラッグを使用
    const decodedSlug = decodeURIComponent(slug);
    const data = await client.request<PostResponse>(GET_POST_BY_SLUG, { slug: decodedSlug });
    return data.post;
  } catch (error) {
    console.error("Error fetching post by slug:", slug, error);
    return null;
  }
}
