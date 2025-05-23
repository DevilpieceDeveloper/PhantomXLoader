(function() {
    document.getElementById('saveInventory').onclick = async function() {
    // Load SweetAlert
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.onload = function() {
        // Once SweetAlert is loaded, run the code
        var player = Boot.prototype.game._state._current.user.source;
        if (typeof player !== 'undefined') {
            player.updated = true;
            player.saveEnabled = true;
            if (player.backpack) {
                player.backpack.updated = true;
            }
            // Assume there's a save function to call
            if (typeof player.save === 'function') {
                player.save().then(function() {
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'success',
                        title: 'Success',
                        text: 'Inventory Saved',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        timer: 0
                    });
                }).catch(function(error) {
                    Swal.fire({
                        toast: true,
                        position: 'bottom',
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to save inventory: ' + error.message,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        timer: 0
                    });
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'bottom',
                    icon: 'success',
                    title: 'Success',
                    text: 'Inventory Updated!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    timer: 0
                });
            }
        } else {
            Swal.fire({
                toast: true,
                position: 'bottom',
                icon: 'error',
                title: 'Error',
                text: 'Player object not found',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 0
            });
        }
    };
    document.head.appendChild(script);
}})();
