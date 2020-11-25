document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');


  let successMsg = document.querySelector('.successMsg span')

  successMsg ? setTimeout(() => {
    document.querySelector('.successMsg').classList.add('hide')
  }, 4000) : null

}, false);
