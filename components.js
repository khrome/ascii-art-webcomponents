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
      return text;
  },
  render: ({ renderedText }) => {
      var promise = new Promise((resolve, reject) => {
          AsciiArt.font(renderedText, 'u:doublestrike', function(err, rendered){
              if(err) return reject(err);
              resolve(rendered);
          });
      });
      return html`
      <style>
          div.ascii-art-header{

          }
      </style>
      <span class="ascii-art-header">${html.resolve(
      promise
        .then((value) => html`<div>${value}</div>`)
        .catch(() => html`<div>Error!</div>`),
      html`Loading...`,
    )}</span>
  `},
};

define('ascii-art-header', AsciiArtHeader);

function imageLoad(host, event){
    var img = event.target;
    Art.image({
        imageBody : img,
        alphabet: 'variant1',
        height : host.rows,
        width : host.cols,
        stippled : host.stipple,
        threshold : host.threshold,
        posterized : host.posterize,
        imageInfo : {
            height : img.naturalHeight,
            width : img.naturalWidth,
        }
    }, function(err, rendered){
        if(err) throw err;
        setTimeout(function(){
            var html = window.ansi2html?window.ansi2html(rendered):rendered;
            host.renderedSrc = html;
        }, 100)
    });
}

const AsciiArtImage = {
    font: property(''),
    src: property(''),
    renderedSrc: property(''),
    imageTxt: property(''),
    rows: property('32'),
    cols: property('32'),
    threshold: property(128),
    posterize: property(false),
    stipple: property(''),
    htmlTxt: ({ imageTxt }) => {
        return imageTxt;
    },
    render: ({ src, renderedSrc }) => html`
        <style>
            img.ascii-art-image{
                ${(renderedSrc?'display:none; ':'')}
            }
        </style>
        ${(
            renderedSrc &&
            html`
                <div
                    class="ascii-art-image"
                    style="font-family: Courier, monospace; line-height:1;"
                    innerHTML="${renderedSrc}"
                ></div>
            `
        )}
        <img class="ascii-art-image" onload="${imageLoad}" src="${src}">
    `,
};

define('ascii-art-image', AsciiArtImage);
