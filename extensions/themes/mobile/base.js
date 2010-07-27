/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var jQT = new $.jQTouch();

var loader_src = '<img id="loader" src="extensions/themes/mobile/image/spinner.gif">'; // <small id="loader"></small>
var loader_small_src = '<small id="loader"><img src="extensions/themes/mobile/image/spinner.gif"></small>';
var selected_model = '';

//$("#navigation").bind('pageAnimationEnd', function(e, info){
//   getBase(e);
//});

function getBase(element){
    if( selected_model != $(element).attr('about') ){
        // select base
        selected_model = $(element).attr('about');
        var url = 'http://'+location.host+'/ontowiki/model/select/?m=' + $(element).attr('about');
        var title = $(element).text();
        //$(element).append(loader_small_src);
        $(element).attr("class","loading");

        $.get(url, function(data){
            $('#nav-title').text(title);
            navigationEvent('reset');

            $(document).bind("navigation.done", function(e, status){
                //$("#loader").remove();
                $(element).attr("class","");
                $(document).unbind(e);

                jQT.goTo("#nav", "slide");
            });
        })
    }else{
        jQT.goTo("#nav", "slide");
    }
}

function onNavigationEntryClick(entry){
    //$(entry).append(loader_small_src);
    $(entry).attr("class","loading");

    if($(entry).parent().attr('class') == "arrow"){
        $(document).bind("navigation.done", function(e, status){
            //$("#loader").remove();
            $(entry).attr("class","");
            $(document).unbind(e);
        });
        navigationEvent('navigateDeeper', $(entry).parent().attr('about'));
        //$("#loader").remove();
    }else{
        url = $(entry).attr('about');
        title = $(entry).text();
        $.get(url, function(data){
            $("#instance-title").text(title);
            $('#instance-content').html(data);
            //$("#loader").remove();
            $(entry).attr("class","");
            //navigationEvent('reset');

            jQT.goTo("#instance-list", "slide");
        })
    }
}

function pageList(entry){
    url = $(entry).attr('about');
    $.get(url, function(data){
        $('#instance-content').html(data);
    })
}

function onInstanceClick(entry){
    //$(entry).append(loader_src);
    $(entry).attr("class","loading");


    url = $(entry).attr('about');
    title = $(entry).text();
    $.get(url, function(data){
        $("#properties-title").text(title);
        $('#properties-content').html(data);
        //$("#loader").remove();
        $(entry).attr("class","");

        jQT.goTo("#properties-list", "slide");
    })
}

function addLoader(entry){
    //$(entry).html(loader_src);
    $(entry).attr("class","loading");
}