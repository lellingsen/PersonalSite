import { Link } from "gatsby"
import React from "react"

interface Props {
  slug: string
  title: string
  date: string
  description: string
  tags: Array<string>
}

const BlogPostListItem = ({ slug, title, date, description, tags }: Props) => {
  return (
    <li key={slug} className="mb-8">
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h3 className="text-3xl text-cyan-900">
            <Link to={slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h3>
          <small className="text-gray-500">
            {date}, Tags:{" "}
            {tags.map(tag => {
              return <span>{tag}&nbsp;</span>
            })}
          </small>
        </header>
        <section>
          <p itemProp="description">{description}</p>
        </section>
      </article>
    </li>
  )
}

export default BlogPostListItem
