let allTasks = [];
let valueInputFirst = '';
let valueInputSecond = '';
let input_place = null;
let input_expenses = null;
const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
const HTTP_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
}
let today = new Date();
let allSum = 0;
let mess;

function updateValueFirst(event) {
    valueInputFirst = event.target.value;
}

function updateValueSecond(event) {
    valueInputSecond = event.target.value;
}

async function requestProcessing(url, method, obj) {
    try {
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
    input_place = document.getElementById('data-place');
    input_place.addEventListener('change', updateValueFirst);

    input_expenses = document.getElementById('data-expenses');
    input_expenses.addEventListener('change', updateValueSecond);

    const resp = await requestProcessing('http://localhost:8000/tasks', 'GET');
    let result = await resp.json();
    allTasks = result.data;

    render();
}

async function onClickButton() {
    const checkValueFirst = valueInputFirst.trim();
    const checkValueSecond = valueInputSecond.trim();
    const num = Number(checkValueSecond);
    if (num > 0) {
        const objData = {
            text_place: checkValueFirst,
            text_expenses: num,
            date: today
        }
        try {
            const resp = await requestProcessing('http://localhost:8000/task', 'POST', objData);
            if (resp.status === 200) {
                const resp_all = await requestProcessing('http://localhost:8000/tasks', 'GET');
                let result = await resp_all.json();
                allTasks = result.data;
            } else {
                throw new Error;
            }
        } catch (error) {
            alert('Ошибка добавления задачи');
        }
        valueInputFirst = '';
        valueInputSecond = '';
        input_place.value = '';
        input_expenses.value = '';
        render();
    } else {
        alert('Сумма меньше 0')
    }
}

render = () => {
    allSum = 0;
    const content = document.getElementById('container-with-content');
    const getBlockSum = document.getElementById('total');
    getBlockSum.innerText = `Итого: ${allSum}р.`;

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    allTasks.forEach((item, index) => {
        const container = document.createElement('li');
        container.id = `task=${index}`;
        container.className = 'task-container';

        const leftBlockContainer = document.createElement('div');
        leftBlockContainer.className = 'left-block-content';
        leftBlockContainer.id = `leftBlockId=${index}`;
        container.appendChild(leftBlockContainer);

        const text_number = document.createElement('p');
        text_number.innerText = `${index + 1})`;
        text_number.className = 'text_number';
        leftBlockContainer.appendChild(text_number);

        const text_place = document.createElement('p');
        text_place.innerText = `${item.text_place}`;
        text_place.id = `text-place-id=${index}`;
        text_place.className = `text_place`;
        leftBlockContainer.appendChild(text_place);

        const rightBlockContainer = document.createElement('div');
        rightBlockContainer.className = 'right-block-content';
        rightBlockContainer.id = `rightBlockId=${index}`;
        container.appendChild(rightBlockContainer);

        const leftInnerContainer = document.createElement('div');
        leftInnerContainer.className = 'left-inner-container';
        leftInnerContainer.id = `left-inner-content-id=${index}`;

        const rightInnerContainer = document.createElement('div');
        rightInnerContainer.className = 'right-inner-container';
        rightInnerContainer.id = `right-inner-content-id=${index}`;

        rightBlockContainer.appendChild(leftInnerContainer);
        rightBlockContainer.appendChild(rightInnerContainer);

        const blockDate = document.createElement('p');
        blockDate.className = 'text_date';
        blockDate.id = `date-id=${index}`;
        blockDate.innerText = new Date(item.date).toLocaleDateString('ru-Ru');
        leftInnerContainer.appendChild(blockDate);

        const text_expenses = document.createElement('p');
        text_expenses.className = 'text_expenses';
        text_expenses.id = `text-expenses-id=${index}`;
        text_expenses.innerText = `${item.text_expenses} р.`;
        leftInnerContainer.appendChild(text_expenses);

        const imageEdit = document.createElement('img');
        imageEdit.src = 'image/pencil.png';
        imageEdit.alt = 'Картинка не найдена';
        imageEdit.className = 'icon-in-content';
        imageEdit.id = `iconEdit=${index}`;

        imageEdit.addEventListener('click', async function () {
            toChange(item, index);
        })

        const imageDelete = document.createElement('img');
        imageDelete.src = 'image/trash.png';
        imageDelete.alt = 'Картинка не найдена';
        imageDelete.className = 'icon-in-content';
        imageDelete.id = `iconDelete=${index}`;

        imageDelete.addEventListener('click', async function () {
            toDelete(item._id);
        })

        rightInnerContainer.appendChild(imageEdit);
        rightInnerContainer.appendChild(imageDelete);

        content.appendChild(container);

        allSum += item.text_expenses;
        getBlockSum.innerText = `Итого: ${allSum}р.`;
    });
}

function toChange(item, index) {
    const blockDivLeft = document.getElementById(`leftBlockId=${index}`);
    const getTextLeftDiv = document.getElementById(`text-place-id=${index}`);

    const blockLeftInnerContent = document.getElementById(`left-inner-content-id=${index}`);
    const blockRightInnerContent = document.getElementById(`right-inner-content-id=${index}`);

    const changeIcon = document.getElementById(`iconEdit=${index}`);
    const deleteIcon = document.getElementById(`iconDelete=${index}`);
    const getTextDate = document.getElementById(`date-id=${index}`);
    const getTextRightDiv = document.getElementById(`text-expenses-id=${index}`);

    blockRightInnerContent.removeChild(changeIcon);
    blockRightInnerContent.removeChild(deleteIcon);
    blockDivLeft.removeChild(getTextLeftDiv);
    blockLeftInnerContent.removeChild(getTextDate);
    blockLeftInnerContent.removeChild(getTextRightDiv);

    const introduceChangesPlace = document.createElement('textarea');
    introduceChangesPlace.className = 'change-in-textPlace';
    introduceChangesPlace.id = `input-textPlace-id=${index}`;
    introduceChangesPlace.value = `${item.text_place}`;
    introduceChangesPlace.rows = `${Math.ceil(introduceChangesPlace.value.length / 20)}`;
    introduceChangesPlace.addEventListener('input', function () {
        introduceChangesPlace.style.height = 0;
        introduceChangesPlace.style.height = `${introduceChangesPlace.scrollHeight}px`;
    });

    const introduceChangesDate = document.createElement('input');
    introduceChangesDate.className = 'change-in-textDate';
    introduceChangesDate.id = `input-textDate-id=${index}`;
    introduceChangesDate.type = 'date'
    introduceChangesDate.valueAsDate = new Date(item.date);

    const introduceChangesExpenses = document.createElement('input');
    introduceChangesExpenses.className = 'change-in-textExpenses';
    introduceChangesExpenses.id = `input-textExpenses-id=${index}`;
    introduceChangesExpenses.type = 'number';
    introduceChangesExpenses.value = `${item.text_expenses}`;
    introduceChangesExpenses.rows = `${Math.ceil(introduceChangesExpenses.value.length / 20)}`;

    const imageOk = document.createElement('img');
    imageOk.src = 'image/ok.png';
    imageOk.alt = 'Картинка не найдена';
    imageOk.className = 'icon-in-content';

    const imageCancel = document.createElement('img');
    imageCancel.src = 'image/cancel.png';
    imageCancel.alt = 'Картинка не найдена';
    imageCancel.className = 'icon-in-content';

    blockDivLeft.appendChild(introduceChangesPlace);

    blockLeftInnerContent.appendChild(introduceChangesDate);
    blockLeftInnerContent.appendChild(introduceChangesExpenses);
    blockRightInnerContent.appendChild(imageOk);
    blockRightInnerContent.appendChild(imageCancel);
    

    imageOk.addEventListener('click', async function () {
        const newTextPlaceValue = introduceChangesPlace.value.trim();
        const newTextDateValue = introduceChangesDate.valueAsDate;
        const newTextExpensesValue = introduceChangesExpenses.value.trim();

        const blockTextPlace = document.createElement('p');
        blockTextPlace.innerText = newTextPlaceValue;
        blockTextPlace.className = 'text_place';
        blockTextPlace.id = `text-place-id=${index}`;

        const blockTextDate = document.createElement('p');
        blockTextDate.innerText = newTextDateValue;
        blockTextDate.className = 'text_date';
        blockTextDate.id = `date-id=${index}`;

        const blockTextExpenses = document.createElement('p');
        blockTextExpenses.innerText = newTextExpensesValue;
        blockTextExpenses.className = 'text_expenses';
        blockTextExpenses.id = `text-expenses-id=${index}`;

        const bulTextPlace = newTextPlaceValue.length != 0;
        const bulTextDate = newTextDateValue.length != 0;
        const bulTextExpenses = newTextExpensesValue.length != 0;

        if (bulTextPlace && bulTextDate && bulTextExpenses) {
            item.text_place = newTextPlaceValue;
            item.date = newTextDateValue;
            item.text_expenses = newTextExpensesValue;

            const objData = {
                text_place: item.text_place,
                text_expenses: item.text_expenses,
                date: item.date
            }
            
            try {
                const resp = await requestProcessing(`http://localhost:8000/task?_id=${item._id}`, 'PATCH', objData);
                console.log(resp, `http://localhost:8000/task?_id=${item._id}`)
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
            blockDivLeft.removeChild(introduceChangesPlace);
            blockLeftInnerContent.removeChild(introduceChangesDate);
            blockLeftInnerContent.removeChild(introduceChangesExpenses);

            blockDivLeft.appendChild(blockTextPlace);
            blockLeftInnerContent.appendChild(blockTextDate);
            blockLeftInnerContent.appendChild(blockTextExpenses);
            render();
        } else {
            // Если изменил на пустой, то возвращает предыдущие значение
            blockTextPlace.innerText = item.text_place;
            blockTextDate.innerText = item.data;
            blockTextExpenses.innerText = item.text_expenses;

            blockDivLeft.removeChild(introduceChangesPlace);
            blockLeftInnerContent.removeChild(introduceChangesDate);
            blockLeftInnerContent.removeChild(introduceChangesExpenses);

            blockDivLeft.appendChild(blockTextPlace);

            blockLeftInnerContent.appendChild(blockTextDate);
            blockLeftInnerContent.appendChild(blockTextExpenses);
            render();
        }
    })

    imageCancel.addEventListener('click', function () {
        render();
    });
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
    
    return allTasks;
}