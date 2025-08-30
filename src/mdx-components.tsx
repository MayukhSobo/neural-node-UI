import type { MDXComponents } from 'mdx/types'
import { MDXComponents as CustomComponents } from '@/components/blog/MDXComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...CustomComponents,
    ...components,
  }
} 