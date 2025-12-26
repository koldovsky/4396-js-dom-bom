const stickers = [
    {
        id: 1,
        name: 'Baby Yoda',
        imageUrl: 'img/baby-yoda.svg',
        price: 5.99,
        description: 'A cute Baby Yoda sticker to brighten your day.'
    },
    {
        id: 2,
        name: 'Banana',
        imageUrl: 'img/banana.svg',
        price: 3.99,
        description: 'A fun banana sticker for your collection.'
    },
    {
        id: 3,
        name: 'Girl',
        imageUrl: 'img/girl.svg',
        price: 4.99,
        description: 'A lovely girl sticker with vibrant colors.'
    },
    {
        id: 4,
        name: 'Viking',
        imageUrl: 'img/viking.svg',
        price: 6.99,
        description: 'A fierce viking sticker ready for adventure.'
    }
];

function renderProductList(products) {
    const productsHTML = [];
    for (const product of products) {
        productsHTML.push(`
        <article class="products__item">
            <img class="products__image" src="${product.imageUrl}" alt="${product.name}">
            <h3 class="products__name">${product.name}</h3>
            <p class="products__description">${product.description}</p>
            </p>
            <div class="products__actions">
                <button class="products__button products__button--info button button-card">
                    Info
                </button>
                <button class="products__button products__button--buy button button-card">
                    Buy  $${product.price.toFixed(2)}
                </button>
            </div>
        </article>
            `);
    }
    productsHTML.sort(() => Math.random() - 0.5); // Shuffle the products
    const productListContainer = document.querySelector('.products__list');
    productListContainer.innerHTML = productsHTML.join('');
}

renderProductList(stickers);