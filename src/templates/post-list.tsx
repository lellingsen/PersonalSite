import React from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogPostListItem from "../components/blog-post-list-item"

interface Post {
  frontmatter: {
    title: string
    date: string
    description: string
    tags: Array<string>
  }
  fields: {
    slug: string
  }
  excerpt: string
}

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: Array<Post>
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  pageContext: {
    previousPage: string
    nextPage: string
  }
  location: Location
}

const BlogIndex = ({ data, pageContext, location }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const { previousPage: previous, nextPage: next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol className="list-none mt-8">
        {posts.map(post => {
          return (
            <BlogPostListItem
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              slug={post.fields.slug}
              description={post.frontmatter.description}
              tags={post.frontmatter.tags}
              key={post.fields.slug}
            ></BlogPostListItem>
          )
        })}
      </ol>
      <nav>
        <ul className="flex flex-wrap justify-between list-none">
          {previous && (
            <li className="max-w-1/2 p-4 border hover:shadow-md">
              <Link to={previous} rel="prev">
                <p>Previous</p>
                <p>←</p>
              </Link>
            </li>
          )}
          {/* Need in case previous is empty to push next to the right */}
          {!previous && <li></li>}
          {next && (
            <li className="max-w-1/2 p-4 border hover:shadow-md">
              <Link to={next} rel="next">
                <p className="text-right">Next:</p>
                <p className="text-right">→</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogPostsList($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
