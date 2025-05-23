(function(){
    document.getElementById('fixBattle').onclick = async function() {
    
        // Load SweetAlert2
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(script);

    script.onload = () => {
        // Define player using Boot.prototype.game._state._current.user.source
        const player = Boot.prototype.game._state._current.user.source;

        // Function to fix the battle crash
        player.kennel.petTeam.forEach((v) => {
            if (v && v.assignRandomSpells) v.assignRandomSpells();
        });

        // Show success message using SweetAlert2 at the bottom-center of the screen
        Swal.fire({
            icon: "success",
            title: `Success`,
            text: `The battle crash should be fixed.`,
            toast: true,
            position: 'bottom',
            showConfirmButton: true
        });
    };
}})();
