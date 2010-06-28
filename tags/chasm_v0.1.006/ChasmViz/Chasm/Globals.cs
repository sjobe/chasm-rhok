using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChasmViz
{
	public class Globals
	{
		private static Globals singleton = null;
		public static Globals G
		{
			get { return Globals.singleton; }
			set { Globals.singleton = value; }
		}
		public Globals(Form1 parentForm)
		{
			if (singleton == null)
			{
				singleton = this;
				mainForm = parentForm;
			}
		}

		public TimeData timeData = new TimeData();
		public Form1 mainForm = null;
		public string graphNameA = "Fos";
		public string graphNameB = "Moisture";
		public bool graphBOn = true;
	}
}
