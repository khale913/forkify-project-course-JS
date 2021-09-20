import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupHelper('next', curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupHelper('prev', curPage);
    }
    // Other page
    if (curPage < numPages) {
      return this._generateMarkupHelper('other', curPage);
    }

    // page 1, and there are NO other pages
    return '';
  }

  _generateMarkupHelper(buttonType, curPage) {
    const next = `<button data-goto="${
      curPage + 1
    }"class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    const prev = `<button data-goto="${
      curPage - 1
    }"class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;

    if (buttonType === 'next') return next;
    if (buttonType === 'prev') return prev;
    if (buttonType === 'other') return prev + next;
  }
}

export default new PaginationView();
