function startTimeBelgium() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock1').innerHTML = h + ":" + m + ":" + s;
    
    var t = setTimeout(startTimeBelgium, 500);
}
function startTimeNewYork(){
    var today = new Date(newTimeZone(-4));
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock2').innerHTML = h + ":" + m + ":" + s;

    var t = setTimeout(startTimeNewYork, 500);
}
function newTimeZone(offset){
    var today = new Date();
    localTime = today.getTime();
    localOffset = today.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    newTime = utc + (3600000*offset);
    return newTime;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
window.addEventListener("load", function(){
    console.log("load");
    startTimeBelgium();
    startTimeNewYork();
});