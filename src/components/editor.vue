<template>
    <div id="editor" class="editor">
        <textarea id="content" v-model="article" name="name" rows="20" cols="80" el='content'>
## 海贼王
###### 东动画
        </textarea>
        <div id="out" class="out" ref="out"></div>
    </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight'
export default {
    data() {
        return {
            article : "",
            endAticle: null
        }
    },
    mounted() {
    	this.init()
        console.log(this)
        // document.getElementById('editor').innerHTML =
        //   marked('# Marked in browser\n\nRendered by *marked*.');
    },
    methods: {
    	init() {
			marked.setOptions({
			  	renderer: new marked.Renderer(),
			  	gfm: true,
			  	tables: true,
			  	breaks: false,
			  	pedantic: false,
			  	sanitize: false,
			  	smartLists: true,
			  	smartypants: false,
			  	highlight: function (code) {
				    return highlight.highlightAuto(code).value;
				}
			});
    	}
    },
    computed: {
        Marked: () => {
            return marked(this.article)
        }
    },
    watch: {
        article: function(val) {
            this.endAticle= marked(val)
            this.$refs.out.innerHTML = this.endAticle
        }
    }
}
</script>

<style lang="less" scoped="">
    #content　{
        float: left;
    }
    .out {
        width: 40%;
        height: 300px;
        border: 1px solid #333;
        float: right;
    }
</style>
