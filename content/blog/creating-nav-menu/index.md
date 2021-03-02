---
title: Creating the Navigation
date: "2021-03-02"
description: "Making a nav menu from scratch using Tailwind"
tags:
  - gatsby
  - tailwind
  - css
  - javascript
---

![Compass on top of Mountain](./compass.jpg)

<p class="text-center text-sm pb-4">Photo by <a class="underline" href="https://unsplash.com/@anastasia_p?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anastasia Petrova</a> on <a class="underline" href="https://unsplash.com/s/photos/navigation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>

## Getting Started

As the site was starting to get bigger, I knew some sort of navigation would be needed at some point. Once I added a dedicated page to show all tags, and I didn't have a good place to put the link to it, I knew the time had come. Not being exactly sure where to start, I came up with a few key things that I knew were going to be important:

- Focus on the mobile experience first, and worry about desktop as an afterthought
- Only use Tailwind, rather than bringing in another external library
- Write the menu from hand and understand how each piece is working, rather than using something like Tailwind UI
- Make sure that the menu works even without JavaScript enabled

Given these goals, I first went to look for some inspiration from others rather than reinventing the wheel. There are a plethora of results when searching for CSS-only navigation menus so I searched for one which most closely resembled what was in my head. My searching led me to [this site](https://1stwebdesigner.com/pure-css-navigation-menus/) which listed a number of options; one of the later ones was a "responsive hamburger menu" viewable at [this codepen](https://codepen.io/mutedblues/pen/MmPNPG) (thanks mutedblues!).

The key to basically all of these CSS-only menus was using a `<label>` element along with a hidden checkbox, which allows you to track state without JavaScript, and style accordingly. For someone who has never tackled this task before, that seemed very clever and simple to implement.

## Scaffolding the Nav into the Site

I started by adding a label, checkbox, and list to the header element of my site. This started off looking extremely rough but got me going pretty quickly. One bummer here was that I finally had to write some custom CSS, rather than _only_ using Tailwind classes.

The reason for this departure was the need for custom selectors. Namely, the method in which I was adding the hamburger menu was using the `:before, :after` selectors, and hiding and showing the navigation depended on the `input:checked` selector. While this meant I had to finally write rules in my `global.css` file, it _didn't_ mean that I had to write them all by hand. I used the new-to-me `@apply` function to add Tailwind's classes to my own, and only specified custom rules where needed. One hiccup I ran into here was some linting in my VS Code instance was not pleased with adding multiple function/mixins to one `@apply` line. While it did function correctly still, I ended up splitting them into multiple lines, like so:

```css
.nav-container input:checked ~ nav {
  @apply block;
}
```

At some point I need to dive in and figure out what add-on is causing these warnings and how to disable it. A quick search didn't reveal any results so I'm putting this on the backburner for now.

Beyond those styles which needed to be set in the CSS file due to complex selectors, I styled most of the navigation pretty easily using Tailwind. While it _does_ somewhat feel like using inline styles again, overall I'm really enjoying using Tailwind. The fast reloads with Gatsby combined with not having to context switch between files makes me feel efficient - I'm able to quickly make changes and see the results.

## Placement of the Elements

The nav was now starting to look alright on mobile. However, with the placement of my navbar being inside styled header, on desktop it felt a little off. I have the width maxed out for ease of reading on larger screens, which includes the site title and the navbar button. What that meant was that either the navigation was going to be off to the side, or that it would be centered with the same colors going across the entire width of the screen, which just looked awkward.

To remedy this I wanted to have the navigation be separate from the header. My main concern there was that the animation of the hamburger menu, as well as the appearance of the nav when clicked, were both reliant upon CSS selectors utilizing the hidden checkbox's `:checked` state, and whether those elements were adjacent to it. I made a decision to sacrifice the animation of the hamburger menu for a better display on desktop, knowing that I could animate it via JavaScript for progressive enhancement.

With this decision it was simple enough to place it below the header element, and set its container's width to be the same as what I'm doing for the text on the page. This gave it a much better feel on desktop, while leaving mobile the same as it was already satisfactory.

## JavaScript to Animate the Button

Now that I had made the decision to animate the hamburger menu with JavaScript, I needed to figure out how to do that. Knowing vanilla JS would be easy enough to add a class to the label, which could then be used to style the animation, I wrote a quick script to do so:

```js
const menuToggle = document.getElementById("menu-toggle-label")
menuToggle.onclick = () => {
  const openClass = "menu-open"
  if (menuToggle.classList.contains(openClass)) {
    menuToggle.classList.remove(openClass)
  } else {
    menuToggle.classList.add(openClass)
  }
}
```

This was my first time writing JavaScript for Gatsby, and I needed to figure out how to hook it in. My initial thought based on experience with standard sites was to put it in an external file and link it in. A quick search made me aware of how to do this using `react-helmet`, like so:

```jsx
<Helmet>
  <script src={withPrefix("script.js")} type="text/javascript" />
</Helmet>
```

While this worked for the initial page load, I immediately noticed a problem as I manually tested the site. Once I navigated away from the first page the label would no longer animate as it did not have the class being added anymore. Having worked with SPAs in the past, I assumed this meant the script was only firing on the initial page load, and HTML elements were later being dynamically added or removed without a full load, so my `onclick` event would not be bound.

Thankfully I was able to find an easy solution using the `gatsby-browser.js` file. There's an event that can be bound to called `onRouteUpdate` which fires on the initial page load as well as future navigation changes. Upon placing my code in that event, I no longer had any issues.

## Wrapping Up

Overall, this was a good experience, and helped to teach me more about Gatsby, Tailwind, and how to accomplish simple things (mostly) without JavaScript. It was enjoyable to work on adding this feature, and I'm satisfied with the result, at least for now.

While using my PR to review the changes and write this post I've noticed that I tend to do too much in each branch - I have a hard time not fixing things immediately that are unrelated to the task at hand. This is ok as I'm the only one working on the project, but I'd really like to enforce better habits in myself.

Next up, I plan on adding some more "flavor" images to the past blog posts, as well as finally implementing pagination.

Thank you for reading!
