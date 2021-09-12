
class drumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.kick = document.querySelector(".kick-sound");
        this.tom = document.querySelector(".tom-sound");
        this.openhat = document.querySelector(".openhat-sound");
        this.playbtn = document.querySelector(".play")
        this.index = 0;
        this.playing = null;
        this.selects = document.querySelectorAll("select")
        this.bpm = 150;//beats ber minute
        this.mutebtns = document.querySelectorAll(".mute");
        this.temposlider = document.querySelector(".tempo-slider");
    }
    activepad(){
        this.classList.toggle("active");
    }
    repeater(){
        let step = this.index % 6;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach((bar) => {
            bar.style.animation = `tackPlay 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('pad-kick')){
                    this.kick.currentTime = 0;
                    this.kick.play();
                }
                if(bar.classList.contains('pad-tom')){
                    this.tom.currentTime = 0;
                    this.tom.play();
                }
                if(bar.classList.contains('pad-openhat')){
                    this.openhat.currentTime = 0;
                    this.openhat.play();
                }
            }
        });
        this.index++;
    }
    startRepeat(){
        const intervers = (60 / this.bpm) * 1000;
        if(!this.playing){
        this.playing = setInterval(() => {
           this.repeater(); 
        }, intervers);
        this.playbtn.classList.add('active');
        this.playbtn.innerHTML = `stop <i class="fas fa-stop"></i>`;
        }
        else{
            clearInterval(this.playing);
            this.playing = null;
            this.playbtn.innerHTML = `play <i class="fas fa-play"></i>`;
            this.playbtn.classList.remove('active');
        }
    }
    soundChange(e){
        const name = e.target.name;
        const value = e.target.value;
        switch (name){
            case "kick-track" :
                this.kick.src = value;
                break;
            case "tom-select":
                this.tom.src = value;
                break;
            case "openhat-select":
                this.openhat.src = value;
                break;
        }
    }
    muteaduio(e){
        const muteindex = e.target.getAttribute("data-track");
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch (muteindex){
                case "0" :
                    this.kick.volume = 0;
                    break;
                case "1" :
                    this.tom.volume = 0;
                    break;
                case "2" :
                    this.openhat.volume = 0;
                    break;  
            }
        }else{
            switch (muteindex){
                case "0" :
                    this.kick.volume = 1;
                    break;
                case "1" :
                    this.tom.volume = 1;
                    break;
                case "2" :
                    this.openhat.volume = 1;
                    break;  
            }
        }
    }
    changeTempo(e){
        const temponumber = document.querySelector(".tempo-num");
        this.bpm = e.target.value;
        temponumber.innerHTML = e.target.value;
    }
    updatedTempo(){
        clearInterval(this.playing);
        this.playing = null;
        if(this.playbtn.classList.contains('active')){
            this.startRepeat();
        }
    }
}

const drum = new drumKit();

drum.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drum.soundChange(e);
    })
})
drum.pads.forEach(pad =>{
    pad.addEventListener('click', drum.activepad);
    pad.addEventListener('animationend',function(){
        this.style.animation = "";
    });
}
);
drum.playbtn.addEventListener('click',()=> {
    drum.startRepeat();
})

drum.mutebtns.forEach(btn => {
    btn.addEventListener('click' ,function(e){
        drum.muteaduio(e);
    })
})

drum.temposlider.addEventListener('input' , function(e){
    drum.changeTempo(e);
})
drum.temposlider.addEventListener('change' , function(){
    drum.updatedTempo();
})