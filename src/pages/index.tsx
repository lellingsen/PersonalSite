import React from "react"
import { graphql } from "gatsby"

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
  location: Location
}

const BlogIndex = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

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
            ></BlogPostListItem>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
