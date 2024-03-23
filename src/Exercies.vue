<script setup>
import { ref } from "vue";

const darkMode = ref(false);
</script>

<template>
  <div class="exercise" :class="{ dark: darkMode }">
    <header>
      <div class="logo">
        <img src="./assets/vue.svg" alt="" />
        <span>Vue.JS</span>
      </div>
      <div class="nav">
        <label class="switch">
          <input type="checkbox" @change="darkMode = !darkMode" />
          <span class="slider"></span>
        </label>
      </div>
    </header>
    <main>
      <h1>The <span>Progressive</span> JavaScript Framework</h1>
      <p>
        An approachable, performant and versatile framework for building web
        user interfaces.
      </p>
    </main>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap");

* {
  margin: 0;
  padding: 0;
}

.exercise {
  height: 100vh;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px;
    height: 50px;
    border-bottom: 1px solid rgb(60, 60, 60, 0.12);
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  main {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1 {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-size: 64px;
      color: rgb(33, 53, 71);
      line-height: 80px;
      font-weight: 900;
      padding: 0 350px;
      span {
        background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    p {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-size: 24px;
      color: rgba(60, 60, 60, 0.7);
      line-height: 27px;
      font-weight: 400;
      margin: 40px 0;
    }
  }

  &.dark {
    background-color: #1a1a1a;
    header {
      border-bottom: 1px solid rgb(84, 84, 84, 0.48);
      .logo span {
        color: rgba(235, 235, 235, 0.6);
      }
    }
    main {
      h1 {
        background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        color: rgba(235, 235, 235, 0.6);
      }
    }
  }
}

/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d3d3d3;
  transition: 0.4s;
  border-radius: 30px;
  box-shadow: 0 0 1px #1a1a1a;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  border-radius: 20px;
  left: 5px;
  top: 50%;
  transform: translate(0, -50%);
  background-color: #fff;
  transition: 0.4s;
}

.switch input:checked + .slider:before {
  background-color: #d3d3d3;
  border-radius: 50px;
  box-shadow: inset 5px -5px 0px 0px #1a1a1a;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #1a1a1a;
}

.switch input:checked + .slider:before {
  transform: translate(15px, -50%);
}
</style>
