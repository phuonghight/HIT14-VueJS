<script setup>
    import {ref, reactive, computed} from 'vue';

    // Random translate button
    const left = ref(0);
    const top = ref(0);

    const randomPos = () => {
        let i = Math.floor(Math.random() * 500) + 1;
        let j = Math.floor(Math.random() * 500) + 1;

        left.value = i;
        top.value = j;
    }

    const answer = ref(false);
    const showMore = ref(false);

    // Api is used to get country, state, city
    var config = {
        cUrl: 'https://api.countrystatecity.in/v1/countries',
        cKey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
    }

    const countries = ref();    // This variables is to store country's list
    const selectedCountryCode = ref(""); // This variables is to store country's code - example: VN

    function loadCountries() {
        let apiEndPoint = config.cUrl;

        fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.cKey}})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                countries.value = data;
            })
            .catch(error => console.error(error));
    }

    const states = ref(); // This variables is to store state's list
    const selectedStatesName = ref(""); // This variables is to store state's code

    function loadStates() {
        console.log(selectedCountryCode.value);
        fetch(`${config.cUrl}/${selectedCountryCode.value}/states`, {headers: {"X-CSCAPI-KEY": config.cKey}})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                states.value = data;
            })
            .catch(error => console.error(error));
    }

    window.onload = loadCountries; // When web is loading will excute loadCountries function

    var appId = '8023e1a0c0e3b8ce6950f19db954402b'; // Phuong's appId for weather api
    // This variable is used to store location you search by city and states
    const location = ref();
    const latlon = ref({
        lat: '',
        lon: ''
    });
    const alertError = ref(false);

    const searchLatLon = computed(() => {
        console.log(selectedCountryCode.value, selectedStatesName.value);
        
        // Actually, this api need 3 value: city's name, state's name, country's name but 
        // the value about city's name of countries api above not suit to this city's name of weather api
        // so I replace value of city's name by state's name
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${selectedStatesName.value}, ${selectedStatesName.value}, ${selectedCountryCode.value}&appid=${appId}`)
            .then(res => res.json())
            .then(data => {
                location.value = data;
                console.log(location.value);
                latlon.value.lat = location.value[0].lat;
                latlon.value.lon = location.value[0].lon;
            })
            .catch(error => console.error(error));
    }) 
    
    let inforLocation = ref([]); // This variable is to store weather's informatioon of location I want

    // This variable is to store information of weather I want to display on screen
    let weatherLocation = ref({
        desc: 'Mostly Cloudy', /* description */
        icon: '', /*icon */
        temp: 20 + '°C', /*temperature */
        humidity: 70 + '%',
        lname: 'Doha', /* location name */
        cname: 'Qatar' /* country name */

    })

    const searchWeather = computed(() => {        
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlon.value.lat}&lon=${latlon.value.lon}&appid=${appId}`)
            .catch(error => {
                    console.error(error);
                    alertError.value = true;
                })
            .then(res => res.json())
            .then(data => {
                inforLocation.value = data;
                weatherLocation.value.desc = inforLocation.value['weather'][0].description;
                weatherLocation.value.temp = Math.round(inforLocation.value.main.temp - 273.15) + '°C';
                weatherLocation.value.humidity = Math.round(inforLocation.value.main.humidity) + '%';
                weatherLocation.value.lname = inforLocation.value.name;
                weatherLocation.value.cname = inforLocation.value.sys.country;
                weatherLocation.value.icon = `https://openweathermap.org/img/wn/${inforLocation.value['weather'][0].icon}@2x.png`;
            })
            .catch(error => {
                console.error(error);
                alertError.value = true;
            });
    })

    const selectedCityHistory = ref([]);
    const selectedCity = ref('');

    const searchCityWeather = computed(() => {
        console.log(selectedCity.value);
        if (!alertError.value) {}
        selectedCityHistory.value.push(selectedCity.value);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value}&appid=${appId}`)
            .then(res => res.json())
            .then(data => {
                inforLocation.value = data;
                weatherLocation.value.desc = inforLocation.value['weather'][0].description;
                weatherLocation.value.temp = Math.round(inforLocation.value.main.temp - 273.15) + '°C';
                weatherLocation.value.humidity = Math.round(inforLocation.value.main.humidity) + '%';
                weatherLocation.value.lname = inforLocation.value.name;
                weatherLocation.value.cname = inforLocation.value.sys.country;
                weatherLocation.value.icon = `https://openweathermap.org/img/wn/${inforLocation.value['weather'][0].icon}@2x.png`;
            })
            .catch(error => {
                console.error(error);
                alertError.value = true;
            });
    })

</script>
<template>
    <div>
        <!-- Welcome -->
        <div v-if="!answer" class="question fade flex center">
            <h1>Bạn có phải là Khang không đấy?</h1>
            <div class="answer">
                <button @click="answer = !answer">Đúng</button>
                <button class="ignoredButton" @click="randomPos" :style="{left: left + 'px', top: top + 'px'}">Không</button>
            </div>
        </div>
        <!-- Content -->
        <div v-if="answer" class="content flex center fade">
            <div v-if="alertError" class="alert-error">
                <h1>Not found this location!</h1>
                <p @click="alertError = !alertError">X</p>
            </div>
            <div class="weather--wrap flex center swipe-to-right" :class="{'swipe-to-left': showMore}">
                <div class="city-location">
                    <h3>HURRY UP! Select Your City 😎</h3>
                    <div class="city-location-wrap">
                        <select class="history" v-model="selectedCity"> /*History */
                            <option disable value="">History</option>
                            <option v-for="(item, index) in selectedCityHistory" :key="index" :value="item">{{ item }}</option>
                        </select> 
                        <div class="select-city-wrap">
                            <select v-model="selectedCity"> /*Select city */
                                <option disabled value="">Select City</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                <option value="Bắc Kinh">Bắc Kinh</option>
                                <option value="Tokyo">Tokyo</option>
                            </select>
                            <input type="text" placeholder="Enter city name" v-model="selectedCity">
                        </div>
                        <button @click="searchCityWeather">Check!</button>
                    </div>
                </div>
                <!-- Show weather -->
                <div class="weather flex center">
                    <div class="weather-icon">
                        <img src="https://openweathermap.org/img/wn/10d@2x.png" :srcset="weatherLocation.icon" alt="">
                    </div>
                    <p class="weather-desc">{{ weatherLocation.desc }}</p>
                    <p class="weather-desc weather-humidity">Độ ẩm: {{ weatherLocation.humidity }}</p>
                </div>
                <div class="line"></div>
                <div class="weather-infor">
                    <p class="weather-degree">{{ weatherLocation.temp }}</p>
                    <p class="weather-desc">{{ weatherLocation.lname }}, {{ weatherLocation.cname }}</p>
                </div>
                <div class="weather--more-text" @click="showMore = !showMore">
                    <p>+ More</p>
                </div>
                <div class="back-btn" @click="answer = !answer">&lt;</div>
            </div>
            <div v-if="showMore" class="weather--more swipe-fade-to-right">
                <div class="exit" @click="showMore = !showMore">x</div>
                <!-- <p>no <br> more!</p> -->
                <!-- Select location -->
                <div class="location">
                    <h3>Check weather in Country, State</h3>
                    <select @change="loadStates" v-model="selectedCountryCode">
                        <option disabled value="">Select country</option>
                        <option v-for="(item, index) in countries" :key="index" :value="item.iso2">{{ item.name}}</option>
                    </select>
                    <select @change="searchLatLon" v-model="selectedStatesName">
                        <option disabled value="">Select state</option>
                        <option v-for="(item, index) in states" :key="index" :value="item.name">{{ item.name }}</option>
                    </select>
                    <button @click="searchWeather">Check!</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

$primaryColor: #008DDA;
$secondColor: #41C9E2;
$thirdColor: #F7EEDD;
$fontText: "Kanit", sans-serif;

.flex {
    display: flex;
}

.center {
    justify-content: center;
    align-items: center;
}

.box-shadow {
    -webkit-box-shadow: 0px 10px 14px 0px rgba(0,0,0,0.32);
    -moz-box-shadow: 0px 10px 14px 0px rgba(0,0,0,0.32);
    box-shadow: 0px 10px 14px 0px rgba(0,0,0,0.32);
}

.linear-bg {
    background: linear-gradient(180deg, $primaryColor 0%, $secondColor 90%);
}

.question {
    flex-direction: column;
}

.answer {
    .ignoredButton {
        position: relative;
        transition: all .5s;
    } 
}

.content {
    transition: all 1s;
    position: relative;

    .alert-error {
        position: absolute;
        top: 100px;
        z-index: 999;
        background-color: red;
        border-radius: 10px;
        padding: 8px 16px;

        p {
            position: absolute;
            top: -17px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .weather--wrap {
        width: 890px;
        height: 400px;
        border-radius: 30px;
        gap: 20px;
        position: relative;
        @extend .linear-bg;
        @extend .box-shadow;

        .city-location {
            position: absolute;
            top: -45%;
            text-align: center;
            z-index: 999;

            .city-location-wrap {
                display: flex;
                align-items: center;
                gap: 30px;

                select.history {
                    width: 200px;
                }
            }

            .select-city-wrap {
                select {
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                }

                
                input[type="text"] {
                    padding: 6px 12px;
                    border: 2px solid;
                    border-radius: 5px;
                    font-size: 18px;
                }
            }

            select {
                font-size: 20px;
                height: 37.2px;
                width: 40%;
                padding: 5px;
                border: 2px solid;
                border-radius: 5px;
            }

            select:hover {
                border-color: $primaryColor;
                cursor: pointer;
            }
        }

        .weather {
            flex-direction: column;
            padding-top: 36px;
            width: 30%;
            height: 100%;
            text-align: center;
            

            .weather-icon {
                width: 140px;
                height: 140px;
                background-color: $secondColor;
                border-radius: 30px;
                overflow: hidden;
            }

            .weather-icon img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .weather-icon img:hover {
                transform: scale(1.1);
                transition: all .3s;
                cursor: pointer;
            }

            .weather-desc {
                margin: 0;
            }

            .weather-humidity {
                margin: 0;
                font-size: 24px;
            }
        }

        .weather-desc {
            font-family: $fontText;
            font-weight: 200;
            font-size: 32px;
            color: $thirdColor;
        }

        .weather-desc::first-letter {
            text-transform: uppercase;
        }

        .line {
            height: 90%;
            width: 2px;
            background-color: $thirdColor;
            margin: 0 46px;
        }

        .weather-infor {
            position: relative;

            .weather-degree {
                font-family: $fontText;
                font-weight: 500;
                font-size: 200px;
                color: $thirdColor;
                padding-bottom: 80px;
            }

            .weather-desc {
                position: absolute;
                top: 54%;
                margin-top: 34px;
            }
        }

        .weather--more-text {
            top: -12px;
            right: 20px;
            position: absolute;
        }

        .weather--more-text:hover {
            color: $thirdColor;
        }

        .weather--more-text p {
            font-size: 18px;
            font-weight: 400;
            cursor: pointer;
        }

        .back-btn {
            font-size: 22px;
            font-weight: bold;
            position: absolute;
            top: 0;
            left: 12px;
            cursor: pointer;
        }

        .back-btn:hover {
            color: $thirdColor;
        }
    }

    .weather--more {
        width: 400px;
        height: 550px;
        margin-left: 50px;
        border-radius: 30px;
        position: relative;
        @extend .linear-bg;
        @extend .box-shadow;

        .exit {
            position: absolute;
            right: 20px;
            top: 0px;
            font-weight: 500;
            font-size: 22px;
            cursor: pointer;
        }

        .exit:hover {
            color: $thirdColor;
        }

        p {
            font-size: 100px;
            text-align: center;
            font-weight: bold;
            color: $thirdColor;
        }

        
        .location {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            width: 100%;
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;

            select {
                display: block;
                font-size: 20px;
                width: 80%;
                padding: 5px;
                border: 2px solid;
                border-radius: 5px;
            }

            select:hover {
                border-color: $primaryColor;
                cursor: pointer;
            }

            button {
                border: 2px solid;
                transition: all .5s
            }

            button:hover {
                background-color: $primaryColor;
                color: #fff;
                border-color: #939393;
            }
        }
    }
}

/* Animation */
.fade {
    animation: fade 2s;
}

@keyframes fade {
    0% { opacity: 0;}
    100% {opacity: 1;}
}

.swipe-fade-to-right {
    animation: swipe-fade-to-right 2s;
}

@keyframes swipe-fade-to-right {
    0% {
        left: -225px;
        opacity: 0;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        left: 0;
        opacity: 1;
    }
}

.swipe-to-right {
    animation: swipe-to-right 2s;
}

@keyframes swipe-to-right {
    0% {
        left: -225px;
    }
    100% {
        left: 0;
    }
}

.swipe-to-left {
    animation: swipe-to-left 2s;
}

@keyframes swipe-to-left {
    0% {
        right: -225px;
    }
    100% {
        right: 0;
    }
}
</style>