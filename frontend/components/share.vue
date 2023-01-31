<template>
    <div class="_wrapper">
        <div class="center">
            <section class="_2">
                <div class="s-card-wp" v-if="readyToShare">
                    <div v-if="loadedImage">
                        <div class="s-card" :style="{ backgroundImage: 'url(' + cardUrl + ')'}" id="sCard">
                                <div class="input-wp">
                                    <div class="picture" id="avatar"></div>
                                    <div class="msg-show" id="msgShow"></div>
                                    <div class="name-org">
                                        <div class="name-show" id="nameShow">{{name}}</div>
                                        <div class="org-show" id="orgShow">{{organization}}</div>
                                    </div>                        
                                </div>
                        </div>
                    </div>

                    <div id="imgCard"></div>
                </div>
                <div class="s-card-wp" v-else style="text-align: center;">
                    <img src="~/assets/img/examination.png" alt="" width="150">
                    <h2>การ์ดของคุณจะแสดงเมื่อผ่านการตรวจสอบเรียบร้อยแล้ว</h2>
                </div>
            </section>
            <section class="_3">
                <div class="btn-wp">   
                    <template v-if="readyToShare">
                        <a href="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.oag130th-anniversary-ecards.ago.go.th&display=popup&ref=plugin&src=share_button" target="popup">
                            <button class="fb-share">แชร์ไปยัง Facebook</button>
                        </a>
                        <a href="javascript:void(0)" id="download">
                            <button @click="download()">ดาวน์โหลดรูปภาพ</button>
                        </a>                    
                    </template>

                    <NuxtLink to="/create-card">
                        <button>สร้างการ์ดใหม่</button>
                    </NuxtLink>
                    <NuxtLink to="/cards">
                        <button>ดูการ์ดทั้งหมด</button>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <button>กลับหน้าหลัก</button>
                    </NuxtLink>

                    
                    <!-- <button @click="saveImage()">SAVE IMAGE</button> -->
                </div>
                <div id="area"></div>
            </section>

           
        </div>        
        <div class="loading" id="loading">
            <br>
            <div class="l-b">
                <div>
                    <img src="~/assets/img/rocket.gif" alt="" width="150">
                </div>
                <h2>กรุณารอสักครู่...</h2>
            </div>
        </div>

        <div class="f-bt-l">
            <img src="~/assets/img/flower.png" alt="">
        </div>

        <div class="f-bt-r">
            <img src="~/assets/img/flower.png" alt="">
        </div>
    </div>

</template>
<script>
import html2canvas from 'html2canvas';

export default {
    head() {
        return {
            title: "130 ปีองค์กรอัยการ" ,
            meta: [
            // facebook
            { property: "og:title", content: "130 ปีองค์กรอัยการ"},
            { property: "og:type", content: "article" },
            { property: "og:url", content: "https://www.oag130th-anniversary-ecards.ago.go.th/" },
            { property: "og:description", content: "ร่วมแสดงความยินดีและอวยพรเนื่องในโอกาสครบรอบ 130 ปี องค์กรอัยการ"},
            { property: "og:keywords", content: "130 ปี อัยการ, 130 ปี องค์กรอัยการ, องค์กรอัยการ, อัยการ, ครบรอบ 130 ปี, ครบรอบองค์กรอัยการ, เมษายน, กฎหมาย, สำนักงานอัยการสูงสุด, อัยการสูงสุด"},
            { property: "og:image", content: "https://www.oag130th-anniversary-ecards.ago.go.th/assets/thumbnail.jpg"},
            { property: "og:image:type", content: "image/jpeg" },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
            //web
            { name: "title", content: "130 ปีองค์กรอัยการ" },
            { name: "type", content: "article" },
            { name: "url", content: "https://www.oag130th-anniversary-ecards.ago.go.th/" },
            { hid: 'description', name: "description", content: "ร่วมแสดงความยินดีและอวยพรเนื่องในโอกาสครบรอบ 130 ปี องค์กรอัยการ" },
            { hid: 'keywords', name: "keywords", content: "130 ปี อัยการ, 130 ปี องค์กรอัยการ, องค์กรอัยการ, อัยการ, ครบรอบ 130 ปี, ครบรอบองค์กรอัยการ, เมษายน, กฎหมาย, สำนักงานอัยการสูงสุด, อัยการสูงสุด" },
            { name: "image", content: "https://oag130th-anniversary-ecards.ago.go.th/assets/thumbnail.jpg"},
            { name: "image:type", content: "image/jpeg" },
              { name: "image:width", content: "1200" },
              { name: "image:height", content: "630" }
            ],
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
            cardUrl: require("~/assets/img/card7.jpg"), 
            loadedImage: true,
            message: '',
            name: '',
            organization: '',
            readyToShare: true,
            avatar: null,
        }
    },
    mounted() {

        document.getElementById("loading").style.display = 'flex';

        let _id;
        let id = new URLSearchParams(window.location.search).get('id');

        if (id) _id = id;
        else {
            location.href = "/";
        }

        this.$axios.get('/' + _id).then(res =>{ 
            this.cardUrl = require("/assets/img/" + res.data.cardFileName);

            if (res.data.ready || ( res.data.statusMsg == 'approved' && res.data.statusImg == 'approved')) {

                let self = this;

                this.message = res.data.message;
                this.avatar = process.env.STATIC_URL + res.data.avatar

                if (res.data.avatar) {
                    const container = document.getElementById('avatar');
                    // Set the background-image property of the container
                    
                    console.log("container = ", container)
                   this.toDataUrl(this.avatar, function(myBase64) {
                        console.log(myBase64)
                        container.style.backgroundImage = `url(${myBase64})`; 
                    });
                } else {
                    document.getElementById("avatar").style.display = 'none';
                }

                let msgShow = document.getElementById("msgShow");
                msgShow.innerHTML = this.message.replace(/\n\r?/g, '<br />');

                this.name = res.data.name;
                this.organization = res.data.organization;
                    
                // Get the div element
                const divElement = document.getElementById('sCard');

                // Set the font-family style of the div element
                divElement.style.fontFamily = 'Prompt';


                const toImgArea = document.getElementById('sCard');

                // To avoid the image will be cut by scroll, we need to scroll top before html2canvas.
                window.pageYOffset = 0;
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
                
                
                // transform to canvas

                setTimeout(() => {
                    html2canvas(toImgArea, {
                        allowTaint: true,
                        taintTest: false,
                        type: "view",
                    }).then(function (canvas) {
                        const sreenshot = document.getElementById('imgCard');
                        
                        // setting the canvas width  
                        canvas.style.width = "350px";
                        canvas.style.height = "481px";
                        canvas.id = "canvasImg";

                        // append the canvas in the place that you want to show this image.  
                        sreenshot.appendChild(canvas);


                        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                        // downloadIcon.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                        // downloadIcon.download = 'card.jpg';

                        self.loadedImage = false;
                        document.getElementById("loading").style.display = 'none';
                    });
                }, 1000);

                
            } else {
                this.readyToShare = false;
                document.getElementById("loading").style.display = 'none';
            }  

        }).catch(error => {
            console.log(error)
            alert("เกิดข้อผิดพลาด ลองสร้างการ์ดใหม่อีกครั้ง")
        })  
    },
    beforeMount() {
        if(this.$route.query.fbclid) {
            location.href = '/';
        }
    },
    methods: {
        download() {
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', this.name + '.png');
            let canvas = document.getElementById('canvasImg');
            let dataURL = canvas.toDataURL('image/png');
            let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
            // downloadLink.setAttribute('href', url);
            // downloadLink.click();
            window.location.href = url
        },
        toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }
    }
  
};

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
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    z-index: 2;
}
.picture {
    width: 160px;
    height: 160px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-bottom: 5px;
    background-image: url(../assets/img/img_avatar.png);
    margin-bottom: 15px;
}

.s-card {
    font-family: 'Prompt', Fallback, sans-serif;
    
}

#imgCard::v-deep {
    img {
        width: 340px;
        height: 481px;
    }
    margin-bottom: 15px;
}
._2 {
    margin-top: 10px;
    .s-card-wp {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .s-card {
            font-family: 'Prompt', Fallback, sans-serif;
            width: 763px;
            height: 1080px;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            .input-wp {
                width: 763px;
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

.name-show, .org-show {
    font-size: 26px;
    line-height: 24px;
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

        .fb-share {
            background-color: #0676e8;
            color: white;
        }


        .twt-share {
            background-color: #1da1f2;
            color: white;
        }
    }
    
}

.msg-show {
    text-align: center;
    width: 77%;
    word-break: break-all;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    font-size: 28px;
    line-height: 2rem;
    max-height: 150px;
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

@media (max-width: 750px) {
  .f-bt-r {
    opacity: .2;
  }

  .f-bt-l {
    opacity: .2;
  }

  .center {
    -moz-transform: translateX(-50%) translateY(-45%);
    -webkit-transform: translateX(-50%) translateY(-45%);
    transform: translateX(-50%) translateY(-45%);
  }
}

</style>