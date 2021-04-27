 $(function () {
         var query = "hallo";
         guid = ($("#sessionId").text()).trim();
         ver =  ($("#version").text()).trim();

         $.ajax({
             type: 'post',
             url: 'process.php',
             data: {submit:true, message:query, sessionid: guid, version: ver},
             success: function (response) {
                 $("#message").removeAttr("disabled");
                 $('#message').focus();
                 var responseObj = JSON.parse(response);
                 var defaultResponse = null;
                 if(responseObj.defaultResponse){
                     defaultResponse = responseObj.defaultResponse;
                 }
                 var speech = responseObj.speech;
                 var messages = responseObj.messages;
                 var eoc = responseObj.isEndOfConversation;

                 var answerRow = jQuery('<div/>',{
                     'class':'row'
                 });
                 var answerCol = jQuery('<div/>',{
                     'class':'col'
                 });
                 var answerContainerDiv = jQuery('<div/>',{
                     'class':"float-left",
                     tabindex:0
                 });

                 $('#chat-text').append(answerRow);
                 $(answerRow).append(answerCol);
                 $(answerCol).append(answerContainerDiv);

                 var textFromDefaultResponse = defaultResponse;

                 var simpleResponseRow = jQuery('<div/>',{
                     class:'row'
                 });
                 var simpleResponseDiv = jQuery('<div/>',{
                     class:'textResponse'
                 });

                 $(simpleResponseRow).append(simpleResponseDiv);
                 $(simpleResponseDiv).html(md2html(textFromDefaultResponse));
                 $(answerContainerDiv).append(simpleResponseRow);

                 /*
                 if (textFromDefaultResponse && textFromDefaultResponse.trim()!==''){
                     renderDefaultResponse(textFromDefaultResponse,answerContainerDiv);
                 }
                 renderRichControls(messages, answerContainerDiv);
                 */

                 var objDiv = document.getElementById("chat-text");
                 objDiv.scrollTop = objDiv.scrollHeight;
             }
         });
 });


$(function () {

    $('form').on('submit', function (e) {
        var query = $("#message").val();
        guid = ($("#sessionId").text()).trim();
        ver = ($("#version").text()).trim();

        showUserText();
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'process.php',
            data: {submit:true, message:query, sessionid: guid, version: ver},
            success: function (response) {
                $("#message").removeAttr("disabled");
                $('#message').focus();
                var responseObj = JSON.parse(response);
                var defaultResponse = null;
                if(responseObj.defaultResponse){
                    defaultResponse = responseObj.defaultResponse;
                }
                var speech = responseObj.speech;
                var messages = responseObj.messages;
                var eoc = responseObj.isEndOfConversation;

                var answerRow = jQuery('<div/>',{
                    'class':'row'
                });
                var answerCol = jQuery('<div/>',{
                    'class':'col'
                });
                var answerContainerDiv = jQuery('<div/>',{
                    'class':"float-left",
                    tabindex:0
                });

                $('#chat-text').append(answerRow);
                $(answerRow).append(answerCol);
                $(answerCol).append(answerContainerDiv);


                var textFromDefaultResponse = defaultResponse;
                if (textFromDefaultResponse && textFromDefaultResponse.trim()!==''){
                    renderDefaultResponse(textFromDefaultResponse,answerContainerDiv);
                }
                renderRichControls(messages, answerContainerDiv);


                var isDisabled = $('#message').prop('disabled');
                if(eoc){
                    $('#message').attr("disabled","disabled");
                    $('#chat-text').append('<hr/>');
                    var divMessage = $('<div/>',{
                        class:'d-flex justify-content-center'
                    });
                    var btnStartOver = $('<button/>',{
                        class:'btn btn-sm',
                        text:'Start Over'
                    });
                    var textStartOver = $('<h5/>',{
                        html:'End of Conversation'
                    });
                    $(divMessage).append(textStartOver);
                    $(btnStartOver).css('margin-left','10px');
                    $(divMessage).append(btnStartOver);
                    $('#chat-text').append(divMessage);
                    $(btnStartOver).click(function(){
                        var textToSubmit = 'start over';
                        $("#message").val(textToSubmit);
                        $( "form" ).trigger( "submit" );
                        $(divMessage).addClass('disabledbutton')
                    });
                }
                var objDiv = document.getElementById("chat-text");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        });

    });


});

function postAjax(query,sessionid){
    $.ajax({
        type: 'post',
        url: 'process.php',
        data: {submit:true, message:query, sessionid: guid, version: ver},
        success: function (response) {
            $("#message").removeAttr("disabled");
            $('#message').focus();
            var responseObj = JSON.parse(response);
            var defaultResponse = null;
            if(responseObj.defaultResponse){
                defaultResponse = responseObj.defaultResponse;
            }
            var speech = responseObj.speech;
            var messages = responseObj.messages;
            var eoc = responseObj.isEndOfConversation;

            var answerRow = jQuery('<div/>',{
                'class':'row'
            });
            var answerCol = jQuery('<div/>',{
                'class':'col'
            });
            var answerContainerDiv = jQuery('<div/>',{
                'class':"float-left",
                tabindex:0
            });

            $('#chat-text').append(answerRow);
            $(answerRow).append(answerCol);
            $(answerCol).append(answerContainerDiv);


            var textFromDefaultResponse = defaultResponse;
            if (textFromDefaultResponse && textFromDefaultResponse.trim()!==''){
                renderDefaultResponse(textFromDefaultResponse,answerContainerDiv);
            }
            renderRichControls(messages, answerContainerDiv);


            var isDisabled = $('#message').prop('disabled');
            if(eoc){
                $('#message').attr("disabled","disabled");
                $('#chat-text').append('<hr/>');
                var divMessage = $('<div/>',{
                    class:'d-flex justify-content-center'
                });
                var btnStartOver = $('<button/>',{
                    class:'btn btn-sm btn-danger',
                    text:'Start Over'
                });
                var textStartOver = $('<h3/>',{
                    html:'End of Conversation'
                });
                $(divMessage).append(textStartOver);
                $(btnStartOver).css('margin-left','10px');
                $(divMessage).append(btnStartOver);
                $('#chat-text').append(divMessage);
                $(btnStartOver).click(function(){
                    var textToSubmit = 'start over';
                    $("#message").val(textToSubmit);
                    $( "form" ).trigger( "submit" );
                    $(divMessage).addClass('disabledbutton')
                });
            }
            var objDiv = document.getElementById("chat-text");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    });
}

function renderDefaultResponse(textFromDefaultResponse,parent){
    var simpleResponseRow = jQuery('<div/>',{
        class:'row'
    });
    var simpleResponseDiv = jQuery('<div/>',{
        class:'textResponse'
    });

    var defaultResponsePar = jQuery('<p>',{
      'html': md2html(textFromDefaultResponse)
    });

    dots(simpleResponseDiv);
    var milliseconds = delay(defaultResponsePar);
    setTimeout(function(){
        $(simpleResponseDiv).empty().append(defaultResponsePar);
        scrollTop();
      }, milliseconds);

    $(simpleResponseRow).append(simpleResponseDiv);
    parent.append(simpleResponseRow);
}

async function renderRichControls(data, parent){

    var i=0;
    var len = data.length;
    for(i=0;i<len;i++){
        if(data[i] && data[i].hasOwnProperty('platform')){
            if(data[i]['platform']==='ACTIONS_ON_GOOGLE'){
                if(data[i].hasOwnProperty('simpleResponses')){
                    await sleep(renderSimpleResponse(data[i],parent));
                }
                if(data[i].hasOwnProperty('basicCard')){
                    await sleep(renderBasicCard(data[i],parent));
                }
                if(data[i].hasOwnProperty('listSelect')){
                    renderList(data[i],parent);
                }
                if(data[i].hasOwnProperty('suggestions')){
                    renderSuggestionChips(data[i],parent);
                }
                if(data[i].hasOwnProperty('linkOutSuggestion')){
                    renderLinkOutSuggestion(data[i],parent);
                }
            }
            if(data[i]['type']==='list_card' &&
                data[i]['platform']==='ACTIONS_ON_GOOGLE'){
                renderList(data[i],parent);
            }
            if(data[i]['type']==='carousel_card' &&
                data[i]['platform']==='ACTIONS_ON_GOOGLE'){
                renderCarousel(data[i],parent);
            }
        }
    }

    for(i=0;i<len;i++){
        if(data[i] && data[i].hasOwnProperty('type')){
            if(data[i]['type']==='suggestion_chips' &&
                data[i]['platform']==='google'){
                renderSuggestionChips(data[i],parent);
            }
        }
    }

}

function renderList(data,parent){
    data = data['listSelect'];
    var i, len = data['items'].length;
    var listGroup = jQuery('<div/>',{
        'class':'list-group card gaListGroup'
    });
    if(data['title']){
        var titleOfCard = data['title'];
        var listGroupHeading = jQuery('<div/>',{
            'class':'gaListHeader card-header deep-orange lighten-1 white-text',
            'html':titleOfCard
        });
        listGroup.append(listGroupHeading);
    }
    for(i=0;i<len;i++){
        var item = data['items'][i];
        if(item){
            var optionTitle = item["title"];
            var optionDescription = item["description"];
            var optionKey = item['info']['key'];
            var imageUrl;
            if(item["image"]){
                imageUrl = item["image"]["imageUri"];
            }
            var anchor = jQuery('<a/>',{
                'data-key':optionKey,
                'class':'gaListItem list-group-item py-0 list-group-item-action flex-column ' +
                'align-items-start'
            });
            anchor.click(function(){
                if(window.currentSuggestionChips){
                    var buttonRow = window.currentSuggestionChips;
                    buttonRow.remove();
                    window.currentSuggestionChips = null;
                    $("#message").removeAttr("disabled");
                }
                var textToSubmit = $(this).attr('data-key');
                $("#message").val(textToSubmit);
                $( "form" ).trigger( "submit" );
                $(listGroup).addClass('disabledbutton');
            });
            var headingDiv = jQuery('<div/>',{
            });
            var heading = jQuery('<div/>',{
                'class':'card-title',
                'text':optionTitle
            });
            heading.css("font-weight","bold");
            var row = jQuery('<div/>',{
                'class':'row'
            });
            var colSpanText = 'col';
            if(imageUrl) colSpanText = 'col-8';
            var colText = jQuery('<div/>',{
                'class':colSpanText
            });
            var colImage =jQuery('<div/>',{
                'class':'col-4'
            });
            var para = jQuery('<p/>',{
                'class':'mb-1',
                'html':optionDescription
            });

            if(imageUrl){
                var img = jQuery('<img/>',{
                    'class':'img-fluid',
                    'src':imageUrl,
                    'width':'50px'
                });
                colImage.append(img);
            }
            row.append(colText);
            if(imageUrl) row.append(colImage);
            headingDiv.append(heading);
            headingDiv.append(para);
            colText.append(headingDiv);
            anchor.append(row);
            listGroup.append(anchor);
        }
    }
    parent.append(listGroup);
    $("#message").attr("disabled","disabled");
}

/* only needed for carousel
function renderCarousel(data,parent){
    var i, len = data['items'].length;
    var carouselContainer = jQuery('<div/>',{
        'width':'550px'
    });
    $(carouselContainer).addClass('gaCarousel');
    var listGroup = jQuery('<ul/>',{

    });
    for(i=0;i<len;i++){
        var item = data['items'][i];
        if(item){
            var optionTitle = truncateString(item["title"],20);
            var optionDescription = item["description"];
            var optionKey = item["optionInfo"]["key"];
            var imageUrl = item["image"]["url"];
            var listItem = jQuery('<li/>',{});
            var cardDiv = jQuery('<div/>',{
                'width':'200px'
            });
            $(cardDiv).addClass('gaCarouselItem');
            var anchor = jQuery('<a/>',{
                'data-key':optionKey,
                'class':'list-group-item list-group-item-action flex-column '+
                'align-items-start'
            });
            anchor.click(function(){
                if(window.currentSuggestionChips){
                    var buttonRow = window.currentSuggestionChips;
                    buttonRow.remove();
                    window.currentSuggestionChips = null;
                    $("#message").removeAttr("disabled");
                }
                var textToSubmit = $(this).attr('data-key');
                $("#message").val(textToSubmit);
                $( "form" ).trigger( "submit" );
                $(carouselContainer).addClass('disabledbutton');
            });
            var heading = jQuery('<div/>',{
                'class':'card-title',
                'text':md2html(optionTitle)
            });
            heading.css("font-weight","bold");
            var para = jQuery('<p/>',{
                'class':'mb-1',
                'html':md2html(optionDescription)
            });
            var divForImage = jQuery('<div/>',{
                'class':'card-title'
            });
            divForImage.css("height","100px");
            var img = jQuery('<img/>',{
                'class':'img-fluid',
                'src':imageUrl,
                'width':'100px'
            });
            img.css("margin-left","auto");
            img.css("margin-right","auto");
            img.css("display","block");
            divForImage.append(img);

            cardDiv.append(divForImage);
            anchor.append(heading);
            anchor.append(para);
            cardDiv.append(anchor);
            listItem.append(cardDiv);
            listGroup.append(listItem);
        }
    }
    parent.append(carouselContainer);
    carouselContainer.append(listGroup);
    $(listGroup).lightSlider({
        autoWidth:true
    });
    $("#message").attr("disabled","disabled");
}*/

function renderBasicCard(data,parent){
    data = data['basicCard'];

    var cardRow = jQuery('<div/>',{
        'class':'row'
    });

    var cardDiv = jQuery('<div/>',{
        'class':'basic-card'
    });

    var img = jQuery('<img/>',{
        'class':'gaCardImage',
        'src':data['image']['imageUri']
    });
    var cardBodyDiv = jQuery('<div/>',{
        'class':'card-body'
    });
    /*
    var strTitle = truncateString(data['title'],28);
    var cardTitleContainerDiv = jQuery('<h5/>',{
        'class':'card-title',
        'html':md2html(strTitle)
    });
    */

    var textContainerPara = jQuery('<p/>',{
        'class':'card-text',
        'display':'inline',
        'id':'card-text',
        'html':md2html(data['formattedText'])
    });

    var linkDiv = $('<div/>',{
      'class': 'textCenter'
    });
    var buttons_array = data['buttons'];
    if (typeof buttons_array !== 'undefined' && buttons_array.length > 0) {
        // the array is defined and has at least one element
        var link = $("<a>");
        link.attr('href',(data['buttons'][0])['openUriAction']['uri']);
        link.attr("title",(data['buttons'][0])['title']);
        link.text((data['buttons'][0])['title']);
        link.addClass("card-link");
        linkDiv.append(link);
    }

    parent.append(cardRow);
    cardRow.append(cardDiv);
    dots(cardDiv);
    var milliseconds = delay(textContainerPara);
    scrollTop();

   setTimeout(function(){
           cardDiv.empty().append(textContainerPara);
           cardDiv.append(img);
           cardDiv.append(linkDiv);
           scrollTop();
          },
          milliseconds);

    return milliseconds;


    /* original:
      cardDiv.empty().append(textContainerPara);
      cardDiv.append(img);
      //cardBodyDiv.append(cardTitleContainerDiv);
      //cardBodyDiv.append(textContainerPara);
      //cardBodyDiv.append(linkDiv);
      //cardDiv.append(cardBodyDiv);
      cardDiv.append(linkDiv);
    */


}

function md2html(input){
    var converter = new showdown.Converter();
    input = input.replace(/\n{2,}/g, m => m.replace(/\n/g, "<br/>"));
    input = input.replace(/<br\/>([^<])/g, "<br\/>\n\n$1");
    html      = converter.makeHtml(input);
    return html;
}

/*
 description = data.description.replace(/\n{2,}/g, m => m.replace(/\n/g, "<br/>"));
description = description.replace(/<br\/>([^<])/g, "<br\/>\n\n$1");
var html = converter.makeHtml(description);
*/

function renderSimpleResponse(data, parent){
    var simpleResponseDiv = jQuery('<div/>',{
        'class':'row'
    });
    var simpleResponseInnerDiv = jQuery('<div/>',{
        'class':'textResponse gaSimpleResponse'
    });
    var simpleResponseText = jQuery('<p/>',{
        html:md2html(data['simpleResponses']['simpleResponses'][0]['textToSpeech']),
        tabindex:1
    });

    simpleResponseDiv.append(simpleResponseInnerDiv);
    parent.append(simpleResponseDiv);
    dots(simpleResponseInnerDiv);
    scrollTop();

    var milliseconds = delay(simpleResponseText);

    setTimeout(function(){
        simpleResponseInnerDiv.empty().append(simpleResponseText);
        scrollTop();
      }, milliseconds);

    return milliseconds;



}

function renderLinkOutSuggestion(data, parent){
    data = data['linkOutSuggestion'];
    var linkoutDiv = jQuery('<div/>', {
        tabindex:1,
        'class': "card gaLinkOutSuggestion"
    });
    var linkoutInnerDiv = jQuery('<div/>',{
        'class':'card-body'
    });
    var linkOutAnchor = jQuery('<a/>',{
        text:data['destinationName']
    });
    $(linkOutAnchor).attr("href",data['uri']);
    $(linkOutAnchor).attr("target","_blank");
    $(linkOutAnchor).attr("title",data['destinationName']);
    linkoutDiv.append(linkoutInnerDiv);
    linkoutInnerDiv.append(linkOutAnchor);
    parent.append(linkoutDiv);
}

function renderSuggestionChips(data,parent){
    data = data['suggestions'];
    var i, len = data['suggestions'].length;
    var buttonRowDiv = jQuery('<div/>',{
        class:'row'
    });
    var suggestionChipRowDiv = jQuery('<div/>',{
        class:'gaSuggestionChipRow'
    });
    for (i = 0; i < len; i++) {
        if (data["suggestions"][i]) {
            //make a button for it
            var buttonText = data["suggestions"][i]['title'];
            var button = jQuery('<button/>',{
                //type:'button',
                class:'btn btn-primary btn-sm gaSuggestionChipButton',
                text:buttonText
            });

            button.click(function(){
                var textToSubmit = this.textContent;
                suggestionChipRowDiv.remove();
                window.currentSuggestionChips = null;
                $("#message").removeAttr("disabled");
                $("#message").val(textToSubmit);
                $( "form" ).trigger( "submit" );
            });
        }
        suggestionChipRowDiv.append(button);
    }

    $(buttonRowDiv).append(suggestionChipRowDiv);
    $(parent).append(buttonRowDiv);
    window.currentSuggestionChips = suggestionChipRowDiv;
    //also disable the manual input
    $("#message").attr("disabled","disabled");
    scrollTop();
}

function getValueByKey(key, data) {
    var i, len = data.length;

    for (i = 0; i < len; i++) {
        if (data[i] && data[i].hasOwnProperty(key)) {
            return data[i][key];
        }
    }

    return -1;
}

function sendGAEvent(category, action, label){

}

function showUserText(){

    var userMessageRow = jQuery('<div/>',{
        class:'row'
    });

    var userMessageCol = jQuery('<div/>',{
        'class':'col'
    });

    var userMessageDiv = jQuery('<div/>',{
        'class':"float-right",
    });

    var div = jQuery('<div/>', {
        text: $("#message").val(),
        'class': "rounded-div",
        tabindex:1
    });

    $(userMessageDiv).append(div);
    $(userMessageCol).append(userMessageDiv);
    $(userMessageRow).append(userMessageCol);
    $("#chat-text" ).append(userMessageRow);
    $("#message").val('');
}

function truncateString(input, charLimit){
    if(input.length > charLimit) {
        return input.truncate(charLimit)+"...";
    }
    else{
        return input;
    }
}

String.prototype.truncate = String.prototype.truncate ||
    function (n){
        return this.slice(0,n);
    }

function dots(parent){
    var dots = jQuery('<p/>',{
        'html': '<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>'
      });
    $(parent).append(dots);
}

function scrollTop(){
  var objDiv = document.getElementById("chat-text");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function delay(textContainer){
  var milliseconds = $(textContainer).text().length * 30;
  return milliseconds;
}

function sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function loadNameImage() {
  var ver = ($("#version").text()).trim();
  fetch("json/bot_setup.json")
    .then(response => response.json())
    .then(data => {
      for (let bot of data){
        if(bot.bot_id.toString() === ver){
          if(bot.bot_image === true){
            var img = $('<img/>',{
                'class':'bot_image',
                'src':bot.image_url
            });
          $("#head").append(img);
          }
          $("#head").append("&nbsp;"+bot.bot_name);
        }
      }
    }
  )
}

function directToIndex(bool){
  if(bool){
    window.open("index.php", "_self");
  }
}
