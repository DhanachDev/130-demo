<template>
    <div class="_mom">
        <div class="_search">
            <input type="text" name="search" id="search" placeholder="กรอกชื่อหรือสำนักงานเพื่อค้นหา" @keyup="setCards()" v-model="keyword">
        </div>
        
        <div class="cards">
            <template  v-for="card in cardsShow">
                <NuxtLink to="/share">
                    <div class="s-card" :style="{ backgroundImage: 'url(' + (cardPath + card.cardName) + ')'}">
                        <div class="input-wp">
                            <div class="picture" :style="{ backgroundImage: 'url(' + card.picture + ');'}">
                            </div>
                            <div class="msg-show" v-html="replaceMsg(card.message)">
                            </div>
                            <div class="name-org">
                                <div class="name-show">{{card.name}}</div>
                                <div class="org-show" v-if="card.organization">{{card.organization}}</div>
                            </div>                        
                        </div>
                    </div>                
                </NuxtLink>
            </template> 
        </div>
        <br>
        <a href="/" style="text-align: center;">
            <button>กลับหน้าหลัก</button>
        </a>
        <br>
        <client-only>
            <b-pagination
                :total="total"
                v-model="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                :page-input="hasInput"
                :page-input-position="inputPosition"
                :debounce-page-input="inputDebounce">
            </b-pagination>        
        </client-only>

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
                            background: url(/assets/img/bottom-seamless.svg) no-repeat bottom;
                            background-size: cover;
                            background-attachment: fixed;
                            background-color: #f1f1f1;
                        }
                    `
                }
            ]
        }
    },
    data() {
        return {
            // default 100 records
            cards: [
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'one', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'two', organization: 'สลธ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'three', organization: 'คลัง.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'four', organization: 'สำนักงานอัยการจังหวัดอุบลราชธานี.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'seven', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'eight', organization: 'สวบ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'nine', organization: 'สวบ.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'ten', organization: 'สวบ.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'one', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'two', organization: 'สลธ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'three', organization: 'คลัง.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'four', organization: 'สำนักงานอัยการจังหวัดอุบลราชธานี.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'seven', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'eight', organization: 'สวบ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'nine', organization: 'สวบ.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'ten', organization: 'สวบ.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'one', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'two', organization: 'สลธ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'three', organization: 'คลัง.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'four', organization: 'สำนักงานอัยการจังหวัดอุบลราชธานี.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
                { cardName: 'card7.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'seven', organization: 'สวบ.'},
                { cardName: 'card8.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'eight', organization: 'สวบ.'},
                { cardName: 'card9.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'nine', organization: 'สวบ.'},
                { cardName: 'card10.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'ten', organization: 'สวบ.'},
                { cardName: 'card11.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'five', organization: 'สวบ.'},
                { cardName: 'card6.jpg' , picture: 'https://www3.ago.go.th/library/demo/img/img_avatar.png', message: 'ขอแสดงความยินดีด้วยอย่างยิ่ง\nในโอกาสครบรอบ 13 ปี องค์รอัยการ\nขอให้อยู่คู่ประชาชนสืบไป', name: 'six', organization: 'สวบ.'},
            ],
            keyword: null,
            cardsShow: [],
            cardPath: '/assets/img/',
            total: 1500,
            current: 10,
            perPage: 100,
            rangeBefore: 3,
            rangeAfter: 1,
            order: 'is-centered',
            size: '',
            isSimple: false,
            isRounded: true,
            hasInput: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            inputPosition: '',
            inputDebounce: ''
        }
    }, 
    mounted() {
        this.setCards();
    },
    methods: {
        replaceMsg(txt) {
            try {
                return txt.replace(/\n\r?/g, '<br />');
            } catch(err) {
                return txt;
            }
        },
        setCards() {
            let cardsMock = JSON.parse(JSON.stringify(this.cards));
            let cards = cardsMock;
            if (this.keyword) {

                // call api search
                cards = cardsMock.filter(el => {
                    return el.name.includes(this.keyword) || el.organization.includes(this.keyword);
                });
            }

            this.cardsShow = cards;
        }
        
    }
}
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  background: #ffe7d3;
  color: #523435;
  padding: 20px;
    border-radius: 60px;
    font-size: 1.2rem;
    border: none;
    width: 100%;
    max-width: 350px;
}

::v-deep .pagination-link.is-current {
    background-color: #e67c35;
    border-color: #e67c35;
    color: #fff;
}
._mom {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    flex-direction: column;

    input[type="text"] {
        width: 100%;
        font-size: 20px;
        padding: 10px 20px;
        border: 1px solid #c5c5c5;
        border-radius: 35px;
        max-width: 650px;
    }
}
._search {
    text-align: center;
    margin-bottom: 35px;
}
.cards {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: minmax(auto,auto);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    max-width: 100%;
    margin: 0 auto;
    

    .box {
        width: 320px;
        height: 453px;
        background-color: paleturquoise;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        cursor: pointer;
        background-size: cover;
    }
}

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
    cursor: pointer;
    color: black;
    .input-wp {
        width: 340px;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute;
        bottom: 25%;
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

.msg-show {
    text-align: center;
    width: 75%;
    word-break: break-all;
    max-height: 50px;
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
    width: 75%;
    word-break: break-all;
    max-height: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    line-height: 14px;
}

.picture {
    width: 65px;
    height: 65px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-bottom: 5px;
    background-image: url(../assets/img/img_avatar.png);
    margin-bottom: 8px;
}


@media (max-width: 650px) {
    input[type="text"] {
        max-width: 340px!important;
        width: auto!important;
    }
}

@media (max-width: 1471px) {
    .cards {
        grid-template-columns: repeat(3,1fr);
    }
}

@media (max-width: 1136px) {
    .cards {
        grid-template-columns: repeat(2,1fr);
    }
}

@media (max-width: 766px) {
    .cards {
        grid-template-columns: repeat(1,1fr);
    }
}
</style>