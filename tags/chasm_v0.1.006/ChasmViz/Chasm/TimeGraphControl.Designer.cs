﻿namespace ChasmViz
{
	partial class TimeGraphControl
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
			this.SuspendLayout();
			// 
			// TimeGraphControl
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.DoubleBuffered = true;
			this.Name = "TimeGraphControl";
			this.Size = new System.Drawing.Size(488, 150);
			this.Paint += new System.Windows.Forms.PaintEventHandler(this.TimeGraphControl_Paint);
			this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.TimeGraphControl_MouseMove);
			this.MouseDown += new System.Windows.Forms.MouseEventHandler(this.TimeGraphControl_MouseDown);
			this.MouseUp += new System.Windows.Forms.MouseEventHandler(this.TimeGraphControl_MouseUp);
			this.ResumeLayout(false);

		}

		#endregion
	}
}