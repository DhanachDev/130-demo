<template>
    <div class="a-wp">
        <div class="_filter"  v-if="checkKey">
                <select name="filter" id="" v-model="selectedOption" @change="handleSelect()">
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        <template v-for="data in arr" :id="data._id">
            <div class="box" :class="getStatus(data.statusMsg, data.statusImg, data.avatar)"  v-if="checkKey">
                <div class="_1">id:{{ data._id }} <br> <b>{{ data.name }}</b></div>
                <div class="_2">
                    <div class="-l" v-if="data.avatar">
                        <div class="img">
                            <img :src=" staticUrl + data.avatar" alt="" width="100">
                        </div>
                        <p :id="'img-' + data._id">
                            <input type="radio" :id="'img-check1-' + data._id" :name="'img-group-' + data._id" :checked="data.statusImg == 'approved'">
                            <label :for="'img-check1-' + data._id">Approve</label>
                            <input type="radio" :id="'img-check2-' + data._id" :name="'img-group-' + data._id" :checked="data.statusImg == 'rejected'" >
                            <label :for="'img-check2-' + data._id">Reject</label>
                        </p>
                    </div>
                    <div class="-r">
                        <div class="msg">
                            <br> {{ data.message }}
                        </div>
                        <p :id="'msg-' + data._id">
                            <input type="radio" :id="'msg-check1-' + data._id" :name="'msg-group-' + data._id" :checked="data.statusMsg == 'approved'">
                            <label :for="'msg-check1-' + data._id">Approve</label>
                            <input type="radio" :id="'msg-check2-' + data._id" :name="'msg-group-' + data._id" :checked="data.statusMsg == 'rejected'">
                            <label :for="'msg-check2-' + data._id">Reject</label>
                        </p>
                    </div>
                </div>
                <div class="_3">
                    <button @click="save(data._id, data.avatar)">save</button>
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
            arr: [],
            selectedOption: "review",
            staticUrl: process.env.STATIC_URL
        }
    },
    mounted() {
        let key = new URLSearchParams(window.location.search).get('key');
        console.log("key = ", key)
        if (!key) {
            location.href = '/';
        } else {
            //call api check
            this.$axios.get('/authen/' + key).then(res => {
                if (res.data.length) {
                    this.checkKey = true;
                    this.$axios.get('/status/review').then(res => {
                        this.arr = res.data
                    }).catch(error => {
                        console.log("error = ", error);
                    })  
                } else {
                    location.href = '/';
                }
            })
        }
    },
    methods: {
        save(_id, avatar) {

            let imgApproved = null;
            let imgRejected = null;

            if (avatar) {
                imgApproved = document.getElementById('img-check1-' + _id).checked
                imgRejected = document.getElementById('img-check2-' + _id).checked
            } else {
                imgApproved = true;
                imgRejected = false;
            }

            let msgApproved = document.getElementById('msg-check1-' + _id).checked
            let msgRejected = document.getElementById('msg-check2-' + _id).checked

            let statusMsg = 'review';
            let statusImg = 'review';

            if (imgApproved) statusImg = 'approved';
            else statusImg = 'rejected';

            if (msgApproved || msgRejected) {
                if (msgApproved) statusMsg = 'approved';
                else statusMsg = 'rejected';    


                this.$axios.patch('/update-card', {
                    _id: _id,
                    statusMsg: statusMsg,
                    statusImg: statusImg,
                    ready: true
                }).then(res=> {
                    this.handleSelect()
                })

            } else {
                alert("กรุณากด approve หรือ reject");
            }
        },
        getStatus(statusMsg, statusImg, avatar) {
            if ((statusMsg == 'rejected' && statusImg == 'approved' && avatar) || (statusMsg == 'approved' && statusImg == 'rejected')) return 'half-rejected'
            else if (statusMsg == 'review' || statusImg == 'review') return "review"
            else if (statusMsg == 'rejected' || statusImg == 'rejected' || (statusMsg == 'rejected' && !avatar)) return "rejected"
            
            return "approved"
        },
        handleSelect() {
            this.$axios.get('/status/' + this.selectedOption).then(res => {
                console.log(res.data);
                this.arr = res.data
            }).catch(error => {
                console.log("error = ", error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.a-wp {
    display: inline-block;

    .box {
        float: left;
        max-width: 300px;
        word-wrap: break-word;
        border: 1px dashed gray;
        background-color: #f9f7ed;
        border-radius: 10px;
        margin: 5px;
        padding: 15px;
        height: 450px;
        overflow: auto;
    }

    .checked {
        background-color: rgb(213 237 185);
    }

    .rejected {
        background-color: rgb(243 178 178);
    }

    .half-rejected {
        background-color: rgb(238, 175, 104);
    }

    .review {
        background-color: rgb(255 239 169);
    }

    .approved {
        background-color: #cfdfb4;
    }
}
</style>