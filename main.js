// Hover to create falling flowers
document.querySelector(".classnamep").addEventListener("mouseenter", function () {
    const div = this;
  
    for (let i = 0; i < 30; i++) {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.style.setProperty("--start", Math.random());
      flower.style.setProperty("--end", Math.random());
      flower.style.animationDuration = `${3 + Math.random() * 2}s`;
      flower.style.animationDelay = `${Math.random() * 3}s`;
  
      div.appendChild(flower);
  
      // Cleanup after animation
      setTimeout(() => flower.remove(), 5000); // 5 seconds is sufficient
    }
  });
  
  // Random product display
  document.addEventListener("DOMContentLoaded", () => {
    const allProducts = document.querySelectorAll(".all-products .product");
    const flowerSection = document.getElementById("flower-section");
    const numberOfProductsToShow = 4; // Show 4 random products
  
    const selectedProducts = [];
    while (selectedProducts.length < numberOfProductsToShow) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const randomProduct = allProducts[randomIndex];
  
      // Avoid duplicates
      if (!selectedProducts.includes(randomProduct)) {
        selectedProducts.push(randomProduct.cloneNode(true));
      }
    }
  
    // Append random products to the flower section with animation
    selectedProducts.forEach((product, index) => {
      product.style.opacity = "0";
      product.style.transform = "scale(0.5)";
      product.style.animation = `productAppear 1.5s ease-out forwards`;
      product.style.animationDelay = `${index * 0.3}s`; // Staggered animation
      flowerSection.appendChild(product);
    });
  });
  
  // "Buy" button functionality
  function generate() {
    alert("Please Check after Few days");
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const allProducts = Array.from(document.querySelectorAll(".all-products .product"));
    const flowerSection = document.getElementById("flower-section");
    const numberOfProductsToShow = 3; // Number of products to display
  
    // Shuffle the products array and pick the first `numberOfProductsToShow`
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    const selectedProducts = shuffledProducts.slice(0, numberOfProductsToShow);
  
    // Append products with left/right animation
    selectedProducts.forEach((product, index) => {
      const clonedProduct = product.cloneNode(true); // Clone to preserve original
      const direction = index % 2 === 0 ? "left" : "right";
      clonedProduct.classList.add(`slide-${direction}`);
  
      // Style and animation setup
      clonedProduct.style.opacity = "0";
      clonedProduct.style.position = "relative";
      clonedProduct.style.animation = `slideFrom${capitalize(direction)} 1.5s ease-out forwards`;
      clonedProduct.style.animationDelay = `${index * 0.3}s`; // Stagger animations
      flowerSection.appendChild(clonedProduct);
    });
  });
  
  // Utility function to capitalize strings
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
