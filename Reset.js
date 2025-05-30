(function() {
    document.getElementById('reset').onclick = async function() {
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

    // Function to reset the account
    async function resetAccount(hack, player) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to reset your account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reset it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            player.resetAccount();
            showSuccessMessage("Your account has been reset.");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "Your account reset was cancelled.", "error");
        }
    }

    // Function to display success message at the bottom-middle
    function showSuccessMessage(message) {
        Swal.fire({
            title: "Success!",
            text: message,
            icon: "success",
            confirmButtonText: "OK",
            position: "bottom",
            toast: true,
            timer: 5000, // Adjust as needed or remove for manual dismissal
            timerProgressBar: true,
            showConfirmButton: true,
            showCloseButton: true,
        });
    }

    // Initialize when SweetAlert is loaded
    loadSweetAlert(function() {
        const player = Boot.prototype.game._state._current.user.source;

        resetAccount(null, player); // Call the resetAccount function with the player object
    });

}})();
