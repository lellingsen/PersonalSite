const attachClickHandler = () => {
  console.log("attaching click handler")
  const menuToggle = document.getElementById("menu-toggle-label")
  menuToggle.onclick = () => {
    if (menuToggle.classList.contains("menu-open")) {
      menuToggle.classList.remove("menu-open")
    } else {
      menuToggle.classList.add("menu-open")
    }
  }
}

if (document.readyState == "interactive" || document.readyState == "complete") {
  attachClickHandler()
  window.addEventListener("load", attachClickHandler, { once: false })
} else {
  document.onreadystatechange = () => {
    attachClickHandler()
  }
}
