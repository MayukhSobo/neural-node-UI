'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalPosts?: number
  basePath?: string
  className?: string
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalPosts,
  basePath = '',
  className = '' 
}: PaginationProps) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    if (page === 1) {
      return basePath || '/'
    }
    return basePath ? `${basePath}?page=${page}` : `/?page=${page}`
  }

  const getVisiblePages = () => {
    const delta = 1 // Show fewer pages for cleaner look
    const range = []
    
    // For small number of pages, just show all pages
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
      return range
    }
    
    // For larger number of pages, use the delta logic
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }
    
    if (currentPage - delta > 2) {
      range.unshift('...')
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...')
    }
    
    range.unshift(1)
    if (totalPages > 1) {
      range.push(totalPages)
    }
    
    return range
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={`pagination-apple ${className}`}>
      {/* Subtle post count */}
      {totalPosts && (
        <div className="pagination-count">
          {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
        </div>
      )}
      
      <nav className="pagination-nav" aria-label="Pagination Navigation">
        <div className="pagination-container">
          {/* Previous button */}
          {currentPage > 1 ? (
            <Link 
              href={createPageUrl(currentPage - 1)}
              className="pagination-btn pagination-prev"
              aria-label="Go to previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Link>
          ) : (
            <span className="pagination-btn pagination-prev pagination-disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </span>
          )}

          {/* Page numbers */}
          <div className="pagination-numbers">
            {visiblePages.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ⋯
                </span>
              ) : (
                <Link
                  key={page}
                  href={createPageUrl(Number(page))}
                  className={`pagination-number ${
                    Number(page) === currentPage ? 'pagination-current' : ''
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={Number(page) === currentPage ? 'page' : undefined}
                >
                  {page}
                </Link>
              )
            ))}
          </div>

          {/* Next button */}
          {currentPage < totalPages ? (
            <Link 
              href={createPageUrl(currentPage + 1)}
              className="pagination-btn pagination-next"
              aria-label="Go to next page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          ) : (
            <span className="pagination-btn pagination-next pagination-disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </span>
          )}
        </div>

        {/* Subtle page indicator */}
        <div className="pagination-info">
          {currentPage} of {totalPages}
        </div>
      </nav>
    </div>
  )
} 