using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace ChasmViz
{
	public class TimeData
	{
		private int currentTime = 0;

		public int CurrentTime
		{
			get { return currentTime; }
			set {
				currentTime = value;
				if (value >= allHours.Count) currentTime = allHours.Count - 1;
				if (value < 0) currentTime = 0;
			}
		}
		public int width, height;
		int[,] cellDefined;
		public List<GridData> allHours = new List<GridData>();

		float normalizeMin, normalizeMax;
		float timeNormalizeMinA, timeNormalizeMaxA;
		float timeNormalizeMinB, timeNormalizeMaxB;

		float[] timeDataA = null;
		float[] timeDataB = null;

		public int NumTimes
		{
			get { return allHours.Count; }
		}

		public void LoadFile(string filename)
		{
			if (!File.Exists(filename)) throw new Exception(filename + " not found");

			using (StreamReader sr = new StreamReader(new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.ReadWrite), Encoding.Default))
			{
				sr.ReadLine();
				int numVars = int.Parse(sr.ReadLine());
				for (int count = 0; count < numVars; count++) sr.ReadLine();	// throw away vars for now.
				string[] wh = sr.ReadLine().Split(" \t".ToCharArray());
				width = int.Parse(wh[1]);	// y, x
				height = int.Parse(wh[0]);
				for (int count = 0; count < width * height; count++) sr.ReadLine();	// throw away x coordinates
				for (int count = 0; count < width * height; count++) sr.ReadLine();	// throw away y coordinates
				cellDefined = new int[width, height];
				for (int x = 0; x < width; x++)
				{
					for (int y = 0; y < height; y++)
					{
						cellDefined[x, y] = int.Parse(sr.ReadLine());
					}
				}
				string[] timeStepLabel = sr.ReadLine().Split(" \t".ToCharArray());
				while (timeStepLabel.Length > 1)
				{
					allHours.Add(new GridData(width, height));
					GridData currentGrid = allHours[allHours.Count - 1];
					currentGrid.cells = new CellData[width, height];
					for (int x = 0; x < width; x++)
					{
						for (int y = 0; y < height; y++)
						{
							currentGrid.cells[x, y] = new CellData();
							currentGrid.cells[x, y].moisture = float.Parse(sr.ReadLine());
						}
					}
					for (int x = 0; x < width; x++)
					{
						for (int y = 0; y < height; y++)
						{
							currentGrid.cells[x, y].poreWaterPressure = float.Parse(sr.ReadLine());
						}
					}
					for (int x = 0; x < width; x++)
					{
						for (int y = 0; y < height; y++)
						{
							currentGrid.cells[x, y].soilType = int.Parse(sr.ReadLine());
						}
					}
					string tempString = sr.ReadLine();
					if (tempString != null)
						timeStepLabel = tempString.Split(" \t".ToCharArray());
					else
						timeStepLabel = new string[1];
				}
				sr.Close();
			}

			// load the fos file.
			filename = filename.Replace(".results", ".fos");
			if (!File.Exists(filename)) throw new Exception(filename + " not found");

			using (StreamReader sr = new StreamReader(new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.ReadWrite), Encoding.Default))
			{
				string line = sr.ReadLine();
				string[] tokens = line.Split(" \t".ToCharArray());
				int index = 0;
				while (tokens != null)
				{
					if (tokens[0] != "End")
					{
					}
					line = sr.ReadLine();
					if (line != null)
					{
						// .fos file info
						tokens = line.Split(" \t".ToCharArray());
						allHours[index].Fos = float.Parse(tokens[1]);
						allHours[index].CentreX = float.Parse(tokens[3]);
						allHours[index].CentreY = float.Parse(tokens[4]);
						allHours[index].Radius = float.Parse(tokens[5]);
						allHours[index].Mass = float.Parse(tokens[6]);
						allHours[index].Moisture = float.Parse(tokens[7]);
						allHours[index].Influx = float.Parse(tokens[8]);	// conversion on this???
						// convert from meters/second to millimeters/hour
						allHours[index].Rainfall = float.Parse(tokens[9])*3600*1000;
						allHours[index].Runout = float.Parse(tokens[10]);
						allHours[index].Seismicity = float.Parse(tokens[11]);
					}
					else
						tokens = null;
					index++;
					if (index >= this.NumTimes) break;
				}
			}

			// calculate pressure normalization across all time
			normalizeMin = float.MaxValue;
			normalizeMax = float.MinValue;
			for (int count = 0; count < NumTimes; count++)
			{
				float minTemp, maxTemp;
				allHours[count].CalcMinMaxPressure(out minTemp, out maxTemp);
				if (minTemp < 9999)
				{
					normalizeMin = Math.Min(normalizeMin, minTemp);
					normalizeMax = Math.Max(normalizeMax, maxTemp);
				}
			}
		}

		public void DrawSoilType(Graphics g, GraphStyle graphStyle)
		{
			GridData currentGrid = allHours[currentTime];
			currentGrid.DrawSoilType(g, graphStyle);
		}

		public void DrawPressure(Graphics g, GraphStyle graphStyle)
		{
			allHours[currentTime].DrawPressure(g, normalizeMin, normalizeMax, graphStyle);
		}

		public void DrawMoisture(Graphics g, GraphStyle graphStyle)
		{
			allHours[currentTime].DrawMoisture(g, graphStyle);
		}

		public float TransAY(float startY)
		{
			// normalize range to 0..1
			float normY = (startY - timeNormalizeMinA) / (timeNormalizeMaxA - timeNormalizeMinA);
			// screen transform
			normY = (controlHeight - yIndent) - normY * (controlHeight - yIndent);
			return normY;
		}

		public float TransBY(float startY)
		{
			// normalize range to 0..1
			float normY = (startY - timeNormalizeMinB) / (timeNormalizeMaxB - timeNormalizeMinB);
			// screen transform
			normY = (controlHeight - yIndent) - normY * (controlHeight - yIndent);
			return normY;
		}

		public float GetValueA(int time)
		{
			Type t = allHours[time].GetType();
			PropertyInfo p = t.GetProperty(Globals.G.graphNameA);
			float pv = (float)p.GetValue(allHours[time], null);
			return pv;
		}

		public float GetValueB(int time)
		{
			Type t = allHours[time].GetType();
			PropertyInfo p = t.GetProperty(Globals.G.graphNameB);
			float pv = (float)p.GetValue(allHours[time], null);
			return pv;
		}

		public string GetDescriptionA()
		{
			Type t = typeof(GridData);
			PropertyInfo p = t.GetProperty(Globals.G.graphNameA);
			object[] attributes = p.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
			System.ComponentModel.DescriptionAttribute da = (System.ComponentModel.DescriptionAttribute)attributes[0];
			return da.Description;
		}

		public string GetDescriptionB()
		{
			Type t = typeof(GridData);
			PropertyInfo p = t.GetProperty(Globals.G.graphNameB);
			object[] attributes = p.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
			System.ComponentModel.DescriptionAttribute da = (System.ComponentModel.DescriptionAttribute)attributes[0];
			return da.Description;
		}

		public void RefreshGraphDataA()
		{
			// Start by finding min and max over time so we can normalize the graph.
			timeNormalizeMinA = float.MaxValue;
			timeNormalizeMaxA = float.MinValue;
			for (int count = 0; count < NumTimes; count++)
			{
				timeNormalizeMinA = Math.Min(timeNormalizeMinA, GetValueA(count));
				timeNormalizeMaxA = Math.Max(timeNormalizeMaxA, GetValueA(count));
			}
			timeNormalizeMinA -= (timeNormalizeMaxA - timeNormalizeMinA) * 0.25f;
			timeNormalizeMaxA += (timeNormalizeMaxA - timeNormalizeMinA) * 0.25f;
			if (timeNormalizeMinA == timeNormalizeMaxA)
			{
				timeNormalizeMinA -= 0.1f;
				timeNormalizeMaxA += 0.1f;
			}
			timeDataA = new float[NumTimes];
			for (int count = 0; count < NumTimes; count++)
			{
				timeDataA[count] = GetValueA(count);
			}
		}

		public void RefreshGraphDataB()
		{
			// Start by finding min and max over time so we can normalize the graph.
			timeNormalizeMinB = float.MaxValue;
			timeNormalizeMaxB = float.MinValue;
			for (int count = 0; count < NumTimes; count++)
			{
				timeNormalizeMinB = Math.Min(timeNormalizeMinB, GetValueB(count));
				timeNormalizeMaxB = Math.Max(timeNormalizeMaxB, GetValueB(count));
			}
			timeNormalizeMinB -= (timeNormalizeMaxB - timeNormalizeMinB) * 0.25f;
			timeNormalizeMaxB += (timeNormalizeMaxB - timeNormalizeMinB) * 0.25f;
			if (timeNormalizeMinB == timeNormalizeMaxB)
			{
				timeNormalizeMinB -= 0.1f;
				timeNormalizeMaxB += 0.1f;
			}
			timeDataB = new float[NumTimes];
			for (int count = 0; count < NumTimes; count++)
			{
				timeDataB[count] = GetValueB(count);
			}
		}

		public int xIndent = 88;
		public int yIndent = 16;
		int controlHeight;
		public void DrawTimeLine(Graphics g, int controlWidth, int controlHeight)
		{
			this.controlHeight = controlHeight;
			RefreshGraphDataA();
			RefreshGraphDataB();
			DrawGraphLines(g, controlWidth, controlHeight);

			// Graph B
			PointF[] allPoints = new PointF[NumTimes];
			if ( (Globals.G.graphBOn) && (timeNormalizeMaxB != timeNormalizeMinB) )
			{
				if (Globals.G.graphNameB == "Rainfall")
				{
					Rectangle[] allRects = new Rectangle[NumTimes];
					SolidBrush b = new SolidBrush(Color.FromArgb(64, 0, 0, 255));
					for (int count = 0; count < NumTimes; count++)
					{
						int yPos = (int)TransBY(timeDataB[count]);
						int rectH = (int)TransBY(timeNormalizeMinB) - yPos;
						allRects[count] = new Rectangle(count + xIndent, yPos, 1, rectH);
					}
					g.FillRectangles(b, allRects);
					b.Dispose();
				}

				for (int count = 0; count < NumTimes; count++)
				{
					allPoints[count] = new PointF(count + xIndent, (int)TransBY(timeDataB[count]));
				}
				g.DrawLines(Pens.Blue, allPoints);
				DrawStringBold(g, GetDescriptionB(), NumTimes + xIndent + 68, yIndent/2, Color.Blue);
			}

			// Graph A
			if (timeNormalizeMaxA != timeNormalizeMinA)
			{
				for (int count = 0; count < NumTimes; count++)
				{
					allPoints[count] = new PointF(count + xIndent, (int)TransAY(timeDataA[count]));
				}
				g.DrawLines(Pens.Red, allPoints);
				DrawStringBold(g, GetDescriptionA(), xIndent - 80, yIndent / 2, Color.Red);
			}

			int graphHeight = controlHeight - yIndent * 2;
			g.DrawLine(Pens.Black, CurrentTime + xIndent, 0, CurrentTime + xIndent, graphHeight + yIndent);
		}

		// Draw a string to the screen at a certain x, y position
		private void DrawString(System.Drawing.Graphics g, string drawString, int x, int y, Color c1)
		{
			System.Drawing.Font drawFont = new System.Drawing.Font("Courier New", 8.0f);
			System.Drawing.SolidBrush drawBrush = new System.Drawing.SolidBrush(c1);
			g.DrawString(drawString, drawFont, drawBrush, x, y);
			drawFont.Dispose();
			drawBrush.Dispose();
		}

		// Draw a string to the screen at a certain x, y position
		private void DrawStringBold(System.Drawing.Graphics g, string drawString, int x, int y, Color c1)
		{
			System.Drawing.Font drawFont = new System.Drawing.Font("Arial Bold", 14.0f);
			System.Drawing.SolidBrush drawBrush = new System.Drawing.SolidBrush(c1);
			g.DrawString(drawString, drawFont, drawBrush, x, y, new StringFormat(StringFormatFlags.DirectionVertical));
			drawFont.Dispose();
			drawBrush.Dispose();
		}

		void DrawGraphLines(Graphics g, int controlWidth, int controlHeight)
		{
			//int cellSize = Globals.G.cellSize;
			// draw grid lines
			int graphHeight = controlHeight - yIndent*2;
			int graphWidth = controlWidth  - xIndent*2;
			for (int count = 0; count <= NumTimes; count += 60)	// ticks on X axis
			{
				int xPos = count + xIndent;
				int yPos = graphHeight + yIndent - (yIndent/2);
				g.DrawLine(Pens.Gray, xPos, yPos,
					xPos, yPos+yIndent);
				DrawString(g, count.ToString(), xPos, yPos + 8, Color.Black);
			}
			// ticks along Y axis for graph A
			for (float count = timeNormalizeMinA; count < timeNormalizeMaxA; count += (timeNormalizeMaxA-timeNormalizeMinA)*0.125f)
			{
				int xPos = xIndent - 8;
				int yPos = (int)TransAY(count);
				g.DrawLine(new Pen(Color.FromArgb(255,224,224)), xPos, yPos, xIndent + NumTimes, yPos);
				g.DrawLine(Pens.Red, xPos, yPos, xPos + 16, yPos);
				DrawString(g, count.ToString("F2"), xIndent - 48, yPos - 2, Color.Red);
			}
			// Draw line at 1.0, where factor of safety is at a landslide threshold
			int yPos0 = (int)TransAY(1.0f);
			SolidBrush b = new SolidBrush(Color.FromArgb(64, 255, 0, 0));
			if ((Globals.G.graphNameA == "Fos") && (1.0f >= timeNormalizeMinA) && (1.0f <= timeNormalizeMaxA))
			{
				g.FillRectangle(b, xIndent, yPos0, NumTimes, TransAY(timeNormalizeMinA)-yPos0);
				g.DrawLine(Pens.Red, xIndent, yPos0, xIndent + NumTimes, yPos0);
			}
			b.Dispose();

			if (Globals.G.graphBOn)
			{
				// ticks along Y axis for graph B
				for (float count = timeNormalizeMinB; count < timeNormalizeMaxB; count += (timeNormalizeMaxB - timeNormalizeMinB) * 0.125f)
				{
					int xPos = NumTimes + xIndent - 8;
					int yPos = (int)TransBY(count);
					//g.DrawLine(new Pen(Color.FromArgb(255, 224, 224)), xPos, yPos, xIndent + NumTimes, yPos);
					g.DrawLine(Pens.Blue, xPos, yPos, xPos + 16, yPos);
					DrawString(g, count.ToString("F2"), NumTimes + xIndent + 24, yPos - 2, Color.Blue);
				}
				g.DrawLine(Pens.Blue, xIndent + NumTimes, 0, xIndent + NumTimes, graphHeight + yIndent);
			}
			g.DrawLine(Pens.Red, xIndent, 0, xIndent, graphHeight + yIndent);
			g.DrawLine(Pens.Gray, xIndent, graphHeight + yIndent, NumTimes + xIndent, graphHeight + yIndent);
		}

	}
}
