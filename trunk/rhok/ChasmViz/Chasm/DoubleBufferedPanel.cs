using System.Windows.Forms;

namespace ChasmViz
{
	public class DoubleBufferedPanel : Panel
	{
		public DoubleBufferedPanel()
		{
			this.DoubleBuffered = true;
		}
	}
}
