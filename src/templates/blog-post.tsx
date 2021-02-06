import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface PostNavStub {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        description: string
        date: string
      }
      excerpt: string
      html: string
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  pageContext: {
    previous: PostNavStub
    next: PostNavStub
  }
  location: Location
}

const BlogPostTemplate = ({ data, pageContext, location }: Props) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="mb-4" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 className="text-4xl" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul className="flex flex-wrap justify-between list-none">
          <li className="p-4 hover:shadow-md">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <p>Previous Post:</p>← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="p-4 hover:shadow-md">
            {next && (
              <Link to={next.fields.slug} rel="next">
                <p className="text-right">Next Post:</p>
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
