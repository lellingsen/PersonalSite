import React from "react"
import { Link } from "gatsby"

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div
      data-is-root-path={isRootPath}
      className="flex flex-col h-screen justify-between text-gray-800"
    >
      <header className="mb-8 p-4 w-full bg-teal-900 text-gray-100">
        <Link to="/">
          <h1 className="text-5xl lg:w-1/2 mx-auto">{title}</h1>
        </Link>
      </header>
      <main className="w-full lg:w-1/2 mx-auto p-4 mb-auto">{children}</main>
      <footer className="w-full p-4 text-center bg-teal-900 text-gray-100">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a
          className="underline hover:underline"
          href="https://www.gatsbyjs.com"
        >
          Gatsby
        </a>
      </footer>
    </div>
  )
}

export default Layout
