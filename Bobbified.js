(function() {
    document.getElementById('bobby').onclick = async function() {
    // Function to load SweetAlert if not already loaded
    function loadSweetAlert(callback) {
        if (window.Sweetalert2) {
            callback();
        } else {
            const sweetAlertScript = document.createElement('script');
            sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@10';
            sweetAlertScript.onload = callback;
            document.head.appendChild(sweetAlertScript);
        }
    }

    // Function to setup player
    function setupPlayer() {
        const player = Boot.prototype.game._state._current.user.source;

        // Modify player data
        player.name.data.firstName = 44;
        player.name.data.middleName = 754;
        player.name.data.lastName = 882;
        player.data.stars = -1e22;
        player.data.level = 69;

        // Set appearance
        player.appearance.setEyeColor(1);
        player.appearance.setFace(4);
        player.appearance.setHair(19, 1);
        player.appearance.setSkinColor(1);

        // Equip items
        player.equipment.setFollow(19);
        player.equipment.setHat(19);
        player.equipment.setBoots(19);
        player.equipment.setOutfit(19);
        player.equipment.setWeapon(19);
    }

    // Function to display success message at the bottom-middle
    function showSuccessMessage(message) {
        Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            confirmButtonText: "OK",
            position: "bottom",
            customClass: {
                container: "sweet-alert-bottom-middle" // Custom CSS class for positioning
            },
            toast: true,
            timer: 5000, // Adjust as needed or remove for manual dismissal
            timerProgressBar: true,
            showConfirmButton: true,
        });
    }

    // Initialize when SweetAlert is loaded
    loadSweetAlert(function() {
        // Confirmation message before setup
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to become Bobby Fancywoman? You will be logged out.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the setup function
                setupPlayer();
                
                // Show success message at the bottom-middle
                showSuccessMessage("You are now Bobby Fancywoman.");
            } else {
                Swal.fire("Cancelled", "You chose not to proceed.", "info");
            }
        });
    });

}})();
