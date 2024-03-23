<script setup>
    import {ref} from 'vue';
    const activeDarkMode = ref(false);
    const active = () => {
        activeDarkMode.value = !activeDarkMode.value;
    }
</script>

<template>
    <div class="wrap" :class="{'is-dark-mode': activeDarkMode}">
        <p class="title" :class="{'heading--dark-mode': activeDarkMode}">
            The 
            <span :class="{'heading--light-mode': !activeDarkMode}">Progressive</span> <br> 
            Javascript Framework
        </p>
        <p class="desc" :class="{'text--dark-mode': activeDarkMode}">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, aliquam.
        </p>
        <div class="switch-container">
            <input type="checkbox" id="switch" @change="active">
            <div class="switch-btn">
                <label for="switch">
                    <span class="material-symbols-outlined dark-mode-btn">
                        dark_mode
                    </span>
                    <span class="material-symbols-outlined light-mode-btn">
                        light_mode
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Belanosima:wght@400;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrap {
    width: 100%;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background 1s;
}

p.title {
    font-size: 69px;
    font-family: "Belanosima", sans-serif;
    font-weight: bold;
    text-align: center;
    
}

p.title span {

}

.heading--light-mode {
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background 1s;
}

.heading--dark-mode {
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background 1s;
}

.is-dark-mode {
    background-color: #1A1A1A ;
}

p.desc.text--dark-mode {
    color: rgba(235, 235, 235, .6);
    transition: all 1s;
}

.switch-container {
    margin-top: 30px;
}

.switch-btn {
    width: 180px;
    height: 60px;
    overflow: hidden;
    border-radius: 50px;
    padding: 6px;
    border: 5px solid #F1F1F1;
    border-radius: 50px;
    background-color: #fff;
    transition: all 1s;
}

input[type="checkbox"] {
    display: none;
}

label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 230px;
    height: 38px;
    transform: translateX(-183px);
    cursor: pointer;
    transition: all 1s;
}

label span {
    font-size: 46px;
}


input[type="checkbox"]:checked ~ .switch-btn {
    background-color: #1A1A1A;
}

input[type="checkbox"]:checked ~ .switch-btn label{
    transform: translateX(116px);
    color: #F1F1F1;
}
</style>