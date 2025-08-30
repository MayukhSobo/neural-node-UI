import { getPaginatedPosts } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/blog/Pagination'
import Link from 'next/link'

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  const postsPerPage = 9 // Show more posts per page on dedicated posts page
  
  const { 
    posts, 
    currentPage: validatedPage,
    totalPages,
    totalPosts 
  } = getPaginatedPosts(currentPage, postsPerPage)

  return (
    <div className="container-custom" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
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
            ← Back to home
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
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#2d3748', 
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem'
            }}>
              All Posts
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '400',
                color: '#9ca3af',
                letterSpacing: '0'
              }}>
                ({posts.length}/{totalPosts})
              </span>
            </h1>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '1.125rem',
              margin: 0
            }}>
              Explore my data science journey
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
            totalPosts={totalPosts}
            basePath="/posts"
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            No posts found.
          </p>
          <Link 
            href="/" 
            style={{ 
              color: '#6366f1', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Back to home →
          </Link>
        </div>
      )}
    </div>
  )
}

export const metadata = {
  title: 'All Posts - Data Blog',
  description: 'Browse all blog posts about data science, machine learning, and mathematics.',
} 