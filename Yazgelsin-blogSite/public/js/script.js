//formBx geçişlerini sağlama
let signinBtn = document.querySelector(".signinBtn");
let signupBtn = document.querySelector(".signupBtn");
let loginOffcanvas = document.querySelector("#loginOffcanvas");

signupBtn.addEventListener("click", function (event) {
  loginOffcanvas.classList.add("login-slide");
  event.preventDefault();
});

signinBtn.addEventListener("click", function (event) {
  loginOffcanvas.classList.remove("login-slide");
  event.preventDefault();
});

//kayıt ekleme
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordAgain = document.getElementById("passwordAgain");

let userInformation = [];
if (localStorage.getItem("userInformation") !== null) {
  userInformation = JSON.parse(localStorage.getItem("userInformation"));
}

document.getElementById("register").addEventListener("click", function (event) {
  if (
    username.value == "" ||
    email.value == "" ||
    password.value == "" ||
    passwordAgain.value == ""
  ) {
    alert("Boş olan alanları doldurunuz!");
  } else if (password.value == passwordAgain.value) {
    userInformation.push({
      username: username.value,
      email: email.value,
      password: password.value,
      passwordAgain: passwordAgain.value,
    });

    alert("Kayıt Başarılı!");
    username.value = "";
    email.value = "";
    password.value = "";
    passwordAgain.value = "";

    loginOffcanvas.classList.remove("login-slide");
  } else {
    alert("Şifreler uyuşmamaktadır!");
  }

  localStorage.setItem("userInformation", JSON.stringify(userInformation));

  event.preventDefault();
});

const loginName = document.getElementById("loginName");
const loginPassword = document.getElementById("loginPassword");

const createBlog = document.getElementById("createBlog");
const loginBlog = document.getElementById("loginBlog");
const exitBlog = document.getElementById("exitBlog");

const blogOffcanvas = document.getElementById("blogOffcanvas");
const bodyOverflow = document.querySelector("body");

const user = document.getElementById("user");

//Kullanıcı Giriş
document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();

  if (loginName.value == "" || loginPassword.value == "") {
    alert("Boş alanları doldurunuz");
  } else {
    let loginSuccessful = false;

    for (let login of userInformation) {
      if (
        loginName.value == login.username &&
        loginPassword.value == login.password
      ) {
        alert("Giriş başarılı");
        user.textContent = loginName.value;

        loginSuccessful = true;
        loginName.value = "";
        loginPassword.value = "";

        loginBlog.classList.add("loginBlog-close");
        createBlog.classList.add("createBlog-login");

        loginOffcanvas.classList.add("loginOffcanvas-close");
        bodyOverflow.classList.add("bodyOverflow");

        break; // Başarılı giriş durumunda döngüyü sonlandır
      }
    }

    if (loginSuccessful) {
      //window.location.href = "index.html";
    } else {
      alert("Giriş Başarısız");
    }
  }
});

/*------------------------------------------------------------------------ */

//blog ekleme
let blogList = [];

if (localStorage.getItem("blogList") !== null) {
  blogList = JSON.parse(localStorage.getItem("blogList"));
}

const blogImage = document.querySelector("#blogImage");
const blogCategory = document.querySelector("#blogCategory");
const blogTitle = document.querySelector("#blogTitle");
const blogText = document.querySelector("#blogText");
const blogProfilImage = document.querySelector("#blogProfilImage");
const blogUserName = document.querySelector("#blogUserName");

const currentDate = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
const formattedDate = currentDate.toLocaleDateString("tr-TR", options);

displayNewBlog();
function displayNewBlog() {
  const contentBlogAdd = document.getElementById("contentBlogAdd");
  contentBlogAdd.innerHTML = ""; // Önceki içeriği temizle

  for (let blogAdd of blogList) {
    let blogs = `
                    <div class="col-12 cols">
                      <div class="card mb-3">
                        <div class="row g-0">
                          <div class="col-md-4 category">
                            <a href="#" class="category">
                            <img src="${blogAdd.blogImage}" id="uploadedImage" class="img-fluid rounded-start img"/>
                              <span>${blogAdd.blogCategory}</span>
                            </a>
                          </div>
  
                          <div class="col-md-8">
                            <div class="card-body h-100 d-flex flex-column">
                              <h5 class="card-title">
                                <a href="#">
                                  ${blogAdd.blogTitle} 
                                </a>
                              </h5>
                              <p class="card-text">
                                ${blogAdd.blogText}
                              </p>
                              <p class="card-text mt-auto">
                                <small>
                                  <img src="${blogAdd.blogProfilImage}" id="uploadedImage2" class="card-profil"/>
                                </small> 
                                <small>by ${blogAdd.blogUserName}</small>
                                <small
                                  ><i class="fa-regular fa-comment-dots"></i
                                ></small>
                                <small>${blogAdd.formattedDate}</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
      `;

    contentBlogAdd.insertAdjacentHTML("beforeend", blogs);
  }
}

document
  .getElementById("btnAddNewBlog")
  .addEventListener("click", function (event) {
    const selectedImage = blogImage.files[0]; // Seçilen dosya bilgisini al
    const selectedProfilImage = blogProfilImage.files[0]; // Profil resmi için seçilen dosya bilgisini al

    if (
      blogCategory.value == "" ||
      blogTitle.value == "" ||
      blogText.value == "" ||
      blogUserName.value == ""
    ) {
      alert("Boş alanları doldurunuz!");
    } else {
      if (selectedImage && selectedProfilImage) {
        const reader = new FileReader(); //Bir dosya okuma işlemi yapmak için FileReader nesnesini oluşturur.
        const reader2 = new FileReader();

        reader.onload = function (e) {
          const base64Image = e.target.result;

          reader2.onload = function (e2) {
            const base64ProfilImage = e2.target.result; //Yüklenen profil görselinin base64 formatındaki verisini alır.

            blogList.push({
              blogImage: base64Image, // Görselin base64 formatındaki verisini kaydet
              blogCategory: blogCategory.value,
              blogTitle: blogTitle.value,
              blogText: blogText.value,
              blogProfilImage: base64ProfilImage, // Profil görselinin base64 formatındaki verisini kaydet
              blogUserName: blogUserName.value,
              formattedDate: formattedDate.valueOf(),
            });

            blogCategory.value = "";
            blogTitle.value = "";
            blogText.value = "";
            blogUserName.value = "";
            blogImage.value = "";
            blogProfilImage.value = "";

            localStorage.setItem("blogList", JSON.stringify(blogList));
            alert("Bloğunuz Eklenmiştir.");
            displayNewBlog();
          };

          reader2.readAsDataURL(selectedProfilImage); // Seçilen görseli base64 formatına dönüştürmek ve yükleme işlemini başlatmak için seçilen görseli okur.
        };

        reader.readAsDataURL(selectedImage); // Seçilen görseli base64 formatına dönüştürmek ve yükleme işlemini başlatmak için seçilen görseli okur.
      } else {
        alert("Lütfen görsel seçin");
      }
    }
    event.preventDefault();
  });

document.getElementById("createBlog").addEventListener("click", function () {
  blogOffcanvas.classList.add("blogOffcanvasOverflow");
  bodyOverflow.classList.remove("bodyOverflow");
});

const artsOffcanvas = document.getElementById("artsOffcanvas");
document.getElementById("arts").addEventListener("click", function () {
  artsOffcanvas.classList.add("blogOffcanvasOverflow");
  bodyOverflow.classList.remove("bodyOverflow");
});

const scienceOffcanvas = document.getElementById("scienceOffcanvas");
document.getElementById("science").addEventListener("click", function () {
  scienceOffcanvas.classList.add("blogOffcanvasOverflow");
  bodyOverflow.classList.remove("bodyOverflow");
});

const technologyOffcanvas = document.getElementById("technologyOffcanvas");
document.getElementById("technology").addEventListener("click", function () {
  technologyOffcanvas.classList.add("blogOffcanvasOverflow");
  bodyOverflow.classList.remove("bodyOverflow");
});
