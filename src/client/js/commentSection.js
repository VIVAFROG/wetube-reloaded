const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');
const deleteBtns = document.querySelectorAll('.deleteBtn');

const addComment = (text, id) => {
  const videoComments = document.querySelector('.video__comments ul');
  const newComment = document.createElement('li');
  newComment.dataset.id = id;
  newComment.className = 'video__comment';
  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';

  const span = document.createElement('span');
  span.innerText = ` ${text}`;

  const span2 = document.createElement('span');
  span2.innerText = '❌';
  span2.addEventListener('click', handleDelete);

  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === '') {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  const { newCommentId } = await response.json();

  if (response.status === 201) {
    addComment(text, newCommentId);
  }
  textarea.value = '';
};

const handleDelete = async (event) => {
  const comment = event.target.parentElement;
  const { id } = comment.dataset;
  const videoId = videoContainer.dataset.id;
  console.log('before backend');

  const response = await fetch(`/api/${videoId}/comment/${id}/delete`, {
    method: 'DELETE',
  });

  console.log('after backend');
  if (response.status === 202) {
    comment.remove();
  }
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}

for (const btn of deleteBtns) {
  btn.addEventListener('click', handleDelete);
}
