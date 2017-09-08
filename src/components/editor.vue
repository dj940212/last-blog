<template>

    <div id="editor" class="editor">
       <div id="toolbar" v-show="false">
          <span id="mode" class="icon-mode" @click="getArticle"></span>
          <span id="hinted" class="icon-pre disabled" title="Toggle Markdown Hints" @click="saveAsMarkdown"></span>
          <span id="tomd" title="to markdown" @click="publish">MD</span>
        </div>
        <div class="title">
            <div class="title-inner">
                <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                <strong v-if="mode==='read'">{{articleList[currentIndex].title}}</strong>
                <input v-if="mode=='write'" type="text" placeholder="title of this article" v-model="title">
                <div class="btn"></div>
            </div>
        </div>
        <div class="description">
            <div class="desContent" v-if="mode==='read'">{{articleList[currentIndex].description || "No description, website, or topics provided."}}</div>
            <input v-if="mode=='write'" type="text" v-model="description" placeholder="Short description of this article">
            <button class="edit-btn" @click="publish">Save</button>
        </div>
        <div v-show="true" class="toolbar">
            <ul>
                <li @click="update"> update </li>
                <li @click="edit"> Edit </li>
                <li @click="deleteArt"> Delete </li>
                <li> contributor</li>
            </ul>
        </div>
        <div class="content">
            <div class="header">
                <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
                </svg>
                <span>README.md</span>
            </div>
            <div class="content-inner">
                <div id="pen" data-toggle="pen" ref="penArea">
                  
                </div>
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
            article : "",
            title: '',
            description: '',
            endAticle: null
        }
    },
    mounted() {
    	this.init()
        console.log(this.articleList,this.currentIndex,this.mode)
        this.mode === "read" && this.getArticle(this.currentIndex)
    },
    computed: {
        ...mapGetters([
            'articleList',
            'mode',
            'currentIndex'
        ])
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE'
        }),
    	init() {
            var options = {
                // toolbar: document.getElementById('custom-toolbar'),
                editor: document.querySelector('[data-toggle="pen"]'),
                debug: true,
                list: [
                  'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
                  'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                ]
            };

            // create editor
            var pen = this.pen = window.pen = new Pen(options);
            console.log(pen.markdown)

            pen.focus();
    	},
        edit() {
            var text = this.textContent;

            if(this.classList.contains('disabled')) {
              this.classList.remove('disabled');
              pen.rebuild();
            } else {
              this.classList.add('disabled');
              pen.destroy();
            }
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
        // 保存
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
        async publish() {
            var htmlContent = document.getElementById('pen').innerHTML
            var res = await axios.post('http://localhost:3000/api/article/save',{
                title: this.title,
                content: htmlContent,
                description: this.description,
                babel: 'javascript,css,html'
            })
            console.log(res.data)
            this.articleList.unshift(res.data)
            const len = this.articleList.length
            console.log(len)
            // this.$router.push({ name:'article', params: { _id: this.articleList[0]._id}})
        },
        async update() {
            var article = this.articleList[this.currentIndex]
            var htmlContent = document.getElementById('pen').innerHTML
            var res = await axios.post('http://localhost:3000/api/article/update',{
                title: article.title,
                description: article.description,
                content: htmlContent,
                _id: article._id,
                babel: 'javascript,css,html'
            })
        },
        async deleteArt() {
            var res = await axios.post('http://localhost:3000/api/article/delete',{
                _id: this.articleList[this.currentIndex]._id
            })
            console.log(res.data)
            this.$router.push({name:'list'})
        },
        async getArticle(index) {
            var res = await axios.get('http://localhost:3000/api/article/list')
            console.log(res.data.data[index])
            document.getElementById('pen').innerHTML = res.data.data[index].content
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
            .title-inner {
                box-sizing: border-box;
                width: @content-width;
                margin: 0 auto;
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
                width: 80%;
                height: 36px;
            }
            button {
                color: #24292e;
                width: 43px;
                height: 28px;
                border-radius: 3px;
                box-shadow:0;
                background-color: #eff3f6;
                border: 1px solid @border-color;
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
                span {
                    margin-left: 4px;
                    font-size: 14px;
                    font-weight: 600;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
                    line-height: 20px;
                }
            }
            .content-inner {
                padding: 45px;
            }
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
