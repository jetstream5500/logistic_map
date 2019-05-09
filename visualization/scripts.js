window.onload = function() {
  drawLogistic()
}

function drawLogistic() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;

  console.log(width, height);

  var imageData = ctx.createImageData(width, height);

  var amin_input = document.getElementById("amin");
  var amax_input = document.getElementById("amax");
  var samples_input = document.getElementById("samples");

  var amin = Number(amin_input.value);
  var amax = Number(amax_input.value);
  // Catch error with input???
  if (amin >= amax) {
    var temp = amin
    amin = amax-0.1;
    max = amin+0.1;
  }
  var samples = Number(samples_input.value);
  var spacing = (amax-amin)/(samples-1);

  for (var i = amin; i<=amax; i+=spacing) {
    var fps = getLogisticFP(i);
    if (fps != undefined) {
      for (var j = 0; j<fps.length; j++) {
        fp = fps[j];
        pixelXs = [];
        pixelYs = [];

        // get pixelXs
        pixelXFloat = width * ((i-amin)/(amax-amin));
        pixelXs.push(Math.floor(pixelXFloat));
        pixelXs.push(Math.ceil(pixelXFloat));
        //console.log(pixelXs);

        pixelYFloat = height - (fp*height);
        pixelYs.push(Math.floor(pixelYFloat));
        pixelYs.push(Math.ceil(pixelYFloat));
        //console.log(pixelYs);

        for (var x_index = 0; x_index<2; x_index++) {
          for (var y_index = 0; y_index<2; y_index++) {
            var offset = pixelYs[y_index]*width*4 + pixelXs[x_index]*4;

            imageData.data[offset] = 20;
            imageData.data[offset+1] = 80;
            imageData.data[offset+2] = 255;
            imageData.data[offset+3] = 255;
          }
        }
      }
    } else {
      console.log(i);
    }
  }

  ctx.putImageData(imageData, 0, 0, 0, 0, width, height);
}


/* Returns the evaluation of x on the logistic map (for the given a) */
function logisticEq(x, a) {
  return a*x*(1-x);
}

/* Returns the fixed points of the logistic map for a given a */
function getLogisticFP(a, closeness=0.0001, iterations=1000) {
  var partial = 0.5;
  var prev = []

  for (var i = 0; i<iterations; i++) {
    partial = logisticEq(partial, a);

    for (var j = 0; j<prev.length; j++) {
      if (Math.abs(prev[j]-partial) < closeness) {
        return prev.slice(j)
      }
    }
    prev.push(partial);
  }
}
