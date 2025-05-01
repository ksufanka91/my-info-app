class NoteStorage {
    constructor() {
        this.data = [];

        const loadedData = JSON.parse(localStorage.getItem('text') || '[]');
        if (loadedData.length > 0) {
            this.data = loadedData;
        }
    }

    add(value) {
        this.data = [value, ...this.data];
        localStorage.setItem('text', JSON.stringify(this.data));
    }

    edit() {

    }

    delete(index) {
        this.data.splice(index, 1);
        localStorage.setItem('text', JSON.stringify(this.data));
    }

    all() {
        return this.data;
    }
}

(function () {
    const textarea = document.querySelector('.js-textarea');
    const button = document.querySelector('.js-button');
    const result = document.querySelector('.js-result');

    const storage = new NoteStorage();

    write(storage.all());

    button.addEventListener('click', e => {
        e.preventDefault();

        let text = textarea.value.trim();

        if (text === '') return;

        storage.add(text);
        write(storage.all());

        textarea.value = '';
    })

    function write(data) {
        result.innerHTML = '';

        data.forEach(item => {
            item = item.replaceAll("\n", '<br>')

            let span = document.createElement('span');
            span.classList.add('delete');

            let p = document.createElement('p');
            p.innerHTML = item;
            p.classList.add('paragraph');
            p.appendChild(span);

            result.appendChild(p);

            span.addEventListener('click', (e) => {
                let index = [].slice.call(result.children).indexOf(p)
                storage.delete(index);
                p.remove();
            })
        })
    }
})();
