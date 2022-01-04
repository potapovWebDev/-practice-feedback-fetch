const form = document.querySelector('form');

postData(form);

const formMessage = {
    loading: 'url...',
    success: 'Твое письмо скоро прочитает дед мороз',
    error: 'Извини но что то паломалось'
};

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        fetch ('server.php', {
            method: 'POST',
            body: formData
        })
        .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(formMessage.success);
        })
        .catch(() => {
            showThanksModal(formMessage.error)
        })
        .finally(() => {
            form.reset();
        });
    });
}

function openModal() {
    document.querySelector('.modal').classList.add('active')
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__title">${message}</div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.remove('hide');
        document.querySelector('.modal').classList.remove('active')
    }, 2000);
}

