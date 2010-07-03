using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;

namespace ChasmViz
{
	public class LineSeg
	{
		public float2 a, b;

		public LineSeg(float2 start, float2 end)
		{
			a = start;
			b = end;
		}
	}
}
