import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"

interface TagGroup {
  fieldValue: string
  totalCount: number
}

interface Props {
  data: {
    allMarkdownRemark: {
      group: Array<TagGroup>
    }
  }
  location: Location
}

const TagsPage = ({ data, location }: Props) => {
  const title = useSiteMetadata().title
  const allTags = data.allMarkdownRemark.group.sort((a, b) => {
    if (a.totalCount == b.totalCount) {
      return a.fieldValue.toUpperCase() < b.fieldValue.toUpperCase() ? -1 : 1
    } else {
      return b.totalCount - a.totalCount
    }
  })
  return (
    <Layout location={location} title={title}>
      <SEO title="All Tags" />
      <h2 className="text-3xl mb-8">All Tags</h2>
      <ol className="">
        {allTags.map(tag => {
          return (
            <li className="mb-4">
              Tag:{" "}
              <Link
                className="underline hover:underline"
                to={`/tag/${tag.fieldValue}`}
              >
                {tag.fieldValue}
              </Link>
              , Count: {tag.totalCount}
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query AllTags {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
