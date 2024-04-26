<script setup>
import "../profileForm/profile.scss";
import { defineProps } from "vue";
const props = defineProps(["fullName", "email", "avatar", "createdDate"]);
</script>
<template>
  <div>
    <div class="profile-wrap">
      <div class="avatar">
        <img :src="props.avatar" alt="" />
      </div>
      <div class="infor">
        <p class="name"><span>Tên đầy đủ:</span> {{ props.fullName }}</p>
        <p class="email"><span>Email:</span> {{ props.email }}</p>
        <p class="created-date">
          <span>Ngày tạo:</span> {{ props.createdDate }}
        </p>
      </div>
    </div>
  </div>
</template>
