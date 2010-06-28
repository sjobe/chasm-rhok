using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace ChasmViz
{
	public partial class FrameControl : UserControl
	{
		public enum GraphTypeEnum { None = -1, Pressure = 0, Moisture = 1, Soil = 2 };

		//public UserControl insideControl;
		GraphTypeEnum graphType = GraphTypeEnum.Soil;
		//public int cellSize = 6;	// size of a block in the grid renderer
		public GraphStyle graphStyle = new GraphStyle();
		public FrameControl()
		{
			InitializeComponent();
		}

		public void SetInsideControl(GraphTypeEnum gt)
		{
			graphType = gt;
			if (Globals.G.mainForm.currentControlIndex == GraphTypeEnum.None) toolStripButton1.Text = "Maximize Graph";
			else toolStripButton1.Text = "Tile All Graphs";
		}

		private void FrameControl_Load(object sender, EventArgs e)
		{

		}

		private void FrameControl_Paint(object sender, PaintEventArgs e)
		{
		}

		// returns cellSize that will fit.
		public int CalcAndSetSize(int maxWidth, int maxHeight)
		{
			Size temp = new Size(0, 0);
			int tempCellSize = 20;
			do
			{
				tempCellSize--;
				int yBig = (int)(Globals.G.timeData.height * tempCellSize * 0.1f * 0.75f);
				yBig = Math.Min(yBig, 16);
				temp = new System.Drawing.Size((int)(Globals.G.timeData.width * tempCellSize) + yBig * 8 + 64,
					Globals.G.timeData.height * tempCellSize + 72 + toolStrip1.Height);
			} while ((temp.Width > maxWidth) || (temp.Height > maxHeight));
			this.Size = temp;
			temp.Height -= toolStrip1.Height;
			this.doubleBufferedPanel1.Size = temp;
			graphStyle.cellSize = tempCellSize;
			return graphStyle.cellSize;
		}

		private void doubleBufferedPanel1_Paint(object sender, PaintEventArgs e)
		{
			if (Globals.G.timeData != null)
			{
				if (graphType == GraphTypeEnum.Soil) Globals.G.timeData.DrawSoilType(e.Graphics, graphStyle);
				if (graphType == GraphTypeEnum.Moisture) Globals.G.timeData.DrawMoisture(e.Graphics, graphStyle);
				if (graphType == GraphTypeEnum.Pressure) Globals.G.timeData.DrawPressure(e.Graphics, graphStyle);
			}
			//e.Graphics.DrawLine(Pens.Black, 0, 0, Width, Height);
		}

		private void toolStripButton1_Click(object sender, EventArgs e)
		{
			if (Globals.G.mainForm.currentControlIndex != GraphTypeEnum.None)
			{
				Globals.G.mainForm.currentControlIndex = GraphTypeEnum.None;
			}
			else
			{
				Globals.G.mainForm.currentControlIndex = graphType;// GraphTypeEnum.Pressure;
			}
			Globals.G.mainForm.SetupControls();
		}

		private void gridInFrontToolStripMenuItem_Click(object sender, EventArgs e)
		{
			graphStyle.gridInFront = true;
			graphStyle.renderGrid = true;
			Refresh();
		}

		private void gridInBackToolStripMenuItem_Click(object sender, EventArgs e)
		{
			graphStyle.gridInFront = false;
			graphStyle.renderGrid = true;
			Refresh();
		}

		private void gridOffToolStripMenuItem_Click(object sender, EventArgs e)
		{
			graphStyle.renderGrid = false;
			Refresh();
		}

		private void cellSpacingToolStripMenuItem_Click(object sender, EventArgs e)
		{
			graphStyle.spacing = !cellSpacingToolStripMenuItem.Checked;
			Refresh();
		}

		private void toggleCircleToolStripMenuItem_Click(object sender, EventArgs e)
		{
			graphStyle.drawCircle = toggleCircleToolStripMenuItem.Checked;
			Refresh();
		}

	}
}
