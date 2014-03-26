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

    // add speech bubble to share svg
    share.append(speech);
  });
}
