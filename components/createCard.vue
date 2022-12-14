<template>
    <div class="_wrapper">
        <section class="_1">
            <h2>เลือกรูปแบบการ์ดที่ชอบ</h2>
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
                <div class="s-card" :style="{ backgroundImage: 'url(' + cardUrl + ')'}">

                </div>
            </div>
        </section>

        <section class="_3">
            <div class="btn-wp">
                <a href="#">
                    <button>ส่งการ์ด</button>
                </a>
                <a href="/">
                <!-- <a href="https://www3.ago.go.th/library/demo"> -->
                    <button>กลับหน้าหลัก</button>
                </a>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    data() {
        return {
            isActive: 0,   
            cardUrl: "/_nuxt/img/card1.jpg", 
        }

    },
    methods: {
        selectedCard(index) {
            this.isActive = index;
            let url = '/_nuxt/img/';
            switch (index) {
                case 0: url += 'card1.jpg';
                        break;
                case 1: url += 'card2.jpg';
                        break;
                case 2: url += 'card3.jpg';
                        break;
                case 3: url += 'card4.jpg';
                        break;
                case 4: url += 'card5.jpg';
                        break;
                case 5: url += 'card6.jpg';
                        break;
            }

            this.cardUrl = url;
        },
    }
}

</script>
<style lang="scss" scoped>
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
    background-image: url(@/assets/img/card1.jpg);
}
.box:nth-child(2) {
    background-image: url(../assets/img/card2.jpg);
}
.box:nth-child(3) {
    background-image: url(../assets/img/card3.jpg);
}
.box:nth-child(4) {
    background-image: url(../assets/img/card4.jpg);
}
.box:nth-child(5) {
    background-image: url(../assets/img/card5.jpg);
}
.box:nth-child(6) {
    background-image: url(../assets/img/card6.jpg);
}



section {
    padding: 10px 0;
}
._2 {
    margin-top: 10px;
    .s-card-wp {
        display: flex;
        justify-content: center;
        .s-card {
            width: 340px;
            height: 481px;
            background-size: cover;
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
            background: white;
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

</style>