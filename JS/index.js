var displayRow = document.getElementById("displayRow");
var searchDisplay = document.getElementById("displaySearch");
var arr = [];
let userName,userEmail ,userPhone, userAge, userPassword, userRePassword, userNameAlert, userEmailAlert, userPhoneAlert,
    userAgeAlert, userPasswordAlert, userRepasswordAlert 

// Loading Screen
$(document).ready(function(){
    $(".loading-screen").fadeOut(1500,function(){
        $(".loading-screen").remove();
    });
    $(".lds-roller").fadeOut(100);
    homeMeal();
})


// Meals in First Page
async function homeMeal() {
    let APIResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    APIResponse = await APIResponse.json()
    displayMeals(APIResponse.meals)
    console.log(APIResponse);
    return APIResponse
}

// Side-NavBar Animation
$(".nav-header-toggle").click(function(e){
    let offset = $(".side-nav").offset().left;  
    let navMenuWidth = $(".nav-menu").innerWidth();
    if(offset == 0){       // Open
        $(".side-nav").animate({left:`-${navMenuWidth}px`},500),$(".fa-align-justify").removeClass("fa-times fa-2x"),
        $(".nav-menu-items ul li").animate({
            opacity: "0",
            paddingTop: "200px"
        })
    }else{                 // Close
        $(".side-nav").animate({left:`0px`},500),$(".fa-align-justify").addClass("fa-times fa-2x"),
        $(".nav-menu-items .item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 900), $(".nav-menu-items .item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1000), $(".nav-menu-items .item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100), $(".nav-menu-items .item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1200), $(".nav-menu-items .item5").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1300), $(".nav-menu-items .item6").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1400)
    }
}); 


// Side-NavBar Menu
$(".nav-menu-items a").click(async (e) => {
    
    let listItem = e.target.getAttribute("data-list")
    displayRow.innerHTML = ""

    let click_event = new CustomEvent('click');
    document.querySelector('.nav-header-toggle').dispatchEvent(click_event);

    let APIResponse ;
    if (listItem == "categories") {                                         // Category
        $(".lds-roller").fadeIn(100)
        APIResponse = await getMenuItem(listItem + ".php")                  
        arr = APIResponse.categories.splice(0, 20);
        displayCategories()
        $(".lds-roller").fadeOut(500)
    } 
    if (listItem == "area") {                                               // Area
        $(".lds-roller").fadeIn(100)
        APIResponse  = await getMenuItem("list.php?a=list")
        arr = APIResponse.meals.splice(0, 20);
        displayArea()
        $(".lds-roller").fadeOut(500)
    }  
    if (listItem == "ingredients") {                                        // Ingredients
        $(".lds-roller").fadeIn(100)
        APIResponse  = await getMenuItem("list.php?i=list")
        arr = APIResponse.meals.splice(0, 20);
        displayIngredients()
        $(".lds-roller").fadeOut(500)
    }
    if (listItem == "contact") {                                            // Contact
        displayContact()
    }
    if(listItem=="search"){                                                 // Search
        displaySearchInput();
        $("#searchByNameInput").keyup((e) => {
            searchByName(e.target.value)
        })
        $("#searchByLetterInput").keyup((e) => {
            searchByLetter(e.target.value)
        })
    }

    async function getMenuItem(listItem) {
        APIResponse  = await fetch(`https://www.themealdb.com/api/json/v1/1/${listItem}`);
        APIResponse  = await APIResponse.json()
        return APIResponse ;
    }




})






async function searchByName(name) {
    $(".lds-roller").fadeIn(100)
    let APIResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    APIResponse = await APIResponse.json()
    displayMeals(APIResponse.meals)
    $(".lds-roller").fadeOut(400)
    console.log(APIResponse);
    return APIResponse
}
async function searchByLetter(letter) {
    $(".lds-roller").fadeIn(100)
    let APIResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    APIResponse = await APIResponse.json()
    displayMeals(APIResponse.meals)
    $(".lds-roller").fadeOut(400)
    console.log(APIResponse);
    return APIResponse
}
function displaySearchInput(){
    searchDisplay.innerHTML = `   
    <div class="search-container container position-fixed bg-dark p-3 rounded-4 shadow">     
        <div class="row justify-content-center">
            <div class="col-md-6">
                <input class="form-control" id="searchByNameInput"  placeholder = "Search By Name"></div>
            <div class="col-md-6">
                <input class="form-control" type="text" maxlength="1" id="searchByLetterInput" placeholder="Search By First Letter">
            </div>
        </div>
    </div>`
}







function displayCategories() {
    searchDisplay.innerHTML =""
    let cartoona = ""
    for (var i = 0; i < arr.length; i++) {
        cartoona += `
                <div class="col-md-6 col-lg-3 my-3 ">
                <div class="item-container position-relative shadow rounded">
                    <div data-category="${arr[i].strCategory}" class="categoryElement">
                        <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" data-category="${arr[i].strCategory}"/>
                        <div class="layer d-flex align-items-center rounded w-100" data-category="${arr[i].strCategory}">
                            <div class="info p-2 data-category="${arr[i].strCategory}"">
                                <h2 class="fw-bold"data-category="${arr[i].strCategory}">${arr[i].strCategory}</h2>
                                <p class="fw-light"data-category="${arr[i].strCategory}">${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }
    displayRow.innerHTML = cartoona


    
    var categoryElement = document.querySelectorAll(".categoryElement")
    for(var i=0;i<categoryElement.length;i++){
        categoryElement[i].addEventListener("click", function(e){
            filterByCategory(e.target.getAttribute("data-category"))

        })
    }

    


}
async function filterByCategory(category) {
    console.log("ooooba");
    $(".lds-roller").fadeIn(100)
    let APIResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    APIResponse = await APIResponse.json()
    displayMeals(APIResponse.meals)
    $(".lds-roller").fadeOut(500)
}





function displayArea() {
    searchDisplay.innerHTML =""
    let cartoona = ""
    for (var i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-6 col-lg-3 my-3 ">
            <div class="position-relative shadow rounded">
                <div data-area="${arr[i].strArea}" class="p-3 areaElement">
                <i class="fa-solid fa-earth-americas fa-2x text-danger" data-area="${arr[i].strArea}"></i>
                    <h2 class="text-white" data-area="${arr[i].strArea}">${arr[i].strArea}</h2>
                </div>
            </div>
        </div>`
    }
    displayRow.innerHTML = cartoona

    $(".areaElement").click(function(e){
        filterByArea(e.target.getAttribute("data-area"));
    })
}
async function filterByArea(area) {
    $(".lds-roller").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".lds-roller").fadeOut(500)
}




function displayIngredients() {
    searchDisplay.innerHTML =""
    let cartoona = ""
    for (var i = 0; i < arr.length; i++){
        cartoona += `
        <div class="col-md-6 col-lg-3 my-3 ">
            <div data-ingredient="${arr[i].strIngredient}" class="position-relative shadow rounded ingredientElement">
                <div class="post p-3" data-ingredient="${arr[i].strIngredient}">
                    <i class="fa-solid fa-bowl-food fa-3x text-danger" data-ingredient="${arr[i].strIngredient}"></i>
                    <h2 class="text-white" data-ingredient="${arr[i].strIngredient}">${arr[i].strIngredient}</h2>
                    <p class="text-white "data-ingredient="${arr[i].strIngredient}">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>`
    } 
    displayRow.innerHTML = cartoona

    $(".ingredientElement").click(function(e){
        filterByIngredient(e.target.getAttribute("data-ingredient"));
    })

}
async function filterByIngredient(ingredient) {
    $(".lds-roller").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".lds-roller").fadeOut(500)
}







function displayMealInfo(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += 
            `            <div class="recipes-item alert-success rounded-1 bg-secondary p-1 me-2 mb-2">
                            <h5 class="mb-0 fw-light fs-6">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</h5>
                        </div>`

        }
    }

    let tags = "" 
    let tagsStr = meal.strTags.split(",") 
    for (let i = 0; i < tagsStr.length; i++) {
        tags += 
        `            <div class="tag-item alert-success rounded-5 bg-primary p-2 me-2 mb-2">
                    <h5 class="mb-0 fw-light fs-6">${tagsStr[i]}</h5>
                </div>`
    } 

    let mealInfo = `
    <div class="col-md-4 text-white ">
        <div class="img-container ">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}">
            <h1>Beef and Mustard Pie</h1>
        </div>
    </div>
    <div class="col-md-8 text-white ">
        <div class="left-side-container d-flex flex-column align-items-start ps-5">
            <h2>Instructions</h2>
            <p class="fw-light text-start">${meal.strInstructions}</p>
            <h3 class="fs-5 text-success">Area  <span class="fw-light fs-5 text-white">: ${meal.strArea}</span></h3>
            <h3 class="fs-5 mb-4 text-success">Category  <span class="fw-light fs-5 text-white">: ${meal.strCategory}</span></h3>
            
            <h3>Recipes :</h3>
            <div class="d-flex flex-wrap mb-4" id="recipes">
            </div>

            <h3>Tags :</h3>
            <div class="d-flex flex-wrap mb-5" id="tags">
            </div>


            <div class="button ">
                <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
                <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtube</a>
            </div>
        </div>

    </div>`
    displayRow.innerHTML = mealInfo;
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tags
}
async function getMeal(mealID) {
    $(".lds-roller").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMealInfo(meal.meals[0])
    $(".lds-roller").fadeOut(500)
}







function displayMeals(arr) {
    let cartoona = ""
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-6 col-lg-3 my-3 ">
            <div class="item-container position-relative shadow rounded mealElement">
                <div data-meal="${arr[i].idMeal}">
                        <img src='${arr[i].strMealThumb}' class="w-100 rounded" data-meal="${arr[i].idMeal}"/>
                        <div class="layer d-flex align-items-center rounded w-100" data-meal="${arr[i].idMeal}">
                            <div class="info p-2" data-meal="${arr[i].idMeal}">
                                <h2 class="fw-bold "data-meal="${arr[i].idMeal}">${arr[i].strMeal}</h2>
                            </div>
                        </div>
                </div>
            </div>
        </div>`
    }
    displayRow.innerHTML = cartoona

    $(".mealElement").click(function(e){
        getMeal(e.target.getAttribute("data-meal"));
    })
}

function displayContact(){
    searchDisplay.innerHTML =""
    displayRow.innerHTML = `
    <section id="contact" class="container w-75 mx-auto mb-5 shadow p-3 rounded-3">
    <div class="p-2">
        <h2 class="text-light mb-5">Contact Us...</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-4 ">
                    <input class="form-control bg-s" id="name" placeholder="Enter Your Name">
                    <div class="alert mt-1 alert-danger d-none" id="nameAlert" role="alert">
                        Special Characters and Numbers Not Allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-4">
                    <input class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert mt-1 alert-danger d-none" id="emailAlert" role="alert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-4">
                    <input class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert mt-1 alert-danger  d-none" id="phoneAlert" role="alert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-4">
                    <input  class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert mt-1 alert-danger  d-none" id="ageAlert" role="alert">
                        Enter Valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-4">
                    <input  class="form-control" type="password" id="password" placeholder="Enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="passwordAlert" role="alert">
                        Enter valid Password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" type="password" id="rePassword"
                        placeholder="Re-enter Password">
                    <div class="alert mt-1 alert-danger  d-none" id="rePasswordAlert" role="alert">
                        Enter valid Password
                    </div>
                </div>
            </div>
        </div>
            <button type="submit" disabled id="submitBtn" class="btn btn-primary">Submit</button>
        </div>
    </section>`

    
    userName = document.getElementById("#name");
    userEmail = document.getElementById("#email")
    userPhone = document.getElementById("#phone")
    userAge = document.getElementById("#age")
    userPassword = document.getElementById("#password")
    userRePassword = document.getElementById("#rePassword")
    
    userNameAlert = document.getElementById("#nameAlert")
    userEmailAlert = document.getElementById("#emailAlert")
    userAgeAlert = document.getElementById("#ageAlert")
    userPhoneAlert = document.getElementById("#phoneAlert")
    userPasswordAlert = document.getElementById("#passwordAlert")
    userRepasswordAlert = document.getElementById("#rePasswordAlert")

    
    $("#name").keyup(function(){
        userNameValidation();
    })
    $("#email").keyup(function(){
        userEmailValidation();
    })
    $("#phone").keyup(function(){
        userPhoneValidation();
    })
    $("#age").keyup(function(){
        userAgeValidation();
    })
    $("#password").keyup(function(){
        userPasswordValidation();
    })
    $("#rePassword").keyup(function(){
        userRePasswordValidation();
    })
}


function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}
function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}
function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}
function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}
function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}
function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}




function userNameValidation(){
    if(userNameValid()){
        userNameAlert.classList.replace("d-block", "d-none")
    }
}
function userEmailValidation(){
    if(userEmailValid()){
        userEmailAlert.classList.replace("d-block", "d-none")
    }
}
function userPhoneValidation(){
    if(userPhoneValid()){
        userPhoneAlert.classList.replace("d-block", "d-none")
    }
}
function userAgeValidation(){
    if(userAgeValid()){
        userAgeAlert.classList.replace("d-block", "d-none")
    }
}
function userPasswordValidation(){
    if(userPasswordValid()){
        userPasswordAlert.classList.replace("d-block", "d-none")
    }
}
function userRePasswordValidation(){
    if(userRePasswordValid()){
        userRepasswordAlert.classList.replace("d-block", "d-none")
    }
}







