import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"

interface Props {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        description: string
        date: string
        tags: string[]
      }
      excerpt: string
      html: string
      parent: {
        fields: {
          gitLogLatestDate: string
        }
      }
    }
  }
  pageContext: {
    tag: string
  }
  location: Location
}

const TagTemplate = ({ data, pageContext, location }: Props) => {
  const siteTitle = useSiteMetadata().title
  return (
    <Layout location={location} title={siteTitle}>
      <div>The tag is {pageContext.tag}</div>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query BlogPostByTag($tag: [String]) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: $tag } } }) {
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
