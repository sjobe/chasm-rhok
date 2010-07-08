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
	public partial class TimeGraphControl : UserControl
	{
		public TimeGraphControl()
		{
			InitializeComponent();
		}

		private void TimeGraphControl_Paint(object sender, PaintEventArgs e)
		{
			if (DesignMode) return;
			if ((Globals.G.timeData != null) && (Globals.G.timeData.NumTimes > 0)) Globals.G.timeData.DrawTimeLine(e.Graphics, ClientSize.Width, ClientSize.Height);
		}

		bool mouseDown = false;
		private void TimeGraphControl_MouseDown(object sender, MouseEventArgs e)
		{
//			this.Size = new Size(1400, this.Size.Height);
			mouseDown = true;
			Globals.G.timeData.CurrentTime = e.X - Globals.G.timeData.xIndent;
			((Form1)ParentForm).TimeChanged();
		}

		private void TimeGraphControl_MouseMove(object sender, MouseEventArgs e)
		{
			if (mouseDown)
			{
				Globals.G.timeData.CurrentTime = e.X - Globals.G.timeData.xIndent;
				((Form1)ParentForm).TimeChanged();
			}
		}

		private void TimeGraphControl_MouseUp(object sender, MouseEventArgs e)
		{
			mouseDown = false;
		}
	}
}
