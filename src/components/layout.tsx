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
      <header className="w-full bg-teal-900 text-gray-100">
        <div className="flex flex-row flex-wrap justify-between lg:w-1/2 mx-auto p-4">
          <h1 className="text-4xl">
            <Link to="/">{title}</Link>
          </h1>
          <label
            id="menu-toggle-label"
            htmlFor="menu-toggle"
            className="text-4xl cursor-pointer relative pt-5"
          >
            <span className="navicon"></span>
          </label>
        </div>
      </header>
      <div className="flex flex-row mx-auto w-full lg:w-1/2 nav-container">
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <nav role="navigation" className="nav w-full">
          <ul className="text-center bg-teal-900 text-gray-100">
            <li className="block">
              <Link
                className="block p-4 text-2xl border-gray-300 border-t-2 hover:bg-violet-800 transition-colors"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="block">
              <Link
                className="block p-4 text-2xl border-gray-300 border-t-2 hover:bg-violet-800 transition-colors"
                to="/about"
              >
                About Lars
              </Link>
            </li>
            <li className="block">
              <Link
                className="block p-4 text-2xl border-gray-300 border-t-2 hover:bg-violet-800 transition-colors"
                to="/tags"
              >
                Tags
              </Link>
            </li>
          </ul>
        </nav>
      </div>
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
        , Hosted on{" "}
        <a
          className="underline hover:underline"
          href="https://www.netlify.com/"
        >
          Netlify
        </a>
      </footer>
    </div>
  )
}

export default Layout
