// Snap SVG code

window.onload = function () {
  // wrap svg on page with Snap
  var share = Snap('#share-container');

  // load svg file
  Snap.load("img/animated-share.svg", function (s) {
    // now save some vector groups into variables
    var speech = s.select('#speech'),
        phone = s.select('#phone'),
        submit = s.select('#submit'),
        text = s.select('#text'),
        button = phone.select('#button'),
        speaker = phone.select('#speaker'),
        frame = phone.select("#frame"),
        screenbg = phone.select("#background");

    // hide phone frame and submit button
    // and set them up to be animated
    // but first we need the phone's bounding box
    var phonebox = screenbg.getBBox();
    console.log(phonebox);

    //now the transforms
    submit.transform("t0,-25");
    frame.transform("s0.85, 0.56, " + phonebox.cx + ", " + phonebox.y + " t0,19");
    screenbg.transform("s1, 0.75, " + phonebox.cx + ", " + phonebox.y );
    button.transform("s0,0");
    speaker.transform("s0,0");

    //now append the svg
    share.append(s);

    // let's break down the animations into steps that accept delay and animation length as args
    // 1. animate the speech bubble pointer
    function step1(delay, length) {
      var pointer = speech.select('#pointer');
      pointer.animate({
        transform: "t50,0"
      }, length, mina.backin);
    }

    // 2. animate the screen background
    function step2(delay, length) {
      setTimeout(function(){
        screenbg.animate({
          transform: "s1, 1"
        }, length, mina.elastic);
      }, delay);
    }

    // 3. animate the phone frame, part 1
    function step3(delay, length) {
      setTimeout(function(){
        frame.animate({
          transform: "s1, 0.85, " + phonebox.cx + ", " + phonebox.y + " t0,4"
        }, length, mina.linear);
      }, delay);
    }

    // 4. animate the phone frame, part 2 and slide the submit button down
    function step4(delay, length) {
      setTimeout(function(){
        frame.animate({
          transform: "s1,1 t0,0"
        }, length, mina.linear);

        submit.animate({
          transform: "t0,0"
        }, length, mina.linear);
      }, delay);
    }

    // 4. animate the speaker and button appearing
    function step5(delay, length) {
      setTimeout(function(){
        speaker.animate({
          transform: "s1,1"
        }, length, mina.linear);

        button.animate({
          transform: "s1,1"
        }, length + 100, mina.elastic);
      }, delay);
    }


    //now call the steps
    step1(0, 500);
    step2(500, 800);
    step3(800, 300);
    step4(1100, 300);
    step5(1400, 400);

  });
}
