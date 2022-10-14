let allTasks = [];
let valueInput = '';
let input = null;
let id_int = 0;

function updateValue(event) {
    valueInput = event.target.value;
}

window.onload = function init() {
    input = document.getElementById('data-entry');
    input.addEventListener('change', updateValue);
    const blockInput = document.getElementById("data-entry");
    blockInput.focus()
}

function onClickButton() {
    const checkValue = valueInput.trim();
    const blockInput = document.getElementById("data-entry");
    if (valueInput != '' && checkValue != '') {
        allTasks.push(
            {
                text: checkValue,
                isCheck: false,
                id: id_int
            }
        );
        id_int += 1;
        valueInput = '';
        input.value = '';
        blockInput.focus()
        render();
    }
}

render = () => {
    allTasks.sort((task1, task2) => task1.id > task2.id ? 1 : -1)
    allTasks.sort((task1, task2) => task1['isCheck'] > task2['isCheck'] ? 1 : -1);
    console.log(allTasks)

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

        imageDelete.onclick = () => {
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

    imageOk.addEventListener('click', function ( event ) {
        const newTextValue = introduceChanges.value.trim();
        blockDivLeft.removeChild(introduceChanges);

        const blockText = document.createElement('p');
        blockText.innerText = newTextValue;
        blockText.className = 'text-task';
        blockText.id = `text=${index}`;

        if (newTextValue.length != 0) {
            item.text = newTextValue;
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


function toDelete(db, index) {
    db.splice(index, 1);
    return db
}