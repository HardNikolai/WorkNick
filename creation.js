let allTasks = [];
let result;
let valueInput = '';
const httpHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};
const urlGet = 'http://localhost:8000/tasks';
const urlOtherRout = 'http://localhost:8000/task';


function checkText(arr, text) {
    if (_.includes(arr.category, text)) {
        return true;
    } else {
        return false;
    }
}

function searchTransactions(arr, obj) {
    const {sort, searchText} = obj;
    let split_in_arr, newArr;
    let new_name_sort;
    let res = [];

    if (Object.keys(obj).length === 0) {
        return arr;
    }

    newArr = _.filter(arr, (item) => {
        return _.some(item.split, (it) => {
            return checkText(it, searchText)
        });
    });

    if (sort === undefined) {
        return newArr
    }
    
    let sort_instruction = sort.indexOf('-') === 0;

    if (sort_instruction) {
        new_name_sort = sort.slice(1, sort.length);
    } else {
        new_name_sort = sort;
    }

    const result = _.sortBy(newArr, new_name_sort);
    
    return result
 }

async function requestProcessingGet() {
    try {
        let mess;
        const resp = await fetch(urlGet, {
            method: 'GET',
            headers: httpHeaders
        });
        if (resp.status === 200) {
            let result = await resp.json();
            return result;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        builderBlockError(mess);
    }
}

async function requestProcessingPost(res) {
    try {
        const inputSortDir = document.getElementById('sortDir');
        const inputSortBy = document.getElementById('sortBy').value;
        const inputSearchText = document.getElementById('searchText').value;
        let sortBy = 'asc';
        let mess;
        let sortDir = inputSortBy;

        if (inputSortDir.checked != true) {
            sortDir = `-${inputSortBy}`;
            sortBy = 'desc';
        }

        const resp = await fetch(urlOtherRout, {
            method: 'POST',
            headers: httpHeaders,
            body: JSON.stringify({
                sortBy: sortBy,
                sortDir: sortDir,
                searchText: inputSearchText,
                searchResult: res
            })
        });
        if (resp.status === 200) {
            return resp;
        } else {
            mess = 'Ошибка сервера';
            throw new Error;
        }
    } catch (error) {
        alert(error)
    }
}

function styleButton(button) {
    button.style.backgroundColor = 'gray';
    button.disabled = true;

    setTimeout(() =>  {
        button.style.backgroundColor = 'green';
        button.disabled = false;
    }, 5000);
}

async function loadData(butFind, butSave) {
    const db = await requestProcessingGet();
    styleButton(butFind);
    styleButton(butSave);
    return db;
}

async function findData(db, butSave, inpSortDir, resBlock, spin) {
    const inputSortBy = document.getElementById('sortBy').value;
    const inputSearchText = document.getElementById('searchText').value;

    resBlock.style.display = 'none';
    spin.style.display = 'block';

    let sortDir = inputSortBy;

    styleButton(butSave);

    result = await searchTransactions(db, {sort: sortDir, searchText: inputSearchText});

    resBlock.style.display = 'block';
    resBlock.innerText = JSON.stringify(result);

    localStorage.setItem('result', result);
    spin.style.display = 'none';

    return result;
}

window.onload = async function init() {
    const buttonLoad = document.getElementById('load-db');
    const buttonFind = document.getElementById('findTask');
    const buttonSave = document.getElementById('saveResult');
    const inputSortDir = document.getElementById('sortDir');
    const resultBlock = document.getElementById('result');
    const blockSpinner = document.getElementById('spinner');

    buttonLoad.addEventListener('click', async () => allTasks = await loadData(buttonFind, buttonSave));
    buttonFind.addEventListener('click', async () => await findData(allTasks, buttonSave, inputSortDir, resultBlock, blockSpinner));
    buttonSave.addEventListener('click', async () => await requestProcessingPost(result));
}

render = async () => {
}