# Blog CMS Quick Guide

## Managing Your Content

Your blog uses a simple file-based CMS. All posts are stored as MDX files in the `content/posts/` directory.

## Creating New Posts

### Method 1: Using the CLI Script (Recommended)
```bash
npm run new-post
```

This will prompt you for:
- Post title
- Excerpt/description
- Tags
- And automatically generate the file with proper frontmatter

### Method 2: Manual Creation
1. Create a new `.mdx` file in `content/posts/`
2. Use kebab-case naming: `my-awesome-post.mdx`
3. Start with frontmatter (metadata) at the top

## Frontmatter Reference

```yaml
---
title: "Your Post Title"                    # Required: Display title
date: "2024-01-15"                         # Required: YYYY-MM-DD format
excerpt: "Brief description for SEO"       # Required: Homepage preview
tags: ["Data Science", "Python"]           # Optional: For categorization
published: true                            # Optional: false to hide post
---
```

## Writing Content

### Basic Markdown
- Use `#` for headings (H1, H2, H3, etc.)
- Use `**bold**` and `*italic*` for emphasis
- Use `- item` for bullet lists
- Use `1. item` for numbered lists
- Use `> quote` for blockquotes

### LaTeX Math Equations

#### Inline Math
Use single dollar signs: `$E = mc^2$`

#### Block Math
Use double dollar signs:
```latex
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
```

#### Common LaTeX Symbols
- Greek letters: `\alpha, \beta, \gamma, \delta, \theta`
- Fractions: `\frac{numerator}{denominator}`
- Square root: `\sqrt{x}` or `\sqrt[n]{x}` for nth root
- Summation: `\sum_{i=1}^{n}`
- Integration: `\int_{a}^{b}`
- Partial derivatives: `\frac{\partial f}{\partial x}`
- Matrices: `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`

### Code Blocks
Use triple backticks with language specification:

````markdown
```python
import pandas as pd
df = pd.read_csv('data.csv')
```

```r
data <- read.csv('data.csv')
summary(data)
```

```sql
SELECT * FROM users WHERE active = true;
```
````

## Publishing Workflow

1. **Draft**: Create post with `published: false`
2. **Review**: Check locally at `http://localhost:3000`
3. **Publish**: Change to `published: true`
4. **Deploy**: Push to Git (auto-deploys if using Vercel)

## Tips for Data Science Content

1. **Start with intuition** before diving into math
2. **Use progressive examples** - simple to complex
3. **Include working code** that readers can run
4. **Explain assumptions** clearly
5. **Link related concepts** between posts
6. **Use descriptive tags** for discoverability

## File Organization

```
content/posts/
├── welcome-to-my-blog.mdx
├── understanding-linear-regression.mdx
├── neural-networks-backpropagation.mdx
└── your-new-posts.mdx
```

## Best Practices

- Use descriptive, SEO-friendly titles
- Keep excerpts under 160 characters for better SEO
- Use consistent tag naming (capitalize consistently)
- Include both mathematical rigor and intuitive explanations
- Test math rendering in development before publishing

## Troubleshooting

### Math not rendering?
- Check that you're using `$$` for block equations and `$` for inline
- Escape special characters if needed
- Ensure KaTeX CSS is loading

### Post not showing?
- Check `published: true` in frontmatter
- Verify file is in `content/posts/` directory
- Check that filename ends with `.mdx`
- Restart dev server if needed

### Syntax highlighting not working?
- Ensure language is specified: ````python` not just ```
- Check that the language is supported by react-syntax-highlighter 