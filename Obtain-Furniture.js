(function() {
    document.getElementById('obtainFurniture').onclick = function() {
    // Function to load a script dynamically
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  // IE
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Others
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Function to obtain a certain amount of every furniture item
    async function obtainFurnitureItems(player, gameData) {
        const value = await Swal.fire({
            title: 'Enter amount',
            input: 'number',
            inputLabel: 'Please enter the amount of every furniture item you want to get',
            inputAttributes: {
                min: 0,
                max: 9999,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Get Furniture',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                // Set the number of each furniture item in the player's house data
                gameData.dorm.forEach(x => {
                    player.house.data.items[x.ID] = {
                        A: [],
                        N: value
                    }
                });
                return value;
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (value.isConfirmed) {
            // SweetAlert success message
            Swal.fire({
                icon: "success",
                title: `Successfully obtained ${value.value} furniture items`,
                text: `You Have Now Obtained ${value.value} Furniture Items`,
                toast: true,
                position: 'bottom',
                showConfirmButton: true
            });
        }
    }

    // Function to inject SweetAlert library if not already loaded, then call obtainFurnitureItems
    function injectSweetAlertAndObtainFurnitureItems() {
        if (typeof Swal === 'undefined') {
            loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11', () => obtainFurnitureItems(player, gameData)); // Updated to SweetAlert2 v11
        } else {
            obtainFurnitureItems(player, gameData);
        }
    }

    // Access player and gameData directly from the game environment
    const player = Boot.prototype.game._state._current.user.source;
    const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

    // Call the function to show input dialog and obtain furniture items
    injectSweetAlertAndObtainFurnitureItems();
}})();
