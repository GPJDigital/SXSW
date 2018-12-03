$(window).load(function () {

    var mouse = { x: 0, y: 0 };
    var o = { x: 0, y: 0 };
    var arraynow = [];
    var arrayactualx = [];
    var arrayactualy = [];
    var ml, mr, nt, nb;
    var top = 0, left = 0, num = 0, min = 1, sec = 5, empty;
    var coordinate, coordinateX, coordinateY;
    var flag = true;

    //  cordiante now	
    for (var i = 1; i < 10; i++) {
        coordinate = $('li:nth-child(' + i + ')').position();
        coordinateX = coordinate.left;
        coordinateY = coordinate.top;
        arraynow.push(coordinate);
    }

    //  cordinate actual
    for (var i = 0; i < 9; i++) {
        if ((i % 3 == 0) && (i != 0)) {
            top += 100;
            left = 0;
        }
        o.x = left;
        o.y = top;
        arrayactualx.push(o.x);
        arrayactualy.push(o.y);
        left += 100;
    }

    // get position empty Tile
    empty = $('li.empty').attr('id').substring(1, 2);
    o.x = arraynow[empty].left;
    o.y = arraynow[empty].top;

    // determine neighbor empty element 
    $('li').hover(function () {
        var bool = true;
        coordinate = $(this).position();
        coordinateX = coordinate.left;
        coordinateY = coordinate.top;

        ml = coordinateX - 100;
        if (arraynow[empty].left == ml && arraynow[empty].top == coordinateY) {
            $(this).addClass('neighbor');
            bool = false;
        }

        mr = coordinateX + 100;
        if (arraynow[empty].left == mr && arraynow[empty].top == coordinateY) {
            $(this).addClass('neighbor');
            bool = false;
        }

        nt = coordinateY - 100;
        if (arraynow[empty].left == coordinateX && arraynow[empty].top == nt) {
            $(this).addClass('neighbor');
            bool = false;
        }

        nb = coordinateY + 100;
        if (arraynow[empty].left == coordinateX && arraynow[empty].top == nb) {
            $(this).addClass('neighbor');
            bool = false;
        }

        if (bool) {
            $(this).removeClass('neighbor');
        }

        if (!flag) {
            $('li').removeClass('neighbor');
        }
    });

    // change place Tile 
    $('.puzzle li').click(function () {
        if (flag) {
            var p = $(this).position();
            mouse.x = p.left;
            mouse.y = p.top;

            var id = $(this).attr('id').substring(1, 2);

            ml = mouse.x - 100;
            if (o.x == ml && o.y == mouse.y) {
                o.x += 100;
                arraynow[id].left -= 100;
                arraynow[empty].left = o.x;
                $(this).css({ left: o.x - 100 + 'px' });
                $('li:nth-child(' + empty + ')').next().css({ left: o.x + 'px' });
            }

            mr = mouse.x + 100;
            if (o.x == mr && mouse.y == o.y) {
                o.x -= 100;
                arraynow[id].left += 100;
                arraynow[empty].left = o.x;
                $(this).css({ left: o.x + 100 + 'px' });
                $('li:nth-child(' + empty + ')').next().css({ left: o.x + 'px' });
            }

            nt = mouse.y - 100;
            if (o.y == nt && mouse.x == o.x) {
                o.y += 100;
                arraynow[id].top -= 100;
                arraynow[empty].top = o.y;
                $(this).css({ top: o.y - 100 + 'px' });
                $('li:nth-child(' + empty + ')').next().css({ top: o.y + 'px' });
            }

            nb = mouse.y + 100;
            if (o.y == nb && mouse.x == o.x) {
                o.y -= 100;
                arraynow[id].top += 100;
                arraynow[empty].top = o.y;
                $(this).css({ top: o.y + 100 + 'px' });
                $('li:nth-child(' + empty + ')').next().css({ top: o.y + 'px' });
            }

            test_End();
        }
    });

    var clock = $('.clock').FlipClock(5, {
        clockFace: 'MinuteCounter',
        countdown: true
    });

    //Mix puzzles and start timer
    function mixPuzzles() {
        clock.setCountdown(false);
        clock.start();
        flag = true;
        setTimeout(function () {
            $('#i0').css({ top: '', left: '' });
            $('#i1').css({ top: '', left: '' });
            $('#i2').css({ top: '', left: '' });
            $('#i3').css({ top: '', left: '' });
            $('#i4').css({ top: '', left: '' });
            $('#i5').css({ top: '', left: '' });
            $('#i6').css({ top: '', left: '' });
            $('#i7').css({ top: '', left: '' });
            $('#i8').css({ top: '', left: '' });
        }, 700);
    }

    //Show correct puzzle
    function startPuzzles() {
        //Complete puzzle
        $('#i0').css({ top: 0 + 'px', left: 0 + 'px' });
        $('#i1').css({ top: 0 + 'px', left: 100 + 'px' });
        $('#i2').css({ top: 0 + 'px', left: 200 + 'px' });
        $('#i3').css({ top: 100 + 'px', left: 0 + 'px' });
        $('#i4').css({ top: 100 + 'px', left: 100 + 'px' });
        $('#i5').css({ top: 100 + 'px', left: 200 + 'px' });
        $('#i6').css({ top: 200 + 'px', left: 0 + 'px' });
        $('#i7').css({ top: 200 + 'px', left: 100 + 'px' });
        $('#i8').css({ top: 200 + 'px', left: 200 + 'px' });
        //Lock puzzle
        flag = false;

        setTimeout(mixPuzzles, 5000);
    }
    startPuzzles();

    // Cheat button
    function cheatBtn() {
        // Fade in Button
        $('#cheat').fadeIn('slow');

        $('#cheat').click(function () {
            //Complete puzzle
            $('#i0').css({ top: 0 + 'px', left: 0 + 'px' });
            $('#i1').css({ top: 0 + 'px', left: 100 + 'px' });
            $('#i2').css({ top: 0 + 'px', left: 200 + 'px' });
            $('#i3').css({ top: 100 + 'px', left: 0 + 'px' });
            $('#i4').css({ top: 100 + 'px', left: 100 + 'px' });
            $('#i5').css({ top: 100 + 'px', left: 200 + 'px' });
            $('#i6').css({ top: 200 + 'px', left: 0 + 'px' });
            $('#i7').css({ top: 200 + 'px', left: 100 + 'px' });
            $('#i8').css({ top: 200 + 'px', left: 200 + 'px' });
            //Lock puzzle
            flag = false;
            //Display Message
            function cheatMsg() {
                alert('Boom! Your locker code is XXXX. Go grab your sneaks!');
            }
            setTimeout(cheatMsg, 500);
        });
    }


    // Test for end puzzle
    function test_End() {
        for (var i = 0; i < arraynow.length; i++) {
            if (Math.floor(arraynow[i].left) == arrayactualx[i] && Math.floor(arraynow[i].top) == arrayactualy[i]) {
                num++;
                if (num == 9) {
                    function showAndHide() {
                        $('.puzzle').fadeOut(2000);
                        setTimeout(function () {
                            $('#pass').fadeIn(1000);
                        }, 2000)
                    }
                    clock.stop();
                    setTimeout(showAndHide, 1000);
                }
            }
        }
        num = 0;
    };

});