<template>
  <section>
        <div class="container">
            <div class="row mt-4">
                <div class="col-md-4">
                	<div class="card shadow card-bg">
                    	<div class="card-body" v-if="materi && typeof materi._teacher != 'undefined'">
                    		<strong>{{ materi._teacher.name }}</strong> <br>
                    		{{ materi.createdDate | moment("MMMM Do YYYY, h:mm a") }} <hr>
                            <span class="badge badge-secondary"><i class="cil-spa"></i></span> {{ materi._subject.name }}
                    	</div>
                        <div v-else>
                            Loading...
                        </div>
                    </div>
                    <div class="card shadow card-bg mt--3">
                    	<div class="card-body">
                    		<span class="badge badge-success"><i class="cil-happy"></i> Faham </span> <br>
                    		<span class="badge badge-warning"><i class="cil-frown"></i> Kurang faham </span> <br>
                    		<span class="badge badge-danger"><i class="cil-face-dead"></i> Aduh... </span>
                    	</div>
                    </div>
                    <div class="card shadow card-bg mt--3">
                        <div class="card-body">
                            <template v-for="(user,index) in users"> 
                                <span v-html="user"></span> <br>
                            </template>
                        </div>
                    </div>  							
                </div>
                <div class="col-md-8">
                    <div class="card shadow">
                        <div class="card-body">
                            <h3 v-text="materi.title"></h3>
                            <div class="bordered-pad" v-text="materi.description"></div>
                            <hr>
                            <div v-html="materi.content"></div>
                        </div>
                        <div class="card-footer">
                            <div class="mb-2" v-for="(message, index) in messages" :key="index">
                                <strong><i class="cil-chevron-right"></i> {{message.username}}</strong>  &nbsp; &nbsp; {{ message.content }} <br>
                                <small class="text-muted">{{ message.createdDate | moment("from") }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card mt--3">
                        <div class="card-body shadow">
                            <form @submit.prevent="sendMessage">
                                <div class="input-group">
                                  <input type="text" class="form-control" placeholder="Tulis komentar..." name="" v-model="message">
                                  <div class="input-group-append">
                                    <button class="btn btn-info" type="submit"><i class="cil-paper-plane"></i>Post</button>
                                  </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import io from 'socket.io-client'
    import { mapGetters, mapActions, mapState } from 'vuex'
    export default {
        name: 'MateriReaad',
        data() {
        	return {
                socket: null,
                messages: [],
                message:'',
                users: [],
                channel: ''
        	}
        },
        computed: {
        	...mapState('materi', {
        		materi: state => state.materi
        	}),
            ...mapState('comment', {
                comments: state => state.comments
            }),
            ...mapState('user', {
                user: state => state.authenticated
            })
        },
        methods: {
        	...mapActions('materi',['getMateri']),
            ...mapActions('comment', ['getAllComment','postComment','removeComment']),
            sendMessage() {
                this.postComment({ content: this.message, _matter: this.$route.params.id })
                .then((res) => {
                    this.socket.emit('chat_message', { 
                        channel: this.channel,
                        _id: res._id, 
                        content: res.content,
                        username: res._user.name,
                        createdDate: res.createdDate
                    });
                    this.message = '';
                })
            },
            remove(id) {
                this.removeComment(id)
            },
            commitUser() {
                this.socket.emit('username', { 
                    username: this.user.name, channel: this.channel 
                });
            }
        },
        created() {
            this.channel = this.$route.params.id
        	this.getMateri(this.$route.params.id)
            .then(() => {
                this.getAllComment(this.$route.params.id);
            })
            this.socket = io('http://localhost:3000');
            this.socket.on('connect', () => {

            });
            if(this.user) {
                this.commitUser();
            }
        },
        mounted() {
            this.socket.on('chat_message_'+this.channel, (msg) => {
                this.messages.push(msg);
            });
            this.socket.on('is_online_'+this.channel, (username) => {
                this.users.push(username);
            });
        },
        destroyed() {
            this.socket.emit('exit', { channel: this.channel })
        },
        watch: {
            comments() {
                let msgs = this.comments.map(x => {
                    return {
                        _id: x._id,
                        content: x.content,
                        username: x._user.name,
                        createdDate: x.createdDate
                    }
                })
                this.messages = msgs;
            },
            user(val) {
                if(val) {
                   this.commitUser();
                }
            }
        }
    }
</script>