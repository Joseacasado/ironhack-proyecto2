window.onload = function () {
    document.querySelector('#profile-pic-btn').addEventListener('click', function () {
        document.querySelector('.pic-form').classList.remove('hide')
    })

    document.querySelector('.btn-danger').addEventListener('click', function () {
        document.querySelector('.pic-form').classList.add('hide')
    })

    $('input[type="file"]').change(function (e) {
        document.querySelector('.custom-file-label').textContent = e.target.files[0].name;
    })
}