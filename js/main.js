// Snap SVG code

window.onload = function () {
  // share phone code
  // wrap share svg on page with Snap
  var share = Snap('#share-container');

  // load svg file
  Snap.load("img/animated-share.svg", function (s) {
    // now save some vector groups into variables
    var speech = s.select('#speech'),
        pointer = speech.select('#pointer'),
        phone = s.select('#phone'),
        submit = s.select('#submit'),
        text = s.select('#text'),
        button = phone.select('#button'),
        speaker = phone.select('#speaker'),
        frame = phone.select("#frame"),
        screenbg = phone.select("#background"),
        animating = false;

    // we also need the phone's bounding box for some calculations
    var phonebox = screenbg.getBBox();

    //now transform the paths to their pre-animation state
    function reset() {
      pointer.transform("t0,0");
      submit.transform("t0,-25");
      frame.transform("s0.85, 0.56, " + phonebox.cx + ", " + phonebox.y + " t0,19");
      screenbg.transform("s1, 0.75, " + phonebox.cx + ", " + phonebox.y );
      button.transform("s0,0");
      speaker.transform("s0,0");
    }

    // let's break down the animations into steps that accept delay and animation length as args
    // 1. animate the speech bubble pointer
    function step1(delay, length) {
      animating = true;
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

    // 5. animate the speaker and button appearing
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

    // 6. button press
    function step6(delay, length) {
      var submit_bg = submit.select('#button_top'),
          submit_text = submit.select('#submit-text');
      var button_top = submit.group(submit_bg, submit_text);
      setTimeout(function(){
        //button down
        button_top.animate({
          transform: "t0,3"
        }, length/2, mina.easein, function(){
          //button up
          button_top.animate({
            transform: "t0,0"
          }, length/2, mina.easeout, function(){ animating = false; });
        });
      }, delay);
    }

    // group all the steps in a function
    function animate_share() {
      step1(0, 500);
      step2(500, 800);
      step3(800, 300);
      step4(1100, 300);
      step5(1400, 400);
      step6(1800, 200);
    }

    // on load, first reset the paths
    reset()
    //now append the svg
    share.append(s);
    // animate once
    animate_share();

    // then animate when hovered
    phone.mouseover(function() {
      if(!animating) {
        reset();
        animate_share();
      }
    });

  });

}
