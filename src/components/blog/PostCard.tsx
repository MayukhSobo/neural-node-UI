import Link from 'next/link'
import { format } from 'date-fns'
import { BlogPost } from '@/lib/posts'

interface PostCardProps {
  post: BlogPost
  featured?: boolean
}

// Function to get tag class based on tag name
function getTagClass(tag: string, featured: boolean = false): string {
  const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-')
  const baseClass = `tag-${normalizedTag}`
  return featured ? `tag tag-featured ${baseClass}` : `tag ${baseClass}`
}

// Function to remove duplicate tags (no limit on count)
function getUniqueTags(tags: string[]): string[] {
  return Array.from(new Set(tags))
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const cardClass = featured ? 'card-featured' : 'card-minimal'
  const titleClass = featured ? 'card-title-featured' : 'card-title-regular'
  
  // Get all unique tags for this post (no limit)
  const uniqueTags = getUniqueTags(post.tags || [])
  
  return (
    <article className={cardClass}>
      {/* Latest indicator - only show for featured post */}
      {featured && (
        <div className="latest-indicator">
          <div className="latest-dot"></div>
          <span>New</span>
        </div>
      )}
      
      <div className="card-content">
        <div className="card-content-main">
          {/* Title - Selectable and clickable */}
          <div className={`card-title ${titleClass}`}>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
              <h2 style={{ 
                fontSize: featured ? '1.375rem' : '1.125rem', 
                fontWeight: '600', 
                color: '#2d3748',
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                margin: 0,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                userSelect: 'text',
                WebkitUserSelect: 'text',
                MozUserSelect: 'text',
                cursor: 'pointer'
              }}>
                {post.title}
              </h2>
            </Link>
          </div>
          
          {/* Clickable area for rest of card */}
          <Link href={`/posts/${post.slug}`} className="card-link-overlay"></Link>
          
          {/* Meta info - Consistent spacing */}
          <div className="card-meta">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              fontWeight: '400',
              fontStyle: 'italic',
              width: '100%'
            }}>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </time>
              <span style={{ margin: '0 0.625rem', color: '#9ca3af' }}>•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
          
          {/* Excerpt - Natural height, no forced expansion */}
          <div className="card-excerpt">
            <p style={{ 
              color: '#4a5568', 
              fontSize: featured ? '15px' : '14px',
              lineHeight: '1.5',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: featured ? 4 : 3,
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}>
              {post.excerpt}
            </p>
          </div>
        </div>
        
        {/* Tags - Fixed footer space with horizontal scrolling */}
        {uniqueTags.length > 0 && (
          <div className="card-content-footer">
            <div className="card-tags-scrollable">
              {uniqueTags.map((tag, index) => (
                <span key={`${tag}-${index}`} className={getTagClass(tag, featured)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
} 