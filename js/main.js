// Ecma 6
"use strict";

let userName = prompt("enter your name");
if (userName === "esraa") {
  alert("Welcom Soso <3 ");
}

// global variable
let items = [];

let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");
let btn = document.querySelector("button");
let tableBody = document.querySelector("#tableBody");

// store and get in/from localstorage
function sentToLocalStorage(x) {
  localStorage.setItem("items", JSON.stringify(x));
}

function getFromLocalStorage() {
  items = JSON.parse(localStorage.getItem("items"));
}

// display Data from local storage if excite
if (localStorage.getItem("items") !== null) {
  getFromLocalStorage();
  display(items);
}

// Add Event To Element
siteName.addEventListener("input", function (params) {
  validateName();
});

siteUrl.addEventListener("input", function (params) {
  validateUrl();
});

// Add To Table and Local Storage
btn.addEventListener("click", function (e) {
  if (validateName() && validateUrl()) {
    add();
    display(items);
  }
});

// Add book
function add() {
  let item = {
    sName: siteName.value,
    sUrl: siteUrl.value,
  };

  items.push(item);
  clear();
  sentToLocalStorage(items);
}

// Display Data
function display(list) {
  console.log(list);
  let cartona = ``;
  for (let i = 0; i < list.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${list[i].sName}</td>
        <td><a href="${
          list[i].sUrl
        }" target="_blank" class="btn btn-outline-success"><i
                    class="fa-regular fa-eye"></i> Visit</a>
        </td>
        <td><button onClick="delet(${i})" class="btn btn-outline-danger"> <i class="fa-solid fa-trash"></i>
                Delte</button></td>
    </tr>
        `;
  }
  tableBody.innerHTML = cartona;
}

// Delet
function delet(index) {
  items.splice(index, 1);
  sentToLocalStorage(items);
  display(items);
}

// validation
function validateName() {
  var regexN = /^[A-Z]\w{3,8}$/;
  if (regexN.test(siteName.value) === true) {
    siteName.classList.replace("not-valid", "valid");
    document
      .querySelector(".wrong-name")
      .classList.replace("d-block", "d-none");

    document.querySelector(".name-box").classList.replace("wrong", "correct");
    return true;
  } else {
    siteName.classList.add("not-valid");
    document
      .querySelector(".wrong-name")
      .classList.replace("d-none", "d-block");
    document.querySelector(".name-box").classList.add("wrong");

    return false;
  }
}

function validateUrl() {
  var httpRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (httpRegex.test(siteUrl.value) === true) {
    siteUrl.classList.remove("not-valid");
    siteUrl.classList.add("valid");
    document.querySelector(".wrong-url").classList.replace("d-block", "d-none");
    document.querySelector(".url-box").classList.add("correct");
    return true;
  } else {
    siteUrl.classList.add("not-valid");
    document.querySelector(".wrong-url").classList.replace("d-none", "d-block");
    return false;
  }
}

// change addBtn color
function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
