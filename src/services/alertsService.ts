import Swal from 'sweetalert2';

async function confirmAlert(question: string, action: Function) {
  const { isConfirmed } = await Swal.fire({
    title: question,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    width: '400px',
    padding: '1em',
    background: 'black',
    showClass: {
      popup: '',
    },
    hideClass: {
      popup: '',
    },
    color: '#A2AEBB',
    confirmButtonColor: '#969A97',
    cancelButtonColor: 'goldenrod',
  });

  if (isConfirmed) {
    action();
  }
}

function infoAlert(info: string) {
  Swal.fire({
    title: info,
    showCancelButton: false,
    confirmButtonText: 'Ok',
    width: '400px',
    padding: '1em',
    background: 'goldenrod',
    showClass: {
      popup: '',
    },
    hideClass: {
      popup: '',
    },
    color: 'black',
    confirmButtonColor: 'black',
  });
}
export { confirmAlert, infoAlert };
