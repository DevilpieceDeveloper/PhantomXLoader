javascript:(async () => {
    document.getElementById('chargeLevel').onclick = async function() {
    // Import SweetAlert via CDN
    const swalScript = document.createElement('script');
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(swalScript);

    // Wait for SweetAlert to load
    await new Promise((resolve) => {
        swalScript.onload = resolve;
    });

    // Function to set charged level
    const hack = async (title, description, callback) => {
        Swal.fire({
            title: title,
            text: description,
            input: 'number',
            inputAttributes: {
                min: 1,
                max: 500,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: 'Set Level',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value || value < 1 || value > 500) {
                    return 'Please enter a number between 1 and 500';
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await callback(result.value);
            }
        });
    };

    // Setting player to the correct object
    const player = Boot.prototype.game._state._current.user.source;

    // Execute the hack function
    hack("Set Charged Level", "Set's the charged level of your player.", async (value) => {
        player.data.chargedLevelData.chargedLevel = value;
        Swal.fire({
            icon: 'success',
            title: `Success`,
            text: `You are now level ${value}.`,
            timer: 2000,
            showConfirmButton: false
        });
    });
}})();
