import Swal from 'sweetalert2';

async function confirmAlert(question: string, action: Function) {
  const { isConfirmed } = await Swal.fire({
    title: question,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    width: '300px',
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
export { confirmAlert };
