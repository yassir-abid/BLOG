const baseUrl = 'http://localhost:3000';

const app = {
    displayPosts(posts) {
        const template = document.getElementById('post-template');
        posts.forEach((post) => {
            const clone = document.importNode(template.content, true);

            clone.querySelector('.card-category').textContent = post.category;
            clone.querySelector('.card-title').textContent = post.title;
            clone.querySelector('.card-content p').innerHTML = post.excerpt;

            clone.querySelector('.picture').setAttribute('src', post.picture);
            clone.querySelector('.picture').setAttribute('alt', post.title);
            clone.querySelector('.btn').setAttribute('href', `${baseUrl}/posts?id=${post.id}`);

            document.querySelector('.articles-container').appendChild(clone);
        });
    },

    async getPostsFromAPI() {
        try {
            const response = await fetch(`${baseUrl}/api/posts`);

            if (response.ok) {
                const posts = await response.json();
                app.displayPosts(posts);
            }
        } catch (err) {
            console.error(err);
        }
    },

    async handleSearchForm(event) {
        event.preventDefault();

        document.querySelector('.articles-container').innerHTML = '';

        const searchText = event.target[0].value.toLowerCase();

        try {
            const response = await fetch(`${baseUrl}/api/posts`);

            if (response.ok) {
                const posts = await response.json();
                // eslint-disable-next-line max-len
                const foundPosts = posts.filter((post) => post.title.toLowerCase().includes(searchText));
                app.displayPosts(foundPosts);
            }
        } catch (err) {
            console.error(err);
        }
    },

    addListenerToSearchForm() {
        const form = document.querySelector('.search');
        form.addEventListener('submit', app.handleSearchForm);
    },

    init() {
        app.addListenerToSearchForm();
        app.getPostsFromAPI();
    },

};

document.addEventListener('DOMContentLoaded', app.init);
