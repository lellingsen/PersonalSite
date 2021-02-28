import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"

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
        tags: string[]
      }
      fields: {
        readingTime: {
          text: string
        }
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
    previous: PostNavStub
    next: PostNavStub
  }
  location: Location
}

const BlogPostTemplate = ({ data, pageContext, location }: Props) => {
  const post = data.markdownRemark
  const siteTitle = useSiteMetadata().title
  const { previous, next } = pageContext
  const gitLogLatestDate = data.markdownRemark.parent.fields?.gitLogLatestDate
  // git will be in UTC time, so want to convert to local to be the same timezone as the frontmatter date
  const localTimezoneUpdated = new Date(gitLogLatestDate).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="mb-8" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 className="text-4xl" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <p className="text-gray-600 text-sm">
            Published: {post.frontmatter.date}; Last Updated:{" "}
            {localTimezoneUpdated}
          </p>
          <p className="text-gray-600 text-sm">
            {data.markdownRemark.fields.readingTime.text}
          </p>
          <p className="text-gray-600 text-sm mb-6">
            Tags:{" "}
            {data.markdownRemark.frontmatter.tags.map(tag => {
              return (
                <Link
                  to={`/tag/${tag}`}
                  className="inline-block mr-1 underline hover:underline text-violet-900"
                >
                  {tag}
                </Link>
              )
            })}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="mb-8"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul className="flex flex-wrap justify-between list-none">
          {previous && (
            <li className="max-w-1/2 p-4 border hover:shadow-md">
              <Link to={previous.fields.slug} rel="prev">
                <p>Previous Post:</p>
                <p>← {previous.frontmatter.title}</p>
              </Link>
            </li>
          )}
          {/* Need in case previous is empty to push next to the right */}
          {!previous && <li></li>}
          {next && (
            <li className="max-w-1/2 p-4 border hover:shadow-md">
              <Link to={next.fields.slug} rel="next">
                <p className="text-right">Next Post:</p>
                <p className="text-right">{next.frontmatter.title} →</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
      fields {
        readingTime {
          text
        }
      }
      parent {
        ... on File {
          fields {
            gitLogLatestDate(formatString: "YYYY-MM-DDTHH:mm:ssZZ")
          }
        }
      }
    }
  }
`
