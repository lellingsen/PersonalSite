---
title: Converting to Tailwind CSS
date: "2021-02-05"
description: "Ripping out all of the default styles and replacing with Tailwind CSS"
---

I wanted to try out Tailwind CSS due to some articles and comments I had read on Reddit. The idea of using a more flexible, utility-based CSS sounded very enticing to me. I've been using Bootstrap since it was in v2 (and was still called "Twitter Bootstrap") but had been frustrated many times in the past when I wanted to customize it past defaults, and struggled or had to be overly specific in my style rules.

## My background

First, some background on my experience with HTML and CSS for reference to anyone interested in checking out Tailwind. When I was first learning how to develop professionally, one of the first things I did was read "CSS: The Missing Manual" back in 2012, and proceeded to write my own CSS as these larger frameworks like Bootstrap weren't the norm, and I didn't even know about them. A year or so later, I began using Bootstrap as a way to have better, cleaner looking UIs at a much quicker pace -- but the result of that is many of our applications ended up looking very similar to each other.

All that being said, I do have a fundamental understanding of CSS properties - especially the ones that have been around a while. With Tailwind, it does seem like that is important, as you are basically composing your CSS properties together in your HTML. So far, I am absolutely enjoying it, as I feel more in control, and like I'm able to be more creative and expressive.

## Styling the layout/components

## Styling the blog posts

With Gatsby, at least in my setup, the blog posts themselves are just Markdown files that are getting compiled into HTML with `remark`. As such, I wasn't able to simply modify a template to add the Tailwind classes in. The first instinct I had was to add a wrapper class around the whole blog post, and style all of the tags underneath that class using `@apply` and the Tailwind classes I wanted. However, that seemed to go against the spirit of Tailwind and staying out of CSS sheets as much as possible, and could introduce specificity issues later on.

Instead, I found a plugin called [gatsby-remark-classes](https://www.gatsbyjs.com/plugins/gatsby-remark-classes/) which allowed me to add the Tailwind classes to the compiled HTML by specifying them in my `gatsby-config.js` file. This way any header, paragraph, and so on could have the desired classes added to them, as I would do in a template.
