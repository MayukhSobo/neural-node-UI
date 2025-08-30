'use client'

import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from './MDXComponents'

interface MDXProviderWrapperProps {
  children: React.ReactNode
}

export default function MDXProviderWrapper({ children }: MDXProviderWrapperProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <div className="prose-custom">
        {children}
      </div>
    </MDXProvider>
  )
} 