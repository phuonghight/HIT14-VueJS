<script setup>
    import './Profile.scss'
    import axios from 'axios';
    import {ref, reactive} from 'vue';

    // This variable is used to store user's data when log in success
    const userData = reactive({
        avatar: '',
        fullName: '',
        email: '',
        createdDate: ''
    })

    function getUserProfile(token) {
        const urlApi = 'https://api.phuonghight.click/user/me';
        axios.get(urlApi, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const resData = res.data.data;
            console.log(resData);
            userData.avatar = resData.avatar;
            userData.fullName = resData.fullName;
            userData.email = resData.email;
            userData.createdDate = resData.createdDate;
        })
        .catch(error => console.log(error));
    }

    const loginForm = ref(true);
    const loginHome = ref(true);
    const profile = ref(true);
    const isLoginFail = ref(true);

    // This variable is used to store data to send request to log in or register
    const data = reactive({
        'fullName': '',
        'email': '',
        'password': ''
    })

    function login() {
        axios.post('https://api.phuonghight.click/auth/login', data)
            .then(res => {
                console.log(res.data.data.accessToken);
                getUserProfile(res.data.data.accessToken);
                profile.value = false;
                loginHome.value = false;
                isLoginFail.value = true;
            })
            .catch(error => {
                isLoginFail.value = false;
                console.log(error);
            });
    }

    const isRegisterDone = ref(true);
    // This variables is used to store arror and alert error when register
    const fullName = reactive({
        error: true,
        alert: ''
    });
    const email = reactive({
        error: true,
        alert: ''
    });
    const password = reactive({
        error: true,
        alert: ''
    });

    function register() {
        axios.post('https://api.phuonghight.click/auth/register', data)
            .then(res => {
                console.log(res);
                isRegisterDone.value = false;
                fullName.error = true;
                email.error = true;
                password.error = true;
            })
            .catch(error => {
                console.log(error.response.data.message);
                console.log(error.response.data.message.email);

                fullName.error = false;
                fullName.alert = error.response.data.message.fullName;

                email.error = false;
                if (error.response.data.message === `User with ${data.email} is already exist`) 
                    email.alert = `User with ${data.email} is already exist`;
                else email.alert = error.response.data.message.email;
                
                password.error = false;
                password.alert = error.response.data.message.password;

                isRegisterDone.value = true;
            });
    }
    
</script>
<template>
    <div>
        <!-- Nav bar -->
        <div v-if="loginHome" class="nav">
            <button @click="loginForm = true" class="btn--login">LOGIN</button>
            <button @click="loginForm = false" class="btn--register">REGISTER</button>
        </div>
        <!-- Login -->
        <div v-if="loginForm && loginHome" class="login form-wrap center">
            <h1>Login</h1>
            <form action="">
                <label for="email">Email</label> <br>
                <input v-model="data.email" type="text" placeholder="Enter email"> <br>
                <label for="password">Password</label> <br>
                <input v-model="data.password" type="password" placeholder="Enter password"> <br>
                <p v-if="!isLoginFail" class="form-error">Login fail! Pls try again or register</p>
                <div class="change-register">
                    <p class="form-feature">Change password?</p>
                    <p @click="loginForm = false" class="form-feature">Don't have an account?</p>
                </div>
                <input type="button" value="LOGIN" @click="login()">
            </form>
        </div>
        <div v-if="!loginForm && loginHome" class="register form-wrap center">
            <h1>Register</h1>
            <form action="">
                <label for="name">Full name</label> <br>
                <input v-model="data.fullName" type="text" placeholder="Enter full name" required> <br>
                <p v-if="!fullName.error" class="form-error">{{ fullName.alert }}</p>
                <label for="email">Email</label> <br>
                <input v-model="data.email" type="text" placeholder="Enter email" required> <br>
                <p v-if="!email.error" class="form-error">{{ email.alert }}</p>
                <label for="password">Password</label> <br>
                <input v-model="data.password" type="password" placeholder="Enter password" required> <br>
                <p v-if="!password.error" class="form-error">{{ password.alert }}</p>
                <ul class="password-required">
                    Password required:
                    <li>At least 8 characters</li>
                    <li>At least 1 letter character (uppercase or lowercase)</li>
                    <li>At least 1 numeric character.</li>
                </ul>
                <p v-if="!isRegisterDone" class="form-done">Register done!</p>
                <p @click="loginForm = true" class="form-feature">Have an account?</p>
                <input type="button" value="REGISTER" @click="register()">
            </form>
        </div>
        <!-- Register -->
        <div v-if="!profile" class="profile center fade">
            <i @click="loginHome = true; profile = true" class="fa-solid fa-angle-left"></i>
            <div class="avatar">
                <img :src="userData.avatar" alt="">
            </div>
            <div class="infor">
                <p class="name">
                    <span>Tên đầy đủ: </span>
                    {{ userData.fullName }}
                </p>
                <p class="email">
                    <span>Email: </span>
                    {{ userData.email }}
                </p>
                <p class="createDate">
                    <span>Ngày tạo: </span>
                    {{ userData.createdDate }}
                </p>
            </div>
        </div>
    </div>
</template>