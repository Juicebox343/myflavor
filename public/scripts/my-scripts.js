let userQuery = document.querySelector('#searchBar');
const resultList = document.querySelector('.resultList');

let userPassword = document.querySelector('#password');
let confPassword = document.querySelector('#confpassword');

const passAlert = document.querySelector('.passAlert');

window.onload = fixStuff;

userQuery.addEventListener("input", (query) =>{
	if(userQuery.value === ""){
		resultList.innerHTML = "";
		allResults.forEach(function(result){
			resultList.innerHTML += 
				`<a href="/<%=userID%>/my-pantry/${result.id}">
					<li class="list-item">
						<span class="favoriteIcon">${result.favorite}</span>
						<span class="elementDesc">${result.item} ${result.brand}</span>
						<span class="myRating">${result.my_rating}</span>
					</li>
				</a>
				<hr>`;
		})
		fixStuff();
	} else {
		resultList.innerHTML = "";
		var result = allResults.filter(result => result.item.toLowerCase().includes(query.target.value.toLowerCase()));
		result.forEach(function(element){
			resultList.innerHTML += 
				`<a href="/<%=userID%>/my-pantry/${element.id}">
					<li class="list-item">
						<span class="favoriteIcon">${element.favorite}</span>
						<span class="elementDesc">${element.item} (${element.brand})</span>
						<span class="myRating">${element.my_rating}</span>
					</li>
				</a>
				<hr>`;
		})
		fixStuff();
	};						
});				

function fixStuff(){
	let myRating = document.querySelectorAll(".myRating");
	myRating.forEach(function(rating){
		if (rating.innerHTML == '' || rating.innerHTML == 'null'){
			rating.classList.add('unrated');
			rating.innerHTML = "Unrated";
		}
		if (rating.innerHTML == "0"){
			rating.classList.add("hateit");
			rating.innerHTML = "Avoid";
		}
		if (rating.innerHTML == "1"){
			rating.innerHTML = "It's Alright";
			rating.classList.add("mehit");
			
		}
		if (rating.innerHTML == "2"){
			rating.classList.add("loveit");
			rating.innerHTML = "It's Great!";
		}
	})

let isFavorite = document.querySelectorAll('.favoriteIcon');
isFavorite.forEach(function(fav){
	if(fav.innerHTML === '1'){
		fav.classList.add('favorite-icon');
	} 
	fav.innerHTML = '';
})

}
	

confPassword.addEventListener('keyup', () => {
	if(userPassword.value === confPassword.value || (confPassword.value.length === 0 || userPassword.value.length === 0)){
		passAlert.style.display = 'none';
	} else {
		passAlert.style.display = 'block';
	}
});

userPassword.addEventListener('keyup', () => {
	if(userPassword.value === confPassword.value || (confPassword.value.length === 0 || userPassword.value.length === 0)){
		passAlert.style.display = 'none';
	} else {
		passAlert.style.display = 'block';
	}
});