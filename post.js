document.addEventListener("DOMContentLoaded", () => {
  const postAddBtn = document.getElementById("post_add_btn");
  const postModal = document.getElementById("post_modal_dialog");
  const addFileInput = document.getElementById("add_file");
  const addShareBtn = document.getElementById("add_share_btn");
  const addImage = document.querySelector(".add_post > img"); // 미리보기
  const addTextarea = document.getElementById("add_textarea");
  const gallery = document.querySelector(".gallery");

  // '만들기' 버튼 -> 모달 열기
  postAddBtn.addEventListener("click", () => {
    postModal.showModal(); // 모달 열기
  });

  // 초기 상태
  addShareBtn.style.display = "none";

  // 파일 선택 -> 미리보기, '공유하기' 버튼
  addFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addImage.src = e.target.result;
        addImage.style.display = "block";
        addShareBtn.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      addImage.style.display = "none";
      addShareBtn.style.display = "none";
    }
  });

  // '공유하기' 버튼 -> gallery 영역 post 추가
  addShareBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const file = addFileInput.files[0];
    const text = addTextarea.value.trim();

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const postDiv = createPost(e.target.result, text);
        gallery.appendChild(postDiv);
        updateGalleryUI();
        postModal.close();
        resetModal(); // 입력한 것 초기화
      };
      reader.readAsDataURL(file);
    }
  });

  // 모달 입력 필드 초기화
  function resetModal() {
    addFileInput.value = "";
    addTextarea.value = "";
    addShareBtn.style.display = "none";
    addImage.style.display = "none";
  }

  // 새로운 post 생성
  function createPost(imageSrc, text) {
    const postDiv = document.createElement("div");
    postDiv.className = "post-item";

    const postImg = document.createElement("img");
    postImg.src = imageSrc;

    const postText = document.createElement("p");
    postText.textContent = text;

    postDiv.appendChild(postImg);
    postDiv.appendChild(postText);

    // post 클릭 -> view modal 열기
    postDiv.addEventListener("click", () => openViewModal(postDiv, imageSrc, text));

    return postDiv;
  }

  // view modal

  function openViewModal(postDiv, imageSrc, text) {
    const viewModal = document.createElement("dialog");
    viewModal.className = "view-modal";

    const viewImg = document.createElement("img");
    viewImg.src = imageSrc;

    const viewText = document.createElement("p");
    viewText.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.addEventListener("click", () => enableEditMode(viewModal, viewText, editBtn));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
      if (confirm("게시물을 삭제하시겠습니까?")) {
        gallery.removeChild(postDiv);
        updateGalleryUI();
        viewModal.close();
      }
    });

    const closeModalBtn = document.createElement("button");
    closeModalBtn.textContent = "닫기";
    closeModalBtn.addEventListener("click", () => viewModal.close());

    viewModal.appendChild(viewImg);
    viewModal.appendChild(viewText);
    viewModal.appendChild(editBtn);
    viewModal.appendChild(deleteBtn);
    viewModal.appendChild(closeModalBtn);

    document.body.appendChild(viewModal);
    viewModal.showModal();
  }

  // '수정' 버튼
  function enableEditMode(viewModal, viewText, editBtn) {
    const textarea = document.createElement("textarea");
    textarea.value = viewText.textContent;
    viewModal.replaceChild(textarea, viewText);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.addEventListener("click", () => {
      viewText.textContent = textarea.value;
      viewModal.replaceChild(viewText, textarea);
      completeBtn.remove();
      cancelBtn.remove();
      editBtn.style.display = "inline";
    });

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "취소";
    cancelBtn.addEventListener("click", () => {
      viewModal.replaceChild(viewText, textarea);
      completeBtn.remove();
      cancelBtn.remove();
      editBtn.style.display = "inline";
    });

    viewModal.appendChild(completeBtn);
    viewModal.appendChild(cancelBtn);

    editBtn.style.display = "none";
  }

  // gallery 업데이트
  function updateGalleryUI() {
    const posts = gallery.querySelectorAll(".post-item");
    if (posts.length === 0) {
      gallery.innerHTML = `
        <div class="empty-message">
          <img src="	https://elice-contents.github.io/elice-instagram-clone/assets/camera_icon.svg" alt="Camera Icon" />
          <p>게시물 없음</p>
        </div>
      `;
    } else {
      const emptyMessage = gallery.querySelector(".empty-message");
      if (emptyMessage) {
        gallery.removeChild(emptyMessage);
      }
    }
  }

  // localStorage 저장
  const galleryUpdate = {
    image: viewImg.src,
    text: viewText.textContent,
};

localStorage.setItem('gallery', JSON.stringify(galleryUpdate));

// localStorage 불러오기
window.addEventListener('load', () => {
  const galleryStore = JSON.parse(localStorage.getItem('gallery'));

  if(galleryStore) {
      viewImg.src = galleryStore.image || viewImg.src;
      viewText.textContent = galleryStore.text || viewText.textContent;
  }
})
  
  // gallery 업데이트
  updateGalleryUI();
});