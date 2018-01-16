<template>
	<div id="editor" class="editor">
        <div class="title">
            <div class="title-box">
                <div class="title-inner">
                    <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                    <input ref="writeTitle" type="text" placeholder="title of this article" v-model="writeTitle">
                </div>
                <div class="tool">
                    <div class="watch">
                        <i class="iconfont icon-save_blue" @click="publish"></i>
                    </div>
                    <div class="watch" >
                        <i class="iconfont icon-cross" @click="back"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="description">
            <input ref="writeDesc" type="text" v-model="writeDesc" placeholder="Short description of this article">
        </div>
        <div class="content">
            <div class="header">
                <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
                </svg>
                <span>README.md</span>
                <div class="icon-box">
                    <div class="upload">
                        <i class="iconfont icon-socialmarkdown"></i>
                        <input type="file" @change="importMd" ref="filer">
                    </div>

                </div>
            </div>
            <div class="content-inner">
                <div id="pen" data-toggle="pen" ref="content">
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import marked from 'marked'
import hljs from 'highlight.js'
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import config from '@/config'

export default {
	data() {
        return {
            writeTitle: '',
            writeDesc: '',
        }
    },
    mounted() {
    	require('@/common/js/pen.js')
    	require('@/common/js/markdown.js')
    	this.$refs.content.innerHTML = '在此书写...'
        this.init()
        this.pen.rebuild()
        this.pen.focus()
    },
    methods: {
    	...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
    	// 初始化编辑器
    	init() {
            const options = {
                // toolbar: document.getElementById('custom-toolbar'),
                editor: this.$refs.content,
                debug: true,
                list: [
                  'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule','indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                ]
            };
            // create editor
            this.pen = new Pen(options);
            // this.pen.destroy();
            console.log(this.pen.markdown)
        },
    	// 倒入markdown文件
    	importMd(e) {
            console.log(e)
            let fileDOM = this.$refs.filer
            let files = fileDOM.files
            let that = this
            if (files.length) {
                var file = files[0];
                var reader = new FileReader();//new一个FileReader实例
                reader.onload = function() {
                    that.$refs.content.innerHTML = marked(this.result)
                }
                reader.readAsText(file);
            }
        },
        back() {
            history.go(-1)
        },
        // 发布新文章
        async publish() {
            this.codeHighlight()
            const htmlContent = this.$refs.content.innerHTML

            !this.writeDesc && this.$refs.writeDesc.focus()
            !this.writeTitle && this.$refs.writeTitle.focus()
            !htmlContent && this.$refs.content.focus()

            if (!this.writeTitle || !this.writeDesc || !htmlContent) return alert('信息不完整')

            const res = await axios({
                url: config.api.addArticleUrl,
                method: "POST",
                data: {
                    title: this.writeTitle,
                    content: htmlContent,
                    description: this.writeDesc,
                },
            })

            this.$router.push({ path: `/article/${res.data.data._id}`})
                
            // 更新本地列表
            if (this.articleList.length) {
                let newArticleList = this.articleList.slice(0)
                newArticleList.unshift(res.data.data)
                this.setArticleList(newArticleList)
                this.setCurrentIndex(0)
            }
        },
        // 代码高亮
        codeHighlight() {
            var codes = document.getElementsByTagName('pre')
            if (codes) {
                for (var i = 0; i < codes.length; i++) {
                    hljs.highlightBlock(codes[i]);
                }
            }
        },
    },
    computed: {
        ...mapGetters([
            'articleList',
            'currentIndex',
            'token'
        ])
    },
}
</script>
<style lang="less" scoped>
@import '../../common/less/variable.less';
.editor{
    margin-bottom: 50px;
    .title {
        height: 69px;
        border-bottom: 1px solid @border-color;
        background-color: #fafbfc;
        font-size: 16px;
        .title-box{
            justify-content: space-between;
            max-width: @content-width;
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
                    font-size: 16px;
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
                .watch {
                    cursor: pointer;
                    margin-left: 5px;
                    height: 28px;
                    background: #eff3f6;
                    border: 1px solid rgba(27,31,35,0.2);
                    border-radius: 3px;
                    padding: 0 10px;
                    font-size: 16px;
                    .iconfont {
                        font-size: 20px;
                        position: relative;
                        color: #444;
                        top: 3px;
                    }
                }

            }
        }
    }
    .description {
        max-width: @content-width;
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
        max-width: @content-width;
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
        max-width: @content-width;
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
            .icon-box > .iconfont {
                margin-left: 8px;
                position: relative;
                top: -7px;
                right: 5px;
            }
            .icon-box {
                color: #24292e;
                height: 28px;
                border-radius: 3px;
                position: absolute;
                box-shadow:0;
                margin-right: 10px;
                line-height: 28px;
                right: 0;
                color: #555;
                cursor: pointer;
                .upload{
                        display: inline-block;
                        position: relative;
                        cursor: pointer;
                        width: 25px;
                        height: 25px;
                        left: 5px;
                        cursor: pointer;
                        input {
                            width: 25px;
                            position: absolute;
                            top: 5px;
                            right: 2px;
                            opacity: 0;
                            cursor: pointer;
                        }
                        .iconfont{
                            left: 0px;
                            font-size: 22px;
                            position: absolute;
                            cursor: pointer;
                        }
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
}
@media screen and (max-width: 800px) {
    .editor {
        pa
        .title {
            .title-box {
                .title-inner {
                   input{
                        width: 180px;
                    } 
                }
            }
            .tool {
                margin-right: 10px;
            }
            
        }
        .description {
            margin: 20px 10px;
        }
        .content {
            margin: 0 10px;
        }
    }
}
</style>
