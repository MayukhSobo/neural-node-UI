# Data Science Blog with LaTeX Support

A modern, minimal blog built with Next.js, TypeScript, and KaTeX for beautiful mathematical equation rendering. Perfect for data scientists, researchers, and anyone who needs to publish content with mathematical notation.

## Features

- 🚀 **Fast & Modern**: Built with Next.js 14 and TypeScript
- 📝 **MDX Support**: Write content in Markdown with React components
- ➗ **LaTeX Rendering**: Beautiful math equations with KaTeX
- 🎨 **Minimal Design**: Clean, focused typography optimized for reading
- 🏷️ **Tag System**: Organize content with tags and filtering
- ⚡ **Static Generation**: Fast loading with SSG
- 📱 **Responsive**: Mobile-friendly design
- 🔍 **SEO Optimized**: Proper meta tags and structured data

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog.

### Building for Production

```bash
npm run build
npm start
```

## Content Management System (CMS)

This blog uses a file-based CMS. All blog posts are stored as MDX files in the `content/posts/` directory.

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter at the top of the file
3. Write your content using Markdown and LaTeX

#### Example Post Structure

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post for the homepage and SEO."
tags: ["Data Science", "Machine Learning", "Python"]
published: true
---

# Your Post Title

Your content goes here. You can use regular Markdown and LaTeX equations.

## Math Equations

Inline math: $E = mc^2$

Block equations:
$$\frac{\partial J}{\partial \theta} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) x^{(i)}$$

## Code Blocks

```python
import numpy as np
import pandas as pd

def linear_regression(X, y):
    return np.linalg.inv(X.T @ X) @ X.T @ y
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The post title |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `excerpt` | Yes | Brief description for homepage and SEO |
| `tags` | No | Array of tags for categorization |
| `published` | No | Set to `false` to hide the post (default: `true`) |

### Writing LaTeX Equations

#### Inline Equations
Use single dollar signs: `$E = mc^2$` renders as $E = mc^2$

#### Block Equations
Use double dollar signs:
```latex
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

#### Common Mathematical Notation

| LaTeX | Rendered | Description |
|-------|----------|-------------|
| `\alpha, \beta, \gamma` | α, β, γ | Greek letters |
| `\sum_{i=1}^{n}` | Σ from i=1 to n | Summation |
| `\int_{a}^{b}` | ∫ from a to b | Integral |
| `\frac{a}{b}` | a/b | Fraction |
| `\sqrt{x}` | √x | Square root |
| `x^{2}` | x² | Superscript |
| `x_{i}` | xᵢ | Subscript |

### Code Syntax Highlighting

The blog supports syntax highlighting for many languages:

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```r
fibonacci <- function(n) {
  if (n <= 1) return(n)
  return(fibonacci(n-1) + fibonacci(n-2))
}
```

```sql
SELECT customer_id, SUM(order_total) as lifetime_value
FROM orders 
GROUP BY customer_id
ORDER BY lifetime_value DESC;
```
````

## Project Structure

```
blog/
├── content/posts/           # Blog post MDX files (Your CMS!)
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── posts/[slug]/   # Dynamic post pages
│   │   ├── tags/           # Tag listing and filtering
│   │   └── about/          # About page
│   ├── components/
│   │   └── blog/           # Blog-specific components
│   └── lib/
│       └── posts.ts        # Post loading utilities
├── public/                 # Static assets
└── package.json           # Dependencies
```

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for design changes
- LaTeX styling can be customized in the `.katex` CSS rules

### Blog Configuration
- Update site metadata in `src/app/layout.tsx`
- Modify the header title and navigation in `src/components/blog/Header.tsx`
- Customize the homepage hero section in `src/app/page.tsx`

### Adding New Features
- **Comments**: Integrate with services like Disqus or giscus
- **Search**: Add full-text search with libraries like Fuse.js
- **RSS Feed**: Generate RSS feeds for subscribers
- **Analytics**: Add Google Analytics or other tracking

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
This is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Docker containers
- Any platform supporting Node.js

## Content Tips for Data Scientists

1. **Use descriptive titles**: "Understanding Linear Regression" vs "Linear Regression"
2. **Start with intuition**: Explain the concept before diving into math
3. **Progressive complexity**: Build from simple to complex examples
4. **Include code**: Always provide working implementations
5. **Visualizations**: Consider adding plots and diagrams
6. **Cross-reference**: Link related posts using internal links

## Contributing

To add new features or improve the blog:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
