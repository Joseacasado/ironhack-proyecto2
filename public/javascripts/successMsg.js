document.addEventListener('DOMContentLoaded', () => {
  let successMsg = document.querySelector('.successMsg span')

  successMsg ? setTimeout(() => {
    document.querySelector('.successMsg').classList.add('hide')
  }, 4000) : null

}, false);
