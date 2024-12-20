// 프로필 요소

const profile_edit_btn = document.getElementById('profile_edit_btn');
const profile_modal = document.getElementById('profile_modal_dialog');
const edit_close_btn = document.getElementById('edit_close_btn');
const edit_save_btn = document.getElementById('edit_save_btn');
const profile_image = document.querySelector('.profile_image > img');
const profile_id = document.getElementById('profile_id');
const profile_name = document.querySelector('.profile_name > strong');
const profile_bio = document.querySelector('.profile_bio');
const profile_link = document.getElementById('link');

const input_file = document.getElementById('input_file');
const input_image = document.querySelector('.edit_image > label > img');

// 프로필 모달 열기
profile_edit_btn.addEventListener('click', () => {
    profile_modal.showModal();

    const profileStore = JSON.parse(localStorage.getItem('profile'));
    if(profileStore) {
        input_image.src = profileStore.image || '';
        input_id.value = profileStore.id || '';
        input_name.value = profileStore.name || '';
        input_bio.value = profileStore.bio || '';
        input_link.value = profileStore.link || '';
    }
});

// 프로필 모달 닫기
edit_close_btn.addEventListener('click', () => {
    profile_modal.close();
});

// 이미지 파일 선택 -> 미리보기 (복습 필요)
input_file.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            input_image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 저장 버튼 -> 프로필 업데이트
edit_save_btn.addEventListener('click', (e) => {
    e.preventDefault();  // 폼 제출 방지
    
    // 입력 값 가져오기
    const newProfileId = document.getElementById('input_id').value;
    const newProfileName = document.getElementById('input_name').value;
    const newProfileLink = document.getElementById('input_link').value;
    const newProfileBio = document.getElementById('input_bio').value;
    
    // 변경 시 업데이트
    if (input_image.src) {
        profile_image.src = input_image.src;
    }

    // 프로필 id, name, link, bio 업데이트
    profile_id.textContent = newProfileId || profile_id.textContent;
    profile_name.textContent = newProfileName || profile_name.textContent;
    profile_bio.textContent = newProfileBio || profile_bio.textContent;
    profile_link.href = newProfileLink || profile_link.href;
    profile_link.textContent = newProfileLink || profile_link.textContent;

    // localStorage 저장 (복습 필요)
    const profileUpdate = {
        image: profile_image.src,
        id: profile_id.textContent,
        name: profile_name.textContent,
        bio: profile_bio.textContent,
        link: profile_link.href
    };

    localStorage.setItem('profile', JSON.stringify(profileUpdate));

    // 모달 닫기
    profile_modal.close();
});

// localStorage 불러오기 (복습 필요)
window.addEventListener('load', () => {
    const profileStore = JSON.parse(localStorage.getItem('profile'));

    if(profileStore) {
        profile_image.src = profileStore.image || profile_image.src;
        profile_id.textContent = profileStore.id || profile_id.textContent;
        profile_name.textContent = profileStore.name || profile_name.textContent;
        profile_link.textContent = profileStore.link || profile_link.textContent;
        profile_link.href = profileStore.link || profile_link.href.textContent;
        profile_bio.textContent = profileStore.bio || profile_bio.textContent;
    }
})


// 포스트

const count_post = document.getElementById('count post');
const gallary_post = document.querySelector('.gallary');
const post_add_btn = document.getElementById('post_add_btn');
const post_modal = document.getElementById('post_modal_dialog');

const add_share_btn = document.getElementById('add_share_btn');
const add_file = document.getElementById('add_file');
const add_article = document.getElementById('add_article');
const add_close_btn = document.getElementById('add_close_btn');

// 포스트 모달 열기
post_add_btn.addEventListener('click', () => {
    post_modal.showModal();

    const postStore = JSON.parse(localStorage.getItem('post'));
    if(profileStore) {
        add_file.src = postStore.image || '';
        input_id.value = postStore.id || '';
        input_name.value = postStore.name || '';
        input_bio.value = postStore.bio || '';
        input_link.value = postStore.link || '';
    }
});

// 포스트 모달 닫기
edit_close_btn.addEventListener('click', () => {
    profile_modal.close();
});



