(async () => {
    document.getElementById('changeName').onclick = async function() {    
        // Inject SweetAlert script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);

        // Helper function to create select options
        function createSelectOptions(names, selectedId, filterType) {
            return names
                .filter(e => e.data.type === filterType)
                .map(n => `<option value="${n.ID}" ${n.ID === selectedId ? 'selected' : ''}>${n.name}</option>`)
                .join('');
        }

        // Function to generate the player name form
        function generatePlayerNameForm(names, nicknames, obj) {
            const firstNameOptions = createSelectOptions(names, obj.first, 0);
            const middleNameOptions = createSelectOptions(names, obj.middle, 1);
            const lastNameOptions = createSelectOptions(names, obj.last, 2);
            const nicknameOptions = nicknames.map(n => {
                const replacedName = n.data.value.replace("{first}", names.find(e => e.ID === obj.first)?.name ?? "");
                return `<option value="${n.ID}" ${n.ID === obj.nickname ? 'selected' : ''}>${replacedName}</option>`;
            }).join('');

            return `
                <div>
                    <select id="firstName" class="swal2-select">${firstNameOptions}</select>
                    <select id="middleName" class="swal2-select">${middleNameOptions}</select>
                    <select id="lastName" class="swal2-select">${lastNameOptions}</select>
                    <select id="nickname" class="swal2-select">
                        <option value="-1" ${obj.nickname === null ? 'selected' : ''}>None</option>
                        ${nicknameOptions}
                    </select>
                </div>
            `;
        }

        // Main function
        async function hack(name, description, fn) {
            const player = Boot.prototype.game._state._current.user.source;
            const gameData = Boot.prototype.game._state._states.get("Boot")._gameData;

            const names = gameData.name;
            const nicknames = gameData.nickname;
            const objInfo = {
                first: player.name.data.firstName,
                middle: player.name.data.middleName,
                last: player.name.data.lastName,
                nickname: player.name.data.nickname
            };

            try {
                const result = await Swal.fire({
                    title: 'Set Player Name',
                    html: generatePlayerNameForm(names, nicknames, objInfo),
                    showCancelButton: true,
                    preConfirm: () => {
                        const firstName = parseInt(document.getElementById('firstName').value);
                        const middleName = parseInt(document.getElementById('middleName').value);
                        const lastName = parseInt(document.getElementById('lastName').value);
                        const nickname = parseInt(document.getElementById('nickname').value);

                        objInfo.first = firstName;
                        objInfo.middle = middleName;
                        objInfo.last = lastName;
                        objInfo.nickname = nickname === -1 ? null : nickname;
                    }
                });

                if (result.isDismissed) throw new Error('Operation cancelled');

                player.name.data.firstName = objInfo.first;
                player.name.data.middleName = objInfo.middle;
                player.name.data.lastName = objInfo.last;
                player.name.data.nickname = objInfo.nickname;
                
                // Update appearance flags
                Boot.prototype.game._state._current.user.source.appearance.updated = true;
                Boot.prototype.game._state._current.user.source.appearanceChanged = true;

                Swal.fire({
                    title: 'Success',
                    text: `You are now ${player.name.getName()}.`,
                    icon: 'success',
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancelled',
                    text: 'Operation cancelled.',
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true
                });
            }
        }

        hack("Change Name", "Changes the name of your player.", async (hack, player, gameData) => {});
    }
})();
