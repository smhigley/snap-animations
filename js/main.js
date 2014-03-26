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
        text = s.select('#text');

    // add speech bubble and text to share svg
    share.append(speech);
    share.append(text);

    //animate the speech bubble pointer
    var pointer = speech.select('#pointer');
    pointer.animate({
      transform: "t100,0"
    }, 600, mina.backin);
  });
}
