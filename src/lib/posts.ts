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

// GitHub repository configuration
const GITHUB_OWNER = 'MayukhSobo'
const GITHUB_REPO = 'neural-node-content'
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`

// Cache for posts to avoid repeated API calls during build
let postsCache: BlogPost[] | null = null

interface GitHubFile {
  name: string
  download_url: string
  type: string
}

async function fetchPostsFromGitHub(): Promise<BlogPost[]> {
  try {
    // Fetch list of files from GitHub
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add GitHub token if you need private repo access
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      // Cache for 5 minutes during development
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const files: GitHubFile[] = await response.json()
    
    // Filter for MDX files
    const mdxFiles = files.filter(file => 
      file.type === 'file' && file.name.endsWith('.mdx')
    )

    // Fetch and process each MDX file
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const contentResponse = await fetch(file.download_url)
          const fileContents = await contentResponse.text()
          const { data, content } = matter(fileContents)
          
          const slug = file.name.replace(/\.mdx$/, '')
          
          return {
            slug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            content,
            readingTime: readingTime(content).text,
            tags: data.tags || [],
            published: data.published !== false, // default to true
          } as BlogPost
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error)
          return null
        }
      })
    )

    // Filter out failed posts and sort by date
    const validPosts = posts
      .filter((post): post is BlogPost => post !== null && post.published === true)
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    return validPosts
  } catch (error) {
    console.error('Error fetching posts from GitHub:', error)
    return []
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (postsCache) {
    return postsCache
  }
  
  postsCache = await fetchPostsFromGitHub()
  return postsCache
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts()
  return allPosts.find(post => post.slug === slug) || null
}

export async function getPaginatedPosts(page: number = 1, postsPerPage: number = 6): Promise<PaginatedPosts> {
  const allPosts = await getAllPosts()
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

export async function getHomePaginatedPosts(page: number = 1): Promise<PaginatedPosts> {
  const allPosts = await getAllPosts()
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
  
  // Calculate start and end indices based on page
  let startIndex: number
  let endIndex: number
  let postsPerPage: number
  
  if (currentPage === 1) {
    // First page: 8 posts
    startIndex = 0
    endIndex = firstPagePosts
    postsPerPage = firstPagePosts
  } else {
    // Subsequent pages: 9 posts each
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

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export async function getPaginatedPostsByTag(tag: string, page: number = 1, postsPerPage: number = 6): Promise<PaginatedPosts> {
  const allTagPosts = await getPostsByTag(tag)
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