(function() {
    document.getElementById('itemStacker').onclick = function() {
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

    // Function to itemify an item array with a specific amount
    function itemify(item, amount) {
        return item.map(i => ({
            ID: i.ID,
            N: amount
        })).filter(v => v !== undefined);
    }

    // Function to get all items and stack them
    function getAllItems(player, gameData, value) {
        const ids = ['item', 'currency', 'boots', 'hat', 'outfit', 'mount', 'relic', 'follow', 'weapon'];

        ids.forEach(id => {
            player.backpack.data[id] = itemify(gameData[id].filter(l => id === "follow" ? ![125, 126, 127, 128, 129, 134, 135, 136, 137].includes(l.ID) : l), value);
        });

        gameData.dorm.forEach(x => {
            player.house.data.items[x.ID] = { A: [], N: value };
        });

        const bountyIndex = () => player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86);
        while (bountyIndex() > -1) {
            player.backpack.data.item.splice(bountyIndex(), 1);
        }

        // Ensure changes are saved
        player.backpack.updated = true;
    }

    // Function to show success message using SweetAlert
    function success(message) {
        Swal.fire({
            icon: 'success',
            title: 'Item Stacker',
            text: message,
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }

    // Function to inject SweetAlert library if not already loaded, then call getAllItems and show success message
    function injectSweetAlertAndExecute(player, gameData, value) {
        if (typeof Swal === 'undefined') {
            loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11', () => {
                getAllItems(player, gameData, value);
                success(`You now have ${value} of every item.`);
            });
        } else {
            getAllItems(player, gameData, value);
            success(`You now have ${value} of every item.`);
        }
    }

    // Access player and gameData directly from the game environment
    const player = Boot.prototype.game._state._current.user.source;
    const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

    // Call the function to prompt for input and execute the hack
    Swal.fire({
        title: 'Item Stacker',
        text: 'Please enter the amount of every item you want to get',
        input: 'number',
        inputAttributes: {
            min: 0,
            max: 9999,
            step: 1
        },
        showCancelButton: true,
        confirmButtonText: 'Get Items',
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
            injectSweetAlertAndExecute(player, gameData, value);
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}})();
