let preloader = document.getElementById('preloader');
let preloading = false;


const showPreloader = () => {
    preloader.style.display = 'block';
}

const hidePreloader = () => {
    preloader.style.display = 'none';
}

const scrollToEndOfPage = () => {

    let doc = document.documentElement;

    let scrollHeight = doc.scrollHeight;
    let scrollTop = doc.scrollTop;
    let clientHeight = doc.clientHeight;

    let sumOfTopAndClient = Math.ceil(scrollTop + clientHeight);

    if (sumOfTopAndClient >= scrollHeight) {
        showPreloader();
        getData();
    }

}

const getData = () => {

    if (!preloading) {
        preloading = true;

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(response => response.json())
            .then(data => {

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pUserName = document.createElement('p');
                    let pUserURL = document.createElement('p');

                    pId.innerText = "User ID: " + user.id;
                    pUserName.innerText = "User Name: " + user.name;
                    pUserURL.innerHTML = "User URL: " + user.website + "<br>--------";

                    document.querySelector('body').append(pId, pUserName, pUserURL);
                }

                hidePreloader();
                preloading = false;
            })
            .catch(error => {
                console.error(error);
            });
    }

}


window.addEventListener('scroll', scrollToEndOfPage);