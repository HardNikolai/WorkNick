let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;
let id_int = 0;

function updateValue(event) {
    valueInput = event.target.value;
}

window.onload = async function init() {
    input = document.getElementById('data-entry');
    input.addEventListener('change', updateValue);
    const blockInput = document.getElementById("data-entry");
    blockInput.focus();
    const resp = await fetch('http://localhost:8000/allTasks', {
        method: 'GET'
    });
    let result = await resp.json();
    allTasks = result.data;
    render();
}

async function onClickButton() {
    const checkValue = valueInput.trim();
    const blockInput = document.getElementById("data-entry");
    if (valueInput != '' && checkValue != '') {
        allTasks.push(
            {
                text: checkValue,
                isCheck: false,
            }
        );
        localStorage.setItem('tasks', JSON.stringify(allTasks));

        const resp = await fetch('http://localhost:8000/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text: valueInput,
                isCheck: false
            })
        });
        let result = await resp.json();
        allTasks = result.data;

        valueInput = '';
        input.value = '';
        blockInput.focus()
        render();
    }
}

render = () => {
    allTasks.sort((task1, task2) => task1.id > task2.id ? 1 : -1)
    allTasks.sort((task1, task2) => task1['isCheck'] > task2['isCheck'] ? 1 : -1);

    const content = document.getElementById('container-with-content');

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    allTasks.map((item, index) => {
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
        checkbox.onchange = function () {
            onChangeCheckbox(index);
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
            imageEdit.onclick = () => {
                toChange(item, index);
            };
        }

        const imageDelete = document.createElement('img');
        imageDelete.src = 'image/trash.png';
        imageDelete.alt = 'Картинка не найдена';
        imageDelete.className = 'icon-in-content';
        imageDelete.id = `iconDelete=${index}`;

        imageDelete.onclick = async () => {
            toDelete(allTasks, index);
            render();
        }

        rightBlockContainer.appendChild(imageEdit);
        rightBlockContainer.appendChild(imageDelete);

        content.appendChild(container);
    })
}

function onChangeCheckbox(index) {
    allTasks[index].isCheck = !allTasks[index].isCheck;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

function toChange(item, index) {
    const blockDivLeft = document.getElementById(`leftBlockId=${index}`);
    const getTextDiv = document.getElementById(`text=${index}`);
    const blockInput = document.getElementById("data-entry");

    const blockDivRight = document.getElementById(`rightBlockId=${index}`);
    const changeIcon = document.getElementById(`iconEdit=${index}`);
    const deleteIcon = document.getElementById(`iconDelete=${index}`);

    blockDivRight.removeChild(changeIcon);
    blockDivRight.removeChild(deleteIcon);
    blockDivLeft.removeChild(getTextDiv);

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

    imageOk.addEventListener('click', async function ( event ) {
        const newTextValue = introduceChanges.value.trim();
        blockDivLeft.removeChild(introduceChanges);

        const blockText = document.createElement('p');
        blockText.innerText = newTextValue;
        blockText.className = 'text-task';
        blockText.id = `text=${index}`;

        if (newTextValue.length != 0) {
            item.text = newTextValue;

            const resp = await fetch(`http://localhost:8000/updateTask`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    text: newTextValue,
                    id: item.id
                })
            });
            let result = await resp.json();
            allTasks = result.data;

            localStorage.setItem('tasks', JSON.stringify(allTasks));
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

    imageCancel.addEventListener('click', function ( event ) {
        render();
    })

    introduceChanges.focus();
}


async function toDelete(db, index) {
    const resp = await fetch(`http://localhost:8000/deleteTask?id=${db[index].id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
        }
    });
    db.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(db));
    render()
    
    return db
}