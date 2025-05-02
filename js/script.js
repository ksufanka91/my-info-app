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

    edit(value, index) {
        this.data[index] = value
        localStorage.setItem('text', JSON.stringify(this.data));
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
    let editIndex = -1;

    const storage = new NoteStorage();

    write(storage.all());

    button.addEventListener('click', e => {
        e.preventDefault();

        let text = textarea.value.trim();

        if (text === '') return;

        if (editIndex === -1) {
            storage.add(text);
        } else {
            storage.edit(text, editIndex);
        }

        write(storage.all());

        textarea.value = '';
        editIndex = -1;
    })

    function write(data) {
        result.innerHTML = '';

        data.forEach(item => {
            item = item.replaceAll("\n", '<br>')

            let spanDelete = document.createElement('span');
            spanDelete.classList.add('delete');

            let spanEdit = document.createElement('span');
            spanEdit.classList.add('edit');

            let p = document.createElement('p');
            p.innerHTML = item;
            p.classList.add('paragraph');
            p.appendChild(spanEdit);
            p.appendChild(spanDelete);

            result.appendChild(p);

            spanDelete.addEventListener('click', () => {
                let index = [].slice.call(result.children).indexOf(p)
                storage.delete(index);
                p.remove();
            })

            spanEdit.addEventListener('click', () => {
                textarea.value = item;
                editIndex = [].slice.call(result.children).indexOf(p);
            })
        })
    }
})();
