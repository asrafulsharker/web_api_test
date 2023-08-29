const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const allPhones = data.data;

    const shuffledPhones = shuffleArray(allPhones);
    displayPhones(shuffledPhones.slice(0, 12), isShowAll);
}

// Function to shuffle an array randomly using Fisher-Yates algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    const showAllContainer = document.getElementById('show-all-container');
    const noResultsMessage = document.getElementById('no-results-message');
    phoneContainer.textContent = '';

    if (phones.length === 0) {
        showAllContainer.classList.add('hidden');
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
        if (phones.length > 12 && !isShowAll) {
            showAllContainer.classList.remove('hidden');
        } else {
            showAllContainer.classList.add('hidden');
        }

        if (!isShowAll) {
            phones = phones.slice(0, 10);
        }
        phones.forEach(phone =>{
            //step one craete a div
            const phoneCard = document.createElement('div');
            phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
            phoneCard.innerHTML = `
                    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                        <div class="card-body">
                          <h2 class="card-title">${phone.phone_name}</h2>
                          <p>If a dog chews shoes whose shoes does he choose?</p>
                          <div class="card-actions justify-center mt-5">
                            <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                          </div>
                        </div>
            `;
            // append child 
            phoneContainer.appendChild(phoneCard);
        });
    }

    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id)=>{
    // load data single phone 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone  =  data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img class="mx-auto mb-4" src="${phone.image}" alt=""/>
        <p><span class="font-bold mt-4 text-xl">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold mt-4 text-xl">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold mt-4 text-xl">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold mt-4 text-xl">Slug: </span>${phone?.slug}</p>
        <p><span class="font-bold mt-4 text-xl">Release data: </span>${phone?.releaseDate}</p>
        <p><span class="font-bold mt-4 text-xl">Brand: </span>${phone?.brand}</p>
        <p><span class="font-bold mt-4 text-xl">GPS: </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available!'}</p>
    `;
    show_details_modal.showModal();
}

// handle search button 

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loadingSpinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();
