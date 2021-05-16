const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const createBlogPostPages = async (graphql, createPageAction, reporter) => {
  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPageAction({
        path: post.fields.slug,
        component: blogPost,
        context: {
          slug: post.fields.slug,
          previous,
          next,
        },
      })
    })
  }
}

const createPostListPages = async (graphql, createPageAction, reporter) => {
  const postList = path.resolve(`./src/templates/post-list.tsx`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts for lists`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  if (posts.length > 0) {
    const postsPerPage = 3
    const pageCount = Math.ceil(posts.length / postsPerPage)

    for (let i = 1; i <= pageCount; i++) {
      const previous = i > 1 ? i - 1 : null
      const next = i < pageCount ? i + 1 : null
      const params = {
        path: `/posts/${i}`,
        component: postList,
        context: {
          skip: (i - 1) * postsPerPage,
          limit: postsPerPage,
          previous: previous !== null ? `/posts/${previous}` : null,
          next: next !== null ? `/posts/${next}` : null,
        },
      }
      createPageAction(params)
      if (i === 1) {
        params.path = "/"
        createPageAction(params)
      }
    }
  }
}

const createTagPages = async (graphql, createPageAction, reporter) => {
  const tagTemplate = path.resolve(`./src/templates/tag.tsx`)

  const result = await graphql(
    `
      query AllTags {
        allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your tags`, result.errors)
    return
  }

  const allTags = result.data.allMarkdownRemark.group

  if (allTags.length > 0) {
    allTags.forEach(tagField => {
      tag = tagField.fieldValue
      createPageAction({
        path: `/tag/${tag}`,
        component: tagTemplate,
        context: {
          tag: tag,
        },
      })
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  await createBlogPostPages(graphql, createPage, reporter)
  await createTagPages(graphql, createPage, reporter)
  await createPostListPages(graphql, createPage, reporter)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String,
      github: String,
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `)
}
