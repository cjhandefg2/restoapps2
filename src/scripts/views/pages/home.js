import restoSource from "../../data/resto-source";
import { createRestaurantListTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    return `
      <section class="hero" aria-labelledby="hero-heading">
        <img src="images/heros/hero-image_1.jpg" alt="Hero Image" class="hero__image" />
        <div class="hero__overlay">
          <div class="hero__text">
            <h1 id="hero-heading">WWW - Warung Wisata Kuliner</h1>
            <a href="#restaurants" id="see-our-picks" class="hero__button" aria-label="See our restaurant picks">See Our Picks</a>
          </div>
        </div>
      </section>

      <section class="restaurants" id="restaurants" aria-labelledby="restaurants-heading">
        <h2 id="restaurants-heading">Restaurants</h2>
        <div class="loading" id="loading">Loading...</div>
        <div class="error-message" id="error-message"></div>
        <div class="restaurants__list" id="restaurant-list"></div>
      </section>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById("loading");
    const errorMessage = document.getElementById("error-message");
    const restaurantList = document.getElementById("restaurant-list");

    loadingIndicator.classList.add("visible");

    try {
      const restaurants = await restoSource.getRestaurants();
      loadingIndicator.classList.remove("visible");
      restaurantList.innerHTML = createRestaurantListTemplate(restaurants);
    } catch (error) {
      console.error(error);
      loadingIndicator.classList.remove("visible");
      errorMessage.textContent =
        "Failed to load restaurants. Please try again later.";
    }

    const seeOurPicksButton = document.getElementById("see-our-picks");
    if (seeOurPicksButton) {
      seeOurPicksButton.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .getElementById("restaurants")
          .scrollIntoView({ behavior: "smooth" });
      });
    }
  },
};

export default Home;
