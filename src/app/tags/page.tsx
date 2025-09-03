import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function TagsPage() {
  const posts = await getAllPosts();

  // Count posts by tag
  const tagCounts = posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a);

  return (
    <div
      className="container-custom"
      style={{ paddingTop: "7rem", paddingBottom: "3rem" }}
    >
      <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "2rem",
          }}
        >
          Tags
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Explore posts by topic. Click on any tag to see related articles.
        </p>

        {sortedTags.length > 0 ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="card-minimal"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      color: "#111827",
                      transition: "color 0.2s",
                      margin: 0,
                    }}
                  >
                    {tag}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      backgroundColor: "#f3f4f6",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {count} {count === 1 ? "post" : "posts"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <p style={{ color: "#6b7280" }}>No tags available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
