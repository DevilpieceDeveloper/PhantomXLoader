(function() {
    document.getElementById('findUserId').onclick = async function() {
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

    // Function to retrieve User IDs of players on the screen
    async function findUserIdsOnScreen() {
        try {
            // Access player list from game environment
            const users = Boot.prototype.game._state._current.playerList || {};

            // Check if there are users on the screen
            if (Object.keys(users).length === 0) {
                throw new Error("There are no other players on the screen.");
            }

            // Prepare HTML content for displaying user IDs
            const userListHTML = Object.keys(users).map(userId => {
                return `<li>User Id: ${userId} - ${users[userId].nameText.textSource.source}</li>`;
            }).join("");

            // Display user IDs using SweetAlert2
            const { isConfirmed } = await Swal.fire({
                icon: 'info',
                title: "Users on the screen",
                html: `<div style="user-select: text; -webkit-user-select: text;"><ul style="list-style-type: disc; padding-left: 20px;" id="userList">${userListHTML}</ul></div>`,
                showConfirmButton: true,
                confirmButtonText: "Close"
            });

            if (isConfirmed) {
                Swal.close(); // Close the dialog if confirmed
            }
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    }

    // Function to inject SweetAlert library if not already loaded, then call findUserIdsOnScreen
    function injectSweetAlertAndExecute() {
        if (typeof Swal === 'undefined') {
            loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11', () => {
                findUserIdsOnScreen();
            });
        } else {
            findUserIdsOnScreen();
        }
    }

    // Call the function to prompt for input and execute the hack
    injectSweetAlertAndExecute();
}})();
