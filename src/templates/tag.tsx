import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import BlogPostListItem from "../components/blog-post-list-item"

interface Post {
  id: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    description: string
    date: string
    tags: Array<string>
  }
}

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: Array<Post>
    }
  }
  pageContext: {
    tag: string
  }
  location: Location
}

const TagTemplate = ({ data, pageContext, location }: Props) => {
  const siteTitle = useSiteMetadata().title
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={`Posts tagged with ${pageContext.tag}`}></SEO>
      <h2 className="text-3xl mb-6">Posts tagged with {pageContext.tag}:</h2>
      <ol className="list-none">
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
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query BlogPostByTag($tag: [String]) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: $tag } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
          tags
          date
        }
      }
    }
  }
`
