// const setActivePage: (activePage: object) => void = (activePage: number) => {
//   document.querySelector('.active-page')?.classList.remove('active-page');
//   activePage.classList.add('active-page');
// };

function setActivePage(activePage: Element) {
  document.querySelector('.active-page')?.classList.remove('active-page');
  activePage.classList.add('active-page');
}

export default setActivePage;
