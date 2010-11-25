namespace ChasmViz
{
	partial class FrameControl
	{
		/// <summary> 
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary> 
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Component Designer generated code

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrameControl));
			this.toolStrip1 = new System.Windows.Forms.ToolStrip();
			this.toolStripButton1 = new System.Windows.Forms.ToolStripButton();
			this.toolStripDropDownButton1 = new System.Windows.Forms.ToolStripDropDownButton();
			this.gridInFrontToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.gridInBackToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.gridOffToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.cellSpacingToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.toggleCircleToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.toggleWaterTableToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
			this.doubleBufferedPanel1 = new ChasmViz.DoubleBufferedPanel();
			this.toolStrip1.SuspendLayout();
			this.SuspendLayout();
			// 
			// toolStrip1
			// 
			this.toolStrip1.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
			this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripButton1,
            this.toolStripDropDownButton1});
			this.toolStrip1.Location = new System.Drawing.Point(0, 0);
			this.toolStrip1.Name = "toolStrip1";
			this.toolStrip1.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
			this.toolStrip1.Size = new System.Drawing.Size(398, 25);
			this.toolStrip1.TabIndex = 0;
			this.toolStrip1.Text = "toolStrip1";
			// 
			// toolStripButton1
			// 
			this.toolStripButton1.Alignment = System.Windows.Forms.ToolStripItemAlignment.Right;
			this.toolStripButton1.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
			this.toolStripButton1.Image = ((System.Drawing.Image)(resources.GetObject("toolStripButton1.Image")));
			this.toolStripButton1.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.toolStripButton1.Name = "toolStripButton1";
			this.toolStripButton1.Size = new System.Drawing.Size(61, 22);
			this.toolStripButton1.Text = "Maximize";
			this.toolStripButton1.Click += new System.EventHandler(this.toolStripButton1_Click);
			// 
			// toolStripDropDownButton1
			// 
			this.toolStripDropDownButton1.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
			this.toolStripDropDownButton1.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.gridInFrontToolStripMenuItem,
            this.gridInBackToolStripMenuItem,
            this.gridOffToolStripMenuItem,
            this.cellSpacingToolStripMenuItem,
            this.toggleCircleToolStripMenuItem,
            this.toggleWaterTableToolStripMenuItem});
			this.toolStripDropDownButton1.Image = global::ChasmViz.Properties.Resources.GridIcon;
			this.toolStripDropDownButton1.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.toolStripDropDownButton1.Name = "toolStripDropDownButton1";
			this.toolStripDropDownButton1.Size = new System.Drawing.Size(29, 22);
			this.toolStripDropDownButton1.Text = "toolStripDropDownButton1";
			this.toolStripDropDownButton1.ToolTipText = "Grid settings";
			// 
			// gridInFrontToolStripMenuItem
			// 
			this.gridInFrontToolStripMenuItem.Name = "gridInFrontToolStripMenuItem";
			this.gridInFrontToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.gridInFrontToolStripMenuItem.Text = "Grid in front";
			this.gridInFrontToolStripMenuItem.Click += new System.EventHandler(this.gridInFrontToolStripMenuItem_Click);
			// 
			// gridInBackToolStripMenuItem
			// 
			this.gridInBackToolStripMenuItem.Name = "gridInBackToolStripMenuItem";
			this.gridInBackToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.gridInBackToolStripMenuItem.Text = "Grid in back";
			this.gridInBackToolStripMenuItem.Click += new System.EventHandler(this.gridInBackToolStripMenuItem_Click);
			// 
			// gridOffToolStripMenuItem
			// 
			this.gridOffToolStripMenuItem.Name = "gridOffToolStripMenuItem";
			this.gridOffToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.gridOffToolStripMenuItem.Text = "Grid off";
			this.gridOffToolStripMenuItem.Click += new System.EventHandler(this.gridOffToolStripMenuItem_Click);
			// 
			// cellSpacingToolStripMenuItem
			// 
			this.cellSpacingToolStripMenuItem.CheckOnClick = true;
			this.cellSpacingToolStripMenuItem.Name = "cellSpacingToolStripMenuItem";
			this.cellSpacingToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.cellSpacingToolStripMenuItem.Text = "Cell Spacing";
			this.cellSpacingToolStripMenuItem.Click += new System.EventHandler(this.cellSpacingToolStripMenuItem_Click);
			// 
			// toggleCircleToolStripMenuItem
			// 
			this.toggleCircleToolStripMenuItem.Checked = true;
			this.toggleCircleToolStripMenuItem.CheckOnClick = true;
			this.toggleCircleToolStripMenuItem.CheckState = System.Windows.Forms.CheckState.Checked;
			this.toggleCircleToolStripMenuItem.Name = "toggleCircleToolStripMenuItem";
			this.toggleCircleToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.toggleCircleToolStripMenuItem.Text = "Toggle Circle";
			this.toggleCircleToolStripMenuItem.Click += new System.EventHandler(this.toggleCircleToolStripMenuItem_Click);
			// 
			// toggleWaterTableToolStripMenuItem
			// 
			this.toggleWaterTableToolStripMenuItem.Checked = true;
			this.toggleWaterTableToolStripMenuItem.CheckOnClick = true;
			this.toggleWaterTableToolStripMenuItem.CheckState = System.Windows.Forms.CheckState.Checked;
			this.toggleWaterTableToolStripMenuItem.Name = "toggleWaterTableToolStripMenuItem";
			this.toggleWaterTableToolStripMenuItem.Size = new System.Drawing.Size(177, 22);
			this.toggleWaterTableToolStripMenuItem.Text = "Toggle Water Table";
			this.toggleWaterTableToolStripMenuItem.Click += new System.EventHandler(this.toggleWaterTableToolStripMenuItem_Click);
			// 
			// doubleBufferedPanel1
			// 
			this.doubleBufferedPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.doubleBufferedPanel1.Location = new System.Drawing.Point(0, 25);
			this.doubleBufferedPanel1.Name = "doubleBufferedPanel1";
			this.doubleBufferedPanel1.Size = new System.Drawing.Size(398, 299);
			this.doubleBufferedPanel1.TabIndex = 1;
			this.doubleBufferedPanel1.Paint += new System.Windows.Forms.PaintEventHandler(this.doubleBufferedPanel1_Paint);
			this.doubleBufferedPanel1.MouseClick += new System.Windows.Forms.MouseEventHandler(this.doubleBufferedPanel1_MouseClick);
			// 
			// FrameControl
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.Controls.Add(this.doubleBufferedPanel1);
			this.Controls.Add(this.toolStrip1);
			this.DoubleBuffered = true;
			this.Name = "FrameControl";
			this.Size = new System.Drawing.Size(398, 324);
			this.Load += new System.EventHandler(this.FrameControl_Load);
			this.Paint += new System.Windows.Forms.PaintEventHandler(this.FrameControl_Paint);
			this.toolStrip1.ResumeLayout(false);
			this.toolStrip1.PerformLayout();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.ToolStrip toolStrip1;
		private System.Windows.Forms.ToolStripButton toolStripButton1;
		private DoubleBufferedPanel doubleBufferedPanel1;
		private System.Windows.Forms.ToolStripDropDownButton toolStripDropDownButton1;
		private System.Windows.Forms.ToolStripMenuItem gridInFrontToolStripMenuItem;
		private System.Windows.Forms.ToolStripMenuItem gridInBackToolStripMenuItem;
		private System.Windows.Forms.ToolStripMenuItem gridOffToolStripMenuItem;
		private System.Windows.Forms.ToolStripMenuItem cellSpacingToolStripMenuItem;
		private System.Windows.Forms.ToolStripMenuItem toggleCircleToolStripMenuItem;
		private System.Windows.Forms.ToolStripMenuItem toggleWaterTableToolStripMenuItem;
	}
}
