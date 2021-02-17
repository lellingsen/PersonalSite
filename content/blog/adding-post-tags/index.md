---
title: Adding Tags to Blog Posts
date: "2021-02-14"
description: "An attempt without looking up someone else's solution"
tags:
  - typescript
  - gatsby
  - graphql
---

One feature that's been on my mind since I first was thinking about making a blog was being able to add tags to posts. I know this is a very common feature, and it made sense for a reader to be able to filter down this broad-based blog to only posts they care about - as well as potentially tell a story for related blogs that are separated by time. I assumed there were guides for how to do this in Gatsby, probably using the template I used even (as it was quite common), but I wanted to dive in and figure it out for myself. After all, the learning is the whole point, isn't it?

## Adding Tags to the Frontmatter YAML

The first step I took was to add the tags themselves to the posts I've made so far. I wanted to do this first so that I had data to play around with. After a quick search for how to do 'array' type data structures in YAML, I ended up with the following:

```yaml
---
title: Adding Tags to Blog Posts
date: "2021-02-14"
description: "An attempt without looking up someone else's solution"
tags:
  - typescript
  - gatsby
  - graphql
---

```

## Creating a "tag" Template File

From here, I wanted to make a page for each tag to show all of the blog posts that had said tag. Knowing that Gatsby is all static, I knew I was going to have to generate these at compile-time with a template, very similar to how the blog posts work. I started as I often do, with the data, and came up with this query for GraphQL:

```graphql
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
```

I'm basically just grabbing some frontmatter fields and the slug. The tricky part was how to filter. Thankfully, GraphiQL helped a lot with its auto-complete, and helped me realize that I had to pass an array of strings - `[String]` - rather than a single one, even though I didn't have a use case yet for multiple. Adding an order by was also new, as I didn't have any examples with a filter AND order by. But it ended up being easy enough, which meant the outer node became:

```graphql
allMarkdownRemark(
  filter: { frontmatter: { tags: { in: $tag } } }
  sort: { fields: [frontmatter___date], order: DESC }
)
```

Next, I made a quick and ugly template file that looked something like this (I excluded my `Props` interface for brevity, and the page query is above):

```ts
const TagTemplate = ({ data, pageContext, location }: Props) => {
  const siteTitle = useSiteMetadata().title
  return (
    <Layout location={location} title={siteTitle}>
      <div>The tag is {pageContext.tag}</div>
    </Layout>
  )
}

export default TagTemplate
```

That seemed like it would work, but I need to actually get these pages to get created by Gatsby.

## Updating the "gatsby-node.js" File

I knew it would be the gatsby-node.js file that I would have to alter to get these pages created as it was the only one which had `blog-post.tsx` referenced. However, knowing basically nothing about Gatsby when I started this site, I had to figure out what was going on. Thankfully, the documentation is good, and the names make sense enough to follow along pretty easily. Using the example of the blog post, I started adding in my own code to generate the tag pages.

However, upon trying to build my query to grab all tags, I ran into a problem. Rather than grabbing every blog post and every tag attached, and then making a singular list from there, I wanted to grab an already-processed list from GraphQL; I wasn't sure if it was possible, but it seemed like it should be given the extensible nature. I was having a hard time doing that, as I didn't have an example to go by, but eventually I managed to find the `group` option in the documentation. Once I did, it became fairly trivial, and I ended up with:

```graphql
query AllTags {
  allMarkdownRemark {
    group(field: frontmatter___tags) {
      fieldValue
    }
  }
}
```

One issue that took an embarassingly long amount of time for me to figure out was that I was not seeing any pages get created. In addition, I was getting a vague error when running `npm start` that looked like this:

> warn The GraphQL query in the non-page component
> Exported queries are only executed for Page components. It's possible you're
> trying to create pages in your gatsby-node.js and that's failing for some
> reason.

I went looking all over for documentation on what that error could mean, and kept looking over every bit of my page for a typo or mistake. I could not find any. Eventually, I resorted to start debugging in the gatsby-node.js file, as I knew it had to be something I had done there. My suspicion was that Gatsby was detecting that my `tag.tsx` template file was never being used as a page, so it was giving me a warning about having a `pageQuery` property in it.

After much frustration, I eventually realized that I had made a fairly simple mistake. Rather than:

```ts
const allTags = result.data.allMarkdownRemark.group
```

I had forgotten to drill down into the object after messing with GraphiQL, and had left it at:

```ts
const allTags = result.data
```

Once I fixed that, the warning went away, and my tag pages were building and reachable! My silly mistake had meant that there was just nothing proper to iterate over, so my creation of the pages was never firing.

## Refactoring the Blog Post List Items

Now that my tag page was working, I wanted to be able to show all of the blog posts that had that tag. Rather than reinventing the wheel, I figured it would be best to turn the post list item into a component, and use it on both the index page and this tag page. This was the first "component" I created in Gatsby, so it gave me a chance to practice some React skills. Overall, that was pretty painless, and now I only have one place to update the summary display for a post.

## Adding Links to the Tags

Finally, the last thing left was to add links to these pages. For now, I've added them only to the blog-post page itself. This ended up being pretty trivial. All that was needed was to add the tags to the GraphQL query for the post, and then add a `.map` over the array to create a Gatsby `Link` to each one.

## Comparing to the Gatsby Tutorial

Once I had successfully added tags, I wanted to compare to a tutorial to see what I could learn from their implementation. Lo and behold, I found that Gatsby has one [on their own site](https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/)! Looking through it, their example is actually extremely similar in most ways - which was definitely validating. One thing I did notice was that they used the bracket syntax for YAML collections - it's probably more natural to most developers.

In addition, they used the same GraphQL query inside of the gatsby-node.js file, but just added the second section for the tags. Personally, I split the query and creation of the blog post and tag pages into two separate functions, as otherwise, the `createPages` function becomes excessively long (in my opinion). The tutorial also utilized the `propTypes` React functionality. Finally, they made a "tags" page for all tags on posts - something I plan to do, but haven't gotten to just yet!

## Wrap Up, and What's Next

Overall, I am very happy that I took the time to do this, especially without the help of a tutorial. Doing something more complex greatly increased my understanding of how Gatsby is actually working to build the site, and gave me ideas for other types of features and sites I could build in the future using it. I feel much more confident for future changes, and encountered some fun challenges along the way.

As for what's next, I definitely want to add a "tags" page, with a count of how many pages are using each tag, in the future. Here are some other features that I have yet to get to:

- Adding pagination for posts (this is the 5th post, so it's almost a relevant feature!)
- Add "dark mode" support
- Add an RSS feed
- Experiment with the Typography library and Gatsby plugin
- Continue to improve the design of the site - a lot what has been done I'd consider MVP so far

Thanks for reading!
