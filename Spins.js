(function() {
    document.getElementById('spins').onclick = function() {
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

    // Function to handle the hack command
    function hack(title, description, callback) {
        Swal.fire({
            title: title,
            text: description,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Enable Unlimited Spins",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                callback()
                    .then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "You can now spin the wheel unlimited times.",
                            icon: "success",
                            confirmButtonText: "OK",
                            position: "bottom", // Adjusted position for toast
                            toast: true,
                            timer: 7000, // Adjust as needed or remove for manual dismissal
                            timerProgressBar: true,
                            showConfirmButton: true,
                        });
                    })
                    .catch(error => Swal.fire("Error", error.message, "error"));
            } else {
                Swal.fire("Cancelled", "Unlimited spins were not enabled.", "info");
            }
        });
    }

    // Initialize when SweetAlert is loaded
    loadSweetAlert(function() {
        // Replace with your actual player object
        const player = {
            canSpin: () => true // Mock implementation for demonstration
        }; // Replace with actual player object

        // Call the hack command
        hack("Unlimited Spins", "Gives you unlimited spins on the Wheel Of Wonder.", () => {
            return new Promise((resolve, reject) => {
                try {
                    player.canSpin = () => true; // Enable unlimited spins
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    });

}})();
