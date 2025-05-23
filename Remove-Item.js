(function() {
    document.getElementById('removeItem').onclick = async function() {
        const player = Boot.prototype.game._state._current.user.source;
        const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;
        const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"];
        const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"];

        async function deleteItem(title, description, handler) {
            const swalPrompt = await Swal.fire({
                title: title,
                html: description,
                icon: "info",
                input: 'select',
                inputOptions: names.reduce((options, name, index) => {
                    options[name] = name; // Display name as both value and label
                    return options;
                }, {}),
                inputPlaceholder: 'Select item category',
                showCancelButton: true,
                confirmButtonText: 'Next &rarr;',
                cancelButtonText: 'Cancel',
                allowOutsideClick: false,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select an item category';
                    }
                }
            });

            if (swalPrompt.isConfirmed) {
                const itemCategory = swalPrompt.value;
                const itemCategoryId = ids[names.indexOf(itemCategory)];
                const itemCategoryOptions = gameData[itemCategoryId]?.filter(e => player.backpack.data[itemCategoryId]?.some(f => e.ID === f.ID)) || [];

                const swalPrompt2 = await Swal.fire({
                    title: `Select ${itemCategory} to remove`,
                    input: 'select',
                    inputOptions: itemCategoryOptions.reduce((options, option, index) => {
                        options[option.data.name] = option.data.name; // Display item name as both value and label
                        return options;
                    }, {}),
                    showCancelButton: true,
                    confirmButtonText: 'Next &rarr;',
                    cancelButtonText: 'Cancel',
                    allowOutsideClick: false,
                    inputValidator: (value) => {
                        if (!value) {
                            return `You need to select a ${itemCategory} to remove`;
                        }
                    }
                });

                if (swalPrompt2.isConfirmed) {
                    const selectedItemName = swalPrompt2.value;
                    const selectedItem = itemCategoryOptions.find(option => option.data.name === selectedItemName);

                    const swalPrompt3 = await Swal.fire({
                        title: `Remove ${selectedItem.data.name}`,
                        input: 'number',
                        inputLabel: `Enter the amount of ${selectedItem.data.name} to remove`,
                        inputAttributes: {
                            min: 0,
                            max: selectedItem.N,
                            step: 1
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Remove',
                        cancelButtonText: 'Cancel',
                        allowOutsideClick: false,
                        inputValidator: (value) => {
                            if (!value || value <= 0 || value > selectedItem.N) {
                                return `Enter a valid amount between 1 and ${selectedItem.N}`;
                            }
                        }
                    });

                    if (swalPrompt3.isConfirmed) {
                        const amountToRemove = parseInt(swalPrompt3.value);
                        const indexOfItem = player.backpack.data[itemCategoryId].findIndex(i => i.ID === selectedItem.ID);

                        if (amountToRemove >= player.backpack.data[itemCategoryId][indexOfItem].N) {
                            player.backpack.data[itemCategoryId].splice(indexOfItem, 1);
                        } else {
                            player.backpack.data[itemCategoryId][indexOfItem].N -= amountToRemove;
                        }

                        // Force save
                        Boot.prototype.game._state._current.user.source.backpack.updated = true;

                        Swal.fire({
                            icon: "success",
                            title: `Removed Item!`,
                            text: `${amountToRemove} ${selectedItem.data.name} removed successfully`,
                            toast: true,
                            position: 'bottom',
                            showConfirmButton: true
                        });
                    }
                }
            }
        }

        // Execute the deleteItem function
        deleteItem("Delete Item", "Precisely delete an item from your inventory.", deleteItem);
    };
})();
