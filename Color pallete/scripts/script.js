document.addEventListener("DOMContentLoaded", function () {
  const colorBoxes = document.querySelectorAll(".color-box");
  const toggleTextCheckbox = document.getElementById("toggleText");
  const toggleBorderCheckbox = document.getElementById("toggleBorder");

  let changeText = true;
  let changeBorder = false;

  toggleTextCheckbox.addEventListener("change", function () {
    changeText = this.checked;
  });
  toggleBorderCheckbox.addEventListener("change", function () {
    changeBorder = this.checked;
  });

  colorBoxes.forEach((clickedBox) => {
    clickedBox.addEventListener("click", function (event) {
      const colorElement =
        event.currentTarget.querySelector(".color-box__color");
      let clickedColor;
      const computedStyle = getComputedStyle(colorElement);
      if (
        computedStyle.backgroundColor &&
        computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
      ) {
        clickedColor = computedStyle.backgroundColor;
      } else if (
        computedStyle.backgroundImage &&
        computedStyle.backgroundImage !== "none"
      ) {
        clickedColor = computedStyle.backgroundImage;
      }
      if (clickedColor) {
        console.log(clickedColor);
      }

      const h2Elements = document.querySelectorAll("h2");
      h2Elements.forEach((h2) => {
        if (changeText) {
          if (
            computedStyle.backgroundColor &&
            computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
          ) {
            h2.style.color = clickedColor;
            h2.style.backgroundImage = "";
          } else if (
            computedStyle.backgroundImage &&
            computedStyle.backgroundImage !== "none"
          ) {
            h2.style.backgroundImage = clickedColor;
            h2.style.backgroundClip = "text";
            h2.style.webkitBackgroundClip = "text";
            h2.style.color = "transparent";
          }
        }
        if (changeBorder) {
          h2.style.borderColor = clickedColor;
        }
      });
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        if (
          section.querySelector(".font-sizes-container") ||
          section.querySelector(".spacings-container") ||
          section.querySelector(".shadows-container")
        ) {
          const allLiElements = section.querySelectorAll("ul li");
          allLiElements.forEach((liElement) => {
            if (changeText) {
              if (
                computedStyle.backgroundColor &&
                computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
              ) {
                liElement.style.color = clickedColor;
                liElement.style.backgroundImage = "";
              } else if (
                computedStyle.backgroundImage &&
                computedStyle.backgroundImage !== "none"
              ) {
                liElement.style.color = "transparent";
                liElement.style.backgroundImage = clickedColor;
                liElement.style.backgroundClip = "text";
                liElement.style.webkitBackgroundClip = "text";
              }
            }
            if (changeBorder) {
              liElement.style.borderColor = clickedColor;
            }
          });
        }
      });
    });
  });
});
