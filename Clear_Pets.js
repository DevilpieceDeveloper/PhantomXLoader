(function() {
    document.getElementById('clearPets').onclick = function() {
        function loadSweetAlert(callback) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            script.onload = callback;
            document.head.appendChild(script);
        }

        loadSweetAlert(() => {
            const player = Boot.prototype.game._state._current.user.source;

            Swal.fire({
                title: 'Clear All Pets',
                text: 'Deletes all pets from your kennel.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, clear them!'
            }).then((result) => {
                if (result.isConfirmed) {
                    player.kennel.data.length = 0;
                    Swal.fire({
                        position: 'bottom',
                        icon: 'success',
                        title: 'All pets have been cleared.',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        timer: 3000
                    });
                } else {
                    Swal.fire('Cancelled', 'Your pets are safe :)', 'error');
                }
            });
        });
    }
})();
