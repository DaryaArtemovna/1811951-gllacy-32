if (document.querySelector(".promo")) {
  promo();
  modal();
}

function promo() {
  const promo = document.querySelector(".promo");
  const siteBackground = document.querySelector("body");
  const slideList = promo.querySelectorAll(".slide");
  const buttonBackwards = promo.querySelector("#buttonSliderLeft");
  const buttonForwards = promo.querySelector("#buttonSliderRight");
  const switcher = promo.querySelector(".slider-switcher");
  const switcherList = switcher.querySelectorAll(".slider-switch");
  const BG_COLORS = ["#feafc3", "#69a9ff", "#fcc850"];
  const previews = promo.querySelectorAll(".slider-preview");

  let counter = 0;
  let slideNumber = slideList.length - 1;

  function slideUpdater(type) {
    const activeSlide = promo.querySelector(".slide--active");
    const activeSwitcher = switcher.querySelector(".slider-switch--active");
    const hiddenPreview = promo.querySelector(".slider-preview--inactive");

    if (type == "forwards") {
      if (counter == slideNumber) {
        counter = 0;
      } else {
        counter++;
      }
    }

    if (type == "backwards") {
      if (counter == 0) {
        counter = slideNumber;
      } else {
        counter--;
      }
    }

    activeSwitcher.classList.remove("slider-switch--active");
    activeSlide.classList.remove("slide--active");
    hiddenPreview.classList.remove("slider-preview--inactive");
    previews[counter].classList.add("slider-preview--inactive");
    slideList[counter].classList.add("slide--active");
    switcherList[counter].classList.add("slider-switch--active");
    siteBackground.style.backgroundColor = BG_COLORS[counter];

    function icecreamReplacer() {
      const wrapper = promo.querySelector(".slider-cover");
      const raspberry = previews[0];
      const banana = previews[1];
      const marshmallow = previews[previews.length - 1];

      function defaultSlidesPosition() {
        wrapper.insertAdjacentElement("afterbegin", raspberry);
        raspberry.insertAdjacentElement("afterend", banana);
        wrapper.insertAdjacentElement("beforeend", marshmallow);
      }

      function customSlidesPosition() {
        wrapper.insertAdjacentElement("afterbegin", marshmallow);
        raspberry.insertAdjacentElement("afterend", banana);
        wrapper.insertAdjacentElement("beforeend", raspberry);
      }

      if (counter == 0) {
        defaultSlidesPosition();
      } else if (counter == 1) {
        customSlidesPosition();
      } else if (counter == 2) {
        defaultSlidesPosition();
      }
    }

    icecreamReplacer();
  }

  function buttonForwardsClickHandler(e) {
    slideUpdater("forwards");
  }

  function buttonBackwardsClickHandler(e) {
    slideUpdater("backwards");
  }

  function switchClickHandler(e) {
    counter = this.id.slice(-1) - 1;
    slideUpdater();
  }

  for (let i = 0; i < switcherList.length; i++) {
    switcherList[i].addEventListener("click", switchClickHandler);
  }

  buttonBackwards.addEventListener("click", buttonBackwardsClickHandler);
  buttonForwards.addEventListener("click", buttonForwardsClickHandler);
}

function modal() {
  const ESC = 27;
  const contactsButton = document.querySelector(".office-feedback");
  const modal = document.querySelector("#modalContacts");

  function closeModalOnEsc(e) {
    if (e.keyCode === ESC) {
      modalClose();
    }
  }

  function closeModalOnClick(e) {
    if (
      !e.target.closest(".modal-window") &&
      !e.target.closest(".office-feedback")
    ) {
      modalClose();
    }
  }

  window.addEventListener("keydown", closeModalOnEsc);
  document.addEventListener("click", closeModalOnClick);

  function modalClose() {
    modal.classList.remove("modal--show");
    modal.removeEventListener("click", modalClose);
  }

  function showModal(e) {
    e.preventDefault();
    modal.classList.add("modal--show");
    const close = modal.querySelector(".cross-button--modal");
    close.addEventListener("click", modalClose);
  }

  contactsButton.addEventListener("click", showModal);
}

function searchInput() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector("#search");
  const crossButton = searchForm.querySelector(".cross-button--search");

  function removeValue() {
    searchInput.value = "";
    crossButton.classList.remove("cross-button--show");
  }

  function checkInputValue() {
    if (this.value != "") {
      crossButton.classList.add("cross-button--show");
      crossButton.addEventListener("click", removeValue);
    } else {
      crossButton.classList.remove("cross-button--show");
    }
  }

  searchInput.addEventListener("input", checkInputValue);
}

searchInput();
