import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/blog/MDXComponents'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Enable dynamic params for posts not generated at build time
export const dynamicParams = true

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    if (!post) {
      return {
        title: 'Post Not Found - Data Blog',
        description: 'The requested blog post could not be found.',
      }
    }
    return {
      title: `${post.title} - Data Blog`,
      description: post.excerpt,
      keywords: post.tags,
    }
  } catch {
    return {
      title: 'Post Not Found - Data Blog',
      description: 'The requested blog post could not be found.',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getPostBySlug(slug)
    
    if (!post) {
      notFound()
    }
    
    return (
      <div className="container-custom" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <article style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Post Header */}
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: '#111827', 
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.03em'
            }}>
              {post.title}
            </h1>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#6b7280', 
              fontSize: '0.875rem', 
              marginBottom: '1.5rem',
              fontWeight: '500'
            }}>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </time>
              <span style={{ margin: '0 0.75rem', color: '#9ca3af' }}>•</span>
              <span>{post.readingTime}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.5rem', 
                justifyContent: 'center',
                marginBottom: '2rem' 
              }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-featured">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose-custom">
            <MDXRemote 
              source={post.content}
              components={MDXComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>
        </article>
      </div>
    )
  } catch {
    notFound()
  }
} 