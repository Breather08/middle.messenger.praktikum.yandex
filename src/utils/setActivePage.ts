function setActivePage(activePage: Element | null) {
  document.querySelector('.active-page')?.classList.remove('active-page');
  activePage?.classList.add('active-page');
}

export default setActivePage;
