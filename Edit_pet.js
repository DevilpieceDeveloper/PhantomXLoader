(async () => {
    document.getElementById('editPet').onclick = async function() {
        const hack = Boot.prototype.game;
        const player = Boot.prototype.game._state._current.user.source;
        const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

        // Import SweetAlert
        const swalScript = document.createElement('script');
        swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(swalScript);
        await new Promise(resolve => swalScript.onload = resolve);

        // Utility function to display success message as a toast with default color scheme
        const success = (message) => {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    position: 'bottom',
                    toast: true,
                    text: message,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    timer: 5000,
                    timerProgressBar: true,
                    showCloseButton: true
                });
            } else {
                console.error('SweetAlert2 is not defined');
            }
        };

        // Utility functions
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getHpFromPet(level, petGameData) {
            const statValue = petGameData.data.statHealth;
            const level1Hp = (500 / 1.25) * Math.pow((Math.pow(1.25, 0.25)), statValue - 1);
            const hpInc = (100 / 1.25) * Math.pow((Math.pow(1.25, 0.25)), statValue - 1);
            return Math.ceil(level1Hp + (level - 1) * hpInc);
        }

        function getXP(level) {
            if (level === 1) {
                return 0;
            } else if (level === 2) {
                return 10;
            }
            const offsetLevel = level - 2;
            const xpConstant = 1.042;
            return Math.round((((1 - Math.pow(xpConstant, offsetLevel)) / (1 - xpConstant)) * 20) + 10);
        }

        // Function to handle user input with SweetAlert
        const InputTypes = {
            select: async (title, options, selectedIndex = 0) => {
                const { value } = await Swal.fire({
                    title,
                    input: 'select',
                    inputOptions: options,
                    inputValue: selectedIndex,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) return 'You need to choose something!';
                    }
                });
                return parseInt(value, 10);
            },
            string: async (title, inputValue = '') => {
                const { value } = await Swal.fire({
                    title,
                    input: 'text',
                    inputValue,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) return 'You need to enter a value!';
                    }
                });
                return value;
            },
            integer: async (title, min, max, inputValue) => {
                const { value } = await Swal.fire({
                    title,
                    input: 'number',
                    inputAttributes: {
                        min: min,
                        max: max
                    },
                    inputValue,
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value || value < min || value > max) return `Please enter a value between ${min} and ${max}!`;
                    }
                });
                return parseInt(value, 10);
            }
        };

        // Main Hack
        const pet = await InputTypes.select("Which pet do you want to edit?", player.kennel.data.map(x => `${x.nickname ?? gameData.pet.find(i => +i.ID === +x.ID)?.data.name ?? "Unknown"} | Level ${x.level}`));
        const petToEdit = player.kennel.data[pet];
        const wantToEdit = await InputTypes.select("What do you want to edit?", ["Nickname", "Level"]);

        if (wantToEdit === 0) {
            const nickname = await InputTypes.string("Please enter the new nickname.", petToEdit.nickname);
            petToEdit.nickname = nickname;
            success(`${petToEdit.nickname ?? gameData.pet.find(e => e.ID == petToEdit.ID)?.name ?? "Unknown"} is now nicknamed ${petToEdit.nickname}`);
        } else if (wantToEdit === 1) {
            const level = await InputTypes.integer("Please enter the new level.", 1, 500, petToEdit.level);
            petToEdit.level = level;
            petToEdit.stars = getXP(level);
            petToEdit.hp = getHpFromPet(level, gameData.pet.find(e => e.ID == petToEdit.ID));
            success(`${petToEdit.nickname ?? gameData.pet.find(e => e.ID == petToEdit.ID)?.name ?? "Unknown"} is now level ${petToEdit.level} with ${petToEdit.hp} HP`);
        }
    }
})();
