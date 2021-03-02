---
title: Creating the Navigation
date: "2021-03-01"
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

## JavaScript to Animate the Button

```js
const menuToggle = document.getElementById("menu-toggle-label")
menuToggle.onclick = () => {
  if (menuToggle.classList.contains("menu-open")) {
    menuToggle.classList.remove("menu-open")
  } else {
    menuToggle.classList.add("menu-open")
  }
}
```
