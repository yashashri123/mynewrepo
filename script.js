function openPage(page) {
  let ext = ".html";
  switch (page) {
    case "login":
      location = page + ext;
      break;
    case "reg":
      location = page + ext;
      break;
    case "index":
      location = page + ext;
      break;
    case "profiles":
      location = page + ext;
      break;
  }
}

function getRegData() {
  if (localStorage.getItem("data") != null) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    // createJSON()
    alert("no data");
  }
}

function createJSON() {
  if (localStorage.getItem("data") == null) {
    let regJSON = [
      //   {
      //       name:"",
      //       age:0,
      //       mobile:"",
      //       email:"",
      //       password:""
      //   }
    ];

    localStorage.setItem("data", JSON.stringify(regJSON));
  }
}

createJSON();

function register(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  alert();
  let age = document.getElementById("age").value;
  let mobile = document.getElementById("mobile").value;
  let email = document.getElementById("email-id").value;
  let pass = document.getElementById("password").value;
  let cPass = document.getElementById("c-password").value;

  let data = getRegData();

  p = {
    name: name,
    age: age,
    mobile: mobile,
    email: email,
    password: pass,
  };

  console.log(p);
  data.push(p);

  pushJSON(data);
  openPage("login");
}

function pushJSON(data) {
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data.length);
}

function login(event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  let data = getRegData();
  let loginPerson = null;
  data.forEach((person) => {
    if (person.email == email && person.password == pass) {
      loginPerson = person;
      localStorage.setItem("login", JSON.stringify(person));
    }
  });

  if (loginPerson != null) {
    openPage("profiles");
  } else {
    alert("Login Failed");
  }
}

function updatePerson(pMob, btn) {
  let row = btn.parentElement.parentElement;
  let tds = row.children;

  let name = tds[1].innerText;
  let age = tds[2].innerText;
  // let mobile = tds[3].innerText;
  let email = tds[3].innerText;

  let data = getRegData();
  let updatePerson = null;
  data.forEach((person) => {
    if (person.mobile == pMob.toString()) {
      updatePerson = person;

      person.name = name;
      person.age = age;
      // person.mobile=mobile
      person.email = email;
    }
  });
  alert("Updated");
  document.getElementById("tbl-data").innerHTML = "";
  pushJSON(data);
  showProfiles();
  // openPage("profiles");
}
function deletePerson(pMob) {
  let data = getRegData();
  let deleteIndex = -1;
  data.forEach((person, i) => {
    if (person.mobile == pMob) {
      deleteIndex = i;
    }
  });

  if (deleteIndex > -1) {
    data.splice(deleteIndex, 1);
    alert("deleted");
    document.getElementById("tbl-data").innerHTML = "";
    pushJSON(data);
    showProfiles();
  }
}

function showProfiles() {
  let data = getRegData();

  let loginUser = JSON.parse(localStorage.getItem("login"));

  document.getElementById("login-user").innerText = loginUser.name;
  let tbl = document.getElementById("tbl-data");

  let str = "";

  data.forEach(function (p, i) {
    str = "<tr>";
    str += "<td>" + (i + 1) + "</td>";
    str += "<td contenteditable='true'>" + p.name + "</td>";
    str += "<td contenteditable='true'>" + p.age + "</td>";
    // str += "<td contenteditable='true'>" + p.mobile + "</td>";
    str += "<td contenteditable='true'>" + p.email + "</td>";
    m = p.mobile;
    str +=
      "<td><button class='btn btn-primary' onclick='updatePerson(" +
      m +
      ",this)'>Update</button>";
    str +=
      "<button class='btn btn-danger mx-2' onclick='deletePerson(" +
      m +
      ",this)'>Delete</button></td>";
    str += "</tr>";

    tbl.innerHTML += str;
  });
}
