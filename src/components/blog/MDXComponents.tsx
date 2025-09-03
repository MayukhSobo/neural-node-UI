import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeProps {
  children: string;
  className?: string;
}

function Code({ children, className }: CodeProps) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  if (language) {
    return (
      <SyntaxHighlighter
        style={oneLight}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: "8px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          marginTop: 0,
          marginBottom: "1.5rem",
          padding: "1.25rem",
          fontFamily: "var(--font-primary), Avenir, sans-serif",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {children}
      </SyntaxHighlighter>
    );
  }

  return (
    <code
      style={{
        backgroundColor: "#f1f5f9",
        color: "#334155",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        fontSize: "0.9em",
        fontFamily: "var(--font-primary), Avenir, sans-serif",
        fontWeight: "500",
      }}
    >
      {children}
    </code>
  );
}

export const MDXComponents = {
  code: Code,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontSize: "2.25rem",
        fontWeight: "700",
        marginBottom: "1.5rem",
        marginTop: "2rem",
        color: "#111827",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
      }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontSize: "1.75rem",
        fontWeight: "600",
        marginBottom: "1.25rem",
        marginTop: "2rem",
        color: "#111827",
        lineHeight: "1.3",
        letterSpacing: "-0.01em",
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      style={{
        fontSize: "1.375rem",
        fontWeight: "600",
        marginBottom: "1rem",
        marginTop: "1.75rem",
        color: "#111827",
        lineHeight: "1.4",
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        marginBottom: "1.25rem",
        fontSize: "17px",
        color: "#374151",
        lineHeight: "1.7",
      }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        marginBottom: "1.25rem",
        paddingLeft: "1.75rem",
        listStyleType: "disc",
      }}
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      style={{
        marginBottom: "1.25rem",
        paddingLeft: "1.75rem",
        listStyleType: "decimal",
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: "0.5rem", lineHeight: "1.6" }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: "4px solid #d1d5db",
        paddingLeft: "1.5rem",
        fontStyle: "italic",
        color: "#4b5563",
        marginBottom: "1.5rem",
        fontSize: "18px",
        lineHeight: "1.6",
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{
        color: "#2563eb",
        textDecoration: "underline",
        transition: "color 0.2s",
        fontWeight: "500",
      }}
      {...props}
    />
  ),
};
