<script setup>
import { onMounted, onBeforeMount, reactive } from "vue";
import { useProfileStore } from "../stores/user";
import { $api } from "../api/index.js";

const profileStore = useProfileStore();
const user = reactive({});
const userInfor = reactive({
  avatar: "",
  fullName: "",
  email: "",
  createdDate: "",
});

onBeforeMount(async () => {
  try {
    const res = await $api.get("user/me");
    Object.assign(user, res.data.data);
    userInfor.avatar = user.avatar;
    userInfor.fullName = user.fullName;
    userInfor.email = user.email;
    userInfor.createdDate = user.createdDate;
    profileStore.infor = user;
  } catch (error) {
    console.log(error);
  }
});

onMounted(() => {
  profileStore.isLoggedIn = true;
  userInfor.avatar = profileStore.infor.avatar;
  userInfor.fullName = profileStore.infor.fullName;
  userInfor.email = profileStore.infor.email;
  userInfor.createdDate = profileStore.infor.createdDate;
});
</script>
<template>
  <div>
    <div class="profile-wrap">
      <div class="avatar">
        <img :src="userInfor.avatar" alt="" />
      </div>
      <div class="infor">
        <p class="name"><span>Tên đầy đủ:</span> {{ userInfor.fullName }}</p>
        <p class="email"><span>Email:</span> {{ userInfor.email }}</p>
        <p class="created-date">
          <span>Ngày tạo:</span> {{ userInfor.createdDate }}
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$primary-color: #496989;
$second-color: #58a399;
$third-color: #a8cd9f;
$fourth-color: #e2f4c5;
$font-text: "Kanit", sans-serif;

.profile-wrap {
  background-color: $primary-color;
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 30px;
  color: $fourth-color;
  .avatar {
    width: 100px;
    height: 100px;
    margin-right: 30px;
  }
  .avatar img {
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .infor {
    font-size: 18px;
    span {
      text-decoration: underline;
    }
  }
}
</style>
