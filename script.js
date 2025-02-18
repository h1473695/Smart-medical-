document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll Effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    // Search Functionality
    document.querySelector("button").addEventListener("click", function () {
        let query = document.getElementById("searchSymptoms").value;
        if (query.trim() === "") return;
        fetchGoogleSearchResults(query);
    });

    function fetchGoogleSearchResults(query) {
        const API_KEY = "YOUR_GOOGLE_API_KEY";
        const CX = "YOUR_SEARCH_ENGINE_ID";
        let url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CX}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayResults(results) {
        let resultContainer = document.getElementById("results");
        resultContainer.innerHTML = "";
        results.forEach(item => {
            let card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h3>${item.title}</h3><p>${item.snippet}</p><a href="${item.link}" target="_blank">Read More</a>`;
            resultContainer.appendChild(card);
        });
    }
});


         
