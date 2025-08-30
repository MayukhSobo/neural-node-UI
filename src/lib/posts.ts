import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
  tags?: string[]
  published?: boolean
}

export interface PaginatedPosts {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNextPage: boolean
  hasPrevPage: boolean
  postsPerPage: number
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.mdx'))
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content,
    readingTime: readingTime(content).text,
    tags: data.tags || [],
    published: data.published !== false, // default to true
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.published)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getPaginatedPosts(page: number = 1, postsPerPage: number = 6): PaginatedPosts {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  // Calculate start and end indices
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  // Get posts for current page
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    postsPerPage
  }
}

export function getHomePaginatedPosts(page: number = 1): PaginatedPosts {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  
  // Calculate total pages: first page has 8 posts, subsequent pages have 9 posts
  const firstPagePosts = 8
  const subsequentPagePosts = 9
  
  let totalPages = 1
  if (totalPosts > firstPagePosts) {
    const remainingPosts = totalPosts - firstPagePosts
    totalPages = 1 + Math.ceil(remainingPosts / subsequentPagePosts)
  }
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  // Calculate start and end indices
  let startIndex: number
  let endIndex: number
  let postsPerPage: number
  
  if (currentPage === 1) {
    startIndex = 0
    endIndex = firstPagePosts
    postsPerPage = firstPagePosts
  } else {
    startIndex = firstPagePosts + (currentPage - 2) * subsequentPagePosts
    endIndex = startIndex + subsequentPagePosts
    postsPerPage = subsequentPagePosts
  }
  
  // Get posts for current page
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    postsPerPage
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => 
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getPaginatedPostsByTag(tag: string, page: number = 1, postsPerPage: number = 6): PaginatedPosts {
  const allTagPosts = getPostsByTag(tag)
  const totalPosts = allTagPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  // Calculate start and end indices
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  // Get posts for current page
  const posts = allTagPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    postsPerPage
  }
} 