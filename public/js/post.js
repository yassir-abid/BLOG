const baseUrl = 'http://localhost:3000';

const app = {
    init() {
        app.getOnePostFromAPI();
    },

    async getOnePostFromAPI() {
        try {
            const params = new URLSearchParams(document.location.search);
            const postId = params.get('id');

            // eslint-disable-next-line no-undef
            const response = await fetch(`${baseUrl}/api/posts/${postId}`);

            if (response.ok) {
                const post = await response.json();

                document.querySelector('.card-category').textContent = post.category;
                document.querySelector('.card-title').textContent = post.title;
                document.querySelector('.card-excerpt p').innerHTML = post.excerpt;
                document.querySelector('.card-content p').innerHTML = post.content;

                document.querySelector('.picture').setAttribute('src', post.picture);
                document.querySelector('.picture').setAttribute('alt', post.title);
                // eslint-disable-next-line no-undef
                document.querySelector('.btn').setAttribute('href', `${baseUrl}`);
            }
        } catch (err) {
            console.error(err);
        }
    },

};

document.addEventListener('DOMContentLoaded', app.init);
