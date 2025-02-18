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

document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "আপনার লক্ষণ লিখুন...";
    searchBox.style.cssText = "width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px;";

    const resultBox = document.createElement("div");
    resultBox.style.cssText = "padding: 10px; border: 1px solid #ccc; border-radius: 5px; background: #f9f9f9; display: none;";

    document.body.prepend(searchBox);
    document.body.prepend(resultBox);

    searchBox.addEventListener("keypress", async function (event) {
        if (event.key === "Enter") {
            const symptoms = searchBox.value.trim();
            if (symptoms.length > 3) {
                resultBox.style.display = "block";
                resultBox.innerHTML = "অনুসন্ধান করা হচ্ছে...";

                try {
                    const response = await fetch(`https://api.disease.info/v1/disease?symptom=${encodeURIComponent(symptoms)}`);
                    const data = await response.json();

                    if (data.error) {
                        resultBox.innerHTML = "কোনো তথ্য পাওয়া যায়নি। দয়া করে সঠিকভাবে লিখুন।";
                    } else {
                        let resultHTML = `<strong>সম্ভাব্য রোগ:</strong><br>`;
                        data.forEach(disease => {
                            resultHTML += `<b>${disease.name}</b>: ${disease.description}<br>`;
                        });
                        resultBox.innerHTML = resultHTML;
                    }
                } catch (error) {
                    resultBox.innerHTML = "ডাটা আনতে সমস্যা হচ্ছে, আবার চেষ্টা করুন।";
                }
            } else {
                resultBox.style.display = "block";
                resultBox.innerHTML = "অনুগ্রহ করে আরও বিস্তারিত লিখুন।";
            }
        }
    });
});
            
