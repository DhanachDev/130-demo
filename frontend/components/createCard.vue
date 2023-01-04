<template>
    <div class="_wrapper">
        <div class="loading" id="loading">
            <br>
            <div class="l-b">
                <span>กำลังบันทึกข้อมูลการ์ด...</span>
            </div>
        </div>
        <section class="_1">
            <h2>เลือกรูปแบบการ์ด</h2>
            <div class="cards-wp">
                <div class="cards">
                    <div class="box" :class="{ actived: isActive == 0 }" @click="selectedCard(0)"></div>
                    <div class="box" :class="{ actived: isActive == 1 }" @click="selectedCard(1)"></div>
                    <div class="box" :class="{ actived: isActive == 2 }" @click="selectedCard(2)"></div>
                    <div class="box" :class="{ actived: isActive == 3 }" @click="selectedCard(3)"></div>
                    <div class="box" :class="{ actived: isActive == 4 }" @click="selectedCard(4)"></div>
                    <div class="box" :class="{ actived: isActive == 5 }" @click="selectedCard(5)"></div>
                </div>
            </div>
        </section>

        <section class="_2">
            <div class="s-card-wp">
                <div class="s-card" :style="{ backgroundImage: 'url(' + cardUrl + ')'}" id="sCard">
                    <div class="input-wp">
                        <div class="picture" id="picture">
                        </div>
                        <div class="msg-show" id="msgShow">
                        </div>
                        <div class="name-org">
                            <div class="name-show" id="nameShow"></div>
                            <div class="org-show" id="orgShow"></div>
                        </div>                        
                    </div>
                </div>
                <div class="card-info">
                    <div style="margin-bottom:10px">
                    <p>
                        <input type="radio" id="test1" name="radio-group" value="0" v-model="radioChecked" @click="radio(0)">
                        <label for="test1">เลือกคำอวยพร</label>
                        <input type="radio" id="test2" name="radio-group" value="1" v-model="radioChecked" @click="radio(1)">
                        <label for="test2">กรอกเอง</label>
                    </p>
                    <p class="noti" v-show="radioChecked == 1">
                        การ์ดของคุณจะแสดงเมื่อผ่านการตรวจสอบเรียบร้อยแล้ว
                    </p>                        
                    </div>

                    <div>
                        <select id="messages" name="messages" class="browser-default" v-show="radioChecked == 0" v-model="selectedOption" @change="handleSelect()">
                            <option v-for="option in options" :value="option" >{{ option }}</option>
                        </select>
                    </div>

                    <div class="msg">
                        <textarea name="" id="msg" rows="3" @keyup="countMsg()" v-model="message" :maxLength="maxLength" placeholder="คำอวยพร" :disabled="radioChecked == 0"> </textarea>
                        <span class="counter" v-show="radioChecked == 1">{{amount}}/110</span>      
                    </div>
                    <div class="contact">
                        <input type="text" placeholder="ชื่อ - นามสกุล" id="name" v-model="name" @keyup="setName()">
                        <input type="text" placeholder="สำนักงาน" id="org" v-model="organization" @keyup="setOrg()">
                        <!-- <input type="text" placeholder="เบอร์ติดต่อกลับ (กรณีต้องการลุ้นรางวัล)" id="tel" v-model="tel"> -->

                        <div class="upload-img">
                            <label for="files" class="btn">อัพโหลดรูปภาพ<span v-if="hasImage">แล้ว >> </span></label>
                            <input type="file" id="image-file" accept=".jpg, .jpeg, .png" @change="fileUploaded()" v-show="!hasImage">    
                            <span v-show="hasImage" style="color: red; cursor: pointer; text-decoration: underline;" @click="removeImage()">ลบรูปภาพ</span>                        
                        </div>

                    </div>  
                </div>
            </div>
        </section>

        <section class="_3">
            <div class="btn-wp">
                <a href="javascript:void(0);">
                    <button @click="send()">ส่งการ์ด</button>
                </a>
                <NuxtLink to="/">
                    <button>กลับหน้าหลัก</button>
                </NuxtLink>
                <!-- <button @click="saveImage()">SAVE IMAGE</button> -->
            </div>
            <div id="area"></div>
        </section>
        <!-- <div class="add-msg-wp">
                <input type="text">
                <textarea name="message" id="" cols="30" rows="10"></textarea>
        </div> -->
        <div class="f-bt-l">
            <img src="~/assets/img/flower.png" alt="">
        </div>

        <div class="f-bt-r">
            <img src="~/assets/img/flower.png" alt="">
        </div>
    </div>
</template>

<script>

export default {
    head() {
        return {
            style: [
                {
                    cssText: `
                        body {
                            background-color: #f1f1f1;
                        }
                    `
                }
            ]
        }
    },
    data() {
        return {
            isActive: 0,   
            // cardUrl: "/img/card1.jpg", 
            cardUrl: "/library/test/_nuxt/img/card7.jpg", 
            name: null,
            organization: null,
            tel: null,
            message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสวันครบรอบ 130 ปี องค์กรอัยการ\nขอให้เป็นองค์กรหลักด้านกฎหมาย\nของประเทศต่อไปอย่างยั่งยืน',
            amount: 0,
            radioChecked: 0,
            selectedOption: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสวันครบรอบ 130 ปี องค์กรอัยการ\nขอให้เป็นองค์กรหลักด้านกฎหมาย\nของประเทศต่อไปอย่างยั่งยืน',
            options: [
                'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสวันครบรอบ 130 ปี องค์กรอัยการ\nขอให้เป็นองค์กรหลักด้านกฎหมาย\nของประเทศต่อไปอย่างยั่งยืน',
                'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 130 ปี องค์กรอัยการ\nขอให้อยู่คู่ประชาชนสืบไป',
                'ขอแสดงความยินดี\nขอให้สำนักงานอัยการสูงสุด\nเป็นที่พึ่งทางกฎหมายให้กับประชาชนสืบไป',
                'เนื่องในโอกาสครบรอบ 130 ปี องค์กรอัยการ\nขอให้หน่วยงานมีความเจริญก้าวหน้า\nเติบโตขึ้นอย่างยั่งยืน\nและเป็นกำลังสำคัญของประเทศต่อไป'

            ],
            maxLength: 110,
            hasImage: false,
            cardFileName: 'card7.jpg',
        }
    },
    mounted() {
        this.setMsgShow();
        let loading = document.getElementById('loading');
        loading.style.display = 'none';
        localStorage.removeItem("dataURL");
        localStorage.removeItem("cards");
        console.log("env = ",process.env.HOME_PATH);
    },
    methods: {
        fileUploaded() {
            const inputElement = document.getElementById('image-file');
                // Get the selected file
                const file = inputElement.files[0];

                // Check if the file is a JPEG, JPEG, or PNG
                if (file.type === 'image/jpeg' || file.type === 'image/png') {

                    // Create a FileReader object
                    const reader = new FileReader();

                    // Add an event listener for when the file has been read
                    reader.addEventListener('load', function() {
                        // Get the data URL of the file
                        const dataURL = reader.result;

                        // Get the container element
                        const container = document.getElementById('picture');

                        // Set the background-image property of the container
                        container.style.backgroundImage = `url(${dataURL})`;
                        localStorage.setItem("dataURL", JSON.stringify(dataURL));
                        
                    });

                    // Read the file as a data URL
                    reader.readAsDataURL(file);
                    this.hasImage = true;
                }
        },
        removeImage() {
            const inputElement = document.getElementById('image-file');
            inputElement.value = '';
            this.hasImage = false;
            const container = document.getElementById('picture');
            container.style.backgroundImage = 'url(/library/demo/img/img_avatar.png)';
        },
        setMsgShow() {
            let msgShow = document.getElementById("msgShow");
            msgShow.innerHTML = this.message.replace(/\n\r?/g, '<br />');
        },
        handleSelect() {
            
            if (this.radioChecked == 1) {
                this.message = "";
                this.amount = 0;
                let msgShow = document.getElementById("msgShow");
                msgShow.innerHTML = "";
            } else {
                this.message = this.selectedOption;
                this.setMsgShow();
            }
        },
        radio(index) {
            if (this.radioChecked != index) {
                this.radioChecked = index;
                if (this.radioChecked == 1) {
                    this.message = "";
                } else {
                    this.message = this.selectedOption;
                }
                this.setMsgShow();
            }
           
        },  
        setName() {
            let name = document.getElementById("name");
            let nameShow = document.getElementById("nameShow");
            nameShow.innerHTML = name.value;
        },
        setOrg() {
            let org = document.getElementById("org");
            let orgShow = document.getElementById("orgShow");
            orgShow.innerHTML = org.value;
        },
        countMsg() {
            let msgShow = document.getElementById("msgShow");
            let msg = this.message;
            
            if (msg.length <= this.maxLength) {
                this.amount = msg.length;
                msgShow.innerHTML = msg.replace(/\n\r?/g, '<br />');
            }
        },
        selectedCard(index) {
            this.isActive = index;
            // let url = '/img/';
            let url =  process.env.ASSETS_PATH_IMG;
            switch (index) {
                case 0: this.cardFileName = 'card7.jpg';
                        break;
                case 1: this.cardFileName = 'card12.jpg';
                        break;
                case 2: this.cardFileName = 'card13.jpg';
                        break;
                case 3: this.cardFileName = 'card8.jpg';
                        break;
                case 4: this.cardFileName = 'card14.jpg';
                        break;
                case 5: this.cardFileName = 'card15.jpg';
                        break;
            }

            this.cardUrl = url + this.cardFileName;
        },
        send() {
            let loading = document.getElementById('loading');
            loading.style.display = 'flex';

            let dataUrl = JSON.parse(localStorage.getItem('dataUrl'));

            let obj = {
                message: this.message,
                name: this.name,
                organization: this.organization,
                tel: this.tel,
                dataUrl: dataUrl,
                cardFileName: this.cardFileName,
                ready: this.radioChecked == 0 && !this.hasImage
            }

            // console.log(obj);

            localStorage.setItem("cards", JSON.stringify(obj));

            setTimeout(() => {
                let loading = document.getElementById('loading');
                loading.style.display = 'none';
                location.href = "/library/test/share"
            }, 2000);
            
        }
    }
}

</script>
<style lang="scss" scoped>

@font-face {
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB2KdNodVkI.woff2) format('woff2');
  unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
}

.l-b {
    background-color: white;
    padding: 20px 35px;
    border-radius: 15px;
}
.loading {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #02020280;
    display: none;
    flex-direction: column;
}
.upload-img {
    margin-top: 10px;
    padding: 10px;
    background-color: rgba(255,255,255,.9);
    border-radius: 10px;
}
.picture {
    width: 85px;
    height: 85px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-bottom: 5px;
    background-image: url(~/assets/img/img_avatar.png);
    margin-bottom: 8px;
}
.s-card {
    font-family: 'Prompt', Fallback, sans-serif;
    
}
select {
    width: 341px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #ced4da;
    -webkit-border: 1px solid #ced4da;
    -webkit-background-color: #fff;
    -webkit-padding: 5px;
    -webkit-width: 341px;
    height: 40px;
}
.noti {
    color: red;
    font-size: 14px;
}

[type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #ee792c;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

.add-msg-wp {
    background-color: rgba(255,255,255,.85);
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: -50%;
    border-radius: 35px 35px 0 0;
    transition: all 400ms;
    left: 0;
}

.msg {
    position: relative;
    
    .counter {
        position: absolute;
        bottom: 13px;
        font-size: 12px;
        right: 3px;
        color: gray;
        z-index: 999;
    }
}
.msg-show {
    text-align: center;
    width: 77%;
    word-break: break-all;
    max-height: 90px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 18px;
    font-size: 14px;
}

.name-org {
    text-align: center;
    width: 77%;
    word-break: break-all;
    max-height: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    line-height: 14px;
}
.box {
    width: 100%;
    height: 185px;
    background-color: paleturquoise;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    background-size: cover;
}

.box:nth-child(1) {
    background-image: url(~/assets/img/card7.jpg);
}
.box:nth-child(2) {
    background-image: url(~/assets/img/card12.jpg);
}
.box:nth-child(3) {
    background-image: url(~/assets/img/card13.jpg);
}
.box:nth-child(4) {
    background-image: url(~/assets/img/card8.jpg);
}
.box:nth-child(5) {
    background-image: url(~/assets/img/card14.jpg);
}
.box:nth-child(6) {
    background-image: url(~/assets/img/card15.jpg);
}



section {
    padding: 10px 0;
}
._2 {
    margin-top: 10px;
    .s-card-wp {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .s-card {
            width: 340px;
            height: 481px;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            margin-bottom: 15px;
            .input-wp {
                width: 340px;
                display: flex;
                align-items: center;
                flex-direction: column;
                position: absolute;
                bottom: 18%;
            }
            .add-msg-btn {
                padding: 20px;
                background-color: rgba(255,255,255,.7);
                border: 1px solid gray;
                border-radius: 50px;
                cursor: pointer;
            }
        }

        .card-info {
            width: 340px;

            input[type="text"], textarea, #tel {
                width: 320px;
                padding: 10px;
                font-size: 16px;
                margin: 0;
                resize: none;
                margin: 5px 0;
                background-color: #fff;
                border: 1px solid #ced4da;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                border-radius: 10px;
            }
        }
    }
}

.actived {
    border: 5px solid #ff7b0e;
}

._wrapper {
    max-width: 550px;
    margin: 0 auto;
}

h2 {
    text-align: center;
}
.cards-wp {
    margin: 0 auto;
    position: relative;
    width: auto;

    .cards {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-auto-rows: minmax(auto,auto);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        max-width: 100%;
        margin: 0 auto;
    }
}
.name-show, .org-show {
    font-size: 12px;
}
.btn-wp {
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        margin-bottom: 15px;
        button {
            width: 340px;
            padding: 10px;
            border-radius: 60px;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            background: #a76764;
            color: white;
        }
    }
    
}
@media (min-width: 401px) {
    .cards {
        grid-template-columns: repeat(3,1fr) !important;
    }
}

@media (max-width: 400px) {
    .cards {
        max-width: 340px !important;
    }
}

@media (max-width: 750px) {
  .f-bt-r {
    opacity: .2;
  }

  .f-bt-l {
    opacity: .2;
  }
}

</style>