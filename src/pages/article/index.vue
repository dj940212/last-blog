<template>
    <div id="editor" class="editor">
        <div class="title">
            <div class="title-box">
                <div class="title-inner">
                    <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                    <strong v-if="mode==='read'">{{article.title}}</strong>
                    <input ref="updateTitle" v-if="mode=='update'" type="text" placeholder="title of this article" v-model="updateTitle">
                </div>
                <div class="tool">
                    <div class="setting" @click="openLabelsCard">
                        <i class="iconfont icon-biaoqian"></i>
                    </div>
                    <div class="watch">
                        <i class="iconfont icon-bianji-copy-copy" v-if="mode==='read'"  @click="isEdit"></i>
                        <i class="iconfont icon-save_blue" v-if="mode ==='update'" @click="update"></i>
                    </div>
                    <div class="watch" v-if="mode ==='update'">
                        <i class="iconfont icon-cross" @click="isNotEdit"></i>
                    </div>
                    <div class="watch" @click="deleteArt"><i class="iconfont icon-shanchu"></i></div>
                </div>
                <div class="setting-panel" v-show="settingsValue">
                    <label-card :article="article"></label-card>
                </div>
            </div>
        </div>
        <div class="description">
            <div class="desContent" v-if="mode==='read'">{{article.description || "No description..."}}</div>
            <input ref="updateDesc" v-if="mode=='update'" type="text" v-model="updateDesc" placeholder="Short description of this article">
        </div>
        <div class="content">
            <div class="header">
                <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path>
                </svg>
                <span>README.md</span>
                <div class="icon-box">
                    <i class="iconfont icon-editnew" v-if="mode==='read'" @click="isEdit"></i>
                    <i class="iconfont icon-fabu" v-if="mode ==='update'" @click="update"></i>
                </div>
            </div>
            <div class="content-inner">
                <div id="pen" data-toggle="pen" ref="pen">
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import axios from 'axios'
import {mapGetters, mapMutations} from 'vuex'
import labelCard from '@/components/labelCard'
import config from '@/config'

export default {
    data() {
        return {
            article : {},
            updateTitle: '',
            updateDesc:'',
            settingsValue: false,
        }
    },
    mounted() {
        require('@/common/js/pen.js')
        require('@/common/js/markdown.js')
        this.setArticleMode("read")
        this.getArticle(this.$route.params._id)
        this.$refs.pen.innerHTML = this.article.content
        this.init()
        this.pen.destroy();
    },
    beforeUpdate() {
    },
    computed: {
        ...mapGetters([
            'articleList',
            'mode',
            'currentIndex',
            '_id',
            'token'
        ])
    },
    components: {
        labelCard
    },
    methods: {
        ...mapMutations({
            setArticleList: 'SET_ARTICLE_LIST',
            setArticleMode: 'SET_ARTICLE_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setLabels: 'SET_LABELS'
        }),
        async getLabels() {
            let sortLabels = []
            const _id = this.$route.params._id
            const res = await axios.get(config.api.getLabelsUrl)
            const result = await axios.get(config.api.readArticleUrl,{params: {_id:_id} })
            const article = result.data.data
            console.log("文章",article)
            // 排序，已添加的标签排在前面
            res.data.data.forEach((item,index) => {
                for (var i = 0; i < article.label.length; i++) {
                    if (article.label[i]._id === item._id) {
                        item.selected = true
                        return sortLabels.unshift(item)
                    }
                }
                sortLabels.push(item)
            })
            this.setLabels(sortLabels)
        },
        init() {
            const options = {
                editor: this.$refs.pen,
                debug: true,
                list: [
                  'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule','indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                ]
            };
            // create editor
            this.pen= window.pen  = new Pen(options);
            // this.pen.destroy();
            console.log(this.pen.markdown)
        },
        isEdit() {
            this.init()
            this.pen.rebuild()
            this.pen.focus();
            this.setArticleMode('update')

            this.updateDesc = this.article.description
            this.updateTitle = this.article.title
        },
        isNotEdit() {
            this.pen.destroy();
            this.setArticleMode('read')

            this.updateDesc = this.article.description
            this.updateTitle = this.article.title
        },
        openLabelsCard() {
            this.settingsValue = !this.settingsValue
            this.getLabels()
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
        // 修改文章
        async update() {
            this.pen.destroy()
            this.codeHighlight()

            const htmlContent = this.$refs.pen.innerHTML
            !this.updateDesc && this.$refs.updateDesc.focus();
            !this.updateTitle && this.$refs.updateTitle.focus()
            !htmlContent && this.$refs.pen.focus()

            if (!this.updateDesc || !this.updateTitle || !htmlContent) return alert('信息不完整')
            if (!this.token) return alert("请登录")

            const res = await axios({
                url: config.api.articleUpdateUrl,
                method: 'POST',
                data: {
                    title: this.updateTitle,
                    description: this.updateDesc,
                    content: htmlContent,
                    _id: this.$route.query._id,
                },
                headers: {'x-access-token': this.token},
                withCredentials: true
            })

            // 绑定到变量
            this.setArticleMode('read')
            this.article = res.data.data
            this.$refs.pen.innerHTML = this.article.content
        },
        // 删除文章
        async deleteArt() {
            if (!this.token) return alert("请登录!")
            const res = await axios({
                url: config.api.articleDeleteUrl,
                method: 'POST',
                data: {_id: this._id},
                headers: {'x-access-token': this.token}
            })
            this.$router.push('/articles')
        },
        // 获取文章
        async getArticle(_id) {
            const res = await axios.get(config.api.readArticleUrl,{params: {_id:_id} })
            this.article = res.data.data
            this.updateTitle = this.article.title
            this.updateDesc = this.article.description
            this.$refs.pen.innerHTML = this.article.content
        }
    },
}
</script>

<style lang="less" scoped>
    @import '../../common/less/index.less';
    .editor{
        margin-bottom: 50px;
        .title {
            height: 69px;
            border-bottom: 1px solid @border-color;
            background-color: #fafbfc;
            font-size: 16px;
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
                    .setting {
                        cursor: pointer;
                        // width: 100px;
                        height: 28px;
                        background: #f0f4f6;
                        border: 1px solid rgba(27,31,35,0.2);
                        border-radius: 3px;
                        line-height: 28px;
                        padding: 0 10px;
                        font-size: 16px;
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
                        display: block;
                        margin-left: 10px;
                        height: 28px;
                        background: #eff3f6;
                        border: 1px solid rgba(27,31,35,0.2);
                        border-radius: 3px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        line-height: 26px;
                        padding: 0 10px;
                        font-size: 16px;
                        .iconfont {
                            font-size: 20px;
                            position: relative;
                            color: #444;
                            top: 2px;
                        }
                    }
                    .num {
                        display: block;
                        // width: 20px;
                        background: #fff;
                        height: 28px;
                        border: 1px solid #b5b7b8;
                        border-left: 0px;
                        border-radius: 3px;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        line-height: 28px;
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
                    .icon-iconziti23 {
                        font-size: 20px;
                    }
                    .icon-fabu {
                        font-size: 15px;
                    }
                    .icon-editnew {
                        font-size: 18px;
                    }
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
                                opacity: 0;
                                cursor: pointer;
                            }
                            .icon-ic_daoru{
                                left: 0px;
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
        .publish {

            float: right;
        }
    }
</style>
