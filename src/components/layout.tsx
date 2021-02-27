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
      <header className="mb-8 pt-4 px-4 w-full bg-teal-900 text-gray-100">
        <div className="flex flex-row flex-wrap justify-between lg:w-1/2 mx-auto pb-4">
          <h1 className="text-5xl">
            <Link to="/">{title}</Link>
          </h1>
          <label htmlFor="menu-toggle" className="text-5xl cursor-pointer">
            Menu
          </label>
        </div>
        <div className="flex flex-row mx-auto">
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <nav role="navigation" className="nav w-full mt-4">
            <ul className="text-center">
              <li className="block p-4 text-2xl border-gray-400 border-t-2">
                <Link to="/">Home</Link>
              </li>
              <li className="block p-4 text-2xl border-gray-400 border-t-2">
                <Link to="/about">About Lars</Link>
              </li>
              <li className="block p-4 text-2xl border-gray-400 border-t-2">
                <Link to="/tags">Tags</Link>
              </li>
            </ul>
          </nav>
        </div>
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
