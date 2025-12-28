const baseUrl = "https://capbio.bi/"

/**
 * Loads a template into a container
 * @param {string} selector - CSS selector for the container
 * @param {string} filePath - Path to the HTML file
 */
const loadComponent = async (selector, filePath) => {
  try {
    const response = await fetch(filePath)
    if (!response.ok) throw new Error(`Failed to load ${filePath}`)
    const html = await response.text()
    const container = document.querySelector(selector)
    if (container) {
      container.innerHTML = html
    }
  } catch (err) {
    console.error("Error loading component:", err.message)
  }
}

const loadPosts = async () => {
  const postsContainer = document.querySelector("#posts")
  if (!postsContainer) return

  fetch(`${baseUrl}api/post`)
    .then(resp => {
      if (!resp.ok) throw new Error(`Failed to load posts`)
      return resp.json()
    })
    .then(data => {
      const posts = data
      postsContainer.innerHTML = posts.map(post => `
      <article class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
        <div class="relative overflow-hidden group">
          <img src="${baseUrl}${post.photo}" alt="${post.title}" class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div class="p-6 flex-grow">
          <div class="flex items-center gap-2 mb-3">
             <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 uppercase tracking-wider">Tech</span>
             <span class="text-xs text-gray-400">5 min read</span>
          </div>
          <h3 class="text-xl font-bold mb-2 text-gray-900 leading-tight">${post.title}</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">${post.description}</p>
        </div>
        <div class="px-6 pb-6 mt-auto">
          <a href="#" class="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group">
            Read More 
            <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </article>
    `).join('')
    })
    .catch(err => console.error(err?.response || err.message))
}

// Initialize
const init = async () => {
  await Promise.all([
    loadComponent("#header", "./component/header.html"),
    loadComponent("#footer", "./component/footer.html")
  ])
  await loadPosts()
}

init()

export const title = "Home page is now rendered"