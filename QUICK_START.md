# Quick Start Guide 🚀

Your personal data science blog is ready! Here's how to get started:

## 1. Start the Development Server

```bash
npm run dev
```

Your blog will be available at: **http://localhost:3000**

## 2. Explore Your Blog

- **Homepage**: Shows all published posts with a clean, minimal design
- **Sample Posts**: I've created 4 example posts showcasing different features:
  - Welcome post with LaTeX examples
  - Linear regression with mathematical derivations
  - Neural networks and backpropagation
  - Data science workflow tips

## 3. Create Your First Post

### Using the CLI (Recommended):
```bash
npm run new-post
```

### Or manually:
1. Create a file: `content/posts/my-first-post.mdx`
2. Add frontmatter and content (see CMS_GUIDE.md for details)

## 4. Key Features Showcase

### ➗ LaTeX Math Rendering
```latex
$$\frac{\partial J}{\partial \theta} = \frac{1}{m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) x^{(i)}$$
```

### 💻 Code Syntax Highlighting
```python
import numpy as np
model = LinearRegression()
model.fit(X_train, y_train)
```

### 🏷️ Tag System
- Organize posts by topics
- Automatic tag pages at `/tags/[tagname]`
- Tag cloud on `/tags`

## 5. Customization

### Update Site Info
Edit `src/app/layout.tsx` to change:
- Site title and description
- Author information
- SEO metadata

### Modify Design
- **Colors & Typography**: Edit `src/app/globals.css`
- **Header**: Modify `src/components/blog/Header.tsx`
- **Homepage**: Update `src/app/page.tsx`

### Blog Title
Change "Data Blog" in `src/components/blog/Header.tsx` to your preferred name.

## 6. Content Management

Your CMS is file-based and lives in `content/posts/`:

- ✅ **Simple**: Just create `.mdx` files
- ✅ **Version Controlled**: All content is in Git
- ✅ **Fast**: No database needed
- ✅ **Portable**: Easy to backup and migrate

## 7. Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on every push

### Other Options
- Netlify
- AWS Amplify
- Docker deployment

## 8. Next Steps

1. **Customize the design** to match your preferences
2. **Add your bio** to the About page
3. **Create your first real post** about your data science work
4. **Set up analytics** (Google Analytics, Plausible, etc.)
5. **Add a contact form** or social links

## Sample LaTeX for Testing

Copy this into a new post to test LaTeX rendering:

```latex
Linear regression cost function:
$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (h_\theta(x^{(i)}) - y^{(i)})^2$$

Gradient descent update:
$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$$

Normal distribution:
$$f(x|\mu,\sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
```

## Need Help?

- Check `CMS_GUIDE.md` for detailed content management instructions
- See `README.md` for complete documentation
- All sample posts demonstrate different features

**Happy blogging! 📊✨** 