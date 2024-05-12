/*
Author: Elainê Barbára Bórges
This is a JavaScript for a page about Lord of the Rings
*/
const characterListUrl = "https://the-one-api.dev/v2/character";
const characterList = document.getElementById("character-list");

// When the page loads
window.addEventListener("load", updateCharacterList);

// Retrieve the list of all LOTR characters from API
function getCharacterList() {
    const apiKey = "YOUR_API_KEY_HERE"; // ADD YOUR API KEY 
    const headers = {
        "Authorization": `Bearer ${apiKey}`
    };

    return fetch(characterListUrl, { headers })
        .then(response => response.json());
}

// Add characters to the dropdown list
function updateCharacterList() {
    getCharacterList().then(function(data) {
        // Clear previous options
        characterList.innerHTML = "";

        // Add initial placeholder option
        let placeholderOption = document.createElement("option");
        placeholderOption.textContent = "Choose a character";
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        characterList.appendChild(placeholderOption);

        // Add character names options
        for (const character of data.docs) {
            let option = createOption(character.name);
            option.setAttribute("data-character-id", character._id); // Add character ID as data attribute
            characterList.appendChild(option);
        }
    }).catch(error => {
        console.error("Error fetching character list:", error);
    });
}

// Event listener for dropdown change
characterList.addEventListener("change", function() {
    const selectedOption = this.options[this.selectedIndex];
    const characterId = selectedOption.getAttribute("data-character-id");

    if (characterId) {
        // If a character ID is found, fetch character details and display
        fetchCharacterDetails(characterId);
    }
});

// Function to fetch character details by ID
function fetchCharacterDetails(characterId) {
    const characterDetailsUrl = `https://the-one-api.dev/v2/character/${characterId}`;
    const apiKey = "YOUR_API_KEY_HERE"; //ADD YOUR API KEY HERE  
    const headers = {
        "Authorization": `Bearer ${apiKey}`
    };

    fetch(characterDetailsUrl, { headers })
        .then(response => response.json())
        .then(data => {
            // Display character details (you can customize this part)
            console.log(data);
            // Example: display character details in an alert
            alert(`Name: ${data.docs[0].name}\nRace: ${data.docs[0].race}\nGender: ${data.docs[0].gender}`);
        })
        .catch(error => {
            console.error("Error fetching character details:", error);
        });
}
// Helper function to create option element
function createOption(text) {
    let option = document.createElement("option");
    option.textContent = text;
    return option;
}