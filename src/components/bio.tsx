/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const siteMetadata = useSiteMetadata()
  const author = siteMetadata.author
  const social = siteMetadata.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="flex rounded shadow p-4 bg-gray-300 text-gray-800">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author.name || ``}
          className="mr-4 min-w-50"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author.name && (
        <p>
          Written by <strong>{author.name}</strong>, {author.summary || null}
          <br />
          {` `}
          <Link className="underline hover:underline" to="/about">
            More
          </Link>
          &nbsp;|&nbsp;
          <a
            className="underline hover:underline"
            href={`https://github.com/${social.github || ``}`}
          >
            GitHub
          </a>
          &nbsp;|&nbsp;
          <a
            className="underline hover:underline"
            href={`https://www.linkedin.com/in/${social.linkedin || ``}`}
          >
            LinkedIn
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
