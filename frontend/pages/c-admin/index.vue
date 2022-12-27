<template>
    <div class="a-wp">
        <template v-for="data in arr" :id="data.id">
            <div class="box" :class="data.status" v-if="checkKey">
                <div class="_1">id:{{ data.id }} - {{ data.name }}</div>
                <div class="_2">
                    <div class="-l" v-if="data.picture">
                        <div class="img">
                            <img src="../../assets/img/img_avatar.png" alt="" width="100">
                        </div>
                        <p :id="'img-' + data.id">
                            <input type="radio" :id="'img-check1-' + data.id" :name="'img-group-' + data.id" :checked="data.statusImg == 'approved'">
                            <label :for="'img-check1-' + data.id">approve</label>
                            <input type="radio" :id="'img-check2-' + data.id" :name="'img-group-' + data.id" :checked="data.statusImg == 'rejected'" >
                            <label :for="'img-check2-' + data.id">reject</label>
                        </p>
                    </div>
                    <div class="-r">
                        <div class="msg">
                            {{ data.message }}
                        </div>
                        <p :id="'msg-' + data.id">
                            <input type="radio" :id="'msg-check1-' + data.id" :name="'msg-group-' + data.id" :checked="data.statusMsg == 'approved'">
                            <label :for="'msg-check1-' + data.id">approve</label>
                            <input type="radio" :id="'msg-check2-' + data.id" :name="'msg-group-' + data.id" :checked="data.statusMsg== 'rejected'">
                            <label :for="'msg-check2-' + data.id">reject</label>
                        </p>
                    </div>
                </div>
                <div class="_3">
                    <button @click="save(data.id)">save</button>
                </div>
            </div>
        </template>

    </div>
</template>


<script>

export default {
    data() {
        return {
            checkKey: false,
            arr: [
                { 
                    id: 0,
                    name: 'name1',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์อยากให้สำนักงานอัยการคงอยู่นิรันดร์อยากให้สำนักงานอัยการคงอยู่นิรันดร์อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: null, // base64
                    statusMsg: undefined,
                    statusImg: undefined,
                    status: 'review',
                },
                { 
                    id: 1,
                    name: 'name2',
                    message: 'xlksjd;fkjpiasd;fkj',
                    picture: null,
                    statusMsg: 'approved',
                    statusImg: undefined,
                    status: 'checked',
                },
                { 
                    id: 2,
                    name: 'name3',
                    message: 'สวัสดี',
                    picture: 'https://www3.ago.go.th/library/demo/_nuxt/img/img_avatar.png',
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 3,
                    name: 'name4',
                    message: 'ทดสอบ',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 4,
                    name: 'name5',
                    message: 'หกดหกดหกด',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 5,
                    name: 'name6',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 6,
                    name: 'name7',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: 'https://www3.ago.go.th/library/demo/_nuxt/img/img_avatar.png',
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 7,
                    name: 'name8',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 8,
                    name: 'name9',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                },
                { 
                    id: 9,
                    name: 'name10',
                    message: 'อยากให้สำนักงานอัยการคงอยู่นิรันดร์',
                    picture: null,
                    statusMsg: false,
                    statusImg: false,
                    status: 'review',
                }
            ]

        }
    },
    mounted() {
        let key = new URLSearchParams(window.location.search).get('key');
        if (!key) {
            location.href = '/library/demo/';
            console.log("no key")
        } else {
            //call api check
            this.checkKey = true;
        }

    },
    methods: {
        save(id) {
            
            console.log("-->", document.getElementById('img-check1-' + 0).checked);
            console.log("id = ", id);
        },

    }
}
</script>

<style lang="scss" scoped>
.a-wp {
    display: inline-block;

    .box {
        float: left;
        width: 20%;
        border: 1px dashed gray;
        background-color: #f9f7ed;
        border-radius: 10px;
        margin: 5px;
        padding: 15px;
    }

    .checked {
        background-color: rgb(213 237 185);
    }

    .rejected {
        background-color: rgb(243 178 178);
    }

    .review {
        background-color: rgb(255 239 169);
    }
}
</style>