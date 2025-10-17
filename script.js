const USERS_API = "https://api.github.com/search/users?q=";

const cardsElement = document.querySelector(".cards");
const messageElement = document.querySelector(".message");
const loaderElement = document.querySelector(".loader");
const buttonElement = document.querySelector("button");
const searchInput = document.querySelector(".input");
const usersInputElement = document.querySelector('input[value="user"]');

const setSearchResult = (data) => {
  let result = "";

  if (!data || data.length === 0) {
    result = "<p>No results found.</p>";
    cardsElement.innerHTML = result;
    return;
  }

  data.forEach((item) => {
    result += `
      <article class="card">
        <img class="img" loading="lazy" src="${item.avatar_url}" alt="${item.login}'s avatar" />
        <h2 class="name">${item.login}</h2>
        <a class="profile-link" href="${item.html_url}" target="_blank">View Profile</a>
      </article>
    `;
  });

  cardsElement.innerHTML = result;
};

const setMessage = (msg) => {
  messageElement.textContent = msg;
  messageElement.classList.add("error");
};

const getMessage = () => messageElement.textContent;

const setLoadingState = (isLoading) => {
  if (isLoading) {
    loaderElement.classList.remove("hidden");
  } else {
    loaderElement.classList.add("hidden");
  }
};

const performSearch = (searchTerm, isUserSelected) => {
  if (getMessage()) setMessage("");

  const typeQuery = isUserSelected ? "+type:user" : "+type:org";

  if (!searchTerm.trim()) {
    setMessage("Please fill out the search field 👆");
    return;
  }

  setLoadingState(true);

  fetch(`${USERS_API}${searchTerm}${typeQuery}`)
    .then((res) => res.json())
    .then((data) => setSearchResult(data.items))
    .catch(() => setMessage("Something went wrong 😢"))
    .finally(() => setLoadingState(false));
};

buttonElement?.addEventListener("click", (e) => {
  e.preventDefault();
  performSearch(searchInput.value, usersInputElement.checked);
});
