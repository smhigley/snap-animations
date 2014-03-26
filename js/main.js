// Snap SVG code

window.onload = function () {
  // wrap svg on page with Snap
  var share = Snap('#share');

  // load svg file
  Snap.load("img/animated-share.svg", function (s) {
    // now save some vector groups into variables
    var speech = s.select('#speech'),
        phone = s.select('#phone'),
        submit = s.select('#submit'),
        text = s.select('#text'),
        button = phone.select('#button'),
        speaker = phone.select('#speaker');

    // hide phone frame and submit button
    // and set them up to be animated
    // but first we need the phone's bounding box
    var bbox = phone.getBBox();

    //now the transforms
    submit.transform("t0,-25");
    phone.select('#frame').transform("s0.85, 0.5, " + bbox.cx + "," + bbox.cy);
    phone.select('#background').transform("s0, 0.75, " + bbox.cx + ", " + "0" );
    button.transform("s0");
    speaker.transform("s0");

    //now append the svg
    share.append(s.selectAll("g"));

    // animate the speech bubble pointer
    var pointer = speech.select('#pointer');
    pointer.animate({
      transform: "t50,0"
    }, 500, mina.backin);

  });
}
