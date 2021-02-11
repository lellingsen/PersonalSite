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
        I am currently employed as a manager of software developers, and have
        been in the IT industry for {new Date().getFullYear() - 2012} years, the
        first 4 of which were as a full-stack web developer. My favorite aspects
        of being in a leadership position are helping my team realize their
        goals, strategizing and planning for the future, and creating a team
        culture where everyone feels secure in asking questions and giving each
        other feedback. That being said, I do miss writing software myself and
        the creative itches it scratched; hence, I've created this blog to help
        keep myself accountable to continuing to learn and develop my technical
        skills, and scratch that itch during my personal time.
      </p>
      <p className="mb-4">
        While working as a software developer professionally, I was primarily
        working with JavaScript/HTML/CSS, ASP.NET on the server-side, and Oracle
        backends. Given the dynamic nature of web development, I was able to see
        my front-ends develop from primarily .aspx pages with C# code-behinds to
        AngularJS SPAs. While I've been keeping up with new frameworks,
        libraries, etc. from a reading perspective, I'm using this site as an
        excuse to try some of them out on an actual project, such as React,
        GraphQL, and Tailwind CSS.
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
