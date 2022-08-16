const sectionOne = document.querySelector(".sectionOne");
const sectionTwo = document.querySelector(".sectionTwo");
const sectionCart = document.querySelector(".sectionCart");
const detailCardParent = document.createElement("div");

const url = "https://fakestoreapi.com/products";
let gotArray = [];
const menWare = [];
const womenWare = [];
const electronic = [];
const jewels = [];

fetch(url)
  .then((response) => {
    data = response.json();
    return data;
  })
  .then((data) => {
    gotArray = data;
    return gotArray;
  })
  .then((gotArray) => {
    //showing item list
    itemFun(gotArray);

    //for grouping into categories
    for (let i = 0; i < gotArray.length; i++) {
      switch (gotArray[i].category) {
        case "men's clothing":
          menWare.push(gotArray[i]);
          break;
        case "women's clothing":
          womenWare.push(gotArray[i]);
          break;
        case "electronics":
          electronic.push(gotArray[i]);
          break;
        default:
          jewels.push(gotArray[i]);
          break;
      }
    }
    categoriesFunction(menWare[0]);
    categoriesFunction(womenWare[0]);
    categoriesFunction(electronic[0]);
    categoriesFunction(jewels[0]);

    //listing in categories
    const categorySelect = document.querySelectorAll(".categoryCard");

    categorySelect.forEach((element) => {
      element.addEventListener("click", (event) => {
        const id = element.id;
        switch (id) {
          case "men's clothing":
            itemFun(menWare);
            break;
          case "women's clothing":
            itemFun(womenWare);
            break;
          case "electronics":
            itemFun(electronic);
            break;
          default:
            itemFun(jewels);
            break;
        }
      });
    });

    // categories mouseenter effect
    const categoriesPhoto = document.querySelectorAll(".categoriesPhoto");
    categoriesPhoto.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("categoriesEffect");
      });
      element.addEventListener("mouseleave", () => {
        element.classList.remove("categoriesEffect");
      });
    });

    //relisting everything after viewing category
    const showAll = document.querySelector("#showAll");
    showAll.addEventListener("click", () => {
      itemFun(gotArray);
    });

    //for search
    const searchTag = document.querySelector("#search");
    let searchItem = [];
    searchTag.addEventListener("keyup", (event) => {
      const searchText = event.target.value.toLowerCase();

      searchItem = gotArray.filter((product) => {
        return product.title.toLowerCase().includes(searchText);
      });
      itemFun(searchItem);
    });
  });

//for showing categories
const categoryParent = document.querySelector(".categoryParent");
const categoryMainParent = document.querySelector(".categoryMainParent");
const categoriesFunction = (data) => {
  const categoriesCard = `
  <div class="categoryCard" id="${data.category}">
  <div class="categoriesPhotoParent">
    <img src="${data.image}" class="categoriesPhoto">
  </div>
  <h5 class="categoryName">${data.category}</h5>
  </div>
  `;
  categoryParent.innerHTML += categoriesCard;
  categoryMainParent.style.right = `-${categoryMainParent.offsetWidth}`;

  setTimeout(() => {
    categoryMainParent.style.right = "0";
    categoryMainParent.style.transition = "all 0.8s ease-in-out";
  }, 100);
};

//for showing item
const itemList = document.querySelector("#itemList");
const itemFun = (data) => {
  itemList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const itemCard = ` 
  
  <figure class="imghvr-shutter-out-vert itemCard" id="${data[i].id}">
  <div class="cardImageParent"> 
    <img src="${data[i].image}" alt="${data[i].title}" class="cardImage"> 
  </div>
  <figcaption>
    <h4 class="ih-fade-down ih-delay-sm ">${data[i].title}</h4>
    <h5 class="ih-zoom-in ih-delay-md">
      <i>$ ${data[i].price}</i>
    </h5>
    <button class="detailButton" id="${data[i].id}">View Detail</button>
  </figcaption>
</figure>
  `;
    itemList.innerHTML += itemCard;
  }

  // showing item's detail
  const item = document.querySelectorAll(".detailButton");
  item.forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.id - 1;
      detailCardFun(gotArray[id]);
      sectionTwo.style.display = "block";
      sectionOne.style.display = "none";

      //back to main Page
      const backKey = document.querySelector(".fa-xmark");
      backKey.addEventListener("click", () => {
        sectionOne.style.display = "block";
        detailCardParent.remove();
      });
      //adding items to cart
      const cartButton = document.querySelector(".cartButton");
      cartButton.addEventListener("click", () => {
        cartButton.innerHTML = "Added to Cart!";
        console.log(id);
        addToCart(gotArray[id]);
      });
    });
  });

  //for itemCard animation
  //for itemCard animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("itemCard-animate");
        return;
      }
      entry.target.classList.remove("itemCard-animate");
    });
  });
  const cardAll = document.querySelectorAll(".itemCard");
  cardAll.forEach((element) => {
    observer.observe(element);
  });
};

//for small screen menu
const smallScreenMenu = document.querySelector("#smallMenu");
const smallOne = document.querySelector("#smallOne");
const smallTwo = document.querySelector("#smallTwo");
const smallThree = document.querySelector("#smallThree");
const logoArea = document.querySelector("#logoArea");
let click = false;
const smallMenuDiv = document.createElement("div");
smallMenuDiv.classList.add("smallMenuDiv");
const smallMenu = `
    <ul id="smallMenuList">
        <li id="smallMenuItems">About Us</li>
        <li id="smallMenuItems">Privacy Policies</li>
        <li id="smallMenuItems">Terms & Conditions</li>
        <li id="smallMenuItems">Sign Up</li>
    </ul>
  `;
smallScreenMenu.addEventListener("click", () => {
  if (click === false) {
    click = true;
    smallMenuDiv.style.display = "flex";
    smallMenuDiv.innerHTML = smallMenu;
    logoArea.append(smallMenuDiv);
    smallMenuDiv.style.top = "-110vh";
    smallMenuDiv.style.right = "0";
    setTimeout(() => {
      smallMenuDiv.style.top = "0";
      smallMenuDiv.style.transition = "all 0.4s ease-in-out";
    }, 200);
  } else {
    click = false;
    smallMenuDiv.style.top = "-110vh";
    smallMenuDiv.style.transition = "all 0.7s ease-in-out";
  }
});

//looking items in the cart
const cartImageParent = document.querySelector(".fa-cart-shopping");
cartImageParent.addEventListener("click", () => {
  sectionOne.style.display = "none";
  sectionCart.style.display = "block";
});
const exitFromCartChild = document.querySelector(".exitFromCartChild");
exitFromCartChild.addEventListener("click", () => {
  sectionCart.style.display = "none";
  sectionOne.style.display = "block";
});

// function for viewing detail
function detailCardFun(data) {
  detailCardParent.classList.add("detailCardParent");
  detailCardParent.innerHTML = "";
  const detailCard = `
  <div class="detailCard">
    <div class="detailHeader">
      <h3>${data.title}</h3>
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="detailImageAndFact">
      <img src="${data.image}" />
      <div class="detailFact">
        <ul>
          <li>${data.title}</li>
          <li>$ ${data.price}</li>
          <li>${data.category}</li>
        </ul>           
        <p><i class="fas fa-star"></i>${data.rating.rate}(${data.rating.count})</P>
        <p class="description">${data.description}</p>
      </div> 
    </div>
    <div class="cartParent"><button class="cartButton">Add to Cart!</buttom></div>
  </div>
 `;
  detailCardParent.innerHTML = detailCard;
  sectionTwo.append(detailCardParent);
}

//function to add the items into cart
const cartCount = document.querySelector(".cartCount");
let cartCountValue = 0;
// cartCount.innerHTML = cartCountValue;
const itemsInCart = document.querySelector(".itemsInCart");
function addToCart(data) {
  const cardOfItemsInCart = document.createElement("div");
  cardOfItemsInCart.classList.add("cardOfItemsInCart");
  const innerForCardOfItemsInCart = `
    <div class="cartImageContainer">
      <img src="${data.image}" alt="${data.title}" />
    </div>
    <div class="cartText">
      <h3>${data.title}</h3>
      <p>Price     : $${data.price}</p>
    </div>
  `;
  cardOfItemsInCart.innerHTML = innerForCardOfItemsInCart;
  itemsInCart.append(cardOfItemsInCart);
  cartCountValue += 1;
  cartCount.innerHTML = cartCountValue;
}
