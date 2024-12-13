const routes = {
  "#/": "./pages/home.html",
  "#/about": "./pages/about.html",
  "#/sale": "./pages/sale.html",
  "#/jewelry": "./pages/jewelry.html",
  "#/contact": "./pages/contact.html",
  "#/login": "./pages/login.html",
};

async function loadPage(hash) {
  const route = routes[hash] || "./pages/home.html";
  try {
    const response = await fetch(route); 
    if (!response.ok) throw new Error("Page not found");
    const content = await response.text(); 
    document.getElementById("content").innerHTML = content; 
    setActiveRoute(hash);
  } catch (error) {
    document.getElementById("content").innerHTML =
      "<h1>404 - Page Not Found</h1>";
    setActiveRoute(null); 
  }
}

function setActiveRoute(activeHash) {
  document.querySelectorAll(".route").forEach((link) => {
    if (link.getAttribute("href") === activeHash) {
      link.classList.add("active"); 
    } else {
      link.classList.remove("active");
    }
  });
}

function initRouter() {
  const initialHash = window.location.hash || "#/";
  loadPage(initialHash); 
  window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash || "#/";
    loadPage(currentHash);
  });
}

document.querySelectorAll(".route").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const hash = link.getAttribute("href");
    window.location.hash = hash; 
  })
);

initRouter();
