(function () {
    const textarea = document.querySelector('.js-textarea');
    const button = document.querySelector('.js-button');
    const result = document.querySelector('.js-result');

    let data = [];

    const loadedData = JSON.parse(localStorage.getItem('text') || '[]');
    if (loadedData.length > 0) {
        data = loadedData;
        write(data);
    }

    button.addEventListener('click', e => {
        e.preventDefault();

        let text = textarea.value.trim();

        if (text === '') return;

        data = [text, ...data];
        write(data);

        localStorage.setItem('text', JSON.stringify(data));

        textarea.value = '';
    })

    function write(data) {
        result.innerHTML = '';

        data.forEach(item => {
            item = item.replaceAll("\n", '<br>')

            let p = document.createElement('p');
            p.innerHTML = item;
            p.classList.add('paragraph');

            result.appendChild(p);
        })
    }
})();