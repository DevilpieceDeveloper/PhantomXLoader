(function() {
    document.getElementById('clearInventory').onclick = function() {
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

        // Function to wipe all items from the player's inventory
        function wipeItems() {
            // Ensure that Player and GameData are properly defined
            var Player = Boot.prototype.game._state._current.user.source;
            var GameData = Boot.prototype.game._state._states.get("Boot")._gameData;

            if (Player && Player.backpack && Player.backpack.data) {
                var itemTypes = ['item', 'currency', 'boots', 'hat', 'outfit', 'mount', 'relic', 'follow', 'weapon'];
                itemTypes.forEach(type => {
                    var fieldName = (type === 'relic') ? 'spellRelic' : type;
                    if (Player.backpack.data[fieldName] !== undefined) {
                        Player.backpack.data[fieldName] = [];
                    }
                });
                Player.appearanceChanged = true;
                // SweetAlert success message
                Swal.fire({
                    icon: "success",
                    title: `Successfully deleted all items`,
                    text: `You Have Now Deleted All Items`,
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: true
                });
            }
        }

        // Function to show a confirmation dialog using SweetAlert
        function confirmAndWipeItems() {
            Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                text: "This will delete all items from your inventory!",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    wipeItems();
                }
            });
        }

        // Function to inject SweetAlert library if not already loaded, then call confirmAndWipeItems
        function injectSweetAlertAndConfirm() {
            if (typeof Swal === 'undefined') {
                loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11', confirmAndWipeItems);
            } else {
                confirmAndWipeItems();
            }
        }

        // Call the function to inject SweetAlert and show confirmation dialog
        injectSweetAlertAndConfirm();
    };
})();
