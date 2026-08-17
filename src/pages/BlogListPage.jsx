import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogs, getBlogCategories } from '../data/blogs'
import './BlogListPage.css'

function BlogListPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const categories = getBlogCategories()

    const filtered = activeCategory === 'All'
        ? blogs
        : blogs.filter(b => b.category === activeCategory)

    useEffect(() => {
        document.title = 'Blog — Xplore Automations'
        const desc = 'Automation insights, AI strategies, and real case data from the Xplore Automations team. Built for Pakistani businesses.'

        const metaUpdates = {
            'description': desc,
            'og:title': 'Blog — Xplore Automations',
            'og:description': desc,
            'og:url': 'https://www.xploreautomation.me/blog',
        }
        Object.entries(metaUpdates).forEach(([key, value]) => {
            const isOg = key.startsWith('og:')
            const attr = isOg ? 'property' : 'name'
            const el = document.querySelector(`meta[${attr}="${key}"]`)
            if (el) el.setAttribute('content', value)
        })

        // JSON-LD CollectionPage
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog — Xplore Automations',
            description: desc,
            url: 'https://www.xploreautomation.me/blog',
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: blogs.map((b, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `https://www.xploreautomation.me/blog/${b.slug}`,
                    name: b.title
                }))
            }
        }
        let script = document.getElementById('bloglist-jsonld')
        if (!script) {
            script = document.createElement('script')
            script.id = 'bloglist-jsonld'
            script.type = 'application/ld+json'
            document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(jsonLd)

        window.scrollTo(0, 0)
        return () => {
            const el = document.getElementById('bloglist-jsonld')
            if (el) el.remove()
        }
    }, [])

    return (
        <div className="blog-page">
            <div className="blog-page-hero">
                <div className="container">
                    <div className="blog-page-hero-inner">
                        <span className="blog-page-label mono">/ Blog</span>
                        <h1 className="blog-page-title">
                            Automation<br />
                            <span className="text-accent">Insights</span>
                        </h1>
                        <p className="blog-page-subtitle">
                            Real strategies, real numbers. Learn what's actually working for businesses using AI and automation in 2025.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Category Filter */}
                <div className="blog-filter">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Posts Grid */}
                <div className="blog-grid">
                    {filtered.map((post, i) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="blog-card"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="blog-card-top">
                                <span className="blog-card-category">{post.category}</span>
                                <span className="blog-card-read-time mono">{post.readTime}</span>
                            </div>
                            <h2 className="blog-card-title">{post.title}</h2>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <div className="blog-card-footer">
                                <span className="blog-card-date mono">{formatDate(post.date)}</span>
                                <span className="blog-card-cta">
                                    Read Article
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default BlogListPage
