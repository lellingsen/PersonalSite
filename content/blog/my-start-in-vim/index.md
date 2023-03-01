---
title: My Start in Vim
date: "2021-07-16"
description: "How I began to use Vim as my daily driver"
tags:
  - vim
---

## Context

Over the past year, I have switched from primarily using VS Code to (Neo)Vim as my default text editor. I had always been interested in learning more about editors like Vim and Emacs, after reading about the [Editor War](https://en.wikipedia.org/wiki/Editor_war) and seeing jokes on the internet about it - but until a couple years ago, I had never even worked with someone using one of them full-time. My start in industry was in writing C# on Windows. We used Visual Studio (not Code), which felt like it did half of the work for you - the language was deeply integrated into the IDE, and executed almost any command you could need. As such, I almost never needed to even open a terminal. As if to make matters worse, I did not go to school for Computer Science. I had no background in using Linux for educational purposes. The most I had to execute on the command line before my career was `ipconfig release` and `ipconfig renew` when having difficulties with a router.

Eventually, I did write a number of PowerShell scripts and the like, and slowly got more experience in a terminal. However that got cut short when I transitioned into management after 4 years as a developer; my days became all meetings, 1:1s, strategy documents, and performance reviews. So, when I switched companies and saw a couple of colleagues _actually using Vim_ I was delighted. Their speed in editing files seemed to be on a whole other level; suffice it to say that I was impressed. Not only were they able to get more work done, they seemed even more comfortable than others on the command line. Now that I was working in a React/Next.js project, that seemed critical - my IDE could no longer do everything for me.

It was around this time that I also happened to listen to my favorite episode of the Changelog - [Why we <3 Vim](https://changelog.com/podcast/450). These things happening at the same time seemed to be a message. I was interested in the possibility of switching back to being an engineer, and knew that I would need to become more technical, and with that, more comfortable in a terminal. My thought was that learning Vim would help me to learn new things, become more comfortable on the command line, and possibly help me learn about code at a more fundamental level.

## What is this VIM thing?

Before I continue, a quick segue for those who don't know much about Vim. The full name is actually "Vi iMproved" - you can read more on [Wikipedia](<https://en.wikipedia.org/wiki/Vim_(text_editor)>) about the history if you prefer, but here are some important highlights:

- It runs in the terminal
- It is cross-platform
- It has been around since 1991, with the predecessor Vi being around since 1976
- It is keyboard-focused, and while there is some mouse support, users are expected to be using the keyboard exclusively
- It has a rich plugin system that can help it become more IDE-like, and is also extremely extensible if you want to customize it further
- It has different "modes" for working with text - by default, you are assumed to be navigating the file, not editing it

With that out of the way, let's get into how these things could be considered advantageous to someone wanting to learn Vim.

## Why would you bother learning that?

As I stated earlier, one of the main reasons I wanted to learn Vim was to become more comfortable in the shell. Using an editor that is only _available_ in the terminal has certainly helped with that. As you're already in a terminal, it becomes exceedingly simple and easy to either "minimize" Vim with `ctrl + z` to get back to the terminal, or switch tabs (using iTerm2) and execute commands. This has helped me become more comfortable with a variety of command-line tools - `yarn`, `pnpm`, the `git` CLI rather than VS Code's UI, `jest`, and more. It feels more in line with the [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and helps all of these tools feel like they work together seamlessly, rather than worrying about whether or not something has a VS Code plugin. I think many developers would see this as a con - but so far, I've really been enjoying it. In addition, because everything is text-based, it is extremely quick; opening the monorepo I work in with Vim is an order of magnitude faster than opening it with VS Code, even with all of the plugins I have.

Another primary benefit is the "modal" nature of Vim. It is more complicated than this, but there are three main modes: Normal, Insert, and Visual (which has some sub-modes). In Normal mode, you are navigating through the file(s). When you press "w", for example, a "w" will not appear in the document - instead, your cursor will jump forward a word. As a software engineer, this is _actually_ how I spend the majority of my time. Most people dealing with code are not hammering away writing new lines of code all day; as such, I find it extremely useful to have my keyboard help me navigate the code more efficiently, making it much faster to jump around and understand what's going on. Insert mode is what you would expect from a text editor - what you type will be inserted into the document. And finally, you can think of Visual mode as highlighting - there are some submodes within it (visual, visual-line, visual-block) that help you be more precise in what you want to do, but you are essentially selecting a chunk of a file. This clear distinction between modes helps me with a few things:

- It aids me in more quickly navigating through files
- I'm encouraged to be more deliberate in what I am doing (reading vs. writing code)
- Selecting parts of a document, especially with a keyboard, is much easier
  - For example, if I want to replace the contents of an array, once my cursor is inside the array, I can type `ci[` (cut inside brackets) and begin typing the new contents of that array

Finally, the other largest benefit for me is Vim's longevity. While one can never be certain, my impression is that I will be using Vim until I retire (or some spinoff of it, like I am already doing with Neovim). Vi itself has been around much longer than I've been alive already, and the community is so dedicated to Vim and its grammar that I have no doubts it will continue to live on in some form. Similarly, because of that devotion from its users, Vim is not language- or platform-specific. If next week I get a new job using Go, Rust, or Java, I could continue using Vim and be similarly effective. This does seem more common with editors like Code and Fleet, but wasn't always (IntelliJ, Visual Studio, etc.). All that to say, the time I'm investing in becoming efficient with Vim should pay back dividends over decades to come. And, for those who have to `ssh` into servers or IoT devices, `vim` or `vi` are almost certainly available in those contexts - which means that editing files on devices other than your own is that much easier.

## Downsides

While Vim does have some great benefits, nothing comes without costs. One cost with learning Vim is that you will almost certainly be slower at first. It takes time to adjust to not using a mouse, as well as learning the Vim "grammar." I believe this is one of the big hurdles that prevents many who try out Vim from sticking with it.

Another more major downside is that getting to a comparable feature set in terms of IDE functionality is more complicated and less documented than with something like VS Code. It's likely that there won't be many other people you know using Vim you can ask for help, and it can be tough to learn Vimscript or Lua (with Neovim) just to setup your editor. I think for many of us engineers who like to "tinker" anyways this is not a huge deal, but it is absolutely something to note. Fortunately, there are now things like [Kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) which was created by one of the primary maintainers of Neovim (TJ DeVries). This is a relatively simple script that allows someone to get started with an extremely useful set of plugins right away, without having to first learn how to even set that up - and is a big reduction in getting up to speed quickly with Neovim! TJ also put up a great [YouTube video](https://www.youtube.com/watch?v=stqUbv-5u2s) that serves as an overview for Kickstart.

For those who collaborate often with others, using a different editor can be disruptive. Even more so when that editor is a modal one, unlike most others available. It seems that the rise in remote work has lessened this problem - as you are less often at the same keyboard as your teammates - but it is still something to consider. If this is a big problem for you, one option to consider is using a VIM bindings plugin within a tool like VS Code or WebStorm. While I still prefer using full-fledged Neovim, this can be a nice middle ground - as well as a great way to dip your toes in the Vim water.

Lastly, one problem I did not consider when embarking on this journey was the frustration when I switch to a program that does not have VIM bindings. For example, when I use Google Docs I find myself missing normal/visual mode a lot. This is not so much a knock on Vim, but once you are used to how great modal editing is, you're going to want it everywhere!

## Joys

In addition to the benefits I highlighted above, there are a number of other things that I consider secondary or that might surprise people after they switch. One of those is that you get to get to look like a wizard to your colleagues who have never seen someone editing files in a terminal! I distinctly remember having this feeling myself when I watched a coworker use a COBOL debugger on a server, navigating extremely quickly with only his keyboard. While this won't help you be a better engineer, it can certainly be something that's just _cool_. I do think there is value in that, even if it just means you enjoy the minutiae of your job a little bit more.

When you start using Vim, you also become part of a community. If your company is a decent size, there is a good chance that there are at least a few other Vim users, possibly even a Slack channel. It gives you one more thing to bond over with your fellow engineers in a way that editors like VS Code do not.

I've also found that I understand the technology I'm working with a little bit more using Vim. This is perhaps a pro to the con listed above - setting up your environment can be a little bit difficult, but in that difficulty you can learn more about things like how syntax highlighting actually works, debuggers, and linting in a way that you don't when you just have to click "install" in a GUI and have things taken care of for you. There may not be huge benefits here, but for those of us who like to dig deep it can be a nice forcing function.

If you like to setup your development environment to be "just so," Vim can also be very helpful in getting there. Just about everything can be customized and personalized. While this is _possible_ in some other editors, in Vim it is _expected_ in a way that is probably surpassed only by Emacs (which some liken to an operating system!). TJ DeVries also has a great video on this topic which he calls a [Personalized Development Environment](https://www.youtube.com/watch?v=QMVIJhC9Veg). While some may look at this kind of tinkering as a waste of time, I know there are a number of engineers who simply have **fun** doing it.

## Recommendations

If you've read this and are now interested in learning more, I'd recommend listening to that [Changelog episode listed above](https://changelog.com/podcast/450), checking out some videos on YouTube like [ThePrimeagen's playlist on learning Vim](https://www.youtube.com/watch?v=X6AR2RMB5tE&list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R), or try out [vimtutor](https://superuser.com/questions/246487/how-to-use-vimtutor). If you know someone who uses Vim as their editor, they'd obviously be a great resource - and, chances are, they'll be happy to discuss Vim with you (it can be a bit of a cult).

For anyone who is ready to jump in, I would recommend installing Neovim and then using the [Kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) repo mentioned earlier to get going quickly. It's a great jumping off point and drastically lowers the switching costs, helping you to be productive more quickly.

If even that is too much, configuring your current editor to use Vim bindings is also a great place to try things out. There is an option for [VS Code](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim), [JetBrains products](https://www.jetbrains.com/help/webstorm/vim-emulation.html), and even some non-code apps like [Obsidian](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Vim+users). Even Emacs, Vim's archrival, has a frequently-used package [to enable Vim/Vi-like bindings](https://github.com/emacs-evil/evil).

## What's next for me?

Learning Vim has been great, but there is still a lot for me to expand on. While I'm pretty happy with my setup, there is already a new generation of plugins like [Mason](https://github.com/williamboman/mason.nvim) which I should switch to. In addition, I need to spend some time with attaching debuggers to Neovim - it looks relatively easy with the DAP (debugger adapter protocol), but I just haven't yet as I primarily debug in browser developer tools.

Beyond Neovim, I'm now beginning to learn [tmux](https://github.com/tmux/tmux/wiki) as well, which is an incredible tool for managing terminal sessions. The combination of the two looks to be a "bread and butter" type of matchup, and seems like it could add even more fluidity and flexibility to my daily workflow. When the time comes, I look forward to writing about it here!
