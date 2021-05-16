---
title: Creating Pagination for the Blog
date: "2021-05-16"
description: "Switching from a static index page to generated files"
tags:
  - gatsby
  - javascript
---

![Book pages](./pagination.jpg)

<p class="text-center text-sm pb-4">Photo by <a href="https://unsplash.com/@jonasjacobsson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" class="underline">Jonas Jacobsson</a> on <a href="https://unsplash.com/s/photos/pages?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" class="underline">Unsplash</a></p>

## Getting Back to It

After a long break due to big life events, I'm finally back! I've been itching to get back in to developing this site and finally found some time in my off hours to add pagination to the post listings. This being my 8th post, the home page was starting to get a little long and cumbersome.

## The Plan

I took a few minutes to analyze the steps I would need to take. I knew that with Gatsby being static, I would need to generate all of the pages to list out posts at build time. This was the same thing I did for generating the "tag" pages, so I looked back at what I had done there, and came up with this:

- Add a template file, copy most of the code from `index.tsx` (where I was currently listing out all posts)
- Change the GraphQL query to accept skip and limit params, to show a limited view of posts
- Create a hook method in `gatsby-node.js` to generate these pages
- Pick an arbitrary page size, do math for the skip/limit params, and pass them through `pageContext` so that the template file could create its query
- Delete the `index.tsx` file and create a route to `/` for page 1 of this listing, to reduce duplication

## Creating the Template File

Fortunately, I was able to copy and paste the `index.tsx` file into a new template file, and things were working pretty instantly. I only had to change a few things - I needed to reference `pageContext` within the React code, and had to update my GraphQL query to add in the skip/limit commands. I used the GraphiQL to make sure my query was working, and it ended up being pretty straightforward:

```graphql
query BlogPostsList($skip: Int, $limit: Int) {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    skip: $skip
    limit: $limit
  ) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
}
```

## Updating gatsby-node.js

Next, I had to use that template file I just created, and generate some static pages for each partial listing of blog posts. In essence, this was basically the same thing as querying for all of the blog posts to create those pages - but I only needed the count. So, I created a separate method to grab the template, and made a simple GraphQL query to grab the total count of posts:

```graphql
{
  allMarkdownRemark {
    totalCount
  }
}
```

Using this, I could see how many pages would be needed by doing a `Math.ceil` and dividing the count of pages by how many posts per page I wanted. That ended up being pretty simple, as did adding next/previous links to browse between the pages - just making sure I wasn't at the beginning (for previous) or end (for next).

Finally, I added an extra `createPage` call for the first page, with a route of `'/'`, and deleted the `index.tsx` file. This made it so that my home page was now the first page of the paginated blog posts.

## Wrapping up

With that being done, I went and looked up the [Gatsby guide to adding pagination](https://www.gatsbyjs.com/docs/adding-pagination/) to compare what I did to what is recommended. Overall, it was quite similar - especially the GraphQL changes. However, one important difference I noticed was that their example did not include links between the pages (although it did include the page context to figure it out). I'm pretty happy with the result, and that it was in line with the canonical example.

I'm not sure what I will tackle next, but there are a number of things left to add:

- Making a component of the previous/next buttons (these are in the post listings as well as the post template itself, with minor differences)
- Adding an RSS feed
- Adding support for Dark Mode

In addition, at some point I will be doing write-ups of the books I have been reading lately -- _Peopleware_, _The Manager's Path_, _Thinking, Fast and Slow_, and _The Black Swan_.
