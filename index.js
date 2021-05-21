fillingOptions('inputNumberOfCriterion', 3, 5);
fillingOptions('inputNumberOfAlternatives', 3, 5);
let tableOfAlternatives = [];
let classifyTable = [];
let characterise = [];

function fillingOptions(tagId, min, max, gap = -100) {
    for (let i = min; i <= max; i++) {
        if (i !== gap) {
            let optionTag = document.createElement('option');
            optionTag.setAttribute('value', i.toString());
            optionTag.innerHTML = i.toString();
            document.getElementById(tagId).append(optionTag);
        }
    }
    document.getElementById(tagId).selectedIndex = 0;
}

function getValue(tagId) {
    let selectedOptionIndex = document.getElementById(tagId).selectedIndex;
    let value = parseInt(document.getElementById(tagId).options[selectedOptionIndex].value);
    return value;
}


function first() {
    document.getElementById('first').innerHTML = '';
    document.getElementById('second').innerHTML = '';
    document.getElementById('third').innerHTML = '';
    document.getElementById('fourth').innerHTML = '';

    const numberOfCriterion = getValue('inputNumberOfCriterion');
    const numberOfAlternatives = getValue('inputNumberOfAlternatives');

    const table = document.createElement("table");
    table.id = 'firstTable';
    table.className = "table table-hover";
    const div = document.getElementById('first');
    const p = document.createElement('p');
    p.innerHTML = 'Заполните таблицу критериального описания альтернатив';
    document.getElementById('first').append(p);
    document.getElementById('first').append(table);
    let thead = document.createElement("thead");
    table.append(thead);
    let tR = document.createElement("tr");
    thead.append(tR);

    for (let i = 0; i <= numberOfCriterion; i++) {
        let th = document.createElement("th");
        th.scope = "col";
        if (i === 0) {
            th.innerHTML = 'Альтернативы';
        } else {
            th.innerHTML = "K" + (i);
        }
        tR.append(th);
    }

    let tbody = document.createElement("tbody");
    table.append(tbody);

    for (let i = 0; i < numberOfAlternatives; i++) {
        let tr = document.createElement("tr");
        tbody.append(tr);
        let th = document.createElement("th");
        th.innerHTML = 'Альтернатива' + (i + 1);
        tr.append(th);
        for (let j = 0; j < numberOfCriterion; j++) {
            let td = document.createElement("td");
            let select = document.createElement('select');
            select.className = 'form-select w-auto';
            select.id = 'select' + i + j;
            td.append(select);
            tr.append(td);
            fillingOptions(select.id, 1, numberOfCriterion);
        }
    }

    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.innerHTML = 'Далее';
    btn.onclick = second;
    div.append(btn);
}

function second() {
    document.getElementById('fourth').innerHTML = '';
    if (document.getElementById('second').innerHTML !== '') {
        return 0;
    }

    const numberOfCriterion = getValue('inputNumberOfCriterion');
    const numberOfAlternatives = getValue('inputNumberOfAlternatives');

    for (let i = 0; i < numberOfAlternatives; i++) {
        tableOfAlternatives[i] = [];
        for (let j = 0; j < numberOfCriterion; j++) {
            let id = 'select' + i + j;
            tableOfAlternatives[i][j] = getValue(id);
        }
    }

    const size = numberOfCriterion * (numberOfCriterion - 1) / 2;
    let counter = 0;
    do {
        classifyTable[counter] = [];
        for (let i = 0; i < numberOfCriterion; i++) {
            classifyTable[counter][i] = '';
            for (let j = 0; j < numberOfCriterion; j++) {

                if (j === counter) {
                    classifyTable[counter][i] += (i + 1);
                } else {
                    classifyTable[counter][i] += '1';
                }
            }
        }
        counter++;
    } while (counter !== numberOfCriterion)


    const table = document.createElement("table");
    table.id = 'secondTable';
    table.className = "table table-hover";
    if (numberOfCriterion >= 5) {
        table.className += 'table-responsive table-sm'
    }
    const div = document.getElementById('second');
    const p = document.createElement('p');
    p.innerHTML = 'Заполните матрицу сравнений (нажмите на незаполненную ячейку - 0 или на ту, которую хотите изменить; изменять исходные данные не получится)';
    div.append(p);
    div.append(table);
    let thead = document.createElement("thead");
    table.append(thead);
    let tR = document.createElement("tr");
    thead.append(tR);

    for (let i = 0; i < numberOfCriterion; i++) {
        for (let j = 0; j < numberOfCriterion; j++) {
            if (j === 0) {
                if (i === 0) {
                    let th = document.createElement("th");
                    th.scope = "col";
                    th.innerHTML = '';
                    tR.append(th);
                } else {
                    continue;
                }
            } else {
                let th = document.createElement("th");
                th.scope = "col";
                th.innerHTML = classifyTable[i][j];
                tR.append(th);
            }
        }
    }

    let tbody = document.createElement("tbody");
    table.append(tbody);

    counter = 0;
    let counter_j = 1;

    for (let i = 0; i < size * 2; i++) {
        let tr = document.createElement("tr");
        tbody.append(tr);
        let th = document.createElement("th");
        if (counter_j % numberOfCriterion === 0) {
            counter_j = 1;
            counter++;
        }
        th.innerHTML = classifyTable[counter][counter_j];
        tr.append(th);
        for (let j = 0; j < size * 2; j++) {
            let td = document.createElement("td");
            if (j < i) {
                td.innerHTML = '-';
                tr.append(td);
            } else if (j === i) {
                td.innerHTML = '2';
                tr.append(td);
            } else {
                let buf = i % (numberOfCriterion - 1);
                if (buf < (numberOfCriterion - 2) && j < i + numberOfCriterion - 1 - buf) {
                    td.innerHTML = '1';
                    tr.append(td);
                } else {
                    td.innerHTML = '0';
                    tr.append(td);
                    td.addEventListener('click', function func() {
                        let select = document.createElement('select');
                        select.className = 'form-select w-auto';
                        select.id = 'select001' + i + j;
                        this.innerHTML = '';
                        this.appendChild(select);
                        fillingOptions(select.id, 1, 3, 2);

                        let this_td = this;
                        select.addEventListener('blur', function () {
                            let value = getValue(this.id);
                            this_td.innerHTML = value.toString();
                            this_td.addEventListener('click', func);

                            if (value === 1 && j % (numberOfCriterion - 1) < numberOfCriterion - 2) {
                                for (let k = j + 1; k < j + numberOfCriterion - 1 - (j % (numberOfCriterion - 1)); k++) {
                                    document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[k].innerHTML = '1';
                                }
                            }
                            if (value === 3 && j % (numberOfCriterion - 1) > 0) {
                                for (let k = j - 1; k > j - 1 - (j % (numberOfCriterion - 1)); k--) {
                                    document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[k].innerHTML = '3';
                                }
                            }
                            if (value === 3 && buf < numberOfCriterion - 2) {
                                for (let k = i + 1; k < i + numberOfCriterion - 1 - (i % (numberOfCriterion - 1)); k++) {
                                    document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[k].getElementsByTagName('td')[j].innerHTML = '3';
                                }
                            }
                            if (value === 1 && buf > 0) {
                                for (let k = i - 1; k > i - 1 - (i % (numberOfCriterion - 1)); k--) {
                                    document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[k].getElementsByTagName('td')[j].innerHTML = '1';
                                }
                            }
                        })

                        this.removeEventListener('click', func);
                    })

                }
            }
        }
        counter_j++;
    }

    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.innerHTML = 'Далее';
    btn.onclick = third;
    div.append(btn);
}

function third() {
    document.getElementById('third').innerHTML = '';
    document.getElementById('fourth').innerHTML = '';

    const numberOfCriterion = getValue('inputNumberOfCriterion');

    for (let i = 0; i < (numberOfCriterion - 1) * (numberOfCriterion); i++) {
        characterise[i] = [];
        characterise[i][0] = document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('th')[i].innerHTML;
        characterise[i][1] = 0;
        for (let j = 0; j < (numberOfCriterion - 1) * (numberOfCriterion); j++) {
            let element = document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[j];
            if (element.innerHTML === '0') {
                alert('Заполните все поля с 0!');
                return 0;
            }
            if (element.innerHTML === '1') {
                characterise[i][1]++;
            }
        }
        for (let k = 0; k < (numberOfCriterion - 1) * (numberOfCriterion); k++) {
            if (document.getElementById('secondTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[k].getElementsByTagName('td')[i].innerHTML === '3') {
                characterise[i][1]++;
            }
        }
    }

    characterise.sort(function (a, b) {
        return b[1] - a[1];
    })

    let div = document.getElementById('third');
    let p = document.createElement('p');
    p.innerHTML = `Единая порядковая шкала:<br>111`;
    for (let i = 0; i < characterise.length; i++) {
        p.innerHTML += ' > ' + characterise[i][0];
    }
    div.append(p);

    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.innerHTML = 'Далее';
    btn.onclick = fourth;
    div.append(btn);
}

function fourth() {
    document.getElementById('fourth').innerHTML = '';

    const numberOfCriterion = getValue('inputNumberOfCriterion');
    const numberOfAlternatives = getValue('inputNumberOfAlternatives');

    const table = document.createElement("table");
    table.className = "table table-hover";
    const div = document.getElementById('fourth');
    const p = document.createElement('p');
    p.innerHTML = 'Векторные оценки альтернативных территорий';
    div.append(p);
    div.append(table);
    let thead = document.createElement("thead");
    table.append(thead);
    let tR = document.createElement("tr");
    thead.append(tR);

    let th1;
    th1 = document.createElement("th");
    th1.scope = "col";
    th1.innerHTML = 'Альтернативы';
    tR.append(th1);

    th1 = document.createElement("th");
    th1.scope = "col";
    th1.innerHTML = 'Векторная начальная оценка';
    tR.append(th1);

    th1 = document.createElement("th");
    th1.scope = "col";
    th1.innerHTML = 'Векторная оценка по ЕПШ';
    tR.append(th1);

    th1 = document.createElement("th");
    th1.scope = "col";
    th1.innerHTML = 'Векторная оценка по возрастанию';
    tR.append(th1);

    let tbody = document.createElement("tbody");
    table.append(tbody);

    for (let i = 0; i < numberOfAlternatives; i++) {
        let tr = document.createElement("tr");
        tbody.append(tr);
        let th = document.createElement("th");
        th.innerHTML = 'Альтернатива' + (i + 1);
        tr.append(th);

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = '';
        td2.innerHTML = '';
        let mas = [];
        for (let j = 0; j < numberOfCriterion; j++) {
            td1.innerHTML += tableOfAlternatives[i][j];
            if (tableOfAlternatives[i][j] === 1) {
                td2.innerHTML += '1';
                mas[j] = 1;
            } else {
                for (let k = 0; k < characterise.length; k++) {
                    if (tableOfAlternatives[i][j] === parseInt(characterise[k][0].split('')[j])) {
                        td2.innerHTML += (k + 2);
                        mas[j] = k + 2;
                    }
                }
            }
        }
        tr.append(td1);
        tr.append(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = mas.sort((a, b) => {
            return a - b;
        }).join('');
        tr.append(td3);
    }

    let finalMas = [];
    for (let i = 0; i < numberOfAlternatives; i++) {
        finalMas[i] = [];
        finalMas[i][0] = parseInt(document.getElementById('fourth').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML);
        finalMas[i][1] = i;
    }
    finalMas.sort((a, b) => {
        return a[0] - b[0];
    });
    p.innerHTML = 'Лучшая альтернатива: ';
    let bool = true;
    let count = 0;
    do {
        bool = false;
        p.innerHTML += 'Альтернатива ' + (finalMas[count][1] + 1);
        if (count !== numberOfAlternatives - 1) {
            if (finalMas[count][0] === finalMas[count + 1][0]) {
                count++;
                p.innerHTML += ', ';
                bool = true;
            }
        }


    } while (bool)
    div.append(p);
}
