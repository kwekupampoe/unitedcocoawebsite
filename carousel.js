const prev = document.getElementById('prev-btn');
const next = document.getElementById('next-btn');

const productNextBtn = document.getElementById('product-next-btn');
const productPrevBtn = document.getElementById('product-prev-btn');

const list = document.getElementById('item-list');
const productList = document.getElementById('product-item-list');

const showYear = document.getElementById('show-year');

if(showYear){
  showYear.innerHTML = new Date().getFullYear();
}

const itemWidth = 150;
const padding = 10;

if (prev) {
  prev.addEventListener('click', () => {
    list.scrollLeft -= itemWidth + padding;
  });
}

if (productPrevBtn) {
  productPrevBtn.addEventListener('click', () => {
    productList.scrollLeft -= itemWidth + padding;
  });
}

if (next) {
  next.addEventListener('click', () => {
    list.scrollLeft += itemWidth + padding;
  });
}

if (productNextBtn) {
  productNextBtn.addEventListener('click', () => {
    productList.scrollLeft += itemWidth + padding;
  });
}