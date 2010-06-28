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
	public partial class MoistureVizControl : UserControl
	{
		public MoistureVizControl()
		{
			InitializeComponent();
		}

		public void CalcAndSetSize()
		{
			this.Size = new System.Drawing.Size(Globals.G.timeData.width * (Globals.G.cellSize + 1) + 256,
				Globals.G.timeData.height * (Globals.G.cellSize + 1) + 64);
		}

		private void MoistureVizControl_Paint(object sender, PaintEventArgs e)
		{
			if (Globals.G.timeData != null) Globals.G.timeData.DrawMoisture(e.Graphics);
		}
	}
}
