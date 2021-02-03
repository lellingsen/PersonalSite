import { useStaticQuery, graphql } from "gatsby"

interface Site {
  siteMetadata: SiteMetadata
}

interface SiteMetadata {
  title: string
  description: string
  author: {
    name: string
    summary: string
  }
  social: {
    github: string
    linkedin: string
  }
}

export const useSiteMetadata = () => {
  const { site }: { site: Site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            author {
              name
              summary
            }
            social {
              github
              linkedin
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
