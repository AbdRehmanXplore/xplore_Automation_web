import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getBlogBySlug, blogs } from '../data/blogs'
import '../components/Button/Button.css'
import './BlogPostPage.css'

function BlogPostPage() {
    const { slug } = useParams()
    const post = getBlogBySlug(slug)

    useEffect(() => {
        if (!post) return
        document.title = `${post.title} — Xplore Automations`

        // Update meta tags for SEO + social sharing
        const metaUpdates = {
            'description': post.metaDescription,
            'og:title': post.title,
            'og:description': post.metaDescription,
            'og:url': `https://www.xploreautomation.me/blog/${post.slug}`,
            'og:type': 'article',
            'twitter:title': post.title,
            'twitter:description': post.metaDescription,
        }
        const originalMeta = {}
        Object.entries(metaUpdates).forEach(([key, value]) => {
            const isOg = key.startsWith('og:') || key.startsWith('twitter:')
            const attr = isOg ? 'property' : 'name'
            let el = document.querySelector(`meta[${attr}="${key}"]`)
            if (el) {
                originalMeta[key] = { attr, value: el.getAttribute('content') }
                el.setAttribute('content', value)
            } else {
                el = document.createElement('meta')
                el.setAttribute(attr, key)
                el.setAttribute('content', value)
                document.head.appendChild(el)
                originalMeta[key] = { attr, value: null }
            }
        })

        // JSON-LD Structured Data for Google rich snippets
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDescription,
            author: { '@type': 'Organization', name: 'Xplore Automations' },
            publisher: {
                '@type': 'Organization',
                name: 'Xplore Automations',
                url: 'https://www.xploreautomation.me'
            },
            datePublished: post.date,
            keywords: post.tags.join(', '),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.xploreautomation.me/blog/${post.slug}`
            }
        }
        let script = document.getElementById('blog-jsonld')
        if (!script) {
            script = document.createElement('script')
            script.id = 'blog-jsonld'
            script.type = 'application/ld+json'
            document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(jsonLd)

        window.scrollTo(0, 0)
        return () => {
            const el = document.getElementById('blog-jsonld')
            if (el) el.remove()
            // Restore original meta tags
            Object.entries(originalMeta).forEach(([key, { attr, value }]) => {
                const meta = document.querySelector(`meta[${attr}="${key}"]`)
                if (meta && value !== null) meta.setAttribute('content', value)
                else if (meta && value === null) meta.remove()
            })
        }
    }, [post])

    if (!post) return <Navigate to="/blog" replace />

    const related = blogs.filter(b => b.slug !== slug && b.category === post.category).slice(0, 2)

    return (
        <div className="blog-post-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/blog">Blog</Link>
                    <span>/</span>
                    <span>{post.category}</span>
                </nav>

                <div className="blog-post-layout">
                    {/* Main Content */}
                    <article className="blog-post-article">
                        <header className="blog-post-header">
                            <div className="blog-post-meta">
                                <span className="blog-post-category">{post.category}</span>
                                <span className="mono blog-post-date">{formatDate(post.date)}</span>
                                <span className="mono blog-post-readtime">{post.readTime}</span>
                            </div>
                            <h1 className="blog-post-title">{post.title}</h1>
                            <p className="blog-post-excerpt">{post.excerpt}</p>
                            <div className="blog-post-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="blog-tag">#{tag}</span>
                                ))}
                            </div>
                        </header>

                        <div className="blog-post-content">
                            <MarkdownRenderer content={post.content} />
                        </div>

                        {/* CTA Box */}
                        <div className="blog-post-cta-box">
                            <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>READY TO AUTOMATE?</span>
                            <h3>Let's build this for your business</h3>
                            <p>Every business is different. Book a free 30-minute call and we'll map out exactly what automation could do for you — with real numbers.</p>
                            <a href="/#contact" className="btn btn-primary">Book a Free Call</a>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="blog-post-sidebar">
                        <div className="sidebar-widget">
                            <h4 className="sidebar-widget-title mono">About Us</h4>
                            <p className="sidebar-widget-text">Xplore Automations builds AI and automation systems for businesses. We've helped 20+ companies in Pakistan and globally reduce costs and scale faster.</p>
                            <a href="/#contact" className="sidebar-cta-btn">Book a Call →</a>
                        </div>

                        {related.length > 0 && (
                            <div className="sidebar-widget">
                                <h4 className="sidebar-widget-title mono">Related Posts</h4>
                                <div className="sidebar-related">
                                    {related.map(r => (
                                        <Link key={r.slug} to={`/blog/${r.slug}`} className="sidebar-related-item">
                                            <span className="sidebar-related-category">{r.category}</span>
                                            <span className="sidebar-related-title">{r.title}</span>
                                            <span className="sidebar-related-time mono">{r.readTime}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="sidebar-widget sidebar-tags-widget">
                            <h4 className="sidebar-widget-title mono">Tags</h4>
                            <div className="sidebar-tags">
                                {post.tags.map(tag => (
                                    <span key={tag} className="blog-tag">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

// Simple markdown renderer for the content
function MarkdownRenderer({ content }) {
    const lines = content.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]

        if (line.startsWith('## ')) {
            elements.push(<h2 key={i}>{line.slice(3)}</h2>)
        } else if (line.startsWith('### ')) {
            elements.push(<h3 key={i}>{line.slice(4)}</h3>)
        } else if (line.startsWith('| ')) {
            // Table
            const tableLines = []
            while (i < lines.length && lines[i].startsWith('|')) {
                tableLines.push(lines[i])
                i++
            }
            elements.push(<MarkdownTable key={i} rows={tableLines} />)
            continue
        } else if (line.startsWith('- ')) {
            const listItems = []
            while (i < lines.length && lines[i].startsWith('- ')) {
                listItems.push(lines[i].slice(2))
                i++
            }
            elements.push(
                <ul key={i}>
                    {listItems.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                    ))}
                </ul>
            )
            continue
        } else if (line.match(/^\d+\. /)) {
            const listItems = []
            while (i < lines.length && lines[i].match(/^\d+\. /)) {
                listItems.push(lines[i].replace(/^\d+\. /, ''))
                i++
            }
            elements.push(
                <ol key={i}>
                    {listItems.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                    ))}
                </ol>
            )
            continue
        } else if (line === '') {
            // skip empty lines
        } else {
            elements.push(
                <p key={i} dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
            )
        }
        i++
    }

    return <div className="blog-prose">{elements}</div>
}

function MarkdownTable({ rows }) {
    const header = rows[0].split('|').filter(c => c.trim()).map(c => c.trim())
    const body = rows.slice(2).map(row =>
        row.split('|').filter(c => c.trim()).map(c => c.trim())
    )
    return (
        <div className="blog-table-wrapper">
            <table className="blog-table">
                <thead>
                    <tr>{header.map((h, i) => <th key={i}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {body.map((row, i) => (
                        <tr key={i}>{row.map((cell, j) => <td key={j} dangerouslySetInnerHTML={{ __html: parseInline(cell) }} />)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function parseInline(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default BlogPostPage
