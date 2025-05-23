(function() {
    document.getElementById('deletePet').onclick = async function() {
    // Inject SweetAlert script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(script);

    // Define the bookmarklet function
    const deletePet = async () => {
        // Access gameData and player
        const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;
        const player = Boot.prototype.game._state._current.user.source;

        // Function to generate petsArray for selection
        const generatePetsArray = () => {
            const petsArray = [];
            player.kennel.data.sort((a, b) => (a.nickname ?? gameData.pet.find(i => +i.ID === +a.ID)?.data.name ?? "Unknown").localeCompare(b.nickname ?? gameData.pet.find(i => +i.ID === +b.ID)?.data.name ?? "Unknown")).forEach(x => {
                petsArray.push(`${x.nickname ?? gameData.pet.find(i => +i.ID === +x.ID)?.data.name ?? "Unknown"} | Level ${x.level}`);
            });
            return petsArray;
        };

        // Function to delete a pet
        const deleteSelectedPet = async () => {
            const petsArray = generatePetsArray();
            const petIndex = await Swal.fire({
                title: 'Select a Pet to Delete',
                input: 'select',
                inputOptions: Object.fromEntries(petsArray.map((pet, index) => [index, pet])),
                inputPlaceholder: 'Select a pet',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a pet!';
                    }
                }
            });

            if (!petIndex.isConfirmed) {
                return; // Exit if pet selection is canceled
            }

            const confirmedPetIndex = petIndex.value;
            player.kennel.data.splice(confirmedPetIndex, 1);

            Swal.fire({
                icon: "success",
                title: `Successfully deleted pet`,
                text: `You Have Now Deleted Pet: ${petsArray[confirmedPetIndex]}`,
                toast: true,
                position: 'bottom',
                showConfirmButton: true
            });  
        };

        // Call deleteSelectedPet function to start the deletion process
        deleteSelectedPet();
    };

    // Call deletePet function to initiate the process
    deletePet();
}})();