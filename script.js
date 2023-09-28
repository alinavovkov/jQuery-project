const sel = selector => document.querySelector(selector);

$(document).ready(function () {
    mixDivElements();

    var firstSortable = false;

// to put elem of puzzles

    $(".draggablePiece").draggable({
        revert:"invalid",
        start:function() {
            if (!firstSortable) {
                startTimer();
                firstSortable = true;
            }
            if($(this).hasClass("droppedPiece"))
            {
                $(this).removeClass("droppedPiece");
                $(this).parent().removeClass("piecePresent");
            }
        },
        
        });
    $(".droppableSpace").droppable({
        start: function () {
            if (!firstSortable) {
                startTimer();
                firstSortable = true;
            }
        },
        accept:function(){
           return !$(this).hasClass("piecePresent") 
        },
        drop:function (event, ui) 
        {
           
           var draggableElement = ui.draggable;
           var droppedOn = $(this);
                                        
            droppedOn.addClass("piecePresent");
            $(draggableElement)
             .addClass("droppedPiece")
             .css({
                 top:0,
                 left:0,
                 position:"relative"
             }).appendTo(droppedOn);

        } 
    }); 
  
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let check = true;

// checking the correctly position of elem
    $('#check').on('click', function () {
        $('#checkResult').prop('disabled', true);

        for (let i = 0; i < $('.image-container').length; i++) {
            if ($('.draggablePiece').eq(i).prop('id') != numbers[i]) {
                check = false;
                break;
            }
        }
        if (check) {
            $('.message').css({
                'display': 'flex'
            })
            $('.checkInMessage').css({
                'display': 'none'
            })
            $('.message .timer').css({
                'display': 'none'
            })
            $('#messageTxt').html(`Woohoo, well done, you did it!`)
        }
        else {
            $('.message').css({
                'display': 'flex'
            })
            $('.checkInMessage').css({
                'display': 'none'
            })
            $('.message .timer').css({
                'display': 'none'
            })
            $('#messageTxt').html('You lose(')

        }
        check = true;

    })

// mixing elem of puzzle
    function mixDivElements() {
        var divElements = $("#start .image-piece");

        for (var i = divElements.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = divElements[i];
            divElements[i] = divElements[j];
            divElements[j] = temp;
        }

        $("#start").empty().append(divElements);
    };

// starting NEW game
    $("#new").click(function () {
        $('#checkResult').prop('disabled', true);
        mixDivElements();
        startTimer();
        location.reload();
    });


// timer
    var intervalID1, intervalID2;
    var time1 = 60;
    var time2 = 60;

    function startTimer() {
        intervalID1 = setInterval(() => {
            updateTimer(time1, '.timer:eq(0) #minutes', '.timer:eq(0) #seconds', intervalID1);
            time1--;
        }, 1000);

        intervalID2 = setInterval(() => {
            updateTimer(time2, '.timer:eq(1) #minutes', '.timer:eq(1) #seconds', intervalID2);
            time2--;
        }, 1000);
    }
    function updateTimer(time, minutesSelector, secondsSelector, intervalID) {
        const minutesDisplay = $(minutesSelector);
        const secondsDisplay = $(secondsSelector);

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        minutesDisplay.text(minutes < 10 ? '0' + minutes : minutes);
        secondsDisplay.text(seconds < 10 ? '0' + seconds : seconds);

        if (time === 0) {
            clearInterval(intervalID);
            $('.message').css({
                'display': 'flex'
            })
            $('.checkInMessage').css({
                'display': 'none'
            })
            $('.message .timer').css({
                'display': 'none'
            })
            $('#messageTxt').html('You lose(')
        }
    }
// start game
    $("#startButton").click(function () {
        startTimer();
        $(this).prop('disabled', true);
        $('#checkResult').prop('disabled', false);


    });
// close button in message
    $('#close').click(function () {
        $('.message').css({
            'display': 'none'
        })
    })

// check result button
    $('#checkResult').click(function () {
        $('#messageTxt').html(`You still have time, you sure?`)

        $('.message').css({
            'display': 'flex'
        })

    })
})


