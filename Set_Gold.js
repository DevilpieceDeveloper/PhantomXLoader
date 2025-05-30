(function() {
    document.getElementById('setGold').onclick = function() {
        // Check if SweetAlert is already loaded, otherwise inject it
        if (!window.Swal) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            script.onload = function() {
                injectFunction();
            };
            document.head.appendChild(script);
        } else {
            injectFunction();
        }

        function injectFunction() {
            const player = Boot.prototype.game._state._current.user.source;

            Swal.fire({
                title: 'Set Gold',
                input: 'number',
                inputLabel: 'Please enter the amount of gold you want to get.',
                inputAttributes: {
                    min: 1,
                    max: 9000000,
                    step: 1
                },
                showCancelButton: true,
                confirmButtonText: 'Set Gold',
                cancelButtonText: 'Cancel',
                customClass: {
                    container: 'swal-container',
                    popup: 'swal-popup',
                    confirmButton: 'swal-confirm-button'
                },
                preConfirm: (value) => {
                    if (!value || value < 1 || value > 9000000) {
                        Swal.showValidationMessage('Please enter a valid amount of gold.');
                    } else {
                        return value;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const value = result.value;
                    player.data.gold = value;
                    Swal.fire({
                        text: `You now have ${value} gold.`,
                        icon: 'success',
                        toast: true,
                        position: 'bottom',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    };
})();
