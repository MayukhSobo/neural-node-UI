import { getPaginatedPostsByTag, getAllPosts } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/blog/Pagination'
import Link from 'next/link'

interface TagPageProps {
  params: { tag: string }
  searchParams: { page?: string }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = params
  const currentPage = parseInt(searchParams.page || '1', 10)
  const postsPerPage = 6
  
  const { 
    posts, 
    currentPage: validatedPage,
    totalPages,
    totalPosts 
  } = await getPaginatedPostsByTag(decodeURIComponent(tag), currentPage, postsPerPage)

  return (
    <div className="container-custom" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <nav style={{ marginBottom: '1.5rem' }}>
          <Link 
            href="/" 
            style={{ 
              color: '#6366f1', 
              textDecoration: 'none', 
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            ← Back to all posts
          </Link>
        </nav>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.25rem', 
              fontWeight: '700', 
              color: '#2d3748', 
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em'
            }}>
              Posts tagged &ldquo;{decodeURIComponent(tag)}&rdquo;
            </h1>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '1.125rem',
              margin: 0
            }}>
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
            </p>
          </div>
          
          {validatedPage > 1 && (
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Page {validatedPage} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} featured={false} />
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination 
            currentPage={validatedPage}
            totalPages={totalPages}
            basePath={`/tags/${encodeURIComponent(tag)}`}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            No posts found with the tag &ldquo;{decodeURIComponent(tag)}&rdquo;.
          </p>
          <Link 
            href="/" 
            style={{ 
              color: '#6366f1', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            View all posts →
          </Link>
        </div>
      )}
    </div>
  )
}

// Generate static params for all unique tags
export async function generateStaticParams() {
  const posts = await getAllPosts()
  const allTags = posts.flatMap(post => post.tags || [])
  const uniqueTags = Array.from(new Set(allTags))
  
  return uniqueTags.map((tag) => ({
    tag: encodeURIComponent(tag)
  }))
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPaginatedPostsByTag(tag, 1, 100) // Get all posts for count
  
  return {
    title: `Posts tagged "${tag}" - Data Blog`,
    description: `${posts.totalPosts} posts about ${tag}. Explore data science, machine learning, and mathematics.`,
    keywords: [tag, "data science", "machine learning", "blog"],
  }
} 