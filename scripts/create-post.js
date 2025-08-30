#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function createPost() {
  console.log('📝 Creating a new blog post...\n');

  try {
    const title = await question('Post title: ');
    const excerpt = await question('Post excerpt: ');
    const tagsInput = await question('Tags (comma-separated): ');
    
    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const slug = slugify(title);
    const date = formatDate(new Date());
    
    const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
published: true
---

# ${title}

${excerpt}

## Introduction

Start writing your content here...

## Mathematical Equations

You can include inline math like $E = mc^2$ or block equations:

$$\\frac{\\partial J}{\\partial \\theta} = \\frac{1}{m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)}) x^{(i)}$$

## Code Examples

\`\`\`python
import numpy as np
import pandas as pd

# Your code here
def example_function():
    return "Hello, Data Science!"
\`\`\`

## Conclusion

Wrap up your thoughts here...
`;

    const postsDir = path.join(process.cwd(), 'content', 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    const filename = `${slug}.mdx`;
    const filepath = path.join(postsDir, filename);

    if (fs.existsSync(filepath)) {
      console.log(`\n❌ Error: Post with slug "${slug}" already exists!`);
      process.exit(1);
    }

    fs.writeFileSync(filepath, frontmatter);
    
    console.log(`\n✅ Success! Created new post:`);
    console.log(`   File: content/posts/${filename}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   URL: http://localhost:3000/posts/${slug}`);
    console.log(`\n📝 You can now edit the file and add your content!`);
    
  } catch (error) {
    console.error('\n❌ Error creating post:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createPost(); 