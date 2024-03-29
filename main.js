import './style.css'

const products = [
    {
        name: "Benjaminfikus",
        price: 499,
        amount: 0,
        description: "Benjaminfikus is a plant... ",
        img: "pic/Benjaminfikus.jpg",
        alt: "benjaminfikus",
    },
    {
        name: "Citronfikus",
        price: 399,
        amount: 0,
        description: "Citronfikus is a plant...",
        img: "pic/Citronfikus.jpg",
        alt: "citronfikus",
    },
    {
        name: "Filodendron",
        price: 199,
        amount: 0,
        description: "Filodendron is a plant...",
        img: "pic/filodendron.jpg",
        alt: "filodendron",
    },
    {
        name: "Guldplam",
        price: 299,
        amount: 0,
        description: "Guldplam is a plant...",
        img: "/pic/Guldpalm.jpg",
        alt: "guldplam",
    },
    {
        name: "Nephrolepis Exaltata",
        price: 99,
        amount: 0,
        description: "Nephrolepis Exaltata is a plant...",
        img: "pic/Nephrolepis_exaltata.jpg",
        alt: "nephrolepis Exaltata",
    },
    {
        name: "Peperomia",
        price: 199,
        amount: 0,
        description: "Peperomia Exaltata is a plant...",
        img: "pic/Peperomia.jpg",
        alt: "peperomia",
    },
    {
        name: "Pinnlilja",
        price: 399,
        amount: 0,
        description: "Pinnlilja is a plant...",
        img: "pic/Pinnlilja.jpg",
        alt: "pinnlilja",
    },
    {
        name: "Porslinsblomma",
        price: 199,
        amount: 0,
        description: "Porslinsblomma is a plant...",
        img: "pic/Porslinsblomma.jpg",
        alt: "porslinsblomma",
    },
    {
        name: "Strelitzia Nicolai",
        price: 699,
        amount: 0,
        description: "Strelitzia Nicolai is a plant...",
        img: "pic/Strelitzia_nicolai.jpg",
        alt: "strelitzia nicolai",
    },
];

const productContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cartBtn');
const cartContainer = document.getElementById('cartContainer');

cartBtn.addEventListener('click', openCartContainer, false);


function openCartContainer() {
    if (cartContainer.className === "active") {
        cartContainer.className = "";
    } else {
        cartContainer.className = "active";
    }
};


function printProducts(products) {
    productContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        productContainer.innerHTML +=
            `
        <div class="plant-container">
            <h3 class="plantName"> ${products[i].name}</h3>
            <img id="imgOfPlant" class="img-of-plant" src="${products[i].img} "alt ="" /><br>
            Price: <span class="price">${products[i].price} SEK </span><br>
            <button class="remove" data-operator="minus" data-id="${i}">-</button>
            <span class="amount">${products[i].amount} st</span>
            <button class="add" data-operator="plus" data-id="${i}">+</button>
        <div>
         `;
    }

    const btnAdd = document.querySelectorAll('button[data-operator="plus"]');
    const btnReduce = document.querySelectorAll('button[data-operator="minus"]');

    for (let i = 0; i < btnAdd.length; i++) {
        btnAdd[i].addEventListener('click', addAmount)
        btnReduce[i].addEventListener('click', reduceAmount)
    }

    function addAmount(e) {
        const plantChoosed = e.currentTarget.dataset.id;
        products[plantChoosed].amount += 1;

        printProducts(products);

        let total = products[plantChoosed].amount * products[plantChoosed].price;

        cartContainer.innerHTML += "";

        let existingItem = document.getElementById(products[plantChoosed].name)

        if (existingItem) {
            existingItem.innerText = `${products[plantChoosed].name} - ${total}SEK `;
        } else {
            let p = document.createElement('p');
            p.id = products[plantChoosed].name;

            p.innerText = ` ${products[plantChoosed].name} - ${total}SEK `
            cartContainer.appendChild(p);
        }

    };

    function reduceAmount(e) {
        const plantChoosed = e.currentTarget.dataset.id;
        let amount = plantChoosed.innerHTML;

        if (amount - 1 < 0) {
            return;
        }

        if (products[plantChoosed].amount > 0) {
            products[plantChoosed].amount -= 1
        };

        printProducts(products);

        /** cart-container */
        let total = products[plantChoosed].amount * products[plantChoosed].price;

        cartContainer.innerHTML += "";

        let existingItem = document.getElementById(products[plantChoosed].name)
        // remove element from cart if price 0 SEK
        if (total === 0) {
            if (existingItem) {
                cartContainer.removeChild(existingItem);
            }
        }
        else if (existingItem) {
            existingItem.innerText = `${products[plantChoosed].name} - ${total}SEK `;
        } else {
            let p = document.createElement('p');
            p.id = products[plantChoosed].name;

            p.innerText = `${products[plantChoosed].name} - ${total}SEK `
            cartContainer.appendChild(p);
        }

    };
};

function checkOutCart() {
    let checkOutBtn = document.createElement('button')
    checkOutBtn.innerHTML = "Checkout";

    cartContainer.appendChild(checkOutBtn);
}


printProducts(products);
checkOutCart();


