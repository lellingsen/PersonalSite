module.exports = {
  siteMetadata: {
    title: `Lars Ellingsen`,
    author: {
      name: `Lars Ellingsen`,
      summary: ` a development manager looking to get back into the technical side of things.`,
    },
    description: `A blog built with Gatsby to document a developer's journey to continue learning.`,
    siteUrl: `https://lars-ellingsen.dev/`,
    social: {
      github: `lellingsen`,
      linkedin: `lars-ellingsen-a800474b`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "text-4xl mt-8 mb-4",
                "heading[depth=2]": "text-3xl mt-8 mb-4",
                "heading[depth=3]": "text-2xl mt-8 mb-4",
                paragraph: "mb-4",
                "list[ordered=false]": "list-disc list-outside pl-4 mb-4",
                "list[ordered=true]": "list-decimal list-outside pl-4 mb-4",
              },
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-gitinfo`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        typeCheck: process.env.NODE_ENV !== "production",
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lars Ellingsen`,
        short_name: `Lars Ellingsen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/monogram-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-postcss",
  ],
}
