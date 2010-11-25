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

		public bool ValidCellSelection()
		{
			if (selectedCellX < 0) return false;
			if (selectedCellY < 0) return false;
			if (selectedCellX >= timeData.width) return false;
			if (selectedCellY >= timeData.height) return false;
			return true;
		}

		public void SetSelectedCell(int screenX, int screenY, int cellSize)
		{
			selectedCellX = (int)Math.Ceiling(timeData.allHours[0].InverseTransX(screenX, cellSize)) - 1;
			selectedCellY = (int)Math.Ceiling(timeData.allHours[0].InverseTransY(screenY, cellSize)) - 1;
			if (selectedCellX < 0) selectedCellX = 0;
			if (selectedCellY < 0) selectedCellY = 0;
			if (selectedCellX >= timeData.width) selectedCellX = timeData.width - 1;
			if (selectedCellY >= timeData.height) selectedCellY = timeData.height - 1;
			mainForm.TimeChanged();
		}

		public TimeData timeData = new TimeData();
		public Form1 mainForm = null;
		public string graphNameA = "Fos";
		public string graphNameB = "Rainfall";
		public bool graphBOn = true;
		public int selectedCellX = 0;
		public int selectedCellY = 0;
		public FrameControl.GraphTypeEnum selectedGraph = FrameControl.GraphTypeEnum.Pressure;
	}
}
