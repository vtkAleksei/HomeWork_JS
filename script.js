const init = () => {
    const text = `

    1. У плетня заросшая крапива обрядилась ярким перламутром и, качаясь, шепчет шаловливо: 'С добрым утром!' (С. Есенин) 
2. 'Добро пожаловать, мой сын', - сказал с улыбкой он Руслану. 
3. А царь, улыбаясь, ему говорит: 'Садко, моё милое чадо, поведай, зачем так печален твой вид?' (А. Толстой) 
4. 'Вы сами прочтете стихи или мне вам прочесть?' - нерешительно спросил я. (С. Маршак) 
5. Казбич нетерпеливо прервал его: 'Поди прочь, безумный мальчишка!' (М. Лермонтов) 
6. 'Что же ты здесь притаился?' - спросил Дубровский кузнеца. (А. П'ушкин) 
7. 'Это лошадь моего отца', - ска'зала Бэла. (Д'артаньян)`

    // задание 1
    let regexp = /'/g;
    let newText = text.replace(regexp, '"');
    console.log(newText);

    // задание 2
    regexp = /[А-Я]+"[А-Я]+/i;
    while (regexp.test(newText)) {
        newText = newText.replace(regexp, change(regexp.exec(newText)))
    }
    console.log(newText);

    function change(elementChange) {
        let str = elementChange[0].toString();
        return str.replace(/"/, "'")
    }

    // задание 3
    let btn = document.querySelector('button');
    btn.addEventListener('click', () => {
        let name = document.querySelector('.name');
        let tel = document.querySelector('.telephone');
        let email = document.querySelector('.email');
        let text = document.querySelector('.text');
        let textError = document.querySelector('.error');

        name.style.borderColor = '#b5b5b5';
        tel.style.borderColor = '#b5b5b5';
        email.style.borderColor = '#b5b5b5';
        text.style.borderColor = '#b5b5b5';
        textError.style.visibility = 'hidden';

        let regexp = /^[a-zA-Z]+$|^[A-Z][-a-zA-Z]+$/;
        if (regexp.test(name.value) == false) {
            name.style.border = '1px';
            name.style.borderColor = '#FF0000';
            name.style.borderStyle = 'solid';
            textError.style.visibility = 'visible';
        }

        regexp = /^\+7{1}\(\d{3}\)\d{3}\-\d{4}$/;
        if (regexp.test(tel.value) == false) {
            tel.style.border = '1px';
            tel.style.borderColor = '#FF0000';
            tel.style.borderStyle = 'solid';
            textError.style.visibility = 'visible';
        }

        regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
        if (regexp.test(email.value) == false) {
            email.style.border = '1px';
            email.style.borderColor = '#FF0000';
            email.style.borderStyle = 'solid';
            textError.style.visibility = 'visible';
        }
        if (text.value == '') {
            text.style.border = '1px';
            text.style.borderColor = '#FF0000';
            text.style.borderStyle = 'solid';
            textError.style.visibility = 'visible';

        }
    });

}

window.onload = init;