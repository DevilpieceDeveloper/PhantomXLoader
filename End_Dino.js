(function(){
    document.getElementById('endDino').onclick = async function() {    
        var hack = Boot.prototype.game;
        
        function hackDinoDig() {
        if (!hack._state._states.get("DinoDig")?.timer?.addTime) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You are not in dino dig.',
                confirmButtonText: 'Ok'
            });
            return;
        }
        hack._state._states.get("DinoDig")?.timer?.addTime(-9e15); // Subtract 285,388.1278538812694 years.
        Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'The dino dig game has been ended.',
            showConfirmButton: true,
            confirmButtonText: 'Ok'
        });
    }
    
    hackDinoDig();
}})();
