
function SoilGrade(grade, c, phi, Ksat){
  this.grade = grade;
  this.c = c;
  this.phi = phi;
  this.Ksat = Ksat;
}

<!-- Return soil grade constants                   -->
<!-- Change variables here if it should be changed -->
function getSoilGrade(num){
  switch(num){
    case 1:
      return new SoilGrade(1, 50, 60, '1e-09');
    case 2:
      return new SoilGrade(2, 40, 50, '1e-08');
    case 3:
      return new SoilGrade(3, 30, 40, '5e-08');
    case 4:
      return new SoilGrade(4, 25, 33, '1e-07');
    case 5:
      return new SoilGrade(5, 21, 29, '1e-06');
    case 6:
      return new SoilGrade(6, 14, 23, '5e-05');
    default:
      return null;
  }
}