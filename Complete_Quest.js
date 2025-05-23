(async () => {
    // Inject SweetAlert2
    const swalScript = document.createElement('script');
    swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(swalScript);
    await new Promise((resolve) => {
        swalScript.onload = resolve;
    });

    // Define utility functions
    const getHack = () => {
        // @ts-expect-error
        return window.Boot.prototype.game;
    };

    const getWorld = () => {
        const hack = getHack();
        return hack._state._current._world;
    };

    async function InputTypes_select(title, options) {
        const { value: input } = await Swal.fire({
            title: title,
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Select an option',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '') {
                        resolve('You need to select an option');
                    } else {
                        resolve();
                    }
                });
            }
        });
        return input;
    }

    function success(message) {
        Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 0,
            timerProgressBar: false
        });
    }

    function error(message) {
        Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 0,
            timerProgressBar: false
        });
    }

    // Define the Complete Current Task In Quest hack
    const completeCurrentTaskInQuestHack = async () => {
        const world = getWorld();
        const zones = {};
        Object.keys(world.zones).forEach(element => {
            zones[element] = world.zones[element].name;
        });
        const questName = Object.keys(zones)[await InputTypes_select("Please select the quest you want to complete.", Object.values(zones))];
        const questID = world.zones[questName].getCurrentQuestID();
        if (world.zones[questName].completeQuest(questID)) {
            world.goToZoneHub(questName);
            success(`Completed current task in the ${world.zones[questName].name} quest successfully!`);
        } else {
            error("There was an error completing the quest. Did you already complete it?");
        }
    };

    // Assign the onclick handler after loading SweetAlert2
    document.getElementById('completeQuest').onclick = () => {
        completeCurrentTaskInQuestHack();
    };
})();
