(function() {
    document.getElementById('addPet').onclick = async function() {
    // Inject SweetAlert script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(script);

    // Define randomIntFromInterval function
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Wait for SweetAlert script to load
    script.onload = async function() {
        // Access gameData and player
        const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;
        const player = Boot.prototype.game._state._current.user.source;

        // Function to calculate XP based on level
        const calculateXP = (level) => {
            if (level === 1) {
                return 0;
            } else if (level === 2) {
                return 10;
            } else {
                const offsetLevel = level - 2;
                const xpConstant = 1.042;
                return Math.round((((1 - Math.pow(xpConstant, offsetLevel)) / (1 - xpConstant)) * 20) + 10);
            }
        };

        // Function to update encounter info
        const updateEncounterInfo = (player, petID) => {
            const encounterInfoPet = player.kennel._encounterInfo._data.pets.find(e => e.ID === petID);
            if (encounterInfoPet) {
                encounterInfoPet.timesRescued++;
            } else {
                player.kennel._encounterInfo._data.pets.push({
                    firstSeenDate: Date.now() - randomIntFromInterval(20000, 120000),
                    ID: petID,
                    timesBattled: 1,
                    timesRescued: 1
                });
            }
        };

        // Function to add a pet using SweetAlert for input and success message
        const addPet = async () => {
            const petNames = gameData.pet.map(x => x.data.name).sort((a, b) => a.localeCompare(b));

            const petResult = await Swal.fire({
                title: 'Select a Pet',
                input: 'select',
                inputOptions: Object.fromEntries(petNames.map((name, index) => [index, name])),
                inputPlaceholder: 'Select a pet',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a pet!';
                    }
                }
            });

            if (!petResult.isConfirmed) {
                return; // Exit if pet selection is canceled
            }

            const petIndex = petResult.value;
            const pet = gameData.pet.find(p => p.data.name === petNames[petIndex]);

            const levelResult = await Swal.fire({
                title: 'Enter Pet Level',
                input: 'number',
                inputAttributes: {
                    min: 1,
                    max: 100,
                    step: 1,
                    placeholder: 'Enter level'
                },
                inputValidator: (value) => {
                    if (!value || value < 1 || value > 100) {
                        return 'Please enter a valid level between 1 and 100';
                    }
                }
            });

            if (!levelResult.isConfirmed) {
                return; // Exit if level entry is canceled
            }

            const level = parseInt(levelResult.value);
            const xp = calculateXP(level);

            player.kennel.addPet(pet.ID.toString(), null, xp, level);
            updateEncounterInfo(player, pet.ID);

            Swal.fire({
                icon: "success",
                title: `Successfully Added Pet!`,
                text: `You Have Now Added Pet: ${pet.data.name}`,
                toast: true,
                position: 'bottom',
                showConfirmButton: true
            });
        };

        // Call the addPet function to start the process
        addPet();
    };
}})();