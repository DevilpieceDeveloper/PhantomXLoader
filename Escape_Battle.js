(async () => {
    document.getElementById('escape').onclick = async function() {
  // Inject SweetAlert2
  const swalScript = document.createElement('script');
  swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(swalScript);
  await new Promise((resolve) => {
    swalScript.onload = resolve;
  });

  // Define the success function using SweetAlert2
  const success = (message) => {
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  // Define the error function using SweetAlert2
  const error = (message) => {
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  try {
    Boot.prototype.game._state._current.exitBattle();
    success('Successfully escaped battle!');
  } catch (e) {
    error('Unable to escape battle.');
  }}})();