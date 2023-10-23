console.log("a");

const listHeader = document.querySelector(".add-list");
const listInput = document.querySelector(".list-input");

listHeader.addEventListener("click", (e) => {
    listInput.classList.toggle("show-input");
    console.log(listInput);
});

document.getElementById("submitLink").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link behavior
    document.getElementById("myForm").submit(); // Submit the form when the link is clicked
});


