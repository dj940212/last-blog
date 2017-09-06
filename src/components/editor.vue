<template>
    <div class="editor">
        <div id="in" class="in">
            <form>
                <textarea  id="code" cols="100" rows="30">
# (GitHub-Flavored) Markdown Editor

Basic useful feature list:

* Ctrl+S / Cmd+S to save the file
* Ctrl+Shift+S / Cmd+Shift+S to choose to save as Markdown or HTML
* Drag and drop a file into here to load it
* File contents are saved in the URL so you can share files

```javascript
$(function(){
  $('div').html('I am a div.');
});
```                    
                </textarea>
            </form>
        </div>
        <div id="out">
            
        </div>
    </div>
</template>
<script>
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import CodeMirror from 'codemirror'

export default {
    mounted(){
        const result = new markdownIt().render('# markdown-it!')
        console.log(result)
        this.init()
        console.log(this.md.render)
        // this.editor()
    },
    methods: {
        data() {
            return {
            }
        },
        init() {
            this.md = markdownIt({
                html: true,
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value;
                        } catch (e) {}
                    }
                    return ''; // use external default escaping
                }
            })
        },
        update(e) {
            console.log(e)
            this.setOutput(e.getValue())
            clearTimeout(this.hashto)
            this.hashto = setTimeout(updateHash, 1000)
        },
        setOutput(val) {
            val = val.replace(/<equation>((.*?\n)*?.*?)<\/equation>/ig, (a, b) => {
                return '<img src="http://latex.codecogs.com/png.latex?' + encodeURIComponent(b) + '" />'
            })

            var out = document.getElementById('out');
              var old = out.cloneNode(true);
              out.innerHTML = this.md.render(val);
              // emojify.run(out);

              var allold = old.getElementsByTagName("*");
              if (allold === undefined) return;

              var allnew = out.getElementsByTagName("*");
              if (allnew === undefined) return;

              for (var i = 0, max = Math.min(allold.length, allnew.length); i < max; i++) {
                if (!allold[i].isEqualNode(allnew[i])) {
                  out.scrollTop = allnew[i].offsetTop;
                  return;
                }
              }
        },
        editor() {
            var editorLive = CodeMirror.fromTextArea(document.getElementById('code'), {
              mode: 'gfm',
              lineNumbers: false,
              matchBrackets: true,
              lineWrapping: true,
              theme: 'base16-light',
              extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
            });

            editorLive.on('change', this.update);
        }
    }
}
</script>

<style lang="less" scoped>
    body {margin: 0;}

    .CodeMirror pre{
      line-height: 16px;
    }

    #in{
      // position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: 800px;
      height: 900px;
      overflow: auto;
      margin: 0 auto;
      font-size: 12px;
      // box-shadow: -10px 2px 6px 10px rgba(0,0,0,0.4);
    }

    .CodeMirror {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
    }

    .CodeMirror-scroll {
      padding: 30px;
      box-sizing: border-box;
    }

    #out{
      position: fixed;
      top: 0;
      right: 0;
      left: 50%;
      bottom: 0;
      overflow: auto;
      padding: 10px;
      padding-left: 20px;
      color: #444;
      font-family:Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif;
      font-size: 16px;
      line-height: 1.5em;
    }

    #menu {
      display: none;
      position: fixed;
      background-color: #111;
      border-radius: 5px;
      top: 50%;
      left: 50%;
      width: 250px;
      height: 150px;
      margin-top: -75px;
      margin-left: -125px;
      z-index: 99;
      text-align: center;
      color: white;
    }

    #menu > span {
      display: block;
      font-size: 1.5em;
      line-height: 1.3;
      margin-top: 0.25em;
    }

    #menu > div {
      display: inline-block;
      width: 100px;
      text-align: center;
      vertical-align: top;
      cursor: pointer;
      opacity: 0.7;
    }

    #menu > div:hover {
      opacity: 1;
    }

    #menu svg {
      width: 64px;
      height: 64px;
      margin: 0 auto;
      display: block;
    }
    #menu path {
      fill: #fff;
    }

    #close-menu {
      position: absolute;
      top: 5px;
      right: 9px;
      color: white;
      cursor: pointer;
    }

    .emoji {
      width: 1em;
      height: 1em;
      vertical-align: baseline;
    }

    @media screen and (max-width: 1024px) {
      #in {
        display: none;
      }
      #out {
        left: 0;
        padding-left: 10px;
      }
    }

    .cm-header-1 { font-size: 2em; }
    .cm-header-2 { font-size: 1.75em; }
    .cm-header-3 { font-size: 1.5em; }
    .cm-header-4 { font-size: 1.3em; }
    .cm-header-5 { font-size: 1.2em; }
    .cm-header-6 { font-size: 1.15em; }

    .cm-quote { color: #90a959; font-style: italic; }

    .view #in {
      display: none;
    }
    .view #out {
      left: 0;
      padding-left: 10px;
    }

    a{ color: #0645ad; text-decoration:none;}
    a:visited{ color: #0b0080; }
    a:hover{ color: #06e; }
    a:active{ color:#faa700; }
    a:focus{ outline: thin dotted; }
    a:hover, a:active{ outline: 0; }

    p{margin:1em 0;}

    img{max-width:100%;}

    h1,h2,h3,h4,h5,h6{font-weight:normal;color:#111;line-height:1em;}
    h4,h5,h6{ font-weight: bold; }
    h1{ font-size:2.5em; }
    h2{ font-size:2em; border-bottom:1px solid silver; padding-bottom: 5px; }
    h3{ font-size:1.5em; }
    h4{ font-size:1.2em; }
    h5{ font-size:1em; }
    h6{ font-size:0.9em; }

    blockquote{color:#666666;margin:0;padding-left: 3em;border-left: 0.5em #EEE solid;}
    hr { display: block; height: 2px; border: 0; border-top: 1px solid #aaa;border-bottom: 1px solid #eee; margin: 1em 0; padding: 0; }

    pre, code{
      color: #000;
      font-family:Consolas, "Liberation Mono", Menlo, Courier, monospace;
      font-size: 0.94em; /* 0.94 = 0.88 + (1.00 - 0.88) / 2 */
      border-radius:3px;
      background-color: #F8F8F8;
      border: 1px solid #CCC;
    }
    pre { white-space: pre; white-space: pre-wrap; word-wrap: break-word; padding: 5px;}
    pre code { border: 0px !important; background: transparent !important; line-height: 1.3em; }
    code { padding: 0 3px 0 3px; }
    sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
    sup { top: -0.5em; }
    sub { bottom: -0.25em; }
    ul, ol { margin: 1em 0; padding: 0 0 0 2em; }
    li p:last-child { margin:0 }
    dd { margin: 0 0 0 2em; }
    img { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; }
    table { border-collapse: collapse; border-spacing: 0; }
    td, th { vertical-align: top; padding: 4px 10px; border: 1px solid #bbb; }
    tr:nth-child(even) td, tr:nth-child(even) th { background: #eee; }
</style>