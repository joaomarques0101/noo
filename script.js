document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se o usuário está logado
    function checkUserLoggedIn() {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        return userProfile;
    }

    // Função para curtir ou descurtir post
    function handleLikeButton(button) {
        const post = button.closest('.post');
        const likeCount = post.querySelector('.like-count');
        let currentLikes = parseInt(likeCount.textContent) || 0;

        if (button.classList.contains('liked')) {
            // Se já curtiu, remove a curtida
            currentLikes--;
            button.classList.remove('liked');
            button.textContent = "❤️ Like";
        } else {
            // Se não curtiu, adiciona a curtida
            currentLikes++;
            button.classList.add('liked');
            button.textContent = "💔 Unlike";
        }

        likeCount.textContent = currentLikes; // Atualiza o contador de curtidas
    }

    // Função para adicionar comentário
    function handleCommentButton(button) {
        const post = button.closest('.post');
        const userProfile = checkUserLoggedIn();

        if (!userProfile) {
            alert("Você precisa criar um perfil para comentar.");
            window.location.href = "profile.html"; // Redireciona para a página de perfil
            return;
        }

        const commentText = prompt("Digite seu comentário:");
        if (commentText) {
            const commentsSection = post.querySelector('.comments');
            const newComment = document.createElement('p');
            newComment.innerHTML = `
                <img src="${userProfile.profilePicture}" alt="${userProfile.nickname}" class="comment-avatar">
                <strong>${userProfile.nickname}:</strong> ${commentText}
            `;
            commentsSection.appendChild(newComment);
        }
    }

    // Função para adicionar novos posts dinamicamente
    function addNewPost(userName, userImage, postImage, postContent) {
        const feed = document.querySelector('.feed');
        const newPost = document.createElement('div');
        newPost.classList.add('post');

        newPost.innerHTML = `
            <div class="user-info">
                <img src="${userImage}" alt="${userName}" class="avatar">
                <span class="username">${userName}</span>
            </div>
            <img src="${postImage}" alt="Post Image" class="post-image">
            <div class="post-actions">
                <button class="like-btn">❤️ Like</button>
                <span class="like-count">0</span>
                <button class="comment-btn">💬 Comment</button>
            </div>
            <div class="comments">
                <p><strong>User1:</strong> ${postContent}</p>
            </div>
        `;

        // Adicionando o novo post ao feed
        feed.appendChild(newPost);

        // Event listeners para os novos botões
        const likeBtn = newPost.querySelector('.like-btn');
        const commentBtn = newPost.querySelector('.comment-btn');
        likeBtn.addEventListener('click', () => handleLikeButton(likeBtn));
        commentBtn.addEventListener('click', () => handleCommentButton(commentBtn));
    }

    // Inicializando botões de like e comentar
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => handleLikeButton(button));
    });

    commentButtons.forEach(button => {
        button.addEventListener('click', () => handleCommentButton(button));
    });

    // Controle do carrossel
    const carousel = document.querySelector('.carousel');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    let index = 0;

    function updateCarousel() {
        const width = carouselImages[0].clientWidth;
        carousel.style.transform = `translateX(${-index * width}px)`;
    }

    function moveLeft() {
        index = (index > 0) ? index - 1 : carouselImages.length - 1;
        updateCarousel();
    }

    function moveRight() {
        index = (index < carouselImages.length - 1) ? index + 1 : 0;
        updateCarousel();
    }

    leftBtn.addEventListener('click', moveLeft);
    rightBtn.addEventListener('click', moveRight);

    window.addEventListener('resize', updateCarousel);
});
