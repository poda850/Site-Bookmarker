var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var siteContainer = [];
var nameRegex = /^\w{3,}$/;
var urlRegex = /^(http(s)?:\/\/)?(w{3}\.)?(\w{2,256})(\.\w{2,6})\b([-\w@:%\+.~#?&\/=]*)$/;

changeInputButton("Submit", "btn-success", "addSite")
changeClearButton("Clear")
checkLocalStorage();

function changeInputButton(btnValue, btnColor, btnFunction, i) {
  document.getElementById("inputUpdateButton").innerHTML = `<button class="btn ${btnColor} btn-lg" onclick="${btnFunction}(${i});">${btnValue}</button>`
}

function changeClearButton(btnValue) {
  document.getElementById("cancelClearButton").innerHTML = `<button class="btn btn-danger btn-lg ms-5"  onclick="cancel();">${btnValue}</button>`
}

function checkLocalStorage() {
  if (localStorage.getItem("BookmarkedSites") != null) {
    siteContainer = JSON.parse(localStorage.getItem("BookmarkedSites"))
    viewSite(siteContainer);
  }
}

function validateSiteName() {

  if (nameRegex.test(siteName.value) == true) {
    siteName.classList.replace("is-invalid", "is-valid")
  }
  else {
    siteName.classList.add("is-invalid")
  }
}

function validateSiteUrl() {
  if (urlRegex.test(siteURL.value) == true) {
    siteURL.classList.replace("is-invalid", "is-valid")
  }
  else {
    siteURL.classList.add("is-invalid")
  }
}

function checkdouble() {
  for (var i = 0; i < siteContainer.length; i++) {
    if (siteContainer[i].name.toLowerCase().includes(siteName.value.toLowerCase()) == true) {
      return true;
    }
  }
}

function addSite() {
  if (nameRegex.test(siteName.value) != true) {
    alert("!! Site name must contain at least 3 characters !!")
  }
  else if (urlRegex.test(siteURL.value) != true) {
    alert("!! Site URL must be a valid one !!")
  }
  else if (checkdouble() == true) {
    alert("!! Your Site Name is Duplicated !! \n Try Another Name..")
  }
  else {
    var site = {
      name: siteName.value,
      url: siteURL.value
    };
    siteContainer.push(site);
    updatedata();
    clear();
  }
}

function viewSite(Array) {
  var trs = "";
  for (var i = 0; i < Array.length; i++) {
    trs += `
    <tr>
      <td>${i}</td>
      <td>${Array[i].name}</td>
      <td>
        <a class="btn btn-primary" href="${Array[i].url}" target="_blank">
        <i class="fa-solid fa-eye pe-2"></i>
        <span>Visit</span>
        </a>
      </td>
      <td>
          <button class="btn btn-warning"onclick="patchvalues(${i});">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
          </button>
      </td>
      <td>
          <button class="btn btn-danger" onclick="deleteSite(${i});">
          <i class="fa-solid fa-trash-can"></i>
          <span>Delete</span>
          </button>
      </td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML = trs;
}

function updatedata() {
  localStorage.setItem("BookmarkedSites", JSON.stringify(siteContainer));
  viewSite(siteContainer);
}

function deleteSite(i) {
  siteContainer.splice(i, 1)
  updatedata();
}

function patchvalues(i) {
  siteName.value = siteContainer[i].name
  siteURL.value = siteContainer[i].url
  changeInputButton("Edit", "btn-warning", "editSite", i)
  changeClearButton("Cancel")
}

function editSite(i) {
  var newSite = {
    name: siteName.value,
    url: siteURL.value,
  };
  siteContainer.splice(i, 1, newSite)
  updatedata();
  clear();
}

function clear() {
  siteName.value = ""
  siteURL.value = ""
}

function cancel() {
  clear();
  changeInputButton("Submit", "btn-success", "addSite")
  changeClearButton("Clear")
}


