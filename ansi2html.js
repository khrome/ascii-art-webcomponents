

module.exports = function(str){
    var Color = window.AsciiArtAnsiColor;
    var result = window.AsciiArtAnsi.map(str, function(chr, codes, rowcol, pos, shortcircuit){
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
        if(foreground) style += ' color: '+Color.value(foreground)+';';
        if(background) style += ' background-color: '+Color.value(background)+';';
        if(chr === " ") return '<span style="'+style+'">'+"&nbsp;"+'</span>';
        return '<span style="'+style+'">'+chr+'</span>';
    }, true);
    return result;
};
