export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-custom">
        <div className="footer-content">
          <p style={{ fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Data Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 