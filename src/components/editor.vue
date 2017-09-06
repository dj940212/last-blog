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
        this.editor()
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
            console.log("outHTML",out.innerHTML)

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
            this.editorLive = CodeMirror.fromTextArea(document.getElementById('code'), {
              mode: 'gfm',
              lineNumbers: false,
              matchBrackets: true,
              lineWrapping: true,
              theme: 'base16-light',
              extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
            });

            this.editorLive.on('change', this.update);
        },
        updateHash(){
          window.location.hash = btoa( // base64 so url-safe
            RawDeflate.deflate( // gzip
              unescape(encodeURIComponent( // convert to utf8
                this.editor.getValue()
              ))
            )
          );
        }
    }
}
</script>

<style lang="less" scoped> 

</style>