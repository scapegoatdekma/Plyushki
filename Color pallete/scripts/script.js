document.addEventListener("DOMContentLoaded", function () {
  const colorBoxes = document.querySelectorAll(".color-box");
  const toggleTextButton = document.getElementById("toggleText");
  const toggleBorderButton = document.getElementById("toggleBorder");

  let changeText = true;
  let changeBorder = true;

  toggleTextButton.addEventListener("click", function () {
    changeText = !changeText;
    if (changeText) {
      toggleTextButton.classList.add("active");
    } else {
      toggleTextButton.classList.remove("active");
    }
  });
  toggleBorderButton.addEventListener("click", function () {
    changeBorder = !changeBorder;
    if (changeBorder) {
      toggleBorderButton.classList.add("active");
    } else {
      toggleBorderButton.classList.remove("active");
    }
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
        if (section.querySelector(".shadows-container") && changeBorder) {
          const allLiElements = section.querySelectorAll("ul li");
          allLiElements.forEach((liElement) => {
            const computedBoxShadow = getComputedStyle(liElement).boxShadow;
            if (computedBoxShadow && computedBoxShadow !== "none") {
              const shadowParts = computedBoxShadow.match(
                /(-?\d+px|-?\d+)|(rgba?\(.+?\))|none/g
              );
              if (shadowParts) {
                const newShadow = `${shadowParts[0]} ${shadowParts[1]} ${shadowParts[2]} ${clickedColor}`;
                liElement.style.boxShadow = newShadow;
              }
            } else {
              liElement.style.boxShadow = `0 0 2px 2px ${clickedColor}`;
            }
          });
        }
      });
    });
  });
});
