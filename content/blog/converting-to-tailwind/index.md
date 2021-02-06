---
title: Converting to Tailwind CSS
date: "2021-02-06"
description: "Ripping out all of the default styles and replacing with Tailwind CSS"
---

I wanted to try out Tailwind CSS due to some articles and comments I had read on Reddit. The idea of using a more flexible, utility-based CSS sounded very enticing to me. I've been using Bootstrap since it was in v2 (and was still called "Twitter Bootstrap") but had been frustrated many times in the past when I wanted to customize it past defaults, and struggled or had to be overly specific in my style rules.

## My background

First, some background on my experience with HTML and CSS for reference to anyone interested in checking out Tailwind. When I was first learning how to develop professionally, one of the first things I did was read "CSS: The Missing Manual" back in 2012, and proceeded to write my own CSS as these larger frameworks like Bootstrap weren't the norm, and I didn't even know about them. A year or so later, I began using Bootstrap as a way to have better, cleaner looking UIs at a much quicker pace -- but the result of that is many of our applications ended up looking very similar to each other.

All that being said, I do have a fundamental understanding of CSS properties - especially the ones that have been around a while. With Tailwind, it does seem like that is important, as you are basically composing your CSS properties together in your HTML. So far, I am absolutely enjoying it, as I feel more in control, and like I'm able to be more creative and expressive.

## Styling the layout/components

While it definitely took some used to, using Tailwind on most of the components was pretty straightforward. The documentation for Tailwind is very easy to search by property, which made it quick to find what I needed. It's been a while since I've designed a site myself rather than just giving input on what has been done, which became clear in the lackluster pop that it has so far. Tailwind has made it nice to not have to switch back and forth between the HTML and CSS, though, while avoiding the developer hell that are inline-styles. There's certainly something to be said for staying in the same file and avoiding the context switching that can easily happen otherwise.

All in all I was able to replace the 300-line custom CSS file that comes with the starter template with the default 3-line "import" Tailwind file, while getting a more customized look and feel. I'll have to continue to work on the design for the future. For now, I'm sticking with the default colors that Tailwind offers.

## Styling the blog posts

With Gatsby, at least in my setup, the blog posts themselves are just Markdown files that are getting compiled into HTML with `remark`. As such, I wasn't able to simply modify a template to add the Tailwind classes in. The first instinct I had was to add a wrapper class around the whole blog post, and style all of the tags underneath that class using `@apply` and the Tailwind classes I wanted. However, that seemed to go against the spirit of Tailwind and staying out of CSS sheets as much as possible, and could introduce specificity issues later on.

Instead, I found a plugin called [gatsby-remark-classes](https://www.gatsbyjs.com/plugins/gatsby-remark-classes/) which allowed me to add the Tailwind classes to the compiled HTML by specifying them in my `gatsby-config.js` file. This way any header, paragraph, and so on could have the desired classes added to them, as I would do in a template. In the end, this worked out pretty well, except that the Gatsby development environment has to refresh each time, which makes the feedback cycle much slower than styling in normal component files. Here's what the options node in `gatsby-transformer-remark` looked like for it:

```js
{
  resolve: `gatsby-remark-classes`,
  options: {
    classMap: {
      "heading[depth=1]": "text-4xl mt-8 mb-4",
      "heading[depth=2]": "text-3xl mt-8 mb-4",
      "heading[depth=3]": "text-2xl mt-8 mb-4",
      paragraph: "mb-4",
      "list[ordered=false]": "list-disc list-outside pl-4 mb-4",
    },
  },
},
```

## Wrapping Up

I feel good about the direction the site is taking, and my ability to further improve the design in the future. My updated to-do list for it looks like this:

- Add in support for "dark mode"
- Add pagination for the posts; not an issue now, but hopefully someday it will be
- Add tags to the posts, as well as a way to browse all posts with a given tag
- Experiment with the [Typography plugin](https://kyleamathews.github.io/typography.js/), which has a corresponding plugin for Gatsby
- Add a more full-featured "About" page to explain the site, as well as more info about me

Thanks for reading!
