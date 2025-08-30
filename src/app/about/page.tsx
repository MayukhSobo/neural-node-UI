export default function AboutPage() {
  return (
    <div className="container-custom" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#111827', marginBottom: '2rem' }}>
          About
        </h1>
        
        <div className="prose-custom">
          <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1.5rem' }}>
            Welcome to my data science blog! I&apos;m a passionate data scientist who loves exploring 
            the fascinating world of machine learning, statistics, and mathematical modeling.
          </p>
          
          <p>
            This blog serves as my digital notebook where I share:
          </p>
          
          <ul>
            <li>Data science tutorials and walkthroughs</li>
            <li>Machine learning algorithm explanations</li>
            <li>Statistical analysis techniques</li>
            <li>Mathematical derivations and proofs</li>
            <li>Code snippets and best practices</li>
          </ul>
          
          <p>
            All mathematical equations are rendered using LaTeX for clear and beautiful presentation. 
            Whether you&apos;re a fellow data scientist, student, or just curious about the field, 
            I hope you find something valuable here.
          </p>
          
          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out if you have questions about any of the content, 
            want to discuss data science topics, or have suggestions for future posts.
          </p>
        </div>
      </div>
    </div>
  )
} 