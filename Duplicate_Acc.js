(function() {
    document.getElementById('dup').onclick = async function() {
    // Include SweetAlert library
    const addSweetAlertScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load SweetAlert2'));
            document.head.appendChild(script);
        });
    };

    // Inject SweetAlert2 and main functionality
    addSweetAlertScript().then(() => {
        const hack = window.Boot.prototype.game;

        const getHack = () => {
            return window.Boot.prototype.game;
        };

        const setFromUserID = async (userId) => {
            const hack = getHack();
            if (!hack?._rootContainer?._inversifyContainer?._bindingDictionary?._map) return false;
            const data = Object.fromEntries(hack?._rootContainer._inversifyContainer._bindingDictionary._map);
            const key = Object.keys(data).find(e => data[e][0].cache?._playerDataProvider);
            const playerDataProvider = data[key][0].cache._playerDataProvider;
            const token = hack.input.onDown._bindings[0]._context.jwtAuthProvider.getToken();
            const playerData = (await (await fetch(`https://api.prodigygame.com/game-api/v2/characters/${userId}?fields=inventory%2Cdata%2CisMember%2Ctutorial%2Cpets%2Cencounters%2Cquests%2Cappearance%2Cequipment%2Chouse%2Cachievements%2Cstate&userID=${playerDataProvider.player.userID}`, { headers: { Authorization: `Bearer ${token}` } })).json())[userId];
            console.log(playerData);
            playerDataProvider.player.init({ ...playerData, token });
            playerDataProvider.initialize(playerDataProvider.player);
            return true;
        };

        const hackFunction = async () => {
            const userId = await Swal.fire({
                title: 'Enter UserId',
                input: 'text',
                inputLabel: 'Please enter the UserId of the account you want to copy. Warning: this will delete your current account.',
                inputPlaceholder: 'UserId',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                confirmButtonText: 'Copy',
                cancelButtonText: 'Cancel',
                showCancelButton: true
            }).then(result => result.value);

            if (userId) {
                const accountCopied = await setFromUserID(userId);
                if (accountCopied) {
                    Swal.fire('Success', `Account ${userId} has been copied to your account.`, 'success');
                } else {
                    Swal.fire('Error', `Account ${userId} could not be copied.`, 'error');
                }
            }
        };

        hackFunction();
    }).catch(error => {
        console.error('Error:', error);
    });
}})();
