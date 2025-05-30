(function() {
    document.getElementById('walk').onclick = async function() {
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

    // Function to edit walkspeed
    async function editWalkspeed(hack, player) {
        const { value: walkSpeed } = await Swal.fire({
            title: "Edit Walkspeed",
            input: 'number',
            inputLabel: "Please enter the walkspeed you want your character to be at. The default is 1.5",
            inputAttributes: {
                min: 0.1,
                step: 0.1
            },
            inputValue: 1.5,
            showCancelButton: true,
            confirmButtonText: "Set Walkspeed",
            cancelButtonText: "Cancel"
        });

        if (walkSpeed !== undefined && walkSpeed >= 0.1) {
            if (player._playerContainer?.walkSpeed) {
                player._playerContainer.walkSpeed = walkSpeed;
            } else {
                const interval = setInterval(() => {
                    if (player._playerContainer?.walkSpeed) {
                        player._playerContainer.walkSpeed = walkSpeed;
                        clearInterval(interval);
                    }
                }, 100);
            }
            showSuccessMessage(`You are now at a walkspeed of ${walkSpeed}.`);
        } else if (walkSpeed !== undefined) {
            Swal.fire("Invalid Speed", "Please enter a valid walkspeed greater than or equal to 0.1.", "error");
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

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to change your walkspeed?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                editWalkspeed(null, player); // Call the editWalkspeed function with the player object
            } else {
                Swal.fire("Cancelled", "You chose not to proceed.", "info");
            }
        });
    });

}})();
