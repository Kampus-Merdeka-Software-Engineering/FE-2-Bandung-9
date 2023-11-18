// Get the modal
var modal = document.getElementById('id01');

// kalo click bebas bakal close
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}