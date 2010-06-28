using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.ComponentModel;

namespace ChasmViz
{
	public class GridData
	{
		int width, height;
		public CellData[,] cells;

		int xIndent = 32;
		int yIndent = 32;

		// .fos file info
		private float fos;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Factor Of Safety")]
		public float Fos
		{
			get { return fos; }
			set { fos = value; }
		}
		private float centreX;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Centre X")]
		public float CentreX
		{
			get { return centreX; }
			set { centreX = value; }
		}
		private float centreY;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Centre Y")]
		public float CentreY
		{
			get { return centreY; }
			set { centreY = value; }
		}
		private float radius;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Radius")]
		public float Radius
		{
			get { return radius; }
			set { radius = value; }
		}
		private float mass;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Mass")]
		public float Mass
		{
			get { return mass; }
			set { mass = value; }
		}
		private float moisture;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Moisture")]
		public float Moisture
		{
			get { return moisture; }
			set { moisture = value; }
		}
		private float influx;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Influx")]
		public float Influx
		{
			get { return influx; }
			set { influx = value; }
		}
		private float precip;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Precipitation")]
		public float Precip
		{
			get { return precip; }
			set { precip = value; }
		}
		private float runout;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Runout")]
		public float Runout
		{
			get { return runout; }
			set { runout = value; }
		}
		private float seismicity;
		[CategoryAttribute("Hourly data"),
		DescriptionAttribute("Seismicity")]
		public float Seismicity
		{
			get { return seismicity; }
			set { seismicity = value; }
		}

		public GridData(int w, int h)
		{
			width = w;
			height = h;
		}

		// staticly initialize the rainbow palette for visualization.
		static int[] palette = new int[256];
		static GridData()
		{
			for (int count = 0; count < 64; count++)
			{
				unchecked
				{
					palette[count] = (int)0xff000000 | ((count * 4) << 8) | (255 << 0);
					palette[count + 64] = (int)0xff000000 | (255 << 8) + ((255 - count * 4) << 0);
					palette[count + 128] = (int)0xff000000 | (255 << 8) + ((count * 4)<<16);
					palette[count + 192] = (int)0xff000000 | ((255 - count * 4) << 8) | (255 << 16);
				}
			}
		}

		public void CalcMinMaxPressure(out float min, out float max)
		{
			min = float.MaxValue;
			max = float.MinValue;
			for (int y = 0; y < height; y++)
			{
				for (int x = 0; x < width; x++)
				{
					float current = cells[x, y].poreWaterPressure;
					if (current < 9999)
					{
						if (current < min) min = current;
						if (current > max) max = current;
					}
				}
			}
		}

		// Draw a string to the screen at a certain x, y position
		private void DrawString(System.Drawing.Graphics g, string drawString, int x, int y, Color c1)
		{
			System.Drawing.Font drawFont = new System.Drawing.Font("Courier New", 9.75f);
			System.Drawing.SolidBrush drawBrush = new System.Drawing.SolidBrush(c1);
			g.DrawString(drawString, drawFont, drawBrush, x, y);
			drawFont.Dispose();
			drawBrush.Dispose();
		}

		private void DrawString(System.Drawing.Graphics g, string drawString, int x, int y, Color c1, string font, float fontSize)
		{
			System.Drawing.Font drawFont = new System.Drawing.Font(font, fontSize);
			System.Drawing.SolidBrush drawBrush = new System.Drawing.SolidBrush(c1);
			g.DrawString(drawString, drawFont, drawBrush, x, y);
			drawFont.Dispose();
			drawBrush.Dispose();
		}

		private void DrawStringBold(System.Drawing.Graphics g, string drawString, int x, int y, Color c1)
		{
			System.Drawing.Font drawFont = new System.Drawing.Font("Arial Bold", 14.0f);
			System.Drawing.SolidBrush drawBrush = new System.Drawing.SolidBrush(c1);
			g.DrawString(drawString, drawFont, drawBrush, x, y);
			drawFont.Dispose();
			drawBrush.Dispose();
		}

		float TransX(float xPos, int cellSize)
		{
//			int cellSize = Globals.G.cellSize;
			return cellSize * xPos + xIndent;
		}

		float TransY(float yPos, int cellSize)
		{
//			int cellSize = Globals.G.cellSize;
			int graphHeight = height * cellSize;
			return (graphHeight - cellSize * yPos) + yIndent;
		}

		float TransScale(float sc, int cellSize)
		{
//			int cellSize = Globals.G.cellSize;
			return sc * cellSize;
		}

		public void DrawDangerCircle(Graphics g, GraphStyle graphStyle)
		{
			if (!graphStyle.drawCircle) return;
			// Draw circle
			int cellSize = graphStyle.cellSize;
			float xCen = TransX(centreX, cellSize);
			float yCen = TransY(centreY, cellSize);
			DrawCircle(g, xCen, yCen, TransScale(radius, cellSize));
			DrawCircle(g, xCen, yCen, 2);
		}

		public void DrawPressure(Graphics g, float normalizeMin, float normalizeMax, GraphStyle graphStyle)
		{
			int cellSpacing = -1;
			if (graphStyle.spacing) cellSpacing = 0;
			int cellSize = graphStyle.cellSize;
			DrawStringBold(g, "Pore Water Pressure", xIndent, 0, Color.Black);
			if (graphStyle.renderGrid && !graphStyle.gridInFront) DrawGrid(g, graphStyle);
			for (int y = 0; y < height; y++)
			{
				for (int x = 0; x < width; x++)
				{
					float pressure = cells[x, y].poreWaterPressure;
					if (pressure < 9999)
					{
						pressure = (pressure - normalizeMin) / (normalizeMax - normalizeMin);
						int palIndex = (int)(pressure * 255);
						palIndex = Math.Min(palIndex, 255);
						palIndex = Math.Max(palIndex, 0);
						Brush b = new SolidBrush(Color.FromArgb(palette[palIndex]));
						g.FillRectangle(b, x * cellSize + xIndent,
							((height - 1) - y) * cellSize + yIndent, cellSize + cellSpacing, cellSize + cellSpacing);
					}
				}
			}
			if (graphStyle.renderGrid && graphStyle.gridInFront) DrawGrid(g, graphStyle);
			DrawGraphLines(g, graphStyle);
			// Draw color legend
			int index = 0;
			for (float count = normalizeMin; count < normalizeMax; count += ((normalizeMax - normalizeMin) / 10.0f))
			{
				float pressure = (count - normalizeMin) / (normalizeMax - normalizeMin);
				int palIndex = (int)(pressure * 255);
				palIndex = Math.Min(palIndex, 255);
				palIndex = Math.Max(palIndex, 0);
				Brush b = new SolidBrush(Color.FromArgb(palette[palIndex]));
				int yBig = (int)(height * cellSize * 0.1f * 0.75f);
				yBig = Math.Min(yBig, 16);
				int xPos = cellSize * width + 16 + xIndent;
				int yPos = ((height * cellSize)) - (int)(index * (height * cellSize * 0.1f)) + yIndent - yBig;
				g.FillRectangle(b, xPos, yPos, yBig, yBig);
				DrawString(g, count.ToString("F4"), xPos + yBig, yPos - yBig/3, Color.Black, "Courier New", Math.Max(yBig, 6));
				index++;
			}
			DrawDangerCircle(g, graphStyle);
		}

		void DrawCircle(Graphics g, float x, float y, float rad)
		{
			g.DrawEllipse(Pens.Black, x - rad, y - rad, rad * 2, rad * 2);
		}

		public void DrawMoisture(Graphics g, GraphStyle graphStyle)
		{
			int cellSize = graphStyle.cellSize;
			int cellSpacing = -1;
			if (graphStyle.spacing) cellSpacing = 0;
			DrawStringBold(g, "Moisture Content", xIndent, 0, Color.Black);
			DrawGraphLines(g, graphStyle);
			if (graphStyle.renderGrid && !graphStyle.gridInFront) DrawGrid(g, graphStyle);
			float minMoisture = float.MaxValue;
			float maxMoisture = float.MinValue;
			int rainbowScale = 3;
			for (int y = 0; y < height; y++)
			{
				for (int x = 0; x < width; x++)
				{
					float moisture = cells[x, y].moisture;
					if (moisture < 9999)
					{
						minMoisture = Math.Min(minMoisture, moisture);
						maxMoisture = Math.Max(maxMoisture, moisture);
						int palIndex = (int)((1.0f - moisture) * 255 * rainbowScale);	// this number is arbitrary.
						palIndex &= 0xff;
						Brush b = new SolidBrush(Color.FromArgb(palette[palIndex]));
						g.FillRectangle(b, x * cellSize + xIndent, ((height - 1) - y) * cellSize + yIndent,
							cellSize + cellSpacing, cellSize + cellSpacing);
					}
				}
			}
			if (graphStyle.renderGrid && graphStyle.gridInFront) DrawGrid(g, graphStyle);
			// Draw color legend
			//int index = 0;
			float normalizeMin = minMoisture;
			float normalizeMax = maxMoisture;
			float count = normalizeMin;
//			for (float count = normalizeMin; count < normalizeMax; count += ((normalizeMax - normalizeMin) / 10.0f))
			for (int index = 0; index <= 10; index++)
			{
				float pressure = count;
				int palIndex = (int)((1.0f - pressure) * 255 * rainbowScale);	// this number is arbitrary.
				palIndex &= 0xff;
				Brush b = new SolidBrush(Color.FromArgb(palette[palIndex]));
				int yBig = (int)(height * cellSize * 0.1f * 0.75f);
				yBig = Math.Min(yBig, 16);
				int xPos = cellSize * width + 16 + xIndent;
				//int yPos = ((height*cellSize)) - index * 20;
				int yPos = ((height * cellSize)) - (int)(index * (height * cellSize * 0.1f)) + yIndent - yBig;
				g.FillRectangle(b, xPos, yPos, yBig, yBig);
				//DrawString(g, count.ToString("F4"), xPos + 20, yPos, Color.Black);
				DrawString(g, count.ToString("F4"), xPos + yBig, yPos - yBig / 3, Color.Black, "Courier New", Math.Max(yBig, 6));
				count += ((normalizeMax - normalizeMin) / 10.0f);
//				index++;
			}
			DrawDangerCircle(g, graphStyle);
		}

		public void DrawSoilType(Graphics g, GraphStyle graphStyle)
		{
			int cellSize = graphStyle.cellSize;
			int cellSpacing = -1;
			if (graphStyle.spacing) cellSpacing = 0;
			DrawStringBold(g, "Soil Type", xIndent, 0, Color.Black);
			DrawGraphLines(g, graphStyle);
			Color[] soilPalette = new Color[6];
			soilPalette[0] = Color.FromArgb(51, 51, 51);	// as defined by CHASM_notes1.doc from Liz
			soilPalette[1] = Color.FromArgb(140, 140, 140);
			soilPalette[2] = Color.FromArgb(88, 29, 0);
			soilPalette[3] = Color.FromArgb(110, 82, 44);
			soilPalette[4] = Color.FromArgb(150, 111, 60);
			soilPalette[5] = Color.FromArgb(255, 159, 63);
			if (graphStyle.renderGrid && !graphStyle.gridInFront) DrawGrid(g, graphStyle);
			for (int y = 0; y < height; y++)
			{
				for (int x = 0; x < width; x++)
				{
					int soilType = cells[x, y].soilType;
					if (soilType < 9999)
					{
						Brush b = new SolidBrush(soilPalette[soilType]);
						g.FillRectangle(b, x * cellSize + xIndent, ((height - 1) - y) * cellSize + yIndent,
							(cellSize + cellSpacing), (cellSize + cellSpacing));
					}
				}
			}
			if (graphStyle.renderGrid && graphStyle.gridInFront) DrawGrid(g, graphStyle);
			for (int index = 0; index < 6; index++)
			{
				int palIndex = index;
				Brush b = new SolidBrush(soilPalette[palIndex]);
				int yBig = (int)(height * cellSize * 0.1f * 0.75f);
				yBig = Math.Min(yBig, 16);
				int xPos = cellSize * width + 16 + xIndent;
				int yPos = (int)(index * (height * cellSize * 0.1f)) + yIndent;
				g.FillRectangle(b, xPos, yPos, yBig, yBig);
				DrawString(g, "soil " + index, xPos + yBig, yPos - yBig / 3, Color.Black, "Courier New", Math.Max(yBig, 6));
			}
			DrawDangerCircle(g, graphStyle);
		}

		void DrawGrid(Graphics g, GraphStyle graphStyle)
		{
			int cellSize = graphStyle.cellSize;
			int graphHeight = height * cellSize;
			int graphWidth = width * cellSize;
			for (int count = 0; count <= width; count += graphStyle.graphLineSpacing)	// vertical graph lines
			{
				int xPos = count * cellSize + xIndent;
				g.DrawLine(Pens.LightBlue, xPos, yIndent, xPos, graphHeight + yIndent);
			}
			for (int count = 0; count <= height; count += graphStyle.graphLineSpacing)	// horizontal graph lines
			{
				int yPos = yIndent + graphHeight - (count * cellSize);
				g.DrawLine(Pens.LightBlue, xIndent, yPos, graphWidth + xIndent, yPos);
			}
		}

		void DrawGraphLines(Graphics g, GraphStyle graphStyle)
		{
			int cellSize = graphStyle.cellSize;
			// draw grid lines
			int graphHeight = height * cellSize;
			int graphWidth = width * cellSize;
			g.DrawLine(Pens.Gray, 16, yIndent, 16, graphHeight + 32 + 32 - yIndent);
			g.DrawLine(Pens.Gray, xIndent, graphHeight + yIndent + 16, graphWidth + xIndent, graphHeight + yIndent + 16);
			int index = 0;
			for (int count = 0; count < width; count += 10)	// ticks on X axis
			{
				int xPos = count * cellSize + xIndent;
				int yPos = graphHeight + yIndent + 8;
				g.DrawLine(Pens.Gray, xPos, yPos,
					xPos, graphHeight + yIndent + 24);
				if (cellSize <= 3)
				{
					int jitter = (index & 1) * 14;
					DrawString(g, count.ToString(), xPos-1, yPos + 8 - jitter, Color.Black, "Arial", 8.0f);
				}
				else DrawString(g, count.ToString(), xPos, yPos + 8, Color.Black);
				index++;
			}
			for (int count = 0; count < height; count += 10)	// ticks along Y axis
			{
				int xPos = 7;
				int yPos = (graphHeight - count * cellSize) + yIndent;
				g.DrawLine(Pens.Gray, xPos, yPos,
					24, (graphHeight - count * cellSize) + xIndent);
				DrawString(g, count.ToString(), xPos, yPos, Color.Black);
			}
		}

	}
}
