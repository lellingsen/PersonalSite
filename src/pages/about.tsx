import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useSiteMetadata } from "../hooks/use-site-metadata"

interface Props {
  location: Location
  data: {
    avatar: {
      childImageSharp: {
        fixed: {
          base64: string
          width: number
          height: number
          src: string
          srcSet: string
        }
      }
    }
  }
}

const AboutPage = ({ location, data }: Props) => {
  const siteTitle = useSiteMetadata().title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <div className="text-center">
        <Image
          className="rounded-full"
          fixed={data.avatar.childImageSharp.fixed}
        ></Image>
      </div>
      <h1 className="text-4xl mb-4">About Me</h1>

      <p className="mb-4">
        My name is Lars Ellingsen. I live in Southern California, and I love
        being involved in creating software that helps others achieve their
        goals, become more efficient, and just make life easier. Beyond software
        development, I enjoy a number of other things as well &mdash; playing
        and watching sports (especially soccer), music (almost all genres), TV
        and movies, investments and financial markets, reading sci-fi/fantasy,
        and more.
      </p>

      <p className="mb-4">
        I am currently employed as a Senior Software Engineer at{" "}
        <a
          className="underline hover:underline"
          href="https://www.dashlane.com/"
        >
          Dashlane
        </a>
        . There are a lot of different topics and technologies that I cover in
        my day-to-day job, and I love the focus on accomplishing a goal rather
        than specific technologies or frameworks. That said, I am focused on the
        frontend using fairly standard web technologies - mostly, React and
        TypeScript.
      </p>

      <p className="mb-4">
        Prior to this role, I was an Engineering Manager for 6 years, and a Full
        Stack Web Developer for 4 years before that. My favorite aspects of
        being in a leadership position were helping my team realize their goals,
        strategizing and planning for the future, and creating a team culture
        where everyone feels secure in asking questions and giving each other
        feedback.
      </p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
