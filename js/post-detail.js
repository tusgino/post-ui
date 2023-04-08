import postAPI from "./api/postAPI";
import { setTextContent } from "./utils";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// to use from now
dayjs.extend(relativeTime);

// id="goToEditPageLink"
// id="postDetailTitle"
// id="postDetailAuthor"
// id="postDetailTimeSpan"
// id="postHeroImage"
// id="postDetailDescription"



const renderPostDetail = (post) => {
  if (!post) return;
  // render title
  // render content
  // render author
  // render image

  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(document, '#postDetailTimeSpan', dayjs(post.updateAt).format('DD/MM/YYYY'));
  setTextContent(document, '#postDetailDescription', post.description);
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;


    heroImage.addEventListener('error', () => {
      heroImage.style.backgroundImage = `url("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png")`;
    });
  }

  // render page link
  const goToEditPageLink = document.getElementById('goToEditPageLink');
  if (goToEditPageLink) {
    goToEditPageLink.href = `/add-edit-post.html?id=${post.id}`;
    goToEditPageLink.innerHTML = '<i class="fas fa-edit"></i>Edit post'
  }
}


(async () => {
  // get Id post
  // fetch post detail API
  // render post detail

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');
    if (!postId) {
      window.location.href = '/';
    }
    const post = await postAPI.getByID(postId);
    renderPostDetail(post);
  } catch (error) {
    console.log('Failed to fetch post detail', error);
  }
})()