<script setup>
import { reactive, ref, onBeforeMount } from 'vue';

import { api } from '../api/axios';

const apiKey = '40e0f5a9c38158112f0457b9d643ee23';
const icon_url = 'https://openweathermap.org/img/wn/';

const city = ref('');
const cities = ref(['Hà Nội', 'Thành phố Hồ Chí Minh', 'Bắc Kinh', 'Seoul', 'Tokyo']);
const weather = reactive({
  name: '',
  temp: 0,
  humidity: 0,
  description: '',
  icon: ''
});
const getWeater = async (city) => {
  try {
    const response = await api.get('/', {
      params: { q: city, appid: apiKey, lang: 'vi' }
    });
    console.log(response);
    const data = response.data;
    weather.name = data.name;
    weather.temp = ~~(data.main.temp - 272.15);
    weather.humidity = data.main.humidity;
    weather.description =
      data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
    weather.icon = icon_url + data.weather[0].icon;
    weather.icon = `${icon_url}${data.weather[0].icon}@2x.png`;
    if (!cities.value.includes(weather.name)) {
      cities.value.push(weather.name);
    }
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
};

onBeforeMount(async () => {
  await getWeater('hanoi');
});
</script>

<template>
  <form @submit.prevent="getWeater(city)" class="weather-form">
    <input v-model="city" class="city-input" type="text" placeholder="Nhập tên thành phố" />
    <button>Tìm kiếm</button>
  </form>
  <select v-model="city" @change="getWeater(city)">
    <option value="" disabled>Chọn thành phố</option>
    <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
  </select>
  <div class="widget">
    <div class="left-panel panel">
      <div class="city"> {{ weather.name }} </div>
      <div class="desc">{{ weather.description }}</div>
      <div class="temp">
        <img v-if="weather.icon" :src="weather.icon" alt="" width="100" />
        <p>{{ weather.temp }}&deg;</p>
      </div>
      <div class="humidity">Độ ẩm: {{ weather.humidity }}%</div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}

body {
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  background: #009688;
}

.weather-form {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.city-input {
  min-width: 250px;
  background-color: #f5f5f5;
  color: #242424;
  padding: 10px 20px;
  border-radius: 4px;
  outline: none;
  border: none;
}

div.widget {
  width: 355px;
  background-color: #000000;
  border-radius: 9px;
  padding: 25px;
  box-shadow: 0px 31px 35px -26px #080c21;
  color: #fff;
}

div.city {
  font-size: 21px;
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 5px;
}

div.temp {
  font-size: 81px;
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.right-panel {
  margin-top: 35px;
  padding-left: 10px;
}
</style>
