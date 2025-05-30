(function(){
document.getElementById('setName').onclick = function() { 
// Inject SweetAlert Script Made By PXI
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.onload = function() {
        // Ensure the player variable is defined
        var player;
        try {
            player = Boot.prototype.game._state._current.user.source;
        } catch (e) {
            console.error("Player object not found.");
            return;
        }

        // Ensure gameData is defined
        var gameData;
        try {
            gameData = Boot.prototype.game._state._states.get("Boot")._gameData;
        } catch (e) {
            console.error("gameData object not found.");
            return;
        }

        // Function to create and use the hack
        function hack(name, description, callback) {
            console.log(`Hack: ${name} - ${description}`);
            callback(hack, player);
        }

        // Function to show success message at the bottom middle of the screen
        function success(message) {
            Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: message,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                toast: true,
                timer: 3000
            });
        }

        // Hack function implementation
        hack("Set Name (Client-Side Only)", "Sets your name to anything you want. (Only shows on your screen)", async (hack, player) => {
            const { value: name } = await Swal.fire({
                title: 'Enter your new name',
                input: 'text',
                inputLabel: 'New Name',
                inputPlaceholder: 'Enter your new name',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            });

            if (name) {
                player.appearanceChanged = true;
                gameData.name[1209].data.value = name;
                gameData.name[1209].data.name = name;
                player.name.data.firstName = 1237;
                player.name.data.middleName = null;
                player.name.data.lastName = null;
                player.name.data.nickName = null;
                success(`Your name is now ${name}`);
            }
        });
    };
    document.head.appendChild(script);
}})();
