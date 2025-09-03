import { getHomePaginatedPosts } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/blog/Pagination'

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  
    const {
    posts,
    currentPage: validatedPage,
    totalPages,
    totalPosts
  } = await getHomePaginatedPosts(currentPage)

  return (
    <div className="container-custom" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
      {/* Hero Section */}
      <div className="hero">
        <h1 className="gradient-text">Forever Student, Always Learning</h1>
        <p>
          Every question leads somewhere beautiful.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)', 
            margin: 0,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem'
          }}>
            Posts
            <span style={{
              fontSize: '1rem',
              fontWeight: '400',
              color: 'var(--text-muted)',
              letterSpacing: '0'
            }}>
              ({posts.length}/{totalPosts})
            </span>
          </h2>
        </div>
        
        {posts.length > 0 ? (
          <>
            <div className="posts-grid">
              {posts.map((post, index) => (
                <PostCard 
                  key={post.slug} 
                  post={post} 
                  featured={validatedPage === 1 && index === 0} 
                />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination 
              currentPage={validatedPage}
              totalPages={totalPages}
              totalPosts={totalPosts}
              basePath=""
            />
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts found.</p>
        )}
      </div>
    </div>
  )
}
