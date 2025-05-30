(function(){
    document.getElementById('savePet').onclick = async function() {
    Boot.prototype.game._state._current.user.source.kennel.updated = true;
    
    // Inject SweetAlert2 into the page
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.onload = function() {
        Swal.fire({
            title: 'Success',
            text: `Pet Data Has Been Saved Successfully`,
            icon: 'success',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
        });
    };
    document.head.appendChild(script);
}})();
