(async () => {
  document.getElementById('setLevel').onclick = async function() {
    // Inject SweetAlert2
    const swalScript = document.createElement('script');
    swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(swalScript);
    await new Promise((resolve) => {
      swalScript.onload = resolve;
    });

    // Define the hack function
    const hack = (name, description, callback) => {
      console.log(`Hack: ${name} - ${description}`);
      callback(hack, player);
    };

    // Define the InputTypes.integer function using SweetAlert2
    const InputTypes = {
      integer: async (title, min, max) => {
        const { value: level, isConfirmed } = await Swal.fire({
          title: title,
          input: 'number',
          inputAttributes: {
            min: min,
            max: max,
            step: 1
          },
          inputValue: min,
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            return new Promise((resolve) => {
              if (value < min || value > max) {
                Swal.showValidationMessage(`Level must be between ${min} and ${max}`);
              } else {
                resolve(value);
              }
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
        if (isConfirmed) {
          return level;
        } else {
          return null;
        }
      }
    };

    // Define the success function using SweetAlert2
    const success = (message) => {
      Swal.fire({
        title: 'Success',
        text: `${message}`,
        icon: 'success',
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000
      });
    };

    // Define the changeLevel function
    function changeLevel(level, player) {
      if (level === 1) {
        player.data.stars = 0;
      } else if (level === 2) {
        player.data.stars = 10;
      } else {
        const offsetLevel = level - 2;
        const xpConstant = 1.042;
        player.data.stars = Math.round((((1 - Math.pow(xpConstant, offsetLevel)) / (1 - xpConstant)) * 20) + 10);
      }

      player.data.level = level;
    }

    // Get the player object
    const player = Boot.prototype.game._state._current.user.source;

    // Execute the hack
    hack("Set Level", "Sets the level of your player.", async (hack, player) => {
      const value = await InputTypes.integer("Please enter the level you want to be.", 1, 100);
      if (value !== null) {
        changeLevel(value, player);
        success(`You are now level ${value}.`);
      }
    });
  }
})();
