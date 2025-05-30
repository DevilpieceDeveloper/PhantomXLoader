(async () => {
  document.getElementById('memberStar').onclick = async function() {
    // Inject SweetAlert2
    const swalScript = document.createElement('script');
    swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    document.head.appendChild(swalScript);
    await new Promise((resolve) => {
      swalScript.onload = resolve;
    });

    // Define the InputTypes.integer function using SweetAlert2
    const InputTypes = {
      integer: async (title, min, max) => {
        const { value: input, isConfirmed } = await Swal.fire({
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
                Swal.showValidationMessage(`Value must be between ${min} and ${max}`);
              } else {
                resolve(value);
              }
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
        if (isConfirmed) {
          return input;
        } else {
          return null;
        }
      }
    };

    // Define the success function using SweetAlert2
    const success = (message) => {
      Swal.fire({
        icon: "success",
        title: `Success!`,
        text: `${message}`,
        toast: true,
        position: 'bottom',
        showConfirmButton: true
      });
    };

    // Define the Set Member Stars hack
    const setMemberStarsHack = async () => {
      const value = await InputTypes.integer("Please enter the amount of Member stars you want to get.", 1, 9999999);
      if (value !== null) {
        player.data.storedMemberStars = value;
        success(`You now have ${value} member stars.`);
      }
    };

    // Get the player object
    const player = Boot.prototype.game._state._current.user.source;

    // Execute the Set Member Stars hack
    setMemberStarsHack();
  };
})();
