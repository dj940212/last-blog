<template>
    <div id="editor" class="editor">
       <div id="toolbar">
          <span id="mode" class="icon-mode" @click="getArticle"></span>
          <span id="hinted" class="icon-pre disabled" title="Toggle Markdown Hints" @click="saveAsMarkdown"></span>
          <span id="tomd" title="to markdown" @click="publish">MD</span>
        </div>
        <div class="tool">
            <input type="button" class="btn" value="　发表　"　@click="publish">
            <input type="button" class="btn" value=" 　删除　">
        </div>
        <div id="pen" data-toggle="pen" data-placeholder="im a placeholder" ref="penArea">
          <h2>Enjoy live editing (+markdown)</h2>

          <p><b><i>Click to edit, Select to apply effect, click items of toolbar to toggle effects.</i></b></p>
          <hr>
          <p>Horizontal-Rule can be inserted by click「...」on the toolbar or just type「... 」/「--- 」/「*** 」at line start. Note that
            there's a SPACE at the end of a command.</p>
          <p><img src="https://files.slack.com/files-pri/T02SY1UGK-F02UKR9HH/61fecdffjw1em2euxugtdg208w06okjm.gif" alt="oh my god"/></p>
          <hr>
          <p>To link or unlink, please press the <i>ENTER</i> key after you filled the input field with your a link. A <a
            href="/sofish">link</a> can be unlink by applying an empty value to the input field.

          <p>
          <ul>
            <li>Ordered list and unordered list are supported.</li>
            <li>Use the toolbar or use markdown syntax like「<b>1. </b>」,「<b>- </b>」or「<b>* </b>」</li>
          </ul>
          <blockquote>You can quote text by type「<b>&gt;</b>」at line start.</blockquote>
          <p>What about add underline to text? "<u>Stay Hungry, Stay Foolish - <i>Steve Jobs</i></u>".</p>
          <pre>A code block is also supported by type 「```」 at line start and press SPACE.</pre>
          <p>For more, please checkout: <a href="https://github.com/sofish/pen#readme" target="_blank">https://github.com/sofish/pen#readme</a>
          </p>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import codemirror from 'codemirror'
import highlight from 'highlight'
import axios from 'axios'
import '@/common/js/pen.js'
import '@/common/js/markdown.js'

export default {
    data() {
        return {
            article : "",
            endAticle: null
        }
    },
    mounted() {
    	this.init()
    },
    methods: {
    	init() {
			// config
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
        mode() {
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
                title: "你好世界",
                content: htmlContent,
                babel: 'javascript,css,html'
            })
            console.log(res.data)
        },
        async getArticle() {
            var res = await axios.get('http://localhost:3000/api/article/list')
            console.log(res.data.data[0])
            document.getElementById('pen').innerHTML = res.data.data[1].content
        }
    },
}
</script>

<style lang="less" scoped="">
    .editor{
        width:800px;
        margin:0 auto;
        padding:5% 20px 20px;
        font-family:Palatino, Optima, Georgia, serif;
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
