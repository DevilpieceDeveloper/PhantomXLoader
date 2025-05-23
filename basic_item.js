(async () => {
    document.getElementById('selectorBasic').onclick = async function() {
    // Load SweetAlert script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(script);
    await new Promise(resolve => script.onload = resolve);

    // Helper function to prompt for an integer input
    async function promptInteger(title, min, max) {
        const { value: amount } = await Swal.fire({
            title: title,
            input: 'number',
            inputAttributes: {
                min: min,
                max: max,
                step: 1
            },
            inputValidator: (value) => {
                if (!value || value < min || value > max) {
                    return `Please enter a number between ${min} and ${max}.`;
                }
            },
            showCancelButton: true
        });
        return amount;
    }

    // Helper function to prompt for a selection
    async function promptSelect(title, options) {
        const { value: selected } = await Swal.fire({
            title: title,
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Select an option',
            showCancelButton: true
        });
        return selected;
    }

    // itemify function to format items
    function itemify(item, amount) {
        return item.map(i => ({
            ID: i.ID,
            N: amount
        })).filter(v => v !== undefined);
    }

    const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"];
    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"];
    const player = Boot.prototype.game._state._current.user.source;
    const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

    const value = await promptSelect("Please select the category of items you want to get.", names);
    const name = names[value];
    const id = ids[value];
    let amount = await promptInteger(`Please enter the amount of ${name.toLowerCase()} you want to get.`, 0, 9999);
    if (id === "mount") amount = Math.min(amount, gameData.mount.length);
    player.backpack.data[id] = itemify(gameData[id].filter(i => id === "follow" ? ![125, 126, 127, 128, 129, 134, 135, 136, 137].includes(i.ID) : i), amount);

    Swal.fire({
        icon: "success",
        title: `You Have Now Added ${amount} ${name.toLowerCase()}`,
        text: `${amount} ${name.toLowerCase()} have been added to your backpack.`,
        toast: true,
        position: 'bottom',
        showConfirmButton: true
    });    
}})();