<template>
    <div id="editor" class="editor">
        <div class="title">
            <div class="title-box">
                <div class="title-inner">
                    <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                    <strong v-if="mode==='read'">{{article.title}}</strong>
                    <input ref="writeTitle" v-if="mode=='write'" type="text" placeholder="title of this article" v-model="writeTitle">
                    <input ref="updateTitle" v-if="mode=='update'" type="text" placeholder="title of this article" v-model="updateTitle">
                </div>
                <div class="tool">
                    <!-- <i class="iconfont icon-shezhi" @click="publish"></i> -->
                    <div class="setting"><i class="iconfont icon-setting"></i>Settings<i class="iconfont icon-xiala"></i></div>
                    <div class="watch"><i class="iconfont icon-liulan" @click="publish"></i>watch</div>
                    <div class="num">1000</div>
                </div>
                <div class="setting-panel" v-show="false">
                    <div class="setting-item">Delete article</div>
                    <hr>
                    <div class="setting-item">Export HTML</div>
                    <div class="setting-item">Export markdown</div>
                    <hr>
                    <div class="setting-item">Export markdown</div>
                    <div class="setting-item">Export markdown</div>
                </div>
            </div>
        </div>
        <div class="description">
            <div class="desContent" v-if="mode==='read'">{{article.description || "No description..."}}</div>
            <input ref="writeDesc" v-if="mode=='write'" type="text" v-model="writeDesc" placeholder="Short description of this article">
            <input ref="updateDesc" v-if="mode=='update'" type="text" v-model="updateDesc" placeholder="Short description of this article">
        </div>
        <div v-show="false" class="toolbar">
            <ul>
                <li @click="update"> update </li>
                <li @click="isEdit"> Edit </li>
                <li @click="deleteArt"> Delete </li>
                <li @click="hinted"> contributor</li>
            </ul>
        </div>
        <div class="content">
            <div class="header">
                <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
                </svg>
                <span>README.md</span>
                <div class="icon edit"><i class="iconfont icon-editnew" @click="publish"></i>edit</div>
                <div class="icon babel"><i class="iconfont icon-iconziti23" @click="publish"></i>labels</div>
            </div>
            <div class="content-inner">
                <div id="pen" data-toggle="pen" ref="pen"></div>
            </div>

        </div>

    </div>
</template>

<script>
import marked from 'marked'
import codemirror from 'codemirror'
import highlight from 'highlight'
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import '@/common/js/pen.js'
import '@/common/js/markdown.js'

export default {
    data() {
        return {
            article : {},
            writeTitle: '',
            writeDesc: '',
            updateTitle: '',
            updateDesc:'',
        }
    },
    mounted() {
    	this.init()
        console.log("params",this.$route.params)
        console.log("mode:",this.mode)
        if(this.mode === 'write') {
            document.getElementById('pen').innerHTML = '在此书写...'
            this.pen.rebuild()

        }else if (this.$route.params._id !== 'write') {
            this.setArticleMode("read")
            this.getArticle(this.$route.params._id)
        }
    },
    beforeUpdate() {
        if (this.mode === 'write') {
            document.getElementById('pen').innerHTML = '在此书写...'
            this.pen.rebuild()
        }
    },
    computed: {
        ...mapGetters([
            'articleList',
            'mode',
            'currentIndex',
            '_id'
        ])
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE'
        }),
    	init() {
            const options = {
                // toolbar: document.getElementById('custom-toolbar'),
                editor: document.querySelector('[data-toggle="pen"]'),
                debug: true,
                list: [
                  'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
                  'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                ]
            };
            // create editor
            this.pen  = new Pen(options);
            this.pen.focus();
            console.log(this.pen.markdown)
    	},
        isEdit() {
            this.pen.rebuild()
            // this.pen.focus();
            this.setArticleMode('update')
        },
        tomd() {
            var text = pen.toMd();
            document.body.innerHTML = '<a href="javascript:location.reload()">&larr;back to editor</a><br><br><pre>' + text + '</pre>';
        },
        hinted() {
            var pen = document.querySelector('.pen')

            if(pen.classList.contains('hinted')) {
              pen.classList.remove('hinted');
              this.classList.add('disabled');
            } else {
              pen.classList.add('hinted');
              this.classList.remove('disabled');
            }
        },
        // 保存新文章
        save(code, name){
          var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
          navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;
          window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;
          var blob = new Blob([code], { type: 'text/plain' });
          // console.log("blob",blob)
          // this.toString(blob)
          if(window.saveAs){
            window.saveAs(blob, name);
          }else if(navigator.saveBlob){
            navigator.saveBlob(blob, name);
          }else{
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.setAttribute("href",url);
            link.setAttribute("download",name);
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
          }
        },
        saveAsMarkdown() {
           // console.log(this.pen.toMd())
           this.save(this.pen.toMd(),'undefined.md')
        },
        saveAsHtml() {
          this.save(document.getElementById('pen').innerHTML, "untitled.html");
          console.log(typeof document.getElementById('pen').innerHTML)
        },
        toString(blob) {
            var reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = function (e) {
                console.info(reader.result);
            }
        },
        // 发布新文章
        async publish() {
            const htmlContent = this.$refs.pen.innerHTML
            !this.writeDesc && this.$refs.writeDesc.focus()
            !this.writeTitle && this.$refs.writeTitle.focus()
            !htmlContent && this.$refs.pen.focus()
            if (this.writeTitle && this.writeDesc && htmlContent) {
                const res = await axios.post('http://localhost:3000/api/article/save',{
                    title: this.writeTitle,
                    content: htmlContent,
                    description: this.writeDesc,
                    babel: 'javascript,css,html'
                })
                console.log(res.data)
                this.setArticleMode('read')
                this.getArticle(res.data.data._id)
            }else {
                console.log('信息不完整')
            }


        },
        async update() {
            const htmlContent = document.getElementById('pen').innerHTML
            console.log(this.updateDesc,this.updateTitle)
            !this.updateDesc && this.$refs.updateDesc.focus();
            !this.updateTitle && this.$refs.updateTitle.focus()
            !htmlContent && this.$refs.pen.focus()
            if (this.updateDesc && this.updateTitle && htmlContent) {
                const res = await axios.post('http://localhost:3000/api/article/update',{
                    title: this.updateTitle,
                    description: this.updateDesc,
                    content: htmlContent,
                    _id: this.$route.params._id,
                    babel: 'javascript,css,html'
                })
                this.setArticleMode('read')
                this.getArticle(this.$route.params._id)
            }else{
                console.log('信息不完整')
            }

        },
        async deleteArt() {
            var res = await axios.post('http://localhost:3000/api/article/delete',{
                _id: this._id
            })
            console.log(res.data)
            this.$router.push({name:'list'})
        },
        async getArticle(_id) {
            const res = await axios.get(`http://localhost:3000/api/article/read`,{
                params: {_id:_id}
            })
            console.log("我是ｉｄ",this._id)
            this.article = res.data.data
            this.updateTitle = this.article.title
            this.updateDesc = this.article.description
            document.getElementById('pen').innerHTML = this.article.content
            console.log(res.data)
        }
    },
}
</script>

<style lang="less" scoped>
    @import '../common/less/variable.less';
    .editor{
        margin-bottom: 50px;
        .title {
            height: 69px;
            border-bottom: 1px solid @border-color;
            background-color: #fafbfc;
            .title-box{
                justify-content: space-between;
                width: @content-width;
                margin: 0 auto;
                display: flex;
                position: relative;
                .title-inner {
                    box-sizing: border-box;
                    height: 69px;
                    display: flex;
                    align-items: center;
                    strong {
                        line-height: 16px;
                        margin-left: 10px;
                        color: #0366d6;
                    }
                    input {
                        box-sizing: border-box;
                        border: 1px solid #d1d5da;
                        border-radius: 3px;
                        color: #24292e;
                        font-size: 14px;
                        padding: 6px 8px;
                        box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
                        background-color: #fafbfc;
                        width: 300px;
                        height: 36px;
                        margin-left: 10px;
                    }
                    button {
                        color: #24292e;
                        height: 28px;
                        border-radius: 3px;
                        box-shadow:0;
                        background-color: #eff3f6;
                        border: 1px solid @border-color;
                        // align-self: end;
                    }
                }
                .tool {
                    align-self: center;
                    display: flex;
                    .setting {
                        cursor: pointer;
                        // width: 100px;
                        height: 30px;
                        background: #f0f4f6;
                        border: 1px solid #b5b7b8;
                        border-radius: 3px;
                        line-height: 30px;
                        padding: 0 10px;
                        .icon-setting {
                            font-size: 16px;
                            margin-right: 5px;
                            color: #444;
                        }
                        .icon-xiala {
                            font-size: 6px;
                            margin-left: 6px;
                            color: #666;
                        }
                    }
                    .watch {
                        cursor: pointer;
                        margin-left: 10px;
                        height: 30px;
                        background: #f0f4f6;
                        border: 1px solid #b5b7b8;
                        border-radius: 3px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        line-height: 30px;
                        padding: 0 10px;
                        .iconfont {
                            font-size: 20px;
                            margin-right: 8px;
                            position: relative;
                            color: #444;
                            top: 3px;
                        }
                    }
                    .num {
                        display: block;
                        // width: 20px;
                        background: #f0f4f6;
                        height: 30px;
                        border: 1px solid #b5b7b8;
                        border-left: 0px;
                        border-radius: 3px;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        line-height: 30px;
                        text-align: center;
                        padding:0 5px;
                    }


                }
                .setting-panel {
                    position: absolute;
                    width: 180px;
                    z-index: 10;
                    right: 145px;
                    top: 55px;
                    background-color: #fff;
                    border-radius: 3px;
                    border:1px solid @border-color;
                    .setting-item {
                        height: 30px;
                        padding-left: 15px;
                        cursor: pointer;
                        line-height: 30px;
                        &:hover {
                            background-color: #5248d6;
                            color: rgba(255, 255, 255, 0.9);
                        }
                    }
                    hr{
                        // border: 0;
                        margin: 4px 0;
                        border-bottom: 0;
                        border-color: @border-color;
                    }
                }
            }

        }
        .description {
            width: @content-width;
            display: flex;
            margin: 20px auto;
            justify-content: space-between;

            .desContent {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
                // font-style: italic;
                // line-height: 20px;
                letter-spacing: 1px;
                width: 80%;
            }
            input {
                box-sizing: border-box;
                border: 1px solid #d1d5da;
                border-radius: 3px;
                color: #24292e;
                font-size: 14px;
                padding: 6px 8px;
                box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
                background-color: #fafbfc;
                width: 100%;
                height: 36px;
            }
        }
        .toolbar {
            width: @content-width;
            margin: 0 auto;
            border: 1px solid @border-color;
            border-bottom: 1px solid #fff;
            border-radius: 3px;
            ul {
                display: flex;
                justify-content: space-around;
                li{
                    list-style: none;
                    cursor: pointer;
                }
            }
        }
        .content {
            border: 1px solid @border-color;
            border-radius: 3px;
            width: @content-width;
            margin:0 auto;
            .header {
                box-sizing: border-box;
                height: 38px;
                border-bottom: 1px solid @border-color;
                background: #f6f8fa;
                display: flex;
                align-items: center;
                padding: 9px 10px 10px;
                position: relative;
                span {
                    margin-left: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
                    line-height: 20px;
                }
                .icon {
                    color: #24292e;
                    height: 28px;
                    border-radius: 3px;
                    position: absolute;
                    box-shadow:0;
                    background-color: #eff3f6;
                    margin-right: 30px;
                    line-height: 28px;
                    right: 0;
                    color: #555;
                    cursor: pointer;
                    .iconfont {
                        font-size: 20px;
                    }
                }
                .babel {
                    margin-right: 93px;
                }
            }
            .content-inner {
                padding:30px 45px;
            }
        }
        .publish {

            float: right;
        }
    }
    small{
        color:#999;
    }
    pre{white-space:pre-wrap;}

    #toolbar{margin-bottom:1em;position:fixed;left:20px;margin-top:5px;}
    #toolbar [class^="icon-"]:before, #toolbar [class*=" icon-"]:before{font-family:'pen'}
    #mode{color:#1abf89;;cursor:pointer;}
    #mode.disabled{color:#666;}
    #mode:before{content: '\e813';}
    #hinted{color:#1abf89;cursor:pointer;}
    #hinted.disabled{color:#666;}
    #hinted:before{content: '\e816';}
    #tomd{color:#fff;border-radius:2px;line-height:1;padding:1px 3px 0; font-size:0.8em;background:#000;cursor:pointer;}
    #fork{position:fixed;right:0;top:0;}
</style>
