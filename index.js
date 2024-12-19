const defaultProfile = {
    id: "song",
    img: "https://elice-contents.github.io/elice-instagram-clone/assets/default_profile.svg",
    name: "안녕하세요",
    description: "누구세요",
    link: "https://www.youtube.com/watch?v=6z82w0l6kwE",
    post: 0,
    follower: 1,
    follow: 1,
};

// 프로필
const profile_image_Element = document.getElementsByClassName("profile_image")
const profile_id_Element = document.getElementsByClassName("profile_id")
const profile_name_Element = document.getElementsByClassName("profile_name")
const profile_text_Element = document.getElementsByClassName("profile_text")
const profile_link_Element = document.getElementsByClassName("profile_link")

// 프로필 모달
const input_img_Element = document.getElementById("input_img")
const input_id_Element = document.getElementsByClassName("input_id")
const input_name_Element = document.getElementsByClassName("input_name")
const input_link_Element = document.getElementsByClassName("input_link")
const input_bio_Element = document.getElementsByClassName("input_bio")

const profile_button_Element = document.getElementById("profile_edit_btn")
const profile_modal_Element = document.getElementsByClassName("profile_modal")
const profile_save_Element = document.getElementById("profile_save")
const profile_modal_close = document.getElementById("profile_modal_close")

window.addEventListener("load", () => {
    initProfileModal();

})

// 프로필 모달 켜기
function initProfileModal() {
    profile_edit_btn.addEventListener("click", () => {
        profile_modal_Element.showModal();
    });

    profile_save_Element.addEventListener("click", profileSave);
    profile_modal_close.addEventListener("click", () => {
        updateProfileUI();
        updateProfileUI();
    });
    
}

// 프로필 입력 값 저장
function UpdateprofileSave() {
    const {id, img, name, description, link, ...rest} =
    JSON.parse(localStorage.getItem("profile") || defaultProfile;

    const newProfile = {
        id: input_id_Element.value,
        img: input_img_Element.getAttribute("src"),
        name: input_name_Element.value,
        descriptio: input_bio_Element.value,
        link: input_link_Element.value,
        ...rest,
    };

    localStorage.setItem("profile", JSON.stringify(newProfile));

    updateProfileUI();
}

// 프로필 입력, 저장 값으로 업데이트

function updateProfileUI() {
    const profile = JSON.parse(localStorage.getItem("profile")) || defaultProfile;

    profile_image_Element.setAttribute("src", profile.img);
    profile_id_Element.innerText = profile.id;
    profile_name_Element.innerText = profile.name;
    profile_text_Element.innerText = profile.description;
    profile_link_Element.innerText = profile.link;

    input_img_Element.setAttribute("src", profile.img);
    input_id_Element.value = profile.id;
    input_name_Element.value = profile.name;
    input_link_Element.value = profile.link;
    input_bio_Element.value = profile.description;
}

function updateProfile(newProfile) {
    localStorage.setItem("profile", JSON.stringify(newProfile));

    updateProfileUI();
}

































// 





