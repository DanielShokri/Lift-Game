const dialog = document.querySelector("dialog");
const modalSubmitButton = document.querySelector('#modalSubmitButton');
const modalCancelButton = document.querySelector('#modalCloseButton');
export const floorNumberInput = document.querySelector('#floorNumberInput');
const form = document.querySelector('form');
let floorNumber = 0;

export const showModal = () => {
    return new Promise((resolve, reject) => {
        dialog.showModal();
        dialog.addEventListener('close', (event) => {
            if (floorNumber) {
                resolve(submitModal(event));
            } else {
                reject('Modal closed without submitting');
            }

        });
    });
}

export const submitModal = (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        floorNumberInput.setCustomValidity('Please enter a valid floor number');
        form.reportValidity();
        return;
    }
    floorNumber = Number(floorNumberInput.value);
    dialog.close();
    return floorNumber;
}


modalCancelButton.addEventListener('click', () => {
    dialog.close();
});

modalSubmitButton.addEventListener('click', submitModal);
