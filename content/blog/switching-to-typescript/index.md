---
title: Switching to TypeScript
date: "2021-02-02"
description: "Replacing the default .js files with TypeScript in Gatsby"
---

One of the first orders of business that I wanted to do was switch over the template `.js` files to TypeScript. As it is the standard in Angular projects and seems ever more popular in React development as well, I felt that it would be better for my own development, especially as I haven't used TypeScript too much.

## Getting files switched off of .js

First, I had to install TypeScript globally to get the `tsc` command to work with `npm install -g typescript`. While renaming my `.js` files to `.tsx`, one thing that almost got me stuck was a type warning about "Could not find a declaration file for react-helmet." After some Google-fu, I figured out that I could run `npm install @types/react-helmet` and that would get the required declarations. I found [this blog post from LogRocket](https://blog.logrocket.com/set-up-a-typescript-gatsby-app/) quite helpful as well, as they were working with the same blog starter template.

## An observation

Something I noticed quickly was that the examples were making many of the interfaces like this:

```ts
interface Props {
  data: {
    allMarkdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}
```

The `any` type in many of these seemed to ruin the point of using TypeScript, getting compile-time warnings when properties were being misused or aren't present. So, I moved towards adding all of the property names and types in my definitions. I initially considered creating shared "model" files for each of these types, but then realized that with GraphQL, part of the intention is to only be querying the fields you need. There was no guarantee that one of these fields actually _would_ be present on my query result, unless I used the same query each time -- which, similarly, seems to go against the **dynamic** nature of GraphQL.

So, what road should I go down? Should I favor the static, predictable nature of TypeScript, or err towards the dynamic nature of GraphQL? For now, I'm going to try and strike a balance by having my objects defined for each individual query, within that page/template file. Since this is mostly new to me, I have no idea if that's the right decision, but it seems easy enough to change later. Here's an example of what that looks like for the above example:

```ts
interface Post {
  frontmatter: {
    title: string
    date: string
    description: string
  }
  fields: {
    slug: string
  }
  excerpt: string
}

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: Array<Post>
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}
```

## Next up

There are number of things remaining that I'd like to do to this site. To track these, I'm doing something else that's new for me, which is using the "Projects" feature in GitHub. It appears to be perfectly suited towards this type of simple tracking.

- Transition all styling over to [Tailwind](https://tailwindcss.com/), which I've never used before
  - This will also allow me to get rid of the default styling from the template -- which is absolutely fine, but I'd like my own
- Add pagination for the posts; not an issue now, but hopefully someday it will be
- Add tags to the posts, as well as a way to browse all posts with a given tag
- Experiment with the [Typography plugin](https://kyleamathews.github.io/typography.js/), which has a corresponding plugin for Gatsby
- Add a more full-featured "About" page to explain the site, as well as more info about me

I'm not sure when I will get to all of these, given everything else going on in my life, but hopefully it will be soon. Gatsby has been fun to work with so far!
