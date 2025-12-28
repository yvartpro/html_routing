const baseUrl = "https://capbio.bi/api/"

const loadComponent = async (source, filePath) => {
  const element = await fetch(filePath).then(html => html.text())
  document.querySelector(source).innerHTML = element
}

loadComponent("#header", "./component/header.html")
loadComponent("#footer", "./component/footer.html")
loadComponent("#posts", "./data/post.html")

export const title = "this"