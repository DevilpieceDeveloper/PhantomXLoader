// Permanent Morph button functionality
        document.getElementById('permanentMorphButton').onclick = function() {
            let player = Boot.prototype.game._state._current.user.source;
            
            if (!player.isPlayerTransformed()) {
                Swal.fire({
                    title: "Error",
                    text: "You are not morphed. Use a morph marble and try again.",
                    icon: "error",
                    button: "OK"
                });
                return;
            }
            
            player.data.playerTransformation.maxTime = Infinity;
            player.data.playerTransformation.timeRemaining = Infinity;
            
            Swal.fire({
                title: "Success",
                text: "Your morph will now last forever.",
                icon: "success",
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        };
