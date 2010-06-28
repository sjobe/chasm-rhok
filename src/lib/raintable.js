
function getTotalRainVolumeInMM(freq, dur){
  var frequency = [5, 10, 20, 50, 100, 200, 500];
  var duration = [1, 2, 3, 4, 5, 6, 10, 12, 24];

  var rainfall = new Array(duration.length);
  rainfall[0] = new Array(frequency.length);
  rainfall[0][0] = 60.96;
  rainfall[0][1] = 76;
  rainfall[0][2] = 90;
  rainfall[0][3] = 105;
  rainfall[0][4] = 110;
  rainfall[0][5] = 125;
  rainfall[0][6] = 140;
  rainfall[1] = new Array(frequency.length);
  rainfall[1][0] = 81.28;
  rainfall[1][1] = 100;
  rainfall[1][2] = 116;
  rainfall[1][3] = 140;
  rainfall[1][4] = 160;
  rainfall[1][5] = 170;
  rainfall[1][6] = 200;
  rainfall[2] = new Array(frequency.length);
  rainfall[2][0] = 95.25;
  rainfall[2][1] = 114;
  rainfall[2][2] = 132;
  rainfall[2][3] = 156;
  rainfall[2][4] = 180;
  rainfall[2][5] = 195;
  rainfall[2][6] = 216;
  rainfall[3] = new Array(frequency.length);
  rainfall[3][0] = 106.68;
  rainfall[3][1] = 124;
  rainfall[3][2] = 148;
  rainfall[3][3] = 172;
  rainfall[3][4] = 200;
  rainfall[3][5] = 224;
  rainfall[3][6] = 248;
  rainfall[4] = new Array(frequency.length);
  rainfall[4][0] = 114.3;
  rainfall[4][1] = 135;
  rainfall[4][2] = 160;
  rainfall[4][3] = 195;
  rainfall[4][4] = 210;
  rainfall[4][5] = 240;
  rainfall[4][6] = 270;
  rainfall[5] = new Array(frequency.length);
  rainfall[5][0] = 121.86;
  rainfall[5][1] = 138;
  rainfall[5][2] = 174;
  rainfall[5][3] = 198;
  rainfall[5][4] = 234;
  rainfall[5][5] = 252;
  rainfall[5][6] = 294;
  rainfall[6] = new Array(frequency.length);
  rainfall[6][0] = 152.4;
  rainfall[6][1] = 170;
  rainfall[6][2] = 200;
  rainfall[6][3] = 220;
  rainfall[6][4] = 250;
  rainfall[6][5] = 300;
  rainfall[6][6] = 340;
  rainfall[7] = new Array(frequency.length);
  rainfall[7][0] = 152.4;
  rainfall[7][1] = 168;
  rainfall[7][2] = 216;
  rainfall[7][3] = 246;
  rainfall[7][4] = 264;
  rainfall[7][5] = 312;
  rainfall[7][6] = 360;
  rainfall[8] = new Array(frequency.length);
  rainfall[8][0] = 182.88;
  rainfall[8][1] = 216;
  rainfall[8][2] = 252;
  rainfall[8][3] = 288;
  rainfall[8][4] = 336;
  rainfall[8][5] = 360;
  rainfall[8][6] = 432;
  
  var i;
  var j;
  for(i = 0; i < frequency.length; i++){
    if(freq == frequency[i]){
      break;
    }
  }
  
  for(var j = 0; j < duration.length; j++){
    if(dur == duration[j]){
      break;
    }
  }

  return rainfall[j][i];
}