const display = document.getElementById('clock');


// set audio for alarm
const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;

var lastRingedAlarm = '';
var snoozeCount = 0;

// Plays the alarm audio at correct time
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour}:${minutes}:${seconds}`;
    
    // check if the alarmList includes the current time , "now"
    // if yes, ringing() is called
    if(alarmList.includes(now)){
        ringing(now);
        lastRingedAlarm = now;
    } 
}


// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}   

//Snooze Button set to 5 minutes
function snooze() {
    if (lastRingedAlarm){
        if(snoozeCount>3){
            alert("You have already snoozed 3 times");
            snoozeCount = 0;
            return;
        }
        //firstly pause the audio
        audio.pause();
        
        //set snooze time below
        let alHours = lastRingedAlarm.substring(0,2);
        let alMinutes = lastRingedAlarm.substring(3,5);
        let alSeconds = lastRingedAlarm.substring(6,8);

        var snoozMinutes = 1;
        if  (Number(alMinutes) < 50)  {
            snoozMinutes += Number(alMinutes);
            alMinutes = String(snoozMinutes);
            alHours = alHours;

        } else if (Number(alMinutes) >= 50) {
            snoozMinutes = (Number(alMinutes)+snoozMinutes) - 60;
            if (snoozMinutes === 0 ){
                alMinutes = '00';            
            }else {
                alMinutes = '0' + String(snoozMinutes);
            }
                    
            alHours = Number(alHours) +1;
            String(alHours);
        }
        if(Number(alMinutes)<5 && Number(alMinutes) == 0){
            alMinutes = '0'+alMinutes;
        }
        const snoozedTime = `${alHours}:${alMinutes}:${alSeconds}`;
        const index = alarmList.indexOf(lastRingedAlarm);
        alarmList[index] = snoozedTime;
        alert(`Alarm snoozed to 5 Minutes`);
        remove(lastRingedAlarm);
        lastRingedAlarm = '';
        showNewAlarm(snoozedTime);
        snoozeCount ++; // to maintain count of snooze
        console.log(snoozeCount);
    }    
} 


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
function remove(value){
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

    // add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);