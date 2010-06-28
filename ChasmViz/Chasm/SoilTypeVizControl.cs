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
	public partial class SoilTypeVizControl : UserControl
	{
		public SoilTypeVizControl()
		{
			InitializeComponent();
		}

		private void CellControl_Load(object sender, EventArgs e)
		{
			if (this.DesignMode) return;

		}

		public void CalcAndSetSize()
		{
			this.Size = new System.Drawing.Size(Globals.G.timeData.width * (Globals.G.cellSize + 1) + 256,
				Globals.G.timeData.height * (Globals.G.cellSize + 1) + 64);
		}

		private void CellControl_Paint(object sender, PaintEventArgs e)
		{
			if (this.DesignMode) return;

			Graphics g = e.Graphics;
			if (Globals.G.timeData != null)
			{
				Globals.G.timeData.DrawSoilType(g);
			}
		}
	}
}
