let allTasks = [];
let valueInput = '';
const httpHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};
const urlGet = 'http://localhost:8000/tasks';
const urlOtherRout = 'http://localhost:8000/task';

//requests processing

async function requestProcessingGet(db) {
    document.querySelector('.spinner').style.display = 'flex';
    try {
        let mess;
        const resp = await fetch(urlGet, {
            method: 'GET',
            headers: httpHeaders
        });
        if (resp.status === 200) {
            let result = await resp.json();
            db = result.data;
            return db;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        builderBlockError(mess);
    }
}

async function requestProcessingPost(newValue) {
    document.querySelector('.spinner').style.display = 'flex';
    try {
        let mess;
        const resp = await fetch(urlOtherRout, {
            method: 'POST',
            headers: httpHeaders,
            body: JSON.stringify({
                text: newValue,
                isCheck: false
            })
        });
        if (resp.status === 200) {
            return resp;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        builderBlockError(mess);
    }
}

async function requestProcessingPatch(newText, newCheck, id) {
    document.querySelector('.spinner').style.display = 'flex';
    try {
        let mess;
        const resp = await fetch(urlOtherRout, {
            method: 'PATCH',
            headers: httpHeaders,
            body: JSON.stringify({
                _id: id,
                text: newText,
                isCheck: newCheck
            })
        });
        if (resp.status === 200) {
            return resp;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        await builderBlockError(mess);
    }
}

async function requestProcessingDelete(id) {
    document.querySelector('.spinner').style.display = 'flex';
    try {
        let mess;
        const resp = await fetch(urlOtherRout, {
            method: 'DELETE',
            headers: httpHeaders,
            body: JSON.stringify({
                _id: id
            })
        });
        if (resp.status === 200) {
            return resp;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        builderBlockError(mess);
    }
}

//Other

function updateValue(event) {
    valueInput = event.target.value;
}

async function builderBlockError(message) {
    const blockError = document.getElementById('main-error');
    const blockMessage = document.getElementById('message-error');
    blockError.className = "block-error-on";

    setTimeout(() => {
        blockError.className = "block-error-off";
    }, 3000);

    blockMessage.innerText = message;
}

async function addNewTask() {
    const checkValue = valueInput.trim();
    const blockInput = document.getElementById("data-entry");
    const checkingValues = valueInput != '' && checkValue != '';

    if (checkingValues) {
        try {
            const resp = await requestProcessingPost(checkValue);
            if (resp.status === 200) {
                blockInput.value = '';
                blockInput.focus();
                render();
            } else {
                throw new Error;
            }
        } catch (error) {
            builderBlockError('Ошибка добавлении задачи');
        }
    }
}

async function onChangeCheckbox(item) {
    item.isCheck = !item.isCheck;
    try {
        const resp = await requestProcessingPatch(item.text, item.isCheck, item._id);
        if (resp.status === 200) {
            render();
        } else {
            throw new Error;
        }
    } catch (error) {
        await builderBlockError('Ошибка изменения задачи');
    }
    render();
}

async function toChange(item, index) {
    const blockDivLeft = document.getElementById(`leftBlockId=${index}`);
    const getTextDiv = document.getElementById(`text=${index}`);
    const blockInput = document.getElementById("data-entry");
    const blockCheck = document.getElementById(`check-id=${index}`);

    const blockDivRight = document.getElementById(`rightBlockId=${index}`);
    const changeIcon = document.getElementById(`iconEdit=${index}`);
    const deleteIcon = document.getElementById(`iconDelete=${index}`);

    blockDivRight.removeChild(changeIcon);
    blockDivRight.removeChild(deleteIcon);
    blockDivLeft.removeChild(getTextDiv);
    blockDivLeft.removeChild(blockCheck);

    const introduceChanges = document.createElement('textarea');
    introduceChanges.className = 'change-in-content';
    introduceChanges.id = `input-text-id=${index}`;
    introduceChanges.value = `${item.text}`;
    introduceChanges.rows = `${Math.ceil(introduceChanges.value.length / 20)}`;
    introduceChanges.focus();
    introduceChanges.addEventListener('input', function () {
        introduceChanges.style.height = 0;
        introduceChanges.style.height = `${introduceChanges.scrollHeight}px`;
    });

    const submitButton = document.createElement('img');
    submitButton.src = 'image/ok.png';
    submitButton.alt = 'Картинка не найдена';
    submitButton.className = 'icon-in-content';

    const cancelButton = document.createElement('img');
    cancelButton.src = 'image/cancel.png';
    cancelButton.alt = 'Картинка не найдена';
    cancelButton.className = 'icon-in-content';

    blockDivRight.appendChild(submitButton);
    blockDivRight.appendChild(cancelButton);
    blockDivLeft.appendChild(introduceChanges);

    submitButton.addEventListener('click', async () => await sendingData(item, index, blockInput, blockDivLeft, introduceChanges));
    cancelButton.addEventListener('click', () => render());

    introduceChanges.focus();
}

async function sendingData(itemTask, indexTask, blockAddNewTask, innerBlock, blockChangeTask) {
    const newTextValue = blockChangeTask.value.trim();
    innerBlock.removeChild(blockChangeTask);

    const blockText = document.createElement('p');
    blockText.innerText = newTextValue;
    blockText.className = 'text-task';
    blockText.id = `text=${indexTask}`;

    if (newTextValue.length) {
        itemTask.text = newTextValue;
        try {
            const resp = await requestProcessingPatch(itemTask.text, itemTask.isCheck, itemTask._id);
            if (resp.status === 200) {
                render();
            } else {
                throw new Error;
            }
        } catch (error) {
            builderBlockError('Ошибка изменения задачи');
        }
    } else {
        // Если изменил на пустой, то возвращает предыдущие значение
        blockText.innerText = itemTask.text;
    }
    innerBlock.appendChild(blockText);
    blockAddNewTask.focus();
    render();
}

async function toDelete(id) {
    try {
        const resp = await requestProcessingDelete(id);
        if (resp.status === 200) {
            render();
        } else {
            throw new Error;
        }
    } catch (error) {
        builderBlockError('Ошибка удаления');
    }
}

window.onload = async function init() {
    const blockInput = document.getElementById("data-entry");
    blockInput.addEventListener('change', updateValue);
    blockInput.focus();
    allTasks = await requestProcessingGet(allTasks);
    render();
}

render = async () => {
    allTasks = await requestProcessingGet(allTasks);
    allTasks.sort((task1, task2) => task1['isCheck'] > task2['isCheck'] ? 1 : -1);

    const content = document.getElementById('container-with-content');
    content.innerHTML = "";

    allTasks.forEach((item, index) => {
        const container = document.createElement('li');
        container.id = `task=${index}`;
        container.className = 'task-container';

        const leftBlockContainer = document.createElement('div');
        leftBlockContainer.className = 'left-block-content';
        leftBlockContainer.id = `leftBlockId=${index}`
        container.appendChild(leftBlockContainer);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'status-of-completion';
        checkbox.checked = item.isCheck;
        checkbox.id = `check-id=${index}`;
        checkbox.onchange = function () {
            onChangeCheckbox(item);
        }
        leftBlockContainer.appendChild(checkbox);

        const text = document.createElement('p');
        text.innerText = item.text;
        text.className = item.isCheck ? 'done-text-task' : 'text-task';
        text.id = `text=${index}`;
        leftBlockContainer.appendChild(text);

        const rightBlockContainer = document.createElement('div');
        rightBlockContainer.className = 'right-block-content';
        rightBlockContainer.id = `rightBlockId=${index}`;
        container.appendChild(rightBlockContainer);

        const imageEdit = document.createElement('img');
        imageEdit.src = 'image/pencil.png';
        imageEdit.alt = 'Картинка не найдена';
        imageEdit.className = 'icon-in-content';
        imageEdit.id = `iconEdit=${index}`;

        if (!item.isCheck) {
            imageEdit.addEventListener('click', async function () {
                toChange(item, index);
            });
        }

        const imageDelete = document.createElement('img');
        imageDelete.src = 'image/trash.png';
        imageDelete.alt = 'Картинка не найдена';
        imageDelete.className = 'icon-in-content';
        imageDelete.id = `iconDelete=${index}`;

        imageDelete.addEventListener('click', async function () {
            toDelete(item._id);
        });

        rightBlockContainer.appendChild(imageEdit);
        rightBlockContainer.appendChild(imageDelete);

        content.appendChild(container);
    })
    document.querySelector('.spinner').style.display = 'none';
}