using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows.Forms;

namespace ChasmViz
{
	public partial class Form1 : Form
	{
		Globals gTemp = null;
		FrameControl[] allContainers = new FrameControl[3];
		public FrameControl.GraphTypeEnum currentControlIndex = FrameControl.GraphTypeEnum.None;

		public Form1()
		{
			InitializeComponent();
			gTemp = new Globals(this);
			foreach (Control c in this.propertyGrid1.Controls)
			{
				c.MouseClick += new MouseEventHandler(propertyGrid1_MouseClick);
			}
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			// Load results file.
#if DEBUG
			Globals.G.timeData.LoadFile(@"D:\dev\RHOK_Chasm_SVN\casm-webUI\ChasmViz\chasm_IO_files\02_001.results");
#endif
			allContainers[0] = new FrameControl();
			allContainers[1] = new FrameControl();
			allContainers[2] = new FrameControl();
			FillOutComboBoxA();
			SetupControls();
		}

		Dictionary<string, string> graphFields = new Dictionary<string, string>();

		public void FillOutComboBoxA()
		{
			Type t = typeof(GridData);
			PropertyInfo[] props = t.GetProperties();
			toolStripComboBox1.Items.Clear();
			toolStripComboBox2.Items.Clear();
			graphFields.Clear();
			foreach (PropertyInfo p in props)
			{
				object[] attributes = p.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
				System.ComponentModel.DescriptionAttribute da = (System.ComponentModel.DescriptionAttribute)attributes[0];
				toolStripComboBox1.Items.Add(da.Description);
				toolStripComboBox2.Items.Add(da.Description);
				graphFields.Add(da.Description, p.Name);
			}
			toolStripComboBox2.Items.Add("Disable Graph");
			toolStripComboBox1.SelectedIndex = 0;
			toolStripComboBox2.SelectedIndex = 5;
		}

		public void SetupControls()
		{
			if (Globals.G.timeData == null) return;
			if (Globals.G.timeData.NumTimes == 0) return;
			numericUpDown1.Maximum = Globals.G.timeData.NumTimes;
			if (currentControlIndex == FrameControl.GraphTypeEnum.None)
			{
				allContainers[0].CalcAndSetSize(this.splitContainer2.Panel1.ClientSize.Width / 2 - 2,
					this.splitContainer2.Panel1.ClientSize.Height / 2 - 2);
				allContainers[1].CalcAndSetSize(this.splitContainer2.Panel1.ClientSize.Width / 2 - 2,
					this.splitContainer2.Panel1.ClientSize.Height / 2 - 2);
				allContainers[2].CalcAndSetSize(this.splitContainer2.Panel1.ClientSize.Width / 2 - 2,
					this.splitContainer2.Panel1.ClientSize.Height / 2 - 2);
				this.splitContainer2.Panel1.Controls.Clear();
				this.splitContainer2.Panel1.Controls.Add(allContainers[0]);
				this.splitContainer2.Panel1.Controls.Add(allContainers[1]);
				this.splitContainer2.Panel1.Controls.Add(allContainers[2]);
				allContainers[0].Location = new Point(0, 0);
				allContainers[1].Location = new Point(allContainers[0].Size.Width + 2, 0);
				allContainers[2].Location = new Point(0, allContainers[0].Size.Height + 2);
				allContainers[0].SetInsideControl(FrameControl.GraphTypeEnum.Pressure);
				allContainers[1].SetInsideControl(FrameControl.GraphTypeEnum.Moisture);
				allContainers[2].SetInsideControl(FrameControl.GraphTypeEnum.Soil);
			} else {
//				allContainers[(int)currentControlIndex] = new FrameControl();
				allContainers[(int)currentControlIndex].CalcAndSetSize(this.splitContainer2.Panel1.ClientSize.Width - 2,
					this.splitContainer2.Panel1.ClientSize.Height - 2);
				this.splitContainer2.Panel1.Controls.Clear();
				this.splitContainer2.Panel1.Controls.Add(allContainers[(int)currentControlIndex]);
				// center the control so it looks cool
				allContainers[(int)currentControlIndex].Location = new Point(
					(this.splitContainer2.Panel1.ClientSize.Width - allContainers[(int)currentControlIndex].Width)/2,
					(this.splitContainer2.Panel1.ClientSize.Height - allContainers[(int)currentControlIndex].Height) / 2);
				allContainers[(int)currentControlIndex].SetInsideControl(currentControlIndex);
			}
			TimeChanged();
		}

		private void openToolStripMenuItem_Click(object sender, EventArgs e)
		{
			OpenFileDialog openFileDialog1 = new OpenFileDialog();

			openFileDialog1.Filter = "results files (*.results)|*.results|All files (*.*)|*.*";
			//openFileDialog1.FilterIndex = 1;

			try
			{
				if (openFileDialog1.ShowDialog() == DialogResult.OK)
				{
					// Load results file.
					Globals.G.timeData = new TimeData();
					Globals.G.timeData.LoadFile(openFileDialog1.FileName);
					SetupControls();
					Refresh();
				}
			}
			catch (Exception ex)
			{
				MessageBox.Show("This could happen for a number of reasons.\n\nYou must load a file with a .result extension and there must be a .fos file and a .slip file in the same folder.\n\nYour files could also be corrupt or incomplete. Truth is, I'm not sure why it's not working, I just know it's not working.\n\nMaybe this will give you some idea:\n\n" + ex.Message, "File Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
			}
		}

		public void TimeChanged()
		{
			if (Globals.G.timeData == null) return;
			if (Globals.G.timeData.NumTimes == 0) return;
			toolStripLabel1.Text = "Time: (" + (Globals.G.timeData.CurrentTime + 1) + "/" + Globals.G.timeData.NumTimes + ") ";
			numericUpDown1.Value = Globals.G.timeData.CurrentTime + 1;
			propertyGrid1.SelectedObject = Globals.G.timeData.allHours[Globals.G.timeData.CurrentTime];
			Refresh();
		}

		private void numericUpDown1_ValueChanged(object sender, EventArgs e)
		{
			Globals.G.timeData.CurrentTime = (int)numericUpDown1.Value - 1;
			TimeChanged();
		}

		private void splitContainer2_Panel1_Resize(object sender, EventArgs e)
		{
			if (Globals.G == null) return;
			SetupControls();
		}

		private void propertyGrid1_SelectedGridItemChanged(object sender, SelectedGridItemChangedEventArgs e)
		{
//			Console.WriteLine(e.NewSelection.Label);
		}

		private void propertyGrid1_Click(object sender, EventArgs e)
		{
			Console.WriteLine(propertyGrid1.SelectedGridItem.Label);
		}

		private void propertyGrid1_MouseClick(object sender, MouseEventArgs e)
		{
//			Console.WriteLine("mouse" + propertyGrid1.SelectedGridItem.Label);
//			Globals.G.graphNameB = propertyGrid1.SelectedGridItem.Label;
//			Refresh();
		}

		private void toolStripComboBox1_SelectedIndexChanged(object sender, EventArgs e)
		{
			Globals.G.graphNameA = graphFields[(string)toolStripComboBox1.SelectedItem];
			Refresh();
		}

		private void toolStripComboBox2_SelectedIndexChanged(object sender, EventArgs e)
		{
			string selection = (string)toolStripComboBox2.SelectedItem;
			if (selection == "Disable Graph") Globals.G.graphBOn = false;
			else
			{
				Globals.G.graphBOn = true;
				Globals.G.graphNameB = graphFields[selection];
			}
			Refresh();
		}

	}
}
