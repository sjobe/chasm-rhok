using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Chasm
{
	public partial class PressureVizControl : UserControl
	{
		public PressureVizControl()
		{
			InitializeComponent();
		}

		public void CalcAndSetSize()
		{
			this.Size = new System.Drawing.Size(Globals.G.timeData.width * (Globals.G.cellSize + 1) + 256,
				Globals.G.timeData.height * (Globals.G.cellSize + 1) + 64);
		}

		private void PressureVizControl_Paint(object sender, PaintEventArgs e)
		{
			if (Globals.G.timeData != null) Globals.G.timeData.DrawPressure(e.Graphics);
		}
	}
}
