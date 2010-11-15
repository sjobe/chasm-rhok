function SoilGrade(grade, c, phi, ksat) {
  this.grade = grade;
  this.c = c;
  this.phi = phi;
  this.ksat = ksat;
}

/*
Return soil grade constants
Change variables here if it should be changed
*/
function getSoilGrade(num)
{
    if ( '1' === num )
    {
        return new SoilGrade(1, 50, 60, '1e-09');
    }
    else if ( '2' === num )
    {
        return new SoilGrade(2, 40, 50, '1e-08');
    }
    else if ( '3' === num )
    {
        return new SoilGrade(3, 30, 40, '5e-08');
    }
    else if ( '4' === num )
    {
        return new SoilGrade(4, 25, 33, '1e-07');
    }
    else if ( '5' === num )
    {
        return new SoilGrade(5, 21, 29, '1e-06');
    }
    else if ( '6' === num )
    {
        return new SoilGrade(6, 14, 23, '5e-05');
    }
    else
    {
        return null;
    }
}