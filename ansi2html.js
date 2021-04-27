module.exports = function(str){
    var t1 = (new Date()).getTime();
    var count = 0;
    console.log(str);
    var Color = window.AsciiArtAnsiColor;
    var result = window.AsciiArtAnsi.map(str, function(chr, codes, rowcol, pos, shortcircuit){
        //console.log('B', (new Date()).getTime() - t1, codes);
        //count++;
        console.log('['+chr+']', chr === "\n");
        //if(count > 5000) shortcircuit();
        if(chr === "\n") return '<br>';
        var foregroundList = codes.filter(function(code){
            return window.AsciiArtAnsi.is.it.foregroundcolor(code);
        });
        var backgroundList = codes.filter(function(code){
            return window.AsciiArtAnsi.is.it.backgroundcolor(code);
        });
        var foreground = foregroundList[foregroundList.length-1];
        var background = backgroundList[foregroundList.length-1];
        var style = '';
        //console.log('?', foreground, Color.value(foreground), background, Color.value(background), '|'+chr+'|')
        if(foreground) style += ' color: '+Color.value(foreground)+';';
        if(background) style += ' background-color: '+Color.value(background)+';';
        if(chr === " ") return '<span style="'+style+'">'+"&nbsp;"+'</span>';
        return '<span style="'+style+'">'+chr+'</span>';
    }, true);
    console.log('==', result);
    return result;
};
