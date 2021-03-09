'use strict';

class NITimerLesson {

    constructor(
        elementTimer,
        secondsCounter,
        functionTimerEnd,
    ) {
        this.interval = null;
        this.elementTimer = elementTimer;
        this.secondCounter = secondsCounter;
        this.functionTimerEnd = functionTimerEnd;
        this.start()
    }

    start() {
        this.interval = setInterval( this.startTimer.bind(this), 1000 );
    }

    startTimer() {
        this.secondCounter--;
        if($(this.elementTimer).hasClass('stop-timer')){
            $(this.elementTimer).removeClass('stop-timer');
            this.elementTimer.html(' ');
            this.functionTimerEnd();
            window.clearInterval(this.interval);
        }
        else {
            if ( this.secondCounter > 0 ) {
                this.writeNewValToTimer();
            }
            else {
                $('body').addClass('submit');
                window.removeEventListener('beforeunload', beforeLoad);
        
                this.elementTimer.parents('.lesson-test').find('form').submit();
                this.elementTimer.html('Время Вышло!');
                this.functionTimerEnd();
                window.clearInterval(this.interval);
            }
        }
    }

    writeNewValToTimer() {
        this.elementTimer.html('Осталось времени: ' + this.toRightFormat());
        if(this.secondCounter<10){
            this.elementTimer.css('color', 'red');
        }
    }

    toRightFormat() {
        let h, m, s;
        h = Math.floor( this.secondCounter / 3600 );
        m = Math.floor( this.secondCounter / 60 ) % 60;
        s = this.secondCounter % 60;

        return h+ ':'+ m + ':' + s;
    }
}
