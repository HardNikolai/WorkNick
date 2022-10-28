let allTasks = [];
let valueInput = '';
let id_int = 0;
const HTTP_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
}

function updateValue(event) {
    valueInput = event.target.value;
}

async function requestProcessing(url, method, obj) {
    document.querySelector('.spinner').style.display = 'flex';
    try {
        let mess;
        const resp = await fetch(url, {
        method: method,
        headers: HTTP_HEADERS,
        body: JSON.stringify(obj)
        });
        if (resp.status === 200) {
            return resp;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        } 
    } catch (error) {
        alert(mess);
    }
}

window.onload = async function init() {
    const blockInput = document.getElementById("data-entry");
    blockInput.addEventListener('change', updateValue);
    blockInput.focus();

    const resp = await requestProcessing('http://localhost:8000/tasks', 'GET');
    let result = await resp.json();
    allTasks = result.data;

    render();
}

async function onClickButton() {
    const checkValue = valueInput.trim();
    const blockInput = document.getElementById("data-entry");
    if (valueInput != '' && checkValue != '') {
        try {
            const resp = await requestProcessing('http://localhost:8000/task', 'POST', {text: checkValue, isCheck: false});
            if (resp.status === 200) {
                const resp_all = await requestProcessing('http://localhost:8000/tasks', 'GET');
                let result = await resp_all.json();
                allTasks = result.data;
            } else {
                throw new Error;
            }
        } catch (error) {
            alert('Ошибка добавлении задачи');
        }

        valueInput = '';
        blockInput.value = '';
        blockInput.focus();

        render();
    }
}

render = () => {
    allTasks.sort((task1, task2) => task1.id > task2.id ? 1 : -1);
    allTasks.sort((task1, task2) => task1['isCheck'] > task2['isCheck'] ? 1 : -1);

    const content = document.getElementById('container-with-content');

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
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

async function onChangeCheckbox(item) {
    item.isCheck = !item.isCheck;

    try {
        const resp = await requestProcessing(`http://localhost:8000/task?_id=${item._id}`, 'PATCH', {text: item.text, isCheck: item.isCheck});
        if (resp.status === 200) {
            const resp_all = await requestProcessing('http://localhost:8000/tasks', 'GET');    
            let result = await resp_all.json();
            allTasks = result.data;
        } else {
            throw new Error;
        }
    } catch (error) {
        alert('Ошибка изменения задачи');
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
    })

    const imageOk = document.createElement('img');
    imageOk.src = 'image/ok.png';
    imageOk.alt = 'Картинка не найдена';
    imageOk.className = 'icon-in-content';

    const imageCancel = document.createElement('img');
    imageCancel.src = 'image/cancel.png';
    imageCancel.alt = 'Картинка не найдена';
    imageCancel.className = 'icon-in-content';

    blockDivRight.appendChild(imageOk);
    blockDivRight.appendChild(imageCancel);
    blockDivLeft.appendChild(introduceChanges);

    imageOk.addEventListener('click', async function () {
        const newTextValue = introduceChanges.value.trim();
        blockDivLeft.removeChild(introduceChanges);

        const blockText = document.createElement('p');
        blockText.innerText = newTextValue;
        blockText.className = 'text-task';
        blockText.id = `text=${index}`;

        if (newTextValue.length != 0) {
            item.text = newTextValue;
            try {
                const resp = await requestProcessing(`http://localhost:8000/task?_id=${item._id}`, 'PATCH', {text: item.text, isCheck: item.isCheck});
                if (resp.status === 200) {
                    const resp_all = await requestProcessing('http://localhost:8000/tasks', 'GET');    
                    let result = await resp_all.json();
                    allTasks = result.data;
                } else {
                    throw new Error;
                }
            } catch (error) {
                alert('Ошибка изменения задачи');
            }

            blockDivLeft.appendChild(blockText);
            blockInput.focus();
            render();
        } else {
            // Если изменил на пустой, то возвращает предыдущие значение
            blockText.innerText = item.text;
            blockDivLeft.appendChild(blockText);
            blockInput.focus();
            render();
        }
    })

    imageCancel.addEventListener('click', function () {
        render();
    });

    introduceChanges.focus();
}


async function toDelete(id) {
    try {
        const resp = await requestProcessing(`http://localhost:8000/task?_id=${id}`, 'DELETE');
        if (resp.status === 200) {
            const resp_all = await requestProcessing('http://localhost:8000/tasks', 'GET');    
            let result = await resp_all.json();
            allTasks = result.data;
        } else {
            throw new Error;
        }
    } catch (error) {
        alert('Ошибка удаления');
    }

    render();
}