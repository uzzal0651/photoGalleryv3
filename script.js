const nav = document.getElementById("nav");
const content = document.getElementById("content");

//console.log(closeModal);

function myFunction() {
  //e.preventDefault();
  const modal = document.querySelector(".modal");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  //console.log("helolo ");
}

let pageIndex = 0;
let itemsPerPage = 4;
loadItems();

const modalCreate = document.querySelector(".modal");
console.log(modalCreate);

const closeModal = document.querySelector(".btn-close");

const itemParent = document.querySelector("#content");
const overlay = document.querySelector(".overlay");

const modalImgMain = document.querySelector("#modalImg");
console.log(modalImgMain);

itemParent.addEventListener("click", function (evt) {
  if (evt.target.src) {
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    modalImg = evt.target.src;
    console.log(modalImg);
    modal.querySelector("#modalImg").setAttribute("src", modalImg);
    console.log(evt.target);
  }
});
closeModal.addEventListener("click", (evt) => {
  const modal = document.querySelector(".modal");
  //alert("close");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
function loadItems() {
  content.innerHTML = "";

  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataInfo) {
      console.log(dataInfo);
      for (
        let i = pageIndex * itemsPerPage;
        i < pageIndex * itemsPerPage + itemsPerPage;
        i++
      ) {
        //
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
        <section  id="modal" class="modal hidden">
           <a class="btn-close" href="#"  onclick="myFunction()">X</a> 
          <img id ="modalImg" src="${dataInfo[i].src}"/>
       </section>
            <div>
                <img src="${dataInfo[i].src}"/>
            </div>
            <div>
                <span>${dataInfo[i].desc}</span>
            </div>
            `;
        content.append(item);
      }
    });

  loadPageNav();
}

//
function loadPageNav() {
  nav.innerHTML = "";
  fetch("data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataInfo) {
      console.log(dataInfo);
      for (let i = 0; i < dataInfo.length / itemsPerPage; i++) {
        const span = document.createElement("span");
        span.innerHTML = i + 1;
        span.addEventListener("click", (e) => {
          pageIndex = e.target.innerHTML - 1;
          loadItems();
        });
        if (i === pageIndex) {
          span.style.background = "#00FFFF";
        }
        nav.append(span);
      }
    });
}
