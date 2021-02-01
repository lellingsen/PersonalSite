---
title: Switching to TypeScript
date: "2021-02-05"
description: "Replacing the default .js files with TypeScript in Gatsby"
---

One of the first orders of business that I wanted to do was switch over the template `.js` files to TypeScript. As it is the standard in Angular projects and seems ever more popular in React development as well, I felt that it would be better for my own development, especially as I haven't used TypeScript too much.

First, I had to install TypeScript globally to get the `tsc` command to work with `npm install -g typescript`. While renaming my `.js` files to `.tsx`, one thing that almost got me stuck was a type warning about "Could not find a declaration file for react-helmet." After some Google-fu, I figured out that I could run `npm install @types/react-helmet` and that would get the required declarations.
