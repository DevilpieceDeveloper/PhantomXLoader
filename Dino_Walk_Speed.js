(async () => {
    document.getElementById('speed').onclick = async function() {
    // Load SweetAlert if it's not already loaded
    if (!window.Swal) {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
    }

    // Define the hack function
    const hack = Boot.prototype.game;

    async function editDinoDigWalkSpeed() {
        const { value: walkSpeed } = await Swal.fire({
            title: 'Edit Dino Dig Walkspeed',
            text: 'Please enter the walkspeed you want your character to be at. The default is 1.5.',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: 100,
                step: 0.1
            },
            inputValue: 1.5,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'Please enter a valid number!';
                }
            }
        });

        if (walkSpeed) {
            hack._state._states.get("DinoDig").walkSpeed = parseFloat(walkSpeed);
            Swal.fire({
                toast: true,
                position: 'bottom',
                icon: 'success',
                title: `You are now at a walkspeed of ${walkSpeed}.`,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                timer: 5000,
                timerProgressBar: true
            });
        }
    }

    // Execute the function
    editDinoDigWalkSpeed();
}})();
