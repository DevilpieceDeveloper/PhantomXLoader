(async () => {
    document.getElementById('moreTime').onclick = async function() {
    // Load SweetAlert if it's not already loaded
    if (!window.Swal) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
    }

    // Define the hack function
    const hack = Boot.prototype.game;

    async function addExtraTimeInDinoDig() {
        if (!hack._state._states.get("DinoDig")?.timer?.addTime) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You are not in Dino Dig.',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Add 100 days (8.64e9 milliseconds) to the timer
        hack._state._states.get("DinoDig")?.timer?.addTime(8.64e9);

        Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Added 100 days to the timer.',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            timer: 5000,
            timerProgressBar: true
        });
    }

    // Execute the function
    addExtraTimeInDinoDig();
}})();
