let allTasks = [];
let valueInputPlace = '';
let valueInputCost = '';
let input_place = null;
let input_expenses = null;
const getUrl = 'http://localhost:8000/tasks';
const otherUrl = 'http://localhost:8000/task';
const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
const httpHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
}
let today = new Date();
let allSum = 0;
let mess;

async function requestProcessingGet(db) {
    try {
        const resp = await fetch(getUrl, {
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
        alert(mess);
    }
}


async function requestProcessingPost(newTask) {
    try {
        const resp = await fetch(otherUrl, {
        method: 'POST',
        headers: httpHeaders,
        body: JSON.stringify({
            place: newTask.place,
            cost: newTask.cost,
            date: newTask.date
            })
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

async function requestProcessingPatch(id, newTask) {
    try {
        const resp = await fetch(otherUrl, {
        method: 'PATCH',
        headers: httpHeaders,
        body: JSON.stringify({
            _id: id,
            place: newTask.place,
            cost: newTask.cost,
            date: newTask.date
            })
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

function updateValueFirst(event) {
    valueInputPlace = event.target.value;
}

function updateValueSecond(event) {
    valueInputCost = event.target.value;
}

function clearValue() {
    valueInputPlace = '';
    valueInputCost = '';
    input_place.value = '';
    input_expenses.value = '';
}

async function addNewTask() {
    const checkValuePlace = valueInputPlace.trim();
    const num = Number(Number(valueInputCost).toFixed(2));

    if (num >= 0 && checkValuePlace.length) {
        const objData = {
            place: checkValuePlace,
            cost: num,
            date: today
        }
        try {
            const resp = await requestProcessingPost(objData);
            if (resp.status === 200) {
                render();
            } else {
                throw new Error;
            }
        } catch (error) {
            alert('Ошибка добавления задачи');
        }
        clearValue();
    } else {
        alert('Неверный формат данных')
    }
}


window.onload = async function init() {
    input_place = document.getElementById('data-place');
    input_place.addEventListener('change', updateValueFirst);

    input_expenses = document.getElementById('data-expenses');
    input_expenses.addEventListener('change', updateValueSecond);

    allTasks = await requestProcessingGet(allTasks);
    render();
}


render = async () => {
    allTasks = await requestProcessingGet(allTasks);
    allSum = 0;
    const content = document.getElementById('container-with-content');
    const getBlockSum = document.getElementById('total');
    getBlockSum.innerText = `Итого: ${allSum}р.`;

    content.innerHTML = '';

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
        text_place.innerText = `${item.place}`;
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
        text_expenses.innerText = `${item.cost} р.`;
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

        allSum += item.cost;
        getBlockSum.innerText = `Итого: ${allSum}р.`;
    });
}

function toChange(item, index) {
    render();
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
    introduceChangesPlace.value = `${item.place}`;
    introduceChangesPlace.rows = `${Math.ceil(introduceChangesPlace.value.length / 20)}`;
    introduceChangesPlace.addEventListener('input', function () {
        introduceChangesPlace.style.height = 0;
        introduceChangesPlace.style.height = `${introduceChangesPlace.scrollHeight}px`;
    });

    const introduceChangesDate = document.createElement('input');
    introduceChangesDate.className = 'change-in-textDate';
    introduceChangesDate.id = `input-textDate-id=${index}`;
    introduceChangesDate.type = 'date';
    introduceChangesDate.valueAsDate = new Date(item.date);

    const introduceChangesExpenses = document.createElement('input');
    introduceChangesExpenses.className = 'change-in-textExpenses';
    introduceChangesExpenses.id = `input-textExpenses-id=${index}`;
    introduceChangesExpenses.type = 'number';
    introduceChangesExpenses.value = item.cost;
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
        let bulTextDate;
        const newTextPlaceValue = introduceChangesPlace.value.trim();
        const newTextDateValue = introduceChangesDate.valueAsDate;
        const checkDate = new Date(newTextDateValue) <= new Date() && new Date(newTextDateValue) >= new Date(1970);

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

        if (newTextDateValue != null) {
           bulTextDate = newTextDateValue.length != 0;        
        }

        const bulTextExpenses = newTextExpensesValue.length != 0 && newTextExpensesValue >= 0;
        const checkNewInput = bulTextPlace && bulTextDate && bulTextExpenses && checkDate;


        if (checkNewInput) {
            item.place = newTextPlaceValue;
            item.date = newTextDateValue;
            item.cost = newTextExpensesValue;
            const objData = {
                place: item.place,
                cost: item.cost,
                date: item.date
            }
            
            try {
                const resp = await requestProcessingPatch(item._id, objData);
                if (resp.status === 200) {

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
            // render();
        } else {
            // Если изменил на пустой, то возвращает предыдущие значение
            blockTextPlace.innerText = item.place;
            blockTextDate.innerText = item.data;
            blockTextExpenses.innerText = item.cost;

            blockDivLeft.removeChild(introduceChangesPlace);
            blockLeftInnerContent.removeChild(introduceChangesDate);
            blockLeftInnerContent.removeChild(introduceChangesExpenses);

            blockDivLeft.appendChild(blockTextPlace);

            blockLeftInnerContent.appendChild(blockTextDate);
            blockLeftInnerContent.appendChild(blockTextExpenses);
            // render();
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