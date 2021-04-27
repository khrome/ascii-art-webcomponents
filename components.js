//var hybrids = require('hybrids');
var hybrids = window.hybrids;
var Art = window.AsciiArt;
var html = hybrids.html;
var define = hybrids.define;
var parent = hybrids.parent;
var children = hybrids.children;
var property = hybrids.property;


const AsciiArtHeader = {
  font: property(''),
  text: property(''),
  renderedText: ({ text }) => {

  },
  render: ({ renderedText }) => html`
      <style>
          div.ascii-art-header{

          }
      </style>
      <span class="ascii-art-header">${renderedText}</span>
  `,
};

define('ascii-art-header', AsciiArtHeader);

function imageLoad(host, event){
    console.log('LOADED', host, event)
    var img = event.target;
    Art.image({
        imageBody : img,
        alphabet: 'variant1',
        height : 32,
        width : 32,
        imageInfo : {
            height : img.naturalHeight,
            width : img.naturalWidth,
        }
    }, function(err, rendered){
        if(err) throw err;
        console.log('STARTED');
        setTimeout(function(){
            var html = window.ansi2html?window.ansi2html(rendered):rendered;
            console.log('RENDERED', host, html);
            host.renderedSrc = html;
        }, 100)
    });
}

const AsciiArtImage = {
    font: property(''),
    src: property(''),
    renderedSrc: property(''),
    imageTxt: property(''),
    htmlTxt: ({ imageTxt }) => {
        return imageTxt;
    },
    render: ({ src, renderedSrc }) => html`
        <style>
            img.ascii-art-image{
                ${(renderedSrc?'display:none; ':'')}
                font-family: "Courier New", Courier, monospace;
            }
        </style>
        ${(
            renderedSrc &&
            html`
                <div
                    class="ascii-art-image"
                    style="font-family: Courier, monospace"
                    innerHTML="${renderedSrc}"
                ></div>
            `
        )}
        <img class="ascii-art-image" onload="${imageLoad}" src="${src}"/>
    `,
};

define('ascii-art-image', AsciiArtImage);
