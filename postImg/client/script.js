const setup = () => {
  const container = document.querySelector(".container");
  axios
    .get("http://localhost:3001/api/products")
    .then((res) => {
      let data = res.data;
      console.log(data);
      data.forEach((prop) => {
        console.log(prop);
        const box = document.createElement("div");
        box.className = "product";
        box.innerHTML = `
          <div>${prop["id"]}</div>
          <div>${prop["title"]}</div>
          <div>${prop["price"]}</div>
          <img src="http://localhost:3001/${prop["image"]}" alt="">
          `;
        container.appendChild(box);
      });
    })
    .catch((err) => console.log(`Get que error: ${err}`));
};
setup();
