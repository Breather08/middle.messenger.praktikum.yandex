export const setActivePage = (activePage) => {
  document.querySelector(".active-page").classList.remove("active-page");
  activePage.classList.add("active-page");
};
