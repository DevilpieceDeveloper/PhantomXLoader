(function(){
    document.getElementById('pvpHealth').onclick = async function() {
    // Define the battle controller
    var battle = Boot.prototype.game._state._current._battleController;

    // Set the active unit's health to a high value
    battle.activeUnit.updateHp(100000000);
    battle.activeUnit.data.health.max = 100000000;

    // Import SweetAlert
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.onload = function() {
        // Display SweetAlert success message
        Swal.fire({
            icon: "success",
            title: `Health Set to 100000000`,
            text: `You can now fight with unlimited health!`,
            toast: true,
            position: 'bottom',
            showConfirmButton: true
        });
    };
    document.head.appendChild(script);
}})();
