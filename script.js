const symptomsData = [
    { symptom: "headache", disease: "Migraine", cause: "Stress, Dehydration", risks: "Dehydration, Sleep Deprivation", treatment: "Pain relief, Hydration", doctor: "Neurologist", hospital: "City Hospital" },
    { symptom: "fever", disease: "Flu", cause: "Virus Infection", risks: "Weak Immune System", treatment: "Rest, Fluids, Pain relief", doctor: "General Physician", hospital: "General Hospital" },
    // Add more symptoms and diseases
];

function searchSymptoms() {
    const input = document.getElementById("searchSymptoms").value.toLowerCase();
    const result = symptomsData.filter(item => item.symptom.toLowerCase().includes(input));
    
    if (result.length > 0) {
        let output = "<h2>Results</h2>";
        result.forEach(item => {
            output += `<div>
                <h3>Disease: ${item.disease}</h3>
                <p>Cause: ${item.cause}</p>
                <p>Risks: ${item.risks}</p>
                <p>Treatment: ${item.treatment}</p>
                <p>Recommended Doctor: ${item.doctor}</p>
                <p>Nearest Hospital: ${item.hospital}</p>
            </div>`;
        });
        document.getElementById("home").innerHTML = output;
    } else {
        document.getElementById("home").innerHTML = "<p>No results found. Please try different symptoms.</p>";
    }
}
