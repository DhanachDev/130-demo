<template>
    <div class="_mom">
        <div class="_search">
            <input type="text" name="search" id="search" placeholder="กรอกชื่อหรือสำนักงานเพื่อค้นหา" @keyup="setCards(1)" v-model="keyword">
        </div>
        
        <div class="cards">
            <template  v-for="card in cardsShow">
                <NuxtLink :to="'/share?id=' + card._id">
                    <div class="s-card" :style="{ backgroundImage: 'url(' + cardUrl + card.cardFileName +')'}">
                        <div class="input-wp">
                            <div class="picture" :style="{ backgroundImage: 'url(' + staticUrl + card.avatar +')'}" v-if="card.statusImg == 'approved'">
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
        <a href="/" style="    text-align: center; width: 300px; display: flex; margin: 0 auto;">
            <button style="background-color: #e67c35; color: white;">กลับหน้าหลัก</button>
        </a>
        <br>
        <client-only>
            <b-pagination 
                @change="changePage($event)"
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
                            background-color: #f1f1f1;
                        }
                    `
                }
            ],
            title: "ค้นหา | 130 ปี องค์กรอัยการ"
        }
    },
    data() {
        return {
            // default 100 records
            keyword: '',
            cardsShow: [],
            cardPath: require('~/assets/img/card7.jpg'),
            total: 20,
            current: 1,
            perPage: 20,
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
            inputDebounce: '',
            staticUrl: process.env.STATIC_URL,
            cardUrl: process.env.CARD_URL
        }
    }, 
    mounted() {
        this.setCards(this.current);
    },
    methods: {
        replaceMsg(txt) {
            try {
                return txt.replace(/\n\r?/g, '<br />');
            } catch(err) {
                return txt;
            }
        },
        setCards(current) {

            this.$axios.get('/show/cards/' + current + '/' + this.perPage + '?q=' + this.keyword).then(res => {
                let cardsMock = JSON.parse(JSON.stringify(res.data.cards));

                this.total = Number(res.data.total);
                this.perPage = Number(res.data.perPage);
                this.current = Number(res.data.current);

                let cards = cardsMock;
                this.cardsShow = cards;
            })
        },
        changePage(page) {

            var VueScrollTo = require('vue-scrollto');
            VueScrollTo.scrollTo('#search', 500, { easing: 'linear', offset: -240 } );

            setTimeout(() => {
                this.setCards(page);                
            }, 500);
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
    width: 75%;
    word-break: break-all;
    max-height: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 10px;
    overflow: hidden;
    line-height: 14px;
    font-size: 14px;
}

.picture {
    width: 65px;
    height: 65px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-bottom: 5px;
    background-image: url(~/assets/img/img_avatar.png);
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