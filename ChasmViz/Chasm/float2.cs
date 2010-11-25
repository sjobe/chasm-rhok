using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChasmViz
{
	public struct float2
	{
		public float x;
		public float y;

		public float2(float x, float y)
		{
			this.x = x;
			this.y = y;
		}

		// ---- basic math operators ----
		public static float2 operator +(float2 a, float2 b)
		{
			return new float2(a.x + b.x, a.y + b.y);
		}
		public static float2 operator -(float2 a, float2 b)
		{
			return new float2(a.x - b.x, a.y - b.y);
		}
		public static float2 operator *(float2 a, float2 b)
		{
			return new float2(a.x * b.x, a.y * b.y);
		}
		public static float2 operator *(float2 a, float s)
		{
			return new float2(a.x * s, a.y * s);
		}
		public static float2 operator *(float s, float2 a)
		{
			return new float2(a.x * s, a.y * s);
		}
		public static float2 operator /(float2 a, float2 b)
		{
			return new float2(a.x / b.x, a.y / b.y);
		}
		public static float2 operator /(float2 a, float s)
		{
			return new float2(a.x / s, a.y / s);
		}

		public static float2 operator -(float2 a)
		{
			return new float2(-a.x, -a.y);
		}

		public static float2 Lerp(float2 a, float2 b, float alpha)
		{
			return (b - a) * alpha + a;
		}

		public static float2 LerpStable(float2 a, float2 b, float alpha)
		{
			return alpha * b + (1.0f - alpha) * a;
		}

	}
}
