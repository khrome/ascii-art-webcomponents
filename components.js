//import { html, define, children } from 'hybrids';
var html = require('hybrids').html;
var define = require('hybrids').define;
var parent = require('hybrids').parent;
var children = require('hybrids').children;
var property = require('hybrids').property;

function imageLoad(host, event){

}

export const AsciiArtHeader = {
  font: property(''),
  text: property(''),
  renderedText: ({ text }) => {

  },
  render: ({ renderedText }) => html`
      <style>
          span.ascii-art-header{

          }
      </style>
      <span class="ascii-art-header">${renderedText}</span>
  `,
};

define('ascii-art-header', AsciiArtHeader);

export const AsciiArtImage = {
  font: property(''),
  src: property(''),
  imageTxt: property(''),
  htmlTxt: ({ imageTxt }) => {
      return imageTxt;
  },
  render: ({ renderedText, src }) => html`
      <style>
          span.ascii-art-image{

          }
      </style>
      <img class="ascii-art-image" onload="${imageLoad}" src="${src}"/>
  `,
};

define('ascii-art-image', AsciiArtImage);
