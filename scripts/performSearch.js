import getMessage from "./getMessage";
import setLoadingState from "./setLoadingState";
import setMessage from "./setMessage";
import setSearchResult from "./setSearchResults";

const USERS_API = "https://api.github.com/search/users?q=";

const performSearch = (searchTerm, isUserSelected) => {
  getMessage() && setMessage("");

  const typeQuery = isUserSelected ? "+type:user" : "+type:org";

  if (!searchTerm.trim()) {
    setMessage("Please fill out the search field 👆");
    return;
  }

  setLoadingState(true);
  fetch(`${USERS_API}${searchTerm}${typeQuery}`)
    .then((result) => result.json())
    .then((response) => setSearchResult(response.items))
    .catch(() => setMessage("Something went wrong 😢"))
    .finally(() => setLoadingState(false));

  buttonElement?.addEventListener("click", (e) => {
    e.preventDefault();
    performSearch(searchInput.value, usersInputElement.checked);
  });
};

export default performSearch;
