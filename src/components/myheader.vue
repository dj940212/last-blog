<template>
    <header class="header">
        <div class="header-innner">
            <div class="site-brand">
                <a href="" class="brand">
                    <span class="line-before"></span>
                    <span class="title">业精于勤</span>
                    <span class="line-after"></span>
                </a>
            </div>
            <div class="nav">
                <nav class="menu">
                    <li class="memu-item">首页</li>
                    <li class="memu-item">归档</li>
                    <li class="memu-item">关于</li>
                    <li class="memu-item">搜索</li>
                    <li class="memu-item"><router-link to="/article/write">写博客</router-link></li>
                </nav>
            </div>
        </div>
    </header>
</template>
<script>
import markdownIt from 'markdown-it'
export default {
    name: 'myheader',
    mounted() {
    }
}
</script>
<style lang="less" scoped>
    .header {
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        .header-innner {
            height: 48px;
            max-width: 800px;
            padding: 2px 0 1px;
            position: relative;
            margin:0 auto;
            .nav {
                .menu {
                    float: right;
                    // margin: 8px 0 0 0;
                    text-align: center;
                    .memu-item {
                        width: 100px;
                        color: #555;
                        display: inline-block;
                        height: 48px;
                        line-height: 48px;
                        text-align: center;
                    }
                }
            }
            .site-brand {
                float: left;
                margin-top: 4px;
                margin-left: 10px;
                .brand {
                    height: 48px;
                    color: #222;
                    line-height: 34px;
                    .title {
                        font-size: 20px;
                        font-weight: bolder;
                        letter-spacing: 2px;
                        font-family: "Microsoft YaHei";
                    }
                    .line-before, .line-after {
                        display: block;
                        margin: 0 auto;
                        width: 75%;
                        height: 2px;
                        background-color: #222;
                    }
                }
            }
        }
    }
</style>