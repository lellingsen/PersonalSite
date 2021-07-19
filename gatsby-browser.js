// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "fontsource-open-sans"
// normalize CSS across browsers
import "./src/styles/normalize.css"
// custom CSS styles
import "./src/styles/global.css"
// Highlighting for code blocks
import "./src/styles/prismjs-nord-theme.css"

export const onRouteUpdate = ({ location, prevLocation }) => {
  const menuToggle = document.getElementById("menu-toggle-label")
  if (!menuToggle) {
    return
  }
  menuToggle.onclick = () => {
    const openClass = "menu-open"
    if (menuToggle.classList.contains(openClass)) {
      menuToggle.classList.remove(openClass)
    } else {
      menuToggle.classList.add(openClass)
    }
  }
}
