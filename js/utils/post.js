import { setTextContent, truncateText } from './common';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

// to use from now
dayjs.extend(relativeTime);

export const createPostElement = (post) => {
  if (!post) return;
  //find and clone Template
  const postTemplate = document.getElementById('postItemTemplate');
  if (!postTemplate) return;

  const postElement = postTemplate.content.cloneNode(true);
  if (!postElement) return;

  // update title, thumbnail, author, description

  setTextContent(postElement, '[data-id="title"]', post.title);
  setTextContent(postElement, '[data-id="description"]', truncateText(post.description, 120));
  setTextContent(postElement, '[data-id="author"]', post.author);


  // const titleElement = postElement.querySelector('[data-id="title"]');
  // if (titleElement) titleElement.textContent = post.title;

  // const description = postElement.querySelector('[data-id="description"]');
  // if (description) description.textContent = post.description;

  // const author = postElement.querySelector('[data-id="author"]');
  // if (author) author.textContent = post.author;

  // calculate time

  // console.log('timeSpan', dayjs(post.updatedAt).fromNow());
  setTextContent(postElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`);


  const thumbnailElement = postElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
    });
  }

  // add event direct for divElement

  postElement.firstElementChild?.addEventListener('click', () => {
    window.location.assign(`/post-detail.html?id=${post.id}`);
  });


  return postElement;
  //attach event
}

export const renderPostList = (postList) => {
  console.log(postList);
  if (!Array.isArray(postList))
    return;
  const ulElement = document.querySelector("#postsList");
  ulElement.textContent = '';
  if (!ulElement) return;
  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement); // Add post to list
  })
}