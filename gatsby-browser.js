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
  menuToggle.onclick = () => {
    if (menuToggle.classList.contains("menu-open")) {
      menuToggle.classList.remove("menu-open")
    } else {
      menuToggle.classList.add("menu-open")
    }
  }
}
