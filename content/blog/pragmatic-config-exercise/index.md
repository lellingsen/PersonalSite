---
title: Pragmatic Programmer - YAML to JSON
date: "2021-02-11"
description: "Actually following along with what a book asks me to do"
tags:
  - books
  - ruby
---

Recently, I've finally been reading a book that was recommended to me many years ago, The Pragmatic Programmer (20th anniversary edition). When I was only a couple of years into my software development career one of the more senior team members mentioned it was his favorite programming book. I made a note of it, but didn't get around to reading it until more recently. For anyone who hasn't picked up a copy, I highly recommend it; I'm about halfway through and fully plan to finish. So far it stands up there with books like Clean Code for me, instantly among my favorites.

While I'm not always at home when I'm reading it, I have been trying to make note of the exercises that would likely help even a more senior developer like myself. Whether it's testing out a new language or just reinforcing the topic that I was reading about, I'm trusting the authors to provide exercises that will be useful.

This particular one stuck out to me as something that initially sounded more work than it ended up being. In my career I've primarily developed full-scale web applications, rather than utility scripts and automation tasks - and when I have done those, it was primarily with PowerShell, and so infrequent I had to frequently go to Google for even simple operations.

## The Exercise

The prompt for this was to switch a bunch of `.yaml` files over to `.json` for a project, keeping the same name as before (minus the extension of course). I chose to use Ruby to attack this exercise as it is a language I've recently been learning, and as you can easily call it from a command prompt it seemed very appropriate. Here is my completed code:

```rb
require 'yaml'
require 'json'

ARGV.each do |dir|
  Dir["#{dir}/*yaml"].each do |file|
    file_contents = YAML.load_file(file)
    file_name = File.basename(file, ".*")
    File.open("#{dir}/#{file_name}.json", "w") do |json_file|
      json_file.write(file_contents.to_json)
    end
  end
end
```

As you can see, the solution ended up being trivially simple, even for a Ruby newbie like myself. Most of the heavy lifting is being done by the yaml and json Ruby Gems. I'm sure I did something suboptimally, but for a throwaway utility script that is perfectly fine, considering it works. Here's what's going on for anyone less familiar with Ruby:

- Loop through all of the directory names provided as command-line arguments (`ARGV.each`)
- Find each YAML file and loop over those
- Read the contents into a variable (`YAML.load_file`)
- Get a copy of what the file name is (`File.basename` - this is what I think might have a better method in particular)
- Open a new file with the same name but a `.json` extension, and write out the contents in JSON format (`json_file.write`)

So, if this is all simple, why did I decide to write about it? Even though I had a very good idea of how to complete the exercise before I started, accomplishing it reinforced two key things for me that I would like to encourage in others:

1. When looking to learn, especially by reading books, watching videos, or listening to podcasts, follow along with recommended activies. I have thought myself above such things in the past, and I'd likely be a better developer now if I hadn't.
1. Use utility and automation scripts as much as possible to avoid mundane tasks, improve your skills, and avoid human error.

Thanks for reading!
