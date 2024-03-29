/* Version 0.82 */
/*
 Copyright 2008-2010
 Matthias Ehmann,
 Michael Gerhaeuser,
 Carsten Miller,
 Bianca Valentin,
 Alfred Wassermann,
 Peter Wilfahrt
 
 This file is part of JSXGraph.
 
 JSXGraph is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 JSXGraph is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.
 
 You should have received a copy of the GNU Lesser General Public License
 along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
 */
var JXG =
{
};
(function ()
{
    var d, e;
    JXG.countDrawings = 0;
    JXG.countTime = 0;
    JXG.require = function (f)
    {
    };
    JXG.rendererFiles = [];
    JXG.rendererFiles.svg = "SVGRenderer";
    JXG.rendererFiles.vml = "VMLRenderer";
    JXG.rendererFiles.canvas = "CanvasRenderer";
    JXG.baseFiles = null;
    JXG.requirePath = "";
    for (d = 0; d < document.getElementsByTagName("script").length; d++)
    {
        e = document.getElementsByTagName("script")[d];
        if (e.src && e.src.match(/loadjsxgraphInOneFile\.js(\?.*)?$/))
        {
            JXG.requirePath = e.src.replace(/loadjsxgraphInOneFile\.js(\?.*)?$/, "")
        }
    }
    JXG.serverBase = JXG.requirePath + "server/"
})();
JXG.Math = (function (e, d, f)
{
    var g = function (i)
    {
        var h, j;
        if (i.memo)
        {
            return i.memo
        }
        h =
        {
        };
        j = Array.prototype.join;
        return (i.memo = function ()
        {
            var k = j.call(arguments);
            return (h[k] !== f) ? h[k] : h[k] = i.apply(this, arguments)
        })
    };
    return {
        eps: 0.000001,
        vector: function (l, k)
        {
            var j, h;
            k = k || 0;
            j = new Array(d.ceil(l));
            for (h = 0; h < l; h++)
            {
                j[h] = k
            }
            return j
        },
        matrix: function (s, h, q)
        {
            var p, l, k;
            q = q || 0;
            h = h || s;
            p = new Array(d.ceil(s));
            for (l = 0; l < s; l++)
            {
                p[l] = new Array(d.ceil(h));
                for (k = 0; k < h; k++)
                {
                    p[l][k] = q
                }
            }
            return p
        },
        identity: function (l, h)
        {
            var k, j;
            if ((h === f) && (typeof h !== "number"))
            {
                h = l
            }
            k = this.matrix(l, h);
            for (j = 0; j < d.min(l, h); j++)
            {
                k[j][j] = 1
            }
            return k
        },
        matVecMult: function (r, q)
        {
            var h = r.length,
                u = q.length,
                p = [],
                l, t, j;
            if (u === 3)
            {
                for (l = 0; l < h; l++)
                {
                    p[l] = r[l][0] * q[0] + r[l][1] * q[1] + r[l][2] * q[2]
                }
            }
            else
            {
                for (l = 0; l < h; l++)
                {
                    t = 0;
                    for (j = 0; j < u; j++)
                    {
                        t += r[l][j] * q[j]
                    }
                    p[l] = t
                }
            }
            return p
        },
        matMatMult: function (l, h)
        {
            var q = l.length,
                p = q > 0 ? h[0].length : 0,
                w = h.length,
                v = this.matrix(q, p),
                u, t, x, r;
            for (u = 0; u < q; u++)
            {
                for (t = 0; t < p; t++)
                {
                    x = 0;
                    for (r = 0; r < w; r++)
                    {
                        x += l[u][r] * h[r][t]
                    }
                    v[u][t] = x
                }
            }
            return v
        },
        transpose: function (r)
        {
            var l, p, k, h, q;
            h = r.length;
            q = r.length > 0 ? r[0].length : 0;
            l = this.matrix(q, h);
            for (p = 0; p < q; p++)
            {
                for (k = 0; k < h; k++)
                {
                    l[p][k] = r[k][p]
                }
            }
            return l
        },
        inverse: function (y)
        {
            var v, u, t, B, z, h, x, q = y.length,
                m = [],
                l = [],
                w = [];
            for (v = 0; v < q; v++)
            {
                m[v] = [];
                for (u = 0; u < q; u++)
                {
                    m[v][u] = y[v][u]
                }
                l[v] = v
            }
            for (u = 0; u < q; u++)
            {
                z = d.abs(m[u][u]);
                h = u;
                for (v = u + 1; v < q; v++)
                {
                    if (d.abs(m[v][u]) > z)
                    {
                        z = d.abs(m[v][u]);
                        h = v
                    }
                }
                if (z <= e.Math.eps)
                {
                    return false
                }
                if (h > u)
                {
                    for (t = 0; t < q; t++)
                    {
                        x = m[u][t];
                        m[u][t] = m[h][t];
                        m[h][t] = x
                    }
                    x = l[u];
                    l[u] = l[h];
                    l[h] = x
                }
                B = 1 / m[u][u];
                for (v = 0; v < q; v++)
                {
                    m[v][u] *= B
                }
                m[u][u] = B;
                for (t = 0; t < q; t++)
                {
                    if (t != u)
                    {
                        for (v = 0; v < q; v++)
                        {
                            if (v != u)
                            {
                                m[v][t] -= m[v][u] * m[u][t]
                            }
                        }
                        m[u][t] = -B * m[u][t]
                    }
                }
            }
            for (v = 0; v < q; v++)
            {
                for (t = 0; t < q; t++)
                {
                    w[l[t]] = m[v][t]
                }
                for (t = 0; t < q; t++)
                {
                    m[v][t] = w[t]
                }
            }
            return m
        },
        innerProduct: function (j, h, m)
        {
            var k, l = 0;
            if ((m === f) || (typeof m !== "number"))
            {
                m = j.length
            }
            for (k = 0; k < m; k++)
            {
                l += j[k] * h[k]
            }
            return l
        },
        crossProduct: function (i, h)
        {
            return [i[1] * h[2] - i[2] * h[1], i[2] * h[0] - i[0] * h[2], i[0] * h[1] - i[1] * h[0]]
        },
        factorial: g(function (h)
        {
            if (h < 0)
            {
                return NaN
            }
            h = d.floor(h);
            if (h === 0 || h === 1)
            {
                return 1
            }
            return h * arguments.callee(h - 1)
        }),
        binomial: g(function (m, j)
        {
            var h, l;
            if (j > m || j < 0)
            {
                return NaN
            }
            j = d.floor(j);
            m = d.floor(m);
            if (j === 0 || j === m)
            {
                return 1
            }
            h = 1;
            for (l = 0; l < j; l++)
            {
                h *= (m - l);
                h /= (l + 1)
            }
            return h
        }),
        cosh: function (h)
        {
            return (d.exp(h) + d.exp(-h)) * 0.5
        },
        sinh: function (h)
        {
            return (d.exp(h) - d.exp(-h)) * 0.5
        },
        pow: function (i, h)
        {
            if (i === 0)
            {
                if (h === 0)
                {
                    return 1
                }
                else
                {
                    return 0
                }
            }
            if (d.floor(h) === h)
            {
                return d.pow(i, h)
            }
            else
            {
                if (i > 0)
                {
                    return d.exp(h * d.log(d.abs(i)))
                }
                else
                {
                    return NaN
                }
            }
        },
        squampow: function (j, i)
        {
            var h;
            if (d.floor(i) === i)
            {
                h = 1;
                if (i < 0)
                {
                    j = 1 / j;
                    i *= -1
                }
                while (i != 0)
                {
                    if (i & 1)
                    {
                        h *= j
                    }
                    i >>= 1;
                    j *= j
                }
                return h
            }
            else
            {
                return this.pow(j, i)
            }
        },
        normalize: function (j)
        {
            var h = 2 * j[3],
                k = j[4] / (h),
                l, i;
            j[5] = k;
            j[6] = -j[1] / h;
            j[7] = -j[2] / h;
            if (k === Infinity || isNaN(k))
            {
                l = d.sqrt(j[1] * j[1] + j[2] * j[2]);
                j[0] /= l;
                j[1] /= l;
                j[2] /= l;
                j[3] = 0;
                j[4] = 1
            }
            else
            {
                if (d.abs(k) >= 1)
                {
                    j[0] = (j[6] * j[6] + j[7] * j[7] - k * k) / (2 * k);
                    j[1] = -j[6] / k;
                    j[2] = -j[7] / k;
                    j[3] = 1 / (2 * k);
                    j[4] = 1
                }
                else
                {
                    i = (k <= 0) ? (-1) : (1);
                    j[0] = i * (j[6] * j[6] + j[7] * j[7] - k * k) * 0.5;
                    j[1] = -i * j[6];
                    j[2] = -i * j[7];
                    j[3] = i / 2;
                    j[4] = i * k
                }
            }
            return j
        }
    }
})(JXG, Math);
JXG.Math.Numerics = (function (e, d)
{
    var f =
    {
        rk4: {
            s: 4,
            A: [
                [0, 0, 0, 0],
                [0.5, 0, 0, 0],
                [0, 0.5, 0, 0],
                [0, 0, 1, 0]
            ],
            b: [1 / 6, 1 / 3, 1 / 3, 1 / 6],
            c: [0, 0.5, 0.5, 1]
        },
        heun: {
            s: 2,
            A: [
                [0, 0],
                [1, 0]
            ],
            b: [0.5, 0.5],
            c: [0, 1]
        },
        euler: {
            s: 1,
            A: [
                [0]
            ],
            b: [1],
            c: [0]
        }
    };
    return {
        Gauss: function (g, s)
        {
            var u = e.Math.eps,
                h = g.length > 0 ? g[0].length : 0,
                q, t, r, p, m, l = function (v, n)
                {
                    var k = this[v];
                    this[v] = this[n];
                    this[n] = k
                };
            if ((h !== s.length) || (h !== g.length))
            {
                throw new Error("JXG.Math.Numerics.Gauss: Dimensions don't match. A must be a square matrix and b must be of the same length as A.")
            }
            q = new Array(h);
            t = s.slice(0, h);
            for (r = 0; r < h; r++)
            {
                q[r] = g[r].slice(0, h)
            }
            for (p = 0; p < h; p++)
            {
                for (r = h - 1; r > p; r--)
                {
                    if (d.abs(q[r][p]) > u)
                    {
                        if (d.abs(q[p][p]) < u)
                        {
                            l.apply(q, [r, p]);
                            l.apply(t, [r, p])
                        }
                        else
                        {
                            q[r][p] /= q[p][p];
                            t[r] -= q[r][p] * t[p];
                            for (m = p + 1; m < h; m++)
                            {
                                q[r][m] -= q[r][p] * q[p][m]
                            }
                        }
                    }
                }
                if (d.abs(q[p][p]) < u)
                {
                    throw new Error("JXG.Math.Numerics.Gauss(): The given matrix seems to be singular.")
                }
            }
            this.backwardSolve(q, t, true);
            return t
        },
        backwardSolve: function (r, k, q)
        {
            var h, g, s, p, l;
            if (q)
            {
                h = k
            }
            else
            {
                h = k.slice(0, k.length)
            }
            g = r.length;
            s = r.length > 0 ? r[0].length : 0;
            for (p = g - 1; p >= 0; p--)
            {
                for (l = s - 1; l > p; l--)
                {
                    h[p] -= r[p][l] * h[l]
                }
                h[p] /= r[p][p]
            }
            return h
        },
        gaussBareiss: function (v)
        {
            var l, u, y, q, m, g, h, r, w, x = e.Math.eps;
            h = v.length;
            if (h <= 0)
            {
                return 0
            }
            if (v[0].length < h)
            {
                h = v[0].length
            }
            r = new Array(h);
            for (q = 0; q < h; q++)
            {
                r[q] = v[q].slice(0, h)
            }
            u = 1;
            y = 1;
            for (l = 0; l < h - 1; l++)
            {
                g = r[l][l];
                if (d.abs(g) < x)
                {
                    for (q = 0; q < h; q++)
                    {
                        if (d.abs(r[q][l]) >= x)
                        {
                            break
                        }
                    }
                    if (q == h)
                    {
                        return 0
                    }
                    for (m = l; m < h; m++)
                    {
                        w = r[q][m];
                        r[q][m] = r[l][m];
                        r[l][m] = w
                    }
                    y = -y;
                    g = r[l][l]
                }
                for (q = l + 1; q < h; q++)
                {
                    for (m = l + 1; m < h; m++)
                    {
                        w = g * r[q][m] - r[q][l] * r[l][m];
                        r[q][m] = w / u
                    }
                }
                u = g
            }
            return y * r[h - 1][h - 1]
        },
        det: function (g)
        {
            return this.gaussBareiss(g)
        },
        Jacobi: function (z)
        {
            var s, q, p, g, t, y, x, B = e.Math.eps,
                w = 0,
                v, r, l = z.length,
                m = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                h = [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
                u = 0;
            for (s = 0; s < l; s++)
            {
                for (q = 0; q < l; q++)
                {
                    m[s][q] = 0;
                    h[s][q] = z[s][q];
                    w += d.abs(h[s][q])
                }
                m[s][s] = 1
            }
            if (l == 1)
            {
                return [h, m]
            }
            if (w <= 0)
            {
                return [h, m]
            }
            w /= (l * l);
            do
            {
                v = 0;
                r = 0;
                for (q = 1; q < l; q++)
                {
                    for (s = 0; s < q; s++)
                    {
                        g = d.abs(h[s][q]);
                        if (g > r)
                        {
                            r = g
                        }
                        v += g;
                        if (g >= B)
                        {
                            g = d.atan2(2 * h[s][q], h[s][s] - h[q][q]) * 0.5;
                            t = d.sin(g);
                            y = d.cos(g);
                            for (p = 0; p < l; p++)
                            {
                                x = h[p][s];
                                h[p][s] = y * x + t * h[p][q];
                                h[p][q] = -t * x + y * h[p][q];
                                x = m[p][s];
                                m[p][s] = y * x + t * m[p][q];
                                m[p][q] = -t * x + y * m[p][q]
                            }
                            h[s][s] = y * h[s][s] + t * h[q][s];
                            h[q][q] = -t * h[s][q] + y * h[q][q];
                            h[s][q] = 0;
                            for (p = 0; p < l; p++)
                            {
                                h[s][p] = h[p][s];
                                h[q][p] = h[p][q]
                            }
                        }
                    }
                }
                u++
            } while (d.abs(v) / w > B && u < 2000);
            return [h, m]
        },
        NewtonCotes: function (g, k, h)
        {
            var l = 0,
                q = h && typeof h.number_of_nodes === "number" ? h.number_of_nodes : 28,
                n =
                {
                    trapez: true,
                    simpson: true,
                    milne: true
                },
                r = h && h.integration_type && n.hasOwnProperty(h.integration_type) && n[h.integration_type] ? h.integration_type : "milne",
                p = (g[1] - g[0]) / q,
                m, j, s;
            switch (r)
            {
            case "trapez":
                l = (k(g[0]) + k(g[1])) * 0.5;
                m = g[0];
                for (j = 0; j < q - 1; j++)
                {
                    m += p;
                    l += k(m)
                }
                l *= p;
                break;
            case "simpson":
                if (q % 2 > 0)
                {
                    throw new Error("JSXGraph:  INT_SIMPSON requires config.number_of_nodes dividable by 2.")
                }
                s = q / 2;
                l = k(g[0]) + k(g[1]);
                m = g[0];
                for (j = 0; j < s - 1; j++)
                {
                    m += 2 * p;
                    l += 2 * k(m)
                }
                m = g[0] - p;
                for (j = 0; j < s; j++)
                {
                    m += 2 * p;
                    l += 4 * k(m)
                }
                l *= p / 3;
                break;
            default:
                if (q % 4 > 0)
                {
                    throw new Error("JSXGraph: Error in INT_MILNE: config.number_of_nodes must be a multiple of 4")
                }
                s = q * 0.25;
                l = 7 * (k(g[0]) + k(g[1]));
                m = g[0];
                for (j = 0; j < s - 1; j++)
                {
                    m += 4 * p;
                    l += 14 * k(m)
                }
                m = g[0] - 3 * p;
                for (j = 0; j < s; j++)
                {
                    m += 4 * p;
                    l += 32 * (k(m) + k(m + 2 * p))
                }
                m = g[0] - 2 * p;
                for (j = 0; j < s; j++)
                {
                    m += 4 * p;
                    l += 12 * k(m)
                }
                l *= 2 * p / 45
            }
            return l
        },
        I: function (g, h)
        {
            return this.NewtonCotes(g, h, {
                number_of_nodes: 16,
                integration_type: "milne"
            })
        },
        Newton: function (p, g, j)
        {
            var k = 0,
                m = e.Math.eps,
                n = p.apply(j, [g]),
                l = 1,
                q;
            if (e.isArray(g))
            {
                g = g[0]
            }
            while (k < 50 && d.abs(n) > m)
            {
                q = this.D(p, j)(g);
                l += 2;
                if (d.abs(q) > m)
                {
                    g -= n / q
                }
                else
                {
                    g += (d.random() * 0.2 - 1)
                }
                n = p.apply(j, [g]);
                l++;
                k++
            }
            return g
        },
        root: function (i, g, h)
        {
            return this.fzero(i, g, h)
        },
        Neville: function (k)
        {
            var h = [],
                g = function (l)
                {
                    return function (w, m)
                    {
                        var p, v, x, y = e.Math.binomial,
                            u = k.length,
                            n = u - 1,
                            q = 0,
                            r = 0;
                        if (!m)
                        {
                            x = 1;
                            for (p = 0; p < u; p++)
                            {
                                h[p] = y(n, p) * x;
                                x *= (-1)
                            }
                        }
                        v = w;
                        for (p = 0; p < u; p++)
                        {
                            if (v === 0)
                            {
                                return k[p][l]()
                            }
                            else
                            {
                                x = h[p] / v;
                                v--;
                                q += k[p][l]() * x;
                                r += x
                            }
                        }
                        return q / r
                    }
                },
                j = g("X"),
                i = g("Y");
            return [j, i, 0, function ()
            {
                return k.length - 1
            }]
        },
        splineDef: function (s, r)
        {
            var g = d.min(s.length, r.length),
                j, m, h, p = [],
                q = [],
                k = [],
                v = [],
                t = [],
                u = [];
            if (g === 2)
            {
                return [0, 0]
            }
            for (m = 0; m < g; m++)
            {
                j =
                {
                    X: s[m],
                    Y: r[m]
                };
                k.push(j)
            }
            k.sort(function (l, i)
            {
                return l.X - i.X
            });
            for (m = 0; m < g; m++)
            {
                s[m] = k[m].X;
                r[m] = k[m].Y
            }
            for (m = 0; m < g - 1; m++)
            {
                v.push(s[m + 1] - s[m])
            }
            for (m = 0; m < g - 2; m++)
            {
                t.push(6 * (r[m + 2] - r[m + 1]) / (v[m + 1]) - 6 * (r[m + 1] - r[m]) / (v[m]))
            }
            p.push(2 * (v[0] + v[1]));
            q.push(t[0]);
            for (m = 0; m < g - 3; m++)
            {
                h = v[m + 1] / p[m];
                p.push(2 * (v[m + 1] + v[m + 2]) - h * v[m + 1]);
                q.push(t[m + 1] - h * q[m])
            }
            u[g - 3] = q[g - 3] / p[g - 3];
            for (m = g - 4; m >= 0; m--)
            {
                u[m] = (q[m] - (v[m + 1] * u[m + 1])) / p[m]
            }
            for (m = g - 3; m >= 0; m--)
            {
                u[m + 1] = u[m]
            }
            u[0] = 0;
            u[g - 1] = 0;
            return u
        },
        splineEval: function (h, z, v, B)
        {
            var k = d.min(z.length, v.length),
                p = 1,
                m = false,
                A = [],
                r, q, w, u, t, s, g;
            if (e.isArray(h))
            {
                p = h.length;
                m = true
            }
            else
            {
                h = [h]
            }
            for (r = 0; r < p; r++)
            {
                if ((h[r] < z[0]) || (z[r] > z[k - 1]))
                {
                    return NaN
                }
                for (q = 1; q < k; q++)
                {
                    if (h[r] <= z[q])
                    {
                        break
                    }
                }
                q--;
                w = v[q];
                u = (v[q + 1] - v[q]) / (z[q + 1] - z[q]) - (z[q + 1] - z[q]) / 6 * (B[q + 1] + 2 * B[q]);
                t = B[q] / 2;
                s = (B[q + 1] - B[q]) / (6 * (z[q + 1] - z[q]));
                g = h[r] - z[q];
                A.push(w + (u + (t + s * g) * g) * g)
            }
            if (m)
            {
                return A
            }
            else
            {
                return A[0]
            }
        },
        generatePolynomialTerm: function (g, m, h, j)
        {
            var l = [],
                k;
            for (k = m; k >= 0; k--)
            {
                l = l.concat(["(", g[k].toPrecision(j), ")"]);
                if (k > 1)
                {
                    l = l.concat(["*", h, "<sup>", k, "<", "/sup> + "])
                }
                else
                {
                    if (k === 1)
                    {
                        l = l.concat(["*", h, " + "])
                    }
                }
            }
            return l.join("")
        },
        lagrangePolynomial: function (i)
        {
            var g = [],
                h = function (w, l)
                {
                    var p, m, t, v, y, q = 0,
                        r = 0,
                        u, n;
                    t = i.length;
                    if (!l)
                    {
                        for (p = 0; p < t; p++)
                        {
                            g[p] = 1;
                            v = i[p].X();
                            for (m = 0; m < t; m++)
                            {
                                if (m != p)
                                {
                                    g[p] *= (v - i[m].X())
                                }
                            }
                            g[p] = 1 / g[p]
                        }
                        u = [];
                        for (n = 0; n < t; n++)
                        {
                            u.push([1])
                        }
                    }
                    for (p = 0; p < t; p++)
                    {
                        v = i[p].X();
                        if (w === v)
                        {
                            return i[p].Y()
                        }
                        else
                        {
                            y = g[p] / (w - v);
                            r += y;
                            q += y * i[p].Y()
                        }
                    }
                    return q / r
                };
            h.getTerm = function ()
            {
                return ""
            };
            return h
        },
        regressionPolynomial: function (k, p, n)
        {
            var g, h, m, l, i, q, j = "";
            if (e.isPoint(k) && typeof k.Value == "function")
            {
                h = function ()
                {
                    return k.Value()
                }
            }
            else
            {
                if (e.isFunction(k))
                {
                    h = k
                }
                else
                {
                    if (e.isNumber(k))
                    {
                        h = function ()
                        {
                            return k
                        }
                    }
                    else
                    {
                        throw new Error("JSXGraph: Can't create regressionPolynomial from degree of type'" + (typeof k) + "'.")
                    }
                }
            }
            if (arguments.length == 3 && e.isArray(p) && e.isArray(n))
            {
                i = 0
            }
            else
            {
                if (arguments.length == 2 && e.isArray(p) && p.length > 0 && e.isPoint(p[0]))
                {
                    i = 1
                }
                else
                {
                    throw new Error("JSXGraph: Can't create regressionPolynomial. Wrong parameters.")
                }
            }
            q = function (F, r)
            {
                var v, u, C, z, E, t, D, G, A, w = p.length;
                A = d.floor(h());
                if (!r)
                {
                    if (i === 1)
                    {
                        m = [];
                        l = [];
                        for (v = 0; v < w; v++)
                        {
                            m[v] = p[v].X();
                            l[v] = p[v].Y()
                        }
                    }
                    if (i === 0)
                    {
                        m = [];
                        l = [];
                        for (v = 0; v < w; v++)
                        {
                            if (e.isFunction(p[v]))
                            {
                                m.push(p[v]())
                            }
                            else
                            {
                                m.push(p[v])
                            }
                            if (e.isFunction(n[v]))
                            {
                                l.push(n[v]())
                            }
                            else
                            {
                                l.push(n[v])
                            }
                        }
                    }
                    C = [];
                    for (u = 0; u < w; u++)
                    {
                        C.push([1])
                    }
                    for (v = 1; v <= A; v++)
                    {
                        for (u = 0; u < w; u++)
                        {
                            C[u][v] = C[u][v - 1] * m[u]
                        }
                    }
                    E = l;
                    z = e.Math.transpose(C);
                    t = e.Math.matMatMult(z, C);
                    D = e.Math.matVecMult(z, E);
                    g = e.Math.Numerics.Gauss(t, D);
                    j = e.Math.Numerics.generatePolynomialTerm(g, A, "x", 3)
                }
                G = g[A];
                for (v = A - 1; v >= 0; v--)
                {
                    G = (G * F + g[v])
                }
                return G
            };
            q.getTerm = function ()
            {
                return j
            };
            return q
        },
        bezier: function (i)
        {
            var g, h = function (j)
            {
                return function (l, k)
                {
                    var p = d.floor(l) * 3,
                        n = l % 1,
                        m = 1 - n;
                    if (!k)
                    {
                        g = d.floor(i.length / 3)
                    }
                    if (l < 0)
                    {
                        return i[0][j]()
                    }
                    if (l >= g)
                    {
                        return i[i.length - 1][j]()
                    }
                    if (isNaN(l))
                    {
                        return NaN
                    }
                    return m * m * (m * i[p][j]() + 3 * n * i[p + 1][j]()) + (3 * m * i[p + 2][j]() + n * i[p + 3][j]()) * n * n
                }
            };
            return [h("X"), h("Y"), 0, function ()
            {
                return d.floor(i.length / 3)
            }]
        },
        bspline: function (j, g)
        {
            var k, m = [],
                l = function (s, p)
                {
                    var q, r = [];
                    for (q = 0; q < s + p + 1; q++)
                    {
                        if (q < p)
                        {
                            r[q] = 0
                        }
                        else
                        {
                            if (q <= s)
                            {
                                r[q] = q - p + 1
                            }
                            else
                            {
                                r[q] = s - p + 2
                            }
                        }
                    }
                    return r
                },
                i = function (z, B, p, q, A)
                {
                    var u, r, x, w, y, v = [];
                    if (B[A] <= z && z < B[A + 1])
                    {
                        v[A] = 1
                    }
                    else
                    {
                        v[A] = 0
                    }
                    for (u = 2; u <= q; u++)
                    {
                        for (r = A - u + 1; r <= A; r++)
                        {
                            if (r <= A - u + 1 || r < 0)
                            {
                                x = 0
                            }
                            else
                            {
                                x = v[r]
                            }
                            if (r >= A)
                            {
                                w = 0
                            }
                            else
                            {
                                w = v[r + 1]
                            }
                            y = B[r + u - 1] - B[r];
                            if (y == 0)
                            {
                                v[r] = 0
                            }
                            else
                            {
                                v[r] = (z - B[r]) / y * x
                            }
                            y = B[r + u] - B[r + 1];
                            if (y != 0)
                            {
                                v[r] += (B[r + u] - z) / y * w
                            }
                        }
                    }
                    return v
                },
                h = function (n)
                {
                    return function (v, q)
                    {
                        var p = j.length,
                            z, u, w, x = p - 1,
                            r = g;
                        if (x <= 0)
                        {
                            return NaN
                        }
                        if (x + 2 <= r)
                        {
                            r = x + 1
                        }
                        if (v <= 0)
                        {
                            return j[0][n]()
                        }
                        if (v >= x - r + 2)
                        {
                            return j[x][n]()
                        }
                        k = l(x, r);
                        w = d.floor(v) + r - 1;
                        m = i(v, k, x, r, w);
                        z = 0;
                        for (u = w - r + 1; u <= w; u++)
                        {
                            if (u < p && u >= 0)
                            {
                                z += j[u][n]() * m[u]
                            }
                        }
                        return z
                    }
                };
            return [h("X"), h("Y"), 0, function ()
            {
                return j.length - 1
            }]
        },
        D: function (j, k)
        {
            var i = 0.00001,
                g = 1 / (i * 2);
            if (arguments.length == 1 || (arguments.length > 1 && !e.exists(arguments[1])))
            {
                return function (h, l)
                {
                    return (j(h + i, l) - j(h - i, l)) * g
                }
            }
            else
            {
                return function (h, l)
                {
                    return (j.apply(k, [h + i, l]) - j.apply(k, [h - i, l])) * g
                }
            }
        },
        riemann: function (s, m, t, k, p)
        {
            var l = [],
                A = [],
                r, q = 0,
                z, w = k,
                u, h, v, g;
            m = d.floor(m);
            l[q] = w;
            A[q] = 0;
            if (m > 0)
            {
                z = (p - k) / m;
                g = z * 0.01;
                for (r = 0; r < m; r++)
                {
                    if (t === "right")
                    {
                        u = s(w + z)
                    }
                    else
                    {
                        if (t === "middle")
                        {
                            u = s(w + z * 0.5)
                        }
                        else
                        {
                            if ((t === "left") || (t === "trapezodial"))
                            {
                                u = s(w)
                            }
                            else
                            {
                                if (t === "lower")
                                {
                                    u = s(w);
                                    for (h = w + g; h <= w + z; h += g)
                                    {
                                        v = s(h);
                                        if (v < u)
                                        {
                                            u = v
                                        }
                                    }
                                }
                                else
                                {
                                    u = s(w);
                                    for (h = w + g; h <= w + z; h += g)
                                    {
                                        v = s(h);
                                        if (v > u)
                                        {
                                            u = v
                                        }
                                    }
                                }
                            }
                        }
                    }
                    q++;
                    l[q] = w;
                    A[q] = u;
                    q++;
                    w += z;
                    if (t === "trapezodial")
                    {
                        u = s(w)
                    }
                    l[q] = w;
                    A[q] = u;
                    q++;
                    l[q] = w;
                    A[q] = 0
                }
            }
            return [l, A]
        },
        riemannsum: function (p, k, r, j, l)
        {
            var q = 0,
                m, v, u = j,
                s, h, t, g;
            k = d.floor(k);
            if (k > 0)
            {
                v = (l - j) / k;
                g = v * 0.01;
                for (m = 0; m < k; m++)
                {
                    if (r === "right")
                    {
                        s = p(u + v)
                    }
                    else
                    {
                        if (r === "middle")
                        {
                            s = p(u + v * 0.5)
                        }
                        else
                        {
                            if (r === "trapezodial")
                            {
                                s = 0.5 * (p(u + v) + p(u))
                            }
                            else
                            {
                                if (r === "left")
                                {
                                    s = p(u)
                                }
                                else
                                {
                                    if (r === "lower")
                                    {
                                        s = p(u);
                                        for (h = u + g; h <= u + v; h += g)
                                        {
                                            t = p(h);
                                            if (t < s)
                                            {
                                                s = t
                                            }
                                        }
                                    }
                                    else
                                    {
                                        s = p(u);
                                        for (h = u + g; h <= u + v; h += g)
                                        {
                                            t = p(h);
                                            if (t > s)
                                            {
                                                s = t
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    q += v * s;
                    u += v
                }
            }
            return q
        },
        rungeKutta: function (g, H, p, m, G)
        {
            var q = [],
                n = [],
                F = (p[1] - p[0]) / m,
                v = p[0],
                J, E, D, B, A, C = H.length,
                w, u = [],
                z = 0;
            if (e.isString(g))
            {
                g = f[g] || f.euler
            }
            w = g.s;
            for (J = 0; J < C; J++)
            {
                q[J] = H[J]
            }
            for (E = 0; E < m; E++)
            {
                u[z] = [];
                for (J = 0; J < C; J++)
                {
                    u[z][J] = q[J]
                }
                z++;
                B = [];
                for (D = 0; D < w; D++)
                {
                    for (J = 0; J < C; J++)
                    {
                        n[J] = 0
                    }
                    for (A = 0; A < D; A++)
                    {
                        for (J = 0; J < C; J++)
                        {
                            n[J] += (g.A[D][A]) * F * B[A][J]
                        }
                    }
                    for (J = 0; J < C; J++)
                    {
                        n[J] += q[J]
                    }
                    B.push(G(v + g.c[D] * F, n))
                }
                for (J = 0; J < C; J++)
                {
                    n[J] = 0
                }
                for (A = 0; A < w; A++)
                {
                    for (J = 0; J < C; J++)
                    {
                        n[J] += g.b[A] * B[A][J]
                    }
                }
                for (J = 0; J < C; J++)
                {
                    q[J] = q[J] + F * n[J]
                }
                v += F
            }
            return u
        },
        fzero: function (G, H, M)
        {
            var z = e.Math.eps,
                g = 50,
                y = 0,
                B = 0,
                r = z,
                K, J, I, A, x, w, L, j, D, E, n, h, C, F, v, s, m, l, t, k;
            if (e.isArray(H))
            {
                if (H.length < 2)
                {
                    throw new Error("JXG.Math.Numerics.fzero: length of array x0 has to be at least two.")
                }
                K = H[0];
                A = G.apply(M, [K]);
                B++;
                J = H[1];
                x = G.apply(M, [J]);
                B++
            }
            else
            {
                K = H;
                A = G.apply(M, [K]);
                B++;
                if (K == 0)
                {
                    L = 1
                }
                else
                {
                    L = K
                }
                j = [0.9 * L, 1.1 * L, L - 1, L + 1, 0.5 * L, 1.5 * L, -L, 2 * L, -10 * L, 10 * L];
                E = j.length;
                for (D = 0; D < E; D++)
                {
                    J = j[D];
                    x = G.apply(M, [J]);
                    B++;
                    if (A * x <= 0)
                    {
                        break
                    }
                }
                if (J < K)
                {
                    n = K;
                    K = J;
                    J = n;
                    h = A;
                    A = x;
                    x = h
                }
            }
            if (A * x > 0)
            {
                if (e.isArray(H))
                {
                    return this.fminbr(G, [K, J], M)
                }
                else
                {
                    return this.Newton(G, K, M)
                }
            }
            I = K;
            w = A;
            while (y < g)
            {
                C = J - K;
                if (d.abs(w) < d.abs(x))
                {
                    K = J;
                    J = I;
                    I = K;
                    A = x;
                    x = w;
                    w = A
                }
                F = 2 * r * d.abs(J) + z * 0.5;
                m = (I - J) * 0.5;
                if (d.abs(m) <= F || d.abs(x) <= r)
                {
                    return J
                }
                if (d.abs(C) >= F && d.abs(A) > d.abs(x))
                {
                    t = I - J;
                    if (K == I)
                    {
                        l = x / A;
                        v = t * l;
                        s = 1 - l
                    }
                    else
                    {
                        s = A / w;
                        l = x / w;
                        k = x / A;
                        v = k * (t * s * (s - l) - (J - K) * (l - 1));
                        s = (s - 1) * (l - 1) * (k - 1)
                    }
                    if (v > 0)
                    {
                        s = -s
                    }
                    else
                    {
                        v = -v
                    }
                    if (v < (0.75 * t * s - d.abs(F * s) * 0.5) && v < d.abs(C * s * 0.5))
                    {
                        m = v / s
                    }
                }
                if (d.abs(m) < F)
                {
                    if (m > 0)
                    {
                        m = F
                    }
                    else
                    {
                        m = -F
                    }
                }
                K = J;
                A = x;
                J += m;
                x = G.apply(M, [J]);
                B++;
                if ((x > 0 && w > 0) || (x < 0 && w < 0))
                {
                    I = K;
                    w = A
                }
                y++
            }
            e.debug("fzero: maxiter=" + g + " reached.");
            return J
        },
        fminbr: function (H, I, M)
        {
            var L, J, l, s, n, h, j, i, z = (3 - d.sqrt(5)) * 0.5,
                E = e.Math.eps,
                B = d.sqrt(e.Math.eps),
                g = 50,
                D = 0,
                y, K, G, m, C, A, u, k, F = 0;
            if (!e.isArray(I) || I.length < 2)
            {
                throw new Error("JXG.Math.Numerics.fminbr: length of array x0 has to be at least two.")
            }
            L = I[0];
            J = I[1];
            s = L + z * (J - L);
            j = H.apply(M, [s]);
            F++;
            l = s;
            n = s;
            h = j;
            i = j;
            while (D < g)
            {
                y = J - L;
                K = (L + J) * 0.5;
                G = B * d.abs(l) + E / 3;
                if (d.abs(l - K) + y * 0.5 <= 2 * G)
                {
                    return l
                }
                m = z * (l < K ? J - l : L - l);
                if (d.abs(l - n) >= G)
                {
                    u = (l - n) * (h - j);
                    A = (l - s) * (h - i);
                    C = (l - s) * A - (l - n) * u;
                    A = 2 * (A - u);
                    if (A > 0)
                    {
                        C = -C
                    }
                    else
                    {
                        A = -A
                    }
                    if (d.abs(C) < d.abs(m * A) && C > A * (L - l + 2 * G) && C < A * (J - l - 2 * G))
                    {
                        m = C / A
                    }
                }
                if (d.abs(m) < G)
                {
                    if (m > 0)
                    {
                        m = G
                    }
                    else
                    {
                        m = -G
                    }
                }
                u = l + m;
                k = H.apply(M, [u]);
                F++;
                if (k <= h)
                {
                    if (u < l)
                    {
                        J = l
                    }
                    else
                    {
                        L = l
                    }
                    s = n;
                    n = l;
                    l = u;
                    j = i;
                    i = h;
                    h = k
                }
                else
                {
                    if (u < l)
                    {
                        L = u
                    }
                    else
                    {
                        J = u
                    }
                    if (k <= i || n == l)
                    {
                        s = n;
                        n = u;
                        j = i;
                        i = k
                    }
                    else
                    {
                        if (k <= j || s == l || s == n)
                        {
                            s = u;
                            j = k
                        }
                    }
                }
                D++
            }
            e.debug("fminbr: maxiter=" + g + " reached.");
            return l
        },
        reuleauxPolygon: function (i, j)
        {
            var m = d.PI * 2,
                h = m / j,
                l = (j - 1) / 2,
                k, n = 0,
                g = function (q, p)
                {
                    return function (s, v)
                    {
                        if (!v)
                        {
                            n = i[0].Dist(i[l]);
                            k = e.Math.Geometry.rad([i[0].X() + 1, i[0].Y()], i[0], i[(l) % j])
                        }
                        var u = (s % m + m) % m;
                        var r = d.floor(u / h) % j;
                        if (isNaN(r))
                        {
                            return r
                        }
                        u = u * 0.5 + r * h * 0.5 + k;
                        return i[r][q]() + n * d[p](u)
                    }
                };
            return [g("X", "cos"), g("Y", "sin"), 0, d.PI * 2]
        }
    }
})(JXG, Math);
JXG.Math.Statistics =
{
};
JXG.Math.Statistics.sum = function (e)
{
    var g, d, f = 0;
    for (g = 0, d = e.length; g < d; g++)
    {
        f += e[g]
    }
    return f
};
JXG.Math.Statistics.prod = function (e)
{
    var g, d, f = 1;
    for (g = 0, d = e.length; g < d; g++)
    {
        f *= e[g]
    }
    return f
};
JXG.Math.Statistics.mean = function (d)
{
    if (d.length > 0)
    {
        return this.sum(d) / d.length
    }
    else
    {
        return 0
    }
};
JXG.Math.Statistics.median = function (e)
{
    var f, d;
    if (e.length > 0)
    {
        f = e.slice(0, e.length);
        f.sort(function (h, g)
        {
            return h - g
        });
        d = f.length;
        if (d % 2 == 1)
        {
            return f[parseInt(d * 0.5)]
        }
        else
        {
            return (f[d * 0.5 - 1] + f[d * 0.5]) * 0.5
        }
    }
    else
    {
        return 0
    }
};
JXG.Math.Statistics.variance = function (f)
{
    var e, h, g, d;
    if (f.length > 1)
    {
        e = this.mean(f);
        h = 0;
        for (g = 0, d = f.length; g < d; g++)
        {
            h += (f[g] - e) * (f[g] - e)
        }
        return h / (f.length - 1)
    }
    else
    {
        return 0
    }
};
JXG.Math.Statistics.sd = function (d)
{
    return Math.sqrt(this.variance(d))
};
JXG.Math.Statistics.weightedMean = function (d, e)
{
    if (d.length != e.length)
    {
        return
    }
    if (d.length > 0)
    {
        return this.mean(this.multiply(d, e))
    }
    else
    {
        return 0
    }
};
JXG.Math.Statistics.max = function (e)
{
    var g, f, d;
    if (e.length == 0)
    {
        return NaN
    }
    g = e[0];
    for (f = 1, d = e.length; f < d; f++)
    {
        g = (e[f] > g) ? (e[f]) : g
    }
    return g
};
JXG.Math.Statistics.min = function (e)
{
    var g, f, d;
    if (e.length == 0)
    {
        return NaN
    }
    g = e[0];
    for (f = 1, d = e.length; f < d; f++)
    {
        g = (e[f] < g) ? (e[f]) : g
    }
    return g
};
JXG.Math.Statistics.range = function (d)
{
    return [this.min(d), this.max(d)]
};
JXG.Math.Statistics.diff = function (d)
{
    return d
};
JXG.Math.Statistics.min = function (e)
{
    var g, f, d;
    if (e.length == 0)
    {
        return NaN
    }
    g = e[0];
    for (f = 1, d = e.length; f < d; f++)
    {
        g = (e[f] < g) ? (e[f]) : g
    }
    return g
};
JXG.Math.Statistics.abs = function (e)
{
    var g, d, f = [];
    if (typeof JXG.isArray(arr1))
    {
        for (g = 0, d = e.length; g < d; g++)
        {
            f[g] = Math.abs(e[g])
        }
    }
    else
    {
        if (typeof e == "number")
        {
            return Math.abs(e)
        }
        else
        {
            f = null
        }
    }
    return f
};
JXG.Math.Statistics.add = function (f, e)
{
    var h, d, g = [];
    if (typeof JXG.isArray(f) && typeof e == "number")
    {
        for (h = 0, d = f.length; h < d; h++)
        {
            g[h] = f[h] + e
        }
    }
    else
    {
        if (typeof f == "number" && typeof JXG.isArray(e))
        {
            for (h = 0, d = e.length; h < d; h++)
            {
                g[h] = f + e[h]
            }
        }
        else
        {
            if (typeof JXG.isArray(f) && typeof JXG.isArray(e))
            {
                for (h = 0, d = Math.min(f.length, e.length); h < d; h++)
                {
                    g[h] = f[h] + e[h]
                }
            }
            else
            {
                if (typeof f == "number" && typeof e == "number")
                {
                    g = f + e
                }
                else
                {
                    g = null
                }
            }
        }
    }
    return g
};
JXG.Math.Statistics.divide = function (f, e)
{
    var h, d, g = [];
    if (typeof JXG.isArray(f) && typeof e == "number")
    {
        for (h = 0, d = f.length; h < d; h++)
        {
            g[h] = f[h] / e
        }
    }
    else
    {
        if (typeof f == "number" && typeof JXG.isArray(e))
        {
            for (h = 0, d = e.length; h < d; h++)
            {
                g[h] = f / e[h]
            }
        }
        else
        {
            if (typeof JXG.isArray(f) && typeof JXG.isArray(e))
            {
                for (h = 0, d = Math.min(f.length, e.length); h < d; h++)
                {
                    g[h] = f[h] / e[h]
                }
            }
            else
            {
                if (typeof f == "number" && typeof e == "number")
                {
                    g = f / e
                }
                else
                {
                    g = null
                }
            }
        }
    }
    return g
};
JXG.Math.Statistics.mod = function (f, e)
{
    var h, d, g = [];
    if (typeof JXG.isArray(f) && typeof e == "number")
    {
        for (h = 0, d = f.length; h < d; h++)
        {
            g[h] = f[h] % e
        }
    }
    else
    {
        if (typeof f == "number" && typeof JXG.isArray(e))
        {
            for (h = 0, d = e.length; h < d; h++)
            {
                g[h] = f % e[h]
            }
        }
        else
        {
            if (typeof JXG.isArray(f) && typeof JXG.isArray(e))
            {
                for (h = 0, d = Math.min(f.length, e.length); h < d; h++)
                {
                    g[h] = f[h] % e[h]
                }
            }
            else
            {
                if (typeof f == "number" && typeof e == "number")
                {
                    g = f % e
                }
                else
                {
                    g = null
                }
            }
        }
    }
    return g
};
JXG.Math.Statistics.multiply = function (f, e)
{
    var h, d, g = [];
    if (typeof JXG.isArray(f) && typeof e == "number")
    {
        for (h = 0, d = f.length; h < d; h++)
        {
            g[h] = f[h] * e
        }
    }
    else
    {
        if (typeof f == "number" && typeof JXG.isArray(e))
        {
            for (h = 0, d = e.length; h < d; h++)
            {
                g[h] = f * e[h]
            }
        }
        else
        {
            if (typeof JXG.isArray(f) && typeof JXG.isArray(e))
            {
                for (h = 0, d = Math.min(f.length, e.length); h < d; h++)
                {
                    g[h] = f[h] * e[h]
                }
            }
            else
            {
                if (typeof f == "number" && typeof e == "number")
                {
                    g = f * e
                }
                else
                {
                    g = null
                }
            }
        }
    }
    return g
};
JXG.Math.Statistics.subtract = function (f, e)
{
    var h, d, g = [];
    if (typeof JXG.isArray(f) && typeof e == "number")
    {
        for (h = 0, d = f.length; h < d; h++)
        {
            g[h] = f[h] - e
        }
    }
    else
    {
        if (typeof f == "number" && typeof JXG.isArray(e))
        {
            for (h = 0, d = e.length; h < d; h++)
            {
                g[h] = f - e[h]
            }
        }
        else
        {
            if (typeof JXG.isArray(f) && typeof JXG.isArray(e))
            {
                for (h = 0, d = Math.min(f.length, e.length); h < d; h++)
                {
                    g[h] = f[h] - e[h]
                }
            }
            else
            {
                if (typeof f == "number" && typeof e == "number")
                {
                    g = f - e
                }
                else
                {
                    g = null
                }
            }
        }
    }
    return g
};
JXG.Math.Symbolic = function (d, e)
{
    return {
        generateSymbolicCoordinatesPartial: function (p, j, i, g)
        {
            var f = function (k)
            {
                var s;
                if (g === "underscore")
                {
                    s = "" + i + "_{" + k + "}"
                }
                else
                {
                    if (g == "brace")
                    {
                        s = "" + i + "[" + k + "]"
                    }
                    else
                    {
                        s = "" + i + "" + k
                    }
                }
                return s
            },
                m = j.ancestors,
                l = 0,
                n, q, h;
            p.listOfFreePoints = [];
            p.listOfDependantPoints = [];
            for (q in m)
            {
                n = 0;
                if (d.isPoint(m[q]))
                {
                    for (h in m[q].ancestors)
                    {
                        n++
                    }
                    if (n === 0)
                    {
                        m[q].symbolic.x = m[q].coords.usrCoords[1];
                        m[q].symbolic.y = m[q].coords.usrCoords[2];
                        p.listOfFreePoints.push(m[q])
                    }
                    else
                    {
                        l++;
                        m[q].symbolic.x = f(l);
                        l++;
                        m[q].symbolic.y = f(l);
                        p.listOfDependantPoints.push(m[q])
                    }
                }
            }
            if (d.isPoint(j))
            {
                j.symbolic.x = "x";
                j.symbolic.y = "y"
            }
            return l
        },
        clearSymbolicCoordinates: function (g)
        {
            var f = function (j)
            {
                var i, h = (j && j.length) || 0;
                for (i = 0; i < h; i++)
                {
                    if (d.isPoint(j[i]))
                    {
                        j[i].symbolic.x = "";
                        j[i].symbolic.y = ""
                    }
                }
            };
            f(g.listOfFreePoints);
            f(g.listOfDependantPoints);
            delete(g.listOfFreePoints);
            delete(g.listOfDependantPoints)
        },
        generatePolynomials: function (n, h, j)
        {
            var m = h.ancestors,
                p, l = [],
                r = [],
                q, f, g;
            if (j)
            {
                this.generateSymbolicCoordinatesPartial(n, h, "u", "brace")
            }
            m[h.id] = h;
            for (q in m)
            {
                p = 0;
                l = [];
                if (d.isPoint(m[q]))
                {
                    for (f in m[q].ancestors)
                    {
                        p++
                    }
                    if (p > 0)
                    {
                        l = m[q].generatePolynomial();
                        for (g = 0; g < l.length; g++)
                        {
                            r.push(l[g])
                        }
                    }
                }
            }
            if (j)
            {
                this.clearSymbolicCoordinates(n)
            }
            return r
        },
        geometricLocusByGroebnerBase: function (n, A)
        {
            var l = this.generateSymbolicCoordinatesPartial(n, A, "u", "brace"),
                m, h, r, f =
                {
                },
                w = new d.Coords(d.COORDS_BY_USR, [0, 0], n),
                u = new d.Coords(d.COORDS_BY_USR, [n.canvasWidth, n.canvasHeight], n),
                k, j, D, G = 1,
                v = 0,
                t = 0,
                p = 0,
                E, x, F, q, z, B, g, C = function (H, I)
                {
                    var s;
                    for (s = 0; s < I.length; s++)
                    {
                        if (I[s].id === H)
                        {
                            return true
                        }
                    }
                    return false
                },
                y = n.options.locus;
            if (d.Server.modules.geoloci === e)
            {
                d.Server.loadModule("geoloci")
            }
            if (d.Server.modules.geoloci === e)
            {
                throw new Error("JSXGraph: Unable to load JXG.Server module 'geoloci.py'.")
            }
            q = w.usrCoords[1];
            z = u.usrCoords[1];
            B = u.usrCoords[2];
            g = w.usrCoords[2];
            if (y.translateToOrigin && (n.listOfFreePoints.length > 0))
            {
                if ((y.toOrigin !== e) && (y.toOrigin != null) && C(y.toOrigin.id, n.listOfFreePoints))
                {
                    k = y.toOrigin
                }
                else
                {
                    k = n.listOfFreePoints[0]
                }
                v = k.symbolic.x;
                t = k.symbolic.y;
                for (D = 0; D < n.listOfFreePoints.length; D++)
                {
                    n.listOfFreePoints[D].symbolic.x -= v;
                    n.listOfFreePoints[D].symbolic.y -= t
                }
                q -= v;
                z -= v;
                B -= t;
                g -= t;
                if (y.translateTo10 && (n.listOfFreePoints.length > 1))
                {
                    if ((y.to10 !== e) && (y.to10 != null) && (y.to10.id != y.toOrigin.id) && C(y.to10.id, n.listOfFreePoints))
                    {
                        j = y.to10
                    }
                    else
                    {
                        if (n.listOfFreePoints[0].id == k.id)
                        {
                            j = n.listOfFreePoints[1]
                        }
                        else
                        {
                            j = n.listOfFreePoints[0]
                        }
                    }
                    p = d.Math.Geometry.rad([1, 0], [0, 0], [j.symbolic.x, j.symbolic.y]);
                    E = Math.cos(-p);
                    x = Math.sin(-p);
                    for (D = 0; D < n.listOfFreePoints.length; D++)
                    {
                        F = n.listOfFreePoints[D].symbolic.x;
                        n.listOfFreePoints[D].symbolic.x = E * n.listOfFreePoints[D].symbolic.x - x * n.listOfFreePoints[D].symbolic.y;
                        n.listOfFreePoints[D].symbolic.y = x * F + E * n.listOfFreePoints[D].symbolic.y
                    }
                    j.symbolic.y = 0;
                    F = q;
                    q = E * q - x * B;
                    B = x * F + E * B;
                    F = z;
                    z = E * z - x * g;
                    g = x * F + E * g;
                    if (y.stretch && (Math.abs(j.symbolic.x) > d.Math.eps))
                    {
                        G = j.symbolic.x;
                        for (D = 0; D < n.listOfFreePoints.length; D++)
                        {
                            n.listOfFreePoints[D].symbolic.x /= G;
                            n.listOfFreePoints[D].symbolic.y /= G
                        }
                        for (D in n.objects)
                        {
                            if ((n.objects[D].elementClass == d.OBJECT_CLASS_CIRCLE) && (n.objects[D].method == "pointRadius"))
                            {
                                f[D] = n.objects[D].radius;
                                n.objects[D].radius /= G
                            }
                        }
                        q /= G;
                        z /= G;
                        B /= G;
                        g /= G;
                        j.symbolic.x = 1
                    }
                }
                for (D = 0; D < n.listOfFreePoints.length; D++)
                {
                    F = n.listOfFreePoints[D].symbolic.x;
                    if (Math.abs(F) < d.Math.eps)
                    {
                        n.listOfFreePoints[D].symbolic.x = 0
                    }
                    if (Math.abs(F - Math.round(F)) < d.Math.eps)
                    {
                        n.listOfFreePoints[D].symbolic.x = Math.round(F)
                    }
                    F = n.listOfFreePoints[D].symbolic.y;
                    if (Math.abs(F) < d.Math.eps)
                    {
                        n.listOfFreePoints[D].symbolic.y = 0
                    }
                    if (Math.abs(F - Math.round(F)) < d.Math.eps)
                    {
                        n.listOfFreePoints[D].symbolic.y = Math.round(F)
                    }
                }
            }
            m = this.generatePolynomials(n, A);
            h = m.join(",");
            this.cbp = function (i)
            {
                r = i
            };
            this.cb = d.bind(this.cbp, this);
            d.Server.modules.geoloci.lociCoCoA(q, z, B, g, l, h, G, p, v, t, this.cb, true);
            this.clearSymbolicCoordinates(n);
            for (D in f)
            {
                n.objects[D].radius = f[D]
            }
            return r
        }
    }
}(JXG);
JXG.Math.Geometry =
{
    angle: function (f, e, d)
    {
        var i = [],
            h = [],
            g = [],
            k, j, m, l;
        if (f.coords == null)
        {
            i[0] = f[0];
            i[1] = f[1]
        }
        else
        {
            i[0] = f.coords.usrCoords[1];
            i[1] = f.coords.usrCoords[2]
        }
        if (e.coords == null)
        {
            h[0] = e[0];
            h[1] = e[1]
        }
        else
        {
            h[0] = e.coords.usrCoords[1];
            h[1] = e.coords.usrCoords[2]
        }
        if (d.coords == null)
        {
            g[0] = d[0];
            g[1] = d[1]
        }
        else
        {
            g[0] = d.coords.usrCoords[1];
            g[1] = d.coords.usrCoords[2]
        }
        k = i[0] - h[0];
        j = i[1] - h[1];
        m = g[0] - h[0];
        l = g[1] - h[1];
        return Math.atan2(k * l - j * m, k * m + j * l)
    },
    trueAngle: function (d, f, e)
    {
        return this.rad(d, f, e) * 57.29577951308232
    },
    rad: function (g, f, e)
    {
        var d, m, l, k, i, h, j;
        if (g.coords == null)
        {
            d = g[0];
            m = g[1]
        }
        else
        {
            d = g.coords.usrCoords[1];
            m = g.coords.usrCoords[2]
        }
        if (f.coords == null)
        {
            l = f[0];
            k = f[1]
        }
        else
        {
            l = f.coords.usrCoords[1];
            k = f.coords.usrCoords[2]
        }
        if (e.coords == null)
        {
            i = e[0];
            h = e[1]
        }
        else
        {
            i = e.coords.usrCoords[1];
            h = e.coords.usrCoords[2]
        }
        j = Math.atan2(h - k, i - l) - Math.atan2(m - k, d - l);
        if (j < 0)
        {
            j += 6.283185307179586
        }
        return j
    },
    angleBisector: function (i, h, f, l)
    {
        var g = i.coords.usrCoords,
            p = h.coords.usrCoords,
            j = f.coords.usrCoords,
            q = g[1] - p[1],
            n = g[2] - p[2],
            m = Math.sqrt(q * q + n * n),
            e, r, k;
        if (!JXG.exists(l))
        {
            l = i.board
        }
        q /= m;
        n /= m;
        e = Math.acos(q);
        if (n < 0)
        {
            e *= -1
        }
        if (e < 0)
        {
            e += 2 * Math.PI
        }
        q = j[1] - p[1];
        n = j[2] - p[2];
        m = Math.sqrt(q * q + n * n);
        q /= m;
        n /= m;
        r = Math.acos(q);
        if (n < 0)
        {
            r *= -1
        }
        if (r < 0)
        {
            r += 2 * Math.PI
        }
        k = (e + r) * 0.5;
        if (e > r)
        {
            k += Math.PI
        }
        q = Math.cos(k) + p[1];
        n = Math.sin(k) + p[2];
        return new JXG.Coords(JXG.COORDS_BY_USER, [q, n], l)
    },
    reflection: function (p, l, f)
    {
        var h = l.coords.usrCoords,
            q = p.point1.coords.usrCoords,
            g = p.point2.coords.usrCoords,
            e, k, d, i, m, j, n;
        if (!JXG.exists(f))
        {
            f = l.board
        }
        m = g[1] - q[1];
        j = g[2] - q[2];
        e = h[1] - q[1];
        k = h[2] - q[2];
        n = (m * k - j * e) / (m * m + j * j);
        d = h[1] + 2 * n * j;
        i = h[2] - 2 * n * m;
        return new JXG.Coords(JXG.COORDS_BY_USER, [d, i], f)
    },
    rotation: function (d, n, h, i)
    {
        var k = n.coords.usrCoords,
            e = d.coords.usrCoords,
            g, m, j, p, f, l;
        if (!JXG.exists(i))
        {
            i = n.board
        }
        g = k[1] - e[1];
        m = k[2] - e[2];
        j = Math.cos(h);
        p = Math.sin(h);
        f = g * j - m * p + e[1];
        l = g * p + m * j + e[2];
        return new JXG.Coords(JXG.COORDS_BY_USER, [f, l], i)
    },
    perpendicular: function (r, p, i)
    {
        var h = r.point1.coords.usrCoords,
            g = r.point2.coords.usrCoords,
            e = p.coords.usrCoords,
            m, l, k, q, j, f, d, n;
        if (!JXG.exists(i))
        {
            i = p.board
        }
        if (p == r.point1)
        {
            m = h[1] + g[2] - h[2];
            l = h[2] - g[1] + h[1];
            k = true
        }
        else
        {
            if (p == r.point2)
            {
                m = g[1] + h[2] - g[2];
                l = g[2] - h[1] + g[1];
                k = false
            }
            else
            {
                if (((Math.abs(h[1] - g[1]) > JXG.Math.eps) && (Math.abs(e[2] - (h[2] - g[2]) * (e[1] - h[1]) / (h[1] - g[1]) - h[2]) < JXG.Math.eps)) || ((Math.abs(h[1] - g[1]) <= JXG.Math.eps) && (Math.abs(h[1] - e[1]) < JXG.Math.eps)))
                {
                    m = e[1] + g[2] - e[2];
                    l = e[2] - g[1] + e[1];
                    k = true;
                    if (Math.abs(m - e[1]) < JXG.Math.eps && Math.abs(l - e[2]) < JXG.Math.eps)
                    {
                        m = e[1] + h[2] - e[2];
                        l = e[2] - h[1] + e[1];
                        k = false
                    }
                }
                else
                {
                    q = h[2] - g[2];
                    j = h[1] - g[1];
                    f = g[1] * q - g[2] * j;
                    d = e[1] * j + e[2] * q;
                    n = q * q + j * j;
                    if (Math.abs(n) < JXG.Math.eps)
                    {
                        n = JXG.Math.eps
                    }
                    m = (f * q + d * j) / n;
                    l = (d * q - f * j) / n;
                    k = true
                }
            }
        }
        return [new JXG.Coords(JXG.COORDS_BY_USER, [m, l], i), k]
    },
    circumcenterMidpoint: function (k, i, h, g)
    {
        var f = k.coords.usrCoords,
            e = i.coords.usrCoords,
            d = h.coords.usrCoords,
            p, n, m, l, j;
        if (!JXG.exists(g))
        {
            g = k.board
        }
        p = ((f[1] - e[1]) * (f[1] + e[1]) + (f[2] - e[2]) * (f[2] + e[2])) * 0.5;
        n = ((e[1] - d[1]) * (e[1] + d[1]) + (e[2] - d[2]) * (e[2] + d[2])) * 0.5;
        m = (f[1] - e[1]) * (e[2] - d[2]) - (e[1] - d[1]) * (f[2] - e[2]);
        if (Math.abs(m) < JXG.Math.eps)
        {
            m = JXG.Math.eps
        }
        l = (p * (e[2] - d[2]) - n * (f[2] - e[2])) / m;
        j = (n * (f[1] - e[1]) - p * (e[1] - d[1])) / m;
        return new JXG.Coords(JXG.COORDS_BY_USER, [l, j], g)
    },
    distance: function (h, g)
    {
        var f = 0,
            e, d;
        if (h.length != g.length)
        {
            return NaN
        }
        d = h.length;
        for (e = 0; e < d; e++)
        {
            f += (h[e] - g[e]) * (h[e] - g[e])
        }
        return Math.sqrt(f)
    },
    affineDistance: function (f, e)
    {
        var g;
        if (f.length != e.length)
        {
            return NaN
        }
        g = this.distance(f, e);
        if (g > JXG.Math.eps && (Math.abs(f[0]) < JXG.Math.eps || Math.abs(e[0]) < JXG.Math.eps))
        {
            return Infinity
        }
        else
        {
            return g
        }
    },
    intersectLineLine: function (p, n, j)
    {
        var i = p.point1.coords.usrCoords,
            g = p.point2.coords.usrCoords,
            f = n.point1.coords.usrCoords,
            d = n.point2.coords.usrCoords,
            h, e, m, l, k;
        if (!JXG.exists(j))
        {
            j = p.board
        }
        h = i[1] * g[2] - i[2] * g[1];
        e = f[1] * d[2] - f[2] * d[1];
        m = (g[2] - i[2]) * (f[1] - d[1]) - (i[1] - g[1]) * (d[2] - f[2]);
        if (Math.abs(m) < JXG.Math.eps)
        {
            m = JXG.Math.eps
        }
        l = (h * (f[1] - d[1]) - e * (i[1] - g[1])) / m;
        k = (e * (g[2] - i[2]) - h * (d[2] - f[2])) / m;
        return new JXG.Coords(JXG.COORDS_BY_USER, [l, k], j)
    },
    intersectCircleLine: function (k, v, m)
    {
        var K = v.point1.coords.usrCoords,
            I = v.point2.coords.usrCoords,
            g = k.midpoint.coords.usrCoords,
            C, e, J, H, A, F, D, n, B, z, j, i, E, t, p, f, u, q, G;
        if (!JXG.exists(m))
        {
            m = v.board
        }
        C = v.point1.Dist(v.point2);
        if (C > 0)
        {
            e = k.midpoint.Dist(v.point1);
            J = k.midpoint.Dist(v.point2);
            H = ((e * e) + (C * C) - (J * J)) / (2 * C);
            A = (e * e) - (H * H);
            A = (A < 0) ? 0 : A;
            F = Math.sqrt(A);
            D = k.Radius();
            n = Math.sqrt((D * D) - F * F);
            B = I[1] - K[1];
            z = I[2] - K[2];
            j = g[1] + (F / C) * z;
            i = g[2] - (F / C) * B;
            e = (I[1] * z) - (I[2] * B);
            J = (j * B) + (i * z);
            E = (z * z) + (B * B);
            if (Math.abs(E) < JXG.Math.eps)
            {
                E = JXG.Math.eps
            }
            t = ((e * z) + (J * B)) / E;
            p = ((J * z) - (e * B)) / E;
            f = n / C;
            u = new JXG.Coords(JXG.COORDS_BY_USER, [t + f * B, p + f * z], m);
            q = new JXG.Coords(JXG.COORDS_BY_USER, [t - f * B, p - f * z], m);
            G = k.midpoint.coords.distance(JXG.COORDS_BY_USER, u);
            if ((D < (G - 1)) || isNaN(G))
            {
                return [0]
            }
            else
            {
                return [2, u, q]
            }
        }
        return [0]
    },
    intersectCircleCircle: function (l, k, n)
    {
        var e =
        {
        },
            i = l.Radius(),
            g = k.Radius(),
            f = l.midpoint.coords.usrCoords,
            d = k.midpoint.coords.usrCoords,
            q, j, u, t, r, p, m;
        if (!JXG.exists(n))
        {
            n = l.board
        }
        q = i + g;
        j = Math.abs(i - g);
        u = l.midpoint.coords.distance(JXG.COORDS_BY_USER, k.midpoint.coords);
        if (u > q)
        {
            return [0]
        }
        else
        {
            if (u < j)
            {
                return [0]
            }
            else
            {
                if (u != 0)
                {
                    e[0] = 1;
                    t = d[1] - f[1];
                    r = d[2] - f[2];
                    p = (u * u - g * g + i * i) / (2 * u);
                    m = Math.sqrt(i * i - p * p);
                    e[1] = new JXG.Coords(JXG.COORDS_BY_USER, [f[1] + (p / u) * t + (m / u) * r, f[2] + (p / u) * r - (m / u) * t], n);
                    e[2] = new JXG.Coords(JXG.COORDS_BY_USER, [f[1] + (p / u) * t - (m / u) * r, f[2] + (p / u) * r + (m / u) * t], n)
                }
                else
                {
                    return [0]
                }
                return e
            }
        }
    },
    meet: function (g, e, f, h)
    {
        var d = JXG.Math.eps;
        if (Math.abs(g[3]) < d && Math.abs(e[3]) < d)
        {
            return this.meetLineLine(g, e, f, h)
        }
        else
        {
            if (Math.abs(g[3]) >= d && Math.abs(e[3]) < d)
            {
                return this.meetLineCircle(e, g, f, h)
            }
            else
            {
                if (Math.abs(g[3]) < d && Math.abs(e[3]) >= d)
                {
                    return this.meetLineCircle(g, e, f, h)
                }
                else
                {
                    return this.meetCircleCircle(g, e, f, h)
                }
            }
        }
    },
    meetLineLine: function (e, d, f, h)
    {
        var g = JXG.Math.crossProduct(e, d);
        if (Math.abs(g[0]) > JXG.Math.eps)
        {
            g[1] /= g[0];
            g[2] /= g[0];
            g[0] = 1
        }
        return new JXG.Coords(JXG.COORDS_BY_USER, g, h)
    },
    meetLineCircle: function (j, e, p, q)
    {
        var v, u, s, r, l, h, g, f, m, w;
        if (e[4] < JXG.Math.eps)
        {
            return new JXG.Coords(JXG.COORDS_BY_USER, e.slice(1, 3), q)
        }
        s = e[0];
        u = e.slice(1, 3);
        v = e[3];
        r = j[0];
        l = j.slice(1, 3);
        h = v;
        g = (u[0] * l[1] - u[1] * l[0]);
        f = v * r * r - (u[0] * l[0] + u[1] * l[1]) * r + s;
        m = g * g - 4 * h * f;
        if (m >= 0)
        {
            m = Math.sqrt(m);
            w = [(-g + m) / (2 * h), (-g - m) / (2 * h)];
            return ((p == 0) ? new JXG.Coords(JXG.COORDS_BY_USER, [-w[0] * (-l[1]) - r * l[0], -w[0] * l[0] - r * l[1]], q) : new JXG.Coords(JXG.COORDS_BY_USER, [-w[1] * (-l[1]) - r * l[0], -w[1] * l[0] - r * l[1]], q))
        }
        else
        {
            return new JXG.Coords(JXG.COORDS_BY_USER, [NaN, NaN], q)
        }
    },
    meetCircleCircle: function (f, d, e, g)
    {
        var h;
        if (f[4] < JXG.Math.eps)
        {
            if (this.distance(f.slice(1, 3), d.slice(1, 3)) == d[4])
            {
                return new JXG.Coords(JXG.COORDS_BY_USER, f.slice(1, 3), g)
            }
            else
            {
                return new JXG.Coords(JXG.COORDS_BY_USER, [NaN, NaN], g)
            }
        }
        if (d[4] < JXG.Math.eps)
        {
            if (this.distance(d.slice(1, 3), f.slice(1, 3)) == f[4])
            {
                return new JXG.Coords(JXG.COORDS_BY_USER, d.slice(1, 3), g)
            }
            else
            {
                return new JXG.Coords(JXG.COORDS_BY_USER, [NaN, NaN], g)
            }
        }
        h = [d[3] * f[0] - f[3] * d[0], d[3] * f[1] - f[3] * d[1], d[3] * f[2] - f[3] * d[2], 0, 1, Infinity, Infinity, Infinity];
        h = JXG.Math.normalize(h);
        return this.meetLineCircle(h, f, e, g)
    },
    meetCurveCurve: function (s, r, h, k, m)
    {
        var l = 0,
            p, n, A, y, w, v, g, u, t, q, z, x, j, i;
        if (!JXG.exists(m))
        {
            m = s.board
        }
        if (arguments.callee.t1memo)
        {
            p = arguments.callee.t1memo;
            n = arguments.callee.t2memo
        }
        else
        {
            p = h;
            n = k
        }
        u = s.X(p) - r.X(n);
        t = s.Y(p) - r.Y(n);
        q = u * u + t * t;
        z = s.board.D(s.X, s);
        x = r.board.D(r.X, r);
        j = s.board.D(s.Y, s);
        i = r.board.D(r.Y, r);
        while (q > JXG.Math.eps && l < 10)
        {
            A = z(p);
            y = -x(n);
            w = j(p);
            v = -i(n);
            g = A * v - y * w;
            p -= (v * u - y * t) / g;
            n -= (A * t - w * u) / g;
            u = s.X(p) - r.X(n);
            t = s.Y(p) - r.Y(n);
            q = u * u + t * t;
            l++
        }
        arguments.callee.t1memo = p;
        arguments.callee.t2memo = n;
        if (Math.abs(p) < Math.abs(n))
        {
            return (new JXG.Coords(JXG.COORDS_BY_USER, [s.X(p), s.Y(p)], m))
        }
        else
        {
            return (new JXG.Coords(JXG.COORDS_BY_USER, [r.X(n), r.Y(n)], m))
        }
    },
    meetCurveLine: function (s, r, e, j)
    {
        var p, l, u, g, q, h, k, x, v, w, n, m, f, d;
        if (!JXG.exists(j))
        {
            j = s.board
        }
        for (u = 0; u <= 1; u++)
        {
            if (arguments[u].elementClass == JXG.OBJECT_CLASS_CURVE)
            {
                g = arguments[u]
            }
            else
            {
                if (arguments[u].elementClass == JXG.OBJECT_CLASS_LINE)
                {
                    q = arguments[u]
                }
                else
                {
                    throw new Error("JSXGraph: Can't call meetCurveLine with parent class " + (arguments[u].elementClass) + ".")
                }
            }
        }
        h = function (i)
        {
            return q.stdform[0] + q.stdform[1] * g.X(i) + q.stdform[2] * g.Y(i)
        };
        if (arguments.callee.t1memo)
        {
            n = arguments.callee.t1memo;
            p = JXG.Math.Numerics.root(h, n)
        }
        else
        {
            n = g.minX();
            m = g.maxX();
            p = JXG.Math.Numerics.root(h, [n, m])
        }
        arguments.callee.t1memo = p;
        f = g.X(p);
        d = g.Y(p);
        if (e == 1)
        {
            if (arguments.callee.t2memo)
            {
                n = arguments.callee.t2memo;
                l = JXG.Math.Numerics.root(h, n)
            }
            if (!(Math.abs(l - p) > 0.1 && Math.abs(f - g.X(l)) > 0.1 && Math.abs(d - g.Y(l)) > 0.1))
            {
                v = 20;
                w = (g.maxX() - g.minX()) / v;
                x = g.minX();
                for (u = 0; u < v; u++)
                {
                    l = JXG.Math.Numerics.root(h, [x, x + w]);
                    if (Math.abs(l - p) > 0.1 && Math.abs(f - g.X(l)) > 0.1 && Math.abs(d - g.Y(l)) > 0.1)
                    {
                        break
                    }
                    x += w
                }
            }
            p = l;
            arguments.callee.t2memo = p
        }
        if (Math.abs(h(p)) > JXG.Math.eps)
        {
            k = 0
        }
        else
        {
            k = 1
        }
        return (new JXG.Coords(JXG.COORDS_BY_USER, [k, g.X(p), g.Y(p)], j))
    },
    projectPointToCircle: function (l, d, f)
    {
        var i = l.coords.distance(JXG.COORDS_BY_USER, d.midpoint.coords),
            e = l.coords.usrCoords,
            g = d.midpoint.coords.usrCoords,
            k, j, h;
        if (!JXG.exists(f))
        {
            f = l.board
        }
        if (Math.abs(i) < JXG.Math.eps)
        {
            i = JXG.Math.eps
        }
        h = d.Radius() / i;
        k = g[1] + h * (e[1] - g[1]);
        j = g[2] + h * (e[2] - g[2]);
        return new JXG.Coords(JXG.COORDS_BY_USER, [k, j], f)
    },
    projectPointToLine: function (d, e, g)
    {
        var f = [0, e.stdform[1], e.stdform[2]];
        if (!JXG.exists(g))
        {
            g = d.board
        }
        f = JXG.Math.crossProduct(f, d.coords.usrCoords);
        return this.meetLineLine(f, e.stdform, 0, g)
    },
    projectPointToCurve: function (f, i, h)
    {
        if (!JXG.exists(h))
        {
            h = f.board
        }
        var e = f.X(),
            j = f.Y(),
            g = f.position || 0,
            d = this.projectCoordsToCurve(e, j, g, i, h);
        f.position = d[1];
        return d[0]
    },
    projectCoordsToCurve: function (n, l, q, r, h)
    {
        var C, A, e, z, d, k, v, B, s, g, u, p = 1000000,
            m, F, D, f, E, w;
        if (!JXG.exists(h))
        {
            h = r.board
        }
        if (r.curveType == "parameter" || r.curveType == "polar")
        {
            m = function (x)
            {
                var j = n - r.X(x),
                    i = l - r.Y(x);
                return j * j + i * i
            };
            f = m(q);
            w = 20;
            E = (r.maxX() - r.minX()) / w;
            F = r.minX();
            for (u = 0; u < w; u++)
            {
                D = m(F);
                if (D < f)
                {
                    q = F;
                    f = D
                }
                F += E
            }
            q = JXG.Math.Numerics.root(JXG.Math.Numerics.D(m), q);
            if (q < r.minX())
            {
                q = r.maxX() + q - r.minX()
            }
            if (q > r.maxX())
            {
                q = r.minX() + q - r.maxX()
            }
            C = new JXG.Coords(JXG.COORDS_BY_USER, [r.X(q), r.Y(q)], h)
        }
        else
        {
            if (r.curveType == "plot")
            {
                B = p;
                for (v = 0; v < r.numberPoints; v++)
                {
                    A = n - r.X(v);
                    e = l - r.Y(v);
                    s = Math.sqrt(A * A + e * e);
                    if (s < B)
                    {
                        B = s;
                        q = v
                    }
                    if (v == r.numberPoints - 1)
                    {
                        continue
                    }
                    z = r.X(v + 1) - r.X(v);
                    d = r.Y(v + 1) - r.Y(v);
                    k = z * z + d * d;
                    if (k >= JXG.Math.eps)
                    {
                        g = (A * z + e * d) / k;
                        s = Math.sqrt(A * A + e * e - g * (A * z + e * d))
                    }
                    else
                    {
                        g = 0;
                        s = Math.sqrt(A * A + e * e)
                    }
                    if (g >= 0 && g <= 1 && s < B)
                    {
                        q = v + g;
                        B = s
                    }
                }
                v = Math.floor(q);
                g = q - v;
                if (v < r.numberPoints - 1)
                {
                    n = g * r.X(v + 1) + (1 - g) * r.X(v);
                    l = g * r.Y(v + 1) + (1 - g) * r.Y(v)
                }
                else
                {
                    n = r.X(v);
                    l = r.Y(v)
                }
                C = new JXG.Coords(JXG.COORDS_BY_USER, [n, l], h)
            }
            else
            {
                q = n;
                n = q;
                l = r.Y(q);
                C = new JXG.Coords(JXG.COORDS_BY_USER, [n, l], h)
            }
        }
        return [r.updateTransform(C), q]
    },
    projectPointToTurtle: function (p, s, k)
    {
        var r, u, n, m, f, q = 0,
            j = 0,
            g = 1000000,
            l, d, e, h = s.objects.length;
        if (!JXG.exists(k))
        {
            k = p.board
        }
        for (f = 0; f < h; f++)
        {
            d = s.objects[f];
            if (d.elementClass == JXG.OBJECT_CLASS_CURVE)
            {
                r = this.projectPointToCurve(p, d);
                l = this.distance(r.usrCoords, p.coords.usrCoords);
                if (l < g)
                {
                    n = r.usrCoords[1];
                    m = r.usrCoords[2];
                    u = p.position;
                    g = l;
                    e = d;
                    j = q
                }
                q += d.numberPoints
            }
        }
        r = new JXG.Coords(JXG.COORDS_BY_USER, [n, m], k);
        p.position = u + j;
        return e.updateTransform(r)
    }
};
JXG.Complex = function (d, e)
{
    this.isComplex = true;
    if (typeof d == "undefined")
    {
        d = 0
    }
    if (typeof e == "undefined")
    {
        e = 0
    }
    if (d.isComplex)
    {
        e = d.imaginary;
        d = d.real
    }
    this.real = d;
    this.imaginary = e;
    this.absval = 0;
    this.angle = 0
};
JXG.Complex.prototype.toString = function ()
{
    return "" + this.real + " + " + this.imaginary + "i"
};
JXG.Complex.prototype.add = function (d)
{
    if (typeof d == "number")
    {
        this.real += d
    }
    else
    {
        this.real += d.real;
        this.imaginary += d.imaginary
    }
};
JXG.Complex.prototype.sub = function (d)
{
    if (typeof d == "number")
    {
        this.real -= d
    }
    else
    {
        this.real -= d.real;
        this.imaginary -= d.imaginary
    }
};
JXG.Complex.prototype.mult = function (f)
{
    var e, d;
    if (typeof f == "number")
    {
        this.real *= f;
        this.imaginary *= f
    }
    else
    {
        e = this.real;
        d = this.imaginary;
        this.real = e * f.real - d * f.imaginary;
        this.imaginary = e * f.imaginary + d * f.real
    }
};
JXG.Complex.prototype.div = function (g)
{
    var e, d, f;
    if (typeof g == "number")
    {
        if (Math.abs(g) < Math.eps)
        {
            this.real = Infinity;
            this.imaginary = Infinity;
            return
        }
        this.real /= g;
        this.imaginary /= g
    }
    else
    {
        if ((Math.abs(g.real) < Math.eps) && (Math.abs(g.imaginary) < Math.eps))
        {
            this.real = Infinity;
            this.imaginary = Infinity;
            return
        }
        e = g.real * g.real + g.imaginary * g.imaginary;
        f = this.real;
        d = this.imaginary;
        this.real = (f * g.real + d * g.imaginary) / e;
        this.imaginary = (d * g.real - f * g.imaginary) / e
    }
};
JXG.Complex.prototype.conj = function ()
{
    this.imaginary *= -1
};
JXG.C =
{
};
JXG.C.add = function (e, d)
{
    var f = new JXG.Complex(e);
    f.add(d);
    return f
};
JXG.C.sub = function (e, d)
{
    var f = new JXG.Complex(e);
    f.sub(d);
    return f
};
JXG.C.mult = function (e, d)
{
    var f = new JXG.Complex(e);
    f.mult(d);
    return f
};
JXG.C.div = function (e, d)
{
    var f = new JXG.Complex(e);
    f.div(d);
    return f
};
JXG.C.conj = function (d)
{
    var e = new JXG.Complex(d);
    e.conj();
    return e
};
JXG.C.abs = function (d)
{
    var e = new JXG.Complex(d);
    e.conj();
    e.mult(d);
    return Math.sqrt(e.real)
};
JXG.AbstractRenderer = function ()
{
    return {
        vOffsetText: 8,
        enhancedRendering: true,
        updateVisual: function (d, f, e)
        {
            f = f || {
            };
            if (e || this.enhancedRendering)
            {
                if (!d.visProp.draft)
                {
                    if (!f.stroke)
                    {
                        this.setObjectStrokeWidth(d, d.visProp.strokeWidth);
                        this.setObjectStrokeColor(d, d.visProp.strokeColor, d.visProp.strokeOpacity)
                    }
                    if (!f.fill)
                    {
                        this.setObjectFillColor(d, d.visProp.fillColor, d.visProp.fillOpacity)
                    }
                    if (!f.dash)
                    {
                        this.setDashStyle(d, d.visProp)
                    }
                    if (!f.shadow)
                    {
                        this.setShadow(d)
                    }
                }
                else
                {
                    this.setDraft(d)
                }
            }
        },
        drawPoint: function (e)
        {
            var d, f = JXG.Point.prototype.normalizeFace.call(this, e.visProp.face);
            if (f === "o")
            {
                d = "circle"
            }
            else
            {
                if (f === "[]")
                {
                    d = "rect"
                }
                else
                {
                    d = "path"
                }
            }
            this.appendChildPrim(this.createPrim(d, e.id), e.layer);
            this.appendNodesToElement(e, d);
            this.updateVisual(e, {
                dash: true,
                shadow: true
            }, true);
            this.updatePoint(e)
        },
        updatePoint: function (e)
        {
            var d = e.visProp.size,
                f = JXG.Point.prototype.normalizeFace.call(this, e.visProp.face);
            if (isNaN(e.coords.scrCoords[2]) || isNaN(e.coords.scrCoords[1]))
            {
                return
            }
            this.updateVisual(e, {
                dash: false,
                shadow: false
            });
            d *= ((!e.board || !e.board.options.point.zoom) ? 1 : Math.sqrt(e.board.zoomX * e.board.zoomY));
            if (f === "o")
            {
                this.updateCirclePrim(e.rendNode, e.coords.scrCoords[1], e.coords.scrCoords[2], d + 1)
            }
            else
            {
                if (f === "[]")
                {
                    this.updateRectPrim(e.rendNode, e.coords.scrCoords[1] - d, e.coords.scrCoords[2] - d, d * 2, d * 2)
                }
                else
                {
                    this.updatePathPrim(e.rendNode, this.updatePathStringPoint(e, d, f), e.board)
                }
            }
            this.setShadow(e)
        },
        changePointStyle: function (d)
        {
            var e = this.getElementById(d.id);
            if (JXG.exists(e))
            {
                this.remove(e)
            }
            this.drawPoint(d);
            JXG.clearVisPropOld(d);
            if (!d.visProp.visible)
            {
                this.hide(d)
            }
            if (d.visProp.draft)
            {
                this.setDraft(d)
            }
        },
        drawLine: function (d)
        {
            this.appendChildPrim(this.createPrim("line", d.id), d.layer);
            this.appendNodesToElement(d, "lines");
            this.updateLine(d)
        },
        updateLine: function (e)
        {
            var l = new JXG.Coords(JXG.COORDS_BY_USER, e.point1.coords.usrCoords, e.board),
                k = new JXG.Coords(JXG.COORDS_BY_USER, e.point2.coords.usrCoords, e.board),
                d, m, g, f, j, i, h;
            this.calcStraight(e, l, k);
            this.updateLinePrim(e.rendNode, l.scrCoords[1], l.scrCoords[2], k.scrCoords[1], k.scrCoords[2], e.board);
            if (e.image != null)
            {
                d = l.scrCoords[1];
                m = l.scrCoords[2];
                g = k.scrCoords[1];
                f = k.scrCoords[2];
                j = Math.atan2(f - m, g - d);
                i = 250;
                h = 256;
                e.imageTransformMatrix = [
                    [1, 0, 0],
                    [i * (1 - Math.cos(j)) + h * Math.sin(j), Math.cos(j), -Math.sin(j)],
                    [h * (1 - Math.cos(j)) - i * Math.sin(j), Math.sin(j), Math.cos(j)]
                ]
            }
            this.makeArrows(e);
            this.updateVisual(e, {
                fill: true
            })
        },
        calcStraight: function (g, q, p)
        {
            var e, d, m, k, r, f, n, v, l, h, u, t;
            r = g.visProp.straightFirst;
            f = g.visProp.straightLast;
            if (Math.abs(q.scrCoords[0]) < JXG.Math.eps)
            {
                r = true
            }
            if (Math.abs(p.scrCoords[0]) < JXG.Math.eps)
            {
                f = true
            }
            if (!r && !f)
            {
                return
            }
            n = [];
            n[0] = g.stdform[0] - g.stdform[1] * g.board.origin.scrCoords[1] / g.board.stretchX + g.stdform[2] * g.board.origin.scrCoords[2] / g.board.stretchY;
            n[1] = g.stdform[1] / g.board.stretchX;
            n[2] = g.stdform[2] / (-g.board.stretchY);
            if (isNaN(n[0] + n[1] + n[2]))
            {
                return
            }
            v = [];
            v[0] = JXG.Math.crossProduct(n, [0, 0, 1]);
            v[1] = JXG.Math.crossProduct(n, [0, 1, 0]);
            v[2] = JXG.Math.crossProduct(n, [-g.board.canvasHeight, 0, 1]);
            v[3] = JXG.Math.crossProduct(n, [-g.board.canvasWidth, 1, 0]);
            for (l = 0; l < 4; l++)
            {
                if (Math.abs(v[l][0]) > JXG.Math.eps)
                {
                    for (h = 2; h > 0; h--)
                    {
                        v[l][h] /= v[l][0]
                    }
                    v[l][0] = 1
                }
            }
            e = false;
            d = false;
            if (!r && q.scrCoords[1] >= 0 && q.scrCoords[1] <= g.board.canvasWidth && q.scrCoords[2] >= 0 && q.scrCoords[2] <= g.board.canvasHeight)
            {
                e = true
            }
            if (!f && p.scrCoords[1] >= 0 && p.scrCoords[1] <= g.board.canvasWidth && p.scrCoords[2] >= 0 && p.scrCoords[2] <= g.board.canvasHeight)
            {
                d = true
            }
            if (Math.abs(v[1][0]) < JXG.Math.eps)
            {
                m = v[0];
                k = v[2]
            }
            else
            {
                if (Math.abs(v[0][0]) < JXG.Math.eps)
                {
                    m = v[1];
                    k = v[3]
                }
                else
                {
                    if (v[1][2] < 0)
                    {
                        m = v[0];
                        if (v[3][2] > g.board.canvasHeight)
                        {
                            k = v[2]
                        }
                        else
                        {
                            k = v[3]
                        }
                    }
                    else
                    {
                        if (v[1][2] > g.board.canvasHeight)
                        {
                            m = v[2];
                            if (v[3][2] < 0)
                            {
                                k = v[0]
                            }
                            else
                            {
                                k = v[3]
                            }
                        }
                        else
                        {
                            m = v[1];
                            if (v[3][2] < 0)
                            {
                                k = v[0]
                            }
                            else
                            {
                                if (v[3][2] > g.board.canvasHeight)
                                {
                                    k = v[2]
                                }
                                else
                                {
                                    k = v[3]
                                }
                            }
                        }
                    }
                }
            }
            m = new JXG.Coords(JXG.COORDS_BY_SCREEN, m.slice(1), g.board);
            k = new JXG.Coords(JXG.COORDS_BY_SCREEN, k.slice(1), g.board);
            if (!e && !d)
            {
                if (!r && f && !this.isSameDirection(q, p, m) && !this.isSameDirection(q, p, k))
                {
                    return
                }
                else
                {
                    if (r && !f && !this.isSameDirection(p, q, m) && !this.isSameDirection(p, q, k))
                    {
                        return
                    }
                }
            }
            if (!e)
            {
                if (!d)
                {
                    if (this.isSameDirection(q, p, m))
                    {
                        if (!this.isSameDirection(q, p, k))
                        {
                            t = m;
                            u = k
                        }
                        else
                        {
                            if (JXG.Math.Geometry.affineDistance(p.usrCoords, m.usrCoords) < JXG.Math.Geometry.affineDistance(p.usrCoords, k.usrCoords))
                            {
                                u = m;
                                t = k
                            }
                            else
                            {
                                t = m;
                                u = k
                            }
                        }
                    }
                    else
                    {
                        if (this.isSameDirection(q, p, k))
                        {
                            u = m;
                            t = k
                        }
                        else
                        {
                            if (JXG.Math.Geometry.affineDistance(p.usrCoords, m.usrCoords) < JXG.Math.Geometry.affineDistance(p.usrCoords, k.usrCoords))
                            {
                                t = m;
                                u = k
                            }
                            else
                            {
                                u = m;
                                t = k
                            }
                        }
                    }
                }
                else
                {
                    if (this.isSameDirection(p, q, m))
                    {
                        u = m
                    }
                    else
                    {
                        u = k
                    }
                }
            }
            else
            {
                if (!d)
                {
                    if (this.isSameDirection(q, p, m))
                    {
                        t = m
                    }
                    else
                    {
                        t = k
                    }
                }
            }
            if (u)
            {
                q.setCoordinates(JXG.COORDS_BY_USER, u.usrCoords.slice(1))
            }
            if (t)
            {
                p.setCoordinates(JXG.COORDS_BY_USER, t.usrCoords.slice(1))
            }
        },
        isSameDirection: function (k, h, f)
        {
            var e, d, j, i, g = false;
            e = h.usrCoords[1] - k.usrCoords[1];
            d = h.usrCoords[2] - k.usrCoords[2];
            j = f.usrCoords[1] - k.usrCoords[1];
            i = f.usrCoords[2] - k.usrCoords[2];
            if (Math.abs(e) < JXG.Math.eps)
            {
                e = 0
            }
            if (Math.abs(d) < JXG.Math.eps)
            {
                d = 0
            }
            if (Math.abs(j) < JXG.Math.eps)
            {
                j = 0
            }
            if (Math.abs(i) < JXG.Math.eps)
            {
                i = 0
            }
            if (e >= 0 && j >= 0)
            {
                if ((d >= 0 && i >= 0) || (d <= 0 && i <= 0))
                {
                    g = true
                }
            }
            else
            {
                if (e <= 0 && j <= 0)
                {
                    if ((d >= 0 && i >= 0) || (d <= 0 && i <= 0))
                    {
                        g = true
                    }
                }
            }
            return g
        },
        updateTicks: function (e, g, d, h, f)
        {
        },
        removeTicks: function (d)
        {
            this.remove(this.getElementById(d.id + "_ticks"))
        },
        drawCurve: function (d)
        {
            this.appendChildPrim(this.createPrim("path", d.id), d.layer);
            this.appendNodesToElement(d, "path");
            this.updateVisual(d, {
                shadow: true
            }, true);
            this.updateCurve(d)
        },
        updateCurve: function (d)
        {
            this.updateVisual(d);
            this.updatePathPrim(d.rendNode, this.updatePathStringPrim(d), d.board);
            this.makeArrows(d)
        },
        drawCircle: function (d)
        {
            this.appendChildPrim(this.createPrim("ellipse", d.id), d.layer);
            this.appendNodesToElement(d, "ellipse");
            this.updateCircle(d)
        },
        updateCircle: function (e)
        {
            this.updateVisual(e);
            var d = e.Radius();
            if (d > 0 && !isNaN(e.midpoint.coords.scrCoords[1] + e.midpoint.coords.scrCoords[2]))
            {
                this.updateEllipsePrim(e.rendNode, e.midpoint.coords.scrCoords[1], e.midpoint.coords.scrCoords[2], (d * e.board.stretchX), (d * e.board.stretchY))
            }
        },
        drawPolygon: function (d)
        {
            this.appendChildPrim(this.createPrim("polygon", d.id), d.layer);
            this.appendNodesToElement(d, "polygon");
            this.updatePolygon(d)
        },
        updatePolygon: function (d)
        {
            this.updateVisual(d, {
                stroke: true,
                dash: true
            });
            this.updatePolygonPrim(d.rendNode, d)
        },
        drawText: function (d)
        {
            var e;
            if (d.display == "html")
            {
                e = this.container.ownerDocument.createElement("div");
                e.style.position = "absolute";
                e.style.color = d.visProp.strokeColor;
                e.className = "JXGtext";
                e.style.zIndex = "10";
                this.container.appendChild(e);
                e.setAttribute("id", this.container.id + "_" + d.id)
            }
            else
            {
                e = this.drawInternalText(d)
            }
            e.style.fontSize = d.board.options.text.fontSize + "px";
            d.rendNode = e;
            d.htmlStr = "";
            this.updateText(d)
        },
        drawInternalText: function (d)
        {
        },
        updateText: function (d)
        {
            if (!d.visProp.visible)
            {
                return
            }
            if (isNaN(d.coords.scrCoords[1] + d.coords.scrCoords[2]))
            {
                return
            }
            this.updateTextStyle(d);
            if (d.display == "html")
            {
                d.rendNode.style.left = (d.coords.scrCoords[1]) + "px";
                d.rendNode.style.top = (d.coords.scrCoords[2] - this.vOffsetText) + "px";
                d.updateText();
                if (d.htmlStr != d.plaintextStr)
                {
                    d.rendNode.innerHTML = d.plaintextStr;
                    if (d.board.options.text.useASCIIMathML)
                    {
                        AMprocessNode(d.rendNode, false)
                    }
                    d.htmlStr = d.plaintextStr;
                    if (d.board.options.text.useMathJax)
                    {
                        MathJax.Hub.Typeset(d.rendNode)
                    }
                }
            }
            else
            {
                this.updateInternalText(d)
            }
        },
        updateInternalText: function (d)
        {
        },
        updateTextStyle: function (e)
        {
            var d;
            if (e.visProp.fontSize)
            {
                if (typeof e.visProp.fontSize == "function")
                {
                    d = e.visProp.fontSize();
                    e.rendNode.style.fontSize = (d > 0 ? d : 0)
                }
                else
                {
                    e.rendNode.style.fontSize = (e.visProp.fontSize)
                }
            }
        },
        drawImage: function (d)
        {
        },
        updateImageURL: function (d)
        {
        },
        updateImage: function (d)
        {
            this.updateRectPrim(d.rendNode, d.coords.scrCoords[1], d.coords.scrCoords[2] - d.size[1], d.size[0], d.size[1]);
            this.updateImageURL(d);
            if (d.parent != null)
            {
                this.transformImageParent(d, d.parent.imageTransformMatrix)
            }
            else
            {
                this.transformImageParent(d)
            }
            this.transformImage(d, d.transformations)
        },
        drawGrid: function (t)
        {
            var q = t.options.grid.gridX,
                p = t.options.grid.gridY,
                g = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], t),
                s = new JXG.Coords(JXG.COORDS_BY_SCREEN, [t.canvasWidth, t.canvasHeight], t),
                m = Math.ceil(g.usrCoords[1]),
                h = 0,
                n, y, f, e, x, w, u, r, v, d;
            t.options.grid.hasGrid = true;
            for (n = 0; n <= q + 1; n++)
            {
                if (m - n / q < g.usrCoords[1])
                {
                    h = n - 1;
                    break
                }
            }
            m = Math.floor(s.usrCoords[1]);
            y = 0;
            for (n = 0; n <= q + 1; n++)
            {
                if (m + n / q > s.usrCoords[1])
                {
                    y = n - 1;
                    break
                }
            }
            m = Math.ceil(s.usrCoords[2]);
            e = 0;
            for (n = 0; n <= p + 1; n++)
            {
                if (m - n / p < s.usrCoords[2])
                {
                    e = n - 1;
                    break
                }
            }
            m = Math.floor(g.usrCoords[2]);
            f = 0;
            for (n = 0; n <= p + 1; n++)
            {
                if (m + n / p > g.usrCoords[2])
                {
                    f = n - 1;
                    break
                }
            }
            x = Math.round((1 / q) * t.stretchX);
            w = Math.round((1 / p) * t.stretchY);
            u = new JXG.Coords(JXG.COORDS_BY_USER, [Math.ceil(g.usrCoords[1]) - h / q, Math.floor(g.usrCoords[2]) + f / p], t);
            r = new JXG.Coords(JXG.COORDS_BY_USER, [Math.floor(s.usrCoords[1]) + y / q, Math.ceil(s.usrCoords[2]) - e / p], t);
            v = this.drawVerticalGrid(u, r, x, t);
            this.appendChildPrim(v, t.options.layer.grid);
            if (!t.options.grid.snapToGrid)
            {
                d = new Object();
                d.visProp =
                {
                };
                d.rendNode = v;
                d.elementClass = JXG.OBJECT_CLASS_LINE;
                d.id = "gridx";
                JXG.clearVisPropOld(d);
                this.setObjectStrokeColor(d, t.options.grid.gridColor, t.options.grid.gridOpacity)
            }
            else
            {
                d = new Object();
                d.visProp =
                {
                };
                d.rendNode = v;
                d.elementClass = JXG.OBJECT_CLASS_LINE;
                d.id = "gridx";
                JXG.clearVisPropOld(d);
                this.setObjectStrokeColor(d, "#FF8080", 0.5)
            }
            this.setPropertyPrim(v, "stroke-width", "0.4px");
            if (t.options.grid.gridDash)
            {
                this.setGridDash("gridx")
            }
            v = this.drawHorizontalGrid(u, r, w, t);
            this.appendChildPrim(v, t.options.layer.grid);
            if (!t.options.grid.snapToGrid)
            {
                d = new Object();
                d.visProp =
                {
                };
                d.rendNode = v;
                d.elementClass = JXG.OBJECT_CLASS_LINE;
                d.id = "gridy";
                JXG.clearVisPropOld(d);
                this.setObjectStrokeColor(d, t.options.grid.gridColor, t.options.grid.gridOpacity)
            }
            else
            {
                d = new Object();
                d.visProp =
                {
                };
                d.rendNode = v;
                d.elementClass = JXG.OBJECT_CLASS_LINE;
                d.id = "gridy";
                JXG.clearVisPropOld(d);
                this.setObjectStrokeColor(d, "#FF8080", 0.5)
            }
            this.setPropertyPrim(v, "stroke-width", "0.4px");
            if (t.options.grid.gridDash)
            {
                this.setGridDash("gridy")
            }
        },
        removeGrid: function (e)
        {
            var d = this.getElementById;
            this.remove(d("gridx"));
            this.remove(d("gridy"));
            e.options.grid.hasGrid = false
        },
        hide: function (d)
        {
        },
        show: function (d)
        {
        },
        setObjectStrokeWidth: function (e, d)
        {
        },
        setObjectStrokeColor: function (f, d, e)
        {
        },
        setObjectFillColor: function (f, d, e)
        {
        },
        setDraft: function (e)
        {
            if (!e.visProp.draft)
            {
                return
            }
            var d = e.board.options.elements.draft.color,
                f = e.board.options.elements.draft.opacity;
            if (e.type == JXG.OBJECT_TYPE_POLYGON)
            {
                this.setObjectFillColor(e, d, f)
            }
            else
            {
                if (e.elementClass == JXG.OBJECT_CLASS_POINT)
                {
                    this.setObjectFillColor(e, d, f)
                }
                else
                {
                    this.setObjectFillColor(e, "none", 0)
                }
                this.setObjectStrokeColor(e, d, f);
                this.setObjectStrokeWidth(e, e.board.options.elements.draft.strokeWidth)
            }
        },
        removeDraft: function (d)
        {
            if (d.type == JXG.OBJECT_TYPE_POLYGON)
            {
                this.setObjectFillColor(d, d.visProp.fillColor, d.visProp.fillColorOpacity)
            }
            else
            {
                if (d.type == JXG.OBJECT_CLASS_POINT)
                {
                    this.setObjectFillColor(d, d.visProp.fillColor, d.visProp.fillColorOpacity)
                }
                this.setObjectStrokeColor(d, d.visProp.strokeColor, d.visProp.strokeColorOpacity);
                this.setObjectStrokeWidth(d, d.visProp.strokeWidth)
            }
        },
        highlight: function (e)
        {
            var d;
            if (!e.visProp.draft)
            {
                if (e.type == JXG.OBJECT_CLASS_POINT)
                {
                    this.setObjectStrokeColor(e, e.visProp.highlightStrokeColor, e.visProp.highlightStrokeOpacity);
                    this.setObjectFillColor(e, e.visProp.highlightStrokeColor, e.visProp.highlightStrokeOpacity)
                }
                else
                {
                    if (e.type == JXG.OBJECT_TYPE_POLYGON)
                    {
                        this.setObjectFillColor(e, e.visProp.highlightFillColor, e.visProp.highlightFillOpacity);
                        for (d = 0; d < e.borders.length; d++)
                        {
                            this.setObjectStrokeColor(e.borders[d], e.borders[d].visProp.highlightStrokeColor, e.visProp.highlightStrokeOpacity)
                        }
                    }
                    else
                    {
                        this.setObjectStrokeColor(e, e.visProp.highlightStrokeColor, e.visProp.highlightStrokeOpacity);
                        this.setObjectFillColor(e, e.visProp.highlightFillColor, e.visProp.highlightFillOpacity)
                    }
                }
                if (e.visProp.highlightStrokeWidth)
                {
                    this.setObjectStrokeWidth(e, e.visProp.highlightStrokeWidth)
                }
            }
        },
        noHighlight: function (e)
        {
            var d;
            if (!e.visProp.draft)
            {
                if (e.type == JXG.OBJECT_CLASS_POINT)
                {
                    this.setObjectStrokeColor(e, e.visProp.strokeColor, e.visProp.strokeOpacity);
                    this.setObjectFillColor(e, e.visProp.strokeColor, e.visProp.strokeOpacity)
                }
                else
                {
                    if (e.type == JXG.OBJECT_TYPE_POLYGON)
                    {
                        this.setObjectFillColor(e, e.visProp.fillColor, e.visProp.fillOpacity);
                        for (d = 0; d < e.borders.length; d++)
                        {
                            this.setObjectStrokeColor(e.borders[d], e.borders[d].visProp.strokeColor, e.visProp.strokeOpacity)
                        }
                    }
                    else
                    {
                        this.setObjectStrokeColor(e, e.visProp.strokeColor, e.visProp.strokeOpacity);
                        this.setObjectFillColor(e, e.visProp.fillColor, e.visProp.fillOpacity)
                    }
                }
                this.setObjectStrokeWidth(e, e.visProp.strokeWidth)
            }
        },
        remove: function (d)
        {
        },
        suspendRedraw: function ()
        {
        },
        unsuspendRedraw: function ()
        {
        },
        drawZoomBar: function (e)
        {
            var g, f, d = function (h, j)
            {
                var i;
                i = g.createElement("span");
                f.appendChild(i);
                i.innerHTML = h;
                JXG.addEvent(i, "click", j, e)
            };
            g = this.container.ownerDocument;
            f = g.createElement("div");
            f.setAttribute("id", this.container.id + "_navigationbar");
            f.className = "JXGtext";
            f.style.color = "#aaaaaa";
            f.style.backgroundColor = "#f5f5f5";
            f.style.padding = "2px";
            f.style.position = "absolute";
            f.style.fontSize = "10px";
            f.style.cursor = "pointer";
            f.style.zIndex = "100";
            this.container.appendChild(f);
            f.style.right = "5px";
            f.style.bottom = "5px";
            d("&nbsp;&ndash;&nbsp", e.zoomOut);
            d("&nbsp;o&nbsp;", e.zoom100);
            d("&nbsp;+&nbsp;", e.zoomIn);
            d("&nbsp;&larr;&nbsp;", e.clickLeftArrow);
            d("&nbsp;&uarr;&nbsp;", e.clickUpArrow);
            d("&nbsp;&darr;&nbsp;", e.clickDownArrow);
            d("&nbsp;&rarr;&nbsp;", e.clickRightArrow)
        },
        getElementById: function (d)
        {
            return document.getElementById(this.container.id + "_" + d)
        },
        findSplit: function (x, n, m)
        {
            var r = 0,
                p = n,
                q, l, y, w, v, h, u, g, s, t, e;
            if (m - n < 2)
            {
                return [-1, 0]
            }
            y = x[n].scrCoords;
            w = x[m].scrCoords;
            if (isNaN(y[1] + y[2] + w[1] + w[2]))
            {
                return [NaN, m]
            }
            for (l = n + 1; l < m; l++)
            {
                v = x[l].scrCoords;
                h = v[1] - y[1];
                u = v[2] - y[2];
                g = w[1] - y[1];
                s = w[2] - y[2];
                t = g * g + s * s;
                if (t >= JXG.Math.eps)
                {
                    e = (h * g + u * s) / t;
                    q = h * h + u * u - e * (h * g + u * s)
                }
                else
                {
                    e = 0;
                    q = h * h + u * u
                }
                if (e < 0)
                {
                    q = h * h + u * u
                }
                else
                {
                    if (e > 1)
                    {
                        h = v[1] - w[1];
                        u = v[2] - w[2];
                        q = h * h + u * u
                    }
                }
                if (q > r)
                {
                    r = q;
                    p = l
                }
            }
            return [Math.sqrt(r), p]
        },
        RDP: function (k, h, g, e, f)
        {
            var d = this.findSplit(k, h, g);
            if (d[0] > e)
            {
                this.RDP(k, h, d[1], e, f);
                this.RDP(k, d[1], g, e, f)
            }
            else
            {
                f.push(k[g])
            }
        },
        RamenDouglasPeuker: function (j, e)
        {
            var g = [],
                h, f, d;
            d = j.length;
            h = 0;
            while (h < d && isNaN(j[h].scrCoords[1] + j[h].scrCoords[2]))
            {
                h++
            }
            f = d - 1;
            while (f > h && isNaN(j[f].scrCoords[1] + j[f].scrCoords[2]))
            {
                f--
            }
            if (!(h > f || h == d))
            {
                g[0] = j[h];
                this.RDP(j, h, f, e, g)
            }
            return g
        },
        setShadow: function (d)
        {
        },
        updatePathStringPoint: function (f, d, e)
        {
        },
        evaluate: function (d)
        {
            if (JXG.isFunction(d))
            {
                return d()
            }
            else
            {
                return d
            }
        },
        setBuffering: function ()
        {
        }
    }
};
JXG.FileReader = new
function ()
{
    this.parseFileContent = function (d, f, h)
    {
        this.request = false;
        var g;
        try
        {
            this.request = new XMLHttpRequest();
            if (h.toLowerCase() == "raw")
            {
                this.request.overrideMimeType("text/plain; charset=iso-8859-1")
            }
            else
            {
                this.request.overrideMimeType("text/xml; charset=iso-8859-1")
            }
        }
        catch (g)
        {
            try
            {
                this.request = new ActiveXObject("Msxml2.XMLHTTP")
            }
            catch (g)
            {
                try
                {
                    this.request = new ActiveXObject("Microsoft.XMLHTTP")
                }
                catch (g)
                {
                    this.request = false
                }
            }
        }
        if (!this.request)
        {
            alert("AJAX not activated!");
            return
        }
        this.request.open("GET", d, true);
        if (h.toLowerCase() == "raw")
        {
            this.cbp = function ()
            {
                var e = this.request;
                if (e.readyState == 4)
                {
                    f(e.responseText)
                }
            }
        }
        else
        {
            this.cbp = function ()
            {
                var e = this.request;
                if (e.readyState == 4)
                {
                    var i = "";
                    if (typeof e.responseStream != "undefined" && (e.responseText.slice(0, 2) == "PK" || JXG.Util.asciiCharCodeAt(e.responseText.slice(0, 1), 0) == 31))
                    {
                        i = JXG.Util.Base64.decode(BinFileReader(e))
                    }
                    else
                    {
                        i = e.responseText
                    }
                    this.parseString(i, f, h, false)
                }
            }
        }
        this.cb = JXG.bind(this.cbp, this);
        this.request.onreadystatechange = this.cb;
        try
        {
            this.request.send(null)
        }
        catch (g)
        {
            throw new Error("JSXGraph: problems opening " + d + " !")
        }
    };
    this.cleanWhitespace = function (d)
    {
        var e = d.firstChild;
        while (e != null)
        {
            if (e.nodeType == 3 && !/\S/.test(e.nodeValue))
            {
                d.removeChild(e)
            }
            else
            {
                if (e.nodeType == 1)
                {
                    this.cleanWhitespace(e)
                }
            }
            e = e.nextSibling
        }
    };
    this.stringToXMLTree = function (e)
    {
        if (typeof DOMParser == "undefined")
        {
            DOMParser = function ()
            {
            };
            DOMParser.prototype.parseFromString = function (h, i)
            {
                if (typeof ActiveXObject != "undefined")
                {
                    var g = new ActiveXObject("MSXML.DomDocument");
                    g.loadXML(h);
                    return g
                }
            }
        }
        var f = new DOMParser();
        var d = f.parseFromString(e, "text/xml");
        this.cleanWhitespace(d);
        return d
    };
    this.parseString = function (h, f, i, e)
    {
        var d, g;
        if (i.toLowerCase() == "cdy" || i.toLowerCase() == "cinderella")
        {
            if (e)
            {
                h = JXG.Util.Base64.decode(h)
            }
            h = JXG.CinderellaReader.readCinderella(h, f);
            f.xmlString = h;
            return
        }
        if (i.toLowerCase() == "graph")
        {
            h = JXG.GraphReader.readGraph(h, f, false);
            return
        }
        if (i.toLowerCase() == "digraph")
        {
            h = JXG.GraphReader.readGraph(h, f, true);
            return
        }
        if (i.toLowerCase() == "geonext")
        {
            h = JXG.GeonextReader.prepareString(h)
        }
        if (i.toLowerCase() == "geogebra")
        {
            e = h.slice(0, 2) !== "PK";
            h = JXG.GeogebraReader.prepareString(h, e)
        }
        if (i.toLowerCase() == "intergeo")
        {
            if (e)
            {
                h = JXG.Util.Base64.decode(h)
            }
            h = JXG.IntergeoReader.prepareString(h)
        }
        f.xmlString = h;
        d = this.stringToXMLTree(h);
        this.readElements(d, f, i)
    };
    this.readElements = function (d, e, f)
    {
        if (f.toLowerCase() == "geonext")
        {
            e.suspendUpdate();
            if (d.getElementsByTagName("GEONEXT").length != 0)
            {
                JXG.GeonextReader.readGeonext(d, e)
            }
            e.unsuspendUpdate()
        }
        else
        {
            if (d.getElementsByTagName("geogebra").length != 0)
            {
                JXG.GeogebraReader.readGeogebra(d, e)
            }
            else
            {
                if (f.toLowerCase() == "intergeo")
                {
                    JXG.IntergeoReader.readIntergeo(d, e)
                }
            }
        }
    }
};
if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent))
{
    document.write('<script type="text/vbscript">\nFunction Base64Encode(inData)\n  Const Base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"\n  Dim cOut, sOut, I\n  For I = 1 To LenB(inData) Step 3\n    Dim nGroup, pOut, sGroup\n    nGroup = &H10000 * AscB(MidB(inData, I, 1)) + _\n      &H100 * MyASC(MidB(inData, I + 1, 1)) + MyASC(MidB(inData, I + 2, 1))\n    nGroup = Oct(nGroup)\n    nGroup = String(8 - Len(nGroup), "0") & nGroup\n    pOut = Mid(Base64, CLng("&o" & Mid(nGroup, 1, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 3, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 5, 2)) + 1, 1) + _\n      Mid(Base64, CLng("&o" & Mid(nGroup, 7, 2)) + 1, 1)\n    sOut = sOut + pOut\n  Next\n  Select Case LenB(inData) Mod 3\n    Case 1: \'8 bit final\n      sOut = Left(sOut, Len(sOut) - 2) + "=="\n    Case 2: \'16 bit final\n      sOut = Left(sOut, Len(sOut) - 1) + "="\n  End Select\n  Base64Encode = sOut\nEnd Function\n\nFunction MyASC(OneChar)\n  If OneChar = "" Then MyASC = 0 Else MyASC = AscB(OneChar)\nEnd Function\n\nFunction BinFileReader(xhr)\n    Dim byteString\n    Dim b64String\n    Dim i\n    byteString = xhr.responseBody\n    ReDim byteArray(LenB(byteString))\n    For i = 1 To LenB(byteString)\n        byteArray(i-1) = AscB(MidB(byteString, i, 1))\n    Next\n    b64String = Base64Encode(byteString)\n    BinFileReader = b64String\nEnd Function\n<\/script>\n')
}
JXG.GeonextParser =
{
};
JXG.GeonextParser.replacePow = function (f)
{
    var k, n, l, j, m, g, d, e, h, r, q;
    f = f.replace(/(\s*)\^(\s*)/g, "^");
    h = f.indexOf("^");
    while (h >= 0)
    {
        e = f.slice(0, h);
        r = f.slice(h + 1);
        if (e.charAt(e.length - 1) == ")")
        {
            k = 1;
            n = e.length - 2;
            while (n >= 0 && k > 0)
            {
                l = e.charAt(n);
                if (l == ")")
                {
                    k++
                }
                else
                {
                    if (l == "(")
                    {
                        k--
                    }
                }
                n--
            }
            if (k == 0)
            {
                j = "";
                g = e.substring(0, n + 1);
                d = n;
                while (d >= 0 && g.substr(d, 1).match(/([\w\.]+)/))
                {
                    j = RegExp.$1 + j;
                    d--
                }
                j += e.substring(n + 1, e.length);
                j = j.replace(/([\(\)\+\*\%\^\-\/\]\[])/g, "\\$1")
            }
            else
            {
                throw new Error("JSXGraph: Missing '(' in expression")
            }
        }
        else
        {
            j = "[\\w\\.]+"
        }
        if (r.match(/^([\w\.]*\()/))
        {
            k = 1;
            n = RegExp.$1.length;
            while (n < r.length && k > 0)
            {
                l = r.charAt(n);
                if (l == ")")
                {
                    k--
                }
                else
                {
                    if (l == "(")
                    {
                        k++
                    }
                }
                n++
            }
            if (k == 0)
            {
                m = r.substring(0, n);
                m = m.replace(/([\(\)\+\*\%\^\-\/\[\]])/g, "\\$1")
            }
            else
            {
                throw new Error("JSXGraph: Missing ')' in expression")
            }
        }
        else
        {
            m = "[\\w\\.]+"
        }
        q = new RegExp("(" + j + ")\\^(" + m + ")");
        f = f.replace(q, "JXG.Math.pow($1,$2)");
        h = f.indexOf("^")
    }
    return f
};
JXG.GeonextParser.replaceIf = function (e)
{
    var t = "",
        f, r, h = null,
        d = null,
        l = null,
        g, q, j, m, k, n, p;
    g = e.indexOf("If(");
    if (g < 0)
    {
        return e
    }
    e = e.replace(/""/g, "0");
    while (g >= 0)
    {
        f = e.slice(0, g);
        r = e.slice(g + 3);
        j = 1;
        q = 0;
        m = -1;
        k = -1;
        while (q < r.length && j > 0)
        {
            n = r.charAt(q);
            if (n == ")")
            {
                j--
            }
            else
            {
                if (n == "(")
                {
                    j++
                }
                else
                {
                    if (n == "," && j == 1)
                    {
                        if (m < 0)
                        {
                            m = q
                        }
                        else
                        {
                            k = q
                        }
                    }
                }
            }
            q++
        }
        p = r.slice(0, q - 1);
        r = r.slice(q);
        if (m < 0)
        {
            return ""
        }
        if (k < 0)
        {
            return ""
        }
        h = p.slice(0, m);
        d = p.slice(m + 1, k);
        l = p.slice(k + 1);
        h = this.replaceIf(h);
        d = this.replaceIf(d);
        l = this.replaceIf(l);
        t += f + "((" + h + ")?(" + d + "):(" + l + "))";
        e = r;
        h = null;
        d = null;
        g = e.indexOf("If(")
    }
    t += r;
    return t
};
JXG.GeonextParser.replaceSub = function (f)
{
    if (f.indexOf)
    {
    }
    else
    {
        return f
    }
    var e = f.indexOf("_{"),
        d;
    while (e >= 0)
    {
        f = f.substr(0, e) + f.substr(e).replace(/_\{/, "<sub>");
        d = f.substr(e).indexOf("}");
        if (d >= 0)
        {
            f = f.substr(0, d) + f.substr(d).replace(/\}/, "</sub>")
        }
        e = f.indexOf("_{")
    }
    e = f.indexOf("_");
    while (e >= 0)
    {
        f = f.substr(0, e) + f.substr(e).replace(/_(.?)/, "<sub>$1</sub>");
        e = f.indexOf("_")
    }
    return f
};
JXG.GeonextParser.replaceSup = function (f)
{
    if (f.indexOf)
    {
    }
    else
    {
        return f
    }
    var e = f.indexOf("^{"),
        d;
    while (e >= 0)
    {
        f = f.substr(0, e) + f.substr(e).replace(/\^\{/, "<sup>");
        d = f.substr(e).indexOf("}");
        if (d >= 0)
        {
            f = f.substr(0, d) + f.substr(d).replace(/\}/, "</sup>")
        }
        e = f.indexOf("^{")
    }
    e = f.indexOf("^");
    while (e >= 0)
    {
        f = f.substr(0, e) + f.substr(e).replace(/\^(.?)/, "<sup>$1</sup>");
        e = f.indexOf("^")
    }
    return f
};
JXG.GeonextParser.replaceNameById = function (g, j)
{
    var l = 0,
        d, k, h, f, e = ["X", "Y", "L", "V"];
    for (f = 0; f < e.length; f++)
    {
        l = g.indexOf(e[f] + "(");
        while (l >= 0)
        {
            if (l >= 0)
            {
                d = g.indexOf(")", l + 2);
                if (d >= 0)
                {
                    k = g.slice(l + 2, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 2) + h.id + g.slice(d)
                }
            }
            d = g.indexOf(")", l + 2);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    l = g.indexOf("Dist(");
    while (l >= 0)
    {
        if (l >= 0)
        {
            d = g.indexOf(",", l + 5);
            if (d >= 0)
            {
                k = g.slice(l + 5, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 5) + h.id + g.slice(d)
            }
        }
        d = g.indexOf(",", l + 5);
        l = g.indexOf(",", d);
        d = g.indexOf(")", l + 1);
        if (d >= 0)
        {
            k = g.slice(l + 1, d);
            k = k.replace(/\\(['"])?/g, "$1");
            h = j.elementsByName[k];
            g = g.slice(0, l + 1) + h.id + g.slice(d)
        }
        d = g.indexOf(")", l + 1);
        l = g.indexOf("Dist(", d)
    }
    e = ["Deg", "Rad"];
    for (f = 0; f < e.length; f++)
    {
        l = g.indexOf(e[f] + "(");
        while (l >= 0)
        {
            if (l >= 0)
            {
                d = g.indexOf(",", l + 4);
                if (d >= 0)
                {
                    k = g.slice(l + 4, d);
                    k = k.replace(/\\(['"])?/g, "$1");
                    h = j.elementsByName[k];
                    g = g.slice(0, l + 4) + h.id + g.slice(d)
                }
            }
            d = g.indexOf(",", l + 4);
            l = g.indexOf(",", d);
            d = g.indexOf(",", l + 1);
            if (d >= 0)
            {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + h.id + g.slice(d)
            }
            d = g.indexOf(",", l + 1);
            l = g.indexOf(",", d);
            d = g.indexOf(")", l + 1);
            if (d >= 0)
            {
                k = g.slice(l + 1, d);
                k = k.replace(/\\(['"])?/g, "$1");
                h = j.elementsByName[k];
                g = g.slice(0, l + 1) + h.id + g.slice(d)
            }
            d = g.indexOf(")", l + 1);
            l = g.indexOf(e[f] + "(", d)
        }
    }
    return g
};
JXG.GeonextParser.replaceIdByObj = function (d)
{
    var e = /(X|Y|L)\(([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].$1()');
    e = /(V)\(([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].Value()');
    e = /(Dist)\(([\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'this.board.objects["$2"].Dist(this.board.objects["$3"])');
    e = /(Deg)\(([\w_]+),([ \w\[\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'JXG.Math.Geometry.trueAngle(this.board.objects["$2"],this.board.objects["$3"],this.board.objects["$4"])');
    e = /Rad\(([\w_]+),([\w_]+),([\w_]+)\)/g;
    d = d.replace(e, 'JXG.Math.Geometry.rad(this.board.objects["$1"],this.board.objects["$2"],this.board.objects["$3"])');
    return d
};
JXG.GeonextParser.geonext2JS = function (e, g)
{
    var h, f, d, k = ["Abs", "ACos", "ASin", "ATan", "Ceil", "Cos", "Exp", "Floor", "Log", "Max", "Min", "Random", "Round", "Sin", "Sqrt", "Tan", "Trunc"],
        j = ["Math.abs", "Math.acos", "Math.asin", "Math.atan", "Math.ceil", "Math.cos", "Math.exp", "Math.floor", "Math.log", "Math.max", "Math.min", "Math.random", "this.board.round", "Math.sin", "Math.sqrt", "Math.tan", "Math.ceil"];
    e = e.replace(/&lt;/g, "<");
    e = e.replace(/&gt;/g, ">");
    e = e.replace(/&amp;/g, "&");
    f = e;
    f = this.replaceNameById(f, g);
    f = this.replaceIf(f);
    f = this.replacePow(f);
    f = this.replaceIdByObj(f);
    for (d = 0; d < k.length; d++)
    {
        h = new RegExp(["(\\W|^)(", k[d], ")"].join(""), "ig");
        f = f.replace(h, ["$1", j[d]].join(""))
    }
    f = f.replace(/True/g, "true");
    f = f.replace(/False/g, "false");
    f = f.replace(/fasle/g, "false");
    f = f.replace(/Pi/g, "Math.PI");
    return f
};
JXG.GeonextParser.findDependencies = function (h, e, g)
{
    if (typeof g == "undefined")
    {
        g = h.board
    }
    var i = g.elementsByName,
        f, j, d;
    for (f in i)
    {
        if (f != h.name)
        {
            if (i[f].type == JXG.OBJECT_TYPE_TEXT)
            {
                if (!i[f].isLabel)
                {
                    d = f.replace(/\[/g, "\\[");
                    d = d.replace(/\]/g, "\\]");
                    j = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + d + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                    if (e.search(j) >= 0)
                    {
                        i[f].addChild(h)
                    }
                }
            }
            else
            {
                d = f.replace(/\[/g, "\\[");
                d = d.replace(/\]/g, "\\]");
                j = new RegExp("\\(([\\w\\[\\]'_ ]+,)*(" + d + ")(,[\\w\\[\\]'_ ]+)*\\)", "g");
                if (e.search(j) >= 0)
                {
                    i[f].addChild(h)
                }
            }
        }
    }
};
JXG.Board = function (d, i, e, n, m, l, k, j, f, g, h)
{
    this.BOARD_MODE_NONE = 0;
    this.BOARD_MODE_DRAG = 1;
    this.BOARD_MODE_MOVE_ORIGIN = 2;
    this.BOARD_QUALITY_LOW = 1;
    this.BOARD_QUALITY_HIGH = 2;
    this.BOARD_MODE_CONSTRUCT = 16;
    this.CONSTRUCTION_TYPE_POINT = 1129599060;
    this.CONSTRUCTION_TYPE_CIRCLE = 1129595724;
    this.CONSTRUCTION_TYPE_LINE = 1129598030;
    this.CONSTRUCTION_TYPE_GLIDER = 1129596740;
    this.CONSTRUCTION_TYPE_MIDPOINT = 1129598288;
    this.CONSTRUCTION_TYPE_PERPENDICULAR = 1129599044;
    this.CONSTRUCTION_TYPE_PARALLEL = 1129599052;
    this.CONSTRUCTION_TYPE_INTERSECTION = 1129597267;
    this.container = d;
    this.containerObj = document.getElementById(this.container);
    if (this.containerObj == null)
    {
        throw new Error("\nJSXGraph: HTML container element '" + (d) + "' not found.")
    }
    this.renderer = i;
    this.options = JXG.deepCopy(JXG.Options);
    this.dimension = 2;
    this.origin =
    {
    };
    this.origin.usrCoords = [1, 0, 0];
    this.origin.scrCoords = [1, n[0], n[1]];
    this.zoomX = m;
    this.zoomY = l;
    this.unitX = k;
    this.unitY = j;
    this.stretchX = this.zoomX * this.unitX;
    this.stretchY = this.zoomY * this.unitY;
    this.canvasWidth = f;
    this.canvasHeight = g;
    if (JXG.exists(e) && e !== "" && !JXG.exists(document.getElementById(e)))
    {
        this.id = e
    }
    else
    {
        this.id = this.generateId()
    }
    this.hooks = [];
    this.dependentBoards = [];
    this.objects =
    {
    };
    this.animationObjects =
    {
    };
    this.highlightedObjects =
    {
    };
    this.numObjects = 0;
    this.elementsByName =
    {
    };
    this.mode = this.BOARD_MODE_NONE;
    this.updateQuality = this.BOARD_QUALITY_HIGH;
    this.isSuspendedRedraw = false;
    this.calculateSnapSizes();
    this.drag_dx = 0;
    this.drag_dy = 0;
    this.mousePosAbs = [0, 0];
    this.mousePosRel = [0, 0];
    this.drag_obj = [];
    this.last_click =
    {
        time: 0,
        posX: 0,
        posY: 0
    };
    this.xmlString = "";
    this.showCopyright = false;
    if ((h != null && h) || (h == null && this.options.showCopyright))
    {
        this.renderer.displayCopyright(JXG.JSXGraph.licenseText, this.options.text.fontSize);
        this.showCopyright = true
    }
    this.needsFullUpdate = false;
    this.reducedUpdate = false;
    this.currentCBDef = "none";
    this.geonextCompatibilityMode = false;
    if (this.options.text.useASCIIMathML && translateASCIIMath)
    {
        init()
    }
    else
    {
        this.options.text.useASCIIMathML = false
    }
    JXG.addEvent(this.containerObj, "mousedown", this.mouseDownListener, this);
    JXG.addEvent(this.containerObj, "mousemove", this.mouseMoveListener, this);
    JXG.addEvent(document, "mouseup", this.mouseUpListener, this);
    JXG.addEvent(this.containerObj, "touchstart", this.touchStartListener, this);
    JXG.addEvent(this.containerObj, "touchmove", this.touchMoveListener, this);
    JXG.addEvent(this.containerObj, "touchend", this.touchEndListener, this);
    this.containerObj.oncontextmenu = function (p)
    {
        if (JXG.exists(p))
        {
            p.preventDefault()
        }
        return false
    }
};
JXG.Board.prototype.generateName = function (f)
{
    if (f.type == JXG.OBJECT_TYPE_TICKS)
    {
        return ""
    }
    var l, h = 3,
        e = "",
        m = "",
        n = [],
        d = "",
        k, g;
    if (f.elementClass == JXG.OBJECT_CLASS_POINT)
    {
        l = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    }
    else
    {
        l = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    }
    switch (f.type)
    {
    case JXG.OBJECT_TYPE_POLYGON:
        e = "P_{";
        m = "}";
        break;
    case JXG.OBJECT_TYPE_CIRCLE:
        e = "k_{";
        m = "}";
        break;
    case JXG.OBJECT_TYPE_ANGLE:
        e = "W_{";
        m = "}";
        break;
    default:
        if (f.elementClass != JXG.OBJECT_CLASS_POINT && f.elementClass != JXG.OBJECT_CLASS_LINE)
        {
            e = "s_{";
            m = "}"
        }
    }
    for (k = 0; k < h; k++)
    {
        n[k] = 0
    }
    while (n[h - 1] < l.length)
    {
        for (n[0] = 1; n[0] < l.length; n[0]++)
        {
            d = e;
            for (k = h; k > 0; k--)
            {
                d += l[n[k - 1]]
            }
            if (this.elementsByName[d + m] == null)
            {
                return d + m
            }
        }
        n[0] = l.length;
        for (k = 1; k < h; k++)
        {
            if (n[k - 1] == l.length)
            {
                n[k - 1] = 1;
                n[k]++
            }
        }
    }
    return ""
};
JXG.Board.prototype.generateId = function ()
{
    var d = 1;
    while (JXG.JSXGraph.boards["jxgBoard" + d] != null)
    {
        d = Math.round(Math.random() * 33)
    }
    return ("jxgBoard" + d)
};
JXG.Board.prototype.setId = function (g, f)
{
    var e = this.numObjects++,
        d = g.id;
    if (d == "" || !JXG.exists(d))
    {
        d = this.id + f + e
    }
    g.id = d;
    this.objects[d] = g;
    if (true && g.hasLabel)
    {
        g.label.content.id = d + "Label";
        if (!g.label.content.isLabel)
        {
            this.renderer.drawText(g.label.content);
            if (!g.label.content.visProp.visible)
            {
                this.renderer.hide(g.label.content)
            }
        }
    }
    return d
};
JXG.Board.prototype.finalizeAdding = function (d)
{
    if (d.hasLabel)
    {
        if (false)
        {
            d.label.content.id = d.id + "Label";
            if (!d.label.content.isLabel)
            {
                this.renderer.drawText(d.label.content);
                if (!d.label.content.visProp.visible)
                {
                    this.renderer.hide(d.label.content)
                }
            }
        }
        this.renderer.drawText(d.label.content)
    }
    if (!d.visProp.visible)
    {
        this.renderer.hide(d)
    }
    if (d.hasLabel && !d.label.content.visProp.visible)
    {
        this.renderer.hide(d.label.content)
    }
};
JXG.Board.prototype.getRelativeMouseCoordinates = function ()
{
    var e = this.containerObj,
        d = JXG.getOffset(e),
        f;
    f = parseInt(JXG.getStyle(e, "borderLeftWidth"));
    if (isNaN(f))
    {
        f = 0
    }
    d[0] += f;
    f = parseInt(JXG.getStyle(e, "borderTopWidth"));
    if (isNaN(f))
    {
        f = 0
    }
    d[1] += f;
    f = parseInt(JXG.getStyle(e, "paddingLeft"));
    if (isNaN(f))
    {
        f = 0
    }
    d[0] += f;
    f = parseInt(JXG.getStyle(e, "paddingTop"));
    if (isNaN(f))
    {
        f = 0
    }
    d[1] += f;
    return d
};
JXG.Board.prototype.clickLeftArrow = function ()
{
    this.origin.scrCoords[1] += this.canvasWidth * 0.1;
    this.moveOrigin();
    return this
};
JXG.Board.prototype.clickRightArrow = function ()
{
    this.origin.scrCoords[1] -= this.canvasWidth * 0.1;
    this.moveOrigin();
    return this
};
JXG.Board.prototype.clickUpArrow = function ()
{
    this.origin.scrCoords[2] += this.canvasHeight * 0.1;
    this.moveOrigin();
    return this
};
JXG.Board.prototype.clickDownArrow = function ()
{
    this.origin.scrCoords[2] -= this.canvasHeight * 0.1;
    this.moveOrigin();
    return this
};
JXG.Board.prototype.touchStartListener = function (f)
{
    f.preventDefault();
    var h = document.createEvent("MouseEvents"),
        g, d = false;
    this.drag_obj = [];
    if ((f.targetTouches.length == 2) && (JXG.Math.Geometry.distance([f.targetTouches[0].screenX, f.targetTouches[0].screenY], [f.targetTouches[1].screenX, f.targetTouches[1].screenY]) < 80))
    {
        f.targetTouches.length = 1;
        d = true
    }
    this.options.precision.hasPoint = this.options.precision.touch;
    for (g = 0; g < f.targetTouches.length; g++)
    {
        h.initMouseEvent("mousedown", true, false, this.containerObj, 0, f.targetTouches[g].screenX, f.targetTouches[g].screenY, f.targetTouches[g].clientX, f.targetTouches[g].clientY, false, false, d, false, 0, null);
        h.fromTouch = true;
        this.mouseDownListener(h)
    }
};
JXG.Board.prototype.touchMoveListener = function (d)
{
    d.preventDefault();
    var f, e;
    for (f = 0; f < d.targetTouches.length; f++)
    {
        e =
        {
            pageX: d.targetTouches[f].pageX,
            pageY: d.targetTouches[f].pageY,
            clientX: d.targetTouches[f].clientX,
            clientY: d.targetTouches[f].clientY
        };
        e.fromTouch = true;
        this.mouseMoveListener(e, f)
    }
};
JXG.Board.prototype.touchEndListener = function (d)
{
    var g = document.createEvent("MouseEvents"),
        f;
    g.initMouseEvent("mouseup", true, false, this.containerObj, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    g.fromTouch = true;
    this.mouseUpListener(g);
    this.options.precision.hasPoint = this.options.precision.mouse
};
JXG.Board.prototype.mouseDownListener = function (j)
{
    var g, k, i, d, f, e, h;
    this.updateHooks("mousedown", j);
    if (document.selection)
    {
        document.selection.empty()
    }
    else
    {
        if (window.getSelection)
        {
            window.getSelection().removeAllRanges()
        }
    }
    i = this.getRelativeMouseCoordinates(j);
    d = JXG.getPosition(j);
    f = d[0] - i[0];
    e = d[1] - i[1];
    this.mousePosAbs = d;
    this.mousePosRel = [f, e];
    if (j.shiftKey)
    {
        this.drag_dx = f - this.origin.scrCoords[1];
        this.drag_dy = e - this.origin.scrCoords[2];
        this.mode = this.BOARD_MODE_MOVE_ORIGIN;
        JXG.addEvent(document, "mouseup", this.mouseUpListener, this);
        return
    }
    if (this.mode == this.BOARD_MODE_CONSTRUCT)
    {
        return
    }
    if (((new Date()).getTime() - this.last_click.time < 500) && (JXG.Math.Geometry.distance(d, [this.last_click.posX, this.last_click.posY]) < 30))
    {
        this.zoom100()
    }
    this.last_click.time = (new Date()).getTime();
    this.last_click.posX = d[0];
    this.last_click.posY = d[1];
    this.mode = this.BOARD_MODE_DRAG;
    if (this.mode == this.BOARD_MODE_DRAG)
    {
        h = 0;
        for (g in this.objects)
        {
            k = this.objects[g];
            if (JXG.exists(k.hasPoint) && ((k.type == JXG.OBJECT_TYPE_POINT) || (k.type == JXG.OBJECT_TYPE_GLIDER)) && (k.visProp.visible) && (!k.fixed) && (!k.frozen) && (k.hasPoint(f, e)))
            {
                if ((k.type == JXG.OBJECT_TYPE_POINT) || (k.type == JXG.OBJECT_TYPE_GLIDER))
                {
                    this.drag_obj.push(
                    {
                        obj: this.objects[g],
                        pos: h
                    });
                    if (this.options.takeFirst)
                    {
                        break
                    }
                }
            }
            h++
        }
    }
    if (j && j.preventDefault)
    {
        j.preventDefault()
    }
    else
    {
        window.event.returnValue = false
    }
    if (this.drag_obj.length == 0)
    {
        this.mode = this.BOARD_MODE_NONE;
        return true
    }
    this.dragObjCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [f, e], this);
    return false
};
JXG.Board.prototype.mouseUpListener = function (d)
{
    this.updateHooks("mouseup", d);
    this.updateQuality = this.BOARD_QUALITY_HIGH;
    this.mode = this.BOARD_MODE_NONE;
    if (this.mode == this.BOARD_MODE_MOVE_ORIGIN)
    {
        this.moveOrigin()
    }
    else
    {
        this.update()
    }
    this.drag_obj = []
};
JXG.Board.prototype.mouseMoveListener = function (l, f)
{
    var e, h, n, d, j, p, m, g, k;
    this.updateHooks("mousemove", l, this.mode);
    f = f || 0;
    n = this.getRelativeMouseCoordinates(l);
    d = JXG.getPosition(l);
    p = d[0] - n[0];
    m = d[1] - n[1];
    this.mousePosAbs = d;
    this.mousePosRel = [p, m];
    this.updateQuality = this.BOARD_QUALITY_LOW;
    this.dehighlightAll();
    if (this.mode != this.BOARD_MODE_DRAG)
    {
        this.renderer.hide(this.infobox)
    }
    if (this.mode == this.BOARD_MODE_MOVE_ORIGIN)
    {
        this.origin.scrCoords[1] = p - this.drag_dx;
        this.origin.scrCoords[2] = m - this.drag_dy;
        this.moveOrigin()
    }
    else
    {
        if (this.mode == this.BOARD_MODE_DRAG)
        {
            j = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.getScrCoordsOfMouse(p, m), this);
            g = this.drag_obj[f].obj;
            if (g.type == JXG.OBJECT_TYPE_POINT || g.type == JXG.OBJECT_TYPE_LINE || g.type == JXG.OBJECT_TYPE_CIRCLE || g.elementClass == JXG.OBJECT_CLASS_CURVE)
            {
                g.setPositionDirectly(JXG.COORDS_BY_USER, j.usrCoords[1], j.usrCoords[2]);
                this.update(g)
            }
            else
            {
                if (g.type == JXG.OBJECT_TYPE_GLIDER)
                {
                    k = g.coords;
                    g.setPositionDirectly(JXG.COORDS_BY_USER, j.usrCoords[1], j.usrCoords[2]);
                    if (g.slideObject.type == JXG.OBJECT_TYPE_CIRCLE)
                    {
                        g.coords = JXG.Math.Geometry.projectPointToCircle(g, g.slideObject, this)
                    }
                    else
                    {
                        if (g.slideObject.type == JXG.OBJECT_TYPE_LINE)
                        {
                            g.coords = JXG.Math.Geometry.projectPointToLine(g, g.slideObject, this)
                        }
                    }
                    if (g.group.length != 0)
                    {
                        g.group[g.group.length - 1].dX = g.coords.scrCoords[1] - k.scrCoords[1];
                        g.group[g.group.length - 1].dY = g.coords.scrCoords[2] - k.scrCoords[2];
                        g.group[g.group.length - 1].update(this)
                    }
                    else
                    {
                        this.update(g)
                    }
                }
            }
            this.updateInfobox(g)
        }
        else
        {
            for (e in this.objects)
            {
                h = this.objects[e];
                if (JXG.exists(h.hasPoint) && h.visProp.visible && h.hasPoint(p, m))
                {
                    this.updateInfobox(h);
                    if (this.highlightedObjects[e] == null)
                    {
                        this.highlightedObjects[e] = h;
                        h.highlight()
                    }
                }
            }
        }
    }
    this.updateQuality = this.BOARD_QUALITY_HIGH
};
JXG.Board.prototype.updateInfobox = function (e)
{
    var d, h, f, g;
    if (!e.showInfobox)
    {
        return this
    }
    if (e.elementClass == JXG.OBJECT_CLASS_POINT)
    {
        f = e.coords.usrCoords[1];
        g = e.coords.usrCoords[2];
        this.infobox.setCoords(f + this.infobox.distanceX / (this.stretchX), g + this.infobox.distanceY / (this.stretchY));
        if (typeof(e.infoboxText) != "string")
        {
            d = Math.abs(f);
            if (d > 0.1)
            {
                d = f.toFixed(2)
            }
            else
            {
                if (d >= 0.01)
                {
                    d = f.toFixed(4)
                }
                else
                {
                    if (d >= 0.0001)
                    {
                        d = f.toFixed(6)
                    }
                    else
                    {
                        d = f
                    }
                }
            }
            h = Math.abs(g);
            if (h > 0.1)
            {
                h = g.toFixed(2)
            }
            else
            {
                if (h >= 0.01)
                {
                    h = g.toFixed(4)
                }
                else
                {
                    if (h >= 0.0001)
                    {
                        h = g.toFixed(6)
                    }
                    else
                    {
                        h = g
                    }
                }
            }
            this.highlightInfobox(d, h, e)
        }
        else
        {
            this.highlightCustomInfobox(e.infoboxText, e)
        }
        this.renderer.show(this.infobox);
        this.renderer.updateText(this.infobox)
    }
    return this
};
JXG.Board.prototype.highlightCustomInfobox = function (d)
{
    this.infobox.setText('<span style="color:#bbbbbb;">' + d + "</span>");
    return this
};
JXG.Board.prototype.highlightInfobox = function (d, e)
{
    this.highlightCustomInfobox("(" + d + ", " + e + ")");
    return this
};
JXG.Board.prototype.dehighlightAll = function ()
{
    var e, f, d = false;
    for (e in this.highlightedObjects)
    {
        f = this.highlightedObjects[e];
        f.noHighlight();
        delete(this.highlightedObjects[e]);
        d = true
    }
    if (this.options.renderer == "canvas" && d)
    {
        this.prepareUpdate();
        this.renderer.suspendRedraw();
        this.updateRenderer();
        this.renderer.unsuspendRedraw()
    }
    return this
};
JXG.Board.prototype.getScrCoordsOfMouse = function (d, f)
{
    if (this.options.grid.snapToGrid)
    {
        var e = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, f], this);
        e.setCoordinates(JXG.COORDS_BY_USER, [Math.round((e.usrCoords[1]) * this.options.grid.snapSizeX) / this.options.grid.snapSizeX, Math.round((e.usrCoords[2]) * this.options.grid.snapSizeY) / this.options.grid.snapSizeY]);
        return [e.scrCoords[1], e.scrCoords[2]]
    }
    else
    {
        return [d, f]
    }
};
JXG.Board.prototype.getUsrCoordsOfMouse = function (h)
{
    var f = this.getRelativeMouseCoordinates(h),
        e = JXG.getPosition(h),
        d = e[0] - f[0],
        i = e[1] - f[1],
        g = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, i], this);
    if (this.options.grid.snapToGrid)
    {
        g.setCoordinates(JXG.COORDS_BY_USER, [Math.round((g.usrCoords[1]) * this.options.grid.snapSizeX) / this.options.grid.snapSizeX, Math.round((g.usrCoords[2]) * this.options.grid.snapSizeY) / this.options.grid.snapSizeY])
    }
    return [g.usrCoords[1], g.usrCoords[2]]
};
JXG.Board.prototype.getAllUnderMouse = function (e)
{
    var d = this.getAllObjectsUnderMouse(e);
    d.push(this.getUsrCoordsOfMouse(e));
    return d
};
JXG.Board.prototype.getAllObjectsUnderMouse = function (j)
{
    var i = this.getRelativeMouseCoordinates(j),
        d = JXG.getPosition(j),
        f = d[0] - i[0],
        e = d[1] - i[1],
        g = [];
    for (var h in this.objects)
    {
        if (this.objects[h].visProp.visible && this.objects[h].hasPoint && this.objects[h].hasPoint(f, e))
        {
            g.push(this.objects[h])
        }
    }
    return g
};
JXG.Board.prototype.moveOrigin = function ()
{
    var e, d;
    for (d in this.objects)
    {
        e = this.objects[d];
        if (!e.frozen && (e.elementClass == JXG.OBJECT_CLASS_POINT || e.elementClass == JXG.OBJECT_CLASS_CURVE || e.type == JXG.OBJECT_TYPE_AXIS || e.type == JXG.OBJECT_TYPE_TEXT))
        {
            if (e.elementClass != JXG.OBJECT_CLASS_CURVE && e.type != JXG.OBJECT_TYPE_AXIS)
            {
                e.coords.usr2screen()
            }
        }
    }
    this.clearTraces();
    this.fullUpdate();
    if (this.options.grid.hasGrid)
    {
        this.renderer.removeGrid(this);
        this.renderer.drawGrid(this)
    }
    return this
};
JXG.Board.prototype.addConditions = function (p)
{
    var e = "var el,x,y,c;\n",
        n = p.indexOf("<data>"),
        l = p.indexOf("</data>"),
        k, h, g, r, d, f;
    if (n < 0)
    {
        return
    }
    while (n >= 0)
    {
        k = p.slice(n + 6, l);
        h = k.indexOf("=");
        g = k.slice(0, h);
        r = k.slice(h + 1);
        h = g.indexOf(".");
        d = g.slice(0, h);
        f = this.elementsByName[JXG.unescapeHTML(d)];
        var q = g.slice(h + 1).replace(/\s+/g, "").toLowerCase();
        r = JXG.GeonextParser.geonext2JS(r, this);
        r = r.replace(/this\.board\./g, "this.");
        if (!JXG.exists(this.elementsByName[d]))
        {
            JXG.debug("debug conditions: |" + d + "| undefined")
        }
        e += 'el = this.objects["' + f.id + '"];\n';
        switch (q)
        {
        case "x":
            e += "var y=el.coords.usrCoords[2];\n";
            e += "el.setPositionDirectly(JXG.COORDS_BY_USER," + (r) + ",y);\n";
            e += "el.update();\n";
            break;
        case "y":
            e += "var x=el.coords.usrCoords[1];\n";
            e += "el.coords=new JXG.Coords(JXG.COORDS_BY_USER,[x," + (r) + "],this);\n";
            break;
        case "visible":
            e += "var c=" + (r) + ";\n";
            e += "if (c) {el.showElement();} else {el.hideElement();}\n";
            break;
        case "position":
            e += "el.position = " + (r) + ";\n";
            e += "el.update();\n";
            break;
        case "stroke":
            e += "el.strokeColor = " + (r) + ";\n";
            break;
        case "style":
            e += "el.setStyle(" + (r) + ");\n";
            break;
        case "strokewidth":
            e += "el.strokeWidth = " + (r) + ";\n";
            break;
        case "fill":
            e += "var f=" + (r) + ";\n";
            e += "el.setProperty({fillColor:f})\n";
            break;
        case "label":
            break;
        default:
            JXG.debug("property '" + q + "' in conditions not yet implemented:" + r);
            break
        }
        p = p.slice(l + 7);
        n = p.indexOf("<data>");
        l = p.indexOf("</data>")
    }
    e += "this.prepareUpdate();\n";
    e += "this.updateElements();\n";
    e += "return true;\n";
    this.updateConditions = new Function(e);
    this.updateConditions()
};
JXG.Board.prototype.updateConditions = function ()
{
    return false
};
JXG.Board.prototype.calculateSnapSizes = function ()
{
    var f = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this),
        e = new JXG.Coords(JXG.COORDS_BY_USER, [1 / this.options.grid.gridX, 1 / this.options.grid.gridY], this),
        d = f.scrCoords[1] - e.scrCoords[1],
        g = f.scrCoords[2] - e.scrCoords[2];
    this.options.grid.snapSizeX = this.options.grid.gridX;
    while (Math.abs(d) > 25)
    {
        this.options.grid.snapSizeX *= 2;
        d /= 2
    }
    this.options.grid.snapSizeY = this.options.grid.gridY;
    while (Math.abs(g) > 25)
    {
        this.options.grid.snapSizeY *= 2;
        g /= 2
    }
    return this
};
JXG.Board.prototype.applyZoom = function ()
{
    var e, d;
    for (d in this.objects)
    {
        e = this.objects[d];
        if (!e.frozen && (e.elementClass == JXG.OBJECT_CLASS_POINT || e.elementClass == JXG.OBJECT_CLASS_CURVE || e.type == JXG.OBJECT_TYPE_AXIS || e.type == JXG.OBJECT_TYPE_TEXT))
        {
            if (e.elementClass != JXG.OBJECT_CLASS_CURVE && e.type != JXG.OBJECT_TYPE_AXIS)
            {
                e.coords.usr2screen()
            }
        }
    }
    this.calculateSnapSizes();
    this.clearTraces();
    this.fullUpdate();
    if (this.options.grid.hasGrid)
    {
        this.renderer.removeGrid(this);
        this.renderer.drawGrid(this)
    }
    return this
};
JXG.Board.prototype.updateStretch = function ()
{
    this.stretchX = this.zoomX * this.unitX;
    this.stretchY = this.zoomY * this.unitY;
    return this
};
JXG.Board.prototype.zoomIn = function ()
{
    var e, d;
    this.zoomX *= this.options.zoom.factor;
    this.zoomY *= this.options.zoom.factor;
    e = this.origin.scrCoords[1] * this.options.zoom.factor;
    d = this.origin.scrCoords[2] * this.options.zoom.factor;
    this.origin = new JXG.Coords(JXG.COORDS_BY_SCREEN, [e, d], this);
    this.updateStretch();
    this.applyZoom();
    return this
};
JXG.Board.prototype.zoomOut = function ()
{
    var e, d;
    this.zoomX /= this.options.zoom.factor;
    this.zoomY /= this.options.zoom.factor;
    e = this.origin.scrCoords[1] / this.options.zoom.factor;
    d = this.origin.scrCoords[2] / this.options.zoom.factor;
    this.origin = new JXG.Coords(JXG.COORDS_BY_SCREEN, [e, d], this);
    this.updateStretch();
    this.applyZoom();
    return this
};
JXG.Board.prototype.zoom100 = function ()
{
    var g, e, f, d;
    f = this.zoomX;
    d = this.zoomY;
    this.zoomX = 1;
    this.zoomY = 1;
    g = this.origin.scrCoords[1] / f;
    e = this.origin.scrCoords[2] / d;
    this.origin = new JXG.Coords(JXG.COORDS_BY_SCREEN, [g, e], this);
    this.updateStretch();
    this.applyZoom();
    return this
};
JXG.Board.prototype.zoomAllPoints = function ()
{
    var n, k, g, j, e, i, l, s, r, q, p, m, h, f, d, t;
    n = this.zoomX / this.zoomY;
    k = 0;
    g = 0;
    j = 0;
    e = 0;
    for (i in this.objects)
    {
        if ((this.objects[i].elementClass == JXG.OBJECT_CLASS_POINT) && this.objects[i].visProp.visible)
        {
            if (this.objects[i].coords.usrCoords[1] < k)
            {
                k = this.objects[i].coords.usrCoords[1]
            }
            else
            {
                if (this.objects[i].coords.usrCoords[1] > g)
                {
                    g = this.objects[i].coords.usrCoords[1]
                }
            }
            if (this.objects[i].coords.usrCoords[2] > e)
            {
                e = this.objects[i].coords.usrCoords[2]
            }
            else
            {
                if (this.objects[i].coords.usrCoords[2] < j)
                {
                    j = this.objects[i].coords.usrCoords[2]
                }
            }
        }
    }
    l = 50;
    s = l / (this.unitX * this.zoomX);
    r = l / (this.unitY * this.zoomY);
    q = g - k + 2 * s;
    p = e - j + 2 * r;
    m = Math.min(this.canvasWidth / (this.unitX * q), this.canvasHeight / (this.unitY * p));
    f = m;
    h = m * n;
    d = -(k - s) * this.unitX * h;
    t = (e + r) * this.unitY * f;
    this.origin = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, t], this);
    this.zoomX = h;
    this.zoomY = f;
    this.updateStretch();
    this.applyZoom();
    return this
};
JXG.Board.prototype.removeObject = function (d)
{
    var g, f;
    if (JXG.isArray(d))
    {
        for (f = 0; f < d.length; f++)
        {
            this.removeObject(d[f])
        }
    }
    d = JXG.getReference(this, d);
    if (!JXG.exists(d))
    {
        return this
    }
    try
    {
        for (g in d.childElements)
        {
            d.childElements[g].board.removeObject(d.childElements[g])
        }
        for (g in this.objects)
        {
            if (JXG.exists(this.objects[g].childElements))
            {
                delete(this.objects[g].childElements[d.id])
            }
        }
        delete(this.objects[d.id]);
        delete(this.elementsByName[d.name]);
        if (JXG.exists(d.remove))
        {
            d.remove()
        }
    }
    catch (h)
    {
        JXG.debug(d.id + ": Could not be removed, JS says:\n\n" + h)
    }
    return this
};
JXG.Board.prototype.initGeonextBoard = function ()
{
    var h, g, f, e, d;
    h = new JXG.Point(this, [0, 0], this.id + "gOOe0", "Ursprung", false);
    h.fixed = true;
    g = new JXG.Point(this, [1, 0], this.id + "gXOe0", "Punkt_1_0", false);
    g.fixed = true;
    f = new JXG.Point(this, [0, 1], this.id + "gYOe0", "Punkt_0_1", false);
    f.fixed = true;
    e = new JXG.Line(this, this.id + "gOOe0", this.id + "gXOe0", this.id + "gXLe0", "X-Achse", false);
    e.hideElement();
    d = new JXG.Line(this, this.id + "gOOe0", this.id + "gYOe0", this.id + "gYLe0", "Y-Achse", false);
    d.hideElement();
    return this
};
JXG.Board.prototype.initInfobox = function ()
{
    this.infobox = new JXG.Text(this, "0,0", "", [0, 0], this.id + "__infobox", null, null, false, "html");
    this.infobox.distanceX = -20;
    this.infobox.distanceY = 25;
    this.renderer.hide(this.infobox);
    return this
};
JXG.Board.prototype.resizeContainer = function (d, e)
{
    this.canvasWidth = parseFloat(d);
    this.canvasHeight = parseFloat(e);
    this.containerObj.style.width = (this.canvasWidth) + "px";
    this.containerObj.style.height = (this.canvasHeight) + "px";
    return this
};
JXG.Board.prototype.showDependencies = function ()
{
    var g, e, j, h, d;
    e = "<p>\n";
    for (g in this.objects)
    {
        d = 0;
        for (j in this.objects[g].childElements)
        {
            d++
        }
        if (d >= 0)
        {
            e += "<b>" + this.objects[g].id + ":</b> "
        }
        for (j in this.objects[g].childElements)
        {
            e += this.objects[g].childElements[j].id + "(" + this.objects[g].childElements[j].name + "), "
        }
        e += "<p>\n"
    }
    e += "</p>\n";
    h = window.open();
    h.document.open();
    h.document.write(e);
    h.document.close();
    return this
};
JXG.Board.prototype.showXML = function ()
{
    var d = window.open("");
    d.document.open();
    d.document.write("<pre>" + JXG.escapeHTML(this.xmlString) + "</pre>");
    d.document.close();
    return this
};
JXG.Board.prototype.prepareUpdate = function ()
{
    var d;
    for (d in this.objects)
    {
        this.objects[d].needsUpdate = true
    }
    return this
};
JXG.Board.prototype.updateElements = function (e)
{
    var d, g, f = true;
    e = JXG.getRef(this, e);
    if (e == null)
    {
        f = false
    }
    for (d in this.objects)
    {
        g = this.objects[d];
        if (f && e != null && g.id == e.id)
        {
            f = false
        }
        if (!this.needsFullUpdate && (f || !g.needsRegularUpdate))
        {
            continue
        }
        if (e == null || g.id != e.id)
        {
            g.update(true)
        }
        else
        {
            g.update(false)
        }
    }
    return this
};
JXG.Board.prototype.updateRenderer = function (e)
{
    var d, g, f = true;
    e = JXG.getReference(this, e);
    if (e == null)
    {
        f = false
    }
    for (d in this.objects)
    {
        g = this.objects[d];
        if (f && e != null && g.id == e.id)
        {
            f = false
        }
        if (!this.needsFullUpdate && (f || !g.needsRegularUpdate) && this.options.renderer != "canvas")
        {
            continue
        }
        g.updateRenderer()
    }
    return this
};
JXG.Board.prototype.addHook = function (e, d)
{
    if (!JXG.exists(d))
    {
        d = "update"
    }
    this.hooks.push(
    {
        fn: e,
        mode: d
    });
    if (d == "update")
    {
        e(this)
    }
    return (this.hooks.length - 1)
};
JXG.Board.prototype.removeHook = function (d)
{
    this.hooks[d] = null;
    return this
};
JXG.Board.prototype.updateHooks = function (d)
{
    var f, e = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
    if (!JXG.exists(d))
    {
        d = "update"
    }
    for (f = 0; f < this.hooks.length; f++)
    {
        if ((this.hooks[f] != null) && (this.hooks[f].mode == d))
        {
            this.hooks[f].fn.apply(this, e)
        }
    }
    return this
};
JXG.Board.prototype.addChild = function (d)
{
    this.dependentBoards.push(d);
    this.update();
    return this
};
JXG.Board.prototype.removeChild = function (e)
{
    var d;
    for (d = this.dependentBoards.length - 1; d >= 0; d--)
    {
        if (this.dependentBoards[d] == e)
        {
            this.dependentBoards.splice(d, 1)
        }
    }
    return this
};
JXG.Board.prototype.update = function (g)
{
    var f, e, h, d;
    if (this.isSuspendedUpdate)
    {
        return this
    }
    this.prepareUpdate(g).updateElements(g).updateConditions();
    this.renderer.suspendRedraw();
    this.updateRenderer(g);
    this.renderer.unsuspendRedraw();
    this.updateHooks();
    e = this.dependentBoards.length;
    for (f = 0; f < e; f++)
    {
        h = this.dependentBoards[f].id;
        d = JXG.JSXGraph.boards[h];
        if (d != this)
        {
            d.updateQuality = this.updateQuality;
            d.prepareUpdate().updateElements().updateConditions();
            d.renderer.suspendRedraw();
            d.updateRenderer();
            d.renderer.unsuspendRedraw();
            d.updateHooks()
        }
    }
    return this
};
JXG.Board.prototype.fullUpdate = function ()
{
    this.needsFullUpdate = true;
    this.update();
    this.needsFullUpdate = false;
    return this
};
JXG.Board.prototype.createElement = function (e, f, d)
{
    var j, g, h;
    if (e != "turtle" && (!JXG.exists(f) || (f.length && f.length == 0)))
    {
        return null
    }
    if (!JXG.exists(f))
    {
        f = []
    }
    e = e.toLowerCase();
    if (d == null)
    {
        d =
        {
        }
    }
    for (g = 0; g < f.length; g++)
    {
        f[g] = JXG.getReference(this, f[g])
    }
    if (JXG.JSXGraph.elements[e] != null)
    {
        if (typeof JXG.JSXGraph.elements[e] == "function")
        {
            j = JXG.JSXGraph.elements[e](this, f, d)
        }
        else
        {
            j = JXG.JSXGraph.elements[e].creator(this, f, d)
        }
    }
    else
    {
        throw new Error("JSXGraph: JXG.createElement: Unknown element type given: " + e)
    }
    if (!JXG.exists(j))
    {
        JXG.debug("JSXGraph: JXG.createElement: failure creating " + e);
        return j
    }
    if (JXG.isArray(d))
    {
        d = d[0]
    }
    if (j.multipleElements)
    {
        for (h in j)
        {
            if (j[h].setProperty)
            {
                j[h].setProperty(d)
            }
        }
    }
    else
    {
        if (j.setProperty)
        {
            j.setProperty(d)
        }
    }
    this.update(j);
    return j
};
JXG.Board.prototype.create = JXG.Board.prototype.createElement;
JXG.Board.prototype.clearTraces = function ()
{
    var d;
    for (d in this.objects)
    {
        if (this.objects[d].traced)
        {
            this.objects[d].clearTrace()
        }
    }
    this.numTraces = 0;
    return this
};
JXG.Board.prototype.suspendUpdate = function ()
{
    this.isSuspendedUpdate = true;
    return this
};
JXG.Board.prototype.unsuspendUpdate = function ()
{
    this.isSuspendedUpdate = false;
    this.update();
    return this
};
JXG.Board.prototype.setBoundingBox = function (k, g)
{
    if (!JXG.isArray(k))
    {
        return this
    }
    var i, f, e, d, j = JXG.getDimensions(this.container);
    this.canvasWidth = parseInt(j.width);
    this.canvasHeight = parseInt(j.height);
    f = this.canvasWidth;
    i = this.canvasHeight;
    if (g)
    {
        this.unitX = f / (k[2] - k[0]);
        this.unitY = i / (-k[3] + k[1]);
        if (this.unitX < this.unitY)
        {
            this.unitY = this.unitX
        }
        else
        {
            this.unitX = this.unitY
        }
    }
    else
    {
        this.unitX = f / (k[2] - k[0]);
        this.unitY = i / (-k[3] + k[1])
    }
    e = -this.unitX * k[0] * this.zoomX;
    d = this.unitY * k[1] * this.zoomY;
    this.origin = new JXG.Coords(JXG.COORDS_BY_SCREEN, [e, d], this);
    this.updateStretch();
    this.moveOrigin();
    return this
};
JXG.Board.prototype.addAnimation = function (d)
{
    this.animationObjects[d.id] = d;
    if (!this.animationIntervalCode)
    {
        this.animationIntervalCode = window.setInterval("JXG.JSXGraph.boards['" + this.id + "'].animate();", 35)
    }
    return this
};
JXG.Board.prototype.stopAllAnimation = function ()
{
    var d;
    for (d in this.animationObjects)
    {
        if (this.animationObjects[d] === null)
        {
            continue
        }
        this.animationObjects[d] = null;
        delete(this.animationObjects[d])
    }
    window.clearInterval(this.animationIntervalCode);
    delete(this.animationIntervalCode);
    return this
};
JXG.Board.prototype.animate = function ()
{
    var f = 0,
        d, j, i, e, h, k, g = null;
    for (d in this.animationObjects)
    {
        if (this.animationObjects[d] === null)
        {
            continue
        }
        f++;
        j = this.animationObjects[d];
        if (j.animationPath)
        {
            if (JXG.isFunction(j.animationPath))
            {
                i = j.animationPath(new Date().getTime() - j.animationStart)
            }
            else
            {
                i = j.animationPath.pop()
            }
            if ((!JXG.exists(i)) || (!JXG.isArray(i) && isNaN(i)))
            {
                delete(j.animationPath)
            }
            else
            {
                j.setPositionDirectly(JXG.COORDS_BY_USER, i[0], i[1]);
                j.prepareUpdate().update().updateRenderer();
                g = j
            }
        }
        if (j.animationData)
        {
            k = 0;
            for (e in j.animationData)
            {
                h = j.animationData[e].pop();
                if (!JXG.exists(h))
                {
                    delete(j.animationData[h])
                }
                else
                {
                    k++;
                    j.setProperty(e + ":" + h)
                }
            }
            if (k == 0)
            {
                delete(j.animationData)
            }
        }
        if (!JXG.exists(j.animationData) && !JXG.exists(j.animationPath))
        {
            this.animationObjects[d] = null;
            delete(this.animationObjects[d])
        }
    }
    if (f == 0)
    {
        window.clearInterval(this.animationIntervalCode);
        delete(this.animationIntervalCode)
    }
    else
    {
        this.update(g)
    }
    return this
};
JXG.Board.prototype.emulateColorblindness = function (d)
{
    var f, g, h = this;
    if (!JXG.exists(d))
    {
        d = "none"
    }
    if (this.currentCBDef == d)
    {
        return this
    }
    for (f in h.objects)
    {
        g = h.objects[f];
        if (d != "none")
        {
            if (this.currentCBDef == "none")
            {
                g.visPropOriginal = JXG.deepCopy(g.visProp)
            }
            g.setProperty(
            {
                strokeColor: JXG.rgb2cb(g.visPropOriginal.strokeColor, d),
                fillColor: JXG.rgb2cb(g.visPropOriginal.fillColor, d),
                highlightStrokeColor: JXG.rgb2cb(g.visPropOriginal.highlightStrokeColor, d),
                highlightFillColor: JXG.rgb2cb(g.visPropOriginal.highlightFillColor, d)
            })
        }
        else
        {
            if (JXG.exists(g.visPropOriginal))
            {
                g.visProp = JXG.deepCopy(g.visPropOriginal)
            }
        }
    }
    this.currentCBDef = d;
    this.update();
    return this
};
JXG.Board.prototype.createRoulette = function (h, g, l, i, k, e, j)
{
    var f = this;
    var d = function ()
    {
        var t = 0,
            x = 0,
            w = 0,
            v = l,
            u = JXG.Math.Numerics.root(function (F)
            {
                var H = h.X(v),
                    G = h.Y(v),
                    E = g.X(F),
                    D = g.Y(F);
                return (H - E) * (H - E) + (G - D) * (G - D)
            }, [0, Math.PI * 2]),
            q = 0,
            m = 0,
            A, B = f.create("transform", [function ()
            {
                return t
            }], {
                type: "rotate"
            }),
            p = f.create("transform", [function ()
            {
                return t
            }, function ()
            {
                return h.X(v)
            }, function ()
            {
                return h.Y(v)
            }], {
                type: "rotate"
            }),
            s = f.create("transform", [function ()
            {
                return x
            }, function ()
            {
                return w
            }], {
                type: "translate"
            }),
            y = function (M, O, N)
            {
                var L = JXG.Math.Numerics.D(M.X)(O),
                    F = JXG.Math.Numerics.D(M.Y)(O),
                    K = JXG.Math.Numerics.D(M.X)(N),
                    E = JXG.Math.Numerics.D(M.Y)(N),
                    H = JXG.Math.Numerics.D(M.X)((O + N) * 0.5),
                    J = JXG.Math.Numerics.D(M.Y)((O + N) * 0.5),
                    I = Math.sqrt(L * L + F * F),
                    G = Math.sqrt(K * K + E * E),
                    D = Math.sqrt(H * H + J * J);
                return (I + 4 * D + G) * (N - O) / 6
            },
            C = function (D)
            {
                return A - y(g, u, D)
            },
            z = Math.PI / 18,
            n = z * 9,
            r = null;
        this.rolling = function ()
        {
            q = v + k * i;
            A = y(h, v, q);
            m = JXG.Math.Numerics.root(C, u);
            var E = new JXG.Complex(h.X(q), h.Y(q));
            var F = new JXG.Complex(g.X(m), g.Y(m));
            var G = new JXG.Complex(JXG.Math.Numerics.D(h.X)(q), JXG.Math.Numerics.D(h.Y)(q));
            var D = new JXG.Complex(JXG.Math.Numerics.D(g.X)(m), JXG.Math.Numerics.D(g.Y)(m));
            var H = JXG.C.div(G, D);
            t = Math.atan2(H.imaginary, H.real);
            H.div(JXG.C.abs(H));
            H.mult(F);
            x = E.real - H.real;
            w = E.imaginary - H.imaginary;
            if (t < -z && t > -n)
            {
                t = -z;
                p.applyOnce(j)
            }
            else
            {
                if (t > z && t < n)
                {
                    t = z;
                    p.applyOnce(j)
                }
                else
                {
                    B.applyOnce(j);
                    s.applyOnce(j);
                    v = q;
                    u = m
                }
            }
            f.update()
        };
        this.start = function ()
        {
            if (e > 0)
            {
                r = setInterval(this.rolling, e)
            }
            return this
        };
        this.stop = function ()
        {
            clearInterval(r);
            return this
        };
        return this
    };
    return new d()
};
JXG.Options =
{
    showCopyright: true,
    showNavigation: true,
    takeSizeFromFile: false,
    renderer: "svg",
    takeFirst: false,
    grid: {
        hasGrid: false,
        gridX: 1,
        gridY: 1,
        gridColor: "#C0C0C0",
        gridOpacity: "0.5",
        gridDash: true,
        snapToGrid: false,
        snapSizeX: 2,
        snapSizeY: 2
    },
    zoom: {
        factor: 1.25
    },
    elements: {
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF",
        fillColor: "none",
        highlightFillColor: "none",
        strokeOpacity: 1,
        highlightStrokeOpacity: 1,
        fillOpacity: 1,
        highlightFillOpacity: 1,
        strokeWidth: "2px",
        withLabel: false,
        draft: {
            draft: false,
            color: "#565656",
            opacity: 0.8,
            strokeWidth: "1px"
        }
    },
    point: {
        withLabel: true,
        style: 5,
        face: "o",
        size: 3,
        fillColor: "#ff0000",
        highlightFillColor: "#EEEEEE",
        strokeWidth: "2px",
        strokeColor: "#ff0000",
        highlightStrokeColor: "#C3D9FF",
        zoom: false,
        showInfobox: true
    },
    line: {
        firstArrow: false,
        lastArrow: false,
        straightFirst: true,
        straightLast: true,
        fillColor: "#000000",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#888888",
        ticks: {
            drawLabels: true,
            drawZero: false,
            insertTicks: false,
            minTicksDistance: 50,
            maxTicksDistance: 300,
            minorHeight: 4,
            majorHeight: 10,
            minorTicks: 4,
            defaultDistance: 1
        },
        labelOffsets: [10, 10]
    },
    axis: {
        strokeColor: "#666666",
        highlightStrokeColor: "#888888"
    },
    circle: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF"
    },
    conic: {
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF"
    },
    angle: {
        withLabel: true,
        radius: 1,
        fillColor: "#FF7F00",
        highlightFillColor: "#FF7F00",
        strokeColor: "#FF7F00",
        textColor: "#0000FF",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3
    },
    arc: {
        firstArrow: false,
        lastArrow: false,
        fillColor: "none",
        highlightFillColor: "none",
        strokeColor: "#0000ff",
        highlightStrokeColor: "#C3D9FF"
    },
    polygon: {
        fillColor: "#00FF00",
        highlightFillColor: "#00FF00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3
    },
    sector: {
        fillColor: "#00FF00",
        highlightFillColor: "#00FF00",
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3
    },
    text: {
        fontSize: 12,
        strokeColor: "#000000",
        useASCIIMathML: false,
        useMathJax: false,
        defaultDisplay: "html"
    },
    curve: {
        strokeWidth: "1px",
        strokeColor: "#0000ff",
        RDPsmoothing: false,
        numberPointsHigh: 1600,
        numberPointsLow: 400,
        doAdvancedPlot: true
    },
    precision: {
        touch: 30,
        mouse: 4,
        epsilon: 0.0001,
        hasPoint: 4
    },
    layer: {
        numlayers: 20,
        text: 9,
        point: 9,
        arc: 8,
        line: 7,
        circle: 6,
        curve: 5,
        polygon: 4,
        sector: 3,
        angle: 3,
        grid: 1,
        image: 0
    },
    locus: {
        translateToOrigin: false,
        translateTo10: false,
        stretch: false,
        toOrigin: null,
        to10: null
    }
};
JXG.useStandardOptions = function (g)
{
    var i = JXG.Options,
        f = g.hasGrid,
        e, d, h;
    g.options.grid.hasGrid = i.grid.hasGrid;
    g.options.grid.gridX = i.grid.gridX;
    g.options.grid.gridY = i.grid.gridY;
    g.options.grid.gridColor = i.grid.gridColor;
    g.options.grid.gridOpacity = i.grid.gridOpacity;
    g.options.grid.gridDash = i.grid.gridDash;
    g.options.grid.snapToGrid = i.grid.snapToGrid;
    g.options.grid.snapSizeX = i.grid.SnapSizeX;
    g.options.grid.snapSizeY = i.grid.SnapSizeY;
    g.takeSizeFromFile = i.takeSizeFromFile;
    for (e in g.objects)
    {
        h = g.objects[e];
        if (h.elementClass == JXG.OBJECT_CLASS_POINT)
        {
            h.visProp.fillColor = i.point.fillColor;
            h.visProp.highlightFillColor = i.point.highlightFillColor;
            h.visProp.strokeColor = i.point.strokeColor;
            h.visProp.highlightStrokeColor = i.point.highlightStrokeColor
        }
        else
        {
            if (h.elementClass == JXG.OBJECT_CLASS_LINE)
            {
                h.visProp.fillColor = i.line.fillColor;
                h.visProp.highlightFillColor = i.line.highlightFillColor;
                h.visProp.strokeColor = i.line.strokeColor;
                h.visProp.highlightStrokeColor = i.line.highlightStrokeColor;
                for (d in h.ticks)
                {
                    d.majorTicks = i.line.ticks.majorTicks;
                    d.minTicksDistance = i.line.ticks.minTicksDistance;
                    d.minorHeight = i.line.ticks.minorHeight;
                    d.majorHeight = i.line.ticks.majorHeight
                }
            }
            else
            {
                if (h.elementClass == JXG.OBJECT_CLASS_CIRCLE)
                {
                    h.visProp.fillColor = i.circle.fillColor;
                    h.visProp.highlightFillColor = i.circle.highlightFillColor;
                    h.visProp.strokeColor = i.circle.strokeColor;
                    h.visProp.highlightStrokeColor = i.circle.highlightStrokeColor
                }
                else
                {
                    if (h.type == JXG.OBJECT_TYPE_ANGLE)
                    {
                        h.visProp.fillColor = i.angle.fillColor;
                        h.visProp.highlightFillColor = i.angle.highlightFillColor;
                        h.visProp.strokeColor = i.angle.strokeColor
                    }
                    else
                    {
                        if (h.type == JXG.OBJECT_TYPE_ARC)
                        {
                            h.visProp.fillColor = i.arc.fillColor;
                            h.visProp.highlightFillColor = i.arc.highlightFillColor;
                            h.visProp.strokeColor = i.arc.strokeColor;
                            h.visProp.highlightStrokeColor = i.arc.highlightStrokeColor
                        }
                        else
                        {
                            if (h.type == JXG.OBJECT_TYPE_POLYGON)
                            {
                                h.visProp.fillColor = i.polygon.fillColor;
                                h.visProp.highlightFillColor = i.polygon.highlightFillColor;
                                h.visProp.fillOpacity = i.polygon.fillOpacity;
                                h.visProp.highlightFillOpacity = i.polygon.highlightFillOpacity
                            }
                            else
                            {
                                if (h.type == JXG.OBJECT_TYPE_CONIC)
                                {
                                    h.visProp.fillColor = i.conic.fillColor;
                                    h.visProp.highlightFillColor = i.conic.highlightFillColor;
                                    h.visProp.strokeColor = i.conic.strokeColor;
                                    h.visProp.highlightStrokeColor = i.conic.highlightStrokeColor
                                }
                                else
                                {
                                    if (h.type == JXG.OBJECT_TYPE_CURVE)
                                    {
                                        h.visProp.strokeColor = i.curve.strokeColor
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (e in g.objects)
    {
        h = g.objects[e];
        if (h.type == JXG.OBJECT_TYPE_SECTOR)
        {
            h.arc.visProp.fillColor = i.sector.fillColor;
            h.arc.visProp.highlightFillColor = i.sector.highlightFillColor;
            h.arc.visProp.fillOpacity = i.sector.fillOpacity;
            h.arc.visProp.highlightFillOpacity = i.sector.highlightFillOpacity
        }
    }
    g.fullUpdate();
    if (f && g.hasGrid)
    {
        g.renderer.removeGrid(g);
        g.renderer.drawGrid(g)
    }
    else
    {
        if (f && !g.hasGrid)
        {
            g.renderer.removeGrid(g)
        }
        else
        {
            if (!f && g.hasGrid)
            {
                g.renderer.drawGrid(g)
            }
        }
    }
};
JXG.useBlackWhiteOptions = function (d)
{
    var e = JXG.Options;
    e.point.fillColor = JXG.rgb2bw(e.point.fillColor);
    e.point.highlightFillColor = JXG.rgb2bw(e.point.highlightFillColor);
    e.point.strokeColor = JXG.rgb2bw(e.point.strokeColor);
    e.point.highlightStrokeColor = JXG.rgb2bw(e.point.highlightStrokeColor);
    e.line.fillColor = JXG.rgb2bw(e.line.fillColor);
    e.line.highlightFillColor = JXG.rgb2bw(e.line.highlightFillColor);
    e.line.strokeColor = JXG.rgb2bw(e.line.strokeColor);
    e.line.highlightStrokeColor = JXG.rgb2bw(e.line.highlightStrokeColor);
    e.circle.fillColor = JXG.rgb2bw(e.circle.fillColor);
    e.circle.highlightFillColor = JXG.rgb2bw(e.circle.highlightFillColor);
    e.circle.strokeColor = JXG.rgb2bw(e.circle.strokeColor);
    e.circle.highlightStrokeColor = JXG.rgb2bw(e.circle.highlightStrokeColor);
    e.arc.fillColor = JXG.rgb2bw(e.arc.fillColor);
    e.arc.highlightFillColor = JXG.rgb2bw(e.arc.highlightFillColor);
    e.arc.strokeColor = JXG.rgb2bw(e.arc.strokeColor);
    e.arc.highlightStrokeColor = JXG.rgb2bw(e.arc.highlightStrokeColor);
    e.polygon.fillColor = JXG.rgb2bw(e.polygon.fillColor);
    e.polygon.highlightFillColor = JXG.rgb2bw(e.polygon.highlightFillColor);
    e.sector.fillColor = JXG.rgb2bw(e.sector.fillColor);
    e.sector.highlightFillColor = JXG.rgb2bw(e.sector.highlightFillColor);
    e.curve.strokeColor = JXG.rgb2bw(e.curve.strokeColor);
    e.grid.gridColor = JXG.rgb2bw(e.grid.gridColor);
    JXG.useStandardOptions(d)
};
JXG.rgb2bw = function (f)
{
    if (f == "none")
    {
        return f
    }
    var e, h = "0123456789ABCDEF",
        g, d;
    d = JXG.rgbParser(f);
    e = 0.3 * d[0] + 0.59 * d[1] + 0.11 * d[2];
    g = h.charAt((e >> 4) & 15) + h.charAt(e & 15);
    f = "#" + g + "" + g + "" + g;
    return f
};
JXG.simulateColorBlindness = function (e, d)
{
    o = JXG.Options;
    o.point.fillColor = JXG.rgb2cb(o.point.fillColor, d);
    o.point.highlightFillColor = JXG.rgb2cb(o.point.highlightFillColor, d);
    o.point.strokeColor = JXG.rgb2cb(o.point.strokeColor, d);
    o.point.highlightStrokeColor = JXG.rgb2cb(o.point.highlightStrokeColor, d);
    o.line.fillColor = JXG.rgb2cb(o.line.fillColor, d);
    o.line.highlightFillColor = JXG.rgb2cb(o.line.highlightFillColor, d);
    o.line.strokeColor = JXG.rgb2cb(o.line.strokeColor, d);
    o.line.highlightStrokeColor = JXG.rgb2cb(o.line.highlightStrokeColor, d);
    o.circle.fillColor = JXG.rgb2cb(o.circle.fillColor, d);
    o.circle.highlightFillColor = JXG.rgb2cb(o.circle.highlightFillColor, d);
    o.circle.strokeColor = JXG.rgb2cb(o.circle.strokeColor, d);
    o.circle.highlightStrokeColor = JXG.rgb2cb(o.circle.highlightStrokeColor, d);
    o.arc.fillColor = JXG.rgb2cb(o.arc.fillColor, d);
    o.arc.highlightFillColor = JXG.rgb2cb(o.arc.highlightFillColor, d);
    o.arc.strokeColor = JXG.rgb2cb(o.arc.strokeColor, d);
    o.arc.highlightStrokeColor = JXG.rgb2cb(o.arc.highlightStrokeColor, d);
    o.polygon.fillColor = JXG.rgb2cb(o.polygon.fillColor, d);
    o.polygon.highlightFillColor = JXG.rgb2cb(o.polygon.highlightFillColor, d);
    o.sector.fillColor = JXG.rgb2cb(o.sector.fillColor, d);
    o.sector.highlightFillColor = JXG.rgb2cb(o.sector.highlightFillColor, d);
    o.curve.strokeColor = JXG.rgb2cb(o.curve.strokeColor, d);
    o.grid.gridColor = JXG.rgb2cb(o.grid.gridColor, d);
    JXG.useStandardOptions(e)
};
JXG.rgb2cb = function (i, q)
{
    if (i == "none")
    {
        return i
    }
    var t, h, g, w, r, n, f, v, k, e, u, j, p;
    r = JXG.rgb2LMS(i);
    h = r.l;
    g = r.m;
    w = r.s;
    q = q.toLowerCase();
    switch (q)
    {
    case "protanopia":
        f = -0.06150039994295001;
        v = 0.08277001656812001;
        k = -0.013200141220000003;
        e = 0.05858939668799999;
        u = -0.07934519995360001;
        j = 0.013289415272000003;
        p = 0.6903216543277437;
        n = w / g;
        if (n < p)
        {
            h = -(v * g + k * w) / f
        }
        else
        {
            h = -(u * g + j * w) / e
        }
        break;
    case "tritanopia":
        f = -0.00058973116217;
        v = 0.007690316482;
        k = -0.01011703519052;
        e = 0.025495080838999994;
        u = -0.0422740347;
        j = 0.017005316784;
        p = 0.8349489908460004;
        n = g / h;
        if (n < p)
        {
            w = -(f * h + v * g) / k
        }
        else
        {
            w = -(e * h + u * g) / j
        }
        break;
    default:
        f = -0.06150039994295001;
        v = 0.08277001656812001;
        k = -0.013200141220000003;
        e = 0.05858939668799999;
        u = -0.07934519995360001;
        j = 0.013289415272000003;
        p = 0.5763833686400911;
        n = w / h;
        if (n < p)
        {
            g = -(f * h + k * w) / v
        }
        else
        {
            g = -(e * h + j * w) / u
        }
        break
    }
    t = JXG.LMS2rgb(h, g, w);
    var d = "0123456789ABCDEF";
    n = d.charAt((t.r >> 4) & 15) + d.charAt(t.r & 15);
    i = "#" + n;
    n = d.charAt((t.g >> 4) & 15) + d.charAt(t.g & 15);
    i += n;
    n = d.charAt((t.b >> 4) & 15) + d.charAt(t.b & 15);
    i += n;
    return i
};
JXG.loadOptionsFromFile = function (e, f, d)
{
    this.cbp = function (g)
    {
        this.parseString(g, f, d)
    };
    this.cb = JXG.bind(this.cbp, this);
    JXG.FileReader.parseFileContent(e, this.cb, "raw")
};
JXG.parseOptionsString = function (text, applyTo, board)
{
    var newOptions = "";
    if (text != "")
    {
        newOptions = eval("(" + text + ")")
    }
    else
    {
        return
    }
    var maxDepth = 10;
    var applyOption = function (base, option, depth)
    {
        if (depth == 10)
        {
            return
        }
        depth++;
        for (var key in option)
        {
            if ((JXG.isNumber(option[key])) || (JXG.isArray(option[key])) || (JXG.isString(option[key])) || (option[key] == true) || (option[key] == false))
            {
                base[key] = option[key]
            }
            else
            {
                applyOption(base[key], option[key], depth)
            }
        }
    };
    applyOption(this, newOptions, 0);
    if (applyTo && typeof board != "undefined")
    {
        JXG.useStandardOptions(board)
    }
};
JXG.JSXGraph =
{
    licenseText: "JSXGraph v0.82 Copyright (C) see http://jsxgraph.org",
    boards: {
    },
    elements: {
    },
    rendererType: (function ()
    {
        var h, e, g, d;
        h = navigator.appVersion.match(/MSIE (\d\.\d)/);
        e = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
        if ((!h) || (e) || (h && parseFloat(h[1]) >= 9))
        {
            if (navigator.appVersion.match(/Android.*AppleWebKit/))
            {
                JXG.Options.renderer = "canvas"
            }
            else
            {
                JXG.Options.renderer = "svg"
            }
        }
        else
        {
            JXG.Options.renderer = "vml";

            function f()
            {
                document.body.scrollLeft;
                document.body.scrollTop
            }
            document.onmousemove = f
        }
        d = JXG.rendererFiles[JXG.Options.renderer].split(",");
        for (g = 0; g < d.length; g++)
        {
            (function (i)
            {
                JXG.require(JXG.requirePath + i + ".js")
            })(d[g])
        }
        return JXG.Options.renderer
    })(),
    initBoard: function (g, e)
    {
        var l, v, u, p, m, r, f, d, t, s, q, n, k, i, j;
        d = JXG.getDimensions(g);
        if (typeof e == "undefined")
        {
            e =
            {
            }
        }
        if (typeof e.boundingbox != "undefined")
        {
            t = e.boundingbox;
            r = parseInt(d.width);
            f = parseInt(d.height);
            if (e.keepaspectratio)
            {
                p = r / (t[2] - t[0]);
                m = f / (-t[3] + t[1]);
                if (p < m)
                {
                    m = p
                }
                else
                {
                    p = m
                }
            }
            else
            {
                p = r / (t[2] - t[0]);
                m = f / (-t[3] + t[1])
            }
            v = -p * t[0];
            u = m * t[1]
        }
        else
        {
            v = ((typeof e.originX) == "undefined" ? 150 : e.originX);
            u = ((typeof e.originY) == "undefined" ? 150 : e.originY);
            p = ((typeof e.unitX) == "undefined" ? 50 : e.unitX);
            m = ((typeof e.unitY) == "undefined" ? 50 : e.unitY)
        }
        s = ((typeof e.zoom) == "undefined" ? 1 : e.zoom);
        q = s * ((typeof e.zoomX) == "undefined" ? 1 : e.zoomX);
        n = s * ((typeof e.zoomY) == "undefined" ? 1 : e.zoomY);
        k = ((typeof e.showCopyright) == "undefined" ? JXG.Options.showCopyright : e.showCopyright);
        if (JXG.Options.renderer == "svg")
        {
            l = new JXG.SVGRenderer(document.getElementById(g))
        }
        else
        {
            if (JXG.Options.renderer == "vml")
            {
                l = new JXG.VMLRenderer(document.getElementById(g))
            }
            else
            {
                if (JXG.Options.renderer == "silverlight")
                {
                    l = new JXG.SilverlightRenderer(document.getElementById(g), d.width, d.height)
                }
                else
                {
                    l = new JXG.CanvasRenderer(document.getElementById(g))
                }
            }
        }
        j = new JXG.Board(g, l, "", [v, u], 1, 1, p, m, d.width, d.height, k);
        this.boards[j.id] = j;
        j.suspendUpdate();
        j.initInfobox();
        if (e.axis)
        {
            j.defaultAxes =
            {
            };
            j.defaultAxes.x = j.create("axis", [
                [0, 0],
                [1, 0]
            ], {
            });
            j.defaultAxes.y = j.create("axis", [
                [0, 0],
                [0, 1]
            ], {
            })
        }
        if (e.grid)
        {
            j.renderer.drawGrid(j)
        }
        if (typeof e.shownavigation != "undefined")
        {
            e.showNavigation = e.shownavigation
        }
        i = ((typeof e.showNavigation) == "undefined" ? j.options.showNavigation : e.showNavigation);
        if (i)
        {
            j.renderer.drawZoomBar(j)
        }
        j.unsuspendUpdate();
        return j
    },
    loadBoardFromFile: function (g, d, i)
    {
        var h, e, f;
        if (JXG.Options.renderer == "svg")
        {
            h = new JXG.SVGRenderer(document.getElementById(g))
        }
        else
        {
            if (JXG.Options.renderer == "vml")
            {
                h = new JXG.VMLRenderer(document.getElementById(g))
            }
            else
            {
                if (JXG.Options.renderer == "silverlight")
                {
                    h = new JXG.SilverlightRenderer(document.getElementById(g), f.width, f.height)
                }
                else
                {
                    h = new JXG.CanvasRenderer(document.getElementById(g))
                }
            }
        }
        f = JXG.getDimensions(g);
        e = new JXG.Board(g, h, "", [150, 150], 1, 1, 50, 50, f.width, f.height);
        e.initInfobox();
        JXG.FileReader.parseFileContent(d, e, i);
        if (e.options.showNavigation)
        {
            e.renderer.drawZoomBar(e)
        }
        this.boards[e.id] = e;
        return e
    },
    loadBoardFromString: function (g, d, i)
    {
        var h, f, e;
        if (JXG.Options.renderer == "svg")
        {
            h = new JXG.SVGRenderer(document.getElementById(g))
        }
        else
        {
            if (JXG.Options.renderer == "vml")
            {
                h = new JXG.VMLRenderer(document.getElementById(g))
            }
            else
            {
                if (JXG.Options.renderer == "silverlight")
                {
                    h = new JXG.SilverlightRenderer(document.getElementById(g), f.width, f.height)
                }
                else
                {
                    h = new JXG.CanvasRenderer(document.getElementById(g))
                }
            }
        }
        f = JXG.getDimensions(g);
        e = new JXG.Board(g, h, "", [150, 150], 1, 1, 50, 50, f.width, f.height);
        e.initInfobox();
        JXG.FileReader.parseString(d, e, i, true);
        if (e.options.showNavigation)
        {
            e.renderer.drawZoomBar(e)
        }
        this.boards[e.id] = e;
        return e
    },
    freeBoard: function (e)
    {
        var d;
        if (typeof(e) == "string")
        {
            e = this.boards[e]
        }
        JXG.removeEvent(document, "mousedown", e.mouseDownListener, e);
        JXG.removeEvent(document, "mouseup", e.mouseUpListener, e);
        JXG.removeEvent(e.containerObj, "mousemove", e.mouseMoveListener, e);
        for (d in e.objects)
        {
            e.removeObject(e.objects[d])
        }
        e.containerObj.innerHTML = "";
        for (d in e.objects)
        {
            delete(e.objects[d])
        }
        delete(e.renderer);
        delete(e.algebra);
        delete(this.boards[e.id])
    },
    registerElement: function (d, e)
    {
        d = d.toLowerCase();
        this.elements[d] = e;
        if (JXG.Board.prototype["_" + d])
        {
            throw new Error("JSXGraph: Can't create wrapper method in JXG.Board because member '_" + d + "' already exists'")
        }
        JXG.Board.prototype["_" + d] = function (g, f)
        {
            return this.create(d, g, f)
        }
    },
    unregisterElement: function (d)
    {
        delete(this.elements[d.toLowerCase()]);
        delete(JXG.Board.prototype["_" + d.toLowerCase()])
    }
};
JXG.getReference = function (e, d)
{
    if (typeof(d) == "string")
    {
        if (e.objects[d] != null)
        {
            d = e.objects[d]
        }
        else
        {
            if (e.elementsByName[d] != null)
            {
                d = e.elementsByName[d]
            }
        }
    }
    return d
};
JXG.getRef = JXG.getReference;
JXG.isString = function (d)
{
    return typeof d == "string"
};
JXG.isNumber = function (d)
{
    return typeof d == "number"
};
JXG.isFunction = function (d)
{
    return typeof d == "function"
};
JXG.isArray = function (d)
{
    return d != null && typeof d == "object" && "splice" in d && "join" in d
};
JXG.isPoint = function (d)
{
    if (typeof d == "object")
    {
        return (d.elementClass == JXG.OBJECT_CLASS_POINT)
    }
    return false
};
JXG.exists = (function (d)
{
    return function (e)
    {
        return !(e === d || e === null)
    }
})();
JXG.str2Bool = function (d)
{
    if (!JXG.exists(d))
    {
        return true
    }
    if (typeof d == "boolean")
    {
        return d
    }
    return (d.toLowerCase() == "true")
};
JXG._board = function (e, d)
{
    return JXG.JSXGraph.initBoard(e, d)
};
JXG.createEvalFunction = function (e, j, k)
{
    var g = [],
        d, h;
    for (d = 0; d < k; d++)
    {
        if (typeof j[d] == "string")
        {
            h = JXG.GeonextParser.geonext2JS(j[d], e);
            h = h.replace(/this\.board\./g, "board.");
            g[d] = new Function("", "return " + (h) + ";")
        }
    }
    return function (i)
    {
        var f = j[i];
        if (typeof f == "string")
        {
            return g[i]()
        }
        else
        {
            if (typeof f == "function")
            {
                return f()
            }
            else
            {
                if (typeof f == "number")
                {
                    return f
                }
            }
        }
        return 0
    }
};
JXG.createFunction = function (e, f, g, h)
{
    var d;
    if ((h == null || h) && JXG.isString(e))
    {
        d = JXG.GeonextParser.geonext2JS(e, f);
        return new Function(g, "return " + d + ";")
    }
    else
    {
        if (JXG.isFunction(e))
        {
            return e
        }
        else
        {
            if (JXG.isNumber(e))
            {
                return function ()
                {
                    return e
                }
            }
            else
            {
                if (JXG.isString(e))
                {
                    return function ()
                    {
                        return e
                    }
                }
            }
        }
    }
    return null
};
JXG.checkParents = function (d, e)
{
};
JXG.readOption = function (d, f, e)
{
    var g = d.elements[e];
    if (JXG.exists(d[f][e]))
    {
        g = d[f][e]
    }
    return g
};
JXG.checkAttributes = function (d, f)
{
    var e;
    if (!JXG.exists(d))
    {
        d =
        {
        }
    }
    for (e in f)
    {
        if (!JXG.exists(d[e]))
        {
            d[e] = f[e]
        }
    }
    return d
};
JXG.getDimensions = function (i)
{
    var h, k, f, l, j, e, d, g;
    h = document.getElementById(i);
    if (!JXG.exists(h))
    {
        throw new Error("\nJSXGraph: HTML container element '" + (i) + "' not found.")
    }
    k = h.style.display;
    if (k != "none" && k != null)
    {
        return {
            width: h.offsetWidth,
            height: h.offsetHeight
        }
    }
    f = h.style;
    l = f.visibility;
    j = f.position;
    e = f.display;
    f.visibility = "hidden";
    f.position = "absolute";
    f.display = "block";
    d = h.clientWidth;
    g = h.clientHeight;
    f.display = e;
    f.position = j;
    f.visibility = l;
    return {
        width: d,
        height: g
    }
};
JXG.addEvent = function (g, f, e, d)
{
    d["x_internal" + f] = function ()
    {
        return e.apply(d, arguments)
    };
    if (JXG.exists(g.addEventListener))
    {
        g.addEventListener(f, d["x_internal" + f], false)
    }
    else
    {
        g.attachEvent("on" + f, d["x_internal" + f])
    }
};
JXG.removeEvent = function (i, g, f, d)
{
    try
    {
        if (JXG.exists(i.addEventListener))
        {
            i.removeEventListener(g, d["x_internal" + g], false)
        }
        else
        {
            i.detachEvent("on" + g, d["x_internal" + g])
        }
    }
    catch (h)
    {
        JXG.debug("JSXGraph: Can't remove event listener on" + g + ": " + d["x_internal" + g])
    }
};
JXG.bind = function (e, d)
{
    return function ()
    {
        return e.apply(d, arguments)
    }
};
JXG.getPosition = function (f)
{
    var d = 0,
        g = 0;
    if (!f)
    {
        f = window.event
    }
    if (f.pageX || f.pageY)
    {
        d = f.pageX;
        g = f.pageY
    }
    else
    {
        if (f.clientX || f.clientY)
        {
            d = f.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            g = f.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
    }
    return [d, g]
};
JXG.getOffset = function (f)
{
    var g = f,
        d = g.offsetLeft,
        e = g.offsetTop;
    while (g = g.offsetParent)
    {
        d += g.offsetLeft;
        e += g.offsetTop;
        if (g.offsetParent)
        {
            d += g.clientLeft;
            e += g.clientTop
        }
    }
    return [d, e]
};
JXG.getStyle = function (e, d)
{
    return e.style[d]
};
JXG.keys = function (d, e)
{
    var f = [],
        g;
    for (g in d)
    {
        if (e)
        {
            if (d.hasOwnProperty(g))
            {
                f.push(g)
            }
        }
        else
        {
            f.push(g)
        }
    }
    return f
};
JXG.escapeHTML = function (d)
{
    return d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
JXG.unescapeHTML = function (d)
{
    return d.replace(/<\/?[^>]+>/gi, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
};
JXG.clone = function (e)
{
    var d =
    {
    };
    d.prototype = e;
    return d
};
JXG.cloneAndCopy = function (g, f)
{
    var d =
    {
    },
        e;
    d.prototype = g;
    for (e in f)
    {
        d[e] = f[e]
    }
    return d
};
JXG.deepCopy = function (f)
{
    var h, e, g, d;
    if (typeof f !== "object" || f == null)
    {
        return f
    }
    if (this.isArray(f))
    {
        h = [];
        for (e = 0; e < f.length; e++)
        {
            g = f[e];
            if (typeof g == "object")
            {
                if (this.isArray(g))
                {
                    h[e] = [];
                    for (d = 0; d < g.length; d++)
                    {
                        if (typeof g[d] != "object")
                        {
                            h[e].push(g[d])
                        }
                        else
                        {
                            h[e].push(this.deepCopy(g[d]))
                        }
                    }
                }
                else
                {
                    h[e] = this.deepCopy(g)
                }
            }
            else
            {
                h[e] = g
            }
        }
    }
    else
    {
        h =
        {
        };
        for (e in f)
        {
            g = f[e];
            if (typeof g == "object")
            {
                if (this.isArray(g))
                {
                    h[e] = [];
                    for (d = 0; d < g.length; d++)
                    {
                        if (typeof g[d] != "object")
                        {
                            h[e].push(g[d])
                        }
                        else
                        {
                            h[e].push(this.deepCopy(g[d]))
                        }
                    }
                }
                else
                {
                    h[e] = this.deepCopy(g)
                }
            }
            else
            {
                h[e] = g
            }
        }
    }
    return h
};
JXG.toJSON = function (j)
{
    var f;
    if (window.JSON && window.JSON.stringify)
    {
        try
        {
            f = JSON.stringify(j);
            return f
        }
        catch (h)
        {
        }
    }
    switch (typeof j)
    {
    case "object":
        if (j)
        {
            var g = [];
            if (j instanceof Array)
            {
                for (var d = 0; d < j.length; d++)
                {
                    g.push(JXG.toJSON(j[d]))
                }
                return "[" + g.join(",") + "]"
            }
            else
            {
                for (var k in j)
                {
                    g.push('"' + k + '":' + JXG.toJSON(j[k]))
                }
                return "{" + g.join(",") + "}"
            }
        }
        else
        {
            return "null"
        }
    case "string":
        return '"' + j.replace(/(["'])/g, "\\$1") + '"';
    case "number":
    case "boolean":
        return new String(j)
    }
};
JXG.capitalize = function (d)
{
    return d.charAt(0).toUpperCase() + d.substring(1).toLowerCase()
};
JXG.timedChunk = function (e, g, f, h)
{
    var d = e.concat();
    setTimeout(function ()
    {
        var i = +new Date();
        do
        {
            g.call(f, d.shift())
        } while (d.length > 0 && (+new Date() - i < 300));
        if (d.length > 0)
        {
            setTimeout(arguments.callee, 1)
        }
        else
        {
            h(e)
        }
    }, 1)
};
JXG.trimNumber = function (d)
{
    d = d.replace(/^0+/, "");
    d = d.replace(/0+$/, "");
    if (d[d.length - 1] == "." || d[d.length - 1] == ",")
    {
        d = d.slice(0, -1)
    }
    if (d[0] == "." || d[0] == ",")
    {
        d = "0" + d
    }
    return d
};
JXG.trim = function (d)
{
    d = d.replace(/^w+/, "");
    d = d.replace(/w+$/, "");
    return d
};
JXG.debug = function (d)
{
    if (console && console.log)
    {
        if (typeof d === "string")
        {
            d = d.replace(/<\S[^><]*>/g, "")
        }
        console.log(d)
    }
    else
    {
        if (document.getElementById("debug"))
        {
            document.getElementById("debug").innerHTML += d + "<br/>"
        }
    }
};
JXG.addEvent(window, "load", function ()
{
    var h = document.getElementsByTagName("script"),
        n, l, k, e, m, f, q, p, g, d;
    for (l = 0; l < h.length; l++)
    {
        n = h[l].getAttribute("type", false);
        if (!JXG.exists(n))
        {
            continue
        }
        if (n.toLowerCase() === "text/jessiescript" || n.toLowerCase === "jessiescript")
        {
            f = h[l].getAttribute("width", false) || "500px";
            q = h[l].getAttribute("height", false) || "500px";
            p = h[l].getAttribute("boundingbox", false) || "-5, 5, 5, -5";
            p = p.split(",");
            if (p.length !== 4)
            {
                p = [-5, 5, 5, -5]
            }
            else
            {
                for (k = 0; k < p.length; k++)
                {
                    p[k] = parseFloat(p[k])
                }
            }
            g = JXG.str2Bool(h[l].getAttribute("axis", false) || "false");
            d = JXG.str2Bool(h[l].getAttribute("grid", false) || "false");
            e = document.createElement("div");
            e.setAttribute("id", "jessiescript_autgen_jxg_" + l);
            e.setAttribute("style", "width:" + f + "; height:" + q + "; float:left");
            e.setAttribute("class", "jxgbox");
            document.body.insertBefore(e, h[l]);
            m = JXG.JSXGraph.initBoard("jessiescript_autgen_jxg_" + l, {
                boundingbox: p,
                keepaspectratio: true,
                grid: d,
                axis: g
            });
            m.construct(h[l].innerHTML)
        }
    }
}, window);
JXG.OBJECT_TYPE_ARC = 1330921795;
JXG.OBJECT_TYPE_ARROW = 1330921815;
JXG.OBJECT_TYPE_AXIS = 1330921816;
JXG.OBJECT_TYPE_TICKS = 1330926680;
JXG.OBJECT_TYPE_CIRCLE = 1330922316;
JXG.OBJECT_TYPE_CONIC = 1330922319;
JXG.OBJECT_TYPE_CURVE = 1330923344;
JXG.OBJECT_TYPE_GLIDER = 1330923340;
JXG.OBJECT_TYPE_IMAGE = 1330926157;
JXG.OBJECT_TYPE_LINE = 1330924622;
JXG.OBJECT_TYPE_POINT = 1330925652;
JXG.OBJECT_TYPE_SLIDER = 1330926404;
JXG.OBJECT_TYPE_CAS = 1330922320;
JXG.OBJECT_TYPE_POLYGON = 1330925657;
JXG.OBJECT_TYPE_SECTOR = 1330926403;
JXG.OBJECT_TYPE_TEXT = 1330926661;
JXG.OBJECT_TYPE_ANGLE = 1330921799;
JXG.OBJECT_TYPE_INTERSECTION = 1330926158;
JXG.OBJECT_TYPE_TURTLE = 5198933;
JXG.OBJECT_TYPE_VECTOR = 1330927188;
JXG.OBJECT_CLASS_POINT = 1;
JXG.OBJECT_CLASS_LINE = 2;
JXG.OBJECT_CLASS_CIRCLE = 3;
JXG.OBJECT_CLASS_CURVE = 4;
JXG.OBJECT_CLASS_AREA = 5;
JXG.OBJECT_CLASS_OTHER = 6;
JXG.GeometryElement = function ()
{
    this.board = null;
    this.id = "";
    this.needsUpdate = true;
    this.name = "";
    this.visProp =
    {
    };
    JXG.clearVisPropOld(this);
    this.isReal = true;
    this.visProp.dash = 0;
    this.childElements =
    {
    };
    this.hasLabel = false;
    this.layer = 9;
    this.notExistingParents =
    {
    };
    this.traced = false;
    this.fixed = false;
    this.frozen = false;
    this.traces =
    {
    };
    this.numTraces = 0;
    this.transformations = [];
    this.baseElement = null;
    this.descendants =
    {
    };
    this.ancestors =
    {
    };
    this.symbolic =
    {
    };
    this.stdform = [1, 0, 0, 0, 1, 1, 0, 0];
    this.quadraticform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.needsRegularUpdate = true
};
JXG.GeometryElement.prototype.init = function (e, f, d)
{
    this.board = e;
    this.id = f;
    if (!JXG.exists(d))
    {
        d = this.board.generateName(this)
    }
    this.board.elementsByName[d] = this;
    this.name = d;
    this.visProp.strokeColor = this.board.options.elements.strokeColor;
    this.visProp.highlightStrokeColor = this.board.options.elements.highlightStrokeColor;
    this.visProp.fillColor = this.board.options.elements.fillColor;
    this.visProp.highlightFillColor = this.board.options.elements.highlightFillColor;
    this.visProp.strokeWidth = this.board.options.elements.strokeWidth;
    this.visProp.highlightStrokeWidth = this.visProp.strokeWidth;
    this.visProp.strokeOpacity = this.board.options.elements.strokeOpacity;
    this.visProp.highlightStrokeOpacity = this.board.options.elements.highlightStrokeOpacity;
    this.visProp.fillOpacity = this.board.options.elements.fillOpacity;
    this.visProp.highlightFillOpacity = this.board.options.elements.highlightFillOpacity;
    this.visProp.draft = this.board.options.elements.draft.draft;
    this.visProp.visible = true;
    this.visProp.shadow = false;
    this.visProp.gradient = "none";
    this.visProp.gradientSecondColor = "black";
    this.visProp.gradientAngle = "270";
    this.visProp.gradientSecondOpacity = this.visProp.fillOpacity;
    this.visProp.gradientPositionX = 0.5;
    this.visProp.gradientPositionY = 0.5
};
JXG.GeometryElement.prototype.addChild = function (f)
{
    var e, d;
    this.childElements[f.id] = f;
    this.addDescendants(f);
    f.ancestors[this.id] = this;
    for (e in this.descendants)
    {
        this.descendants[e].ancestors[this.id] = this;
        for (d in this.ancestors)
        {
            this.descendants[e].ancestors[this.ancestors[d].id] = this.ancestors[d]
        }
    }
    for (e in this.ancestors)
    {
        for (d in this.descendants)
        {
            this.ancestors[e].descendants[this.descendants[d].id] = this.descendants[d]
        }
    }
    return this
};
JXG.GeometryElement.prototype.addDescendants = function (e)
{
    var d;
    this.descendants[e.id] = e;
    for (d in e.childElements)
    {
        this.addDescendants(e.childElements[d])
    }
    return this
};
JXG.GeometryElement.prototype.generatePolynomial = function ()
{
    return []
};
JXG.GeometryElement.prototype.animate = function (g, f)
{
    var d, e, j = 35,
        k = Math.ceil(f / (j * 1)),
        h, m = this;
    this.animationData =
    {
    };
    var n = function (v, u, s)
    {
        var t, r, q, p, i;
        t = JXG.rgb2hsv(v);
        r = JXG.rgb2hsv(u);
        q = (r[0] - t[0]) / (1 * k);
        p = (r[1] - t[1]) / (1 * k);
        i = (r[2] - t[2]) / (1 * k);
        m.animationData[s] = new Array(k);
        for (h = 0; h < k; h++)
        {
            m.animationData[s][k - h - 1] = JXG.hsv2rgb(t[0] + (h + 1) * q, t[1] + (h + 1) * p, t[2] + (h + 1) * i)
        }
    },
        l = function (r, i, q)
        {
            r = parseFloat(r);
            i = parseFloat(i);
            if (isNaN(r) || isNaN(i))
            {
                return
            }
            var p = (i - r) / (1 * k);
            m.animationData[q] = new Array(k);
            for (h = 0; h < k; h++)
            {
                m.animationData[q][k - h - 1] = r + (h + 1) * p
            }
        };
    for (d in g)
    {
        e = d.toLowerCase();
        switch (e)
        {
        case "strokecolor":
            n(this.visProp.strokeColor, g[d], "strokeColor");
            break;
        case "strokeopacity":
            l(this.visProp.strokeOpacity, g[d], "strokeOpacity");
            break;
        case "strokewidth":
            l(this.visProp.strokeWidth, g[d], "strokeWidth");
            break;
        case "fillcolor":
            n(this.visProp.fillColor, g[d], "fillColor");
            break;
        case "fillopacity":
            l(this.visProp.fillOpacity, g[d], "fillOpacity");
            break
        }
    }
    this.board.addAnimation(this);
    return this
};
JXG.GeometryElement.prototype.update = function ()
{
    if (this.traced)
    {
        this.cloneToBackground(true)
    }
    return this
};
JXG.GeometryElement.prototype.updateRenderer = function ()
{
};
JXG.GeometryElement.prototype.hideElement = function ()
{
    this.visProp.visible = false;
    this.board.renderer.hide(this);
    if (this.label != null && this.hasLabel)
    {
        this.label.hiddenByParent = true;
        if (this.label.content.visProp.visible)
        {
            this.board.renderer.hide(this.label.content)
        }
    }
    return this
};
JXG.GeometryElement.prototype.showElement = function ()
{
    this.visProp.visible = true;
    this.board.renderer.show(this);
    if (this.label != null && this.hasLabel && this.label.hiddenByParent)
    {
        this.label.hiddenByParent = false;
        if (this.label.content.visProp.visible)
        {
            this.board.renderer.show(this.label.content)
        }
    }
    return this
};
JXG.GeometryElement.prototype.setProperty = function ()
{
    var j, h, f, e, g, k;
    for (j = 0; j < arguments.length; j++)
    {
        e = arguments[j];
        if (typeof e == "string")
        {
            k = e.split(":");
            k[0] = k[0].replace(/^\s+/, "").replace(/\s+$/, "");
            k[1] = k[1].replace(/^\s+/, "").replace(/\s+$/, "")
        }
        else
        {
            if (!JXG.isArray(e))
            {
                for (h in e)
                {
                    this.setProperty([h, e[h]])
                }
                return this
            }
            else
            {
                k = e
            }
        }
        if (k[1] == null)
        {
            continue
        }
        switch (k[0].replace(/\s+/g).toLowerCase())
        {
        case "needsregularupdate":
            this.needsRegularUpdate = !(k[1] == "false" || k[1] == false);
            this.board.renderer.setBuffering(this, this.needsRegularUpdate ? "auto" : "static");
            break;
        case "color":
            this.setProperty(
            {
                strokeColor: k[1],
                fillColor: k[1]
            });
            break;
        case "opacity":
            this.setProperty(
            {
                strokeOpacity: k[1],
                fillOpacity: k[1]
            });
            break;
        case "strokewidth":
            this.visProp.strokeWidth = k[1];
            this.visProp.highlightStrokeWidth = k[1];
            this.board.renderer.setObjectStrokeWidth(this, this.visProp.strokeWidth);
            break;
        case "strokecolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            this.visProp.strokeColor = f;
            this.visProp.strokeOpacity = parseInt(g.toUpperCase(), 16) / 255;
            this.board.renderer.setObjectStrokeColor(this, this.visProp.strokeColor, this.visProp.strokeOpacity);
            break;
        case "fillcolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            this.visProp.fillColor = f;
            this.visProp.fillOpacity = parseInt(g.toUpperCase(), 16) / 255;
            this.board.renderer.setObjectFillColor(this, this.visProp.fillColor, this.visProp.fillOpacity);
            break;
        case "highlightstrokewidth":
            this.visProp.highlightStrokeWidth = k[1];
            break;
        case "highlightstrokecolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            this.visProp.highlightStrokeColor = f;
            this.visProp.highlightStrokeOpacity = parseInt(g.toUpperCase(), 16) / 255;
            break;
        case "highlightfillcolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            this.visProp.highlightFillColor = f;
            this.visProp.highlightFillOpacity = parseInt(g.toUpperCase(), 16) / 255;
            break;
        case "fillopacity":
            this.visProp.fillOpacity = k[1];
            this.board.renderer.setObjectFillColor(this, this.visProp.fillColor, this.visProp.fillOpacity);
            break;
        case "strokeopacity":
            this.visProp.strokeOpacity = k[1];
            this.board.renderer.setObjectStrokeColor(this, this.visProp.strokeColor, this.visProp.strokeOpacity);
            break;
        case "highlightfillopacity":
            this.visProp.highlightFillOpacity = k[1];
            break;
        case "highlightstrokeopacity":
            this.visProp.highlightStrokeOpacity = k[1];
            break;
        case "labelcolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            if (g == "00")
            {
                if (this.label != null && this.hasLabel)
                {
                    this.label.content.hideElement()
                }
            }
            if (this.label != null && this.hasLabel)
            {
                this.label.color = f;
                this.board.renderer.setObjectStrokeColor(this.label.content, f, g)
            }
            if (this.type == JXG.OBJECT_TYPE_TEXT)
            {
                this.visProp.strokeColor = f;
                this.board.renderer.setObjectStrokeColor(this, this.visProp.strokeColor, 1)
            }
            break;
        case "infoboxtext":
            if (typeof(k[1]) == "string")
            {
                this.infoboxText = k[1]
            }
            else
            {
                this.infoboxText = false
            }
            break;
        case "showinfobox":
            if (k[1] == "false" || k[1] == false)
            {
                this.showInfobox = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.showInfobox = true
                }
            }
            break;
        case "visible":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.visible = false;
                this.hideElement()
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.visible = true;
                    this.showElement()
                }
            }
            break;
        case "dash":
            this.setDash(k[1]);
            break;
        case "trace":
            if (k[1] == "false" || k[1] == false)
            {
                this.traced = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.traced = true
                }
            }
            break;
        case "style":
            this.setStyle(1 * k[1]);
            break;
        case "face":
            if (this.elementClass == JXG.OBJECT_CLASS_POINT)
            {
                this.setFace(k[1])
            }
            break;
        case "size":
            if (this.elementClass == JXG.OBJECT_CLASS_POINT)
            {
                this.visProp.size = 1 * k[1];
                this.board.renderer.updatePoint(this)
            }
            break;
        case "fixed":
            this.fixed = ((k[1] == "false") || (k[1] == false)) ? false : true;
            break;
        case "frozen":
            this.frozen = ((k[1] == "false") || (k[1] == false)) ? false : true;
            break;
        case "shadow":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.shadow = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.shadow = true
                }
            }
            this.board.renderer.setShadow(this);
            break;
        case "gradient":
            this.visProp.gradient = k[1];
            this.board.renderer.setGradient(this);
            break;
        case "gradientsecondcolor":
            f = k[1];
            if (f.length == "9" && f.substr(0, 1) == "#")
            {
                g = f.substr(7, 2);
                f = f.substr(0, 7)
            }
            else
            {
                g = "FF"
            }
            this.visProp.gradientSecondColor = f;
            this.visProp.gradientSecondOpacity = parseInt(g.toUpperCase(), 16) / 255;
            this.board.renderer.updateGradient(this);
            break;
        case "gradientsecondopacity":
            this.visProp.gradientSecondOpacity = k[1];
            this.board.renderer.updateGradient(this);
            break;
        case "draft":
            if (k[1] == "false" || k[1] == false)
            {
                if (this.visProp.draft == true)
                {
                    this.visProp.draft = false;
                    this.board.renderer.removeDraft(this)
                }
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.draft = true;
                    this.board.renderer.setDraft(this)
                }
            }
            break;
        case "straightfirst":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.straightFirst = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.straightFirst = true
                }
            }
            this.setStraight(this.visProp.straightFirst, this.visProp.straightLast);
            break;
        case "straightlast":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.straightLast = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.straightLast = true
                }
            }
            this.setStraight(this.visProp.straightFirst, this.visProp.straightLast);
            break;
        case "firstarrow":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.firstArrow = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.firstArrow = true
                }
            }
            this.setArrow(this.visProp.firstArrow, this.visProp.lastArrow);
            break;
        case "lastarrow":
            if (k[1] == "false" || k[1] == false)
            {
                this.visProp.lastArrow = false
            }
            else
            {
                if (k[1] == "true" || k[1] == true)
                {
                    this.visProp.lastArrow = true
                }
            }
            this.setArrow(this.visProp.firstArrow, this.visProp.lastArrow);
            break;
        case "curvetype":
            this.curveType = k[1];
            break;
        case "fontsize":
            this.visProp.fontSize = k[1];
            break;
        case "insertticks":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.insertTicks;
                this.insertTicks = !(k[1] == "false" || k[1] == false);
                if (d != this.insertTicks)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "drawlabels":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.drawLabels;
                this.drawLabels = !(k[1] == "false" || k[1] == false);
                if (d != this.drawLabels)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "drawzero":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.drawZero;
                this.drawZero = !(k[1] == "false" || k[1] == false);
                if (d != this.drawZero)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "minorticks":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.minorTicks;
                if ((k[1] != null) && (k[1] > 0))
                {
                    this.minorTicks = k[1]
                }
                if (d != this.minorTicks)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "majortickheight":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.majorHeight;
                if ((k[1] != null) && (k[1] > 0))
                {
                    this.majorHeight = k[1]
                }
                if (d != this.majorHeight)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "minortickheight":
            if (this.type == JXG.OBJECT_TYPE_TICKS)
            {
                var d = this.minorHeight;
                if ((k[1] != null) && (k[1] > 0))
                {
                    this.minorHeight = k[1]
                }
                if (d != this.minorHeight)
                {
                    this.prepareUpdate().update().updateRenderer()
                }
            }
            break;
        case "snapwidth":
            if (this.type == JXG.OBJECT_TYPE_GLIDER)
            {
                this.snapWidth = k[1]
            }
            break;
        case "withlabel":
            if (!k[1])
            {
                if (this.label != null && this.hasLabel)
                {
                    this.label.content.hideElement()
                }
            }
            else
            {
                if (this.label != null && this.hasLabel)
                {
                    if (this.visProp.visible)
                    {
                        this.label.content.showElement()
                    }
                }
                else
                {
                    this.addLabelToElement();
                    if (!this.visProp.visible)
                    {
                        this.label.content.hideElement()
                    }
                }
            }
            this.hasLabel = k[1]
        }
    }
    this.board.update(this);
    return this
};
JXG.GeometryElement.prototype.setDash = function (d)
{
    this.visProp.dash = d;
    this.board.renderer.setDashStyle(this, this.visProp);
    return this
};
JXG.GeometryElement.prototype.prepareUpdate = function ()
{
    this.needsUpdate = true;
    return this
};
JXG.GeometryElement.prototype.remove = function ()
{
    this.board.renderer.remove(this.board.renderer.getElementById(this.id));
    if (this.hasLabel)
    {
        this.board.renderer.remove(this.board.renderer.getElementById(this.label.content.id))
    }
    return this
};
JXG.GeometryElement.prototype.getTextAnchor = function ()
{
    return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
};
JXG.GeometryElement.prototype.getLabelAnchor = function ()
{
    return new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
};
JXG.GeometryElement.prototype.setStyle = function (d)
{
    return this
};
JXG.GeometryElement.prototype.setStraight = function (d, e)
{
    return this
};
JXG.GeometryElement.prototype.setArrow = function (e, d)
{
    this.visProp.firstArrow = e;
    this.visProp.lastArrow = d;
    this.prepareUpdate().update();
    return this
};
JXG.GeometryElement.prototype.createLabel = function (e, f)
{
    var d = false;
    if (!JXG.exists(f))
    {
        f = [10, 10]
    }
    this.nameHTML = JXG.GeonextParser.replaceSup(JXG.GeonextParser.replaceSub(this.name));
    this.label =
    {
    };
    if (typeof e == "undefined" || e == true)
    {
        if (this.board.objects[this.id] == null)
        {
            this.board.objects[this.id] = this;
            d = true
        }
        this.label.relativeCoords = f;
        this.label.content = new JXG.Text(this.board, this.nameHTML, this.id, [this.label.relativeCoords[0], -this.label.relativeCoords[1]], this.id + "Label", "", null, true, this.board.options.text.defaultDisplay);
        if (d)
        {
            delete(this.board.objects[this.id])
        }
        this.label.color = "#000000";
        if (!this.visProp.visible)
        {
            this.label.hiddenByParent = true;
            this.label.content.visProp.visible = false
        }
        this.hasLabel = true
    }
    return this
};
JXG.GeometryElement.prototype.addLabelToElement = function ()
{
    this.createLabel(true);
    this.label.content.id = this.id + "Label";
    this.board.setId(this.label.content, "T");
    this.board.renderer.drawText(this.label.content);
    if (!this.label.content.visProp.visible)
    {
        this.board.renderer.hide(this.label.content)
    }
    return this
};
JXG.GeometryElement.prototype.highlight = function ()
{
    this.board.renderer.highlight(this);
    return this
};
JXG.GeometryElement.prototype.noHighlight = function ()
{
    this.board.renderer.noHighlight(this);
    return this
};
JXG.GeometryElement.prototype.clearTrace = function ()
{
    var d;
    for (d in this.traces)
    {
        this.board.renderer.remove(this.traces[d])
    }
    this.numTraces = 0;
    return this
};
JXG.GeometryElement.prototype.cloneToBackground = function (d)
{
    return this
};
JXG.GeometryElement.prototype.normalize = function ()
{
    this.stdform = JXG.Math.normalize(this.stdform);
    return this
};
JXG.GeometryElement.prototype.toJSON = function ()
{
    var e = '{"name":' + this.name;
    e += ', "id":' + this.id;
    var f = [];
    for (var d in this.visProp)
    {
        if (this.visProp[d] != null)
        {
            f.push('"' + d + '":' + this.visProp[d])
        }
    }
    e += ', "visProp":{' + f.toString() + "}";
    e += "}";
    return e
};
JXG.GeometryElement.prototype.highlightStrokeColor = function (d)
{
    this.setProperty(
    {
        highlightStrokeColor: d
    })
};
JXG.GeometryElement.prototype.strokeColor = function (d)
{
    this.setProperty(
    {
        strokeColor: d
    })
};
JXG.GeometryElement.prototype.strokeWidth = function (d)
{
    this.setProperty(
    {
        strokeWidth: d
    })
};
JXG.GeometryElement.prototype.fillColor = function (d)
{
    this.setProperty(
    {
        fillColor: d
    })
};
JXG.GeometryElement.prototype.highlightFillColor = function (d)
{
    this.setProperty(
    {
        highlightFillColor: d
    })
};
JXG.GeometryElement.prototype.labelColor = function (d)
{
    this.setProperty(
    {
        labelColor: d
    })
};
JXG.GeometryElement.prototype.dash = function (e)
{
    this.setProperty(
    {
        dash: e
    })
};
JXG.GeometryElement.prototype.visible = function (d)
{
    this.setProperty(
    {
        visible: d
    })
};
JXG.GeometryElement.prototype.shadow = function (d)
{
    this.setProperty(
    {
        shadow: d
    })
};
JXG.clearVisPropOld = function (d)
{
    d.visPropOld =
    {
    };
    d.visPropOld.strokeColor = "";
    d.visPropOld.strokeOpacity = "";
    d.visPropOld.strokeWidth = "";
    d.visPropOld.fillColor = "";
    d.visPropOld.fillOpacity = "";
    d.visPropOld.shadow = false;
    d.visPropOld.firstArrow = false;
    d.visPropOld.lastArrow = false
};
JXG.COORDS_BY_USER = 1;
JXG.COORDS_BY_SCREEN = 2;
JXG.Coords = function (f, e, d)
{
    this.board = d;
    this.usrCoords = [];
    this.scrCoords = [];
    if (f == JXG.COORDS_BY_USER)
    {
        if (e.length <= 2)
        {
            this.usrCoords[0] = 1;
            this.usrCoords[1] = e[0];
            this.usrCoords[2] = e[1]
        }
        else
        {
            this.usrCoords[0] = e[0];
            this.usrCoords[1] = e[1];
            this.usrCoords[2] = e[2];
            this.normalizeUsrCoords()
        }
        this.usr2screen()
    }
    else
    {
        this.scrCoords[0] = 1;
        this.scrCoords[1] = e[0];
        this.scrCoords[2] = e[1];
        this.screen2usr()
    }
};
JXG.Coords.prototype.normalizeUsrCoords = function ()
{
    var d = 0.000001;
    if (Math.abs(this.usrCoords[0]) > d)
    {
        this.usrCoords[1] /= this.usrCoords[0];
        this.usrCoords[2] /= this.usrCoords[0];
        this.usrCoords[0] = 1
    }
};
JXG.Coords.prototype.usr2screen = function (h)
{
    var g = Math.round,
        d = this.board,
        f = this.usrCoords,
        e = d.origin.scrCoords;
    if (h == null || h)
    {
        this.scrCoords[0] = g(f[0]);
        this.scrCoords[1] = g(f[0] * e[1] + f[1] * d.stretchX);
        this.scrCoords[2] = g(f[0] * e[2] - f[2] * d.stretchY)
    }
    else
    {
        this.scrCoords[0] = f[0];
        this.scrCoords[1] = f[0] * e[1] + f[1] * d.stretchX;
        this.scrCoords[2] = f[0] * e[2] - f[2] * d.stretchY
    }
};
JXG.Coords.prototype.screen2usr = function ()
{
    var f = this.board.origin.scrCoords,
        e = this.scrCoords,
        d = this.board;
    this.usrCoords[0] = 1;
    this.usrCoords[1] = (e[1] - f[1]) / d.stretchX;
    this.usrCoords[2] = (f[2] - e[2]) / d.stretchY
};
JXG.Coords.prototype.distance = function (e, h)
{
    var g = 0,
        k, d = this.usrCoords,
        j = this.scrCoords,
        i;
    if (e == JXG.COORDS_BY_USER)
    {
        k = h.usrCoords;
        i = d[0] - k[0];
        g = i * i;
        i = d[1] - k[1];
        g += i * i;
        i = d[2] - k[2];
        g += i * i
    }
    else
    {
        k = h.scrCoords;
        i = j[0] - k[0];
        g = i * i;
        i = j[1] - k[1];
        g += i * i;
        i = j[2] - k[2];
        g += i * i
    }
    return Math.sqrt(g)
};
JXG.Coords.prototype.setCoordinates = function (h, f, e)
{
    var d = this.usrCoords,
        g = this.scrCoords;
    if (h == JXG.COORDS_BY_USER)
    {
        if (f.length == 2)
        {
            d[0] = 1;
            d[1] = f[0];
            d[2] = f[1]
        }
        else
        {
            d[0] = f[0];
            d[1] = f[1];
            d[2] = f[2];
            this.normalizeUsrCoords()
        }
        this.usr2screen(e)
    }
    else
    {
        g[1] = f[0];
        g[2] = f[1];
        this.screen2usr()
    }
};
JXG.POINT_STYLE_X_SMALL = 0;
JXG.POINT_STYLE_X = 1;
JXG.POINT_STYLE_X_BIG = 2;
JXG.POINT_STYLE_CIRCLE_TINY = 3;
JXG.POINT_STYLE_CIRCLE_SMALL = 4;
JXG.POINT_STYLE_CIRCLE = 5;
JXG.POINT_STYLE_CIRCLE_BIG = 6;
JXG.POINT_STYLE_SQUARE_SMALL = 7;
JXG.POINT_STYLE_SQUARE = 8;
JXG.POINT_STYLE_SQUARE_BIG = 9;
JXG.POINT_STYLE_PLUS_SMALL = 10;
JXG.POINT_STYLE_PLUS = 11;
JXG.POINT_STYLE_PLUS_BIG = 12;
JXG.Point = function (h, i, j, e, d, g, f)
{
    this.constructor();
    this.type = JXG.OBJECT_TYPE_POINT;
    this.elementClass = JXG.OBJECT_CLASS_POINT;
    this.init(h, j, e);
    if (i == null)
    {
        i = [0, 0]
    }
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, i, this.board);
    this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, i, this.board);
    if (f == null)
    {
        f = h.options.layer.point
    }
    this.layer = f;
    this.showInfobox = JXG.Options.point.showInfobox;
    this.label =
    {
    };
    this.label.relativeCoords = [10, -10];
    this.nameHTML = JXG.GeonextParser.replaceSup(JXG.GeonextParser.replaceSub(this.name));
    if (typeof g == "undefined" || g == true)
    {
        this.board.objects[this.id] = this;
        this.label.content = new JXG.Text(this.board, this.nameHTML, this.id, this.label.relativeCoords, this.id + "Label", "", null, true, this.board.options.text.defaultDisplay);
        delete(this.board.objects[this.id]);
        this.label.color = "#000000";
        if (!d)
        {
            this.label.hiddenByParent = true;
            this.label.content.visProp.visible = false
        }
        this.hasLabel = true
    }
    else
    {
        this.showInfobox = false
    }
    this.fixed = false;
    this.position = null;
    this.onPolygon = false;
    this.visProp.style = this.board.options.point.style;
    this.visProp.face = this.board.options.point.face;
    this.visProp.size = this.board.options.point.size;
    this.visProp.fillColor = this.board.options.point.fillColor;
    this.visProp.highlightFillColor = this.board.options.point.highlightFillColor;
    this.visProp.strokeColor = this.board.options.point.strokeColor;
    this.visProp.highlightStrokeColor = this.board.options.point.highlightStrokeColor;
    this.visProp.strokeWidth = this.board.options.point.strokeWidth;
    this.visProp.visible = d;
    this.slideObject = null;
    this.group = [];
    this.id = this.board.setId(this, "P");
    this.board.renderer.drawPoint(this);
    this.board.finalizeAdding(this)
};
JXG.Point.prototype = new JXG.GeometryElement();
JXG.Point.prototype.hasPoint = function (e, g)
{
    var d = this.coords.scrCoords,
        f;
    f = this.visProp.size;
    if (f < this.board.options.precision.hasPoint)
    {
        f = this.board.options.precision.hasPoint
    }
    return ((Math.abs(d[1] - e) < f + 2) && (Math.abs(d[2] - g)) < f + 2)
};
JXG.Point.prototype.updateConstraint = function ()
{
    return this
};
JXG.Point.prototype.update = function (h)
{
    if (!this.needsUpdate)
    {
        return
    }
    if (typeof h == "undefined")
    {
        h = false
    }
    if (this.traced)
    {
        this.cloneToBackground(true)
    }
    if (this.type == JXG.OBJECT_TYPE_GLIDER)
    {
        if (this.slideObject.type == JXG.OBJECT_TYPE_CIRCLE)
        {
            if (h)
            {
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.slideObject.midpoint.X() + Math.cos(this.position), this.slideObject.midpoint.Y() + Math.sin(this.position)]);
                this.coords = JXG.Math.Geometry.projectPointToCircle(this, this.slideObject, this.board)
            }
            else
            {
                this.coords = JXG.Math.Geometry.projectPointToCircle(this, this.slideObject, this.board);
                this.position = JXG.Math.Geometry.rad([this.slideObject.midpoint.X() + 1, this.slideObject.midpoint.Y()], this.slideObject.midpoint, this)
            }
        }
        else
        {
            if (this.slideObject.type == JXG.OBJECT_TYPE_LINE)
            {
                this.coords = JXG.Math.Geometry.projectPointToLine(this, this.slideObject, this.board);
                var g = this.slideObject.point1.coords;
                var l = this.slideObject.point2.coords;
                if (h)
                {
                    if (Math.abs(g.usrCoords[0]) >= JXG.Math.eps && Math.abs(l.usrCoords[0]) >= JXG.Math.eps)
                    {
                        this.coords.setCoordinates(JXG.COORDS_BY_USER, [g.usrCoords[1] + this.position * (l.usrCoords[1] - g.usrCoords[1]), g.usrCoords[2] + this.position * (l.usrCoords[2] - g.usrCoords[2])])
                    }
                }
                else
                {
                    var m = 1;
                    var r = g.distance(JXG.COORDS_BY_USER, this.coords);
                    var e = g.distance(JXG.COORDS_BY_USER, l);
                    var k = l.distance(JXG.COORDS_BY_USER, this.coords);
                    if (((r > e) || (k > e)) && (r < k))
                    {
                        m = -1
                    }
                    this.position = m * r / e;
                    if (this.snapWidth != null && Math.abs(this._smax - this._smin) >= JXG.Math.eps)
                    {
                        if (this.position < 0)
                        {
                            this.position = 0
                        }
                        if (this.position > 1)
                        {
                            this.position = 1
                        }
                        var s = this.position * (this._smax - this._smin) + this._smin;
                        s = Math.round(s / this.snapWidth) * this.snapWidth;
                        this.position = (s - this._smin) / (this._smax - this._smin);
                        this.update(true)
                    }
                }
                var f = this.slideObject.point1.coords.scrCoords;
                var q = this.slideObject.point2.coords.scrCoords;
                var j;
                if (this.slideObject.getSlope() == 0)
                {
                    j = 1
                }
                else
                {
                    j = 2
                }
                var n = this.coords.scrCoords[j];
                if (!this.slideObject.visProp.straightFirst)
                {
                    if (f[j] < q[j])
                    {
                        if (n < f[j])
                        {
                            this.coords = this.slideObject.point1.coords;
                            this.position = 0
                        }
                    }
                    else
                    {
                        if (f[j] > q[j])
                        {
                            if (n > f[j])
                            {
                                this.coords = this.slideObject.point1.coords;
                                this.position = 0
                            }
                        }
                    }
                }
                if (!this.slideObject.visProp.straightLast)
                {
                    if (f[j] < q[j])
                    {
                        if (n > q[j])
                        {
                            this.coords = this.slideObject.point2.coords;
                            this.position = 1
                        }
                    }
                    else
                    {
                        if (f[j] > q[j])
                        {
                            if (n < q[j])
                            {
                                this.coords = this.slideObject.point2.coords;
                                this.position = 1
                            }
                        }
                    }
                }
                if (this.onPolygon)
                {
                    var t = this.slideObject.point1.coords;
                    var p = this.slideObject.point2.coords;
                    if (Math.abs(this.coords.scrCoords[1] - t.scrCoords[1]) < this.board.options.precision.hasPoint && Math.abs(this.coords.scrCoords[2] - t.scrCoords[2]) < this.board.options.precision.hasPoint)
                    {
                        var d = this.slideObject.parentPolygon;
                        for (var j = 0; j < d.borders.length; j++)
                        {
                            if (this.slideObject == d.borders[j])
                            {
                                this.slideObject = d.borders[(j - 1 + d.borders.length) % d.borders.length];
                                break
                            }
                        }
                    }
                    else
                    {
                        if (Math.abs(this.coords.scrCoords[1] - p.scrCoords[1]) < this.board.options.precision.hasPoint && Math.abs(this.coords.scrCoords[2] - p.scrCoords[2]) < this.board.options.precision.hasPoint)
                        {
                            var d = this.slideObject.parentPolygon;
                            for (var j = 0; j < d.borders.length; j++)
                            {
                                if (this.slideObject == d.borders[j])
                                {
                                    this.slideObject = d.borders[(j + 1 + d.borders.length) % d.borders.length];
                                    break
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if (this.slideObject.type == JXG.OBJECT_TYPE_TURTLE)
                {
                    this.updateConstraint();
                    this.coords = JXG.Math.Geometry.projectPointToTurtle(this, this.slideObject, this.board)
                }
                else
                {
                    if (this.slideObject.elementClass == JXG.OBJECT_CLASS_CURVE)
                    {
                        this.updateConstraint();
                        this.coords = JXG.Math.Geometry.projectPointToCurve(this, this.slideObject, this.board)
                    }
                }
            }
        }
    }
    if (this.type == JXG.OBJECT_TYPE_CAS)
    {
        this.updateConstraint()
    }
    this.updateTransform();
    this.needsUpdate = false;
    return this
};
JXG.Point.prototype.updateRenderer = function ()
{
    if (this.visProp.visible)
    {
        var d = this.isReal;
        this.isReal = (isNaN(this.coords.usrCoords[1] + this.coords.usrCoords[2])) ? false : true;
        this.isReal = (Math.abs(this.coords.usrCoords[0]) > JXG.Math.eps) ? this.isReal : false;
        if (this.isReal)
        {
            if (d != this.isReal)
            {
                this.board.renderer.show(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.show(this.label.content)
                }
            }
            this.board.renderer.updatePoint(this)
        }
        else
        {
            if (d != this.isReal)
            {
                this.board.renderer.hide(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.hide(this.label.content)
                }
            }
        }
    }
    if (this.hasLabel && this.label.content.visProp.visible && this.isReal)
    {
        this.label.content.update();
        this.board.renderer.updateText(this.label.content)
    }
    return this
};
JXG.Point.prototype.X = function ()
{
    return this.coords.usrCoords[1]
};
JXG.Point.prototype.Y = function ()
{
    return this.coords.usrCoords[2]
};
JXG.Point.prototype.Z = function ()
{
    return this.coords.usrCoords[0]
};
JXG.Point.prototype.XEval = function ()
{
    return this.coords.usrCoords[1]
};
JXG.Point.prototype.YEval = function ()
{
    return this.coords.usrCoords[2]
};
JXG.Point.prototype.ZEval = function ()
{
    return this.coords.usrCoords[0]
};
JXG.Point.prototype.Dist = function (e)
{
    var g, i = e.coords.usrCoords,
        d = this.coords.usrCoords,
        h;
    h = d[0] - i[0];
    g = h * h;
    h = d[1] - i[1];
    g += h * h;
    h = d[2] - i[2];
    g += h * h;
    return Math.sqrt(g)
};
JXG.Point.prototype.setPositionDirectly = function (d, k, h)
{
    var g, m, l, f, e, j = this.coords;
    this.coords = new JXG.Coords(d, [k, h], this.board);
    if (this.group.length != 0)
    {
        m = this.coords.usrCoords[1] - j.usrCoords[1];
        l = this.coords.usrCoords[2] - j.usrCoords[2];
        for (g = 0; g < this.group.length; g++)
        {
            for (f in this.group[g].objects)
            {
                e = this.group[g].objects[f];
                e.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, [e.initialCoords.usrCoords[1] + m, e.initialCoords.usrCoords[2] + l], this.board)
            }
        }
        this.group[this.group.length - 1].dX = this.coords.scrCoords[1] - j.scrCoords[1];
        this.group[this.group.length - 1].dY = this.coords.scrCoords[2] - j.scrCoords[2];
        this.group[this.group.length - 1].update(this)
    }
    else
    {
        for (g = this.transformations.length - 1; g >= 0; g--)
        {
            this.initialCoords = new JXG.Coords(d, JXG.Math.matVecMult(JXG.Math.inverse(this.transformations[g].matrix), [1, k, h]), this.board)
        }
        this.update()
    }
    return this
};
JXG.Point.prototype.setPositionByTransform = function (h, d, g)
{
    var f = this.coords;
    var e = this.board.create("transform", [d, g], {
        type: "translate"
    });
    if (this.transformations.length > 0 && this.transformations[this.transformations.length - 1].isNumericMatrix)
    {
        this.transformations[this.transformations.length - 1].melt(e)
    }
    else
    {
        this.addTransform(this, e)
    }
    if (this.group.length != 0)
    {
    }
    else
    {
        this.update()
    }
    return this
};
JXG.Point.prototype.setPosition = function (f, d, e)
{
    this.setPositionDirectly(f, d, e);
    return this
};
JXG.Point.prototype.makeGlider = function (d)
{
    this.slideObject = JXG.getReference(this.board, d);
    this.type = JXG.OBJECT_TYPE_GLIDER;
    this.snapWidth = null;
    this.slideObject.addChild(this);
    this.generatePolynomial = function ()
    {
        return this.slideObject.generatePolynomial(this)
    };
    this.needsUpdate = true;
    this.update();
    return this
};
JXG.Point.prototype.addConstraint = function (h)
{
    this.type = JXG.OBJECT_TYPE_CAS;
    var j = this.board.elementsByName;
    var k = [];
    var d;
    for (var g = 0; g < h.length; g++)
    {
        var e = h[g];
        if (typeof e == "string")
        {
            var f = JXG.GeonextParser.geonext2JS(e, this.board);
            k[g] = new Function("", "return " + f + ";")
        }
        else
        {
            if (typeof e == "function")
            {
                k[g] = e
            }
            else
            {
                if (typeof e == "number")
                {
                    k[g] = function (i)
                    {
                        return function ()
                        {
                            return i
                        }
                    }(e)
                }
                else
                {
                    if (typeof e == "object" && typeof e.Value == "function")
                    {
                        k[g] = (function (i)
                        {
                            return function ()
                            {
                                return i.Value()
                            }
                        })(e)
                    }
                }
            }
        }
    }
    if (h.length == 1)
    {
        this.updateConstraint = function ()
        {
            var i = k[0]();
            if (JXG.isArray(i))
            {
                this.coords.setCoordinates(JXG.COORDS_BY_USER, i)
            }
            else
            {
                this.coords = i
            }
        }
    }
    else
    {
        if (h.length == 2)
        {
            this.XEval = k[0];
            this.YEval = k[1];
            d = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.XEval(),this.YEval()]);";
            this.updateConstraint = new Function("", d)
        }
        else
        {
            this.ZEval = k[0];
            this.XEval = k[1];
            this.YEval = k[2];
            d = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.ZEval(),this.XEval(),this.YEval()]);";
            this.updateConstraint = new Function("", d)
        }
    }
    if (!this.board.isSuspendedUpdate)
    {
        this.update()
    }
    return this
};
JXG.Point.prototype.updateTransform = function ()
{
    if (this.transformations.length == 0 || this.baseElement == null)
    {
        return
    }
    var e, d;
    if (this === this.baseElement)
    {
        e = this.transformations[0].apply(this.baseElement, "self")
    }
    else
    {
        e = this.transformations[0].apply(this.baseElement)
    }
    this.coords.setCoordinates(JXG.COORDS_BY_USER, e);
    for (d = 1; d < this.transformations.length; d++)
    {
        this.coords.setCoordinates(JXG.COORDS_BY_USER, this.transformations[d].apply(this))
    }
    return this
};
JXG.Point.prototype.addTransform = function (g, e)
{
    var h, f, d;
    if (this.transformations.length == 0)
    {
        this.baseElement = g
    }
    if (JXG.isArray(e))
    {
        h = e
    }
    else
    {
        h = [e]
    }
    d = h.length;
    for (f = 0; f < d; f++)
    {
        this.transformations.push(h[f])
    }
    return this
};
JXG.Point.prototype.startAnimation = function (d, e)
{
    if ((this.type == JXG.OBJECT_TYPE_GLIDER) && (typeof this.intervalCode == "undefined"))
    {
        this.intervalCode = window.setInterval("JXG.JSXGraph.boards['" + this.board.id + "'].objects['" + this.id + "']._anim(" + d + ", " + e + ")", 250);
        if (typeof this.intervalCount == "undefined")
        {
            this.intervalCount = 0
        }
    }
    return this
};
JXG.Point.prototype.stopAnimation = function ()
{
    if (typeof this.intervalCode != "undefined")
    {
        window.clearInterval(this.intervalCode);
        delete(this.intervalCode)
    }
    return this
};
JXG.Point.prototype.moveAlong = function (m, e)
{
    var l = [],
        g = 35,
        j = function (p, n)
        {
            return function ()
            {
                return m[p][n]
            }
        },
        d = [],
        f, h, k = e / g;
    if (JXG.isArray(m))
    {
        for (f = 0; f < m.length; f++)
        {
            if (JXG.isPoint(m[f]))
            {
                d[f] = m[f]
            }
            else
            {
                d[f] =
                {
                    elementClass: JXG.OBJECT_CLASS_POINT,
                    X: j(f, 0),
                    Y: j(f, 1)
                }
            }
        }
        e = e || 0;
        if (e === 0)
        {
            this.setPosition(JXG.COORDS_BY_USER, d[d.length - 1].X(), d[d.length - 1].Y());
            return this.board.update(this)
        }
        h = JXG.Math.Numerics.Neville(d);
        for (f = 0; f < k; f++)
        {
            l[f] = [];
            l[f][0] = h[0]((k - f) / k * h[3]());
            l[f][1] = h[1]((k - f) / k * h[3]())
        }
        this.animationPath = l
    }
    else
    {
        if (JXG.isFunction(m))
        {
            this.animationPath = m;
            this.animationStart = new Date().getTime()
        }
    }
    this.board.addAnimation(this);
    return this
};
JXG.Point.prototype.moveTo = function (k, f)
{
    if (typeof f == "undefined" || f == 0)
    {
        this.setPosition(JXG.COORDS_BY_USER, k[0], k[1]);
        return this.board.update(this)
    }
    var l = 35,
        m = Math.ceil(f / (l * 1)),
        n = new Array(m + 1),
        e = this.coords.usrCoords[1],
        d = this.coords.usrCoords[2],
        h = (k[0] - e),
        g = (k[1] - d),
        j;
    if (Math.abs(h) < JXG.Math.eps && Math.abs(g) < JXG.Math.eps)
    {
        return this
    }
    for (j = m; j >= 0; j--)
    {
        n[m - j] = [e + h * Math.sin((j / (m * 1)) * Math.PI / 2), d + g * Math.sin((j / (m * 1)) * Math.PI / 2)]
    }
    this.animationPath = n;
    this.board.addAnimation(this);
    return this
};
JXG.Point.prototype.visit = function (n, g, e)
{
    if (arguments.length == 2)
    {
        e = 1
    }
    var p = 35,
        q = Math.ceil(g / (p * 1)),
        r = new Array(e * (q + 1)),
        f = this.coords.usrCoords[1],
        d = this.coords.usrCoords[2],
        l = (n[0] - f),
        h = (n[1] - d),
        m, k;
    for (k = 0; k < e; k++)
    {
        for (m = q; m >= 0; m--)
        {
            r[k * (q + 1) + q - m] = [f + l * Math.pow(Math.sin((m / (q * 1)) * Math.PI), 2), d + h * Math.pow(Math.sin((m / (q * 1)) * Math.PI), 2)]
        }
    }
    this.animationPath = r;
    this.board.addAnimation(this);
    return this
};
JXG.Point.prototype._anim = function (n, i)
{
    var e, l, j, h, g, f, m = 1,
        d, k;
    this.intervalCount++;
    if (this.intervalCount > i)
    {
        this.intervalCount = 0
    }
    if (this.slideObject.elementClass == JXG.OBJECT_CLASS_LINE)
    {
        e = this.slideObject.point1.coords.distance(JXG.COORDS_BY_SCREEN, this.slideObject.point2.coords);
        l = this.slideObject.getSlope();
        if (l != "INF")
        {
            g = Math.atan(l);
            j = Math.round((this.intervalCount / i) * e * Math.cos(g));
            h = Math.round((this.intervalCount / i) * e * Math.sin(g))
        }
        else
        {
            j = 0;
            h = Math.round((this.intervalCount / i) * e)
        }
        if (n < 0)
        {
            f = this.slideObject.point2;
            if (this.slideObject.point2.coords.scrCoords[1] - this.slideObject.point1.coords.scrCoords[1] > 0)
            {
                m = -1
            }
            else
            {
                if (this.slideObject.point2.coords.scrCoords[1] - this.slideObject.point1.coords.scrCoords[1] == 0)
                {
                    if (this.slideObject.point2.coords.scrCoords[2] - this.slideObject.point1.coords.scrCoords[2] > 0)
                    {
                        m = -1
                    }
                }
            }
        }
        else
        {
            f = this.slideObject.point1;
            if (this.slideObject.point1.coords.scrCoords[1] - this.slideObject.point2.coords.scrCoords[1] > 0)
            {
                m = -1
            }
            else
            {
                if (this.slideObject.point1.coords.scrCoords[1] - this.slideObject.point2.coords.scrCoords[1] == 0)
                {
                    if (this.slideObject.point1.coords.scrCoords[2] - this.slideObject.point2.coords.scrCoords[2] > 0)
                    {
                        m = -1
                    }
                }
            }
        }
        this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [f.coords.scrCoords[1] + m * j, f.coords.scrCoords[2] + m * h])
    }
    else
    {
        if (this.slideObject.elementClass == JXG.OBJECT_CLASS_CURVE)
        {
            if (n > 0)
            {
                d = Math.round(this.intervalCount / i * this.board.canvasWidth)
            }
            else
            {
                d = Math.round((i - this.intervalCount) / i * this.board.canvasWidth)
            }
            this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [d, 0]);
            this.coords = JXG.Math.Geometry.projectPointToCurve(this, this.slideObject, this.board)
        }
        else
        {
            if (this.slideObject.elementClass == JXG.OBJECT_CLASS_CIRCLE)
            {
                if (n < 0)
                {
                    g = this.intervalCount / i * 2 * Math.PI
                }
                else
                {
                    g = (i - this.intervalCount) / i * 2 * Math.PI
                }
                k = this.slideObject.Radius();
                this.coords.setCoordinates(JXG.COORDS_BY_USER, [this.slideObject.midpoint.coords.usrCoords[1] + k * Math.cos(g), this.slideObject.midpoint.coords.usrCoords[2] + k * Math.sin(g)])
            }
        }
    }
    this.board.update(this);
    return this
};
JXG.Point.prototype.setStyle = function (d)
{
    if (d == 0 || d == 1 || d == 2)
    {
        this.visProp.face = "cross";
        if (d == 0)
        {
            this.visProp.size = 2
        }
        else
        {
            if (d == 1)
            {
                this.visProp.size = 3
            }
            else
            {
                this.visProp.size = 4
            }
        }
    }
    else
    {
        if (d == 3 || d == 4 || d == 5 || d == 6)
        {
            this.visProp.face = "circle";
            if (d == 3)
            {
                this.visProp.size = 1
            }
            else
            {
                if (d == 4)
                {
                    this.visProp.size = 2
                }
                else
                {
                    if (d == 5)
                    {
                        this.visProp.size = 3
                    }
                    else
                    {
                        this.visProp.size = 4
                    }
                }
            }
        }
        else
        {
            if (d == 7 || d == 8 || d == 9)
            {
                this.visProp.face = "square";
                if (d == 7)
                {
                    this.visProp.size = 2
                }
                else
                {
                    if (d == 8)
                    {
                        this.visProp.size = 3
                    }
                    else
                    {
                        this.visProp.size = 4
                    }
                }
            }
            else
            {
                if (d == 10 || d == 11 || d == 12)
                {
                    this.visProp.face = "plus";
                    if (d == 10)
                    {
                        this.visProp.size = 2
                    }
                    else
                    {
                        if (d == 11)
                        {
                            this.visProp.size = 3
                        }
                        else
                        {
                            this.visProp.size = 4
                        }
                    }
                }
            }
        }
    }
    this.board.renderer.changePointStyle(this);
    return this
};
JXG.Point.prototype.normalizeFace = function (d)
{
    var e =
    {
        cross: "x",
        x: "x",
        circle: "o",
        o: "o",
        square: "[]",
        "[]": "[]",
        plus: "+",
        "+": "+",
        diamond: "<>",
        "<>": "<>",
        triangleup: "^",
        a: "^",
        "^": "^",
        triangledown: "v",
        v: "v",
        triangleleft: "<",
        "<": "<",
        triangleright: ">",
        ">": ">"
    };
    return e[d]
};
JXG.Point.prototype.setFace = function (d)
{
    d = d.toLowerCase();
    if (d == "cross" || d == "x" || d == "plus" || d == "+" || d == "circle" || d == "o" || d == "square" || d == "[]" || d == "diamond" || d == "<>" || d == "triangleup" || d == "a" || d == "triangledown" || d == "v" || d == "triangleleft" || d == "<" || d == "triangleright" || d == ">")
    {
        this.visProp.face = d
    }
    else
    {
        this.visProp.face = "circle"
    }
    this.board.renderer.changePointStyle(this);
    return this
};
JXG.Point.prototype.remove = function ()
{
    if (this.hasLabel)
    {
        this.board.renderer.remove(this.board.renderer.getElementById(this.label.content.id))
    }
    this.board.renderer.remove(this.board.renderer.getElementById(this.id))
};
JXG.Point.prototype.getTextAnchor = function ()
{
    return this.coords
};
JXG.Point.prototype.getLabelAnchor = function ()
{
    return this.coords
};
JXG.Point.prototype.face = function (d)
{
    this.setProperty(
    {
        face: d
    })
};
JXG.Point.prototype.size = function (d)
{
    this.setProperty(
    {
        size: d
    })
};
JXG.Point.prototype.cloneToBackground = function (d)
{
    var e =
    {
    };
    e.id = this.id + "T" + this.numTraces;
    this.numTraces++;
    e.coords = this.coords;
    e.visProp = this.visProp;
    e.elementClass = JXG.OBJECT_CLASS_POINT;
    JXG.clearVisPropOld(e);
    this.board.renderer.drawPoint(e);
    this.traces[e.id] = e.rendNode;
    delete e;
    return this
};
JXG.createPoint = function (j, f, k)
{
    var h, e = false,
        g, d;
    k = JXG.checkAttributes(k, {
        withLabel: JXG.readOption(j.options, "point", "withLabel"),
        layer: null
    });
    d = (typeof k.visible == "undefined") || JXG.str2Bool(k.visible);
    for (g = 0; g < f.length; g++)
    {
        if (typeof f[g] == "function" || typeof f[g] == "string")
        {
            e = true
        }
    }
    if (!e)
    {
        if ((JXG.isNumber(f[0])) && (JXG.isNumber(f[1])))
        {
            h = new JXG.Point(j, f, k.id, k.name, d, k.withLabel, k.layer);
            if (k.slideObject != null)
            {
                h.makeGlider(k.slideObject)
            }
            else
            {
                h.baseElement = h
            }
        }
        else
        {
            if ((typeof f[0] == "object") && (typeof f[1] == "object"))
            {
                h = new JXG.Point(j, [0, 0], k.id, k.name, d, k.withLabel, k.layer);
                h.addTransform(f[0], f[1])
            }
            else
            {
                throw new Error("JSXGraph: Can't create point with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [x,y], [z,x,y], [point,transformation]")
            }
        }
    }
    else
    {
        h = new JXG.Point(j, [0, 0], k.id, k.name, d, k.withLabel, k.layer);
        h.addConstraint(f)
    }
    return h
};
JXG.createGlider = function (g, e, h)
{
    var f, d;
    h = JXG.checkAttributes(h, {
        withLabel: JXG.readOption(g.options, "point", "withLabel"),
        layer: null
    });
    d = (typeof h.visible == "undefined") || JXG.str2Bool(h.visible);
    if (e.length == 1)
    {
        f = new JXG.Point(g, [0, 0], h.id, h.name, d, h.withLabel)
    }
    else
    {
        f = g.create("point", e.slice(0, -1), h)
    }
    f.makeGlider(e[e.length - 1]);
    return f
};
JXG.createIntersectionPoint = function (g, e, d)
{
    var f;
    if (e.length >= 3)
    {
        if (e.length == 3)
        {
            e.push(null)
        }
        f = g.create("point", [g.intersection(e[0], e[1], e[2], e[3])], d)
    }
    e[0].addChild(f);
    e[1].addChild(f);
    f.generatePolynomial = function ()
    {
        var h = e[0].generatePolynomial(f);
        var i = e[1].generatePolynomial(f);
        if ((h.length == 0) || (i.length == 0))
        {
            return []
        }
        else
        {
            return [h[0], i[0]]
        }
    };
    return f
};
JXG.createOtherIntersectionPoint = function (g, e, d)
{
    var f;
    if (e.length != 3 || !JXG.isPoint(e[2]) || (e[0].elementClass != JXG.OBJECT_CLASS_LINE && e[0].elementClass != JXG.OBJECT_CLASS_CIRCLE) || (e[1].elementClass != JXG.OBJECT_CLASS_LINE && e[1].elementClass != JXG.OBJECT_CLASS_CIRCLE))
    {
        throw new Error("JSXGraph: Can't create 'other intersection point' with parent types '" + (typeof e[0]) + "',  '" + (typeof e[1]) + "'and  '" + (typeof e[2]) + "'.\nPossible parent types: [circle|line,circle|line,point]")
    }
    else
    {
        f = g.create("point", [g.otherIntersection(e[0], e[1], e[2])], d)
    }
    e[0].addChild(f);
    e[1].addChild(f);
    f.generatePolynomial = function ()
    {
        var h = e[0].generatePolynomial(f);
        var i = e[1].generatePolynomial(f);
        if ((h.length == 0) || (i.length == 0))
        {
            return []
        }
        else
        {
            return [h[0], i[0]]
        }
    };
    return f
};
JXG.JSXGraph.registerElement("point", JXG.createPoint);
JXG.JSXGraph.registerElement("glider", JXG.createGlider);
JXG.JSXGraph.registerElement("intersection", JXG.createIntersectionPoint);
JXG.JSXGraph.registerElement("otherintersection", JXG.createOtherIntersectionPoint);
JXG.Line = function (g, i, h, j, d, f, e)
{
    this.constructor();
    this.type = JXG.OBJECT_TYPE_LINE;
    this.elementClass = JXG.OBJECT_CLASS_LINE;
    this.init(g, j, d);
    if (e == null)
    {
        e = g.options.layer.line
    }
    this.layer = e;
    this.point1 = JXG.getReference(this.board, i);
    this.point2 = JXG.getReference(this.board, h);
    this.image = null;
    this.imageTransformMatrix = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.visProp.fillColor = this.board.options.line.fillColor;
    this.visProp.highlightFillColor = this.board.options.line.highlightFillColor;
    this.visProp.strokeColor = this.board.options.line.strokeColor;
    this.visProp.highlightStrokeColor = this.board.options.line.highlightStrokeColor;
    this.visProp.straightFirst = this.board.options.line.straightFirst;
    this.visProp.straightLast = this.board.options.line.straightLast;
    this.visProp.visible = true;
    this.visProp.firstArrow = this.board.options.line.firstArrow;
    this.visProp.lastArrow = this.board.options.line.lastArrow;
    this.ticks = [];
    this.defaultTicks = null;
    this.parentPolygon = null;
    this.labelOffsets = [].concat(this.board.options.line.labelOffsets);
    this.labelOffsets[0] = Math.abs(this.labelOffsets[0]);
    this.labelOffsets[1] = Math.abs(this.labelOffsets[1]);
    this.createLabel(f);
    this.id = this.board.setId(this, "L");
    this.board.renderer.drawLine(this);
    this.board.finalizeAdding(this);
    this.point1.addChild(this);
    this.point2.addChild(this);
    this.needsUpdate = true;
    this.update()
};
JXG.Line.prototype = new JXG.GeometryElement;
JXG.Line.prototype.hasPoint = function (l, j)
{
    var h = [],
        r, p = [1, l, j],
        m = [],
        t, f, k, e, n, q, g, d;
    h[0] = this.stdform[0] - this.stdform[1] * this.board.origin.scrCoords[1] / this.board.stretchX + this.stdform[2] * this.board.origin.scrCoords[2] / this.board.stretchY;
    h[1] = this.stdform[1] / this.board.stretchX;
    h[2] = this.stdform[2] / (-this.board.stretchY);
    var m = [0, h[1], h[2]];
    m = JXG.Math.crossProduct(m, p);
    m = JXG.Math.crossProduct(m, h);
    m[1] /= m[0];
    m[2] /= m[0];
    m[0] = 1;
    r = (p[0] - m[0]) * (p[0] - m[0]) + (p[1] - m[1]) * (p[1] - m[1]) + (p[2] - m[2]) * (p[2] - m[2]);
    if (isNaN(r) || r > this.board.options.precision.hasPoint * this.board.options.precision.hasPoint)
    {
        return false
    }
    if (this.visProp.straightFirst && this.visProp.straightLast)
    {
        return true
    }
    else
    {
        e = this.point1.coords.scrCoords;
        n = this.point2.coords.scrCoords;
        d = (n[1] - e[1]) * (n[1] - e[1]) + (n[2] - e[2]) * (n[2] - e[2]);
        q = (m[1] - e[1]) * (m[1] - e[1]) + (m[2] - e[2]) * (m[2] - e[2]);
        g = (m[1] - n[1]) * (m[1] - n[1]) + (m[2] - n[2]) * (m[2] - n[2]);
        if ((q > d) || (g > d))
        {
            if (q < g)
            {
                if (!this.visProp.straightFirst)
                {
                    return false
                }
            }
            else
            {
                if (!this.visProp.straightLast)
                {
                    return false
                }
            }
        }
        return true
    }
};
JXG.Line.prototype.update = function ()
{
    var d, e;
    if (this.constrained)
    {
        if (typeof this.funps != "undefined")
        {
            e = this.funps();
            this.point1 = e[0];
            this.point2 = e[1]
        }
        else
        {
            this.point1 = this.funp1();
            this.point2 = this.funp2()
        }
    }
    if (this.needsUpdate)
    {
        if (true || !this.board.geonextCompatibilityMode)
        {
            this.updateStdform()
        }
    }
    if (this.traced)
    {
        this.cloneToBackground(true)
    }
};
JXG.Line.prototype.updateStdform = function ()
{
    var d = JXG.Math.crossProduct(this.point1.coords.usrCoords, this.point2.coords.usrCoords);
    this.stdform[0] = d[0];
    this.stdform[1] = d[1];
    this.stdform[2] = d[2];
    this.stdform[3] = 0;
    this.normalize()
};
JXG.Line.prototype.updateRenderer = function ()
{
    var d, e;
    if (this.needsUpdate && this.visProp.visible)
    {
        d = this.isReal;
        this.isReal = (isNaN(this.point1.coords.usrCoords[1] + this.point1.coords.usrCoords[2] + this.point2.coords.usrCoords[1] + this.point2.coords.usrCoords[2])) ? false : true;
        if (this.isReal)
        {
            if (d != this.isReal)
            {
                this.board.renderer.show(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.show(this.label.content)
                }
            }
            this.board.renderer.updateLine(this)
        }
        else
        {
            if (d != this.isReal)
            {
                this.board.renderer.hide(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.hide(this.label.content)
                }
            }
        }
        this.needsUpdate = false
    }
    if (this.hasLabel && this.label.content.visProp.visible && this.isReal)
    {
        this.label.content.update();
        this.board.renderer.updateText(this.label.content)
    }
};
JXG.Line.prototype.generatePolynomial = function (h)
{
    var g = this.point1.symbolic.x,
        f = this.point1.symbolic.y,
        j = this.point2.symbolic.x,
        i = this.point2.symbolic.y,
        e = h.symbolic.x,
        d = h.symbolic.y;
    return [["(", f, ")*(", e, ")-(", f, ")*(", j, ")+(", d, ")*(", j, ")-(", g, ")*(", d, ")+(", g, ")*(", i, ")-(", e, ")*(", i, ")"].join("")]
};
JXG.Line.prototype.getRise = function ()
{
    if (Math.abs(this.stdform[2]) >= JXG.Math.eps)
    {
        return -this.stdform[0] / this.stdform[2]
    }
    else
    {
        return Infinity
    }
};
JXG.Line.prototype.getSlope = function ()
{
    if (Math.abs(this.stdform[2]) >= JXG.Math.eps)
    {
        return -this.stdform[1] / this.stdform[2]
    }
    else
    {
        return Infinity
    }
};
JXG.Line.prototype.setStraight = function (d, e)
{
    this.visProp.straightFirst = d;
    this.visProp.straightLast = e;
    this.board.renderer.updateLine(this)
};
JXG.Line.prototype.getTextAnchor = function ()
{
    return new JXG.Coords(JXG.COORDS_BY_USER, [this.point1.X() + 0.5 * (this.point2.X() - this.point1.X()), this.point1.Y() + 0.5 * (this.point2.Y() - this.point1.Y())], this.board)
};
JXG.Line.prototype.setLabelRelativeCoords = function (d)
{
    if (typeof this.label.content != "undefined")
    {
        this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d[0], -d[1]], this.board)
    }
};
JXG.Line.prototype.getLabelAnchor = function ()
{
    var h, f, e, g, d, i = this.labelOffsets[0],
        j = this.labelOffsets[1];
    if (!this.visProp.straightFirst && !this.visProp.straightLast)
    {
        this.setLabelRelativeCoords(this.labelOffsets);
        return new JXG.Coords(JXG.COORDS_BY_USER, [this.point2.X() - 0.5 * (this.point2.X() - this.point1.X()), this.point2.Y() - 0.5 * (this.point2.Y() - this.point1.Y())], this.board)
    }
    else
    {
        f = new JXG.Coords(JXG.COORDS_BY_USER, this.point1.coords.usrCoords, this.board);
        e = new JXG.Coords(JXG.COORDS_BY_USER, this.point2.coords.usrCoords, this.board);
        this.board.renderer.calcStraight(this, f, e);
        if (this.visProp.straightFirst)
        {
            h = f
        }
        else
        {
            h = e
        }
        if (this.label.content != null)
        {
            g = [0, 0];
            d = this.getSlope();
            if (h.scrCoords[2] == 0)
            {
                if (d == Infinity)
                {
                    g = [i, -j]
                }
                else
                {
                    if (d >= 0)
                    {
                        g = [i, -j]
                    }
                    else
                    {
                        g = [-i, -j]
                    }
                }
            }
            else
            {
                if (h.scrCoords[2] == this.board.canvasHeight)
                {
                    if (d == Infinity)
                    {
                        g = [i, j]
                    }
                    else
                    {
                        if (d >= 0)
                        {
                            g = [-i, j]
                        }
                        else
                        {
                            g = [i, j]
                        }
                    }
                }
            }
            if (h.scrCoords[1] == 0)
            {
                if (d == Infinity)
                {
                    g = [i, j]
                }
                else
                {
                    if (d >= 0)
                    {
                        g = [i, -j]
                    }
                    else
                    {
                        g = [i, j]
                    }
                }
            }
            else
            {
                if (h.scrCoords[1] == this.board.canvasWidth)
                {
                    if (d == Infinity)
                    {
                        g = [-i, j]
                    }
                    else
                    {
                        if (d >= 0)
                        {
                            g = [-i, j]
                        }
                        else
                        {
                            g = [-i, -j]
                        }
                    }
                }
            }
            this.setLabelRelativeCoords(g)
        }
        return h
    }
};
JXG.Line.prototype.cloneToBackground = function (e)
{
    var h =
    {
    },
        f, d, g;
    h.id = this.id + "T" + this.numTraces;
    h.elementClass = JXG.OBJECT_CLASS_LINE;
    this.numTraces++;
    h.point1 = this.point1;
    h.point2 = this.point2;
    h.stdform = this.stdform;
    h.board =
    {
    };
    h.board.unitX = this.board.unitX;
    h.board.unitY = this.board.unitY;
    h.board.zoomX = this.board.zoomX;
    h.board.zoomY = this.board.zoomY;
    h.board.stretchX = this.board.stretchX;
    h.board.stretchY = this.board.stretchY;
    h.board.origin = this.board.origin;
    h.board.canvasHeight = this.board.canvasHeight;
    h.board.canvasWidth = this.board.canvasWidth;
    h.board.dimension = this.board.dimension;
    h.visProp = this.visProp;
    JXG.clearVisPropOld(h);
    d = this.getSlope();
    f = this.getRise();
    h.getSlope = function ()
    {
        return d
    };
    h.getRise = function ()
    {
        return f
    };
    g = this.board.renderer.enhancedRendering;
    this.board.renderer.enhancedRendering = true;
    this.board.renderer.drawLine(h);
    this.board.renderer.enhancedRendering = g;
    this.traces[h.id] = h.rendNode;
    delete h
};
JXG.Line.prototype.addTransform = function (d)
{
    var f, e;
    if (JXG.isArray(d))
    {
        f = d
    }
    else
    {
        f = [d]
    }
    for (e = 0; e < f.length; e++)
    {
        this.point1.transformations.push(f[e]);
        this.point2.transformations.push(f[e])
    }
};
JXG.Line.prototype.setPosition = function (g, d, f)
{
    var e = this.board.create("transform", [d, f], {
        type: "translate"
    });
    if (this.point1.transformations.length > 0 && this.point1.transformations[this.point1.transformations.length - 1].isNumericMatrix)
    {
        this.point1.transformations[this.point1.transformations.length - 1].melt(e)
    }
    else
    {
        this.point1.addTransform(this.point1, e)
    }
    if (this.point2.transformations.length > 0 && this.point2.transformations[this.point2.transformations.length - 1].isNumericMatrix)
    {
        this.point2.transformations[this.point2.transformations.length - 1].melt(e)
    }
    else
    {
        this.point2.addTransform(this.point2, e)
    }
};
JXG.Line.prototype.X = function (i)
{
    var l = this.stdform[1],
        k = this.stdform[2],
        j = this.stdform[0],
        g, f, d, e, h;
    i *= Math.PI;
    g = l * Math.cos(i) + k * Math.sin(i);
    f = j;
    d = Math.sqrt(g * g + f * f);
    e = -f / d;
    h = g / d;
    if (Math.abs(h) < JXG.Math.eps)
    {
        h = 1
    }
    return e * Math.cos(i) / h
};
JXG.Line.prototype.Y = function (i)
{
    var l = this.stdform[1],
        k = this.stdform[2],
        j = this.stdform[0],
        g, f, d, e, h;
    i *= Math.PI;
    g = l * Math.cos(i) + k * Math.sin(i);
    f = j;
    d = Math.sqrt(g * g + f * f);
    e = -f / d;
    h = g / d;
    if (Math.abs(h) < JXG.Math.eps)
    {
        h = 1
    }
    return e * Math.sin(i) / h
};
JXG.Line.prototype.Z = function (h)
{
    var f = this.stdform[1],
        e = this.stdform[2],
        k = this.stdform[0],
        d, j, g, i;
    h *= Math.PI;
    d = f * Math.cos(h) + e * Math.sin(h);
    j = k;
    g = Math.sqrt(d * d + j * j);
    i = d / g;
    if (Math.abs(i) >= JXG.Math.eps)
    {
        return 1
    }
    else
    {
        return 0
    }
};
JXG.Line.prototype.minX = function ()
{
    return 0
};
JXG.Line.prototype.maxX = function ()
{
    return 1
};
JXG.Line.prototype.addTicks = function (d)
{
    if (d.id == "" || typeof d.id == "undefined")
    {
        d.id = this.id + "_ticks_" + (this.ticks.length + 1)
    }
    this.board.renderer.drawTicks(d);
    this.ticks.push(d);
    this.ticks[this.ticks.length - 1].updateRenderer();
    return d.id
};
JXG.Line.prototype.removeAllTicks = function ()
{
    var d;
    for (d = this.ticks.length; d > 0; d--)
    {
        this.board.renderer.remove(this.ticks[d - 1].rendNode)
    }
    this.ticks = new Array()
};
JXG.Line.prototype.removeTicks = function (f)
{
    var e, d;
    if (this.defaultTicks != null && this.defaultTicks == f)
    {
        this.defaultTicks = null
    }
    for (e = this.ticks.length; e > 0; e--)
    {
        if (this.ticks[e - 1] == f)
        {
            this.board.renderer.remove(this.ticks[e - 1].rendNode);
            for (d = 0; d < this.ticks[e - 1].ticks.length; d++)
            {
                if (this.ticks[e - 1].labels[d] != null)
                {
                    if (this.ticks[e - 1].labels[d].show)
                    {
                        this.board.renderer.remove(this.ticks[e - 1].labels[d].rendNode)
                    }
                }
            }
            delete(this.ticks[e - 1])
        }
    }
};
JXG.createLine = function (j, l, h)
{
    var e, n, m, g, k = [];
    h = JXG.checkAttributes(h, {
        withLabel: JXG.readOption(j.options, "line", "withLabel"),
        layer: null,
        labelOffsets: JXG.readOption(j.options, "line", "labelOffsets")
    });
    var f = false;
    if (l.length == 2)
    {
        if (l[0].length > 1)
        {
            n = j.create("point", l[0], {
                visible: false,
                fixed: true
            })
        }
        else
        {
            if (l[0].elementClass == JXG.OBJECT_CLASS_POINT)
            {
                n = JXG.getReference(j, l[0])
            }
            else
            {
                if ((typeof l[0] == "function") && (l[0]().elementClass == JXG.OBJECT_CLASS_POINT))
                {
                    n = l[0]();
                    f = true
                }
                else
                {
                    throw new Error("JSXGraph: Can't create line with parent types '" + (typeof l[0]) + "' and '" + (typeof l[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                }
            }
        }
        if (l[1].length > 1)
        {
            m = j.create("point", l[1], {
                visible: false,
                fixed: true
            })
        }
        else
        {
            if (l[1].elementClass == JXG.OBJECT_CLASS_POINT)
            {
                m = JXG.getReference(j, l[1])
            }
            else
            {
                if ((typeof l[1] == "function") && (l[1]().elementClass == JXG.OBJECT_CLASS_POINT))
                {
                    m = l[1]();
                    f = true
                }
                else
                {
                    throw new Error("JSXGraph: Can't create line with parent types '" + (typeof l[0]) + "' and '" + (typeof l[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                }
            }
        }
        e = new JXG.Line(j, n.id, m.id, h.id, h.name, h.withLabel, h.layer);
        if (f)
        {
            e.constrained = true;
            e.funp1 = l[0];
            e.funp2 = l[1]
        }
    }
    else
    {
        if (l.length == 3)
        {
            for (g = 0; g < 3; g++)
            {
                if (typeof l[g] == "number")
                {
                    k[g] = function (i)
                    {
                        return function ()
                        {
                            return i
                        }
                    }(l[g])
                }
                else
                {
                    if (typeof l[g] == "function")
                    {
                        k[g] = l[g]
                    }
                    else
                    {
                        throw new Error("JSXGraph: Can't create line with parent types '" + (typeof l[0]) + "' and '" + (typeof l[1]) + "' and '" + (typeof l[2]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
                    }
                }
            }
            n = j.create("point", [function ()
            {
                return (0 + k[2]() * k[2]() + k[1]() * k[1]()) * 0.5
            }, function ()
            {
                return (k[2]() - k[1]() * k[0]() + k[2]()) * 0.5
            }, function ()
            {
                return (-k[1]() - k[2]() * k[0]() - k[1]()) * 0.5
            }], {
                visible: false,
                name: " "
            });
            m = j.create("point", [function ()
            {
                return k[2]() * k[2]() + k[1]() * k[1]()
            }, function ()
            {
                return -k[1]() * k[0]() + k[2]()
            }, function ()
            {
                return -k[2]() * k[0]() - k[1]()
            }], {
                visible: false,
                name: " "
            });
            e = new JXG.Line(j, n.id, m.id, h.id, h.name, h.withLabel)
        }
        else
        {
            if ((l.length == 1) && (typeof l[0] == "function") && (l[0]().length == 2) && (l[0]()[0].elementClass == JXG.OBJECT_CLASS_POINT) && (l[0]()[1].elementClass == JXG.OBJECT_CLASS_POINT))
            {
                var d = l[0]();
                e = new JXG.Line(j, d[0].id, d[1].id, h.id, h.name, h.withLabel, h.layer);
                e.constrained = true;
                e.funps = l[0]
            }
            else
            {
                throw new Error("JSXGraph: Can't create line with parent types '" + (typeof l[0]) + "' and '" + (typeof l[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]], [a,b,c]")
            }
        }
    }
    e.labelOffsets = h.labelOffsets;
    return e
};
JXG.JSXGraph.registerElement("line", JXG.createLine);
JXG.createSegment = function (f, d, g)
{
    var e;
    g = JXG.checkAttributes(g, {
        withLabel: JXG.readOption(f.options, "line", "withLabel"),
        layer: null
    });
    g.straightFirst = false;
    g.straightLast = false;
    e = f.create("line", d, g);
    return e
};
JXG.JSXGraph.registerElement("segment", JXG.createSegment);
JXG.createArrow = function (g, e, d)
{
    var f;
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(g.options, "line", "withLabel"),
        layer: null
    });
    f = g.create("line", e, d);
    f.setStraight(false, false);
    f.setArrow(false, true);
    f.type = JXG.OBJECT_TYPE_VECTOR;
    return f
};
JXG.JSXGraph.registerElement("arrow", JXG.createArrow);
JXG.createAxis = function (h, m, e)
{
    var k, j, n, i, f, d, g, l;
    if ((JXG.isArray(m[0]) || JXG.isPoint(m[0])) && (JXG.isArray(m[1]) || JXG.isPoint(m[1])))
    {
        if (JXG.isPoint(m[0]))
        {
            k = m[0]
        }
        else
        {
            k = new JXG.Point(h, m[0], "", "", false)
        }
        if (JXG.isPoint(m[1]))
        {
            j = m[1]
        }
        else
        {
            j = new JXG.Point(h, m[1], "", "", false)
        }
        k.fixed = true;
        j.fixed = true;
        e = JXG.checkAttributes(e, {
            lastArrow: true,
            straightFirst: true,
            straightLast: true,
            strokeWidth: 1,
            withLabel: false,
            strokeColor: h.options.axis.strokeColor
        });
        e.highlightStrokeColor = e.highlightStrokeColor || e.strokeColor || h.options.axis.highlightStrokeColor;
        n = h.create("line", [k, j], e);
        n.setProperty(
        {
            needsRegularUpdate: false
        });
        e = JXG.checkAttributes(e, {
            minorTicks: 4,
            insertTicks: true
        });
        if (e.ticksDistance != "undefined" && e.ticksDistance != null)
        {
            i = e.ticksDistance
        }
        else
        {
            if (JXG.isArray(e.ticks))
            {
                i = e.ticks
            }
            else
            {
                f = new JXG.Coords(JXG.COORDS_BY_USER, [n.point1.coords.usrCoords.slice(1)], h);
                d = new JXG.Coords(JXG.COORDS_BY_USER, [n.point2.coords.usrCoords.slice(1)], h);
                h.renderer.calcStraight(n, f, d);
                g = f.distance(JXG.COORDS_BY_USER, d);
                i = 1
            }
        }
        n.defaultTicks = h.create("ticks", [n, i], e);
        n.defaultTicks.setProperty(
        {
            needsRegularUpdate: false
        })
    }
    else
    {
        throw new Error("JSXGraph: Can't create point with parent types '" + (typeof m[0]) + "' and '" + (typeof m[1]) + "'.\nPossible parent types: [point,point], [[x1,y1],[x2,y2]]")
    }
    return n
};
JXG.JSXGraph.registerElement("axis", JXG.createAxis);
JXG.createTangent = function (q, s, k)
{
    var d, r, m, n, l, h, e, t, u, v;
    if (s.length == 1)
    {
        d = s[0];
        r = d.slideObject
    }
    else
    {
        if (s.length == 2)
        {
            if (JXG.isPoint(s[0]))
            {
                d = s[0];
                r = s[1]
            }
            else
            {
                if (JXG.isPoint(s[1]))
                {
                    r = s[0];
                    d = s[1]
                }
                else
                {
                    throw new Error("JSXGraph: Can't create tangent with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "'.\nPossible parent types: [glider], [point,line|curve|circle|conic]")
                }
            }
        }
        else
        {
            throw new Error("JSXGraph: Can't create tangent with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "'.\nPossible parent types: [glider], [point,line|curve|circle|conic]")
        }
    }
    k = JXG.checkAttributes(k, {
        withLabel: JXG.readOption(q.options, "line", "withLabel"),
        layer: null
    });
    if (r.elementClass == JXG.OBJECT_CLASS_LINE)
    {
        v = q.create("line", [r.point1, r.point2], k)
    }
    else
    {
        if (r.elementClass == JXG.OBJECT_CLASS_CURVE && !(r.type == JXG.OBJECT_TYPE_CONIC))
        {
            if (r.curveType != "plot")
            {
                m = r.X;
                n = r.Y;
                v = q.create("line", [function ()
                {
                    return -d.X() * q.D(n)(d.position) + d.Y() * q.D(m)(d.position)
                }, function ()
                {
                    return q.D(n)(d.position)
                }, function ()
                {
                    return -q.D(m)(d.position)
                }], k);
                d.addChild(v);
                v.glider = d
            }
            else
            {
                v = q.create("line", [function ()
                {
                    l = Math.floor(d.position);
                    if (l == r.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 1
                    }
                    return r.Y(l) * r.X(l + 1) - r.X(l) * r.Y(l + 1)
                }, function ()
                {
                    l = Math.floor(d.position);
                    if (l == r.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 0
                    }
                    return r.Y(l + 1) - r.Y(l)
                }, function ()
                {
                    l = Math.floor(d.position);
                    if (l == r.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 0
                    }
                    return r.X(l) - r.X(l + 1)
                }], k);
                d.addChild(v);
                v.glider = d
            }
        }
        else
        {
            if (r.type == JXG.OBJECT_TYPE_TURTLE)
            {
                v = q.create("line", [function ()
                {
                    l = Math.floor(d.position);
                    for (h = 0; h < r.objects.length; h++)
                    {
                        e = r.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE)
                        {
                            if (l < e.numberPoints)
                            {
                                break
                            }
                            l -= e.numberPoints
                        }
                    }
                    if (l == e.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 1
                    }
                    return e.Y(l) * e.X(l + 1) - e.X(l) * e.Y(l + 1)
                }, function ()
                {
                    l = Math.floor(d.position);
                    for (h = 0; h < r.objects.length; h++)
                    {
                        e = r.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE)
                        {
                            if (l < e.numberPoints)
                            {
                                break
                            }
                            l -= e.numberPoints
                        }
                    }
                    if (l == e.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 0
                    }
                    return e.Y(l + 1) - e.Y(l)
                }, function ()
                {
                    l = Math.floor(d.position);
                    for (h = 0; h < r.objects.length; h++)
                    {
                        e = r.objects[h];
                        if (e.type == JXG.OBJECT_TYPE_CURVE)
                        {
                            if (l < e.numberPoints)
                            {
                                break
                            }
                            l -= e.numberPoints
                        }
                    }
                    if (l == e.numberPoints - 1)
                    {
                        l--
                    }
                    if (l < 0)
                    {
                        return 0
                    }
                    return e.X(l) - e.X(l + 1)
                }], k);
                d.addChild(v);
                v.glider = d
            }
            else
            {
                if (r.elementClass == JXG.OBJECT_CLASS_CIRCLE || r.type == JXG.OBJECT_TYPE_CONIC)
                {
                    v = q.create("line", [function ()
                    {
                        return JXG.Math.matVecMult(r.quadraticform, d.coords.usrCoords)[0]
                    }, function ()
                    {
                        return JXG.Math.matVecMult(r.quadraticform, d.coords.usrCoords)[1]
                    }, function ()
                    {
                        return JXG.Math.matVecMult(r.quadraticform, d.coords.usrCoords)[2]
                    }], k);
                    d.addChild(v);
                    v.glider = d
                }
            }
        }
    }
    return v
};
JXG.JSXGraph.registerElement("tangent", JXG.createTangent);
JXG.JSXGraph.registerElement("polar", JXG.createTangent);
JXG.Group = function (h, l, d)
{
    var j, g, e, k, f;
    this.board = h;
    this.objects =
    {
    };
    j = this.board.numObjects;
    this.board.numObjects++;
    if ((l == "") || !JXG.exists(l))
    {
        this.id = this.board.id + "Group" + j
    }
    else
    {
        this.id = l
    }
    this.type = JXG.OBJECT_TYPE_POINT;
    this.elementClass = JXG.OBJECT_CLASS_POINT;
    if ((d == "") || !JXG.exists(d))
    {
        this.name = "group_" + this.board.generateName(this)
    }
    else
    {
        this.name = d
    }
    delete(this.type);
    if ((arguments.length == 4) && (JXG.isArray(arguments[3])))
    {
        g = arguments[3]
    }
    else
    {
        g = [];
        for (e = 3; e < arguments.length; e++)
        {
            g.push(arguments[e])
        }
    }
    for (e = 0; e < g.length; e++)
    {
        k = JXG.getReference(this.board, g[e]);
        if ((!k.fixed) && ((k.type == JXG.OBJECT_TYPE_POINT) || (k.type == JXG.OBJECT_TYPE_GLIDER)))
        {
            if (k.group.length != 0)
            {
                this.addGroup(k.group[k.group.length - 1])
            }
            else
            {
                this.addPoint(k)
            }
        }
    }
    for (f in this.objects)
    {
        this.objects[f].group.push(this)
    }
    this.dX = 0;
    this.dY = 0
};
JXG.Group.prototype.ungroup = function ()
{
    var d;
    for (d in this.objects)
    {
        if (this.objects[d].group[this.objects[d].group.length - 1] == this)
        {
            this.objects[d].group.pop()
        }
        delete(this.objects[d])
    }
};
JXG.Group.prototype.update = function (d)
{
    var f = null,
        e;
    for (e in this.objects)
    {
        f = this.objects[e];
        if (f.id != d.id)
        {
            f.coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [f.coords.scrCoords[1] + this.dX, f.coords.scrCoords[2] + this.dY], f.board)
        }
    }
    for (e in this.objects)
    {
        if (JXG.exists(this.board.objects[e]))
        {
            this.objects[e].update(false)
        }
        else
        {
            delete(this.objects[e])
        }
    }
};
JXG.Group.prototype.addPoint = function (d)
{
    this.objects[d.id] = d
};
JXG.Group.prototype.addPoints = function (d)
{
    var e;
    for (e in d)
    {
        this.objects[e.id] = e
    }
};
JXG.Group.prototype.addGroup = function (e)
{
    var d;
    for (d in e.objects)
    {
        this.addPoint(e.objects[d])
    }
};
JXG.createGroup = function (f, e, d)
{
    return new JXG.Group(f, d.id, d.name, e)
};
JXG.JSXGraph.registerElement("group", JXG.createGroup);
JXG.Circle = function (i, k, h, e, j, d, g, f)
{
    this.constructor();
    this.type = JXG.OBJECT_TYPE_CIRCLE;
    this.elementClass = JXG.OBJECT_CLASS_CIRCLE;
    this.init(i, j, d);
    if (f == null)
    {
        f = i.options.layer.circle
    }
    this.layer = f;
    this.method = k;
    this.midpoint = JXG.getReference(this.board, h);
    this.midpoint.addChild(this);
    this.visProp.visible = true;
    this.visProp.fillColor = this.board.options.circle.fillColor;
    this.visProp.highlightFillColor = this.board.options.circle.highlightFillColor;
    this.visProp.strokeColor = this.board.options.circle.strokeColor;
    this.visProp.highlightStrokeColor = this.board.options.circle.highlightStrokeColor;
    this.point2 = null;
    this.radius = 0;
    this.line = null;
    this.circle = null;
    if (k == "twoPoints")
    {
        this.point2 = JXG.getReference(i, e);
        this.point2.addChild(this);
        this.radius = this.Radius()
    }
    else
    {
        if (k == "pointRadius")
        {
            this.generateTerm(e);
            this.updateRadius()
        }
        else
        {
            if (k == "pointLine")
            {
                this.line = JXG.getReference(i, e);
                this.radius = this.line.point1.coords.distance(JXG.COORDS_BY_USER, this.line.point2.coords)
            }
            else
            {
                if (k == "pointCircle")
                {
                    this.circle = JXG.getReference(i, e);
                    this.radius = this.circle.Radius()
                }
            }
        }
    }
    if (g != null)
    {
        this.createLabel(g)
    }
    this.id = this.board.setId(this, "C");
    this.board.renderer.drawCircle(this);
    this.board.finalizeAdding(this);
    if (k == "pointRadius")
    {
        this.notifyParents(e)
    }
    else
    {
        if (k == "pointLine")
        {
            this.line.addChild(this)
        }
        else
        {
            if (k == "pointCircle")
            {
                this.circle.addChild(this)
            }
        }
    }
};
JXG.Circle.prototype = new JXG.GeometryElement;
JXG.Circle.prototype.hasPoint = function (d, j)
{
    var e = this.board.options.precision.hasPoint / (this.board.stretchX),
        g = this.midpoint.coords.usrCoords,
        h = new JXG.Coords(JXG.COORDS_BY_SCREEN, [d, j], this.board),
        f = this.Radius();
    var i = Math.sqrt((g[1] - h.usrCoords[1]) * (g[1] - h.usrCoords[1]) + (g[2] - h.usrCoords[2]) * (g[2] - h.usrCoords[2]));
    return (Math.abs(i - f) < e)
};
JXG.Circle.prototype.generatePolynomial = function (j)
{
    var h = this.midpoint.symbolic.x;
    var g = this.midpoint.symbolic.y;
    var f = j.symbolic.x;
    var e = j.symbolic.y;
    var d = this.generateRadiusSquared();
    if (d == "")
    {
        return []
    }
    var i = "((" + f + ")-(" + h + "))^2 + ((" + e + ")-(" + g + "))^2 - (" + d + ")";
    return [i]
};
JXG.Circle.prototype.generateRadiusSquared = function ()
{
    var e = "";
    if (this.method == "twoPoints")
    {
        var g = this.midpoint.symbolic.x;
        var f = this.midpoint.symbolic.y;
        var i = this.point2.symbolic.x;
        var h = this.point2.symbolic.y;
        e = "(" + i + "-" + g + ")^2 + (" + h + "-" + f + ")^2"
    }
    else
    {
        if (this.method == "pointRadius")
        {
            if (typeof(this.radius) == "number")
            {
                e = "" + this.radius * this.radius
            }
        }
        else
        {
            if (this.method == "pointLine")
            {
                var i = this.line.point1.symbolic.x;
                var h = this.line.point1.symbolic.y;
                var d = this.line.point2.symbolic.x;
                var j = this.line.point2.symbolic.y;
                e = "(" + i + "-" + d + ")^2 + (" + h + "-" + j + ")^2"
            }
            else
            {
                if (this.method == "pointCircle")
                {
                    e = this.circle.Radius()
                }
            }
        }
    }
    return e
};
JXG.Circle.prototype.update = function ()
{
    if (this.traced)
    {
        this.cloneToBackground(true)
    }
    if (this.needsUpdate)
    {
        if (this.method == "pointLine")
        {
            this.radius = this.line.point1.coords.distance(JXG.COORDS_BY_USER, this.line.point2.coords)
        }
        else
        {
            if (this.method == "pointCircle")
            {
                this.radius = this.circle.Radius()
            }
            else
            {
                if (this.method == "pointRadius")
                {
                    this.radius = this.updateRadius()
                }
            }
        }
        if (!this.board.geonextCompatibilityMode)
        {
            this.updateStdform();
            this.updateQuadraticform()
        }
    }
};
JXG.Circle.prototype.updateQuadraticform = function ()
{
    var d = this.midpoint,
        g = d.X(),
        f = d.Y(),
        e = this.Radius();
    this.quadraticform = [
        [g * g + f * f - e * e, -g, -f],
        [-g, 1, 0],
        [-f, 0, 1]
    ]
};
JXG.Circle.prototype.updateStdform = function ()
{
    this.stdform[3] = 0.5;
    this.stdform[4] = this.Radius();
    this.stdform[1] = -this.midpoint.coords.usrCoords[1];
    this.stdform[2] = -this.midpoint.coords.usrCoords[2];
    this.normalize()
};
JXG.Circle.prototype.updateRenderer = function ()
{
    if (this.needsUpdate && this.visProp.visible)
    {
        var d = this.isReal;
        this.isReal = (isNaN(this.midpoint.coords.usrCoords[1] + this.midpoint.coords.usrCoords[2] + this.Radius())) ? false : true;
        if (this.isReal)
        {
            if (d != this.isReal)
            {
                this.board.renderer.show(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.show(this.label.content)
                }
            }
            this.board.renderer.updateCircle(this)
        }
        else
        {
            if (d != this.isReal)
            {
                this.board.renderer.hide(this);
                if (this.hasLabel && this.label.content.visProp.visible)
                {
                    this.board.renderer.hide(this.label.content)
                }
            }
        }
        this.needsUpdate = false
    }
    if (this.hasLabel && this.label.content.visProp.visible && this.isReal)
    {
        this.label.content.update();
        this.board.renderer.updateText(this.label.content)
    }
};
JXG.Circle.prototype.generateTerm = function (e)
{
    if (typeof e == "string")
    {
        var f = this.board.elementsByName;
        var d = JXG.GeonextParser.geonext2JS(e + "", this.board);
        this.updateRadius = new Function("return " + d + ";")
    }
    else
    {
        if (typeof e == "number")
        {
            this.updateRadius = function ()
            {
                return e
            }
        }
        else
        {
            this.updateRadius = e
        }
    }
};
JXG.Circle.prototype.notifyParents = function (e)
{
    var d = null;
    var f = this.board.elementsByName;
    if (typeof e == "string")
    {
        JXG.GeonextParser.findDependencies(this, e + "", this.board)
    }
};
JXG.Circle.prototype.Radius = function ()
{
    if (this.method == "twoPoints")
    {
        return (Math.sqrt(Math.pow(this.midpoint.coords.usrCoords[1] - this.point2.coords.usrCoords[1], 2) + Math.pow(this.midpoint.coords.usrCoords[2] - this.point2.coords.usrCoords[2], 2)))
    }
    else
    {
        if (this.method == "pointLine" || this.method == "pointCircle")
        {
            return this.radius
        }
        else
        {
            if (this.method == "pointRadius")
            {
                return this.updateRadius()
            }
        }
    }
};
JXG.Circle.prototype.getRadius = function ()
{
    return this.Radius()
};
JXG.Circle.prototype.getTextAnchor = function ()
{
    return this.midpoint.coords
};
JXG.Circle.prototype.getLabelAnchor = function ()
{
    if (this.method == "twoPoints")
    {
        var e = this.midpoint.coords.usrCoords[1] - this.point2.coords.usrCoords[1];
        var d = this.midpoint.coords.usrCoords[2] - this.point2.coords.usrCoords[2];
        return new JXG.Coords(JXG.COORDS_BY_USER, [this.midpoint.coords.usrCoords[1] + e, this.midpoint.coords.usrCoords[2] + d], this.board)
    }
    else
    {
        if (this.method == "pointLine" || this.method == "pointCircle" || this.method == "pointRadius")
        {
            return new JXG.Coords(JXG.COORDS_BY_USER, [this.midpoint.coords.usrCoords[1] - this.Radius(), this.midpoint.coords.usrCoords[2]], this.board)
        }
    }
};
JXG.Circle.prototype.cloneToBackground = function (d)
{
    var g =
    {
    },
        e, f;
    g.id = this.id + "T" + this.numTraces;
    g.elementClass = JXG.OBJECT_CLASS_CIRCLE;
    this.numTraces++;
    g.midpoint =
    {
    };
    g.midpoint.coords = this.midpoint.coords;
    e = this.Radius();
    g.Radius = function ()
    {
        return e
    };
    g.getRadius = function ()
    {
        return e
    };
    g.board =
    {
    };
    g.board.unitX = this.board.unitX;
    g.board.unitY = this.board.unitY;
    g.board.zoomX = this.board.zoomX;
    g.board.zoomY = this.board.zoomY;
    g.board.stretchX = this.board.stretchX;
    g.board.stretchY = this.board.stretchY;
    g.visProp = this.visProp;
    JXG.clearVisPropOld(g);
    f = this.board.renderer.enhancedRendering;
    this.board.renderer.enhancedRendering = true;
    this.board.renderer.drawCircle(g);
    this.board.renderer.enhancedRendering = f;
    this.traces[g.id] = g.rendNode;
    delete g
};
JXG.Circle.prototype.addTransform = function (d)
{
    var f;
    if (JXG.isArray(d))
    {
        f = d
    }
    else
    {
        f = [d]
    }
    for (var e = 0; e < f.length; e++)
    {
        this.midpoint.transformations.push(f[e]);
        if (this.method == "twoPoints")
        {
            this.point2.transformations.push(f[e])
        }
    }
};
JXG.Circle.prototype.setPosition = function (g, d, f)
{
    var e = this.board.create("transform", [d, f], {
        type: "translate"
    });
    this.addTransform(e)
};
JXG.Circle.prototype.X = function (d)
{
    d *= 2 * Math.PI;
    return this.Radius() * Math.cos(d) + this.midpoint.coords.usrCoords[1]
};
JXG.Circle.prototype.Y = function (d)
{
    d *= 2 * Math.PI;
    return this.Radius() * Math.sin(d) + this.midpoint.coords.usrCoords[2]
};
JXG.Circle.prototype.minX = function ()
{
    return 0
};
JXG.Circle.prototype.maxX = function ()
{
    return 1
};
JXG.Circle.prototype.Area = function ()
{
    var d = this.Radius();
    return d * d * Math.PI
};
JXG.createCircle = function (h, k, e)
{
    var g, j, f;
    e = JXG.checkAttributes(e, {
        withLabel: JXG.readOption(h.options, "circle", "withLabel"),
        layer: null
    });
    j = [];
    for (f = 0; f < k.length; f++)
    {
        if (JXG.isPoint(k[f]))
        {
            j[f] = k[f]
        }
        else
        {
            if (k[f].length > 1)
            {
                j[f] = h.create("point", k[f], {
                    visible: false,
                    fixed: true
                })
            }
            else
            {
                j[f] = k[f]
            }
        }
    }
    if (k.length == 2 && JXG.isPoint(j[0]) && JXG.isPoint(j[1]))
    {
        g = new JXG.Circle(h, "twoPoints", j[0], j[1], e.id, e.name, e.withLabel, e.layer)
    }
    else
    {
        if ((JXG.isNumber(j[0]) || JXG.isFunction(j[0]) || JXG.isString(j[0])) && JXG.isPoint(j[1]))
        {
            g = new JXG.Circle(h, "pointRadius", j[1], j[0], e.id, e.name, e.withLabel, e.layer)
        }
        else
        {
            if ((JXG.isNumber(j[1]) || JXG.isFunction(j[1]) || JXG.isString(j[1])) && JXG.isPoint(j[0]))
            {
                g = new JXG.Circle(h, "pointRadius", j[0], j[1], e.id, e.name, e.withLabel, e.layer)
            }
            else
            {
                if ((j[0].type == JXG.OBJECT_TYPE_CIRCLE) && JXG.isPoint(j[1]))
                {
                    g = new JXG.Circle(h, "pointCircle", j[1], j[0], e.id, e.name, e.withLabel, e.layer)
                }
                else
                {
                    if ((j[1].type == JXG.OBJECT_TYPE_CIRCLE) && JXG.isPoint(j[0]))
                    {
                        g = new JXG.Circle(h, "pointCircle", j[0], j[1], e.id, e.name, e.withLabel, e.layer)
                    }
                    else
                    {
                        if ((j[0].type == JXG.OBJECT_TYPE_LINE) && JXG.isPoint(j[1]))
                        {
                            g = new JXG.Circle(h, "pointLine", j[1], j[0], e.id, e.name, e.withLabel, e.layer)
                        }
                        else
                        {
                            if ((j[1].type == JXG.OBJECT_TYPE_LINE) && JXG.isPoint(j[0]))
                            {
                                g = new JXG.Circle(h, "pointLine", j[0], j[1], e.id, e.name, e.withLabel, e.layer)
                            }
                            else
                            {
                                if (k.length == 3 && JXG.isPoint(j[0]) && JXG.isPoint(j[1]) && JXG.isPoint(j[2]))
                                {
                                    var d = JXG.createCircumcircle(h, j, e);
                                    d[0].setProperty(
                                    {
                                        visible: false
                                    });
                                    return d[1]
                                }
                                else
                                {
                                    throw new Error("JSXGraph: Can't create circle with parent types '" + (typeof k[0]) + "' and '" + (typeof k[1]) + "'.\nPossible parent types: [point,point], [point,number], [point,function], [point,circle], [point,point,point]")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return g
};
JXG.JSXGraph.registerElement("circle", JXG.createCircle);
JXG.createEllipse = function (l, n, k)
{
    var q = [],
        e, d, h, j;
    k = JXG.checkAttributes(k, {
        withLabel: JXG.readOption(l.options, "conic", "withLabel"),
        layer: null
    });
    for (h = 0; h < 2; h++)
    {
        if (n[h].length > 1)
        {
            q[h] = l.create("point", n[h], {
                visible: false,
                fixed: true
            })
        }
        else
        {
            if (JXG.isPoint(n[h]))
            {
                q[h] = JXG.getReference(l, n[h])
            }
            else
            {
                if ((typeof n[h] == "function") && (n[h]().elementClass == JXG.OBJECT_CLASS_POINT))
                {
                    q[h] = n[h]()
                }
                else
                {
                    if (JXG.isString(n[h]))
                    {
                        q[h] = JXG.getReference(l, n[h])
                    }
                    else
                    {
                        throw new Error("JSXGraph: Can't create Ellipse with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                    }
                }
            }
        }
    }
    if (JXG.isNumber(n[2]))
    {
        d = JXG.createFunction(n[2], l)
    }
    else
    {
        if ((typeof n[2] == "function") && (JXG.isNumber(n[2]())))
        {
            d = n[2]
        }
        else
        {
            if (JXG.isPoint(n[2]))
            {
                e = JXG.getReference(l, n[2])
            }
            else
            {
                if (n[2].length > 1)
                {
                    e = l.create("point", n[2], {
                        visible: false,
                        fixed: true
                    })
                }
                else
                {
                    if ((typeof n[2] == "function") && (n[2]().elementClass == JXG.OBJECT_CLASS_POINT))
                    {
                        e = n[2]()
                    }
                    else
                    {
                        if (JXG.isString(n[2]))
                        {
                            e = JXG.getReference(l, n[2])
                        }
                        else
                        {
                            throw new Error("JSXGraph: Can't create Ellipse with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "' and '" + (typeof n[2]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                        }
                    }
                }
            }
            d = function ()
            {
                return e.Dist(q[0]) + e.Dist(q[1])
            }
        }
    }
    if (typeof n[4] == "undefined")
    {
        n[4] = 1.0001 * Math.PI
    }
    if (typeof n[3] == "undefined")
    {
        n[3] = -1.0001 * Math.PI
    }
    k = JXG.checkAttributes(k, {
        curveType: "parameter"
    });
    var m = l.create("point", [function ()
    {
        return (q[0].X() + q[1].X()) * 0.5
    }, function ()
    {
        return (q[0].Y() + q[1].Y()) * 0.5
    }], {
        visible: false,
        name: "",
        withLabel: false
    });
    var p = function ()
    {
        var i = q[0].X(),
            y = q[0].Y(),
            v = q[1].X(),
            u = q[1].Y(),
            x, w, t;
        var s = (v - i > 0) ? 1 : -1;
        if (Math.abs(v - i) > 1e-7)
        {
            x = Math.atan2(u - y, v - i) + ((s < 0) ? Math.PI : 0)
        }
        else
        {
            x = ((u - y > 0) ? 0.5 : -0.5) * Math.PI
        }
        w = Math.cos(x);
        t = Math.sin(x);
        var r = [
            [1, 0, 0],
            [m.X(), w, -t],
            [m.Y(), t, w]
        ];
        return r
    };
    var f = l.create("curve", [function (i)
    {
        return 0
    }, function (i)
    {
        return 0
    },
    n[3], n[4]], k);
    var g = function (t, r)
    {
        var x = d() * 0.5,
            i = x * x,
            s = q[1].Dist(q[0]) * 0.5,
            u = i - s * s,
            w = Math.sqrt(u),
            v = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            z, y;
        if (!r)
        {
            j = p();
            z = m.X();
            y = m.Y();
            v[0][0] = j[0][0];
            v[0][1] = 0;
            v[0][2] = 0;
            v[1][0] = z * (1 - j[1][1]) + y * j[1][2];
            v[1][1] = j[1][1];
            v[1][2] = j[2][1];
            v[2][0] = y * (1 - j[1][1]) - z * j[1][2];
            v[2][1] = j[1][2];
            v[2][2] = j[2][2];
            f.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(v), JXG.Math.matMatMult([
                [-1 + z * z / (x * x) + y * y / u, -z / i, -z / u],
                [-z / i, 1 / i, 0],
                [-y / u, 0, 1 / u]
            ], v))
        }
        return JXG.Math.matVecMult(j, [1, x * Math.cos(t), w * Math.sin(t)])
    };
    f.X = function (i, r)
    {
        return g(i, r)[1]
    };
    f.Y = function (i, r)
    {
        return g(i, r)[2]
    };
    f.midpoint = m;
    f.type = JXG.OBJECT_TYPE_CONIC;
    return f
};
JXG.createHyperbola = function (l, n, k)
{
    var q = [],
        e, d, h, j;
    k = JXG.checkAttributes(k, {
        withLabel: JXG.readOption(l.options, "conic", "withLabel"),
        layer: null
    });
    for (h = 0; h < 2; h++)
    {
        if (n[h].length > 1)
        {
            q[h] = l.create("point", n[h], {
                visible: false,
                fixed: true
            })
        }
        else
        {
            if (JXG.isPoint(n[h]))
            {
                q[h] = JXG.getReference(l, n[h])
            }
            else
            {
                if ((typeof n[h] == "function") && (n[h]().elementClass == JXG.OBJECT_CLASS_POINT))
                {
                    q[h] = n[h]()
                }
                else
                {
                    if (JXG.isString(n[h]))
                    {
                        q[h] = JXG.getReference(l, n[h])
                    }
                    else
                    {
                        throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                    }
                }
            }
        }
    }
    if (JXG.isNumber(n[2]))
    {
        d = JXG.createFunction(n[2], l)
    }
    else
    {
        if ((typeof n[2] == "function") && (JXG.isNumber(n[2]())))
        {
            d = n[2]
        }
        else
        {
            if (JXG.isPoint(n[2]))
            {
                e = JXG.getReference(l, n[2])
            }
            else
            {
                if (n[2].length > 1)
                {
                    e = l.create("point", n[2], {
                        visible: false,
                        fixed: true
                    })
                }
                else
                {
                    if ((typeof n[2] == "function") && (n[2]().elementClass == JXG.OBJECT_CLASS_POINT))
                    {
                        e = n[2]()
                    }
                    else
                    {
                        if (JXG.isString(n[2]))
                        {
                            e = JXG.getReference(l, n[2])
                        }
                        else
                        {
                            throw new Error("JSXGraph: Can't create Hyperbola with parent types '" + (typeof n[0]) + "' and '" + (typeof n[1]) + "' and '" + (typeof n[2]) + "'.\nPossible parent types: [point,point,point], [point,point,number|function]")
                        }
                    }
                }
            }
            d = function ()
            {
                return e.Dist(q[0]) - e.Dist(q[1])
            }
        }
    }
    if (typeof n[4] == "undefined")
    {
        n[4] = 1.0001 * Math.PI
    }
    if (typeof n[3] == "undefined")
    {
        n[3] = -1.0001 * Math.PI
    }
    k = JXG.checkAttributes(k, {
        curveType: "parameter"
    });
    var m = l.create("point", [function ()
    {
        return (q[0].X() + q[1].X()) * 0.5
    }, function ()
    {
        return (q[0].Y() + q[1].Y()) * 0.5
    }], {
        visible: false,
        name: "",
        withLabel: false
    });
    var p = function ()
    {
        var s = q[0].X(),
            r = q[0].Y(),
            w = q[1].X(),
            u = q[1].Y(),
            t;
        var v = (w - s > 0) ? 1 : -1;
        if (Math.abs(w - s) > 1e-7)
        {
            t = Math.atan2(u - r, w - s) + ((v < 0) ? Math.PI : 0)
        }
        else
        {
            t = ((u - r > 0) ? 0.5 : -0.5) * Math.PI
        }
        var i = [
            [1, 0, 0],
            [m.X(), Math.cos(t), -Math.sin(t)],
            [m.Y(), Math.sin(t), Math.cos(t)]
        ];
        return i
    };
    var f = l.create("curve", [function (i)
    {
        return 0
    }, function (i)
    {
        return 0
    },
    n[3], n[4]], k);
    var g = function (t, r)
    {
        var x = d() * 0.5,
            i = x * x,
            s = q[1].Dist(q[0]) * 0.5,
            w = Math.sqrt(-x * x + s * s),
            u = w * w,
            v = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            z, y;
        if (!r)
        {
            j = p();
            z = m.X();
            y = m.Y();
            v[0][0] = j[0][0];
            v[0][1] = 0;
            v[0][2] = 0;
            v[1][0] = z * (1 - j[1][1]) + y * j[1][2];
            v[1][1] = j[1][1];
            v[1][2] = j[2][1];
            v[2][0] = y * (1 - j[1][1]) - z * j[1][2];
            v[2][1] = j[1][2];
            v[2][2] = j[2][2];
            f.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(v), JXG.Math.matMatMult([
                [-1 + z * z / i + y * y / u, -z / i, y / u],
                [-z / i, 1 / i, 0],
                [y / u, 0, -1 / u]
            ], v))
        }
        return JXG.Math.matVecMult(j, [1, x / Math.cos(t), w * Math.tan(t)])
    };
    f.X = function (i, r)
    {
        return g(i, r)[1]
    };
    f.Y = function (i, r)
    {
        return g(i, r)[2]
    };
    f.midpoint = m;
    f.type = JXG.OBJECT_TYPE_CONIC;
    return f
};
JXG.createParabola = function (j, m, i)
{
    var h = m[0],
        e = m[1],
        g;
    i = JXG.checkAttributes(i, {
        withLabel: JXG.readOption(j.options, "conic", "withLabel"),
        layer: null
    });
    if (m[0].length > 1)
    {
        h = j.create("point", m[0], {
            visible: false,
            fixed: true
        })
    }
    else
    {
        if (JXG.isPoint(m[0]))
        {
            h = JXG.getReference(j, m[0])
        }
        else
        {
            if ((typeof m[0] == "function") && (m[0]().elementClass == JXG.OBJECT_CLASS_POINT))
            {
                h = m[0]()
            }
            else
            {
                if (JXG.isString(m[0]))
                {
                    h = JXG.getReference(j, m[0])
                }
                else
                {
                    throw new Error("JSXGraph: Can't create Parabola with parent types '" + (typeof m[0]) + "' and '" + (typeof m[1]) + "'.\nPossible parent types: [point,line]")
                }
            }
        }
    }
    if (typeof m[3] == "undefined")
    {
        m[3] = 10
    }
    if (typeof m[2] == "undefined")
    {
        m[2] = -10
    }
    i = JXG.checkAttributes(i, {
        curveType: "parameter"
    });
    var k = j.create("point", [function ()
    {
        var l = [0, e.stdform[1], e.stdform[2]];
        l = JXG.Math.crossProduct(l, h.coords.usrCoords);
        return JXG.Math.Geometry.meetLineLine(l, e.stdform, 0, j).usrCoords
    }], {
        visible: false,
        name: "",
        withLabel: false
    });
    var n = function ()
    {
        var q = Math.atan(e.getSlope()),
            p = (k.X() + h.X()) * 0.5,
            r = (k.Y() + h.Y()) * 0.5;
        q += (h.Y() - k.Y() < 0 || (h.Y() == k.Y() && h.X() > k.X())) ? Math.PI : 0;
        var l = [
            [1, 0, 0],
            [p * (1 - Math.cos(q)) + r * Math.sin(q), Math.cos(q), -Math.sin(q)],
            [r * (1 - Math.cos(q)) - p * Math.sin(q), Math.sin(q), Math.cos(q)]
        ];
        return l
    };
    var d = j.create("curve", [function (l)
    {
        return 0
    }, function (l)
    {
        return 0
    },
    m[2], m[3]], i);
    var f = function (r, s)
    {
        var u = k.Dist(h) * 0.5,
            q = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            p = (k.X() + h.X()) * 0.5,
            l = (k.Y() + h.Y()) * 0.5;
        if (!s)
        {
            g = n();
            q[0][0] = g[0][0];
            q[0][1] = 0;
            q[0][2] = 0;
            q[1][0] = p * (1 - g[1][1]) + l * g[1][2];
            q[1][1] = g[1][1];
            q[1][2] = g[2][1];
            q[2][0] = l * (1 - g[1][1]) - p * g[1][2];
            q[2][1] = g[1][2];
            q[2][2] = g[2][2];
            d.quadraticform = JXG.Math.matMatMult(JXG.Math.transpose(q), JXG.Math.matMatMult([
                [-l * 4 * u - p * p, p, 2 * u],
                [p, -1, 0],
                [2 * u, 0, 0]
            ], q))
        }
        return JXG.Math.matVecMult(g, [1, r + p, r * r / (u * 4) + l])
    };
    d.X = function (l, p)
    {
        return f(l, p)[1]
    };
    d.Y = function (l, p)
    {
        return f(l, p)[2]
    };
    d.type = JXG.OBJECT_TYPE_CONIC;
    return d
};
JXG.createConic = function (e, v, n)
{
    var g = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ],
        A, y, x, w, f = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        q, m, s = [],
        t, r, z, l = [];
    if (v.length == 5)
    {
        z = true
    }
    else
    {
        if (v.length == 6)
        {
            z = false
        }
        else
        {
            throw new Error("JSXGraph: Can't create generic Conic with " + parent.length + " parameters.")
        }
    }
    n = JXG.checkAttributes(n, {
        withLabel: JXG.readOption(e.options, "conic", "withLabel"),
        layer: null
    });
    if (z)
    {
        for (t = 0; t < 5; t++)
        {
            if (v[t].length > 1)
            {
                s[t] = e.create("point", v[t], {
                    visible: false,
                    fixed: true
                })
            }
            else
            {
                if (JXG.isPoint(v[t]))
                {
                    s[t] = JXG.getReference(e, v[t])
                }
                else
                {
                    if ((typeof v[t] == "function") && (v[t]().elementClass == JXG.OBJECT_CLASS_POINT))
                    {
                        s[t] = v[t]()
                    }
                    else
                    {
                        if (JXG.isString(v[t]))
                        {
                            s[t] = JXG.getReference(e, v[t])
                        }
                        else
                        {
                            throw new Error("JSXGraph: Can't create Conic section with parent types '" + (typeof v[t]) + "'.\nPossible parent types: [point,point,point,point,point], [a00,a11,a22,a01,a02,a12]")
                        }
                    }
                }
            }
        }
    }
    else
    {
        r = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        r[0][0] = (JXG.isFunction(v[2])) ?
        function ()
        {
            return v[2]()
        } : function ()
        {
            return v[2]
        };
        r[0][1] = (JXG.isFunction(v[4])) ?
        function ()
        {
            return v[4]()
        } : function ()
        {
            return v[4]
        };
        r[0][2] = (JXG.isFunction(v[5])) ?
        function ()
        {
            return v[5]()
        } : function ()
        {
            return v[5]
        };
        r[1][1] = (JXG.isFunction(v[0])) ?
        function ()
        {
            return v[0]()
        } : function ()
        {
            return v[0]
        };
        r[1][2] = (JXG.isFunction(v[3])) ?
        function ()
        {
            return v[3]()
        } : function ()
        {
            return v[3]
        };
        r[2][2] = (JXG.isFunction(v[1])) ?
        function ()
        {
            return v[1]()
        } : function ()
        {
            return v[1]
        }
    }
    var h = function (p)
    {
        var C, B;
        for (C = 0; C < 3; C++)
        {
            for (B = C; B < 3; B++)
            {
                p[C][B] += p[B][C]
            }
        }
        for (C = 0; C < 3; C++)
        {
            for (B = 0; B < C; B++)
            {
                p[C][B] = p[B][C]
            }
        }
        return p
    };
    var k = function (B, p)
    {
        var E, C, D = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        for (E = 0; E < 3; E++)
        {
            for (C = 0; C < 3; C++)
            {
                D[E][C] = B[E] * p[C]
            }
        }
        return h(D)
    };
    var u = function (F, D, E)
    {
        var I, J, C, K = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
            H, G;
        C = JXG.Math.matVecMult(D, E);
        I = JXG.Math.innerProduct(E, C);
        C = JXG.Math.matVecMult(F, E);
        J = JXG.Math.innerProduct(E, C);
        for (H = 0; H < 3; H++)
        {
            for (G = 0; G < 3; G++)
            {
                K[H][G] = I * F[H][G] - J * D[H][G]
            }
        }
        return K
    };
    var j = e.create("curve", [function (i)
    {
        return 0
    }, function (i)
    {
        return 0
    },
    0, 2 * Math.PI], n);
    var d = function (E, F)
    {
        var D, C, p, B;
        if (!F)
        {
            if (z)
            {
                for (D = 0; D < 5; D++)
                {
                    l[D] = s[D].coords.usrCoords
                }
                q = k(JXG.Math.crossProduct(l[0], l[1]), JXG.Math.crossProduct(l[2], l[3]));
                m = k(JXG.Math.crossProduct(l[0], l[2]), JXG.Math.crossProduct(l[1], l[3]));
                f = u(q, m, l[4])
            }
            else
            {
                for (D = 0; D < 3; D++)
                {
                    for (C = D; C < 3; C++)
                    {
                        f[D][C] = r[D][C]();
                        if (C > D)
                        {
                            f[C][D] = f[D][C]
                        }
                    }
                }
            }
            j.quadraticform = f;
            A = JXG.Math.Numerics.Jacobi(f);
            if (A[0][0][0] < 0)
            {
                A[0][0][0] *= (-1);
                A[0][1][1] *= (-1);
                A[0][2][2] *= (-1)
            }
            for (D = 0; D < 3; D++)
            {
                p = 0;
                for (C = 0; C < 3; C++)
                {
                    p += A[1][C][D] * A[1][C][D]
                }
                p = Math.sqrt(p);
                for (C = 0; C < 3; C++)
                {
                }
            }
            g = A[1];
            w = Math.sqrt(Math.abs(A[0][0][0]));
            y = Math.sqrt(Math.abs(A[0][1][1]));
            x = Math.sqrt(Math.abs(A[0][2][2]))
        }
        if (A[0][1][1] <= 0 && A[0][2][2] <= 0)
        {
            B = JXG.Math.matVecMult(g, [1 / w, Math.cos(E) / y, Math.sin(E) / x])
        }
        else
        {
            if (A[0][1][1] <= 0 && A[0][2][2] > 0)
            {
                B = JXG.Math.matVecMult(g, [Math.cos(E) / w, 1 / y, Math.sin(E) / x])
            }
            else
            {
                if (A[0][2][2] < 0)
                {
                    B = JXG.Math.matVecMult(g, [Math.sin(E) / w, Math.cos(E) / y, 1 / x])
                }
            }
        }
        B[1] /= B[0];
        B[2] /= B[0];
        B[0] = 1;
        return B
    };
    j.X = function (i, p)
    {
        return d(i, p)[1]
    };
    j.Y = function (i, p)
    {
        return d(i, p)[2]
    };
    j.midpoint = e.create("point", [function ()
    {
        var i = j.quadraticform;
        return [i[1][1] * i[2][2] - i[1][2] * i[1][2], i[1][2] * i[0][2] - i[2][2] * i[0][1], i[0][1] * i[1][2] - i[1][1] * i[0][2]]
    }], {
        name: "",
        visible: false
    });
    j.type = JXG.OBJECT_TYPE_CONIC;
    return j
};
JXG.JSXGraph.registerElement("ellipse", JXG.createEllipse);
JXG.JSXGraph.registerElement("hyperbola", JXG.createHyperbola);
JXG.JSXGraph.registerElement("parabola", JXG.createParabola);
JXG.JSXGraph.registerElement("conic", JXG.createConic);
JXG.Polygon = function (p, q, r, f, e, g, d, k, n)
{
    var j, m, h;
    this.constructor();
    this.type = JXG.OBJECT_TYPE_POLYGON;
    this.elementClass = JXG.OBJECT_CLASS_AREA;
    this.init(p, f, e);
    if (n == null)
    {
        n = p.options.layer.polygon
    }
    this.layer = n;
    if ((typeof g == "undefined") || (g == null))
    {
        g = true
    }
    if ((typeof k == "undefined") || (k == null))
    {
        k = false
    }
    this.withLines = g;
    this.vertices = [];
    for (j = 0; j < q.length; j++)
    {
        m = JXG.getReference(this.board, q[j]);
        this.vertices[j] = m
    }
    if ((typeof r == "undefined") || (r == null))
    {
        r = [];
        for (j = 0; j < q.length - 1; j++)
        {
            r[j] =
            {
            }
        }
    }
    if (this.vertices[this.vertices.length - 1] != this.vertices[0])
    {
        this.vertices.push(this.vertices[0]);
        r.push(
        {
        })
    }
    this.visProp.fillColor = this.board.options.polygon.fillColor;
    this.visProp.highlightFillColor = this.board.options.polygon.highlightFillColor;
    this.visProp.fillOpacity = this.board.options.polygon.fillOpacity;
    this.visProp.highlightFillOpacity = this.board.options.polygon.highlightFillOpacity;
    this.borders = [];
    if (g)
    {
        for (j = 0; j < this.vertices.length - 1; j++)
        {
            h = new JXG.Line(p, this.vertices[j], this.vertices[j + 1], r[j].id, r[j].name, k, this.layer + 1);
            h.setStraight(false, false);
            this.borders[j] = h;
            h.parentPolygon = this
        }
    }
    for (j = 0; j < this.vertices.length - 1; j++)
    {
        m = JXG.getReference(this.board, this.vertices[j]);
        m.addChild(this)
    }
    this.createLabel(d, [0, 0]);
    this.id = this.board.setId(this, "Py");
    this.board.renderer.drawPolygon(this);
    this.board.finalizeAdding(this)
};
JXG.Polygon.prototype = new JXG.GeometryElement;
JXG.Polygon.prototype.hasPoint = function (d, e)
{
    return false
};
JXG.Polygon.prototype.updateRenderer = function ()
{
    if (this.needsUpdate)
    {
        this.board.renderer.updatePolygon(this);
        this.needsUpdate = false
    }
    if (this.hasLabel && this.label.content.visProp.visible)
    {
        this.label.content.update();
        this.board.renderer.updateText(this.label.content)
    }
};
JXG.Polygon.prototype.getTextAnchor = function ()
{
    var f = 0;
    var e = 0;
    var d = 0;
    var h = 0;
    f = d = this.vertices[0].X();
    e = h = this.vertices[0].Y();
    for (var g = 0; g < this.vertices.length; g++)
    {
        if (this.vertices[g].X() < f)
        {
            f = this.vertices[g].X()
        }
        if (this.vertices[g].X() > d)
        {
            d = this.vertices[g].X()
        }
        if (this.vertices[g].Y() > e)
        {
            e = this.vertices[g].Y()
        }
        if (this.vertices[g].Y() < h)
        {
            h = this.vertices[g].Y()
        }
    }
    return new JXG.Coords(JXG.COORDS_BY_USER, [(f + d) * 0.5, (e + h) * 0.5], this.board)
};
JXG.Polygon.prototype.getLabelAnchor = function ()
{
    var f = 0;
    var e = 0;
    var d = 0;
    var h = 0;
    f = d = this.vertices[0].X();
    e = h = this.vertices[0].Y();
    for (var g = 0; g < this.vertices.length; g++)
    {
        if (this.vertices[g].X() < f)
        {
            f = this.vertices[g].X()
        }
        if (this.vertices[g].X() > d)
        {
            d = this.vertices[g].X()
        }
        if (this.vertices[g].Y() > e)
        {
            e = this.vertices[g].Y()
        }
        if (this.vertices[g].Y() < h)
        {
            h = this.vertices[g].Y()
        }
    }
    return new JXG.Coords(JXG.COORDS_BY_USER, [(f + d) * 0.5, (e + h) * 0.5], this.board)
};
JXG.Polygon.prototype.cloneToBackground = function (d)
{
    var f =
    {
    },
        e;
    f.id = this.id + "T" + this.numTraces;
    this.numTraces++;
    f.vertices = this.vertices;
    f.visProp = this.visProp;
    JXG.clearVisPropOld(f);
    e = this.board.renderer.enhancedRendering;
    this.board.renderer.enhancedRendering = true;
    this.board.renderer.drawPolygon(f);
    this.board.renderer.enhancedRendering = e;
    this.traces[f.id] = f.rendNode;
    delete f
};
JXG.createPolygon = function (g, d, h)
{
    var f, e;
    h = JXG.checkAttributes(h, {
        withLabel: JXG.readOption(g.options, "polygon", "withLabel"),
        layer: null
    });
    for (e = 0; e < d.length; e++)
    {
        d[e] = JXG.getReference(g, d[e]);
        if (!JXG.isPoint(d[e]))
        {
            throw new Error("JSXGraph: Can't create polygon with parent types other than 'point'.")
        }
    }
    f = new JXG.Polygon(g, d, h.borders, h.id, h.name, h.withLines, h.withLabel, h.lineLabels, h.layer);
    return f
};
JXG.JSXGraph.registerElement("polygon", JXG.createPolygon);
JXG.Polygon.prototype.hideElement = function ()
{
    this.visProp.visible = false;
    this.board.renderer.hide(this);
    if (this.withLines)
    {
        for (var d = 0; d < this.borders.length; d++)
        {
            this.borders[d].hideElement()
        }
    }
    if (this.hasLabel && this.label != null)
    {
        this.label.hiddenByParent = true;
        if (this.label.content.visProp.visible)
        {
            this.board.renderer.hide(this.label.content)
        }
    }
};
JXG.Polygon.prototype.showElement = function ()
{
    this.visProp.visible = true;
    this.board.renderer.show(this);
    if (this.withLines)
    {
        for (var d = 0; d < this.borders.length; d++)
        {
            this.borders[d].showElement()
        }
    }
};
JXG.Polygon.prototype.Area = function ()
{
    var e = 0,
        d;
    for (d = 0; d < this.vertices.length - 1; d++)
    {
        e += (this.vertices[d].X() * this.vertices[d + 1].Y() - this.vertices[d + 1].X() * this.vertices[d].Y())
    }
    e /= 2;
    return Math.abs(e)
};
JXG.createRegularPolygon = function (l, r, k)
{
    var f, h, g, d = [],
        e, q, j, m;
    k = JXG.checkAttributes(k, {
        withLabel: JXG.readOption(l.options, "polygon", "withLabel"),
        layer: null
    });
    if (JXG.isNumber(r[r.length - 1]) && r.length != 3)
    {
        throw new Error("JSXGraph: A regular polygon needs two point and a number as input.")
    }
    j = r.length;
    g = r[j - 1];
    if ((!JXG.isNumber(g) && !JXG.isPoint(JXG.getReference(l, g))) || g < 3)
    {
        throw new Error("JSXGraph: The third parameter has to be number greater than 2 or a point.")
    }
    if (JXG.isPoint(JXG.getReference(l, g)))
    {
        g = j;
        m = true
    }
    else
    {
        j--;
        m = false
    }
    for (h = 0; h < j; h++)
    {
        r[h] = JXG.getReference(l, r[h]);
        if (!JXG.isPoint(r[h]))
        {
            throw new Error("JSXGraph: Can't create regular polygon if the first two parameters aren't points.")
        }
    }
    d[0] = r[0];
    d[1] = r[1];
    for (h = 2; h < g; h++)
    {
        e = l.create("transform", [Math.PI * (2 - (g - 2) / g), d[h - 1]], {
            type: "rotate"
        });
        if (m)
        {
            d[h] = r[h];
            d[h].addTransform(r[h - 2], e)
        }
        else
        {
            d[h] = l.create("point", [d[h - 2], e], {
                name: "",
                withLabel: false,
                fixed: true,
                face: "o",
                size: 1
            })
        }
    }
    f = l.create("polygon", d, k);
    return f
};
JXG.JSXGraph.registerElement("regularpolygon", JXG.createRegularPolygon);
JXG.Curve = function (h, e, i, d, g, f)
{
    this.constructor();
    this.points = [];
    this.type = JXG.OBJECT_TYPE_CURVE;
    this.elementClass = JXG.OBJECT_CLASS_CURVE;
    this.init(h, i, d);
    if (f == null)
    {
        f = h.options.layer.curve
    }
    this.layer = f;
    this.doAdvancedPlot = this.board.options.curve.doAdvancedPlot;
    this.numberPointsHigh = this.board.options.curve.numberPointsHigh;
    this.numberPointsLow = this.board.options.curve.numberPointsLow;
    this.numberPoints = this.numberPointsHigh;
    this.visProp.strokeWidth = this.board.options.curve.strokeWidth;
    this.visProp.highlightStrokeWidth = this.visProp.strokeWidth;
    this.visProp.visible = true;
    this.dataX = null;
    this.dataY = null;
    this.curveType = null;
    if (e[0] != null)
    {
        this.varname = e[0]
    }
    else
    {
        this.varname = "x"
    }
    this.xterm = e[1];
    this.yterm = e[2];
    this.generateTerm(this.varname, this.xterm, this.yterm, e[3], e[4]);
    this.updateCurve();
    this.createLabel(g);
    this.id = this.board.setId(this, "G");
    this.board.renderer.drawCurve(this);
    this.board.finalizeAdding(this);
    if (typeof this.xterm == "string")
    {
        this.notifyParents(this.xterm)
    }
    if (typeof this.yterm == "string")
    {
        this.notifyParents(this.yterm)
    }
};
JXG.Curve.prototype = new JXG.GeometryElement;
JXG.Curve.prototype.minX = function ()
{
    if (this.curveType == "polar")
    {
        return 0
    }
    else
    {
        var d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board);
        return d.usrCoords[1]
    }
};
JXG.Curve.prototype.maxX = function ()
{
    var d;
    if (this.curveType == "polar")
    {
        return 2 * Math.PI
    }
    else
    {
        d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [this.board.canvasWidth, 0], this.board);
        return d.usrCoords[1]
    }
};
JXG.Curve.prototype.hasPoint = function (s, r)
{
    var u, B = Infinity,
        J, m, D, C, w, v, z, f, K, A, p, H, l, G, h, n, q, F = this.numberPointsLow,
        I = (this.maxX() - this.minX()) / F,
        e = this.board.options.precision.hasPoint / (this.board.unitX * this.board.zoomX),
        g, E, k = true;
    e = e * e;
    g = new JXG.Coords(JXG.COORDS_BY_SCREEN, [s, r], this.board);
    s = g.usrCoords[1];
    r = g.usrCoords[2];
    if (this.curveType == "parameter" || this.curveType == "polar" || this.curveType == "functiongraph")
    {
        E = this.transformations.length;
        for (D = 0, u = this.minX(); D < F; D++)
        {
            w = this.X(u, k);
            v = this.Y(u, k);
            for (C = 0; C < E; C++)
            {
                m = this.transformations[C];
                m.update();
                J = JXG.Math.matVecMult(m.matrix, [1, w, v]);
                w = J[1];
                v = J[2]
            }
            B = (s - w) * (s - w) + (r - v) * (r - v);
            if (B < e)
            {
                return true
            }
            u += I
        }
    }
    else
    {
        if (this.curveType == "plot")
        {
            E = this.numberPoints;
            for (D = 0; D < E - 1; D++)
            {
                z = this.X(D);
                f = this.X(D + 1);
                K = this.Y(D);
                A = this.Y(D + 1);
                G = f - z;
                h = A - K;
                H = s - z;
                l = r - K;
                q = G * G + h * h;
                if (q >= JXG.Math.eps)
                {
                    n = H * G + l * h;
                    p = n / q;
                    B = H * H + l * l - p * n
                }
                else
                {
                    p = 0;
                    B = H * H + l * l
                }
                if (p >= 0 && p <= 1 && B < e)
                {
                    return true
                }
            }
            return false
        }
    }
    return (B < e)
};
JXG.Curve.prototype.allocatePoints = function ()
{
    var e, d;
    d = this.numberPoints;
    if (this.points.length < this.numberPoints)
    {
        for (e = this.points.length; e < d; e++)
        {
            this.points[e] = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board)
        }
    }
};
JXG.Curve.prototype.update = function ()
{
    if (this.needsUpdate)
    {
        this.updateCurve()
    }
    if (this.traced)
    {
        this.cloneToBackground(true)
    }
    return this
};
JXG.Curve.prototype.updateRenderer = function ()
{
    if (this.needsUpdate)
    {
        this.board.renderer.updateCurve(this);
        this.needsUpdate = false
    }
    if (this.hasLabel && this.label.content.visProp.visible)
    {
        this.label.content.update();
        this.board.renderer.updateText(this.label.content)
    }
    return this
};
JXG.Curve.prototype.updateDataArray = function ()
{
    return this
};
JXG.Curve.prototype.updateCurve = function ()
{
    var e, f, k, d, j, g, h = false;
    this.updateDataArray();
    f = this.minX();
    k = this.maxX();
    if (this.dataX != null)
    {
        this.numberPoints = this.dataX.length;
        e = this.numberPoints;
        this.allocatePoints();
        for (g = 0; g < e; g++)
        {
            d = g;
            if (this.dataY != null)
            {
                j = g
            }
            else
            {
                j = this.X(d)
            }
            this.points[g].setCoordinates(JXG.COORDS_BY_USER, [this.X(d, h), this.Y(j, h)], false);
            this.updateTransform(this.points[g]);
            h = true
        }
    }
    else
    {
        if (this.doAdvancedPlot)
        {
            this.updateParametricCurve(f, k, e)
        }
        else
        {
            if (this.board.updateQuality == this.board.BOARD_QUALITY_HIGH)
            {
                this.numberPoints = this.numberPointsHigh
            }
            else
            {
                this.numberPoints = this.numberPointsLow
            }
            e = this.numberPoints;
            this.allocatePoints();
            this.updateParametricCurveNaive(f, k, e)
        }
    }
    this.getLabelAnchor();
    return this
};
JXG.Curve.prototype.updateParametricCurveNaive = function (f, k, e)
{
    var h, g, j = false,
        d = (k - f) / e;
    for (h = 0; h < e; h++)
    {
        g = f + h * d;
        this.points[h].setCoordinates(JXG.COORDS_BY_USER, [this.X(g, j), this.Y(g, j)], false);
        this.updateTransform(this.points[h]);
        j = true
    }
    return this
};
JXG.Curve.prototype.updateParametricCurve = function (D, d, z)
{
    var v, n, m, f = false,
        w = new JXG.Coords(JXG.COORDS_BY_USER, [0, 0], this.board),
        l, k, B, e, p, F, E, r, h, u = [],
        g = [],
        C = [],
        A = [],
        q = false,
        s = 0;
    if (this.board.updateQuality == this.board.BOARD_QUALITY_LOW)
    {
        E = 12;
        r = 12;
        h = 12
    }
    else
    {
        E = 20;
        r = 2;
        h = 2
    }
    A[0] = d - D;
    for (v = 1; v < E; v++)
    {
        A[v] = A[v - 1] * 0.5
    }
    v = 1;
    u[0] = 1;
    g[0] = 0;
    n = D;
    w.setCoordinates(JXG.COORDS_BY_USER, [this.X(n, f), this.Y(n, f)], false);
    f = true;
    B = w.scrCoords[1];
    e = w.scrCoords[2];
    m = n;
    n = d;
    w.setCoordinates(JXG.COORDS_BY_USER, [this.X(n, f), this.Y(n, f)], false);
    l = w.scrCoords[1];
    k = w.scrCoords[2];
    C[0] = [l, k];
    p = 1;
    F = 0;
    this.points = [];
    this.points[s++] = new JXG.Coords(JXG.COORDS_BY_SCREEN, [B, e], this.board);
    do
    {
        q = this.isDistOK(B, e, l, k, r, h) || this.isSegmentOutside(B, e, l, k);
        while (F < E && (!q || F < 3) && !(!this.isSegmentDefined(B, e, l, k) && F > 8))
        {
            u[p] = v;
            g[p] = F;
            C[p] = [l, k];
            p++;
            v = 2 * v - 1;
            F++;
            n = D + v * A[F];
            w.setCoordinates(JXG.COORDS_BY_USER, [this.X(n, f), this.Y(n, f)], false);
            l = w.scrCoords[1];
            k = w.scrCoords[2];
            q = this.isDistOK(B, e, l, k, r, h) || this.isSegmentOutside(B, e, l, k)
        }
        this.points[s] = new JXG.Coords(JXG.COORDS_BY_SCREEN, [l, k], this.board);
        this.updateTransform(this.points[s]);
        s++;
        B = l;
        e = k;
        m = n;
        p--;
        l = C[p][0];
        k = C[p][1];
        F = g[p] + 1;
        v = u[p] * 2
    } while (p != 0);
    this.numberPoints = this.points.length;
    return this
};
JXG.Curve.prototype.isSegmentOutside = function (e, g, d, f)
{
    if (g < 0 && f < 0)
    {
        return true
    }
    else
    {
        if (g > this.board.canvasHeight && f > this.board.canvasHeight)
        {
            return true
        }
        else
        {
            if (e < 0 && d < 0)
            {
                return true
            }
            else
            {
                if (e > this.board.canvasWidth && d > this.board.canvasWidth)
                {
                    return true
                }
            }
        }
    }
    return false
};
JXG.Curve.prototype.isDistOK = function (g, i, f, h, e, d)
{
    if (isNaN(g + i + f + h))
    {
        return false
    }
    return (Math.abs(f - g) < d && Math.abs(h - i) < d)
};
JXG.Curve.prototype.isSegmentDefined = function (e, g, d, f)
{
    return !(isNaN(e + g) && isNaN(d + f))
};
JXG.Curve.prototype.updateTransform = function (g)
{
    var f, h, e, d = this.transformations.length;
    if (d == 0)
    {
        return g
    }
    for (e = 0; e < d; e++)
    {
        f = this.transformations[e];
        f.update();
        h = JXG.Math.matVecMult(f.matrix, g.usrCoords);
        g.setCoordinates(JXG.COORDS_BY_USER, [h[1], h[2]])
    }
    return g
};
JXG.Curve.prototype.addTransform = function (e)
{
    var g, f, d;
    if (JXG.isArray(e))
    {
        g = e
    }
    else
    {
        g = [e]
    }
    d = g.length;
    for (f = 0; f < d; f++)
    {
        this.transformations.push(g[f])
    }
    return this
};
JXG.Curve.prototype.setPosition = function (g, d, f)
{
    var e = this.board.create("transform", [d, f], {
        type: "translate"
    });
    if (this.transformations.length > 0 && this.transformations[this.transformations.length - 1].isNumericMatrix)
    {
        this.transformations[this.transformations.length - 1].melt(e)
    }
    else
    {
        this.addTransform(e)
    }
    return this
};
JXG.Curve.prototype.generateTerm = function (e, i, f, d, j)
{
    var h, g;
    if (JXG.isArray(i))
    {
        this.dataX = i;
        this.X = function (k)
        {
            return this.dataX[k]
        };
        this.curveType = "plot";
        this.numberPoints = this.dataX.length
    }
    else
    {
        this.X = JXG.createFunction(i, this.board, e);
        if (JXG.isString(i))
        {
            this.curveType = "functiongraph"
        }
        else
        {
            if (JXG.isFunction(i) || JXG.isNumber(i))
            {
                this.curveType = "parameter"
            }
        }
    }
    if (JXG.isArray(f))
    {
        this.dataY = f;
        this.Y = function (k)
        {
            if (JXG.isFunction(this.dataY[k]))
            {
                return this.dataY[k]()
            }
            else
            {
                return this.dataY[k]
            }
        }
    }
    else
    {
        this.Y = JXG.createFunction(f, this.board, e)
    }
    if (JXG.isFunction(i) && JXG.isArray(f))
    {
        h = JXG.createFunction(f[0], this.board, "");
        g = JXG.createFunction(f[1], this.board, "");
        this.X = function (k)
        {
            return (i)(k) * Math.cos(k) + h()
        };
        this.Y = function (k)
        {
            return (i)(k) * Math.sin(k) + g()
        };
        this.curveType = "polar"
    }
    if (d != null)
    {
        this.minX = JXG.createFunction(d, this.board, "")
    }
    if (j != null)
    {
        this.maxX = JXG.createFunction(j, this.board, "")
    }
};
JXG.Curve.prototype.notifyParents = function (d)
{
    JXG.GeonextParser.findDependencies(this, d, this.board)
};
JXG.Curve.prototype.getLabelAnchor = function ()
{
    var d = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, this.board.canvasHeight * 0.5], this.board);
    d = JXG.Math.Geometry.projectCoordsToCurve(d.usrCoords[1], d.usrCoords[2], 0, this, this.board)[0];
    return d
};
JXG.Curve.prototype.cloneToBackground = function (f)
{
    var j =
    {
    },
        g, e, d, h;
    j.id = this.id + "T" + this.numTraces;
    j.elementClass = JXG.OBJECT_CLASS_CURVE;
    this.numTraces++;
    j.points = this.points.slice(0);
    j.numberPoints = this.numberPoints;
    j.curveType = this.curveType;
    j.board =
    {
    };
    j.board.unitX = this.board.unitX;
    j.board.unitY = this.board.unitY;
    j.board.zoomX = this.board.zoomX;
    j.board.zoomY = this.board.zoomY;
    j.board.stretchX = this.board.stretchX;
    j.board.stretchY = this.board.stretchY;
    j.board.origin = this.board.origin;
    j.board.canvasHeight = this.board.canvasHeight;
    j.board.canvasWidth = this.board.canvasWidth;
    j.board.dimension = this.board.dimension;
    j.board.options = this.board.options;
    j.visProp = this.visProp;
    JXG.clearVisPropOld(j);
    h = this.board.renderer.enhancedRendering;
    this.board.renderer.enhancedRendering = true;
    this.board.renderer.drawCurve(j);
    this.board.renderer.enhancedRendering = h;
    this.traces[j.id] = j.rendNode;
    delete j
};
JXG.createCurve = function (f, e, d)
{
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(f.options, "curve", "withLabel"),
        layer: null
    });
    return new JXG.Curve(f, ["x"].concat(e), d.id, d.name, d.withLabel, d.layer)
};
JXG.JSXGraph.registerElement("curve", JXG.createCurve);
JXG.createFunctiongraph = function (g, e, d)
{
    var f = ["x", "x"].concat(e);
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(g.options, "curve", "withLabel"),
        layer: null
    });
    d.curveType = "functiongraph";
    return new JXG.Curve(g, f, d.id, d.name, d.withLabel, d.layer)
};
JXG.JSXGraph.registerElement("functiongraph", JXG.createFunctiongraph);
JXG.createSpline = function (f, e, d)
{
    var g;
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(f.options, "curve", "withLabel"),
        layer: null
    });
    g = function ()
    {
        var j, h = [],
            k = [];
        var i = function (p, n)
        {
            var m, l;
            if (!n)
            {
                h = [];
                k = [];
                if (e.length == 2 && JXG.isArray(e[0]) && JXG.isArray(e[1]) && e[0].length == e[1].length)
                {
                    for (m = 0; m < e[0].length; m++)
                    {
                        if (typeof e[0][m] == "function")
                        {
                            h.push(e[0][m]())
                        }
                        else
                        {
                            h.push(e[0][m])
                        }
                        if (typeof e[1][m] == "function")
                        {
                            k.push(e[1][m]())
                        }
                        else
                        {
                            k.push(e[1][m])
                        }
                    }
                }
                else
                {
                    for (m = 0; m < e.length; m++)
                    {
                        if (JXG.isPoint(e[m]))
                        {
                            h.push(e[m].X());
                            k.push(e[m].Y())
                        }
                        else
                        {
                            if (JXG.isArray(e[m]) && e[m].length == 2)
                            {
                                for (m = 0; m < e.length; m++)
                                {
                                    if (typeof e[m][0] == "function")
                                    {
                                        h.push(e[m][0]())
                                    }
                                    else
                                    {
                                        h.push(e[m][0])
                                    }
                                    if (typeof e[m][1] == "function")
                                    {
                                        k.push(e[m][1]())
                                    }
                                    else
                                    {
                                        k.push(e[m][1])
                                    }
                                }
                            }
                        }
                    }
                }
                j = JXG.Math.Numerics.splineDef(h, k)
            }
            return JXG.Math.Numerics.splineEval(p, h, k, j)
        };
        return i
    };
    return new JXG.Curve(f, ["x", "x", g()], d.id, d.name, d.withLabel, d.layer)
};
JXG.JSXGraph.registerElement("spline", JXG.createSpline);
JXG.createRiemannsum = function (i, e, d)
{
    var l, h, j, g, k;
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(i.options, "curve", "withLabel"),
        layer: null,
        fillOpacity: 0.3,
        fillColor: "#ffff00",
        curveType: "plot"
    });
    j = e[0];
    l = JXG.createFunction(e[1], i, "");
    if (l == null)
    {
        throw new Error("JSXGraph: JXG.createRiemannsum: argument '2' n has to be number or function.\nPossible parent types: [function,n:number|function,type,start:number|function,end:number|function]")
    }
    h = JXG.createFunction(e[2], i, "", false);
    if (h == null)
    {
        throw new Error("JSXGraph: JXG.createRiemannsum: argument 3 'type' has to be string or function.\nPossible parent types: [function,n:number|function,type,start:number|function,end:number|function]")
    }
    g = ["x", [0],
        [0]
    ].concat(e.slice(3));
    k = new JXG.Curve(i, g, d.id, d.name, d.withLabel, d.layer);
    k.updateDataArray = function ()
    {
        var f = JXG.Math.Numerics.riemann(j, l(), h(), this.minX(), this.maxX());
        this.dataX = f[0];
        this.dataY = f[1]
    };
    return k
};
JXG.JSXGraph.registerElement("riemannsum", JXG.createRiemannsum);
JXG.createArc = function (i, f, d)
{
    var h, j, g, e;
    if (!(JXG.isPoint(f[0]) && JXG.isPoint(f[1]) && JXG.isPoint(f[2])))
    {
        throw new Error("JSXGraph: Can't create Arc with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    j =
    {
        withLabel: JXG.readOption(i.options, "elements", "withLabel"),
        layer: JXG.readOption(i.options, "layer", "arc"),
        useDirection: false
    };
    j.strokeWidth = i.options.elements.strokeWidth;
    e = i.options.arc;
    for (g in e)
    {
        j[g] = e[g]
    }
    d = JXG.checkAttributes(d, j);
    h = i.create("curve", [
        [0],
        [0]
    ], d);
    h.type = JXG.OBJECT_TYPE_ARC;
    h.midpoint = JXG.getReference(i, f[0]);
    h.point2 = JXG.getReference(i, f[1]);
    h.point3 = JXG.getReference(i, f[2]);
    h.midpoint.addChild(h);
    h.point2.addChild(h);
    h.point3.addChild(h);
    h.useDirection = d.useDirection;
    h.updateDataArray = function ()
    {
        var z = this.point2,
            w = this.midpoint,
            u = this.point3,
            H, p, J, E, k = JXG.Math.Geometry.rad(z, w, u),
            F, D = Math.ceil(k / Math.PI * 90) + 1,
            I = k / D,
            r = w.X(),
            q = w.Y(),
            s, m, l, t, G;
        if (this.useDirection)
        {
            l = f[1].coords.usrCoords;
            t = f[3].coords.usrCoords;
            G = f[2].coords.usrCoords;
            m = (l[1] - G[1]) * (l[2] - t[2]) - (l[2] - G[2]) * (l[1] - t[1]);
            if (m < 0)
            {
                this.point2 = f[1];
                this.point3 = f[2]
            }
            else
            {
                this.point2 = f[2];
                this.point3 = f[1]
            }
        }
        this.dataX = [z.X()];
        this.dataY = [z.Y()];
        for (H = I, F = 1; F <= D; F++, H += I)
        {
            p = Math.cos(H);
            J = Math.sin(H);
            E = [
                [1, 0, 0],
                [r * (1 - p) + q * J, p, -J],
                [q * (1 - p) - r * J, J, p]
            ];
            s = JXG.Math.matVecMult(E, z.coords.usrCoords);
            this.dataX.push(s[1] / s[0]);
            this.dataY.push(s[2] / s[0])
        }
    };
    h.Radius = function ()
    {
        return this.point2.Dist(this.midpoint)
    };
    h.getRadius = function ()
    {
        return this.Radius()
    };
    h.hasPoint = function (k, t)
    {
        var m = this.board.options.precision.hasPoint / (this.board.stretchX),
            s = new JXG.Coords(JXG.COORDS_BY_SCREEN, [k, t], this.board),
            n = this.Radius(),
            q = this.midpoint.coords.distance(JXG.COORDS_BY_USER, s),
            l = (Math.abs(q - n) < m),
            p;
        if (l)
        {
            p = JXG.Math.Geometry.rad(this.point2, this.midpoint, s.usrCoords.slice(1));
            if (p > JXG.Math.Geometry.rad(this.point2, this.midpoint, this.point3))
            {
                l = false
            }
        }
        return l
    };
    h.hasPointSector = function (k, s)
    {
        var q = new JXG.Coords(JXG.COORDS_BY_SCREEN, [k, s], this.board),
            m = this.Radius(),
            p = this.midpoint.coords.distance(JXG.COORDS_BY_USER, q),
            l = (p < m),
            n;
        if (l)
        {
            n = JXG.Math.Geometry.rad(this.point2, this.midpoint, q.usrCoords.slice(1));
            if (n > JXG.Math.Geometry.rad(this.point2, this.midpoint, this.point3))
            {
                l = false
            }
        }
        return l
    };
    h.getTextAnchor = function ()
    {
        return this.midpoint.coords
    };
    h.getLabelAnchor = function ()
    {
        var m = JXG.Math.Geometry.rad(this.point2, this.midpoint, this.point3),
            v = 10 / (this.board.stretchX),
            t = 10 / (this.board.stretchY),
            r = this.point2.coords.usrCoords,
            k = this.midpoint.coords.usrCoords,
            l = r[1] - k[1],
            u = r[2] - k[2],
            s, p, n, q;
        if (this.label.content != null)
        {
            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
        }
        s = new JXG.Coords(JXG.COORDS_BY_USER, [k[1] + Math.cos(m * 0.5) * l - Math.sin(m * 0.5) * u, k[2] + Math.sin(m * 0.5) * l + Math.cos(m * 0.5) * u], this.board);
        p = s.usrCoords[1] - k[1];
        n = s.usrCoords[2] - k[2];
        q = Math.sqrt(p * p + n * n);
        p = p * (q + v) / q;
        n = n * (q + t) / q;
        return new JXG.Coords(JXG.COORDS_BY_USER, [k[1] + p, k[2] + n], this.board)
    };
    h.prepareUpdate().update();
    return h
};
JXG.JSXGraph.registerElement("arc", JXG.createArc);
JXG.createSemicircle = function (g, e, d)
{
    var f, i, h = "";
    d = JXG.checkAttributes(d, {
    });
    if (d.id != null)
    {
        h = d.id + "_mp"
    }
    if ((JXG.isPoint(e[0])) && (JXG.isPoint(e[1])))
    {
        i = g.create("midpoint", [e[0], e[1]], {
            id: h,
            withLabel: false,
            visible: false
        });
        f = g.create("arc", [i, e[1], e[0]], d)
    }
    else
    {
        throw new Error("JSXGraph: Can't create Semicircle with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "'.\nPossible parent types: [point,point]")
    }
    return f
};
JXG.JSXGraph.registerElement("semicircle", JXG.createSemicircle);
JXG.createCircumcircleArc = function (g, e, d)
{
    var f, i, h;
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(g.options, "arc", "withLabel"),
        layer: null
    });
    if (d.id != null)
    {
        h = d.id + "_mp"
    }
    if ((JXG.isPoint(e[0])) && (JXG.isPoint(e[1])) && (JXG.isPoint(e[2])))
    {
        i = g.create("circumcirclemidpoint", [e[0], e[1], e[2]], {
            id: h,
            withLabel: false,
            visible: false
        });
        d.useDirection = true;
        f = g.create("arc", [i, e[0], e[2], e[1]], d)
    }
    else
    {
        throw new Error("JSXGraph: create Circumcircle Arc with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "' and '" + (typeof e[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return f
};
JXG.JSXGraph.registerElement("circumcirclearc", JXG.createCircumcircleArc);
JXG.createSector = function (i, f, d)
{
    var h, j, g, e;
    if (!(JXG.isPoint(f[0]) && JXG.isPoint(f[1]) && JXG.isPoint(f[2])))
    {
        throw new Error("JSXGraph: Can't create Sector with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.")
    }
    j =
    {
        withLabel: JXG.readOption(i.options, "elements", "withLabel"),
        layer: JXG.readOption(i.options, "layer", "sector"),
        useDirection: false
    };
    j.strokeWidth = i.options.elements.strokeWidth;
    e = i.options.sector;
    for (g in e)
    {
        j[g] = e[g]
    }
    d = JXG.checkAttributes(d, j);
    h = i.create("curve", [
        [0],
        [0]
    ], d);
    h.type = JXG.OBJECT_TYPE_SECTOR;
    h.point1 = JXG.getReference(i, f[0]);
    h.midpoint = h.point1;
    h.point2 = JXG.getReference(i, f[1]);
    h.point3 = JXG.getReference(i, f[2]);
    h.point1.addChild(h);
    h.point2.addChild(h);
    h.point3.addChild(h);
    h.useDirection = d.useDirection;
    h.updateDataArray = function ()
    {
        var z = this.point2,
            w = this.point1,
            u = this.point3,
            H, p, J, E, k = JXG.Math.Geometry.rad(z, w, u),
            F, D = Math.ceil(k / Math.PI * 90) + 1,
            I = k / D,
            r = w.X(),
            q = w.Y(),
            s, m, l, t, G;
        if (this.useDirection)
        {
            var m, l = f[1].coords.usrCoords,
                t = f[3].coords.usrCoords,
                G = f[2].coords.usrCoords;
            m = (l[1] - G[1]) * (l[2] - t[2]) - (l[2] - G[2]) * (l[1] - t[1]);
            if (m < 0)
            {
                this.point2 = f[1];
                this.point3 = f[2]
            }
            else
            {
                this.point2 = f[2];
                this.point3 = f[1]
            }
        }
        this.dataX = [w.X(), z.X()];
        this.dataY = [w.Y(), z.Y()];
        for (H = I, F = 1; F <= D; F++, H += I)
        {
            p = Math.cos(H);
            J = Math.sin(H);
            E = [
                [1, 0, 0],
                [r * (1 - p) + q * J, p, -J],
                [q * (1 - p) - r * J, J, p]
            ];
            s = JXG.Math.matVecMult(E, z.coords.usrCoords);
            this.dataX.push(s[1] / s[0]);
            this.dataY.push(s[2] / s[0])
        }
        this.dataX.push(w.X());
        this.dataY.push(w.Y())
    };
    h.Radius = function ()
    {
        return this.point2.Dist(this.point1)
    };
    h.getRadius = function ()
    {
        return this.Radius()
    };
    h.hasPointSector = function (k, s)
    {
        var q = new JXG.Coords(JXG.COORDS_BY_SCREEN, [k, s], this.board),
            m = this.Radius(),
            p = this.point1.coords.distance(JXG.COORDS_BY_USER, q),
            l = (p < m),
            n;
        if (l)
        {
            n = JXG.Math.Geometry.rad(this.point2, this.point1, q.usrCoords.slice(1));
            if (n > JXG.Math.Geometry.rad(this.point2, this.point1, this.point3))
            {
                l = false
            }
        }
        return l
    };
    h.getTextAnchor = function ()
    {
        return this.point1.coords
    };
    h.getLabelAnchor = function ()
    {
        var m = JXG.Math.Geometry.rad(this.point2, this.point1, this.point3),
            v = 10 / (this.board.stretchX),
            t = 10 / (this.board.stretchY),
            r = this.point2.coords.usrCoords,
            k = this.point1.coords.usrCoords,
            l = r[1] - k[1],
            u = r[2] - k[2],
            s, p, n, q;
        if (this.label.content != null)
        {
            this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
        }
        s = new JXG.Coords(JXG.COORDS_BY_USER, [k[1] + Math.cos(m * 0.5) * l - Math.sin(m * 0.5) * u, k[2] + Math.sin(m * 0.5) * l + Math.cos(m * 0.5) * u], this.board);
        p = s.usrCoords[1] - k[1];
        n = s.usrCoords[2] - k[2];
        q = Math.sqrt(p * p + n * n);
        p = p * (q + v) / q;
        n = n * (q + t) / q;
        return new JXG.Coords(JXG.COORDS_BY_USER, [k[1] + p, k[2] + n], this.board)
    };
    h.prepareUpdate().update();
    return h
};
JXG.JSXGraph.registerElement("sector", JXG.createSector);
JXG.createCircumcircleSector = function (h, e, d)
{
    var g, j, i = "",
        f;
    d = JXG.checkAttributes(d, {
        withLabel: JXG.readOption(h.options, "sector", "withLabel"),
        layer: null
    });
    if (d.id != null)
    {
        i = d.id + "_mp"
    }
    if ((JXG.isPoint(e[0])) && (JXG.isPoint(e[1])) && (JXG.isPoint(e[2])))
    {
        j = h.create("circumcirclemidpoint", [e[0], e[1], e[2]], {
            id: i,
            withLabel: false,
            visible: false
        });
        d.useDirection = true;
        g = h.create("sector", [j, e[0], e[2], e[1]], d)
    }
    else
    {
        throw new Error("JSXGraph: Can't create circumcircle sector with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "' and '" + (typeof e[2]) + "'.")
    }
    return g
};
JXG.JSXGraph.registerElement("circumcirclesector", JXG.createCircumcircleSector);
JXG.createAngle = function (n, s, k)
{
    var e, d, g, y, u, v, r = ["&alpha;", "&beta;", "&gamma;", "&delta;", "&epsilon;", "&zeta;", "&eta", "&theta;", "&iota;", "&kappa;", "&lambda;", "&mu;", "&nu;", "&xi;", "&omicron;", "&pi;", "&rho;", "&sigmaf;", "&sigma;", "&tau;", "&upsilon;", "&phi;", "&chi;", "&psi;", "&omega;"],
        m = 0,
        l, h, q, f, t, w;
    g =
    {
        withLabel: JXG.readOption(n.options, "elements", "withLabel"),
        layer: JXG.readOption(n.options, "layer", "angle"),
        radius: JXG.readOption(n.options, "angle", "radius"),
        text: ""
    };
    y = n.options.angle;
    for (u in y)
    {
        g[u] = y[u]
    }
    k = JXG.checkAttributes(k, g);
    if ((JXG.isPoint(s[0])) && (JXG.isPoint(s[1])) && (JXG.isPoint(s[2])))
    {
        v = k.text;
        if (v == "")
        {
            while (m < r.length)
            {
                h = m;
                q = r[m];
                for (e in n.objects)
                {
                    if (n.objects[e].type == JXG.OBJECT_TYPE_ANGLE)
                    {
                        if (n.objects[e].text == q)
                        {
                            m++;
                            break
                        }
                    }
                }
                if (m == h)
                {
                    v = q;
                    m = r.length + 1
                }
            }
            if (m == r.length)
            {
                f = "&alpha;_{";
                t = "}";
                w = false;
                h = 0;
                while (!w)
                {
                    for (e in n.objects)
                    {
                        if (n.objects[e].type == JXG.OBJECT_TYPE_ANGLE)
                        {
                            if (n.objects[e].text == (f + h + t))
                            {
                                w = true;
                                break
                            }
                        }
                    }
                    if (w)
                    {
                        w = false
                    }
                    else
                    {
                        w = true;
                        v = (f + h + t)
                    }
                }
            }
        }
        d = n.create("point", [function ()
        {
            var i = s[0],
                x = s[1],
                j = k.radius,
                p = x.Dist(i);
            return [x.X() + (i.X() - x.X()) * j / p, x.Y() + (i.Y() - x.Y()) * j / p]
        }], {
            withLabel: false,
            visible: false
        });
        for (m = 0; m < 3; m++)
        {
            JXG.getReference(n, s[m]).addChild(d)
        }
        e = n.create("sector", [s[1], d, s[2]], k);
        e.type = JXG.OBJECT_TYPE_ANGLE;
        if (e.withLabel)
        {
            e.label.content.setText(v)
        }
        JXG.getReference(n, s[0]).addChild(e);
        e.getLabelAnchor = function ()
        {
            var p = JXG.Math.Geometry.rad(this.point2, this.point1, this.point3),
                F = 10 / (this.board.stretchX),
                D = 10 / (this.board.stretchY),
                B = this.point2.coords.usrCoords,
                i = this.point1.coords.usrCoords,
                j = B[1] - i[1],
                E = B[2] - i[2],
                C, z, x, A;
            if (this.label.content != null)
            {
                this.label.content.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], this.board)
            }
            C = new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + Math.cos(p * 0.5 * 1.125) * j - Math.sin(p * 0.5 * 1.125) * E, i[2] + Math.sin(p * 0.5 * 1.125) * j + Math.cos(p * 0.5 * 1.125) * E], this.board);
            z = C.usrCoords[1] - i[1];
            x = C.usrCoords[2] - i[2];
            A = Math.sqrt(z * z + x * x);
            z = z * (A + F) / A;
            x = x * (A + D) / A;
            return new JXG.Coords(JXG.COORDS_BY_USER, [i[1] + z, i[2] + x], this.board)
        }
    }
    else
    {
        throw new Error("JSXGraph: Can't create angle with parent types '" + (typeof s[0]) + "' and '" + (typeof s[1]) + "' and '" + (typeof s[2]) + "'.")
    }
    return e
};
JXG.JSXGraph.registerElement("angle", JXG.createAngle);
JXG.Algebra = function (d)
{
    this.board = d;
    this.eps = JXG.Math.eps
};
JXG.Algebra.prototype.angle = function (d, f, e)
{
    return JXG.Math.Geometry.angle(d, f, e)
};
JXG.Algebra.prototype.trueAngle = function (d, f, e)
{
    return this.rad(d, f, e) * 57.29577951308232
};
JXG.Algebra.prototype.rad = function (d, f, e)
{
    return JXG.Math.Geometry.rad(d, f, e)
};
JXG.Algebra.prototype.angleBisector = function (d, f, e)
{
    return JXG.Math.Geometry.angleBisector(d, f, e, this.board)
};
JXG.Algebra.prototype.reflection = function (e, d)
{
    return JXG.Math.Geometry.reflection(e, d, this.board)
};
JXG.Algebra.prototype.rotation = function (e, d, f)
{
    return JXG.Math.Geometry.rotation(e, d, f, this.board)
};
JXG.Algebra.prototype.perpendicular = function (e, d)
{
    return JXG.Math.Geometry.perpendicular(e, d, this.board)
};
JXG.Algebra.prototype.circumcenterMidpoint = function (f, e, d)
{
    return JXG.Math.Geometry.circumcenterMidpoint(f, e, d, this.board)
};
JXG.Algebra.prototype.intersectLineLine = function (e, d)
{
    return JXG.Math.Geometry.intersectLineLine(e, d, this.board)
};
JXG.Algebra.prototype.intersectCircleLine = function (e, d)
{
    return JXG.Math.Geometry.intersectCircleLine(e, d, this.board)
};
JXG.Algebra.prototype.intersectCircleCircle = function (e, d)
{
    return JXG.Math.Geometry.intersectCircleCircle(e, d, this.board)
};
JXG.Algebra.prototype.projectPointToCircle = function (d, e)
{
    return JXG.Math.Geometry.projectPointToCircle(d, e, this.board)
};
JXG.Algebra.prototype.projectPointToLine = function (d, e)
{
    return JXG.Math.Geometry.projectPointToLine(d, e, this.board)
};
JXG.Algebra.prototype.projectPointToCurve = function (d, e)
{
    return JXG.Math.Geometry.projectPointToCurve(d, e, this.board)
};
JXG.Algebra.prototype.projectCoordsToCurve = function (d, g, e, f)
{
    return JXG.Math.Geometry.projectCoordsToCurve(d, g, e, f, this.board)
};
JXG.Algebra.prototype.projectPointToTurtle = function (d, e)
{
    return JXG.Math.Geometry.projectPointToTurtle(d, e, this.board)
};
JXG.Algebra.prototype.replacePow = function (d)
{
    return JXG.GeonextParser.replacePow(d)
};
JXG.Algebra.prototype.replaceIf = function (d)
{
    return JXG.GeonextParser.replaceIf(d)
};
JXG.Algebra.prototype.replaceSub = function (d)
{
    return JXG.GeonextParser.replaceSub(d)
};
JXG.Algebra.prototype.replaceSup = function (d)
{
    return JXG.GeonextParser.replaceSup(d)
};
JXG.Algebra.prototype.replaceNameById = function (d)
{
    return JXG.GeonextParser.replaceNameById(d, this.board)
};
JXG.Algebra.prototype.replaceIdByObj = function (d)
{
    return JXG.GeonextParser.replaceIdByObj(d)
};
JXG.Algebra.prototype.geonext2JS = function (d)
{
    return JXG.GeonextParser.geonext2JS(d, this.board)
};
JXG.Algebra.prototype.findDependencies = function (e, d)
{
    JXG.GeonextParser.findDependencies(e, d, this.board)
};
JXG.Algebra.prototype.distance = function (e, d)
{
    return JXG.Math.Geometry.distance(e, d)
};
JXG.Algebra.prototype.affineDistance = function (e, d)
{
    return JXG.Math.Geometry.affineDistance(e, d)
};
JXG.Algebra.prototype.pow = function (e, d)
{
    return JXG.Math.pow(e, d)
};
JXG.Algebra.prototype.meet = function (f, d, e)
{
    return JXG.Math.Geometry.meet(f, d, e, this.board)
};
JXG.Algebra.prototype.meetLineLine = function (e, d, f)
{
    return JXG.Math.Geometry.meetLineLine(e, d, f, this.board)
};
JXG.Algebra.prototype.meetLineCircle = function (f, e, d)
{
    return JXG.Math.Geometry.meetLineCircle(f, e, d, this.board)
};
JXG.Algebra.prototype.meetCircleCircle = function (f, d, e)
{
    return JXG.Math.Geometry.meetCircleCircle(f, d, e, this.board)
};
JXG.Algebra.prototype.normalize = function (d)
{
    return JXG.Math.normalize(d)
};
JXG.Algebra.prototype.meetCurveCurve = function (f, e, d, g)
{
    return JXG.Math.Geometry.meetCurveCurve(f, e, d, g, this.board)
};
JXG.Algebra.prototype.meetCurveLine = function (e, d, f)
{
    return JXG.Math.Geometry.meetCurveLine(e, d, f, this.board)
};
JXG.Intersection = function (h, e, g, f, j, i, n, m)
{
    this.constructor();
    this.board = h;
    this.id = e;
    this.name = this.id;
    this.visProp =
    {
    };
    this.visProp.visible = true;
    this.show = true;
    this.real = true;
    this.notExistingParents =
    {
    };
    this.intersect1 = JXG.getReference(this.board, g);
    this.intersect2 = JXG.getReference(this.board, f);
    this.type = JXG.OBJECT_TYPE_INTERSECTION;
    if (((this.intersect1 == "") || (!JXG.exists(this.intersect1))) && ((this.intersect2 == "") || (!JXG.exists(this.intersect2))))
    {
        return
    }
    if (((this.intersect1.type == this.intersect2.type) && (this.intersect1.type == JXG.OBJECT_TYPE_LINE || this.intersect1.type == JXG.OBJECT_TYPE_ARROW)) || ((this.intersect1.type == JXG.OBJECT_TYPE_LINE) && (this.intersect2.type == JXG.OBJECT_TYPE_ARROW)) || ((this.intersect2.type == JXG.OBJECT_TYPE_LINE) && (this.intersect1.type == JXG.OBJECT_TYPE_ARROW)))
    {
        var k = JXG.Math.Geometry.intersectLineLine(this.intersect1, this.intersect2, this.board).usrCoords.slice(1);
        this.p = new JXG.Point(this.board, k, j, n, true);
        this.p.fixed = true;
        this.addChild(this.p);
        this.real = true;
        this.update = function ()
        {
            if (this.needsUpdate)
            {
                this.p.coords = JXG.Math.Geometry.intersectLineLine(this.intersect1, this.intersect2, this.board);
                this.needsUpdate = false
            }
        };
        this.hideElement = function ()
        {
            this.visProp.visible = false;
            this.p.hideElement()
        };
        this.showElement = function ()
        {
            this.visProp.visible = true;
            this.p.showElement()
        };
        this.hideChild = function (q)
        {
            this.notExistingParents[q] = this.board.objects[q];
            for (var p in this.descendants)
            {
                if (this.descendants[p].visProp.visible && this.descendants[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                {
                    if (this.descendants[p].type != JXG.OBJECT_TYPE_TEXT)
                    {
                        this.descendants[p].hideElement();
                        this.descendants[p].visProp.visible = true
                    }
                    else
                    {
                        if (!this.descendants[p].isLabel)
                        {
                            this.descendants[p].hideElement();
                            this.descendants[p].visProp.visible = true
                        }
                    }
                }
                this.descendants[p].notExistingParents[q] = this.board.objects[q]
            }
        };
        this.showChild = function (q)
        {
            for (var p in this.board.objects)
            {
                delete(this.board.objects[p].notExistingParents[q]);
                if (this.board.objects[p].visProp.visible && JXG.keys(this.board.objects[p].notExistingParents).length == 0)
                {
                    if (this.board.objects[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                    {
                        this.board.objects[p].showElement()
                    }
                }
            }
        }
    }
    else
    {
        if (((g.type == f.type) && (g.type == JXG.OBJECT_TYPE_CIRCLE || g.type == JXG.OBJECT_TYPE_ARC)) || (g.type == JXG.OBJECT_TYPE_CIRCLE && f.type == JXG.OBJECT_TYPE_ARC) || (f.type == JXG.OBJECT_TYPE_CIRCLE && g.type == JXG.OBJECT_TYPE_ARC))
        {
            this.p1 = new JXG.Point(this.board, [0, 0], j, n, false);
            this.p1.fixed = true;
            this.p1.label.content.visProp.visible = true;
            this.p2 = new JXG.Point(this.board, [0, 0], i, m, false);
            this.p2.fixed = true;
            this.p2.label.content.visProp.visible = true;
            this.addChild(this.p1);
            this.addChild(this.p2);
            var l = JXG.Math.Geometry.intersectCircleCircle(this.intersect1, this.intersect2, this.board);
            if (l[0] == 1)
            {
                this.p1.coords = l[1];
                this.p1.showElement();
                this.p1.updateRenderer();
                this.p2.coords = l[2];
                this.p2.showElement();
                this.p2.updateRenderer();
                this.real = true
            }
            else
            {
                this.real = false
            }
            this.update = function ()
            {
                if (!this.needsUpdate)
                {
                    return
                }
                var r = JXG.Math.Geometry.intersectCircleCircle(this.intersect1, this.intersect2, this.board);
                var q = this.p1.visProp.visible;
                var p = this.p2.visProp.visible;
                if (r[0] == 0)
                {
                    if (this.real)
                    {
                        this.hideChild(this.id);
                        this.p1.visProp.visible = q;
                        this.p2.visProp.visible = p;
                        this.real = false
                    }
                }
                else
                {
                    this.p1.coords = r[1];
                    this.p2.coords = r[2];
                    if (!this.real)
                    {
                        this.showChild(this.id);
                        this.real = true
                    }
                }
                this.needsUpdate = false
            };
            this.hideElement = function ()
            {
                this.visProp.visible = false;
                this.p1.hideElement();
                this.p2.hideElement()
            };
            this.showElement = function ()
            {
                this.visProp.visible = true;
                this.p1.showElement();
                this.p2.showElement()
            };
            this.hideChild = function (q)
            {
                this.notExistingParents[q] = this.board.objects[q];
                for (var p in this.descendants)
                {
                    if (this.descendants[p].visProp.visible && this.descendants[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                    {
                        if (this.descendants[p].type != JXG.OBJECT_TYPE_TEXT)
                        {
                            this.descendants[p].hideElement();
                            this.descendants[p].visProp.visible = true
                        }
                        else
                        {
                            if (!this.descendants[p].isLabel)
                            {
                                this.descendants[p].hideElement();
                                this.descendants[p].visProp.visible = true
                            }
                        }
                    }
                    this.descendants[p].notExistingParents[q] = this.board.objects[q]
                }
            };
            this.showChild = function (q)
            {
                var p;
                for (p in this.board.objects)
                {
                    delete(this.board.objects[p].notExistingParents[q]);
                    if (this.board.objects[p].visProp.visible && JXG.keys(this.board.objects[p].notExistingParents).length == 0)
                    {
                        if (this.board.objects[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                        {
                            this.board.objects[p].showElement()
                        }
                    }
                }
            }
        }
        else
        {
            this.p1 = new JXG.Point(this.board, [0, 0], j, n, false);
            this.p1.fixed = true;
            this.p1.label.content.visProp.visible = true;
            this.p2 = new JXG.Point(this.board, [0, 0], i, m, false);
            this.p2.fixed = true;
            this.p2.label.content.visProp.visible = true;
            this.addChild(this.p1);
            this.addChild(this.p2);
            if (this.intersect1.type == JXG.OBJECT_TYPE_LINE || this.intersect1.type == JXG.OBJECT_TYPE_ARROW)
            {
                var d = this.intersect1;
                this.intersect1 = this.intersect2;
                this.intersect2 = d
            }
            var l = JXG.Math.Geometry.intersectCircleLine(this.intersect1, this.intersect2, this.board);
            if (l[0] == 1)
            {
                this.p1.coords = l[1];
                this.p1.showElement();
                this.p1.update()
            }
            else
            {
                if (l[0] == 2)
                {
                    this.p1.coords = l[1];
                    this.p1.showElement();
                    this.p2.coords = l[2];
                    this.p2.showElement();
                    this.p1.updateRenderer();
                    this.p2.updateRenderer();
                    this.real = true
                }
                else
                {
                    this.real = false
                }
            }
            this.update = function ()
            {
                if (!this.needsUpdate)
                {
                    return
                }
                var r = JXG.Math.Geometry.intersectCircleLine(this.intersect1, this.intersect2, this.board);
                var q = this.p1.visProp.visible;
                var p = this.p2.visProp.visible;
                if (r[0] == 0)
                {
                    if (this.real)
                    {
                        this.hideChild(this.id);
                        this.p1.visProp.visible = q;
                        this.p2.visProp.visible = p;
                        this.real = false
                    }
                }
                else
                {
                    if (r[0] == 2)
                    {
                        this.p1.coords = r[1];
                        this.p2.coords = r[2];
                        if (!this.real)
                        {
                            this.showChild(this.id);
                            this.real = true
                        }
                    }
                }
                this.needsUpdate = false
            };
            this.hideElement = function ()
            {
                this.visProp.visible = false;
                this.p1.hideElement();
                this.p2.hideElement()
            };
            this.showElement = function ()
            {
                this.visProp.visible = true;
                this.p1.showElement();
                this.p2.showElement()
            };
            this.hideChild = function (q)
            {
                this.notExistingParents[q] = this.board.objects[q];
                for (var p in this.descendants)
                {
                    if (this.descendants[p].visProp.visible && this.descendants[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                    {
                        if (this.descendants[p].type != JXG.OBJECT_TYPE_TEXT)
                        {
                            this.descendants[p].hideElement();
                            this.descendants[p].visProp.visible = true
                        }
                        else
                        {
                            if (!this.descendants[p].isLabel)
                            {
                                this.descendants[p].hideElement();
                                this.descendants[p].visProp.visible = true
                            }
                        }
                    }
                    this.descendants[p].notExistingParents[q] = this.board.objects[q]
                }
            };
            this.showChild = function (q)
            {
                var p;
                for (p in this.board.objects)
                {
                    delete(this.board.objects[p].notExistingParents[q]);
                    if (this.board.objects[p].visProp.visible && JXG.keys(this.board.objects[p].notExistingParents).length == 0)
                    {
                        if (this.board.objects[p].type != JXG.OBJECT_TYPE_INTERSECTION)
                        {
                            this.board.objects[p].showElement()
                        }
                    }
                }
            }
        }
    }
    this.id = this.board.setId(this, "I");
    this.intersect1.addChild(this);
    this.intersect2.addChild(this)
};
JXG.Intersection.prototype = new JXG.GeometryElement();
JXG.Intersection.prototype.update = function ()
{
};
JXG.Intersection.prototype.hasPoint = function (d, e)
{
};
JXG.Intersection.prototype.hideChild = function (d)
{
};
JXG.Intersection.prototype.showChild = function (d)
{
};
JXG.Intersection.prototype.remove = function ()
{
    if (JXG.exists(this.p))
    {
        this.board.removeObject(this.p)
    }
    if (JXG.exists(this.p1))
    {
        this.board.removeObject(this.p1)
    }
    if (JXG.exists(this.p2))
    {
        this.board.removeObject(this.p2)
    }
};
JXG.Intersection.prototype.updateRenderer = function ()
{
};
JXG.createPerpendicularPoint = function (f, i, h)
{
    var d, g, e;
    if (JXG.isPoint(i[0]) && i[1].type == JXG.OBJECT_TYPE_LINE)
    {
        g = i[0];
        d = i[1]
    }
    else
    {
        if (JXG.isPoint(i[1]) && i[0].type == JXG.OBJECT_TYPE_LINE)
        {
            g = i[1];
            d = i[0]
        }
        else
        {
            throw new Error("JSXGraph: Can't create perpendicular point with parent types '" + (typeof i[0]) + "' and '" + (typeof i[1]) + "'.\nPossible parent types: [point,line]")
        }
    }
    e = JXG.createPoint(f, [function ()
    {
        return JXG.Math.Geometry.perpendicular(d, g, f)[0]
    }], {
        fixed: true,
        name: h.name,
        id: h.id
    });
    g.addChild(e);
    d.addChild(e);
    e.update();
    e.generatePolynomial = function ()
    {
        var k = d.point1.symbolic.x;
        var j = d.point1.symbolic.y;
        var r = d.point2.symbolic.x;
        var q = d.point2.symbolic.y;
        var t = g.symbolic.x;
        var s = g.symbolic.y;
        var n = e.symbolic.x;
        var l = e.symbolic.y;
        var p = "(" + j + ")*(" + n + ")-(" + j + ")*(" + r + ")+(" + l + ")*(" + r + ")-(" + k + ")*(" + l + ")+(" + k + ")*(" + q + ")-(" + n + ")*(" + q + ")";
        var m = "(" + s + ")*(" + j + ")-(" + s + ")*(" + q + ")-(" + l + ")*(" + j + ")+(" + l + ")*(" + q + ")+(" + t + ")*(" + k + ")-(" + t + ")*(" + r + ")-(" + n + ")*(" + k + ")+(" + n + ")*(" + r + ")";
        return [p, m]
    };
    return e
};
JXG.createPerpendicular = function (h, k, j)
{
    var i, d, e, g, f;
    k[0] = JXG.getReference(h, k[0]);
    k[1] = JXG.getReference(h, k[1]);
    if (JXG.isPoint(k[0]) && k[1].elementClass == JXG.OBJECT_CLASS_LINE)
    {
        d = k[1];
        i = k[0]
    }
    else
    {
        if (JXG.isPoint(k[1]) && k[0].elementClass == JXG.OBJECT_CLASS_LINE)
        {
            d = k[0];
            i = k[1]
        }
        else
        {
            throw new Error("JSXGraph: Can't create perpendicular with parent types '" + (typeof k[0]) + "' and '" + (typeof k[1]) + "'.\nPossible parent types: [line,point]")
        }
    }
    if (!JXG.isArray(j.id))
    {
        j.id = ["", ""]
    }
    if (!JXG.isArray(j.name))
    {
        j.name = ["", ""]
    }
    g = JXG.createPerpendicularPoint(h, [d, i], {
        fixed: true,
        name: j.name[1],
        id: j.id[1],
        visible: false
    });
    e = JXG.createSegment(h, [function ()
    {
        return (JXG.Math.Geometry.perpendicular(d, i, h)[1] ? [g, i] : [i, g])
    }], {
        name: j.name[0],
        id: j.id[0]
    });
    f = [e, g];
    f.line = e;
    f.point = g;
    f.multipleElements = true;
    return f
};
JXG.createMidpoint = function (g, i, h)
{
    var e, d, f;
    if (i.length == 2 && JXG.isPoint(i[0]) && JXG.isPoint(i[1]))
    {
        e = i[0];
        d = i[1]
    }
    else
    {
        if (i.length == 1 && i[0].elementClass == JXG.OBJECT_CLASS_LINE)
        {
            e = i[0].point1;
            d = i[0].point2
        }
        else
        {
            throw new Error("JSXGraph: Can't create midpoint.\nPossible parent types: [point,point], [line]")
        }
    }
    if (h)
    {
        h.fixed = true
    }
    else
    {
        h =
        {
            fixed: true
        }
    }
    f = g.create("point", [function ()
    {
        return (e.coords.usrCoords[1] + d.coords.usrCoords[1]) / 2
    }, function ()
    {
        return (e.coords.usrCoords[2] + d.coords.usrCoords[2]) / 2
    }], h);
    e.addChild(f);
    d.addChild(f);
    f.update();
    f.generatePolynomial = function ()
    {
        var l = e.symbolic.x;
        var k = e.symbolic.y;
        var n = d.symbolic.x;
        var m = d.symbolic.y;
        var q = f.symbolic.x;
        var p = f.symbolic.y;
        var j = "(" + k + ")*(" + q + ")-(" + k + ")*(" + n + ")+(" + p + ")*(" + n + ")-(" + l + ")*(" + p + ")+(" + l + ")*(" + m + ")-(" + q + ")*(" + m + ")";
        var r = "(" + l + ")^2 - 2*(" + l + ")*(" + q + ")+(" + k + ")^2-2*(" + k + ")*(" + p + ")-(" + n + ")^2+2*(" + n + ")*(" + q + ")-(" + m + ")^2+2*(" + m + ")*(" + p + ")";
        return [j, r]
    };
    if (JXG.nullAtts)
    {
        h = null
    }
    return f
};
JXG.createParallelPoint = function (f, j, i)
{
    var e, d, h, g;
    if (j.length == 3 && j[0].elementClass == JXG.OBJECT_CLASS_POINT && j[1].elementClass == JXG.OBJECT_CLASS_POINT && j[2].elementClass == JXG.OBJECT_CLASS_POINT)
    {
        e = j[0];
        d = j[1];
        h = j[2]
    }
    else
    {
        if (j[0].elementClass == JXG.OBJECT_CLASS_POINT && j[1].elementClass == JXG.OBJECT_CLASS_LINE)
        {
            h = j[0];
            e = j[1].point1;
            d = j[1].point2
        }
        else
        {
            if (j[1].elementClass == JXG.OBJECT_CLASS_POINT && j[0].elementClass == JXG.OBJECT_CLASS_LINE)
            {
                h = j[1];
                e = j[0].point1;
                d = j[0].point2
            }
            else
            {
                throw new Error("JSXGraph: Can't create parallel point with parent types '" + (typeof j[0]) + "', '" + (typeof j[1]) + "' and '" + (typeof j[2]) + "'.\nPossible parent types: [line,point], [point,point,point]")
            }
        }
    }
    g = f.create("point", [function ()
    {
        return h.coords.usrCoords[1] + d.coords.usrCoords[1] - e.coords.usrCoords[1]
    }, function ()
    {
        return h.coords.usrCoords[2] + d.coords.usrCoords[2] - e.coords.usrCoords[2]
    }], i);
    e.addChild(g);
    d.addChild(g);
    h.addChild(g);
    g.update();
    g.generatePolynomial = function ()
    {
        var l = e.symbolic.x;
        var k = e.symbolic.y;
        var u = d.symbolic.x;
        var t = d.symbolic.y;
        var n = h.symbolic.x;
        var m = h.symbolic.y;
        var r = g.symbolic.x;
        var p = g.symbolic.y;
        var s = "(" + t + ")*(" + r + ")-(" + t + ")*(" + n + ")-(" + k + ")*(" + r + ")+(" + k + ")*(" + n + ")-(" + p + ")*(" + u + ")+(" + p + ")*(" + l + ")+(" + m + ")*(" + u + ")-(" + m + ")*(" + l + ")";
        var q = "(" + p + ")*(" + l + ")-(" + p + ")*(" + n + ")-(" + t + ")*(" + l + ")+(" + t + ")*(" + n + ")-(" + r + ")*(" + k + ")+(" + r + ")*(" + m + ")+(" + u + ")*(" + k + ")-(" + u + ")*(" + m + ")";
        return [s, q]
    };
    return g
};
JXG.createParallel = function (h, f, l)
{
    var k, d, g, i;
    i =
    {
        name: null,
        id: null,
        fixed: true,
        visible: false
    };
    if (JXG.isArray(l.name) && l.name.length == 2)
    {
        i.name = l.name[1];
        l.name = l.name[0]
    }
    else
    {
        i.name = l.name + "p2"
    }
    if (JXG.isArray(l.id) && l.id.length == 2)
    {
        i.id = l.id[1];
        l.id = l.id[0]
    }
    else
    {
        if (JXG.exists(l.id))
        {
            i.id = l.id + "p2"
        }
    }
    try
    {
        d = JXG.createParallelPoint(h, f, i)
    }
    catch (j)
    {
        throw new Error("JSXGraph: Can't create parallel with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [line,point], [point,point,point]")
    }
    k = null;
    if (f.length == 3)
    {
        k = f[2]
    }
    else
    {
        if (f[0].elementClass == JXG.OBJECT_CLASS_POINT)
        {
            k = f[0]
        }
        else
        {
            if (f[1].elementClass == JXG.OBJECT_CLASS_POINT)
            {
                k = f[1]
            }
        }
    }
    g = h.create("line", [k, d], l);
    return g
};
JXG.createArrowParallel = function (g, f, j)
{
    var d, h;
    try
    {
        d = JXG.createParallel(g, f, j)
    }
    catch (i)
    {
        throw new Error("JSXGraph: Can't create arrowparallel with parent types '" + (typeof f[0]) + "' and '" + (typeof f[1]) + "'.\nPossible parent types: [line,point], [point,point,point]")
    }
    d.setStraight(false, false);
    d.setArrow(false, true);
    return d
};
JXG.createNormal = function (h, e, d)
{
    var k;
    var l;
    if (e.length == 1)
    {
        k = e[0];
        l = k.slideObject
    }
    else
    {
        if (e.length == 2)
        {
            if (JXG.isPoint(e[0]))
            {
                k = e[0];
                l = e[1]
            }
            else
            {
                if (JXG.isPoint(e[1]))
                {
                    l = e[0];
                    k = e[1]
                }
                else
                {
                    throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
                }
            }
        }
        else
        {
            throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
        }
    }
    if (l.elementClass == JXG.OBJECT_CLASS_LINE)
    {
        return h.create("line", [function ()
        {
            return l.stdform[1] * k.Y() - l.stdform[2] * k.X()
        }, function ()
        {
            return l.stdform[2] * k.Z()
        }, function ()
        {
            return -l.stdform[1] * k.Z()
        }], d)
    }
    else
    {
        if (l.elementClass == JXG.OBJECT_CLASS_CIRCLE)
        {
            return h.create("line", [l.midpoint, k], d)
        }
        else
        {
            if (l.elementClass == JXG.OBJECT_CLASS_CURVE)
            {
                if (l.curveType != "plot")
                {
                    var i = l.X;
                    var j = l.Y;
                    return h.create("line", [function ()
                    {
                        return -k.X() * h.D(i)(k.position) - k.Y() * h.D(j)(k.position)
                    }, function ()
                    {
                        return h.D(i)(k.position)
                    }, function ()
                    {
                        return h.D(j)(k.position)
                    }], d)
                }
                else
                {
                    return h.create("line", [function ()
                    {
                        var g = Math.floor(k.position);
                        var f = k.position - g;
                        if (g == l.numberPoints - 1)
                        {
                            g--;
                            f = 1
                        }
                        if (g < 0)
                        {
                            return 1
                        }
                        return (l.Y(g) + f * (l.Y(g + 1) - l.Y(g))) * (l.Y(g) - l.Y(g + 1)) - (l.X(g) + f * (l.X(g + 1) - l.X(g))) * (l.X(g + 1) - l.X(g))
                    }, function ()
                    {
                        var f = Math.floor(k.position);
                        if (f == l.numberPoints - 1)
                        {
                            f--
                        }
                        if (f < 0)
                        {
                            return 0
                        }
                        return l.X(f + 1) - l.X(f)
                    }, function ()
                    {
                        var f = Math.floor(k.position);
                        if (f == l.numberPoints - 1)
                        {
                            f--
                        }
                        if (f < 0)
                        {
                            return 0
                        }
                        return l.Y(f + 1) - l.Y(f)
                    }], d)
                }
            }
            else
            {
                if (l.type == JXG.OBJECT_TYPE_TURTLE)
                {
                    return h.create("line", [function ()
                    {
                        var m = Math.floor(k.position);
                        var f = k.position - m;
                        var n, g;
                        for (g = 0; g < l.objects.length; g++)
                        {
                            n = l.objects[g];
                            if (n.type == JXG.OBJECT_TYPE_CURVE)
                            {
                                if (m < n.numberPoints)
                                {
                                    break
                                }
                                m -= n.numberPoints
                            }
                        }
                        if (m == n.numberPoints - 1)
                        {
                            m--;
                            f = 1
                        }
                        if (m < 0)
                        {
                            return 1
                        }
                        return (n.Y(m) + f * (n.Y(m + 1) - n.Y(m))) * (n.Y(m) - n.Y(m + 1)) - (n.X(m) + f * (n.X(m + 1) - n.X(m))) * (n.X(m + 1) - n.X(m))
                    }, function ()
                    {
                        var g = Math.floor(k.position);
                        var m, f;
                        for (f = 0; f < l.objects.length; f++)
                        {
                            m = l.objects[f];
                            if (m.type == JXG.OBJECT_TYPE_CURVE)
                            {
                                if (g < m.numberPoints)
                                {
                                    break
                                }
                                g -= m.numberPoints
                            }
                        }
                        if (g == m.numberPoints - 1)
                        {
                            g--
                        }
                        if (g < 0)
                        {
                            return 0
                        }
                        return m.X(g + 1) - m.X(g)
                    }, function ()
                    {
                        var g = Math.floor(k.position);
                        var m, f;
                        for (f = 0; f < l.objects.length; f++)
                        {
                            m = l.objects[f];
                            if (m.type == JXG.OBJECT_TYPE_CURVE)
                            {
                                if (g < m.numberPoints)
                                {
                                    break
                                }
                                g -= m.numberPoints
                            }
                        }
                        if (g == m.numberPoints - 1)
                        {
                            g--
                        }
                        if (g < 0)
                        {
                            return 0
                        }
                        return m.Y(g + 1) - m.Y(g)
                    }], d)
                }
                else
                {
                    throw new Error("JSXGraph: Can't create normal with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "'.\nPossible parent types: [point,line], [point,circle], [glider]")
                }
            }
        }
    }
};
JXG.createBisector = function (f, k, j)
{
    var h, d, g, e;
    if (k[0].elementClass == JXG.OBJECT_CLASS_POINT && k[1].elementClass == JXG.OBJECT_CLASS_POINT && k[2].elementClass == JXG.OBJECT_CLASS_POINT)
    {
        g =
        {
            name: "",
            id: null,
            fixed: true,
            visible: false
        };
        if (j)
        {
            g = JXG.cloneAndCopy(j, g)
        }
        h = f.create("point", [function ()
        {
            return JXG.Math.Geometry.angleBisector(k[0], k[1], k[2], f)
        }], g);
        for (e = 0; e < 3; e++)
        {
            k[e].addChild(h)
        }
        if (typeof j.straightFirst == "undefined")
        {
            j.straightFirst = false
        }
        if (typeof j.straightLast == "undefined")
        {
            j.straightLast = true
        }
        d = JXG.createLine(f, [k[1], h], j);
        return d
    }
    else
    {
        throw new Error("JSXGraph: Can't create angle bisector with parent types '" + (typeof k[0]) + "' and '" + (typeof k[1]) + "'.\nPossible parent types: [point,point,point]")
    }
};
JXG.createAngularBisectorsOfTwoLines = function (j, l, g)
{
    var f = JXG.getReference(j, l[0]),
        e = JXG.getReference(j, l[1]),
        n = "",
        m = "",
        k = "",
        h = "",
        i;
    if (f.elementClass != JXG.OBJECT_CLASS_LINE || e.elementClass != JXG.OBJECT_CLASS_LINE)
    {
        throw new Error("JSXGraph: Can't create angle bisectors of two lines with parent types '" + (typeof l[0]) + "' and '" + (typeof l[1]) + "'.\nPossible parent types: [line,line]")
    }
    g = JXG.checkAttributes(g, {
    });
    if (g.id != null)
    {
        if (JXG.isArray(g.id))
        {
            n = g.id[0];
            m = g.id[1]
        }
        else
        {
            n = g.id;
            m = g.id
        }
    }
    if (g.name != null)
    {
        if (JXG.isArray(g.name))
        {
            k = g.name[0];
            h = g.name[1]
        }
        else
        {
            k = g.name;
            h = g.name
        }
    }
    g.id = n;
    g.name = k;
    var d = j.create("line", [function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[0] / r - e.stdform[0] / q
    }, function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[1] / r - e.stdform[1] / q
    }, function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[2] / r - e.stdform[2] / q
    }], g);
    g.id = m;
    g.name = h;
    var p = j.create("line", [function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[0] / r + e.stdform[0] / q
    }, function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[1] / r + e.stdform[1] / q
    }, function ()
    {
        var r = Math.sqrt(f.stdform[1] * f.stdform[1] + f.stdform[2] * f.stdform[2]);
        var q = Math.sqrt(e.stdform[1] * e.stdform[1] + e.stdform[2] * e.stdform[2]);
        return f.stdform[2] / r + e.stdform[2] / q
    }], g);
    i = [d, p];
    i.lines = [d, p];
    i.line1 = d;
    i.line2 = p;
    i.multipleElements = true;
    return i
};
JXG.createCircumcircleMidpoint = function (f, d, h)
{
    var g, e;
    if (d[0].elementClass == JXG.OBJECT_CLASS_POINT && d[1].elementClass == JXG.OBJECT_CLASS_POINT && d[2].elementClass == JXG.OBJECT_CLASS_POINT)
    {
        h.fixed = h.fixed || true;
        g = JXG.createPoint(f, [function ()
        {
            return JXG.Math.Geometry.circumcenterMidpoint(d[0], d[1], d[2], f)
        }], h);
        for (e = 0; e < 3; e++)
        {
            d[e].addChild(g)
        }
        g.generatePolynomial = function ()
        {
            var j = a.symbolic.x;
            var i = a.symbolic.y;
            var s = b.symbolic.x;
            var r = b.symbolic.y;
            var l = c.symbolic.x;
            var k = c.symbolic.y;
            var p = g.symbolic.x;
            var m = g.symbolic.y;
            var q = ["((", p, ")-(", j, "))^2+((", m, ")-(", i, "))^2-((", p, ")-(", s, "))^2-((", m, ")-(", r, "))^2"].join("");
            var n = ["((", p, ")-(", j, "))^2+((", m, ")-(", i, "))^2-((", p, ")-(", l, "))^2-((", m, ")-(", k, "))^2"].join("");
            return [q, n]
        };
        return g
    }
    else
    {
        throw new Error("JSXGraph: Can't create circumcircle midpoint with parent types '" + (typeof d[0]) + "', '" + (typeof d[1]) + "' and '" + (typeof d[2]) + "'.\nPossible parent types: [point,point,point]")
    }
};
JXG.createIncenter = function (i, l, h)
{
    var f, k, j, g, e, d;
    if (l.length >= 3 && JXG.isPoint(l[0]) && JXG.isPoint(l[1]) && JXG.isPoint(l[2]))
    {
        g = l[0];
        e = l[1];
        d = l[2];
        f = i.create("point", [function ()
        {
            var n, m, p;
            n = Math.sqrt((e.X() - d.X()) * (e.X() - d.X()) + (e.Y() - d.Y()) * (e.Y() - d.Y()));
            m = Math.sqrt((g.X() - d.X()) * (g.X() - d.X()) + (g.Y() - d.Y()) * (g.Y() - d.Y()));
            p = Math.sqrt((e.X() - g.X()) * (e.X() - g.X()) + (e.Y() - g.Y()) * (e.Y() - g.Y()));
            return new JXG.Coords(JXG.COORDS_BY_USER, [(n * g.X() + m * e.X() + p * d.X()) / (n + m + p), (n * g.Y() + m * e.Y() + p * d.Y()) / (n + m + p)], i)
        }], h)
    }
    else
    {
        throw new Error("JSXGraph: Can't create incenter with parent types '" + (typeof l[0]) + "', '" + (typeof l[1]) + "' and '" + (typeof l[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    return f
};
JXG.createCircumcircle = function (f, l, k)
{
    var i, j, g, d;
    g = JXG.clone(k);
    if (k.name && JXG.isArray(k.name))
    {
        g.name = k.name[0];
        k.name = k.name[1]
    }
    if (k.id && JXG.isArray(k.id))
    {
        g.id = k.id[0];
        k.id = k.id[1]
    }
    try
    {
        i = JXG.createCircumcircleMidpoint(f, l, g);
        j = JXG.createCircle(f, [i, l[0]], k)
    }
    catch (h)
    {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + (typeof l[0]) + "', '" + (typeof l[1]) + "' and '" + (typeof l[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    d = [i, j];
    d.point = i;
    d.circle = j;
    d.multipleElements = true;
    return d
};
JXG.createIncircle = function (g, f, l)
{
    var j, k, h, d;
    h = JXG.clone(l);
    if (l.name && JXG.isArray(l.name))
    {
        h.name = l.name[0];
        l.name = l.name[1]
    }
    if (l.id && JXG.isArray(l.id))
    {
        h.id = l.id[0];
        l.id = l.id[1]
    }
    try
    {
        j = JXG.createIncenter(g, f, h);
        k = JXG.createCircle(g, [j, function ()
        {
            var m = Math.sqrt((f[1].X() - f[2].X()) * (f[1].X() - f[2].X()) + (f[1].Y() - f[2].Y()) * (f[1].Y() - f[2].Y())),
                e = Math.sqrt((f[0].X() - f[2].X()) * (f[0].X() - f[2].X()) + (f[0].Y() - f[2].Y()) * (f[0].Y() - f[2].Y())),
                p = Math.sqrt((f[1].X() - f[0].X()) * (f[1].X() - f[0].X()) + (f[1].Y() - f[0].Y()) * (f[1].Y() - f[0].Y())),
                n = (m + e + p) / 2;
            return Math.sqrt(((n - m) * (n - e) * (n - p)) / n)
        }], l)
    }
    catch (i)
    {
        throw new Error("JSXGraph: Can't create circumcircle with parent types '" + (typeof f[0]) + "', '" + (typeof f[1]) + "' and '" + (typeof f[2]) + "'.\nPossible parent types: [point,point,point]")
    }
    d = [j, k];
    d.point = j;
    d.circle = k;
    d.multipleElements = true;
    return d
};
JXG.createReflection = function (e, i, h)
{
    var d, g, f;
    if (i[0].elementClass == JXG.OBJECT_CLASS_POINT && i[1].elementClass == JXG.OBJECT_CLASS_LINE)
    {
        g = i[0];
        d = i[1]
    }
    else
    {
        if (i[1].elementClass == JXG.OBJECT_CLASS_POINT && i[0].elementClass == JXG.OBJECT_CLASS_LINE)
        {
            g = i[1];
            d = i[0]
        }
        else
        {
            throw new Error("JSXGraph: Can't create reflection point with parent types '" + (typeof i[0]) + "' and '" + (typeof i[1]) + "'.\nPossible parent types: [line,point]")
        }
    }
    f = JXG.createPoint(e, [function ()
    {
        return JXG.Math.Geometry.reflection(d, g, e)
    }], h);
    g.addChild(f);
    d.addChild(f);
    f.update();
    f.generatePolynomial = function ()
    {
        var k = d.point1.symbolic.x;
        var j = d.point1.symbolic.y;
        var r = d.point2.symbolic.x;
        var q = d.point2.symbolic.y;
        var t = g.symbolic.x;
        var s = g.symbolic.y;
        var m = f.symbolic.x;
        var l = f.symbolic.y;
        var p = ["((", l, ")-(", s, "))*((", j, ")-(", q, "))+((", k, ")-(", r, "))*((", m, ")-(", t, "))"].join("");
        var n = ["((", m, ")-(", k, "))^2+((", l, ")-(", j, "))^2-((", t, ")-(", k, "))^2-((", s, ")-(", j, "))^2"].join("");
        return [p, n]
    };
    return f
};
JXG.createMirrorPoint = function (e, h, g)
{
    var f, d;
    if (JXG.isPoint(h[0]) && JXG.isPoint(h[1]))
    {
        g.fixed = g.fixed || true;
        f = JXG.createPoint(e, [function ()
        {
            return JXG.Math.Geometry.rotation(h[0], h[1], Math.PI, e)
        }], g);
        for (d = 0; d < 2; d++)
        {
            h[d].addChild(f)
        }
    }
    else
    {
        throw new Error("JSXGraph: Can't create mirror point with parent types '" + (typeof h[0]) + "' and '" + (typeof h[1]) + "'.\nPossible parent types: [point,point]")
    }
    f.update();
    return f
};
JXG.createIntegral = function (i, y, m)
{
    var x, u, r =
    {
    },
        g = 0,
        f = 0,
        e, d, l, k, s = 1,
        w, n, h, z, j, q, v;
    if (!JXG.isArray(m.id) || (m.id.length != 5))
    {
        m.id = ["", "", "", "", ""]
    }
    if (!JXG.isArray(m.name) || (m.name.length != 5))
    {
        m.name = ["", "", "", "", ""]
    }
    if (JXG.isArray(y[0]) && y[1].elementClass == JXG.OBJECT_CLASS_CURVE)
    {
        x = y[0];
        u = y[1]
    }
    else
    {
        if (JXG.isArray(y[1]) && y[0].elementClass == JXG.OBJECT_CLASS_CURVE)
        {
            x = y[1];
            u = y[0]
        }
        else
        {
            throw new Error("JSXGraph: Can't create integral with parent types '" + (typeof y[0]) + "' and '" + (typeof y[1]) + "'.\nPossible parent types: [[number|function,number|function],curve]")
        }
    }
    if ((typeof m != "undefined") && (m != null))
    {
        r = JXG.cloneAndCopy(m, {
            name: m.name[0],
            id: m.id[0]
        })
    }
    g = x[0];
    f = x[1];
    if (JXG.isFunction(g))
    {
        e = g;
        d = function ()
        {
            return u.yterm(e())
        };
        g = e()
    }
    else
    {
        e = g;
        d = u.yterm(g)
    }
    if (JXG.isFunction(g))
    {
        l = f;
        k = function ()
        {
            return u.yterm(l())
        };
        f = l()
    }
    else
    {
        l = f;
        k = u.yterm(f)
    }
    if (f < g)
    {
        s = -1
    }
    w = i.create("glider", [e, d, u], r);
    if (JXG.isFunction(e))
    {
        w.hideElement()
    }
    r.name = m.name[1];
    r.id = m.id[1];
    r.visible = false;
    n = i.create("point", [function ()
    {
        return w.X()
    },
    0], r);
    r.name = m.name[2];
    r.id = m.id[2];
    r.visible = m.visible || true;
    h = i.create("glider", [l, k, u], r);
    if (JXG.isFunction(l))
    {
        h.hideElement()
    }
    r.name = m.name[3];
    r.id = m.id[3];
    r.visible = false;
    z = i.create("point", [function ()
    {
        return h.X()
    },
    0], r);
    j = JXG.Math.Numerics.I([g, f], u.yterm);
    q = i.create("text", [function ()
    {
        return h.X() + 0.2
    }, function ()
    {
        return h.Y() - 0.8
    }, function ()
    {
        var p = JXG.Math.Numerics.I([n.X(), z.X()], u.yterm);
        return "&int; = " + (p).toFixed(4)
    }], {
        labelColor: m.labelColor
    });
    r.name = m.name[4];
    r.id = m.id[4];
    r.visible = m.visible || true;
    r.fillColor = r.fillColor || i.options.polygon.fillColor;
    r.highlightFillColor = r.highlightFillColor || i.options.polygon.highlightFillColor;
    r.fillOpacity = r.fillOpacity || i.options.polygon.fillOpacity;
    r.highlightFillOpacity = r.highlightFillOpacity || i.options.polygon.highlightFillOpacity;
    r.strokeWidth = 0;
    r.highlightStrokeWidth = 0;
    r.strokeOpacity = 0;
    v = i.create("curve", [
        [0],
        [0]
    ], r);
    v.updateDataArray = function ()
    {
        var p, C, A, B, t;
        if (n.X() < z.X())
        {
            B = n.X();
            t = z.X()
        }
        else
        {
            B = z.X();
            t = n.X()
        }
        p = [B, B];
        C = [0, u.yterm(B)];
        for (A = 0; A < u.numberPoints; A++)
        {
            if ((B <= u.points[A].usrCoords[1]) && (u.points[A].usrCoords[1] <= t))
            {
                p.push(u.points[A].usrCoords[1]);
                C.push(u.points[A].usrCoords[2])
            }
        }
        p.push(t);
        C.push(u.yterm(t));
        p.push(t);
        C.push(0);
        p.push(B);
        C.push(0);
        this.dataX = p;
        this.dataY = C
    };
    w.addChild(v);
    h.addChild(v);
    w.addChild(q);
    h.addChild(q);
    return v
};
JXG.createLocus = function (f, e, d)
{
    var h, g;
    if (JXG.isArray(e) && e.length == 1 && e[0].elementClass == JXG.OBJECT_CLASS_POINT)
    {
        g = e[0]
    }
    else
    {
        throw new Error("JSXGraph: Can't create locus with parent of type other than point.\nPossible parent types: [point]")
    }
    h = f.create("curve", [
        [null],
        [null]
    ], d);
    h.dontCallServer = false;
    h.updateDataArray = function ()
    {
        if (h.board.mode > 0)
        {
            return
        }
        var j = JXG.Math.Symbolic.generatePolynomials(f, g, true).join("");
        if (j === h.spe)
        {
            return
        }
        h.spe = j;
        var i = function (m, p, l, n)
        {
            h.dataX = m;
            h.dataY = p;
            h.eq = l;
            h.ctime = n;
            h.generatePolynomial = (function (q)
            {
                return function (s)
                {
                    var r = "(" + s.symbolic.x + ")",
                        v = "(" + s.symbolic.y + ")",
                        u = [],
                        t;
                    for (t = 0; t < q.length; t++)
                    {
                        u[t] = q[t].replace(/\*\*/g, "^").replace(/x/g, r).replace(/y/g, v)
                    }
                    return u
                }
            })(l)
        },
            k = JXG.Math.Symbolic.geometricLocusByGroebnerBase(f, g, i);
        i(k.datax, k.datay, k.polynomial, k.exectime)
    };
    return h
};
JXG.JSXGraph.registerElement("arrowparallel", JXG.createArrowParallel);
JXG.JSXGraph.registerElement("bisector", JXG.createBisector);
JXG.JSXGraph.registerElement("bisectorlines", JXG.createAngularBisectorsOfTwoLines);
JXG.JSXGraph.registerElement("circumcircle", JXG.createCircumcircle);
JXG.JSXGraph.registerElement("circumcirclemidpoint", JXG.createCircumcircleMidpoint);
JXG.JSXGraph.registerElement("circumcenter", JXG.createCircumcircleMidpoint);
JXG.JSXGraph.registerElement("incenter", JXG.createIncenter);
JXG.JSXGraph.registerElement("incircle", JXG.createIncircle);
JXG.JSXGraph.registerElement("integral", JXG.createIntegral);
JXG.JSXGraph.registerElement("midpoint", JXG.createMidpoint);
JXG.JSXGraph.registerElement("mirrorpoint", JXG.createMirrorPoint);
JXG.JSXGraph.registerElement("normal", JXG.createNormal);
JXG.JSXGraph.registerElement("parallel", JXG.createParallel);
JXG.JSXGraph.registerElement("parallelpoint", JXG.createParallelPoint);
JXG.JSXGraph.registerElement("perpendicular", JXG.createPerpendicular);
JXG.JSXGraph.registerElement("perpendicularpoint", JXG.createPerpendicularPoint);
JXG.JSXGraph.registerElement("reflection", JXG.createReflection);
JXG.JSXGraph.registerElement("locus", JXG.createLocus);
JXG.Text = function (l, q, i, p, f, d, g, n, m, k)
{
    this.constructor();
    this.type = JXG.OBJECT_TYPE_TEXT;
    this.elementClass = JXG.OBJECT_CLASS_OTHER;
    this.init(l, f, d);
    this.contentStr = q;
    this.plaintextStr = "";
    if (k == null)
    {
        k = l.options.layer.text
    }
    this.layer = k;
    this.display = m || "html";
    if ((typeof n != "undefined") && (n != null))
    {
        this.isLabel = n
    }
    else
    {
        this.isLabel = false
    }
    this.visProp.strokeColor = this.board.options.text.strokeColor;
    this.visProp.visible = true;
    if (g != null)
    {
        this.digits = g
    }
    else
    {
        this.digits = 2
    }
    if ((this.element = this.board.objects[i]))
    {
        var h;
        if (!this.isLabel)
        {
            h = this.element.getTextAnchor()
        }
        else
        {
            h = this.element.getLabelAnchor()
        }
        this.element.addChild(this);
        this.relativeCoords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [parseFloat(p[0]), parseFloat(p[1])], this.board);
        this.coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, [this.relativeCoords.scrCoords[1] + h.scrCoords[1], this.relativeCoords.scrCoords[2] + h.scrCoords[2]], this.board)
    }
    else
    {
        this.X = JXG.createFunction(p[0], this.board, "");
        this.Y = JXG.createFunction(p[1], this.board, "");
        this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.X(), this.Y()], this.board);
        var j = "this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.X(),this.Y()]);";
        this.updateCoords = new Function("", j)
    }
    if (typeof this.contentStr == "function")
    {
        this.updateText = function ()
        {
            this.plaintextStr = this.contentStr()
        }
    }
    else
    {
        var e;
        if (typeof this.contentStr == "number")
        {
            e = (this.contentStr).toFixed(this.digits)
        }
        else
        {
            if (this.board.options.text.useASCIIMathML)
            {
                e = "'`" + this.contentStr + "`'"
            }
            else
            {
                e = this.generateTerm(this.contentStr)
            }
        }
        this.updateText = new Function("this.plaintextStr = " + e + ";")
    }
    this.updateText();
    if (!this.isLabel)
    {
        this.id = this.board.setId(this, "T");
        this.board.renderer.drawText(this);
        if (!this.visProp.visible)
        {
            this.board.renderer.hide(this)
        }
    }
    if (typeof this.contentStr == "string")
    {
        this.notifyParents(this.contentStr)
    }
};
JXG.Text.prototype = new JXG.GeometryElement();
JXG.Text.prototype.hasPoint = function (d, e)
{
    return false
};
JXG.Text.prototype.setText = function (e)
{
    var d;
    if (typeof e == "number")
    {
        d = (e).toFixed(this.digits)
    }
    else
    {
        d = this.generateTerm(e)
    }
    this.updateText = new Function("this.plaintextStr = " + d + ";");
    this.updateText();
    return this
};
JXG.Text.prototype.setCoords = function (d, e)
{
    this.X = function ()
    {
        return d
    };
    this.Y = function ()
    {
        return e
    };
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, [d, e], this.board);
    return this
};
JXG.Text.prototype.update = function ()
{
    if (this.needsUpdate && !this.frozen)
    {
        if (this.relativeCoords)
        {
            var d;
            if (!this.isLabel)
            {
                d = this.element.getTextAnchor()
            }
            else
            {
                d = this.element.getLabelAnchor()
            }
            this.coords.setCoordinates(JXG.COORDS_BY_SCREEN, [this.relativeCoords.scrCoords[1] + d.scrCoords[1], this.relativeCoords.scrCoords[2] + d.scrCoords[2]])
        }
        else
        {
            this.updateCoords()
        }
    }
    if (this.needsUpdate)
    {
        this.updateText()
    }
    return this
};
JXG.Text.prototype.updateRenderer = function ()
{
    if (this.needsUpdate)
    {
        this.board.renderer.updateText(this);
        this.needsUpdate = false
    }
    return this
};
JXG.Text.prototype.generateTerm = function (h)
{
    var g = null;
    var l = this.board.elementsByName;
    var k = '""';
    h = h.replace(/\r/g, "");
    h = h.replace(/\n/g, "");
    h = h.replace(/\"/g, '\\"');
    h = h.replace(/\'/g, "\\'");
    h = h.replace(/&amp;arc;/g, "&ang;");
    h = h.replace(/<arc\s*\/>/g, "&ang;");
    h = h.replace(/<sqrt\s*\/>/g, "&radic;");
    var f;
    f = h.indexOf("<value>");
    var d = h.indexOf("</value>");
    if (f >= 0)
    {
        while (f >= 0)
        {
            k += ' + "' + JXG.GeonextParser.replaceSub(JXG.GeonextParser.replaceSup(h.slice(0, f))) + '"';
            var e = h.slice(f + 7, d);
            var g = JXG.GeonextParser.geonext2JS(e, this.board);
            g = g.replace(/\\"/g, '"');
            g = g.replace(/\\'/g, "'");
            if (g.indexOf("toFixed") < 0)
            {
                k += "+(" + g + ").toFixed(" + (this.digits) + ")"
            }
            else
            {
                k += "+(" + g + ")"
            }
            h = h.slice(d + 8);
            f = h.indexOf("<value>");
            d = h.indexOf("</value>")
        }
    }
    k += ' + "' + JXG.GeonextParser.replaceSub(JXG.GeonextParser.replaceSup(h)) + '"';
    k = k.replace(/<overline>/g, "<span style=text-decoration:overline>");
    k = k.replace(/<\/overline>/g, "</span>");
    k = k.replace(/<arrow>/g, "<span style=text-decoration:overline>");
    k = k.replace(/<\/arrow>/g, "</span>");
    k = k.replace(/&amp;/g, "&");
    return k
};
JXG.Text.prototype.notifyParents = function (f)
{
    var e = null;
    var g = this.board.elementsByName;
    do
    {
        var d = /<value>([\w\s\*\/\^\-\+\(\)\[\],<>=!]+)<\/value>/;
        e = d.exec(f);
        if (e != null)
        {
            JXG.GeonextParser.findDependencies(this, e[1], this.board);
            f = f.substr(e.index);
            f = f.replace(d, "")
        }
    } while (e != null);
    return this
};
JXG.createText = function (d, f, e)
{
    e = JXG.checkAttributes(e, {
        layer: null,
        display: d.options.text.defaultDisplay,
        parent: null
    });
    if (e.parent != null)
    {
        e.parent = e.parent.id
    }
    return new JXG.Text(d, f[f.length - 1], e.parent, f, e.id, e.name, e.digits, false, e.display, e.layer)
};
JXG.JSXGraph.registerElement("text", JXG.createText);
JXG.Image = function (i, e, j, g, f, k, d, h)
{
    this.type = JXG.OBJECT_TYPE_IMAGE;
    this.elementClass = JXG.OBJECT_CLASS_OTHER;
    this.transformations = [];
    this.init(i, k, d);
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, j, this.board);
    this.initialCoords = new JXG.Coords(JXG.COORDS_BY_USER, j, this.board);
    this.size = [g[0] * i.stretchX, g[1] * i.stretchY];
    this.url = e;
    if (f == null)
    {
        f = i.options.layer.image
    }
    this.layer = f;
    this.parent = h;
    this.visProp.visible = true;
    this.id = this.board.setId(this, "Im");
    this.board.renderer.drawImage(this);
    if (!this.visProp.visible)
    {
        this.board.renderer.hide(this)
    }
};
JXG.Image.prototype = new JXG.GeometryElement;
JXG.Image.prototype.hasPoint = function (d, e)
{
    return false
};
JXG.Image.prototype.update = function ()
{
};
JXG.Image.prototype.updateRenderer = function ()
{
    this.updateTransform();
    this.board.renderer.updateImage(this)
};
JXG.Image.prototype.updateTransform = function ()
{
    if (this.transformations.length == 0)
    {
        return
    }
    for (var d = 0; d < this.transformations.length; d++)
    {
        this.transformations[d].update()
    }
};
JXG.Image.prototype.addTransform = function (d)
{
    if (JXG.isArray(d))
    {
        for (var e = 0; e < d.length; e++)
        {
            this.transformations.push(d[e])
        }
    }
    else
    {
        this.transformations.push(d)
    }
};
JXG.createImage = function (f, e, g)
{
    var d;
    if (g == null)
    {
        g =
        {
        }
    }
    else
    {
        if (g.imageString != null)
        {
            d = g.imageString
        }
    }
    if (typeof g.layer == "undefined")
    {
        g.layer = null
    }
    return new JXG.Image(f, e[0], e[1], e[2], g.layer, false, false)
};
JXG.JSXGraph.registerElement("image", JXG.createImage);
JXG.createSlider = function (p, z, v)
{
    var k, i, y, l, A, q, f, e, x, B, m, h, g, d, w, u, r, s, j;
    k = z[0];
    i = z[1];
    y = z[2][0];
    l = z[2][1];
    A = z[2][2];
    q = A - y;
    v = JXG.checkAttributes(v, {
        strokeColor: "#000000",
        fillColor: "#ffffff",
        withTicks: true
    });
    j = JXG.str2Bool(v.fixed);
    f = p.create("point", k, {
        visible: !j,
        fixed: j,
        name: "",
        withLabel: false,
        face: "<>",
        size: 5,
        strokeColor: "#000000",
        fillColor: "#ffffff"
    });
    e = p.create("point", i, {
        visible: !j,
        fixed: j,
        name: "",
        withLabel: false,
        face: "<>",
        size: 5,
        strokeColor: "#000000",
        fillColor: "#ffffff"
    });
    p.create("group", [f, e]);
    x = p.create("segment", [f, e], {
        strokewidth: 1,
        name: "",
        withLabel: false,
        strokeColor: v.strokeColor
    });
    if (v.withTicks)
    {
        B = 2;
        m = p.create("ticks", [x, e.Dist(f) / B], {
            insertTicks: true,
            minorTicks: 0,
            drawLabels: false,
            drawZero: true
        })
    }
    if (j)
    {
        f.setProperty(
        {
            needsRegularUpdate: false
        });
        e.setProperty(
        {
            needsRegularUpdate: false
        });
        x.setProperty(
        {
            needsRegularUpdate: false
        })
    }
    h = k[0] + (i[0] - k[0]) * (l - y) / (A - y);
    g = k[1] + (i[1] - k[1]) * (l - y) / (A - y);
    if (v.snapWidth != null)
    {
        s = v.snapWidth
    }
    if (v.snapwidth != null)
    {
        s = v.snapwidth
    }
    d = p.create("glider", [h, g, x], {
        style: 6,
        strokeColor: v.strokeColor,
        fillColor: v.fillColor,
        showInfobox: false,
        name: v.name,
        withLabel: false,
        snapWidth: s
    });
    w = p.create("line", [f, d], {
        straightFirst: false,
        straightLast: false,
        strokewidth: 3,
        strokeColor: v.strokeColor,
        name: "",
        withLabel: false
    });
    d.Value = function ()
    {
        return this.position * q + y
    };
    d._smax = A;
    d._smin = y;
    if (typeof v.withLabel == "undefined" || v.withLabel == true)
    {
        if (v.name && v.name != "")
        {
            u = v.name + " = "
        }
        else
        {
            u = ""
        }
        r = p.create("text", [function ()
        {
            return (e.X() - f.X()) * 0.05 + e.X()
        }, function ()
        {
            return (e.Y() - f.Y()) * 0.05 + e.Y()
        }, function ()
        {
            return u + (d.Value()).toFixed(2)
        }], {
            name: ""
        })
    }
    return d
};
JXG.JSXGraph.registerElement("slider", JXG.createSlider);
JXG.Chart = function (k, n, g)
{
    this.constructor();
    if (n.length == 0)
    {
        return
    }
    this.elements = [];
    var f = g.id || "";
    var e = g.name || "";
    this.init(k, f, e);
    var p, m, h;
    if (n.length > 0 && (typeof n[0] == "number"))
    {
        m = n;
        p = [];
        for (h = 0; h < m.length; h++)
        {
            p[h] = h + 1
        }
    }
    else
    {
        if (n.length == 1)
        {
            m = n[0];
            p = [];
            var j;
            if (JXG.isFunction(m))
            {
                j = m().length
            }
            else
            {
                j = m.length
            }
            for (h = 0; h < j; h++)
            {
                p[h] = h + 1
            }
        }
        if (n.length == 2)
        {
            p = n[0];
            m = n[1]
        }
    }
    if (!JXG.exists(g))
    {
        g =
        {
        }
    }
    var d = g.chartStyle || "line";
    d = d.replace(/ /g, "");
    d = d.split(",");
    var l;
    for (h = 0; h < d.length; h++)
    {
        switch (d[h])
        {
        case "bar":
            l = this.drawBar(k, [p, m], g);
            break;
        case "line":
            l = this.drawLine(k, [p, m], g);
            break;
        case "fit":
            l = this.drawFit(k, [p, m], g);
            break;
        case "spline":
            l = this.drawSpline(k, [p, m], g);
            break;
        case "pie":
            l = this.drawPie(k, [m], g);
            break;
        case "point":
            l = this.drawPoints(k, [p, m], g);
            break;
        case "radar":
            l = this.drawRadar(k, n, g);
            break
        }
        this.elements.push(l)
    }
    this.id = this.board.setId(this, "Chart");
    return this.elements
};
JXG.Chart.prototype = new JXG.GeometryElement;
JXG.Chart.prototype.drawLine = function (h, g, e)
{
    var f = g[0],
        d = g[1];
    e.fillColor = "none";
    e.highlightFillColor = "none";
    var i = h.create("curve", [f, d], e);
    this.rendNode = i.rendNode;
    return i
};
JXG.Chart.prototype.drawSpline = function (h, f, e)
{
    var d = f[0],
        k = f[1],
        g;
    e.fillColor = "none";
    e.highlightFillColor = "none";
    var j = h.create("spline", [d, k], e);
    this.rendNode = j.rendNode;
    return j
};
JXG.Chart.prototype.drawFit = function (h, g, f)
{
    var d = g[0],
        k = g[1],
        i = (((typeof f.degree == "undefined") || (parseInt(f.degree) == NaN) || (parseInt(f.degree) < 1)) ? 1 : parseInt(f.degree));
    f.fillColor = "none";
    f.highlightFillColor = "none";
    var e = JXG.Math.Numerics.regressionPolynomial(i, d, k);
    var j = h.create("functiongraph", [e], f);
    this.rendNode = j.rendNode;
    return j
};
JXG.Chart.prototype.drawBar = function (l, n, j)
{
    var k, h = [],
        q = n[0],
        m = n[1],
        r, f, v, u, e, d, s, g = [],
        t;
    if (!JXG.exists(j.fillOpacity))
    {
        j.fillOpacity = 0.6
    }
    if (j && j.width)
    {
        r = j.width
    }
    else
    {
        if (q.length <= 1)
        {
            r = 1
        }
        else
        {
            r = q[1] - q[0];
            for (k = 1; k < q.length - 1; k++)
            {
                r = (q[k + 1] - q[k] < r) ? (q[k + 1] - q[k]) : r
            }
        }
        r *= 0.8
    }
    t = j.fillColor;
    for (k = 0; k < q.length; k++)
    {
        if (JXG.isFunction(q[k]))
        {
            f = function ()
            {
                return q[k]() - r * 0.5
            };
            v = function ()
            {
                return q[k]()
            };
            u = function ()
            {
                return q[k]() + r * 0.5
            }
        }
        else
        {
            f = q[k] - r * 0.5;
            v = q[k];
            u = q[k] + r * 0.5
        }
        if (JXG.isFunction(m[k]))
        {
            d = e
        }
        else
        {
            d = m[k] + 0.2
        }
        e = m[k];
        if (j.dir == "horizontal")
        {
            g[0] = l.create("point", [0, f], {
                name: "",
                fixed: true,
                visible: false
            });
            g[1] = l.create("point", [e, f], {
                name: "",
                fixed: true,
                visible: false
            });
            g[2] = l.create("point", [e, u], {
                name: "",
                fixed: true,
                visible: false
            });
            g[3] = l.create("point", [0, u], {
                name: "",
                fixed: true,
                visible: false
            });
            if (j.labels && j.labels[k])
            {
                l.create("text", [e, u, j.labels[k]], j)
            }
        }
        else
        {
            g[0] = l.create("point", [f, 0], {
                name: "",
                fixed: true,
                visible: false
            });
            g[1] = l.create("point", [f, e], {
                name: "",
                fixed: true,
                visible: false
            });
            g[2] = l.create("point", [u, e], {
                name: "",
                fixed: true,
                visible: false
            });
            g[3] = l.create("point", [u, 0], {
                name: "",
                fixed: true,
                visible: false
            });
            if (j.labels && j.labels[k])
            {
                l.create("text", [u, e, j.labels[k]], j)
            }
        }
        j.withLines = false;
        if (!t)
        {
            s = j.colorArray || ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"];
            j.fillColor = s[k % s.length]
        }
        h[k] = l.create("polygon", g, j)
    }
    this.rendNode = h[0].rendNode;
    return h
};
JXG.Chart.prototype.drawPoints = function (k, g, f)
{
    var h;
    var j = [];
    f.fixed = true;
    f.name = "";
    var e = JXG.isArray(f.infoboxArray) ? f.infoboxArray || false : false;
    var d = g[0];
    var l = g[1];
    for (h = 0; h < d.length; h++)
    {
        f.infoboxtext = e ? e[h % e.length] : false;
        j[h] = k.create("point", [d[h], l[h]], f)
    }
    this.rendNode = j[0].rendNode;
    return j
};
JXG.Chart.prototype.drawPie = function (g, x, j)
{
    var k = x[0];
    if (k.length <= 0)
    {
        return
    }
    var w;
    var t = [];
    var h = [];
    var l = JXG.Math.Statistics.sum(k);
    var f = j.colorArray || ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"];
    var B = j.highlightColorArray || ["#FF7400"];
    var u = new Array(k.length);
    for (w = 0; w < k.length; w++)
    {
        u[w] = ""
    }
    var m = j.labelArray || u;
    var n = j.radius || 4;
    var e;
    if (!JXG.isFunction(n))
    {
        e = function ()
        {
            return n
        }
    }
    else
    {
        e = n
    }
    var A =
    {
    };
    if (!JXG.exists(j.highlightOnSector))
    {
        j.highlightOnSector = false
    }
    A.name = j.name;
    A.id = j.id;
    A.strokeWidth = j.strokeWidth || 1;
    A.strokeColor = j.strokeColor || "none";
    A.straightFirst = false;
    A.straightLast = false;
    A.fillColor = j.fillColor || "#FFFF88";
    A.fillOpacity = j.fillOpacity || 0.6;
    A.highlightFillColor = j.highlightFillColor || "#FF7400";
    A.highlightStrokeColor = j.highlightStrokeColor || "#FFFFFF";
    A.gradient = j.gradient || "none";
    A.gradientSecondColor = j.gradientSecondColor || "black";
    var q = j.center || [0, 0];
    var v = q[0];
    var d = q[1];
    var z = g.create("point", [v, d], {
        name: "",
        fixed: true,
        visible: false
    });
    t[0] = g.create("point", [function ()
    {
        return e() + v
    }, function ()
    {
        return 0 + d
    }], {
        name: "",
        fixed: true,
        visible: false
    });
    var C = 0;
    for (w = 0; w < k.length; w++)
    {
        t[w + 1] = g.create("point", [(function (i)
        {
            return function ()
            {
                var D = 0,
                    y = 0,
                    r;
                for (r = 0; r <= i; r++)
                {
                    if (JXG.isFunction(k[r]))
                    {
                        y += parseFloat(k[r]())
                    }
                    else
                    {
                        y += parseFloat(k[r])
                    }
                }
                D = y;
                for (r = i + 1; r < k.length; r++)
                {
                    if (JXG.isFunction(k[r]))
                    {
                        D += parseFloat(k[r]())
                    }
                    else
                    {
                        D += parseFloat(k[r])
                    }
                }
                var p = (D != 0) ? (2 * Math.PI * y / D) : 0;
                return e() * Math.cos(p) + v
            }
        })(w), (function (i)
        {
            return function ()
            {
                var D = 0,
                    y = 0,
                    r;
                for (r = 0; r <= i; r++)
                {
                    if (JXG.isFunction(k[r]))
                    {
                        y += parseFloat(k[r]())
                    }
                    else
                    {
                        y += parseFloat(k[r])
                    }
                }
                D = y;
                for (r = i + 1; r < k.length; r++)
                {
                    if (JXG.isFunction(k[r]))
                    {
                        D += parseFloat(k[r]())
                    }
                    else
                    {
                        D += parseFloat(k[r])
                    }
                }
                var p = (D != 0) ? (2 * Math.PI * y / D) : 0;
                return e() * Math.sin(p) + d
            }
        })(w)], {
            name: "",
            fixed: false,
            visible: false,
            withLabel: false
        });
        A.fillColor = f[w % f.length];
        A.name = m[w];
        A.withLabel = A.name != "";
        A.labelColor = f[w % f.length];
        A.highlightfillColor = B[w % B.length];
        h[w] = g.create("sector", [z, t[w], t[w + 1]], A);
        if (j.highlightOnSector)
        {
            h[w].hasPoint = h[w].hasPointSector
        }
        if (j.highlightBySize)
        {
            h[w].highlight = function ()
            {
                this.board.renderer.highlight(this);
                if (this.label.content != null)
                {
                    this.label.content.rendNode.style.fontSize = (2 * this.board.options.text.fontSize) + "px"
                }
                var p = -this.midpoint.coords.usrCoords[1] + this.point2.coords.usrCoords[1];
                var i = -this.midpoint.coords.usrCoords[2] + this.point2.coords.usrCoords[2];
                this.point2.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.midpoint.coords.usrCoords[1] + p * 1.1, this.midpoint.coords.usrCoords[2] + i * 1.1], this.board);
                this.prepareUpdate().update().updateRenderer()
            };
            h[w].noHighlight = function ()
            {
                this.board.renderer.noHighlight(this);
                if (this.label.content != null)
                {
                    this.label.content.rendNode.style.fontSize = (this.board.options.text.fontSize) + "px"
                }
                var p = -this.midpoint.coords.usrCoords[1] + this.point2.coords.usrCoords[1];
                var i = -this.midpoint.coords.usrCoords[2] + this.point2.coords.usrCoords[2];
                this.point2.coords = new JXG.Coords(JXG.COORDS_BY_USER, [this.midpoint.coords.usrCoords[1] + p / 1.1, this.midpoint.coords.usrCoords[2] + i / 1.1], this.board);
                this.prepareUpdate().update().updateRenderer()
            }
        }
    }
    this.rendNode = h[0].rendNode;
    return {
        arcs: h,
        points: t,
        midpoint: z
    }
};
JXG.Chart.prototype.drawRadar = function (n, Q, L)
{
    var Z, X, aa, N, ac, G, C = Q.length,
        K, u, f, M, D, z, E, B, g, Y, v, s, w, P, x, V, R, F, d, m, e, U, l, O, r, T, af, y, k, q, I, S, ae, A, h;
    if (C <= 0)
    {
        alert("No data");
        return
    }
    aa = L.paramArray;
    if (!JXG.exists(aa))
    {
        alert("Need paramArray attribute");
        return
    }
    N = aa.length;
    if (N <= 1)
    {
        alert("Need more than 1 param");
        return
    }
    for (Z = 0; Z < C; Z++)
    {
        if (N != Q[Z].length)
        {
            alert("Use data length equal to number of params (" + Q[Z].length + " != " + N + ")");
            return
        }
    }
    ac = new Array(N);
    G = new Array(N);
    for (X = 0; X < N; X++)
    {
        ac[X] = Q[0][X];
        G[X] = ac[X]
    }
    for (Z = 1; Z < C; Z++)
    {
        for (X = 0; X < N; X++)
        {
            if (Q[Z][X] > ac[X])
            {
                ac[X] = Q[Z][X]
            }
            if (Q[Z][X] < G[X])
            {
                G[X] = Q[Z][X]
            }
        }
    }
    K = new Array(C);
    u = new Array(C);
    for (Z = 0; Z < C; Z++)
    {
        K[Z] = "";
        u[Z] = []
    }
    f = new Array(N);
    M = new Array(N);
    D = L.startShiftRatio || 0;
    z = L.endShiftRatio || 0;
    for (Z = 0; Z < N; Z++)
    {
        f[Z] = (ac[Z] - G[Z]) * D;
        M[Z] = (ac[Z] - G[Z]) * z
    }
    E = L.startShiftArray || f;
    B = L.endShiftArray || M;
    g = L.startArray || G;
    if (JXG.exists(L.start))
    {
        for (Z = 0; Z < N; Z++)
        {
            g[Z] = L.start
        }
    }
    Y = L.endArray || ac;
    if (JXG.exists(L.end))
    {
        for (Z = 0; Z < N; Z++)
        {
            Y[Z] = L.end
        }
    }
    if (E.length != N)
    {
        alert("Start shifts length is not equal to number of parameters");
        return
    }
    if (B.length != N)
    {
        alert("End shifts length is not equal to number of parameters");
        return
    }
    if (g.length != N)
    {
        alert("Starts length is not equal to number of parameters");
        return
    }
    if (Y.length != N)
    {
        alert("Ends length is not equal to number of parameters");
        return
    }
    v = L.labelArray || K;
    s = L.colorArray || ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"];
    w = L.highlightColorArray || ["#FF7400"];
    P = L.radius || 10;
    x =
    {
    };
    if (!JXG.exists(L.highlightOnSector))
    {
        L.highlightOnSector = false
    }
    x.name = L.name;
    x.id = L.id;
    x.strokeWidth = L.strokeWidth || 1;
    x.polyStrokeWidth = L.polyStrokeWidth || 2 * x.strokeWidth;
    x.strokeColor = L.strokeColor || "black";
    x.straightFirst = false;
    x.straightLast = false;
    x.fillColor = L.fillColor || "#FFFF88";
    x.fillOpacity = L.fillOpacity || 0.4;
    x.highlightFillColor = L.highlightFillColor || "#FF7400";
    x.highlightStrokeColor = L.highlightStrokeColor || "black";
    x.gradient = L.gradient || "none";
    V = L.center || [0, 0];
    R = V[0];
    F = V[1];
    d = n.create("point", [R, F], {
        name: "",
        fixed: true,
        withlabel: false,
        visible: false
    });
    m = Math.PI / 2 - Math.PI / N;
    if (L.startAngle || L.startAngle === 0)
    {
        m = L.startAngle
    }
    e = m;
    U = [];
    l = [];
    var W = function ()
    {
        var j, i, t, p, ag = [].concat(this.labelOffsets);
        j = this.point1.X();
        i = this.point2.X();
        t = this.point1.Y();
        p = this.point2.Y();
        if (i < j)
        {
            ag[0] = -ag[0]
        }
        if (p < t)
        {
            ag[1] = -ag[1]
        }
        this.setLabelRelativeCoords(ag);
        return new JXG.Coords(JXG.COORDS_BY_USER, [this.point2.X(), this.point2.Y()], this.board)
    };
    var J = function (ai, p)
    {
        var j;
        var ah;
        var ag;
        j = n.create("transform", [-(g[p] - E[p]), 0], {
            type: "translate"
        });
        ah = n.create("transform", [P / ((Y[p] + B[p]) - (g[p] - E[p])), 1], {
            type: "scale"
        });
        j.melt(ah);
        ag = n.create("transform", [ai], {
            type: "rotate"
        });
        j.melt(ag);
        return j
    };
    for (Z = 0; Z < N; Z++)
    {
        e += 2 * Math.PI / N;
        r = P * Math.cos(e) + R;
        T = P * Math.sin(e) + F;
        U[Z] = n.create("point", [r, T], {
            name: "",
            fixed: true,
            withlabel: false,
            visible: false
        });
        l[Z] = n.create("line", [d, U[Z]], {
            name: aa[Z],
            strokeColor: x.strokeColor,
            strokeWidth: x.strokeWidth,
            strokeOpacity: 1,
            straightFirst: false,
            straightLast: false,
            withLabel: true,
            highlightStrokeColor: x.highlightStrokeColor
        });
        l[Z].getLabelAnchor = W;
        O = J(e, Z);
        for (X = 0; X < Q.length; X++)
        {
            var ad = Q[X][Z];
            u[X][Z] = n.create("point", [ad, 0], {
                name: "",
                fixed: true,
                withlabel: false,
                visible: false
            });
            u[X][Z].addTransform(u[X][Z], O)
        }
    }
    af = new Array(C);
    for (Z = 0; Z < C; Z++)
    {
        x.labelColor = s[Z % s.length];
        x.strokeColor = s[Z % s.length];
        x.fillColor = s[Z % s.length];
        af[Z] = n.create("polygon", u[Z], {
            withLines: true,
            withLabel: false,
            fillColor: x.fillColor,
            fillOpacity: x.fillOpacity
        });
        for (X = 0; X < N; X++)
        {
            af[Z].borders[X].setProperty("strokeColor:" + s[Z % s.length]);
            af[Z].borders[X].setProperty("strokeWidth:" + x.polyStrokeWidth)
        }
    }
    y = L.legendPosition || "none";
    switch (y)
    {
    case "right":
        var H = L.legendLeftOffset || 2;
        var ab = L.legendTopOffset || 1;
        this.legend = n.create("legend", [R + P + H, F + P - ab], {
            labelArray: v,
            colorArray: s
        });
        break;
    case "none":
        break;
    default:
        alert("Unknown legend position")
    }
    k = [];
    if (L.showCircles != false)
    {
        q = [];
        for (Z = 0; Z < 6; Z++)
        {
            q[Z] = 20 * Z
        }
        q[0] = "0";
        I = L.circleLabelArray || q;
        S = I.length;
        if (S < 2)
        {
            alert("Too less circles");
            return
        }
        ae = [];
        A = m + Math.PI / N;
        O = J(A, 0);
        x.fillColor = "none";
        x.highlightFillColor = "none";
        x.strokeColor = L.strokeColor || "black";
        x.strokeWidth = L.circleStrokeWidth || 0.5;
        h = (Y[0] - g[0]) / (S - 1);
        for (Z = 0; Z < S; Z++)
        {
            ae[Z] = n.create("point", [g[0] + Z * h, 0], {
                name: I[Z],
                size: 0,
                withLabel: true,
                visible: true
            });
            ae[Z].addTransform(ae[Z], O);
            k[Z] = n.create("circle", [d, ae[Z]], x)
        }
    }
    this.rendNode = af[0].rendNode;
    return {
        circles: k,
        lines: l,
        points: u,
        midpoint: d,
        polygons: af
    }
};
JXG.Chart.prototype.updateRenderer = function ()
{
};
JXG.Chart.prototype.update = function ()
{
    if (this.needsUpdate)
    {
        this.updateDataArray()
    }
};
JXG.Chart.prototype.updateDataArray = function ()
{
};
JXG.createChart = function (h, v, k)
{
    if ((v.length == 1) && (typeof v[0] == "string"))
    {
        var u = document.getElementById(v[0]),
            B, g, r, q, f, d, t = [],
            m, l, A, z, C, n, e, p, y, s;
        if (JXG.exists(u))
        {
            k = JXG.checkAttributes(k, {
                withHeader: true
            });
            u = (new JXG.DataSource()).loadFromTable(v[0], k.withHeader, k.withHeader);
            B = u.data;
            f = u.columnHeader;
            g = u.rowHeader;
            z = k.width;
            C = k.name;
            n = k.strokeColor;
            e = k.fillColor;
            p = k.highlightStrokeColor;
            y = k.highlightFillColor;
            h.suspendUpdate();
            s = B.length;
            A = [];
            if (k.rows && JXG.isArray(k.rows))
            {
                for (r = 0; r < s; r++)
                {
                    for (q = 0; q < k.rows.length; q++)
                    {
                        if ((k.rows[q] == r) || (k.withHeaders && k.rows[q] == g[r]))
                        {
                            A.push(B[r]);
                            break
                        }
                    }
                }
            }
            else
            {
                A = B
            }
            s = A.length;
            for (r = 0; r < s; r++)
            {
                l = [];
                if (k.chartStyle && k.chartStyle.indexOf("bar") != -1)
                {
                    if (z)
                    {
                        m = z
                    }
                    else
                    {
                        m = 0.8
                    }
                    l.push(1 - m / 2 + (r + 0.5) * m / (1 * s));
                    for (q = 1; q < A[r].length; q++)
                    {
                        l.push(l[q - 1] + 1)
                    }
                    k.width = m / (1 * s)
                }
                if (C && C.length == s)
                {
                    k.name = C[r]
                }
                else
                {
                    if (k.withHeaders)
                    {
                        k.name = f[r]
                    }
                }
                if (n && n.length == s)
                {
                    k.strokeColor = n[r]
                }
                else
                {
                    k.strokeColor = JXG.hsv2rgb(((r + 1) / (1 * s)) * 360, 0.9, 0.6)
                }
                if (e && e.length == s)
                {
                    k.fillColor = e[r]
                }
                else
                {
                    k.fillColor = JXG.hsv2rgb(((r + 1) / (1 * s)) * 360, 0.9, 1)
                }
                if (p && p.length == s)
                {
                    k.highlightStrokeColor = p[r]
                }
                else
                {
                    k.highlightStrokeColor = JXG.hsv2rgb(((r + 1) / (1 * s)) * 360, 0.9, 1)
                }
                if (y && y.length == s)
                {
                    k.highlightFillColor = y[r]
                }
                else
                {
                    k.highlightFillColor = JXG.hsv2rgb(((r + 1) / (1 * s)) * 360, 0.9, 0.6)
                }
                if (k.chartStyle && k.chartStyle.indexOf("bar") != -1)
                {
                    t.push(new JXG.Chart(h, [l, A[r]], k))
                }
                else
                {
                    t.push(new JXG.Chart(h, [A[r]], k))
                }
            }
            h.unsuspendUpdate()
        }
        return t
    }
    else
    {
        return new JXG.Chart(h, v, k)
    }
};
JXG.JSXGraph.registerElement("chart", JXG.createChart);
JXG.Legend = function (f, g, d)
{
    this.constructor();
    this.board = f;
    this.coords = new JXG.Coords(JXG.COORDS_BY_USER, g, this.board);
    this.myAtts =
    {
    };
    this.label_array = d.labelArray || ["1", "2", "3", "4", "5", "6", "7", "8"];
    this.color_array = d.colorArray || ["#B02B2C", "#3F4C6B", "#C79810", "#D15600", "#FFFF88", "#C3D9FF", "#4096EE", "#008C00"];
    var e;
    this.lines = [];
    this.myAtts.strokeWidth = d.strokeWidth || 5;
    this.myAtts.straightFirst = false;
    this.myAtts.straightLast = false;
    this.myAtts.withLabel = true;
    this.style = d.legendStyle || "vertical";
    switch (this.style)
    {
    case "vertical":
        this.drawVerticalLegend(d);
        break;
    default:
        alert("Unknown legend style" + this.style);
        break
    }
};
JXG.Legend.prototype = new JXG.GeometryElement;
JXG.Legend.prototype.drawVerticalLegend = function (f)
{
    var e = f.lineLength || 1,
        d = (f.rowHeight || 20) / this.board.stretchY,
        g;
    for (g = 0; g < this.label_array.length; g++)
    {
        this.myAtts.strokeColor = this.color_array[g];
        this.myAtts.highlightStrokeColor = this.color_array[g];
        this.myAtts.name = this.label_array[g];
        this.myAtts.labelOffsets = [10, 0];
        this.lines[g] = board.create("line", [
            [this.coords.usrCoords[1], this.coords.usrCoords[2] - g * d],
            [this.coords.usrCoords[1] + e, this.coords.usrCoords[2] - g * d]
        ], this.myAtts);
        this.lines[g].getLabelAnchor = function ()
        {
            this.setLabelRelativeCoords(this.labelOffsets);
            return new JXG.Coords(JXG.COORDS_BY_USER, [this.point2.X(), this.point2.Y()], this.board)
        }
    }
};
JXG.createLegend = function (f, e, d)
{
    var g = [0, 0];
    if (JXG.exists(e))
    {
        if (e.length == 2)
        {
            g = e
        }
    }
    return new JXG.Legend(f, g, d)
};
JXG.JSXGraph.registerElement("legend", JXG.createLegend);
JXG.Transformation = function (e, d, f)
{
    this.elementClass = JXG.OBJECT_CLASS_OTHER;
    this.matrix = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    this.board = e;
    this.isNumericMatrix = false;
    this.setMatrix(e, d, f)
};
JXG.Transformation.prototype =
{
};
JXG.Transformation.prototype.update = function ()
{
};
JXG.Transformation.prototype.setMatrix = function (f, e, g)
{
    var d;
    this.isNumericMatrix = true;
    for (d = 0; d < g.length; d++)
    {
        if (typeof g[d] != "number")
        {
            this.isNumericMatrix = false;
            break
        }
    }
    if (e == "translate")
    {
        this.evalParam = JXG.createEvalFunction(f, g, 2);
        this.update = function ()
        {
            this.matrix[1][0] = this.evalParam(0);
            this.matrix[2][0] = this.evalParam(1)
        }
    }
    else
    {
        if (e == "scale")
        {
            this.evalParam = JXG.createEvalFunction(f, g, 2);
            this.update = function ()
            {
                this.matrix[1][1] = this.evalParam(0);
                this.matrix[2][2] = this.evalParam(1)
            }
        }
        else
        {
            if (e == "reflect")
            {
                if (g.length < 4)
                {
                    g[0] = JXG.getReference(f, g[0])
                }
                if (g.length == 2)
                {
                    g[1] = JXG.getReference(f, g[1])
                }
                if (g.length == 4)
                {
                    this.evalParam = JXG.createEvalFunction(f, g, 4)
                }
                this.update = function ()
                {
                    var h, l, i, k, j;
                    if (g.length == 1)
                    {
                        h = g[0].point2.X() - g[0].point1.X();
                        l = g[0].point2.Y() - g[0].point1.Y();
                        i = g[0].point1.X();
                        k = g[0].point1.Y()
                    }
                    else
                    {
                        if (g.length == 2)
                        {
                            h = g[1].X() - g[0].X();
                            l = g[1].Y() - g[0].Y();
                            i = g[0].X();
                            k = g[0].Y()
                        }
                        else
                        {
                            if (g.length == 4)
                            {
                                h = this.evalParam(2) - this.evalParam(0);
                                l = this.evalParam(3) - this.evalParam(1);
                                i = this.evalParam(0);
                                k = this.evalParam(1)
                            }
                        }
                    }
                    j = h * h + l * l;
                    this.matrix[1][1] = (h * h - l * l) / j;
                    this.matrix[1][2] = 2 * h * l / j;
                    this.matrix[2][1] = 2 * h * l / j;
                    this.matrix[2][2] = (-h * h + l * l) / j;
                    this.matrix[1][0] = i * (1 - this.matrix[1][1]) - k * this.matrix[1][2];
                    this.matrix[2][0] = k * (1 - this.matrix[2][2]) - i * this.matrix[2][1]
                }
            }
            else
            {
                if (e == "rotate")
                {
                    if (g.length == 3)
                    {
                        this.evalParam = JXG.createEvalFunction(f, g, 3)
                    }
                    else
                    {
                        if (g.length <= 2)
                        {
                            this.evalParam = JXG.createEvalFunction(f, g, 1);
                            if (g.length == 2)
                            {
                                g[1] = JXG.getReference(f, g[1])
                            }
                        }
                    }
                    this.update = function ()
                    {
                        var j = this.evalParam(0),
                            h, l, k = Math.cos(j),
                            i = Math.sin(j);
                        this.matrix[1][1] = k;
                        this.matrix[1][2] = -i;
                        this.matrix[2][1] = i;
                        this.matrix[2][2] = k;
                        if (g.length > 1)
                        {
                            if (g.length == 3)
                            {
                                h = this.evalParam(1);
                                l = this.evalParam(2)
                            }
                            else
                            {
                                h = g[1].X();
                                l = g[1].Y()
                            }
                            this.matrix[1][0] = h * (1 - k) + l * i;
                            this.matrix[2][0] = l * (1 - k) - h * i
                        }
                    }
                }
                else
                {
                    if (e == "shear")
                    {
                        this.evalParam = JXG.createEvalFunction(f, g, 1);
                        this.update = function ()
                        {
                            var h = this.evalParam(0);
                            this.matrix[1][1] = Math.tan(h)
                        }
                    }
                    else
                    {
                        if (e == "generic")
                        {
                            this.evalParam = JXG.createEvalFunction(f, g, 9);
                            this.update = function ()
                            {
                                this.matrix[0][0] = this.evalParam(0);
                                this.matrix[0][1] = this.evalParam(1);
                                this.matrix[0][2] = this.evalParam(2);
                                this.matrix[1][0] = this.evalParam(3);
                                this.matrix[1][1] = this.evalParam(4);
                                this.matrix[1][2] = this.evalParam(5);
                                this.matrix[2][0] = this.evalParam(6);
                                this.matrix[2][1] = this.evalParam(7);
                                this.matrix[2][2] = this.evalParam(8)
                            }
                        }
                    }
                }
            }
        }
    }
};
JXG.Transformation.prototype.apply = function (d)
{
    this.update();
    if (arguments[1] != null)
    {
        return JXG.Math.matVecMult(this.matrix, d.initialCoords.usrCoords)
    }
    else
    {
        return JXG.Math.matVecMult(this.matrix, d.coords.usrCoords)
    }
};
JXG.Transformation.prototype.applyOnce = function (f)
{
    var g, d, e;
    if (!JXG.isArray(f))
    {
        this.update();
        g = JXG.Math.matVecMult(this.matrix, f.coords.usrCoords);
        f.coords.setCoordinates(JXG.COORDS_BY_USER, [g[1], g[2]])
    }
    else
    {
        d = f.length;
        for (e = 0; e < d; e++)
        {
            this.update();
            g = JXG.Math.matVecMult(this.matrix, f[e].coords.usrCoords);
            f[e].coords.setCoordinates(JXG.COORDS_BY_USER, [g[1], g[2]])
        }
    }
};
JXG.Transformation.prototype.bindTo = function (f)
{
    var e, d;
    if (JXG.isArray(f))
    {
        d = f.length;
        for (e = 0; e < d; e++)
        {
            f[e].transformations.push(this)
        }
    }
    else
    {
        f.transformations.push(this)
    }
};
JXG.Transformation.prototype.setProperty = function (d)
{
};
JXG.Transformation.prototype.melt = function (m)
{
    var l = [],
        h, d, g, e, n, f;
    d = m.matrix.length;
    g = this.matrix[0].length;
    for (h = 0; h < d; h++)
    {
        l[h] = []
    }
    this.update();
    m.update();
    for (h = 0; h < d; h++)
    {
        for (f = 0; f < g; f++)
        {
            n = 0;
            for (e = 0; e < d; e++)
            {
                n += m.matrix[h][e] * this.matrix[e][f]
            }
            l[h][f] = n
        }
    }
    this.update = function ()
    {
        var i = this.matrix.length,
            j = this.matrix[0].length;
        for (h = 0; h < i; h++)
        {
            for (f = 0; f < j; f++)
            {
                this.matrix[h][f] = l[h][f]
            }
        }
    };
    return true
};
JXG.createTransform = function (d, f, e)
{
    return new JXG.Transformation(d, e.type, f)
};
JXG.JSXGraph.registerElement("transform", JXG.createTransform);
JXG.Turtle = function (h, g, e)
{
    var d, i, f;
    this.type = JXG.OBJECT_TYPE_TURTLE;
    this.turtleIsHidden = false;
    this.board = h;
    this.attributes = JXG.checkAttributes(e, {
        withLabel: false,
        layer: null
    });
    this.attributes.straightFirst = false;
    this.attributes.straightLast = false;
    d = 0;
    i = 0;
    f = 90;
    if (g.length != 0)
    {
        if (g.length == 3)
        {
            d = g[0];
            i = g[1];
            f = g[2]
        }
        else
        {
            if (g.length == 2)
            {
                if (JXG.isArray(g[0]))
                {
                    d = g[0][0];
                    i = g[0][1];
                    f = g[1]
                }
                else
                {
                    d = g[0];
                    i = g[1]
                }
            }
            else
            {
                d = g[0][0];
                i = g[0][1]
            }
        }
    }
    this.init(d, i, f);
    return this
};
JXG.Turtle.prototype = new JXG.GeometryElement;
JXG.Turtle.prototype.init = function (d, g, f)
{
    this.arrowLen = 20 / Math.sqrt(this.board.unitX * this.board.unitX + this.board.unitY * this.board.unitY);
    this.pos = [d, g];
    this.isPenDown = true;
    this.dir = 90;
    this.stack = [];
    this.objects = [];
    this.attributes.curveType = "plot";
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    this.turtle = this.board.create("point", this.pos, {
        fixed: true,
        name: " ",
        visible: false,
        withLabel: false
    });
    this.objects.push(this.turtle);
    this.turtle2 = this.board.create("point", [this.pos[0], this.pos[1] + this.arrowLen], {
        fixed: true,
        name: " ",
        visible: false,
        withLabel: false
    });
    this.objects.push(this.turtle2);
    var e = this.attributes.strokeWidth || this.attributes.strokewidth || 2;
    this.arrow = this.board.create("line", [this.turtle, this.turtle2], {
        strokeColor: "#ff0000",
        straightFirst: false,
        straightLast: false,
        strokeWidth: e,
        withLabel: false,
        lastArrow: true
    });
    this.objects.push(this.arrow);
    this.right(90 - f);
    this.board.update()
};
JXG.Turtle.prototype.forward = function (d)
{
    if (d == 0)
    {
        return
    }
    var f = d * Math.cos(this.dir * Math.PI / 180);
    var e = d * Math.sin(this.dir * Math.PI / 180);
    if (!this.turtleIsHidden)
    {
        var g = this.board.create("transform", [f, e], {
            type: "translate"
        });
        g.applyOnce(this.turtle);
        g.applyOnce(this.turtle2)
    }
    if (this.isPenDown)
    {
        if (this.curve.dataX.length >= 8192)
        {
            this.curve = this.board.create("curve", [
                [this.pos[0]],
                [this.pos[1]]
            ], this.attributes);
            this.objects.push(this.curve)
        }
    }
    this.pos[0] += f;
    this.pos[1] += e;
    if (this.isPenDown)
    {
        this.curve.dataX.push(this.pos[0]);
        this.curve.dataY.push(this.pos[1])
    }
    this.board.update();
    return this
};
JXG.Turtle.prototype.back = function (d)
{
    return this.forward(-d)
};
JXG.Turtle.prototype.right = function (e)
{
    this.dir -= e;
    this.dir %= 360;
    if (!this.turtleIsHidden)
    {
        var d = this.board.create("transform", [-e * Math.PI / 180, this.turtle], {
            type: "rotate"
        });
        d.applyOnce(this.turtle2)
    }
    this.board.update();
    return this
};
JXG.Turtle.prototype.left = function (d)
{
    return this.right(-d)
};
JXG.Turtle.prototype.penUp = function ()
{
    this.isPenDown = false;
    return this
};
JXG.Turtle.prototype.penDown = function ()
{
    this.isPenDown = true;
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    return this
};
JXG.Turtle.prototype.clean = function ()
{
    for (var d = 0; d < this.objects.length; d++)
    {
        var e = this.objects[d];
        if (e.type == JXG.OBJECT_TYPE_CURVE)
        {
            this.board.removeObject(e.id);
            this.objects.splice(d, 1)
        }
    }
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    this.board.update();
    return this
};
JXG.Turtle.prototype.clearScreen = function ()
{
    for (var d = 0; d < this.objects.length; d++)
    {
        var e = this.objects[d];
        this.board.removeObject(e.id)
    }
    this.init(0, 0, 90);
    return this
};
JXG.Turtle.prototype.setPos = function (d, f)
{
    if (JXG.isArray(d))
    {
        this.pos = d
    }
    else
    {
        this.pos = [d, f]
    }
    if (!this.turtleIsHidden)
    {
        this.turtle.setPositionDirectly(JXG.COORDS_BY_USER, d, f);
        this.turtle2.setPositionDirectly(JXG.COORDS_BY_USER, d, f + this.arrowLen);
        var e = this.board.create("transform", [-(this.dir - 90) * Math.PI / 180, this.turtle], {
            type: "rotate"
        });
        e.applyOnce(this.turtle2)
    }
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    this.board.update();
    return this
};
JXG.Turtle.prototype.setPenSize = function (d)
{
    this.attributes.strokeWidth = d;
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    return this
};
JXG.Turtle.prototype.setPenColor = function (d)
{
    this.attributes.strokeColor = d;
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    return this
};
JXG.Turtle.prototype.setHighlightPenColor = function (d)
{
    this.attributes.highlightStrokeColor = d;
    this.curve = this.board.create("curve", [
        [this.pos[0]],
        [this.pos[1]]
    ], this.attributes);
    this.objects.push(this.curve);
    return this
};
JXG.Turtle.prototype.setProperty = function ()
{
    var h;
    var d;
    var f, g;
    var e;
    for (f = 0; f < arguments.length; f++)
    {
        d = arguments[f];
        if (typeof d == "string")
        {
            h = d.split(":")
        }
        else
        {
            if (!JXG.isArray(d))
            {
                for (var e in d)
                {
                    this.setProperty([e, d[e]])
                }
                return this
            }
            else
            {
                h = d
            }
        }
        this.attributes[h[0]] = h[1]
    }
    for (f = 0; f < this.objects.length; f++)
    {
        g = this.objects[f];
        if (g.type == JXG.OBJECT_TYPE_CURVE)
        {
            g.setProperty(this.attributes)
        }
    }
    return this
};
JXG.Turtle.prototype.showTurtle = function ()
{
    this.turtleIsHidden = false;
    this.arrow.setProperty("visible:true");
    this.setPos(this.pos[0], this.pos[1]);
    this.board.update();
    return this
};
JXG.Turtle.prototype.hideTurtle = function ()
{
    this.turtleIsHidden = true;
    this.arrow.setProperty("visible:false");
    this.setPos(this.pos[0], this.pos[1]);
    this.board.update();
    return this
};
JXG.Turtle.prototype.home = function ()
{
    this.pos = [0, 0];
    this.setPos(this.pos[0], this.pos[1]);
    return this
};
JXG.Turtle.prototype.pushTurtle = function ()
{
    this.stack.push([this.pos[0], this.pos[1], this.dir]);
    return this
};
JXG.Turtle.prototype.popTurtle = function ()
{
    var d = this.stack.pop();
    this.pos[0] = d[0];
    this.pos[1] = d[1];
    this.dir = d[2];
    this.setPos(this.pos[0], this.pos[1]);
    return this
};
JXG.Turtle.prototype.lookTo = function (h)
{
    if (JXG.isArray(h))
    {
        var e = this.pos[0];
        var d = this.pos[1];
        var i = h[0];
        var g = h[1];
        var f;
        f = Math.atan2(g - d, i - e);
        this.right(this.dir - (f * 180 / Math.PI))
    }
    else
    {
        if (JXG.isNumber(h))
        {
            this.right(this.dir - (h))
        }
    }
    return this
};
JXG.Turtle.prototype.moveTo = function (g)
{
    if (JXG.isArray(g))
    {
        var e = g[0] - this.pos[0];
        var d = g[1] - this.pos[1];
        if (!this.turtleIsHidden)
        {
            var f = this.board.create("transform", [e, d], {
                type: "translate"
            });
            f.applyOnce(this.turtle);
            f.applyOnce(this.turtle2)
        }
        if (this.isPenDown)
        {
            if (this.curve.dataX.length >= 8192)
            {
                this.curve = this.board.create("curve", [
                    [this.pos[0]],
                    [this.pos[1]]
                ], this.attributes);
                this.objects.push(this.curve)
            }
        }
        this.pos[0] = g[0];
        this.pos[1] = g[1];
        if (this.isPenDown)
        {
            this.curve.dataX.push(this.pos[0]);
            this.curve.dataY.push(this.pos[1])
        }
        this.board.update()
    }
    return this
};
JXG.Turtle.prototype.fd = function (d)
{
    return this.forward(d)
};
JXG.Turtle.prototype.bk = function (d)
{
    return this.back(d)
};
JXG.Turtle.prototype.lt = function (d)
{
    return this.left(d)
};
JXG.Turtle.prototype.rt = function (d)
{
    return this.right(d)
};
JXG.Turtle.prototype.pu = function ()
{
    return this.penUp()
};
JXG.Turtle.prototype.pd = function ()
{
    return this.penDown()
};
JXG.Turtle.prototype.ht = function ()
{
    return this.hideTurtle()
};
JXG.Turtle.prototype.st = function ()
{
    return this.showTurtle()
};
JXG.Turtle.prototype.cs = function ()
{
    return this.clearScreen()
};
JXG.Turtle.prototype.push = function ()
{
    return this.pushTurtle()
};
JXG.Turtle.prototype.pop = function ()
{
    return this.popTurtle()
};
JXG.Turtle.prototype.X = function (d)
{
    return this.pos[0]
};
JXG.Turtle.prototype.Y = function (d)
{
    return this.pos[1]
};
JXG.Turtle.prototype.hasPoint = function (d, g)
{
    var e, f;
    for (e = 0; e < this.objects.length; e++)
    {
        f = this.objects[e];
        if (f.type == JXG.OBJECT_TYPE_CURVE)
        {
            if (f.hasPoint(d, g))
            {
                return true
            }
        }
    }
    return false
};
JXG.createTurtle = function (f, e, d)
{
    if (e == null)
    {
        e = []
    }
    return new JXG.Turtle(f, e, d)
};
JXG.JSXGraph.registerElement("turtle", JXG.createTurtle);
JXG.rgbParser = function ()
{
    if (arguments.length == 0)
    {
        return [0, 0, 0]
    }
    if (arguments.length >= 3)
    {
        arguments[0] = [arguments[0], arguments[1], arguments[2]];
        arguments.length = 1
    }
    var n = arguments[0];
    if (JXG.isArray(n))
    {
        var e = false,
            j;
        for (j = 0; j < 3; j++)
        {
            e |= /\./.test(arguments[0][j].toString())
        }
        for (j = 0; j < 3; j++)
        {
            e &= (arguments[0][j] >= 0) & (arguments[0][j] <= 1)
        }
        if (e)
        {
            return [Math.ceil(arguments[0][0] * 255), Math.ceil(arguments[0][1] * 255), Math.ceil(arguments[0][2] * 255)]
        }
        else
        {
            arguments[0].length = 3;
            return arguments[0]
        }
    }
    else
    {
        if (typeof arguments[0] == "string")
        {
            n = arguments[0]
        }
    }
    var d, l, p;
    if (n.charAt(0) == "#")
    {
        n = n.substr(1, 6)
    }
    n = n.replace(/ /g, "");
    n = n.toLowerCase();
    var h =
    {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "00ffff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000000",
        blanchedalmond: "ffebcd",
        blue: "0000ff",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "00ffff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dodgerblue: "1e90ff",
        feldspar: "d19275",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "ff00ff",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslateblue: "8470ff",
        lightslategray: "778899",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "00ff00",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "ff00ff",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "ff0000",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        violetred: "d02090",
        wheat: "f5deb3",
        white: "ffffff",
        whitesmoke: "f5f5f5",
        yellow: "ffff00",
        yellowgreen: "9acd32"
    };
    for (var q in h)
    {
        if (n == q)
        {
            n = h[q]
        }
    }
    var m = [
    {
        re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
        example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
        process: function (g)
        {
            return [parseInt(g[1]), parseInt(g[2]), parseInt(g[3])]
        }
    }, {
        re: /^(\w{2})(\w{2})(\w{2})$/,
        example: ["#00ff00", "336699"],
        process: function (g)
        {
            return [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16)]
        }
    }, {
        re: /^(\w{1})(\w{1})(\w{1})$/,
        example: ["#fb0", "f0f"],
        process: function (g)
        {
            return [parseInt(g[1] + g[1], 16), parseInt(g[2] + g[2], 16), parseInt(g[3] + g[3], 16)]
        }
    }];
    for (var j = 0; j < m.length; j++)
    {
        var t = m[j].re,
            f = m[j].process,
            s = t.exec(n),
            k;
        if (s)
        {
            k = f(s);
            d = k[0];
            l = k[1];
            p = k[2]
        }
    }
    d = (d < 0 || isNaN(d)) ? 0 : ((d > 255) ? 255 : d);
    l = (l < 0 || isNaN(l)) ? 0 : ((l > 255) ? 255 : l);
    p = (p < 0 || isNaN(p)) ? 0 : ((p > 255) ? 255 : p);
    return [d, l, p]
};
JXG.rgb2css = function ()
{
    var f, e, d;
    f = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    e = f[1];
    d = f[2];
    f = f[0];
    return "rgb(" + f + ", " + e + ", " + d + ")"
};
JXG.rgb2hex = function ()
{
    var f, e, d;
    f = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    e = f[1];
    d = f[2];
    f = f[0];
    f = f.toString(16);
    e = e.toString(16);
    d = d.toString(16);
    if (f.length == 1)
    {
        f = "0" + f
    }
    if (e.length == 1)
    {
        e = "0" + e
    }
    if (d.length == 1)
    {
        d = "0" + d
    }
    return "#" + f + e + d
};
JXG.hsv2rgb = function (r, k, j)
{
    var l, s, g, n, m, h, e, d, u;
    r = ((r % 360) + 360) % 360;
    if (k == 0)
    {
        if (isNaN(r) || r < JXG.Math.eps)
        {
            l = j;
            s = j;
            g = j
        }
        else
        {
            return "#ffffff"
        }
    }
    else
    {
        if (r >= 360)
        {
            h = 0
        }
        else
        {
            h = r
        }
        h = h / 60;
        m = Math.floor(h);
        n = h - m;
        e = j * (1 - k);
        d = j * (1 - (k * n));
        u = j * (1 - (k * (1 - n)));
        switch (m)
        {
        case 0:
            l = j;
            s = u;
            g = e;
            break;
        case 1:
            l = d;
            s = j;
            g = e;
            break;
        case 2:
            l = e;
            s = j;
            g = u;
            break;
        case 3:
            l = e;
            s = d;
            g = j;
            break;
        case 4:
            l = u;
            s = e;
            g = j;
            break;
        case 5:
            l = j;
            s = e;
            g = d;
            break
        }
    }
    l = Math.round(l * 255).toString(16);
    l = (l.length == 2) ? l : ((l.length == 1) ? "0" + l : "00");
    s = Math.round(s * 255).toString(16);
    s = (s.length == 2) ? s : ((s.length == 1) ? "0" + s : "00");
    g = Math.round(g * 255).toString(16);
    g = (g.length == 2) ? g : ((g.length == 1) ? "0" + g : "00");
    return ["#", l, s, g].join("")
};
JXG.rgb2hsv = function ()
{
    var d, m, q, n, e, i, f, t, l, w, u, p, j, k;
    d = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    m = d[1];
    q = d[2];
    d = d[0];
    k = JXG.Math.Statistics;
    n = d / 255;
    e = m / 255;
    i = q / 255;
    p = k.max([d, m, q]);
    j = k.min([d, m, q]);
    f = p / 255;
    t = j / 255;
    u = f;
    w = 0;
    if (u > 0)
    {
        w = (u - t) / (u * 1)
    }
    l = 1 / (f - t);
    if (w > 0)
    {
        if (p == d)
        {
            l = (e - i) * l
        }
        else
        {
            if (p == m)
            {
                l = 2 + (i - n) * l
            }
            else
            {
                l = 4 + (n - e) * l
            }
        }
    }
    l *= 60;
    if (l < 0)
    {
        l += 360
    }
    if (p == j)
    {
        l = 0
    }
    return [l, w, u]
};
JXG.rgb2LMS = function ()
{
    var n, k, e, f, d, j, i, h = [
        [0.05059983, 0.08585369, 0.0095242],
        [0.01893033, 0.08925308, 0.01370054],
        [0.00292202, 0.00975732, 0.07145979]
    ];
    n = JXG.rgbParser.apply(JXG.rgbParser, arguments);
    k = n[1];
    e = n[2];
    n = n[0];
    n = Math.pow(n, 0.476190476);
    k = Math.pow(k, 0.476190476);
    e = Math.pow(e, 0.476190476);
    f = n * h[0][0] + k * h[0][1] + e * h[0][2];
    d = n * h[1][0] + k * h[1][1] + e * h[1][2];
    j = n * h[2][0] + k * h[2][1] + e * h[2][2];
    i = [f, d, j];
    i.l = f;
    i.m = d;
    i.s = j;
    return i
};
JXG.LMS2rgb = function (f, e, p)
{
    var d, h, j, i, k = [
        [30.830854, -29.832659, 1.610474],
        [-6.481468, 17.715578, -2.532642],
        [-0.37569, -1.199062, 14.273846]
    ];
    d = f * k[0][0] + e * k[0][1] + p * k[0][2];
    h = f * k[1][0] + e * k[1][1] + p * k[1][2];
    j = f * k[2][0] + e * k[2][1] + p * k[2][2];
    var n = function (l)
    {
        var m = 127,
            g = 64;
        while (g > 0)
        {
            if (Math.pow(m, 0.476190476) > l)
            {
                m -= g
            }
            else
            {
                if (Math.pow(m + 1, 0.476190476) > l)
                {
                    return m
                }
                m += g
            }
            g /= 2
        }
        if (m == 254 && 13.994955247 < l)
        {
            return 255
        }
        return m
    };
    d = n(d);
    h = n(h);
    j = n(j);
    i = [d, h, j];
    i.r = d;
    i.g = h;
    i.b = j;
    return i
};
JXG.Board.prototype.angle = function (d, f, e)
{
    return JXG.Math.Geometry.angle(d, f, e)
};
JXG.Board.prototype.rad = function (d, f, e)
{
    return JXG.Math.Geometry.rad(d, f, e)
};
JXG.Board.prototype.distance = function (e, d)
{
    return JXG.Math.Geometry.distance(e, d)
};
JXG.Board.prototype.pow = function (e, d)
{
    return JXG.Math.pow(e, d)
};
JXG.Board.prototype.round = function (d, e)
{
    return (d).toFixed(e)
};
JXG.Board.prototype.cosh = function (d)
{
    return JXG.Math.cosh(d)
};
JXG.Board.prototype.sinh = function (d)
{
    return JXG.Math.sinh(d)
};
JXG.Board.prototype.sgn = function (d)
{
    return (d == 0 ? 0 : d / (Math.abs(d)))
};
JXG.Board.prototype.D = function (d, e)
{
    return JXG.Math.Numerics.D(d, e)
};
JXG.Board.prototype.I = function (d, e)
{
    return JXG.Math.Numerics.I(d, e)
};
JXG.Board.prototype.root = function (e, d, g)
{
    return JXG.Math.Numerics.root(e, d, g)
};
JXG.Board.prototype.lagrangePolynomial = function (d)
{
    return JXG.Math.Numerics.lagrangePolynomial(d)
};
JXG.Board.prototype.neville = function (d)
{
    return JXG.Math.Numerics.Neville(d)
};
JXG.Board.prototype.riemannsum = function (g, i, e, h, d)
{
    return JXG.Math.Numerics.riemannsum(g, i, e, h, d)
};
JXG.Board.prototype.abs = Math.abs;
JXG.Board.prototype.acos = Math.acos;
JXG.Board.prototype.asin = Math.asin;
JXG.Board.prototype.atan = Math.atan;
JXG.Board.prototype.ceil = Math.ceil;
JXG.Board.prototype.cos = Math.cos;
JXG.Board.prototype.exp = Math.exp;
JXG.Board.prototype.floor = Math.floor;
JXG.Board.prototype.log = Math.log;
JXG.Board.prototype.max = Math.max;
JXG.Board.prototype.min = Math.min;
JXG.Board.prototype.random = Math.random;
JXG.Board.prototype.sin = Math.sin;
JXG.Board.prototype.sqrt = Math.sqrt;
JXG.Board.prototype.tan = Math.tan;
JXG.Board.prototype.trunc = Math.ceil;
JXG.Board.prototype.factorial = function (d)
{
    return JXG.Math.factorial(d)
};
JXG.Board.prototype.binomial = function (e, d)
{
    return JXG.Math.binomial(e, d)
};
JXG.Point.prototype.setPositionX = function (f, d)
{
    var e = (f == JXG.COORDS_BY_USER) ? this.coords.usrCoords[2] : this.coords.scrCoords[2];
    this.setPosition(f, d, e)
};
JXG.Point.prototype.setPositionY = function (f, e)
{
    var d = (f == JXG.COORDS_BY_USER) ? this.coords.usrCoords[1] : this.coords.scrCoords[1];
    this.setPosition(f, d, e)
};
JXG.Board.prototype.getElement = function (d)
{
    return JXG.getReference(this, d)
};
JXG.Board.prototype.intersectionOptions = ["point", [
    [JXG.OBJECT_CLASS_LINE, JXG.OBJECT_CLASS_LINE],
    [JXG.OBJECT_CLASS_LINE, JXG.OBJECT_CLASS_CIRCLE],
    [JXG.OBJECT_CLASS_CIRCLE, JXG.OBJECT_CLASS_CIRCLE]
]];
JXG.Board.prototype.intersection = function (g, e, f, d)
{
    g = JXG.getReference(this, g);
    e = JXG.getReference(this, e);
    if (g.elementClass == JXG.OBJECT_CLASS_CURVE && e.elementClass == JXG.OBJECT_CLASS_CURVE)
    {
        return function ()
        {
            return JXG.Math.Geometry.meetCurveCurve(g, e, f, d, g.board)
        }
    }
    else
    {
        if ((g.elementClass == JXG.OBJECT_CLASS_CURVE && e.elementClass == JXG.OBJECT_CLASS_LINE) || (e.elementClass == JXG.OBJECT_CLASS_CURVE && g.elementClass == JXG.OBJECT_CLASS_LINE))
        {
            return function ()
            {
                return JXG.Math.Geometry.meetCurveLine(g, e, f, g.board)
            }
        }
        else
        {
            return function ()
            {
                return JXG.Math.Geometry.meet(g.stdform, e.stdform, f, g.board)
            }
        }
    }
};
JXG.Board.prototype.intersectionFunc = function (g, e, f, d)
{
    return this.intersection(g, e, f, d)
};
JXG.Board.prototype.otherIntersection = function (e, d, f)
{
    e = JXG.getReference(this, e);
    d = JXG.getReference(this, d);
    return function ()
    {
        var g = JXG.Math.Geometry.meet(e.stdform, d.stdform, 0, e.board);
        if (Math.abs(f.X() - g.usrCoords[1]) > JXG.Math.eps || Math.abs(f.Y() - g.usrCoords[2]) > JXG.Math.eps || Math.abs(f.Z() - g.usrCoords[0]) > JXG.Math.eps)
        {
            return g
        }
        else
        {
            return JXG.Math.Geometry.meet(e.stdform, d.stdform, 1, e.board)
        }
    }
};
JXG.Board.prototype.pointFunc = function ()
{
    return [null]
};
JXG.Board.prototype.pointOptions = ["point", [
    [JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.lineFunc = function ()
{
    return arguments
};
JXG.Board.prototype.lineOptions = ["line", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.linesegmentFunc = function ()
{
    return arguments
};
JXG.Board.prototype.linesegmentOptions = ["line", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.linesegmentAtts =
{
    straightFirst: false,
    straightLast: false
};
JXG.Board.prototype.arrowFunc = function ()
{
    return arguments
};
JXG.Board.prototype.arrowOptions = ["arrow", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.circleFunc = function ()
{
    return arguments
};
JXG.Board.prototype.circleOptions = ["circle", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE],
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_CIRCLE]
]];
JXG.Board.prototype.arrowparallelOptions = ["arrowparallel", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.arrowparallelFunc = function ()
{
    return arguments
};
JXG.Board.prototype.bisectorOptions = ["bisector", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.bisectorFunc = function ()
{
    return arguments
};
JXG.Board.prototype.circumcircleOptions = ["circumcircle", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.circumcircleFunc = function ()
{
    return arguments
};
JXG.Board.prototype.circumcirclemidpointOptions = ["circumcirclemidpoint", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.circumcirclemidpointFunc = function ()
{
    return arguments
};
JXG.Board.prototype.integralOptions = ["integral", [
    []
]];
JXG.Board.prototype.integralFunc = function ()
{
    return arguments
};
JXG.Board.prototype.midpointOptions = ["midpoint", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT],
    [JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.midpointFunc = function ()
{
    return arguments
};
JXG.Board.prototype.mirrorpointOptions = ["mirrorpoint", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.mirrorpointFunc = function ()
{
    return arguments
};
JXG.Board.prototype.normalOptions = ["normal", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.normalFunc = function ()
{
    return arguments
};
JXG.Board.prototype.parallelOptions = ["parallel", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.parallelFunc = function ()
{
    return arguments
};
JXG.Board.prototype.parallelpointOptions = ["parallelpoint", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_POINT]
]];
JXG.Board.prototype.parallelpointFunc = function ()
{
    return arguments
};
JXG.Board.prototype.perpendicularOptions = ["perpendicular", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.perpendicularFunc = function ()
{
    return arguments
};
JXG.Board.prototype.perpendicularpointOptions = ["perpendicularpoint", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.perpendicularpointFunc = function ()
{
    return arguments
};
JXG.Board.prototype.reflectionOptions = ["reflection", [
    [JXG.OBJECT_CLASS_POINT, JXG.OBJECT_CLASS_LINE]
]];
JXG.Board.prototype.reflectionFunc = function ()
{
    return arguments
};
JXG.Board.prototype.pstricks =
{
};
JXG.Board.prototype.pstricks.givePsTricksToDiv = function (d, e)
{
    JXG.PsTricks.givePsTricksToDiv(d, e)
};
JXG.Ticks = function (d, i, h, j, e, k, f, g)
{
    this.constructor();
    this.type = JXG.OBJECT_TYPE_TICKS;
    this.elementClass = JXG.OBJECT_CLASS_OTHER;
    this.line = d;
    this.board = this.line.board;
    this.ticksFunction = null;
    this.fixedTicks = null;
    this.equidistant = false;
    if (JXG.isFunction(i))
    {
        this.ticksFunction = i;
        throw new Error("Function arguments are no longer supported.")
    }
    else
    {
        if (JXG.isArray(i))
        {
            this.fixedTicks = i
        }
        else
        {
            if (Math.abs(i) < JXG.Math.eps)
            {
                i = this.board.options.line.ticks.defaultDistance
            }
            this.ticksFunction = function (l)
            {
                return i
            };
            this.equidistant = true
        }
    }
    this.minorTicks = ((h == null) ? this.board.options.line.ticks.minorTicks : h);
    if (this.minorTicks < 0)
    {
        this.minorTicks = -this.minorTicks
    }
    this.majorHeight = ((j == null) || (j == 0) ? this.board.options.line.ticks.majorHeight : j);
    if (this.majorHeight < 0)
    {
        this.majorHeight = -this.majorHeight
    }
    this.minorHeight = ((e == null) || (e == 0) ? this.board.options.line.ticks.minorHeight : e);
    if (this.minorHeight < 0)
    {
        this.minorHeight = -this.minorHeight
    }
    this.minTicksDistance = this.board.options.line.ticks.minTicksDistance;
    this.maxTicksDistance = this.board.options.line.ticks.maxTicksDistance;
    this.insertTicks = this.board.options.line.ticks.insertTicks;
    this.drawZero = this.board.options.line.ticks.drawZero;
    this.drawLabels = this.board.options.line.ticks.drawLabels;
    this.labels = [];
    this.init(this.board, k, f);
    this.visProp.visible = true;
    this.visProp.fillColor = this.line.visProp.fillColor;
    this.visProp.highlightFillColor = this.line.visProp.highlightFillColor;
    this.visProp.strokeColor = this.line.visProp.strokeColor;
    this.visProp.highlightStrokeColor = this.line.visProp.highlightStrokeColor;
    this.visProp.strokeWidth = this.line.visProp.strokeWidth;
    this.id = this.line.addTicks(this);
    this.board.setId(this, "Ti")
};
JXG.Ticks.prototype = new JXG.GeometryElement;
JXG.Ticks.prototype.hasPoint = function (d, e)
{
    return false
};
JXG.Ticks.prototype.calculateTicksCoordinates = function ()
{
    var h = this.line.point1,
        e = this.line.point2,
        y = h.coords.distance(JXG.COORDS_BY_USER, e.coords),
        M = (e.coords.usrCoords[1] - h.coords.usrCoords[1]) / y,
        K = (e.coords.usrCoords[2] - h.coords.usrCoords[2]) / y,
        q = h.coords.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + M, h.coords.usrCoords[2] + K], this.board)),
        G = (this.equidistant ? this.ticksFunction(1) : 1),
        B = 5,
        r, n, C = 1,
        J, k, D, d, F, x, v = function (T, i, Q, P, S)
        {
            var R, O;
            R = T.toString();
            if (R.length > 5)
            {
                R = T.toPrecision(3).toString()
            }
            O = new JXG.Text(Q, R, null, [i.usrCoords[1], i.usrCoords[2]], S + F + "Label", "", null, true, Q.options.text.defaultDisplay);
            O.distanceX = 0;
            O.distanceY = -10;
            O.setCoords(i.usrCoords[1] * 1 + O.distanceX / (Q.stretchX), i.usrCoords[2] * 1 + O.distanceY / (Q.stretchY));
            O.visProp.visible = P;
            return O
        },
        l = function (i)
        {
            return Math.floor(i) - (Math.floor(i) % G)
        },
        z = JXG.Math.eps,
        u = -this.line.getSlope(),
        w = this.majorHeight / 2,
        j = this.minorHeight / 2,
        L = 0,
        g = 0,
        A = 0,
        E = 0;
    if (Math.abs(u) < z)
    {
        L = 0;
        g = w;
        A = 0;
        E = j
    }
    else
    {
        if ((Math.abs(u) > 1 / z) || (isNaN(u)))
        {
            L = w;
            g = 0;
            A = j;
            E = 0
        }
        else
        {
            L = -w / Math.sqrt(1 / (u * u) + 1);
            g = L / u;
            A = -j / Math.sqrt(1 / (u * u) + 1);
            E = A / u
        }
    }
    this.removeTickLabels();
    this.ticks = new Array();
    this.labels = new Array();
    r = new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1], h.coords.usrCoords[2]], this.board);
    n = new JXG.Coords(JXG.COORDS_BY_USER, [e.coords.usrCoords[1], e.coords.usrCoords[2]], this.board);
    this.board.renderer.calcStraight(this.line, r, n);
    if (!this.equidistant)
    {
        var t = h.coords.usrCoords[1] - r.usrCoords[1];
        var p = h.coords.usrCoords[2] - r.usrCoords[2];
        var N = Math.sqrt(t * t + p * p);
        var m = h.coords.usrCoords[1] - n.usrCoords[1];
        var s = h.coords.usrCoords[2] - n.usrCoords[2];
        var f = Math.sqrt(m * m + s * s);
        var I = 0;
        var H = 0;
        for (var F = 0; F < this.fixedTicks.length; F++)
        {
            if ((-N <= this.fixedTicks[F]) && (this.fixedTicks[F] <= f))
            {
                if (this.fixedTicks[F] < 0)
                {
                    I = Math.abs(t) * this.fixedTicks[F] / N;
                    H = Math.abs(p) * this.fixedTicks[F] / N
                }
                else
                {
                    I = Math.abs(m) * this.fixedTicks[F] / f;
                    H = Math.abs(s) * this.fixedTicks[F] / f
                }
                D = new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + I, h.coords.usrCoords[2] + H], this.board);
                this.ticks.push(D);
                this.ticks[this.ticks.length - 1].major = true;
                this.labels.push(v(this.fixedTicks[F], D, this.board, this.drawLabels, this.id))
            }
        }
        this.dxMaj = L;
        this.dyMaj = g;
        this.dxMin = A;
        this.dyMin = E;
        return
    }
    while (q > 4 * this.minTicksDistance)
    {
        G /= 10;
        M /= 10;
        K /= 10;
        q = h.coords.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + M, h.coords.usrCoords[2] + K], this.board))
    }
    while (q < this.minTicksDistance)
    {
        G *= B;
        M *= B;
        K *= B;
        B = (B == 5 ? 2 : 5);
        q = h.coords.distance(JXG.COORDS_BY_SCREEN, new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + M, h.coords.usrCoords[2] + K], this.board))
    }
    if (this.board.renderer.isSameDirection(h.coords, r, n))
    {
        J = l(h.coords.distance(JXG.COORDS_BY_USER, r));
        k = h.coords.distance(JXG.COORDS_BY_USER, n);
        if (this.board.renderer.isSameDirection(h.coords, e.coords, r))
        {
            if (this.line.visProp.straightFirst)
            {
                J -= 2 * G
            }
        }
        else
        {
            k = -1 * k;
            J = -1 * J;
            if (this.line.visProp.straightFirst)
            {
                J -= 2 * G
            }
        }
    }
    else
    {
        if (!this.line.visProp.straightFirst)
        {
            J = 0
        }
        else
        {
            J = -l(h.coords.distance(JXG.COORDS_BY_USER, r)) - 2 * G
        }
        if (!this.line.visProp.straightLast)
        {
            k = y
        }
        else
        {
            k = h.coords.distance(JXG.COORDS_BY_USER, n)
        }
    }
    d = new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + J * M / G, h.coords.usrCoords[2] + J * K / G], this.board);
    D = new JXG.Coords(JXG.COORDS_BY_USER, [h.coords.usrCoords[1] + J * M / G, h.coords.usrCoords[2] + J * K / G], this.board);
    M /= this.minorTicks + 1;
    K /= this.minorTicks + 1;
    F = 0;
    x = J;
    while (d.distance(JXG.COORDS_BY_USER, D) < Math.abs(k - J) + JXG.Math.eps)
    {
        if (F % (this.minorTicks + 1) == 0)
        {
            D.major = true;
            this.labels.push(v(x, D, this.board, this.drawLabels, this.id));
            x += G
        }
        else
        {
            D.major = false;
            this.labels.push(null)
        }
        F++;
        this.ticks.push(D);
        D = new JXG.Coords(JXG.COORDS_BY_USER, [D.usrCoords[1] + M, D.usrCoords[2] + K], this.board);
        if (!this.drawZero && D.distance(JXG.COORDS_BY_USER, h.coords) <= JXG.Math.eps)
        {
            F++;
            x += G;
            D = new JXG.Coords(JXG.COORDS_BY_USER, [D.usrCoords[1] + M, D.usrCoords[2] + K], this.board)
        }
    }
    this.dxMaj = L;
    this.dyMaj = g;
    this.dxMin = A;
    this.dyMin = E
};
JXG.Ticks.prototype.removeTickLabels = function ()
{
    var d;
    if (this.ticks != null)
    {
        if ((this.board.needsFullUpdate || this.needsRegularUpdate) && !(this.board.options.renderer == "canvas" && this.board.options.text.defaultDisplay == "internal"))
        {
            for (d = 0; d < this.ticks.length; d++)
            {
                if (this.labels[d] != null && this.labels[d].visProp.visible)
                {
                    this.board.renderer.remove(this.labels[d].rendNode)
                }
            }
        }
    }
};
JXG.Ticks.prototype.update = function ()
{
    if (this.needsUpdate)
    {
        this.calculateTicksCoordinates()
    }
    return this
};
JXG.Ticks.prototype.updateRenderer = function ()
{
    if (this.needsUpdate)
    {
        if (this.ticks)
        {
            this.board.renderer.updateTicks(this, this.dxMaj, this.dyMaj, this.dxMin, this.dyMin)
        }
        this.needsUpdate = false
    }
    return this
};
JXG.createTicks = function (g, e, d)
{
    var f;
    d = JXG.checkAttributes(d, {
        layer: null
    });
    if ((e[0].elementClass == JXG.OBJECT_CLASS_LINE) && (JXG.isFunction(e[1]) || JXG.isArray(e[1]) || JXG.isNumber(e[1])))
    {
        f = new JXG.Ticks(e[0], e[1], d.minorTicks, d.majHeight, d.minHeight, d.id, d.name, d.layer)
    }
    else
    {
        throw new Error("JSXGraph: Can't create Ticks with parent types '" + (typeof e[0]) + "' and '" + (typeof e[1]) + "' and '" + (typeof e[2]) + "'.")
    }
    return f
};
JXG.JSXGraph.registerElement("ticks", JXG.createTicks);
JXG.Util =
{
};
JXG.Util.Unzip = function (U)
{
    var q = [],
        H = "",
        F = false,
        C, I = 0,
        R = [],
        u, k = new Array(32768),
        Z = 0,
        M = false,
        W, J, Y = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255],
        ac = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        T = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99],
        N = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
        B = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        r = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        y = U,
        e = 0,
        j = 0,
        ad = 1,
        d = 0,
        ab = 256,
        i = [],
        m;

    function g()
    {
        d += 8;
        if (e < y.length)
        {
            return y[e++]
        }
        else
        {
            return -1
        }
    }
    function s()
    {
        ad = 1
    }
    function X()
    {
        var af;
        d++;
        af = (ad & 1);
        ad >>= 1;
        if (ad == 0)
        {
            ad = g();
            af = (ad & 1);
            ad = (ad >> 1) | 128
        }
        return af
    }
    function V(af)
    {
        var ah = 0,
            ag = af;
        while (ag--)
        {
            ah = (ah << 1) | X()
        }
        if (af)
        {
            ah = Y[ah] >> (8 - af)
        }
        return ah
    }
    function f()
    {
        Z = 0
    }
    function z(af)
    {
        J++;
        k[Z++] = af;
        q.push(String.fromCharCode(af));
        if (Z == 32768)
        {
            Z = 0
        }
    }
    function p()
    {
        this.b0 = 0;
        this.b1 = 0;
        this.jump = null;
        this.jumppos = -1
    }
    var h = 288;
    var x = new Array(h);
    var P = new Array(32);
    var K = 0;
    var aa = null;
    var t = null;
    var O = new Array(64);
    var L = new Array(64);
    var A = 0;
    var E = new Array(17);
    E[0] = 0;
    var Q;
    var w;

    function l()
    {
        while (1)
        {
            if (E[A] >= w)
            {
                return -1
            }
            if (Q[E[A]] == A)
            {
                return E[A]++
            }
            E[A]++
        }
    }
    function G()
    {
        var ag = aa[K];
        var af;
        if (F)
        {
            document.write("<br>len:" + A + " treepos:" + K)
        }
        if (A == 17)
        {
            return -1
        }
        K++;
        A++;
        af = l();
        if (F)
        {
            document.write("<br>IsPat " + af)
        }
        if (af >= 0)
        {
            ag.b0 = af;
            if (F)
            {
                document.write("<br>b0 " + ag.b0)
            }
        }
        else
        {
            ag.b0 = 32768;
            if (F)
            {
                document.write("<br>b0 " + ag.b0)
            }
            if (G())
            {
                return -1
            }
        }
        af = l();
        if (af >= 0)
        {
            ag.b1 = af;
            if (F)
            {
                document.write("<br>b1 " + ag.b1)
            }
            ag.jump = null
        }
        else
        {
            ag.b1 = 32768;
            if (F)
            {
                document.write("<br>b1 " + ag.b1)
            }
            ag.jump = aa[K];
            ag.jumppos = K;
            if (G())
            {
                return -1
            }
        }
        A--;
        return 0
    }
    function n(aj, ah, ak, ag)
    {
        var ai;
        if (F)
        {
            document.write("currentTree " + aj + " numval " + ah + " lengths " + ak + " show " + ag)
        }
        aa = aj;
        K = 0;
        Q = ak;
        w = ah;
        for (ai = 0; ai < 17; ai++)
        {
            E[ai] = 0
        }
        A = 0;
        if (G())
        {
            if (F)
            {
                alert("invalid huffman tree\n")
            }
            return -1
        }
        if (F)
        {
            document.write("<br>Tree: " + aa.length);
            for (var af = 0; af < 32; af++)
            {
                document.write("Places[" + af + "].b0=" + aa[af].b0 + "<br>");
                document.write("Places[" + af + "].b1=" + aa[af].b1 + "<br>")
            }
        }
        return 0
    }
    function D(ai)
    {
        var ag, ah, ak = 0,
            aj = ai[ak],
            af;
        while (1)
        {
            af = X();
            if (F)
            {
                document.write("b=" + af)
            }
            if (af)
            {
                if (!(aj.b1 & 32768))
                {
                    if (F)
                    {
                        document.write("ret1")
                    }
                    return aj.b1
                }
                aj = aj.jump;
                ag = ai.length;
                for (ah = 0; ah < ag; ah++)
                {
                    if (ai[ah] === aj)
                    {
                        ak = ah;
                        break
                    }
                }
            }
            else
            {
                if (!(aj.b0 & 32768))
                {
                    if (F)
                    {
                        document.write("ret2")
                    }
                    return aj.b0
                }
                ak++;
                aj = ai[ak]
            }
        }
        if (F)
        {
            document.write("ret3")
        }
        return -1
    }
    function ae()
    {
        var aj, aw, ag, au, av;
        do
        {
            aj = X();
            ag = V(2);
            switch (ag)
            {
            case 0:
                if (F)
                {
                    alert("Stored\n")
                }
                break;
            case 1:
                if (F)
                {
                    alert("Fixed Huffman codes\n")
                }
                break;
            case 2:
                if (F)
                {
                    alert("Dynamic Huffman codes\n")
                }
                break;
            case 3:
                if (F)
                {
                    alert("Reserved block type!!\n")
                }
                break;
            default:
                if (F)
                {
                    alert("Unexpected value %d!\n", ag)
                }
                break
            }
            if (ag == 0)
            {
                var ar, af;
                s();
                ar = g();
                ar |= (g() << 8);
                af = g();
                af |= (g() << 8);
                if (((ar ^ ~af) & 65535))
                {
                    document.write("BlockLen checksum mismatch\n")
                }
                while (ar--)
                {
                    aw = g();
                    z(aw)
                }
            }
            else
            {
                if (ag == 1)
                {
                    var at;
                    while (1)
                    {
                        at = (Y[V(7)] >> 1);
                        if (at > 23)
                        {
                            at = (at << 1) | X();
                            if (at > 199)
                            {
                                at -= 128;
                                at = (at << 1) | X()
                            }
                            else
                            {
                                at -= 48;
                                if (at > 143)
                                {
                                    at = at + 136
                                }
                            }
                        }
                        else
                        {
                            at += 256
                        }
                        if (at < 256)
                        {
                            z(at)
                        }
                        else
                        {
                            if (at == 256)
                            {
                                break
                            }
                            else
                            {
                                var av, ao;
                                at -= 256 + 1;
                                av = V(T[at]) + ac[at];
                                at = Y[V(5)] >> 3;
                                if (B[at] > 8)
                                {
                                    ao = V(8);
                                    ao |= (V(B[at] - 8) << 8)
                                }
                                else
                                {
                                    ao = V(B[at])
                                }
                                ao += N[at];
                                for (at = 0; at < av; at++)
                                {
                                    var aw = k[(Z - ao) & 32767];
                                    z(aw)
                                }
                            }
                        }
                    }
                }
                else
                {
                    if (ag == 2)
                    {
                        var at, ap, ah, am, an;
                        var al = new Array(288 + 32);
                        ah = 257 + V(5);
                        am = 1 + V(5);
                        an = 4 + V(4);
                        for (at = 0; at < 19; at++)
                        {
                            al[at] = 0
                        }
                        for (at = 0; at < an; at++)
                        {
                            al[r[at]] = V(3)
                        }
                        av = P.length;
                        for (au = 0; au < av; au++)
                        {
                            P[au] = new p()
                        }
                        if (n(P, 19, al, 0))
                        {
                            f();
                            return 1
                        }
                        if (F)
                        {
                            document.write("<br>distanceTree");
                            for (var ax = 0; ax < P.length; ax++)
                            {
                                document.write("<br>" + P[ax].b0 + " " + P[ax].b1 + " " + P[ax].jump + " " + P[ax].jumppos)
                            }
                        }
                        ap = ah + am;
                        au = 0;
                        var ai = -1;
                        if (F)
                        {
                            document.write("<br>n=" + ap + " bits: " + d + "<br>")
                        }
                        while (au < ap)
                        {
                            ai++;
                            at = D(P);
                            if (F)
                            {
                                document.write("<br>" + ai + " i:" + au + " decode: " + at + "    bits " + d + "<br>")
                            }
                            if (at < 16)
                            {
                                al[au++] = at
                            }
                            else
                            {
                                if (at == 16)
                                {
                                    var aq;
                                    at = 3 + V(2);
                                    if (au + at > ap)
                                    {
                                        f();
                                        return 1
                                    }
                                    aq = au ? al[au - 1] : 0;
                                    while (at--)
                                    {
                                        al[au++] = aq
                                    }
                                }
                                else
                                {
                                    if (at == 17)
                                    {
                                        at = 3 + V(3)
                                    }
                                    else
                                    {
                                        at = 11 + V(7)
                                    }
                                    if (au + at > ap)
                                    {
                                        f();
                                        return 1
                                    }
                                    while (at--)
                                    {
                                        al[au++] = 0
                                    }
                                }
                            }
                        }
                        av = x.length;
                        for (au = 0; au < av; au++)
                        {
                            x[au] = new p()
                        }
                        if (n(x, ah, al, 0))
                        {
                            f();
                            return 1
                        }
                        av = x.length;
                        for (au = 0; au < av; au++)
                        {
                            P[au] = new p()
                        }
                        var ak = new Array();
                        for (au = ah; au < al.length; au++)
                        {
                            ak[au - ah] = al[au]
                        }
                        if (n(P, am, ak, 0))
                        {
                            f();
                            return 1
                        }
                        if (F)
                        {
                            document.write("<br>literalTree")
                        }
                        while (1)
                        {
                            at = D(x);
                            if (at >= 256)
                            {
                                var av, ao;
                                at -= 256;
                                if (at == 0)
                                {
                                    break
                                }
                                at--;
                                av = V(T[at]) + ac[at];
                                at = D(P);
                                if (B[at] > 8)
                                {
                                    ao = V(8);
                                    ao |= (V(B[at] - 8) << 8)
                                }
                                else
                                {
                                    ao = V(B[at])
                                }
                                ao += N[at];
                                while (av--)
                                {
                                    var aw = k[(Z - ao) & 32767];
                                    z(aw)
                                }
                            }
                            else
                            {
                                z(at)
                            }
                        }
                    }
                }
            }
        } while (!aj);
        f();
        s();
        return 0
    }
    JXG.Util.Unzip.prototype.unzipFile = function (af)
    {
        var ag;
        this.unzip();
        for (ag = 0; ag < R.length; ag++)
        {
            if (R[ag][1] == af)
            {
                return R[ag][0]
            }
        }
    };
    JXG.Util.Unzip.prototype.unzip = function ()
    {
        if (F)
        {
            alert(y)
        }
        v();
        return R
    };

    function v()
    {
        if (F)
        {
            alert("NEXTFILE")
        }
        q = [];
        var aj = [];
        M = false;
        aj[0] = g();
        aj[1] = g();
        if (F)
        {
            alert("type: " + aj[0] + " " + aj[1])
        }
        if (aj[0] == parseInt("78", 16) && aj[1] == parseInt("da", 16))
        {
            if (F)
            {
                alert("GEONExT-GZIP")
            }
            ae();
            if (F)
            {
                alert(q.join(""))
            }
            R[I] = new Array(2);
            R[I][0] = q.join("");
            R[I][1] = "geonext.gxt";
            I++
        }
        if (aj[0] == parseInt("1f", 16) && aj[1] == parseInt("8b", 16))
        {
            if (F)
            {
                alert("GZIP")
            }
            S();
            if (F)
            {
                alert(q.join(""))
            }
            R[I] = new Array(2);
            R[I][0] = q.join("");
            R[I][1] = "file";
            I++
        }
        if (aj[0] == parseInt("50", 16) && aj[1] == parseInt("4b", 16))
        {
            M = true;
            aj[2] = g();
            aj[3] = g();
            if (aj[2] == parseInt("3", 16) && aj[3] == parseInt("4", 16))
            {
                aj[0] = g();
                aj[1] = g();
                if (F)
                {
                    alert("ZIP-Version: " + aj[1] + " " + aj[0] / 10 + "." + aj[0] % 10)
                }
                C = g();
                C |= (g() << 8);
                if (F)
                {
                    alert("gpflags: " + C)
                }
                var af = g();
                af |= (g() << 8);
                if (F)
                {
                    alert("method: " + af)
                }
                g();
                g();
                g();
                g();
                var ak = g();
                ak |= (g() << 8);
                ak |= (g() << 16);
                ak |= (g() << 24);
                var ai = g();
                ai |= (g() << 8);
                ai |= (g() << 16);
                ai |= (g() << 24);
                var an = g();
                an |= (g() << 8);
                an |= (g() << 16);
                an |= (g() << 24);
                if (F)
                {
                    alert("local CRC: " + ak + "\nlocal Size: " + an + "\nlocal CompSize: " + ai)
                }
                var ag = g();
                ag |= (g() << 8);
                var am = g();
                am |= (g() << 8);
                if (F)
                {
                    alert("filelen " + ag)
                }
                ah = 0;
                i = [];
                while (ag--)
                {
                    var al = g();
                    if (al == "/" | al == ":")
                    {
                        ah = 0
                    }
                    else
                    {
                        if (ah < ab - 1)
                        {
                            i[ah++] = String.fromCharCode(al)
                        }
                    }
                }
                if (F)
                {
                    alert("nameBuf: " + i)
                }
                if (!m)
                {
                    m = i
                }
                var ah = 0;
                while (ah < am)
                {
                    al = g();
                    ah++
                }
                W = 4294967295;
                J = 0;
                if (an = 0 && fileOut.charAt(m.length - 1) == "/")
                {
                    if (F)
                    {
                        alert("skipdir")
                    }
                }
                if (af == 8)
                {
                    ae();
                    if (F)
                    {
                        alert(q.join(""))
                    }
                    R[I] = new Array(2);
                    R[I][0] = q.join("");
                    R[I][1] = i.join("");
                    I++
                }
                S()
            }
        }
    }
    function S()
    {
        var ak, ah = [],
            ai, ag, aj, af, al;
        if ((C & 8))
        {
            ah[0] = g();
            ah[1] = g();
            ah[2] = g();
            ah[3] = g();
            if (ah[0] == parseInt("50", 16) && ah[1] == parseInt("4b", 16) && ah[2] == parseInt("07", 16) && ah[3] == parseInt("08", 16))
            {
                ak = g();
                ak |= (g() << 8);
                ak |= (g() << 16);
                ak |= (g() << 24)
            }
            else
            {
                ak = ah[0] | (ah[1] << 8) | (ah[2] << 16) | (ah[3] << 24)
            }
            ai = g();
            ai |= (g() << 8);
            ai |= (g() << 16);
            ai |= (g() << 24);
            ag = g();
            ag |= (g() << 8);
            ag |= (g() << 16);
            ag |= (g() << 24);
            if (F)
            {
                alert("CRC:")
            }
        }
        if (M)
        {
            v()
        }
        ah[0] = g();
        if (ah[0] != 8)
        {
            if (F)
            {
                alert("Unknown compression method!")
            }
            return 0
        }
        C = g();
        if (F)
        {
            if ((C & ~ (parseInt("1f", 16))))
            {
                alert("Unknown flags set!")
            }
        }
        g();
        g();
        g();
        g();
        g();
        aj = g();
        if ((C & 4))
        {
            ah[0] = g();
            ah[2] = g();
            A = ah[0] + 256 * ah[1];
            if (F)
            {
                alert("Extra field size: " + A)
            }
            for (af = 0; af < A; af++)
            {
                g()
            }
        }
        if ((C & 8))
        {
            af = 0;
            i = [];
            while (al = g())
            {
                if (al == "7" || al == ":")
                {
                    af = 0
                }
                if (af < ab - 1)
                {
                    i[af++] = al
                }
            }
            if (F)
            {
                alert("original file name: " + i)
            }
        }
        if ((C & 16))
        {
            while (al = g())
            {
            }
        }
        if ((C & 2))
        {
            g();
            g()
        }
        ae();
        ak = g();
        ak |= (g() << 8);
        ak |= (g() << 16);
        ak |= (g() << 24);
        ag = g();
        ag |= (g() << 8);
        ag |= (g() << 16);
        ag |= (g() << 24);
        if (M)
        {
            v()
        }
    }
};
JXG.Util.Base64 =
{
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (f)
    {
        var d = [],
            n, l, j, m, k, h, g, e = 0;
        f = JXG.Util.Base64._utf8_encode(f);
        while (e < f.length)
        {
            n = f.charCodeAt(e++);
            l = f.charCodeAt(e++);
            j = f.charCodeAt(e++);
            m = n >> 2;
            k = ((n & 3) << 4) | (l >> 4);
            h = ((l & 15) << 2) | (j >> 6);
            g = j & 63;
            if (isNaN(l))
            {
                h = g = 64
            }
            else
            {
                if (isNaN(j))
                {
                    g = 64
                }
            }
            d.push([this._keyStr.charAt(m), this._keyStr.charAt(k), this._keyStr.charAt(h), this._keyStr.charAt(g)].join(""))
        }
        return d.join("")
    },
    decode: function (g, f)
    {
        var d = [],
            p, m, k, n, l, j, h, e = 0;
        g = g.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (e < g.length)
        {
            n = this._keyStr.indexOf(g.charAt(e++));
            l = this._keyStr.indexOf(g.charAt(e++));
            j = this._keyStr.indexOf(g.charAt(e++));
            h = this._keyStr.indexOf(g.charAt(e++));
            p = (n << 2) | (l >> 4);
            m = ((l & 15) << 4) | (j >> 2);
            k = ((j & 3) << 6) | h;
            d.push(String.fromCharCode(p));
            if (j != 64)
            {
                d.push(String.fromCharCode(m))
            }
            if (h != 64)
            {
                d.push(String.fromCharCode(k))
            }
        }
        d = d.join("");
        if (f)
        {
            d = JXG.Util.Base64._utf8_decode(d)
        }
        return d
    },
    _utf8_encode: function (e)
    {
        e = e.replace(/\r\n/g, "\n");
        var d = "";
        for (var g = 0; g < e.length; g++)
        {
            var f = e.charCodeAt(g);
            if (f < 128)
            {
                d += String.fromCharCode(f)
            }
            else
            {
                if ((f > 127) && (f < 2048))
                {
                    d += String.fromCharCode((f >> 6) | 192);
                    d += String.fromCharCode((f & 63) | 128)
                }
                else
                {
                    d += String.fromCharCode((f >> 12) | 224);
                    d += String.fromCharCode(((f >> 6) & 63) | 128);
                    d += String.fromCharCode((f & 63) | 128)
                }
            }
        }
        return d
    },
    _utf8_decode: function (d)
    {
        var f = [],
            h = 0,
            j = 0,
            g = 0,
            e = 0;
        while (h < d.length)
        {
            j = d.charCodeAt(h);
            if (j < 128)
            {
                f.push(String.fromCharCode(j));
                h++
            }
            else
            {
                if ((j > 191) && (j < 224))
                {
                    g = d.charCodeAt(h + 1);
                    f.push(String.fromCharCode(((j & 31) << 6) | (g & 63)));
                    h += 2
                }
                else
                {
                    g = d.charCodeAt(h + 1);
                    e = d.charCodeAt(h + 2);
                    f.push(String.fromCharCode(((j & 15) << 12) | ((g & 63) << 6) | (e & 63)));
                    h += 3
                }
            }
        }
        return f.join("")
    },
    _destrip: function (j, g)
    {
        var e = [],
            h, f, d = [];
        if (g == null)
        {
            g = 76
        }
        j.replace(/ /g, "");
        h = j.length / g;
        for (f = 0; f < h; f++)
        {
            e[f] = j.substr(f * g, g)
        }
        if (h != j.length / g)
        {
            e[e.length] = j.substr(h * g, j.length - (h * g))
        }
        for (f = 0; f < e.length; f++)
        {
            d.push(e[f])
        }
        return d.join("\n")
    },
    decodeAsArray: function (e)
    {
        var g = this.decode(e),
            d = [],
            f;
        for (f = 0; f < g.length; f++)
        {
            d[f] = g.charCodeAt(f)
        }
        return d
    },
    decodeGEONExT: function (d)
    {
        return decodeAsArray(destrip(d), false)
    }
};
JXG.Util.asciiCharCodeAt = function (e, d)
{
    var f = e.charCodeAt(d);
    if (f > 255)
    {
        switch (f)
        {
        case 8364:
            f = 128;
            break;
        case 8218:
            f = 130;
            break;
        case 402:
            f = 131;
            break;
        case 8222:
            f = 132;
            break;
        case 8230:
            f = 133;
            break;
        case 8224:
            f = 134;
            break;
        case 8225:
            f = 135;
            break;
        case 710:
            f = 136;
            break;
        case 8240:
            f = 137;
            break;
        case 352:
            f = 138;
            break;
        case 8249:
            f = 139;
            break;
        case 338:
            f = 140;
            break;
        case 381:
            f = 142;
            break;
        case 8216:
            f = 145;
            break;
        case 8217:
            f = 146;
            break;
        case 8220:
            f = 147;
            break;
        case 8221:
            f = 148;
            break;
        case 8226:
            f = 149;
            break;
        case 8211:
            f = 150;
            break;
        case 8212:
            f = 151;
            break;
        case 732:
            f = 152;
            break;
        case 8482:
            f = 153;
            break;
        case 353:
            f = 154;
            break;
        case 8250:
            f = 155;
            break;
        case 339:
            f = 156;
            break;
        case 382:
            f = 158;
            break;
        case 376:
            f = 159;
            break;
        default:
            break
        }
    }
    return f
};
JXG.Util.utf8Decode = function (d)
{
    var f = [];
    var h = 0;
    var k = 0,
        j = 0,
        g = 0,
        e;
    if (!JXG.exists(d))
    {
        return ""
    }
    while (h < d.length)
    {
        k = d.charCodeAt(h);
        if (k < 128)
        {
            f.push(String.fromCharCode(k));
            h++
        }
        else
        {
            if ((k > 191) && (k < 224))
            {
                g = d.charCodeAt(h + 1);
                f.push(String.fromCharCode(((k & 31) << 6) | (g & 63)));
                h += 2
            }
            else
            {
                g = d.charCodeAt(h + 1);
                e = d.charCodeAt(h + 2);
                f.push(String.fromCharCode(((k & 15) << 12) | ((g & 63) << 6) | (e & 63)));
                h += 3
            }
        }
    }
    return f.join("")
};
JXG.Util.genUUID = function ()
{
    var h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        f = new Array(36),
        e = 0,
        g;
    for (var d = 0; d < 36; d++)
    {
        if (d == 8 || d == 13 || d == 18 || d == 23)
        {
            f[d] = "-"
        }
        else
        {
            if (d == 14)
            {
                f[d] = "4"
            }
            else
            {
                if (e <= 2)
                {
                    e = 33554432 + (Math.random() * 16777216) | 0
                }
                g = e & 15;
                e = e >> 4;
                f[d] = h[(d == 19) ? (g & 3) | 8 : g]
            }
        }
    }
    return f.join("")
};
JXG.PsTricks = new
function ()
{
    this.psTricksString = ""
};
JXG.PsTricks.convertBoardToPsTricks = function (e)
{
    var g = new JXG.Coords(JXG.COORDS_BY_SCREEN, [e.canvasWidth, e.canvasHeight], e);
    var f = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], e);
    this.psTricksString = "\\begin{pspicture*}(" + f.usrCoords[1] + "," + g.usrCoords[2] + ")(" + g.usrCoords[1] + "," + f.usrCoords[2] + ")\n";
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_ARC)
        {
            if (h.visProp.visible)
            {
                this.addSector(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_POLYGON)
        {
            if (h.visProp.visible)
            {
                this.addPolygon(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_ANGLE)
        {
            if (h.visProp.visible)
            {
                this.addAngle(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_CIRCLE)
        {
            if (h.visProp.visible)
            {
                this.addCircle(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_ARC)
        {
            if (h.visProp.visible)
            {
                this.addArc(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_LINE)
        {
            if (h.visProp.visible)
            {
                this.addLine(h)
            }
        }
    }
    for (var d in e.objects)
    {
        var h = e.objects[d];
        if (h.type == JXG.OBJECT_TYPE_POINT)
        {
            if (h.visProp.visible)
            {
                this.addPoint(h)
            }
        }
    }
    this.psTricksString += "\\end{pspicture*}"
};
JXG.PsTricks.givePsTricksToDiv = function (d, e)
{
    this.convertBoardToPsTricks(e);
    document.getElementById(d).innerHTML = this.psTricksString
};
JXG.PsTricks.addPoint = function (d)
{
    this.psTricksString += "\\psdot";
    this.psTricksString += "[linecolor=" + this.parseColor(d.visProp.strokeColor) + ",";
    this.psTricksString += "dotstyle=";
    if (d.visProp.face == "cross")
    {
        this.psTricksString += "x, dotsize=";
        if (d.visProp.size == 2)
        {
            this.psTricksString += "2pt 2"
        }
        else
        {
            if (d.visProp.size == 3)
            {
                this.psTricksString += "5pt 2"
            }
            else
            {
                if (d.visProp.size >= 4)
                {
                    this.psTricksString += "5pt 3"
                }
            }
        }
    }
    else
    {
        if (d.visProp.face == "circle")
        {
            this.psTricksString += "*, dotsize=";
            if (d.visProp.size == 1)
            {
                this.psTricksString += "2pt 2"
            }
            else
            {
                if (d.visProp.size == 2)
                {
                    this.psTricksString += "4pt 2"
                }
                else
                {
                    if (d.visProp.size == 3)
                    {
                        this.psTricksString += "6pt 2"
                    }
                    else
                    {
                        if (d.visProp.size >= 4)
                        {
                            this.psTricksString += "6pt 3"
                        }
                    }
                }
            }
        }
        else
        {
            if (d.visProp.face == "square")
            {
                this.psTricksString += "square*, dotsize=";
                if (d.visProp.size == 2)
                {
                    this.psTricksString += "2pt 2"
                }
                else
                {
                    if (d.visProp.size == 3)
                    {
                        this.psTricksString += "5pt 2"
                    }
                    else
                    {
                        if (d.visProp.size >= 4)
                        {
                            this.psTricksString += "5pt 3"
                        }
                    }
                }
            }
            else
            {
                if (d.visProp.face == "plus")
                {
                    this.psTricksString += "+, dotsize=";
                    if (d.visProp.size == 2)
                    {
                        this.psTricksString += "2pt 2"
                    }
                    else
                    {
                        if (d.visProp.size == 3)
                        {
                            this.psTricksString += "5pt 2"
                        }
                        else
                        {
                            if (d.visProp.size >= 4)
                            {
                                this.psTricksString += "5pt 3"
                            }
                        }
                    }
                }
            }
        }
    }
    this.psTricksString += "]";
    this.psTricksString += "(" + d.coords.usrCoords[1] + "," + d.coords.usrCoords[2] + ")\n";
    this.psTricksString += "\\rput(" + (d.coords.usrCoords[1] + 15 / d.board.stretchY) + "," + (d.coords.usrCoords[2] + 15 / d.board.stretchY) + "){\\small $" + d.name + "$}\n"
};
JXG.PsTricks.addLine = function (f)
{
    var e = new JXG.Coords(JXG.COORDS_BY_USER, f.point1.coords.usrCoords, f.board);
    var d = new JXG.Coords(JXG.COORDS_BY_USER, f.point2.coords.usrCoords, f.board);
    if (f.visProp.straightFirst || f.visProp.straightLast)
    {
        f.board.renderer.calcStraight(f, e, d)
    }
    this.psTricksString += "\\psline";
    this.psTricksString += "[linecolor=" + this.parseColor(f.visProp.strokeColor) + ", linewidth=" + f.visProp.strokeWidth + "px";
    this.psTricksString += "]";
    if (f.visProp.firstArrow)
    {
        if (f.visProp.lastArrow)
        {
            this.psTricksString += "{<->}"
        }
        else
        {
            this.psTricksString += "{<-}"
        }
    }
    else
    {
        if (f.visProp.lastArrow)
        {
            this.psTricksString += "{->}"
        }
    }
    this.psTricksString += "(" + e.usrCoords[1] + "," + e.usrCoords[2] + ")(" + d.usrCoords[1] + "," + d.usrCoords[2] + ")\n"
};
JXG.PsTricks.addCircle = function (e)
{
    var d = e.Radius();
    this.psTricksString += "\\pscircle";
    this.psTricksString += "[linecolor=" + this.parseColor(e.visProp.strokeColor) + ", linewidth=" + e.visProp.strokeWidth + "px";
    if (e.visProp.fillColor != "none" && e.visProp.fillOpacity != 0)
    {
        this.psTricksString += ", fillstyle=solid, fillcolor=" + this.parseColor(e.visProp.fillColor) + ", opacity=" + e.visProp.fillOpacity.toFixed(5)
    }
    this.psTricksString += "]";
    this.psTricksString += "(" + e.midpoint.coords.usrCoords[1] + "," + e.midpoint.coords.usrCoords[2] + "){" + d + "}\n"
};
JXG.PsTricks.addPolygon = function (e)
{
    this.psTricksString += "\\pspolygon";
    this.psTricksString += "[linestyle=none, fillstyle=solid, fillcolor=" + this.parseColor(e.visProp.fillColor) + ", opacity=" + e.visProp.fillOpacity.toFixed(5) + "]";
    for (var d = 0; d < e.vertices.length; d++)
    {
        this.psTricksString += "(" + e.vertices[d].coords.usrCoords[1] + "," + e.vertices[d].coords.usrCoords[2] + ")"
    }
    this.psTricksString += "\n"
};
JXG.PsTricks.addArc = function (e)
{
    var d = e.Radius();
    var g =
    {
    };
    g.coords = new JXG.Coords(JXG.COORDS_BY_USER, [e.board.canvasWidth / (e.board.stretchY), e.midpoint.coords.usrCoords[2]], e.board);
    var f = JXG.Math.Geometry.trueAngle(g, e.midpoint, e.point2).toFixed(4);
    var h = JXG.Math.Geometry.trueAngle(g, e.midpoint, e.point3).toFixed(4);
    this.psTricksString += "\\psarc";
    this.psTricksString += "[linecolor=" + this.parseColor(e.visProp.strokeColor) + ", linewidth=" + e.visProp.strokeWidth + "px";
    this.psTricksString += "]";
    if (e.visProp.lastArrow)
    {
        if (e.visProp.firstArrow)
        {
            this.psTricksString += "{<->}"
        }
        else
        {
            this.psTricksString += "{<-}"
        }
    }
    else
    {
        if (e.visProp.firstArrow)
        {
            this.psTricksString += "{->}"
        }
    }
    this.psTricksString += "(" + e.midpoint.coords.usrCoords[1] + "," + e.midpoint.coords.usrCoords[2] + "){" + d + "}{" + f + "}{" + h + "}\n"
};
JXG.PsTricks.addSector = function (e)
{
    var d = e.Radius();
    var g =
    {
    };
    g.coords = new JXG.Coords(JXG.COORDS_BY_USER, [e.board.canvasWidth / (e.board.stretchY), e.midpoint.coords.usrCoords[2]], e.board);
    var f = JXG.Math.Geometry.trueAngle(g, e.midpoint, e.point2).toFixed(4);
    var h = JXG.Math.Geometry.trueAngle(g, e.midpoint, e.point3).toFixed(4);
    if (e.visProp.fillColor != "none" && e.visProp.fillOpacity != 0)
    {
        this.psTricksString += "\\pswedge";
        this.psTricksString += "[linestyle=none, fillstyle=solid, fillcolor=" + this.parseColor(e.visProp.fillColor) + ", opacity=" + e.visProp.fillOpacity.toFixed(5) + "]";
        this.psTricksString += "(" + e.midpoint.coords.usrCoords[1] + "," + e.midpoint.coords.usrCoords[2] + "){" + d + "}{" + f + "}{" + h + "}\n"
    }
};
JXG.PsTricks.addAngle = function (e)
{
    var d = e.radius;
    var g =
    {
    };
    g.coords = new JXG.Coords(JXG.COORDS_BY_USER, [e.board.canvasWidth / (e.board.stretchY), e.point2.coords.usrCoords[2]], e.board);
    var f = JXG.Math.Geometry.trueAngle(g, e.point2, e.point1).toFixed(4);
    var h = JXG.Math.Geometry.trueAngle(g, e.point2, e.point3).toFixed(4);
    if (e.visProp.fillColor != "none" && e.visProp.fillOpacity != 0)
    {
        this.psTricksString += "\\pswedge";
        this.psTricksString += "[linestyle=none, fillstyle=solid, fillcolor=" + this.parseColor(e.visProp.fillColor) + ", opacity=" + e.visProp.fillOpacity.toFixed(5) + "]";
        this.psTricksString += "(" + e.point2.coords.usrCoords[1] + "," + e.point2.coords.usrCoords[2] + "){" + d + "}{" + f + "}{" + h + "}\n"
    }
    this.psTricksString += "\\psarc";
    this.psTricksString += "[linecolor=" + this.parseColor(e.visProp.strokeColor) + ", linewidth=" + e.visProp.strokeWidth + "px";
    this.psTricksString += "]";
    this.psTricksString += "(" + e.point2.coords.usrCoords[1] + "," + e.point2.coords.usrCoords[2] + "){" + d + "}{" + f + "}{" + h + "}\n"
};
JXG.PsTricks.parseColor = function (e)
{
    var d = JXG.rgbParser(e);
    return "{[rgb]{" + d[0] / 255 + "," + d[1] / 255 + "," + d[2] / 255 + "}}"
};
JXG.Server = function ()
{
};
JXG.Server.modules = function ()
{
};
JXG.Server.runningCalls =
{
};
JXG.Server.handleError = function (d)
{
    alert("error occured, server says: " + d.message)
};
JXG.Server.callServer = function (h, p, i, m)
{
    var n, e, l, g, d, j, f;
    m = m || false;
    g = "";
    for (f in i)
    {
        g += "&" + escape(f) + "=" + escape(i[f])
    }
    j = JXG.toJSON(i);
    do
    {
        d = h + Math.floor(Math.random() * 4096)
    } while (typeof this.runningCalls[d] != "undefined");
    this.runningCalls[d] =
    {
        action: h
    };
    if (typeof i.module != "undefined")
    {
        this.runningCalls[d].module = i.module
    }
    n = JXG.serverBase + "JXGServer.py";
    e = "action=" + escape(h) + "&id=" + d + "&dataJSON=" + escape(JXG.Util.Base64.encode(j));
    this.cbp = function (v)
    {
        var x, r, s, u, w, k, t, q;
        x = (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(v))).unzip();
        if (JXG.isArray(x) && x.length > 0)
        {
            x = x[0][0]
        }
        if (typeof x != "string")
        {
            return
        }
        r = window.JSON && window.JSON.parse ? window.JSON.parse(x) : (new Function("return " + x))();
        if (r.type == "error")
        {
            this.handleError(r)
        }
        else
        {
            if (r.type == "response")
            {
                k = r.id;
                for (t = 0; t < r.fields.length; t++)
                {
                    s = r.fields[t];
                    u = s.namespace + (typeof((new Function("return " + s.namespace))()) == "object" ? "." : ".prototype.") + s.name + " = " + s.value;
                    (new Function(u))()
                }
                for (t = 0; t < r.handler.length; t++)
                {
                    s = r.handler[t];
                    w = [];
                    for (q = 0; q < s.parameters.length; q++)
                    {
                        w[q] = '"' + s.parameters[q] + '": ' + s.parameters[q]
                    }
                    u = "if(typeof JXG.Server.modules." + this.runningCalls[k].module + ' == "undefined")JXG.Server.modules.' + this.runningCalls[k].module + " = {};";
                    u += "JXG.Server.modules." + this.runningCalls[k].module + "." + s.name + "_cb = " + s.callback + ";";
                    u += "JXG.Server.modules." + this.runningCalls[k].module + "." + s.name + " = function (" + s.parameters.join(",") + ', __JXGSERVER_CB__, __JXGSERVER_SYNC) {if(typeof __JXGSERVER_CB__ == "undefined") __JXGSERVER_CB__ = JXG.Server.modules.' + this.runningCalls[k].module + "." + s.name + "_cb;var __JXGSERVER_PAR__ = {" + w.join(",") + ', "module": "' + this.runningCalls[k].module + '", "handler": "' + s.name + '" };JXG.Server.callServer("exec", __JXGSERVER_CB__, __JXGSERVER_PAR__, __JXGSERVER_SYNC);};';
                    (new Function(u))()
                }
                delete this.runningCalls[k];
                p(r.data)
            }
        }
    };
    this.cb = JXG.bind(this.cbp, this);
    if (window.XMLHttpRequest)
    {
        l = new XMLHttpRequest();
        l.overrideMimeType("text/plain; charset=iso-8859-1")
    }
    else
    {
        l = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (l)
    {
        l.open("POST", n, !m);
        l.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (!m)
        {
            l.onreadystatechange = (function (k)
            {
                return function ()
                {
                    switch (l.readyState)
                    {
                    case 4:
                        if (l.status != 200)
                        {
                        }
                        else
                        {
                            k(l.responseText)
                        }
                        break;
                    default:
                        return false;
                        break
                    }
                }
            })(this.cb)
        }
        l.send(e);
        if (m)
        {
            this.cb(l.responseText)
        }
    }
    else
    {
        return false
    }
};
JXG.Server.loadModule_cb = function (e)
{
    var d;
    for (d = 0; d < e.length; d++)
    {
        alert(e[d].name + ": " + e[d].value)
    }
};
JXG.Server.loadModule = function (d)
{
    return JXG.Server.callServer("load", JXG.Server.loadModule_cb, {
        module: d
    }, true)
};
JXG.Server.load = JXG.Server.loadModule;
JXG.DataSource = function ()
{
    this.data = [];
    this.columnHeaders = [];
    this.rowHeaders = [];
    return this
};
JXG.DataSource.prototype.loadFromArray = function (h, k, g)
{
    var f, e, d;
    if (typeof k == "undefined")
    {
        k = false
    }
    if (typeof g == "undefined")
    {
        g = false
    }
    if (JXG.isArray(k))
    {
        this.columnHeader = k;
        k = false
    }
    if (JXG.isArray(g))
    {
        this.rowHeader = g;
        g = false
    }
    this.data = [];
    if (k)
    {
        this.columnHeader = []
    }
    if (g)
    {
        this.rowHeader = []
    }
    if (typeof h != "undefined")
    {
        this.data = new Array(h.length);
        for (f = 0; f < h.length; f++)
        {
            this.data[f] = new Array(h[f].length);
            for (e = 0; e < h[f].length; e++)
            {
                d = h[f][e];
                if ("" + parseFloat(d) == d)
                {
                    this.data[f][e] = parseFloat(d)
                }
                else
                {
                    if (d != "-")
                    {
                        this.data[f][e] = d
                    }
                    else
                    {
                        this.data[f][e] = NaN
                    }
                }
            }
        }
        if (k)
        {
            this.columnHeader = this.data[0].slice(1);
            this.data = this.data.slice(1)
        }
        if (g)
        {
            this.rowHeader = new Array();
            for (f = 0; f < this.data.length; f++)
            {
                this.rowHeader.push(this.data[f][0]);
                this.data[f] = this.data[f].slice(1)
            }
        }
    }
    return this
};
JXG.DataSource.prototype.loadFromTable = function (m, f, k)
{
    var n, h, g, e, l, d;
    if (typeof f == "undefined")
    {
        f = false
    }
    if (typeof k == "undefined")
    {
        k = false
    }
    if (JXG.isArray(f))
    {
        this.columnHeader = f;
        f = false
    }
    if (JXG.isArray(k))
    {
        this.rowHeader = k;
        k = false
    }
    this.data = [];
    if (f)
    {
        this.columnHeader = []
    }
    if (k)
    {
        this.rowHeader = []
    }
    m = document.getElementById(m);
    if (typeof m != "undefined")
    {
        n = m.getElementsByTagName("tr");
        this.data = new Array(n.length);
        for (h = 0; h < n.length; h++)
        {
            e = n[h].getElementsByTagName("td");
            this.data[h] = new Array(e.length);
            for (g = 0; g < e.length; g++)
            {
                l = e[g].innerHTML;
                if ("" + parseFloat(l) == l)
                {
                    this.data[h][g] = parseFloat(l)
                }
                else
                {
                    if (l != "-")
                    {
                        this.data[h][g] = l
                    }
                    else
                    {
                        this.data[h][g] = NaN
                    }
                }
            }
        }
        if (f)
        {
            this.columnHeader = this.data[0].slice(1);
            this.data = this.data.slice(1)
        }
        if (k)
        {
            this.rowHeader = new Array();
            for (h = 0; h < this.data.length; h++)
            {
                this.rowHeader.push(this.data[h][0]);
                this.data[h] = this.data[h].slice(1)
            }
        }
    }
    return this
};
JXG.DataSource.prototype.addColumn = function (d, f, e)
{
};
JXG.DataSource.prototype.addRow = function (d, f, e)
{
};
JXG.DataSource.prototype.getColumn = function (e)
{
    var d = new Array(this.data.length),
        f;
    if (typeof e == "string")
    {
        for (f = 0; f < this.columnHeader.length; f++)
        {
            if (e == this.columnHeader[f])
            {
                e = f;
                break
            }
        }
    }
    for (f = 0; f < this.data.length; f++)
    {
        if (this.data[f].length > e)
        {
            d[f] = this.data[f][e]
        }
    }
    return d
};
JXG.DataSource.prototype.getRow = function (f)
{
    var d, e;
    if (typeof f == "string")
    {
        for (e = 0; e < this.rowHeader.length; e++)
        {
            if (f == this.rowHeader[e])
            {
                f = e;
                break
            }
        }
    }
    d = new Array(this.data[f].length);
    for (e = 0; e < this.data[f].length; e++)
    {
        d[e] = this.data[f][e]
    }
    return d
};
JXG.Board.prototype.construct = function (d, y, H, C, m)
{
    var s, D, B, t =
    {
    },
        u, g, w, h, e, G, p, A, z, F, E, v, n, f, x, q, r;
    if (!JXG.exists(y))
    {
        y = "normal"
    }
    else
    {
        E = []
    }
    t.lines = [];
    t.circles = [];
    t.points = [];
    t.intersections = [];
    t.angles = [];
    t.macros = [];
    t.functions = [];
    t.texts = [];
    t.polygons = [];
    if (d.search(/\{/) != -1)
    {
        G = d.match(/\{/);
        G = G.length;
        z = 0;
        for (B = 0; B < G; B++)
        {
            A = d.slice(z).search(/\{/);
            n = d.slice(A);
            n = n.slice(0, n.search(/\}/) + 1);
            n = n.replace(/;/g, "?");
            d = d.slice(0, A) + n + d.slice(A + n.length);
            z = A + 1
        }
    }
    s = d.split(";");
    for (D = 0; D < s.length; D++)
    {
        s[D] = s[D].replace(/^\s+/, "").replace(/\s+$/, "");
        if (s[D].search(/\{/) != -1)
        {
            s[D] = s[D].replace(/\?/g, ";")
        }
        if (s[D].search(/Macro/) != -1)
        {
            this.addMacro(s[D])
        }
        else
        {
            if (s[D].length > 0)
            {
                f = false;
                if (s[D].search(/=/) != -1)
                {
                    u = s[D].split("=");
                    q = u[1];
                    q = q.replace(/^\s+/, "").replace(/\s+$/, "");
                    if (u[0].search(/\./) != -1)
                    {
                        f = true;
                        u = u[0].split(".");
                        x = u[u.length - 1];
                        x = x.replace(/^\s+/, "").replace(/\s+$/, "");
                        u.pop();
                        u = u.join(".");
                        if (y == "macro")
                        {
                            for (B = 0; B < H.length; B++)
                            {
                                if (u == H[B])
                                {
                                    u = C[B]
                                }
                            }
                        }
                        JXG.getReference(this, u).setProperty(x + ":" + q)
                    }
                }
                if (!f)
                {
                    if (s[D].search(/=/) != -1)
                    {
                        u = s[D].split("=");
                        s[D] = u[1].replace(/^\s+/, "");
                        u = u[0].replace(/\s+$/, "")
                    }
                    else
                    {
                        u = ""
                    }
                    r =
                    {
                    };
                    v = true;
                    while (v)
                    {
                        if (s[D].search(/(.*)draft$/) != -1)
                        {
                            r.draft = true;
                            s[D] = RegExp.$1;
                            s[D] = s[D].replace(/\s+$/, "")
                        }
                        if (s[D].search(/(.*)invisible$/) != -1)
                        {
                            r.visible = false;
                            s[D] = RegExp.$1;
                            s[D] = s[D].replace(/\s+$/, "")
                        }
                        if (s[D].search(/(.*)nolabel$/) != -1)
                        {
                            r.withLabel = false;
                            s[D] = RegExp.$1;
                            s[D] = s[D].replace(/\s+$/, "")
                        }
                        if (s[D].search(/nolabel|invisible|draft/) == -1)
                        {
                            v = false
                        }
                    }
                    p = true;
                    if (this.definedMacros)
                    {
                        for (B = 0; B < this.definedMacros.macros.length; B++)
                        {
                            F = new RegExp("^" + this.definedMacros.macros[B][0] + "\\s*\\(");
                            if (s[D].search(F) != -1)
                            {
                                p = false;
                                s[D].match(/\((.*)\)/);
                                G = RegExp.$1;
                                G = G.split(",");
                                for (A = 0; A < G.length; A++)
                                {
                                    G[A].match(/\s*(\S*)\s*/);
                                    G[A] = RegExp.$1
                                }
                                t[u] = this.construct(this.definedMacros.macros[B][2], "macro", this.definedMacros.macros[B][1], G, u);
                                t.macros.push(t[u]);
                                break
                            }
                        }
                    }
                    if (p)
                    {
                        if (s[D].search(/^[\[\]].*[\[\]]$/) != -1)
                        {
                            s[D].match(/([\[\]])(.*)([\[\]])/);
                            r.straightFirst = (RegExp.$1 != "[");
                            r.straightLast = (RegExp.$3 == "[");
                            g = (RegExp.$2).replace(/^\s+/, "").replace(/\s+$/, "");
                            if (g.search(/ /) != -1)
                            {
                                g.match(/(\S*) +(\S*)/);
                                g = [];
                                g[0] = RegExp.$1;
                                g[1] = RegExp.$2
                            }
                            if (u != "")
                            {
                                if (!JXG.exists(r.withLabel))
                                {
                                    r.withLabel = true
                                }
                                r.name = u;
                                if (y == "macro")
                                {
                                    E.push(u)
                                }
                            }
                            if (y == "macro")
                            {
                                if (m != "")
                                {
                                    for (B = 0; B < E.length; B++)
                                    {
                                        if (g[0] == E[B])
                                        {
                                            g[0] = m + "." + g[0]
                                        }
                                        if (g[1] == E[B])
                                        {
                                            g[1] = m + "." + g[1]
                                        }
                                    }
                                }
                                for (B = 0; B < H.length; B++)
                                {
                                    if (g[0] == H[B])
                                    {
                                        g = [C[B], g[1]]
                                    }
                                    if (g[1] == H[B])
                                    {
                                        g = [g[0], C[B]]
                                    }
                                }
                                if (m != "")
                                {
                                    r.id = m + "." + u
                                }
                            }
                            if (typeof g == "string")
                            {
                                g = [JXG.getReference(this, g.charAt(0)), JXG.getReference(this, g.charAt(1))]
                            }
                            else
                            {
                                g = [JXG.getReference(this, g[0]), JXG.getReference(this, g[1])]
                            }
                            t.lines.push(this.create("line", g, r));
                            if (u != "")
                            {
                                t[u] = t.lines[t.lines.length - 1]
                            }
                        }
                        else
                        {
                            if (s[D].search(/k\s*\(.*/) != -1)
                            {
                                s[D].match(/k\s*\(\s*(\S.*\S|\S)\s*,\s*(\S.*\S|\S)\s*\)/);
                                g = [];
                                g[0] = RegExp.$1;
                                g[1] = RegExp.$2;
                                for (B = 0; B <= 1; B++)
                                {
                                    if (g[B].search(/[\[\]]/) != -1)
                                    {
                                        g[B].match(/^[\[\]]\s*(\S.*\S)\s*[\[\]]$/);
                                        g[B] = RegExp.$1;
                                        if (g[B].search(/ /) != -1)
                                        {
                                            g[B].match(/(\S*) +(\S*)/);
                                            g[B] = [];
                                            g[B][0] = RegExp.$1;
                                            g[B][1] = RegExp.$2
                                        }
                                        if (y == "macro")
                                        {
                                            if (m != "")
                                            {
                                                for (A = 0; A < E.length; A++)
                                                {
                                                    if (g[B][0] == E[A])
                                                    {
                                                        g[B][0] = m + "." + g[B][0]
                                                    }
                                                    if (g[B][1] == E[A])
                                                    {
                                                        g[B][1] = m + "." + g[B][1]
                                                    }
                                                }
                                            }
                                            for (A = 0; A < H.length; A++)
                                            {
                                                if (g[B][0] == H[A])
                                                {
                                                    g[B] = [C[A], g[B][1]]
                                                }
                                                if (g[B][1] == H[A])
                                                {
                                                    g[B] = [g[B][0], C[A]]
                                                }
                                            }
                                        }
                                        if (typeof g[B] == "string")
                                        {
                                            g[B] = (function (j, i)
                                            {
                                                return function ()
                                                {
                                                    return JXG.getReference(i, j.charAt(0)).Dist(JXG.getReference(i, j.charAt(1)))
                                                }
                                            })(g[B], this)
                                        }
                                        else
                                        {
                                            g[B] = (function (j, i)
                                            {
                                                return function ()
                                                {
                                                    return JXG.getReference(i, j[0]).Dist(JXG.getReference(i, j[1]))
                                                }
                                            })(g[B], this)
                                        }
                                    }
                                    else
                                    {
                                        if (g[B].search(/[0-9\.\s]+/) != -1)
                                        {
                                            g[B] = 1 * g[B]
                                        }
                                        else
                                        {
                                            if (y == "macro")
                                            {
                                                if (m != "")
                                                {
                                                    for (A = 0; A < E.length; A++)
                                                    {
                                                        if (g[B] == E[A])
                                                        {
                                                            g[B] = m + "." + E[A]
                                                        }
                                                    }
                                                }
                                                for (A = 0; A < H.length; A++)
                                                {
                                                    if (g[B] == H[A])
                                                    {
                                                        g[B] = C[A]
                                                    }
                                                }
                                            }
                                            g[B] = JXG.getReference(this, g[B])
                                        }
                                    }
                                }
                                if (u != "")
                                {
                                    if (!JXG.exists(r.withLabel))
                                    {
                                        r.withLabel = true
                                    }
                                    r.name = u;
                                    if (y == "macro")
                                    {
                                        if (m != "")
                                        {
                                            r.id = m + "." + u
                                        }
                                        E.push(u)
                                    }
                                }
                                t.circles.push(this.create("circle", g, r));
                                if (u != "")
                                {
                                    t[u] = t.circles[t.circles.length - 1]
                                }
                            }
                            else
                            {
                                if (s[D].search(/^[A-Z]+.*\(\s*[0-9\.\-]+\s*[,\|]\s*[0-9\.\-]+\s*\)/) != -1 && s[D].search(/Macro\((.*)\)/) == -1)
                                {
                                    s[D].match(/^([A-Z]+\S*)\s*\(\s*(.*)\s*[,\|]\s*(.*)\s*\)$/);
                                    u = RegExp.$1;
                                    r.name = u;
                                    if (y == "macro")
                                    {
                                        if (m != "")
                                        {
                                            r.id = m + "." + u
                                        }
                                        E.push(u)
                                    }
                                    t.points.push(this.create("point", [1 * RegExp.$2, 1 * RegExp.$3], r));
                                    t[u] = t.points[t.points.length - 1]
                                }
                                else
                                {
                                    if (s[D].search(/^[A-Z]+.*\(.+(([,\|]\s*[0-9\.\-]+\s*){2})?/) != -1 && s[D].search(/Macro\((.*)\)/) == -1)
                                    {
                                        s[D].match(/([A-Z]+.*)\((.*)\)/);
                                        u = RegExp.$1;
                                        g = RegExp.$2;
                                        u = u.replace(/^\s+/, "").replace(/\s+$/, "");
                                        g = g.replace(/^\s+/, "").replace(/\s+$/, "");
                                        if (g.search(/[,\|]/) != -1)
                                        {
                                            g.match(/(\S*)\s*[,\|]\s*([0-9\.]+)\s*[,\|]\s*([0-9\.]+)\s*/);
                                            g = [];
                                            g[0] = RegExp.$1;
                                            g[1] = 1 * RegExp.$2;
                                            g[2] = 1 * RegExp.$3
                                        }
                                        else
                                        {
                                            w = g;
                                            g = [];
                                            g[0] = w;
                                            g[1] = 0;
                                            g[2] = 0
                                        }
                                        r.name = u;
                                        if (y == "macro")
                                        {
                                            if (m != "")
                                            {
                                                for (A = 0; A < E.length; A++)
                                                {
                                                    if (g[0] == E[A])
                                                    {
                                                        g[0] = m + "." + E[A]
                                                    }
                                                }
                                            }
                                            for (A = 0; A < H.length; A++)
                                            {
                                                if (g[0] == H[A])
                                                {
                                                    g[0] = C[A]
                                                }
                                            }
                                            if (m != "")
                                            {
                                                r.id = m + "." + u
                                            }
                                            E.push(u)
                                        }
                                        t.points.push(this.create("glider", [g[1], g[2], JXG.getReference(this, g[0])], r));
                                        t[u] = t.points[t.points.length - 1]
                                    }
                                    else
                                    {
                                        if (s[D].search(/&/) != -1)
                                        {
                                            s[D].match(/(.*)&(.*)/);
                                            g = [];
                                            g[0] = RegExp.$1;
                                            g[1] = RegExp.$2;
                                            g[0] = g[0].replace(/\s+$/, "");
                                            g[1] = g[1].replace(/^\s+/, "");
                                            if (y == "macro")
                                            {
                                                for (B = 0; B <= 1; B++)
                                                {
                                                    if (m != "")
                                                    {
                                                        for (A = 0; A < E.length; A++)
                                                        {
                                                            if (g[B] == E[A])
                                                            {
                                                                g[B] = m + "." + E[A]
                                                            }
                                                        }
                                                    }
                                                    for (A = 0; A < H.length; A++)
                                                    {
                                                        if (g[B] == H[A])
                                                        {
                                                            g[B] = C[A]
                                                        }
                                                    }
                                                }
                                            }
                                            g[0] = JXG.getReference(this, g[0]);
                                            g[1] = JXG.getReference(this, g[1]);
                                            if ((g[0].elementClass == JXG.OBJECT_CLASS_LINE || g[0].elementClass == JXG.OBJECT_CLASS_CURVE) && (g[1].elementClass == JXG.OBJECT_CLASS_LINE || g[1].elementClass == JXG.OBJECT_CLASS_CURVE))
                                            {
                                                if (u != "")
                                                {
                                                    r.name = u;
                                                    if (y == "macro")
                                                    {
                                                        if (m != "")
                                                        {
                                                            r.id = m + "." + u
                                                        }
                                                        E.push(u)
                                                    }
                                                }
                                                w = this.create("intersection", [g[0], g[1], 0], r);
                                                t.intersections.push(w);
                                                if (u != "")
                                                {
                                                    t[r.name] = w
                                                }
                                            }
                                            else
                                            {
                                                if (u != "")
                                                {
                                                    r.name = u + "_1";
                                                    if (y == "macro")
                                                    {
                                                        if (m != "")
                                                        {
                                                            r.id = m + "." + u + "_1"
                                                        }
                                                        E.push(u + "_1")
                                                    }
                                                }
                                                w = this.create("intersection", [g[0], g[1], 0], r);
                                                t.intersections.push(w);
                                                if (u != "")
                                                {
                                                    t[r.name] = w
                                                }
                                                if (u != "")
                                                {
                                                    r.name = u + "_2";
                                                    if (y == "macro")
                                                    {
                                                        if (m != "")
                                                        {
                                                            r.id = m + "." + u + "_2"
                                                        }
                                                        E.push(u + "_2")
                                                    }
                                                }
                                                w = this.create("intersection", [g[0], g[1], 1], r);
                                                t.intersections.push(w);
                                                if (u != "")
                                                {
                                                    t[r.name] = w
                                                }
                                            }
                                        }
                                        else
                                        {
                                            if (s[D].search(/\|[\|_]\s*\(/) != -1)
                                            {
                                                s[D].match(/\|([\|_])\s*\(\s*(\S*)\s*,\s*(\S*)\s*\)/);
                                                h = RegExp.$1;
                                                if (h == "|")
                                                {
                                                    h = "parallel"
                                                }
                                                else
                                                {
                                                    h = "normal"
                                                }
                                                g = [];
                                                g[0] = RegExp.$2;
                                                g[1] = RegExp.$3;
                                                if (y == "macro")
                                                {
                                                    for (B = 0; B <= 1; B++)
                                                    {
                                                        if (m != "")
                                                        {
                                                            for (A = 0; A < E.length; A++)
                                                            {
                                                                if (g[B] == E[A])
                                                                {
                                                                    g[B] = m + "." + E[A]
                                                                }
                                                            }
                                                        }
                                                        for (A = 0; A < H.length; A++)
                                                        {
                                                            if (g[B] == H[A])
                                                            {
                                                                g[B] = C[A]
                                                            }
                                                        }
                                                    }
                                                }
                                                if (u != "")
                                                {
                                                    r.name = u;
                                                    if (!JXG.exists(r.withLabel))
                                                    {
                                                        r.withLabel = true
                                                    }
                                                    if (y == "macro")
                                                    {
                                                        if (m != "")
                                                        {
                                                            r.id = m + "." + u
                                                        }
                                                        E.push(u)
                                                    }
                                                }
                                                t.lines.push(this.create(h, [JXG.getReference(this, g[0]), JXG.getReference(this, g[1])], r));
                                                if (u != "")
                                                {
                                                    t[u] = t.lines[t.lines.length - 1]
                                                }
                                            }
                                            else
                                            {
                                                if (s[D].search(/^</) != -1)
                                                {
                                                    s[D].match(/<\s*\(\s*(\S*)\s*,\s*(\S*)\s*,\s*(\S*)\s*\)/);
                                                    g = [];
                                                    g[0] = RegExp.$1;
                                                    g[1] = RegExp.$2;
                                                    g[2] = RegExp.$3;
                                                    if (y == "macro")
                                                    {
                                                        for (B = 0; B <= 2; B++)
                                                        {
                                                            if (m != "")
                                                            {
                                                                for (A = 0; A < E.length; A++)
                                                                {
                                                                    if (g[B] == E[A])
                                                                    {
                                                                        g[B] = m + "." + E[A]
                                                                    }
                                                                }
                                                            }
                                                            for (A = 0; A < H.length; A++)
                                                            {
                                                                if (g[B] == H[A])
                                                                {
                                                                    g[B] = C[A]
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (u == "")
                                                    {
                                                        t.lines.push(this.create("angle", [JXG.getReference(this, g[0]), JXG.getReference(this, g[1]), JXG.getReference(this, g[2])], r))
                                                    }
                                                    else
                                                    {
                                                        e = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigmaf", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"];
                                                        h = "";
                                                        for (B = 0; B < e.length; B++)
                                                        {
                                                            if (u == e[B])
                                                            {
                                                                r.text = "&" + u + ";";
                                                                r.name = "&" + u + ";";
                                                                h = "greek";
                                                                break
                                                            }
                                                            else
                                                            {
                                                                if (B == e.length - 1)
                                                                {
                                                                    r.text = u;
                                                                    r.name = u
                                                                }
                                                            }
                                                        }
                                                        if (!JXG.exists(r.withLabel))
                                                        {
                                                            r.withLabel = true
                                                        }
                                                        if (y == "macro")
                                                        {
                                                            if (m != "")
                                                            {
                                                                r.id = m + "." + u
                                                            }
                                                            E.push(u)
                                                        }
                                                        t.angles.push(this.create("angle", [JXG.getReference(this, g[0]), JXG.getReference(this, g[1]), JXG.getReference(this, g[2])], r));
                                                        t[u] = t.angles[t.angles.length - 1]
                                                    }
                                                }
                                                else
                                                {
                                                    if (s[D].search(/([0-9]+)\/([0-9]+)\(\s*(\S*)\s*,\s*(\S*)\s*\)/) != -1)
                                                    {
                                                        g = [];
                                                        g[0] = 1 * (RegExp.$1) / (1 * (RegExp.$2));
                                                        g[1] = RegExp.$3;
                                                        g[2] = RegExp.$4;
                                                        if (y == "macro")
                                                        {
                                                            for (B = 1; B <= 2; B++)
                                                            {
                                                                if (m != "")
                                                                {
                                                                    for (A = 0; A < E.length; A++)
                                                                    {
                                                                        if (g[B] == E[A])
                                                                        {
                                                                            g[B] = m + "." + E[A]
                                                                        }
                                                                    }
                                                                }
                                                                for (A = 0; A < H.length; A++)
                                                                {
                                                                    if (g[B] == H[A])
                                                                    {
                                                                        g[B] = C[A]
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        g[1] = JXG.getReference(this, RegExp.$3);
                                                        g[2] = JXG.getReference(this, RegExp.$4);
                                                        w = [];
                                                        w[0] = (function (j, i)
                                                        {
                                                            return function ()
                                                            {
                                                                return (1 - j[0]) * j[1].coords.usrCoords[1] + j[0] * j[2].coords.usrCoords[1]
                                                            }
                                                        })(g, this);
                                                        w[1] = (function (j, i)
                                                        {
                                                            return function ()
                                                            {
                                                                return (1 - j[0]) * j[1].coords.usrCoords[2] + j[0] * j[2].coords.usrCoords[2]
                                                            }
                                                        })(g, this);
                                                        if (u != "")
                                                        {
                                                            r.name = u;
                                                            if (y == "macro")
                                                            {
                                                                if (m != "")
                                                                {
                                                                    r.id = m + "." + u
                                                                }
                                                                E.push(u)
                                                            }
                                                        }
                                                        t.points.push(this.create("point", [w[0], w[1]], r));
                                                        if (u != "")
                                                        {
                                                            t[u] = t.points[t.points.length - 1]
                                                        }
                                                    }
                                                    else
                                                    {
                                                        if (s[D].search(/(\S*)\s*:\s*(.*)/) != -1)
                                                        {
                                                            u = RegExp.$1;
                                                            G = JXG.GeonextParser.geonext2JS(RegExp.$2, this);
                                                            g = [new Function("x", "var y = " + G + "; return y;")];
                                                            r.name = u;
                                                            t.functions.push(this.create("functiongraph", g, r));
                                                            t[u] = t.functions[t.functions.length - 1]
                                                        }
                                                        else
                                                        {
                                                            if (s[D].search(/#(.*)\(\s*([0-9])\s*[,|]\s*([0-9])\s*\)/) != -1)
                                                            {
                                                                g = [];
                                                                g[0] = RegExp.$1;
                                                                g[1] = 1 * RegExp.$2;
                                                                g[2] = 1 * RegExp.$3;
                                                                g[0] = g[0].replace(/^\s+/, "").replace(/\s+$/, "");
                                                                t.texts.push(this.create("text", [g[1], g[2], g[0]], r))
                                                            }
                                                            else
                                                            {
                                                                if (s[D].search(/(\S*)\s*\[(.*)\]/) != -1)
                                                                {
                                                                    r.name = RegExp.$1;
                                                                    if (!JXG.exists(r.withLabel))
                                                                    {
                                                                        r.withLabel = true
                                                                    }
                                                                    g = RegExp.$2;
                                                                    g = g.split(",");
                                                                    for (B = 0; B < g.length; B++)
                                                                    {
                                                                        g[B] = g[B].replace(/^\s+/, "").replace(/\s+$/, "");
                                                                        if (y == "macro")
                                                                        {
                                                                            if (m != "")
                                                                            {
                                                                                for (A = 0; A < E.length; A++)
                                                                                {
                                                                                    if (g[B] == E[A])
                                                                                    {
                                                                                        g[B] = m + "." + E[A]
                                                                                    }
                                                                                }
                                                                            }
                                                                            for (A = 0; A < H.length; A++)
                                                                            {
                                                                                if (g[B] == H[A])
                                                                                {
                                                                                    g[B] = C[A]
                                                                                }
                                                                            }
                                                                        }
                                                                        g[B] = JXG.getReference(this, g[B])
                                                                    }
                                                                    t.polygons.push(this.create("polygon", g, r));
                                                                    t[r.name] = t.polygons[t.polygons.length - 1]
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.update();
    return t
};
JXG.Board.prototype.addMacro = function (f)
{
    var h, d, e = "",
        g;
    f.match(/(.*)\{(.*)\}/);
    h = RegExp.$1;
    d = RegExp.$2;
    if (h.search(/=/) != -1)
    {
        h.match(/\s*(\S*)\s*=.*/);
        e = RegExp.$1;
        h = (h.split("="))[1]
    }
    h.match(/Macro\((.*)\)/);
    h = RegExp.$1;
    h = h.split(",");
    for (g = 0; g < h.length; g++)
    {
        h[g].match(/\s*(\S*)\s*/);
        h[g] = RegExp.$1
    }
    if (this.definedMacros == null)
    {
        this.definedMacros =
        {
        };
        this.definedMacros.macros = []
    }
    this.definedMacros.macros.push([e, h, d]);
    if (e != "")
    {
        this.definedMacros.defName = this.definedMacros.macros[this.definedMacros.macros.length - 1]
    }
};
JXG.SVGRenderer = function (d)
{
    var e;
    this.constructor();
    this.svgRoot = null;
    this.suspendHandle = null;
    this.svgNamespace = "http://www.w3.org/2000/svg";
    this.xlinkNamespace = "http://www.w3.org/1999/xlink";
    this.container = d;
    this.container.style.MozUserSelect = "none";
    this.container.style.overflow = "hidden";
    if (this.container.style.position == "")
    {
        this.container.style.position = "relative"
    }
    this.svgRoot = this.container.ownerDocument.createElementNS(this.svgNamespace, "svg");
    this.svgRoot.style.overflow = "hidden";
    this.svgRoot.style.width = this.container.style.width;
    this.svgRoot.style.height = this.container.style.height;
    this.container.appendChild(this.svgRoot);
    this.defs = this.container.ownerDocument.createElementNS(this.svgNamespace, "defs");
    this.svgRoot.appendChild(this.defs);
    this.filter = this.container.ownerDocument.createElementNS(this.svgNamespace, "filter");
    this.filter.setAttributeNS(null, "id", this.container.id + "_f1");
    this.filter.setAttributeNS(null, "width", "300%");
    this.filter.setAttributeNS(null, "height", "300%");
    this.feOffset = this.container.ownerDocument.createElementNS(this.svgNamespace, "feOffset");
    this.feOffset.setAttributeNS(null, "result", "offOut");
    this.feOffset.setAttributeNS(null, "in", "SourceAlpha");
    this.feOffset.setAttributeNS(null, "dx", "5");
    this.feOffset.setAttributeNS(null, "dy", "5");
    this.filter.appendChild(this.feOffset);
    this.feGaussianBlur = this.container.ownerDocument.createElementNS(this.svgNamespace, "feGaussianBlur");
    this.feGaussianBlur.setAttributeNS(null, "result", "blurOut");
    this.feGaussianBlur.setAttributeNS(null, "in", "offOut");
    this.feGaussianBlur.setAttributeNS(null, "stdDeviation", "3");
    this.filter.appendChild(this.feGaussianBlur);
    this.feBlend = this.container.ownerDocument.createElementNS(this.svgNamespace, "feBlend");
    this.feBlend.setAttributeNS(null, "in", "SourceGraphic");
    this.feBlend.setAttributeNS(null, "in2", "blurOut");
    this.feBlend.setAttributeNS(null, "mode", "normal");
    this.filter.appendChild(this.feBlend);
    this.defs.appendChild(this.filter);
    this.layer = [];
    for (e = 0; e < JXG.Options.layer.numlayers; e++)
    {
        this.layer[e] = this.container.ownerDocument.createElementNS(this.svgNamespace, "g");
        this.svgRoot.appendChild(this.layer[e])
    }
    this.dashArray = ["2, 2", "5, 5", "10, 10", "20, 20", "20, 10, 10, 10", "20, 5, 10, 5"]
};
JXG.SVGRenderer.prototype = JXG.AbstractRenderer();
JXG.SVGRenderer.prototype.setShadow = function (d)
{
    if (d.visPropOld.shadow == d.visProp.shadow)
    {
        return
    }
    if (d.rendNode != null)
    {
        if (d.visProp.shadow)
        {
            d.rendNode.setAttributeNS(null, "filter", "url(#" + this.container.id + "_f1)")
        }
        else
        {
            d.rendNode.removeAttributeNS(null, "filter")
        }
    }
    d.visPropOld.shadow = d.visProp.shadow
};
JXG.SVGRenderer.prototype.setGradient = function (f)
{
    var n = f.rendNode,
        g, i, h, m, l, e, d, k, j;
    if (typeof f.visProp.fillOpacity == "function")
    {
        i = f.visProp.fillOpacity()
    }
    else
    {
        i = f.visProp.fillOpacity
    }
    i = (i > 0) ? i : 0;
    if (typeof f.visProp.fillColor == "function")
    {
        g = f.visProp.fillColor()
    }
    else
    {
        g = f.visProp.fillColor
    }
    if (f.visProp.gradient == "linear")
    {
        h = this.createPrim("linearGradient", f.id + "_gradient");
        e = "0%";
        d = "100%";
        k = "0%";
        j = "0%";
        h.setAttributeNS(null, "x1", e);
        h.setAttributeNS(null, "x2", d);
        h.setAttributeNS(null, "y1", k);
        h.setAttributeNS(null, "y2", j);
        m = this.createPrim("stop", f.id + "_gradient1");
        m.setAttributeNS(null, "offset", "0%");
        m.setAttributeNS(null, "style", "stop-color:" + g + ";stop-opacity:" + i);
        l = this.createPrim("stop", f.id + "_gradient2");
        l.setAttributeNS(null, "offset", "100%");
        l.setAttributeNS(null, "style", "stop-color:" + f.visProp.gradientSecondColor + ";stop-opacity:" + f.visProp.gradientSecondOpacity);
        h.appendChild(m);
        h.appendChild(l);
        this.defs.appendChild(h);
        n.setAttributeNS(null, "style", "fill:url(#" + this.container.id + "_" + f.id + "_gradient)");
        f.gradNode1 = m;
        f.gradNode2 = l
    }
    else
    {
        if (f.visProp.gradient == "radial")
        {
            h = this.createPrim("radialGradient", f.id + "_gradient");
            h.setAttributeNS(null, "cx", "50%");
            h.setAttributeNS(null, "cy", "50%");
            h.setAttributeNS(null, "r", "50%");
            h.setAttributeNS(null, "fx", f.visProp.gradientPositionX * 100 + "%");
            h.setAttributeNS(null, "fy", f.visProp.gradientPositionY * 100 + "%");
            m = this.createPrim("stop", f.id + "_gradient1");
            m.setAttributeNS(null, "offset", "0%");
            m.setAttributeNS(null, "style", "stop-color:" + f.visProp.gradientSecondColor + ";stop-opacity:" + f.visProp.gradientSecondOpacity);
            l = this.createPrim("stop", f.id + "_gradient2");
            l.setAttributeNS(null, "offset", "100%");
            l.setAttributeNS(null, "style", "stop-color:" + g + ";stop-opacity:" + i);
            h.appendChild(m);
            h.appendChild(l);
            this.defs.appendChild(h);
            n.setAttributeNS(null, "style", "fill:url(#" + this.container.id + "_" + f.id + "_gradient)");
            f.gradNode1 = m;
            f.gradNode2 = l
        }
        else
        {
            n.removeAttributeNS(null, "style")
        }
    }
};
JXG.SVGRenderer.prototype.updateGradient = function (g)
{
    var e = g.gradNode1,
        d = g.gradNode2,
        f, h;
    if (e == null || d == 0)
    {
        return
    }
    if (typeof g.visProp.fillOpacity == "function")
    {
        h = g.visProp.fillOpacity()
    }
    else
    {
        h = g.visProp.fillOpacity
    }
    h = (h > 0) ? h : 0;
    if (typeof g.visProp.fillColor == "function")
    {
        f = g.visProp.fillColor()
    }
    else
    {
        f = g.visProp.fillColor
    }
    if (g.visProp.gradient == "linear")
    {
        e.setAttributeNS(null, "style", "stop-color:" + f + ";stop-opacity:" + h);
        d.setAttributeNS(null, "style", "stop-color:" + g.visProp.gradientSecondColor + ";stop-opacity:" + g.visProp.gradientSecondOpacity)
    }
    else
    {
        if (g.visProp.gradient == "radial")
        {
            e.setAttributeNS(null, "style", "stop-color:" + g.visProp.gradientSecondColor + ";stop-opacity:" + g.visProp.gradientSecondOpacity);
            d.setAttributeNS(null, "style", "stop-color:" + f + ";stop-opacity:" + h)
        }
    }
};
JXG.SVGRenderer.prototype.displayCopyright = function (f, g)
{
    var e = this.createPrim("text", "licenseText"),
        d;
    e.setAttributeNS(null, "x", "20");
    e.setAttributeNS(null, "y", 2 + g);
    e.setAttributeNS(null, "style", "font-family:Arial,Helvetica,sans-serif; font-size:" + g + "px; fill:#356AA0;  opacity:0.3;");
    d = document.createTextNode(f);
    e.appendChild(d);
    this.appendChildPrim(e, 0)
};
JXG.SVGRenderer.prototype.drawInternalText = function (d)
{
    var e = this.createPrim("text", d.id);
    e.setAttributeNS(null, "class", "JXGtext");
    e.setAttributeNS(null, "style", "'alignment-baseline:middle;");
    d.rendNodeText = document.createTextNode("");
    e.appendChild(d.rendNodeText);
    this.appendChildPrim(e, 9);
    return e
};
JXG.SVGRenderer.prototype.updateInternalText = function (d)
{
    d.rendNode.setAttributeNS(null, "x", (d.coords.scrCoords[1]) + "px");
    d.rendNode.setAttributeNS(null, "y", (d.coords.scrCoords[2]) + "px");
    d.updateText();
    if (d.htmlStr != d.plaintextStr)
    {
        d.rendNodeText.data = d.plaintextStr;
        d.htmlStr = d.plaintextStr
    }
};
JXG.SVGRenderer.prototype.drawTicks = function (d)
{
    var e = this.createPrim("path", d.id);
    this.appendChildPrim(e, d.layer);
    this.appendNodesToElement(d, "path")
};
JXG.SVGRenderer.prototype.updateTicks = function (g, h, d, k, e)
{
    var j = "",
        l, n, f, m = g.ticks.length;
    for (l = 0; l < m; l++)
    {
        n = g.ticks[l].scrCoords;
        if (g.ticks[l].major)
        {
            if ((g.board.needsFullUpdate || g.needsRegularUpdate) && g.labels[l].visProp.visible)
            {
                this.drawText(g.labels[l])
            }
            j += "M " + (n[1] + h) + " " + (n[2] - d) + " L " + (n[1] - h) + " " + (n[2] + d) + " "
        }
        else
        {
            j += "M " + (n[1] + k) + " " + (n[2] - e) + " L " + (n[1] - k) + " " + (n[2] + e) + " "
        }
    }
    f = this.getElementById(g.id);
    if (f == null)
    {
        f = this.createPrim("path", g.id);
        this.appendChildPrim(f, g.layer);
        this.appendNodesToElement(g, "path")
    }
    f.setAttributeNS(null, "stroke", g.visProp.strokeColor);
    f.setAttributeNS(null, "stroke-opacity", g.visProp.strokeOpacity);
    f.setAttributeNS(null, "stroke-width", g.visProp.strokeWidth);
    this.updatePathPrim(f, j, g.board)
};
JXG.SVGRenderer.prototype.drawImage = function (d)
{
    var e = this.createPrim("image", d.id);
    e.setAttributeNS(null, "preserveAspectRatio", "none");
    this.appendChildPrim(e, d.layer);
    d.rendNode = e;
    this.updateImage(d)
};
JXG.SVGRenderer.prototype.updateImageURL = function (e)
{
    var d;
    if (JXG.isFunction(e.url))
    {
        d = e.url()
    }
    else
    {
        d = e.url
    }
    e.rendNode.setAttributeNS(this.xlinkNamespace, "xlink:href", d)
};
JXG.SVGRenderer.prototype.transformImage = function (f, e)
{
    var g = f.rendNode,
        h = g.getAttributeNS(null, "transform"),
        d = f.board;
    h += " " + this.joinTransforms(f, e);
    g.setAttributeNS(null, "transform", h)
};
JXG.SVGRenderer.prototype.joinTransforms = function (h, f)
{
    var j = "",
        e, g, d = f.length;
    for (e = 0; e < d; e++)
    {
        g = f[e].matrix[1][1] + "," + f[e].matrix[2][1] + "," + f[e].matrix[1][2] + "," + f[e].matrix[2][2] + "," + f[e].matrix[1][0] + "," + f[e].matrix[2][0];
        j += "matrix(" + g + ") "
    }
    return j
};
JXG.SVGRenderer.prototype.transformImageParent = function (f, d)
{
    var e, g;
    if (d != null)
    {
        e = d[1][1] + "," + d[2][1] + "," + d[1][2] + "," + d[2][2] + "," + d[1][0] + "," + d[2][0];
        g = "matrix(" + e + ")"
    }
    else
    {
        g = ""
    }
    f.rendNode.setAttributeNS(null, "transform", g)
};
JXG.SVGRenderer.prototype.setArrowAtts = function (d, f, e)
{
    if (!d)
    {
        return
    }
    d.setAttributeNS(null, "stroke", f);
    d.setAttributeNS(null, "stroke-opacity", e);
    d.setAttributeNS(null, "fill", f);
    d.setAttributeNS(null, "fill-opacity", e)
};
JXG.SVGRenderer.prototype.setObjectStrokeColor = function (f, d, e)
{
    var i = this.evaluate(d),
        h = this.evaluate(e),
        g;
    h = (h > 0) ? h : 0;
    if (f.visPropOld.strokeColor == i && f.visPropOld.strokeOpacity == h)
    {
        return
    }
    g = f.rendNode;
    if (f.type == JXG.OBJECT_TYPE_TEXT)
    {
        if (f.display == "html")
        {
            g.style.color = i
        }
        else
        {
            g.setAttributeNS(null, "style", "fill:" + i)
        }
    }
    else
    {
        g.setAttributeNS(null, "stroke", i);
        g.setAttributeNS(null, "stroke-opacity", h)
    }
    if (f.type == JXG.OBJECT_TYPE_ARROW)
    {
        this.setArrowAtts(f.rendNodeTriangle, i, h)
    }
    else
    {
        if (f.elementClass == JXG.OBJECT_CLASS_CURVE || f.elementClass == JXG.OBJECT_CLASS_LINE)
        {
            if (f.visProp.firstArrow)
            {
                this.setArrowAtts(f.rendNodeTriangleStart, i, h)
            }
            if (f.visProp.lastArrow)
            {
                this.setArrowAtts(f.rendNodeTriangleEnd, i, h)
            }
        }
    }
    f.visPropOld.strokeColor = i;
    f.visPropOld.strokeOpacity = h
};
JXG.SVGRenderer.prototype.setObjectFillColor = function (f, d, e)
{
    var g, i = this.evaluate(d),
        h = this.evaluate(e);
    h = (h > 0) ? h : 0;
    if (f.visPropOld.fillColor == i && f.visPropOld.fillOpacity == h)
    {
        return
    }
    g = f.rendNode;
    g.setAttributeNS(null, "fill", i);
    g.setAttributeNS(null, "fill-opacity", h);
    if (f.visProp.gradient != null)
    {
        this.updateGradient(f)
    }
    f.visPropOld.fillColor = i;
    f.visPropOld.fillOpacity = h
};
JXG.SVGRenderer.prototype.setObjectStrokeWidth = function (g, f)
{
    var d = this.evaluate(f),
        h;
    try
    {
        if (g.visPropOld.strokeWidth == d)
        {
            return
        }
    }
    catch (i)
    {
    }
    h = g.rendNode;
    this.setPropertyPrim(h, "stroked", "true");
    if (d != null)
    {
        this.setPropertyPrim(h, "stroke-width", d)
    }
    g.visPropOld.strokeWidth = d
};
JXG.SVGRenderer.prototype.hide = function (d)
{
    var e;
    if (!JXG.exists(d))
    {
        return
    }
    e = d.rendNode;
    if (JXG.exists(e))
    {
        e.setAttributeNS(null, "display", "none");
        e.style.visibility = "hidden"
    }
};
JXG.SVGRenderer.prototype.show = function (d)
{
    var e;
    if (!JXG.exists(d))
    {
        return
    }
    e = d.rendNode;
    if (JXG.exists(e))
    {
        e.setAttributeNS(null, "display", "inline");
        e.style.visibility = "inherit"
    }
};
JXG.SVGRenderer.prototype.remove = function (d)
{
    if (d != null && d.parentNode != null)
    {
        d.parentNode.removeChild(d)
    }
};
JXG.SVGRenderer.prototype.suspendRedraw = function ()
{
    this.suspendHandle = this.svgRoot.suspendRedraw(10000)
};
JXG.SVGRenderer.prototype.unsuspendRedraw = function ()
{
    this.svgRoot.unsuspendRedraw(this.suspendHandle);
    this.svgRoot.forceRedraw()
};
JXG.SVGRenderer.prototype.setDashStyle = function (e, d)
{
    var g = e.visProp.dash,
        f = e.rendNode;
    if (e.visProp.dash > 0)
    {
        f.setAttributeNS(null, "stroke-dasharray", this.dashArray[g - 1])
    }
    else
    {
        if (f.hasAttributeNS(null, "stroke-dasharray"))
        {
            f.removeAttributeNS(null, "stroke-dasharray")
        }
    }
};
JXG.SVGRenderer.prototype.setGridDash = function (e)
{
    var d = this.getElementById(e);
    this.setPropertyPrim(d, "stroke-dasharray", "5, 5")
};
JXG.SVGRenderer.prototype.createPrim = function (d, f)
{
    var e = this.container.ownerDocument.createElementNS(this.svgNamespace, d);
    e.setAttributeNS(null, "id", this.container.id + "_" + f);
    e.style.position = "absolute";
    if (d == "path")
    {
        e.setAttributeNS(null, "stroke-linecap", "butt");
        e.setAttributeNS(null, "stroke-linejoin", "round")
    }
    return e
};
JXG.SVGRenderer.prototype.createArrowHead = function (f, h)
{
    var g = f.id + "Triangle",
        e, d;
    if (h != null)
    {
        g += h
    }
    e = this.createPrim("marker", g);
    e.setAttributeNS(null, "viewBox", "0 0 10 6");
    e.setAttributeNS(null, "refY", "3");
    e.setAttributeNS(null, "markerUnits", "strokeWidth");
    e.setAttributeNS(null, "markerHeight", "12");
    e.setAttributeNS(null, "markerWidth", "10");
    e.setAttributeNS(null, "orient", "auto");
    e.setAttributeNS(null, "stroke", f.visProp.strokeColor);
    e.setAttributeNS(null, "stroke-opacity", f.visProp.strokeOpacity);
    e.setAttributeNS(null, "fill", f.visProp.strokeColor);
    e.setAttributeNS(null, "fill-opacity", f.visProp.strokeOpacity);
    d = this.container.ownerDocument.createElementNS(this.svgNamespace, "path");
    if (h == "End")
    {
        e.setAttributeNS(null, "refX", "0");
        d.setAttributeNS(null, "d", "M 0 3 L 10 6 L 10 0 z")
    }
    else
    {
        e.setAttributeNS(null, "refX", "10");
        d.setAttributeNS(null, "d", "M 0 0 L 10 3 L 0 6 z")
    }
    e.appendChild(d);
    return e
};
JXG.SVGRenderer.prototype.makeArrows = function (e)
{
    var d;
    if (e.visPropOld.firstArrow == e.visProp.firstArrow && e.visPropOld.lastArrow == e.visProp.lastArrow)
    {
        return
    }
    if (e.visProp.firstArrow)
    {
        d = e.rendNodeTriangleStart;
        if (d == null)
        {
            d = this.createArrowHead(e, "End");
            this.defs.appendChild(d);
            e.rendNodeTriangleStart = d;
            e.rendNode.setAttributeNS(null, "marker-start", "url(#" + this.container.id + "_" + e.id + "TriangleEnd)")
        }
    }
    else
    {
        d = e.rendNodeTriangleStart;
        if (d != null)
        {
            this.remove(d)
        }
    }
    if (e.visProp.lastArrow)
    {
        d = e.rendNodeTriangleEnd;
        if (d == null)
        {
            d = this.createArrowHead(e, "Start");
            this.defs.appendChild(d);
            e.rendNodeTriangleEnd = d;
            e.rendNode.setAttributeNS(null, "marker-end", "url(#" + this.container.id + "_" + e.id + "TriangleStart)")
        }
    }
    else
    {
        d = e.rendNodeTriangleEnd;
        if (d != null)
        {
            this.remove(d)
        }
    }
    e.visPropOld.firstArrow = e.visProp.firstArrow;
    e.visPropOld.lastArrow = e.visProp.lastArrow
};
JXG.SVGRenderer.prototype.updateLinePrim = function (h, e, d, g, f)
{
    h.setAttributeNS(null, "x1", e);
    h.setAttributeNS(null, "y1", d);
    h.setAttributeNS(null, "x2", g);
    h.setAttributeNS(null, "y2", f)
};
JXG.SVGRenderer.prototype.updateCirclePrim = function (f, d, g, e)
{
    f.setAttributeNS(null, "cx", (d));
    f.setAttributeNS(null, "cy", (g));
    f.setAttributeNS(null, "r", (e))
};
JXG.SVGRenderer.prototype.updateEllipsePrim = function (e, d, h, g, f)
{
    e.setAttributeNS(null, "cx", (d));
    e.setAttributeNS(null, "cy", (h));
    e.setAttributeNS(null, "rx", (g));
    e.setAttributeNS(null, "ry", (f))
};
JXG.SVGRenderer.prototype.updateRectPrim = function (g, d, i, e, f)
{
    g.setAttributeNS(null, "x", (d));
    g.setAttributeNS(null, "y", (i));
    g.setAttributeNS(null, "width", (e));
    g.setAttributeNS(null, "height", (f))
};
JXG.SVGRenderer.prototype.updatePathPrim = function (e, f, d)
{
    e.setAttributeNS(null, "d", f)
};
JXG.SVGRenderer.prototype.updatePathStringPrim = function (d)
{
    var f = " M ",
        g = " L ",
        e = f,
        n = 5000,
        j = "",
        h, l, m = (d.curveType != "plot"),
        k;
    if (d.numberPoints <= 0)
    {
        return ""
    }
    if (m && d.board.options.curve.RDPsmoothing)
    {
        d.points = this.RamenDouglasPeuker(d.points, 0.5)
    }
    k = Math.min(d.points.length, d.numberPoints);
    for (h = 0; h < k; h++)
    {
        l = d.points[h].scrCoords;
        if (isNaN(l[1]) || isNaN(l[2]))
        {
            e = f
        }
        else
        {
            if (l[1] > n)
            {
                l[1] = n
            }
            else
            {
                if (l[1] < -n)
                {
                    l[1] = -n
                }
            }
            if (l[2] > n)
            {
                l[2] = n
            }
            else
            {
                if (l[2] < -n)
                {
                    l[2] = -n
                }
            }
            j += [e, l[1], " ", l[2]].join("");
            e = g
        }
    }
    return j
};
JXG.SVGRenderer.prototype.updatePathStringPoint = function (h, e, g)
{
    var f = "",
        j = h.coords.scrCoords,
        i = e * Math.sqrt(3) * 0.5,
        d = e * 0.5;
    if (g == "x")
    {
        f = "M " + (j[1] - e) + " " + (j[2] - e) + " L " + (j[1] + e) + " " + (j[2] + e) + " M " + (j[1] + e) + " " + (j[2] - e) + " L " + (j[1] - e) + " " + (j[2] + e)
    }
    else
    {
        if (g == "+")
        {
            f = "M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1] + e) + " " + (j[2]) + " M " + (j[1]) + " " + (j[2] - e) + " L " + (j[1]) + " " + (j[2] + e)
        }
        else
        {
            if (g == "<>")
            {
                f = "M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1]) + " " + (j[2] + e) + " L " + (j[1] + e) + " " + (j[2]) + " L " + (j[1]) + " " + (j[2] - e) + " Z "
            }
            else
            {
                if (g == "^")
                {
                    f = "M " + (j[1]) + " " + (j[2] - e) + " L " + (j[1] - i) + " " + (j[2] + d) + " L " + (j[1] + i) + " " + (j[2] + d) + " Z "
                }
                else
                {
                    if (g == "v")
                    {
                        f = "M " + (j[1]) + " " + (j[2] + e) + " L " + (j[1] - i) + " " + (j[2] - d) + " L " + (j[1] + i) + " " + (j[2] - d) + " Z "
                    }
                    else
                    {
                        if (g == ">")
                        {
                            f = "M " + (j[1] + e) + " " + (j[2]) + " L " + (j[1] - d) + " " + (j[2] - i) + " L " + (j[1] - d) + " " + (j[2] + i) + " Z "
                        }
                        else
                        {
                            if (g == "<")
                            {
                                f = "M " + (j[1] - e) + " " + (j[2]) + " L " + (j[1] + d) + " " + (j[2] - i) + " L " + (j[1] + d) + " " + (j[2] + i) + " Z "
                            }
                        }
                    }
                }
            }
        }
    }
    return f
};
JXG.SVGRenderer.prototype.updatePolygonPrim = function (h, g)
{
    var j = "",
        e, f, d = g.vertices.length;
    h.setAttributeNS(null, "stroke", "none");
    for (f = 0; f < d - 1; f++)
    {
        e = g.vertices[f].coords.scrCoords;
        j = j + e[1] + "," + e[2];
        if (f < d - 2)
        {
            j += " "
        }
    }
    h.setAttributeNS(null, "points", j)
};
JXG.SVGRenderer.prototype.appendChildPrim = function (d, e)
{
    if (typeof e == "undefined")
    {
        e = 0
    }
    else
    {
        if (e >= JXG.Options.layer.numlayers)
        {
            e = JXG.Options.layer.numlayers - 1
        }
    }
    this.layer[e].appendChild(d)
};
JXG.SVGRenderer.prototype.setPropertyPrim = function (e, d, f)
{
    if (d == "stroked")
    {
        return
    }
    e.setAttributeNS(null, d, f)
};
JXG.SVGRenderer.prototype.drawVerticalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridx"),
        d = "";
    while (g.scrCoords[1] < e.scrCoords[1] + i - 1)
    {
        d += " M " + g.scrCoords[1] + " " + 0 + " L " + g.scrCoords[1] + " " + f.canvasHeight + " ";
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1] + i, g.scrCoords[2]])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.SVGRenderer.prototype.drawHorizontalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridy"),
        d = "";
    while (g.scrCoords[2] <= e.scrCoords[2] + i - 1)
    {
        d += " M " + 0 + " " + g.scrCoords[2] + " L " + f.canvasWidth + " " + g.scrCoords[2] + " ";
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1], g.scrCoords[2] + i])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.SVGRenderer.prototype.appendNodesToElement = function (d, e)
{
    d.rendNode = this.getElementById(d.id)
};
JXG.SVGRenderer.prototype.setBuffering = function (e, d)
{
    e.rendNode.setAttribute("buffered-rendering", d)
};
JXG.VMLRenderer = function (d)
{
    this.constructor();
    this.container = d;
    this.container.style.overflow = "hidden";
    this.container.onselectstart = function ()
    {
        return false
    };
    this.resolution = 10;
    if (JXG.vmlStylesheet == null)
    {
        d.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        JXG.vmlStylesheet = this.container.ownerDocument.createStyleSheet();
        JXG.vmlStylesheet.addRule(".jxgvml", "behavior:url(#default#VML)")
    }
    try
    {
        !d.ownerDocument.namespaces.jxgvml && d.ownerDocument.namespaces.add("jxgvml", "urn:schemas-microsoft-com:vml");
        this.createNode = function (e)
        {
            return d.ownerDocument.createElement("<jxgvml:" + e + ' class="jxgvml">')
        }
    }
    catch (f)
    {
        this.createNode = function (e)
        {
            return d.ownerDocument.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="jxgvml">')
        }
    }
    this.dashArray = ["Solid", "1 1", "ShortDash", "Dash", "LongDash", "ShortDashDot", "LongDashDot"]
};
JXG.VMLRenderer.prototype = JXG.AbstractRenderer();
JXG.VMLRenderer.prototype.setAttr = function (g, d, i, f)
{
    try
    {
        if (document.documentMode == 8)
        {
            g[d] = i
        }
        else
        {
            g.setAttribute(d, i, f)
        }
    }
    catch (h)
    {
    }
};
JXG.VMLRenderer.prototype.setShadow = function (d)
{
    var e = d.rendNodeShadow;
    if (!e)
    {
        return
    }
    if (d.visPropOld.shadow == d.visProp.shadow)
    {
        return
    }
    if (d.visProp.shadow)
    {
        this.setAttr(e, "On", "True");
        this.setAttr(e, "Offset", "3pt,3pt");
        this.setAttr(e, "Opacity", "60%");
        this.setAttr(e, "Color", "#aaaaaa")
    }
    else
    {
        this.setAttr(e, "On", "False")
    }
    d.visPropOld.shadow = d.visProp.shadow
};
JXG.VMLRenderer.prototype.setGradient = function (e)
{
    var d = e.rendNodeFill;
    if (e.visProp.gradient == "linear")
    {
        this.setAttr(d, "type", "gradient");
        this.setAttr(d, "color2", e.visProp.gradientSecondColor);
        this.setAttr(d, "opacity2", e.visProp.gradientSecondOpacity);
        this.setAttr(d, "angle", e.visProp.gradientAngle)
    }
    else
    {
        if (e.visProp.gradient == "radial")
        {
            this.setAttr(d, "type", "gradientradial");
            this.setAttr(d, "color2", e.visProp.gradientSecondColor);
            this.setAttr(d, "opacity2", e.visProp.gradientSecondOpacity);
            this.setAttr(d, "focusposition", e.visProp.gradientPositionX * 100 + "%," + e.visProp.gradientPositionY * 100 + "%");
            this.setAttr(d, "focussize", "0,0")
        }
        else
        {
            this.setAttr(d, "type", "solid")
        }
    }
};
JXG.VMLRenderer.prototype.updateGradient = function (d)
{
};
JXG.VMLRenderer.prototype.addShadowToGroup = function (d, f)
{
    var e, g;
    if (d == "lines")
    {
        for (e in f.objects)
        {
            g = f.objects[e];
            if (g.elementClass == JXG.OBJECT_CLASS_LINE)
            {
                this.addShadowToElement(g)
            }
        }
    }
    else
    {
        if (d == "points")
        {
            for (e in f.objects)
            {
                g = f.objects[e];
                if (g.elementClass == JXG.OBJECT_CLASS_POINT)
                {
                    this.addShadowToElement(g)
                }
            }
        }
        else
        {
            if (d == "circles")
            {
                for (e in f.objects)
                {
                    g = f.objects[e];
                    if (g.elementClass == JXG.OBJECT_CLASS_CIRCLE)
                    {
                        this.addShadowToElement(g)
                    }
                }
            }
        }
    }
    f.fullUpdate()
};
JXG.VMLRenderer.prototype.displayCopyright = function (f, g)
{
    var e, d;
    e = this.createNode("textbox");
    e.style.position = "absolute";
    this.setAttr(e, "id", this.container.id + "_licenseText");
    e.style.left = 20;
    e.style.top = (2);
    e.style.fontSize = (g);
    e.style.color = "#356AA0";
    e.style.fontFamily = "Arial,Helvetica,sans-serif";
    this.setAttr(e, "opacity", "30%");
    e.style.filter = "alpha(opacity = 30)";
    d = document.createTextNode(f);
    e.appendChild(d);
    this.appendChildPrim(e, 0)
};
JXG.VMLRenderer.prototype.drawInternalText = function (d)
{
    var e;
    e = this.createNode("textbox");
    e.style.position = "absolute";
    if (document.documentMode == 8)
    {
        e.setAttribute("class", "JXGtext")
    }
    else
    {
        e.setAttribute("className", 9)
    }
    d.rendNodeText = document.createTextNode("");
    e.appendChild(d.rendNodeText);
    this.appendChildPrim(e, 9);
    return e
};
JXG.VMLRenderer.prototype.updateInternalText = function (d)
{
    d.rendNode.style.left = (d.coords.scrCoords[1]) + "px";
    d.rendNode.style.top = (d.coords.scrCoords[2] - this.vOffsetText) + "px";
    d.updateText();
    if (d.htmlStr != d.plaintextStr)
    {
        d.rendNodeText.data = d.plaintextStr;
        d.htmlStr = d.plaintextStr
    }
};
JXG.VMLRenderer.prototype.drawTicks = function (e)
{
    var d = this.createPrim("path", e.id);
    this.appendChildPrim(d, e.layer);
    this.appendNodesToElement(e, "path")
};
JXG.VMLRenderer.prototype.updateTicks = function (h, j, e, k, g)
{
    var f = [],
        l, m, n, p, d = this.resolution;
    m = h.ticks.length;
    for (l = 0; l < m; l++)
    {
        n = h.ticks[l].scrCoords;
        if (h.ticks[l].major)
        {
            if ((h.board.needsFullUpdate || h.needsRegularUpdate) && h.labels[l].visProp.visible)
            {
                this.drawText(h.labels[l])
            }
            f.push(" m " + Math.round(d * (n[1] + j)) + ", " + Math.round(d * (n[2] - e)) + " l " + Math.round(d * (n[1] - j)) + ", " + Math.round(d * (n[2] + e)) + " ")
        }
        else
        {
            f.push(" m " + Math.round(d * (n[1] + k)) + ", " + Math.round(d * (n[2] - g)) + " l " + Math.round(d * (n[1] - k)) + ", " + Math.round(d * (n[2] + g)) + " ")
        }
    }
    p = this.getElementById(h.id);
    if (p == null)
    {
        p = this.createPrim("path", h.id);
        this.appendChildPrim(p, h.layer);
        this.appendNodesToElement(h, "path")
    }
    this.setAttr(p, "stroked", "true");
    this.setAttr(p, "strokecolor", h.visProp.strokeColor, 1);
    this.setAttr(p, "strokeweight", h.visProp.strokeWidth);
    this.updatePathPrim(p, f, h.board)
};
JXG.VMLRenderer.prototype.drawImage = function (d)
{
    var e;
    e = this.container.ownerDocument.createElement("img");
    e.style.position = "absolute";
    this.setAttr(e, "id", this.container.id + "_" + d.id);
    this.container.appendChild(e);
    this.appendChildPrim(e, d.layer);
    e.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand')";
    d.rendNode = e;
    this.updateImage(d)
};
JXG.VMLRenderer.prototype.updateImageURL = function (e)
{
    var d;
    if (JXG.isFunction(e.url))
    {
        d = e.url()
    }
    else
    {
        d = e.url
    }
    this.setAttr(e.rendNode, "src", d)
};
JXG.VMLRenderer.prototype.transformImage = function (f, e)
{
    var g = f.rendNode,
        d;
    d = this.joinTransforms(f, e);
    g.style.left = (f.coords.scrCoords[1] + d[1][0]) + "px";
    g.style.top = (f.coords.scrCoords[2] - f.size[1] + d[2][0]) + "px";
    g.filters.item(0).M11 = d[1][1];
    g.filters.item(0).M12 = d[1][2];
    g.filters.item(0).M21 = d[2][1];
    g.filters.item(0).M22 = d[2][2]
};
JXG.VMLRenderer.prototype.joinTransforms = function (h, g)
{
    var e = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ],
        f, d = g.length;
    for (f = 0; f < d; f++)
    {
        e = JXG.Math.matMatMult(g[f].matrix, e)
    }
    return e
};
JXG.VMLRenderer.prototype.transformImageParent = function (e, d)
{
};
JXG.VMLRenderer.prototype.hide = function (d)
{
    var e;
    if (!JXG.exists(d))
    {
        return
    }
    e = d.rendNode;
    if (JXG.exists(e))
    {
        e.style.visibility = "hidden"
    }
};
JXG.VMLRenderer.prototype.show = function (d)
{
    var e;
    if (!JXG.exists(d))
    {
        return
    }
    e = d.rendNode;
    if (JXG.exists(e))
    {
        e.style.visibility = "inherit"
    }
};
JXG.VMLRenderer.prototype.setDashStyle = function (e, d)
{
    var f;
    if (d.dash >= 0)
    {
        f = e.rendNodeStroke;
        this.setAttr(f, "dashstyle", this.dashArray[d.dash])
    }
};
JXG.VMLRenderer.prototype.setObjectStrokeColor = function (g, d, e)
{
    var j = this.evaluate(d),
        i = this.evaluate(e),
        h, f;
    i = (i > 0) ? i : 0;
    if (g.visPropOld.strokeColor == j && g.visPropOld.strokeOpacity == i)
    {
        return
    }
    if (g.type == JXG.OBJECT_TYPE_TEXT)
    {
        g.rendNode.style.color = j
    }
    else
    {
        h = g.rendNode;
        this.setAttr(h, "stroked", "true");
        this.setAttr(h, "strokecolor", j);
        if (g.id == "gridx")
        {
            f = this.getElementById("gridx_stroke")
        }
        else
        {
            if (g.id == "gridy")
            {
                f = this.getElementById("gridy_stroke")
            }
            else
            {
                f = g.rendNodeStroke
            }
        }
        if (JXG.exists(i))
        {
            this.setAttr(f, "opacity", (i * 100) + "%")
        }
    }
    g.visPropOld.strokeColor = j;
    g.visPropOld.strokeOpacity = i
};
JXG.VMLRenderer.prototype.setObjectFillColor = function (f, d, e)
{
    var h = this.evaluate(d),
        g = this.evaluate(e);
    g = (g > 0) ? g : 0;
    if (f.visPropOld.fillColor == h && f.visPropOld.fillOpacity == g)
    {
        return
    }
    if (h == "none")
    {
        this.setAttr(f.rendNode, "filled", "false")
    }
    else
    {
        this.setAttr(f.rendNode, "filled", "true");
        this.setAttr(f.rendNode, "fillcolor", h);
        if (JXG.exists(g) && f.rendNodeFill)
        {
            this.setAttr(f.rendNodeFill, "opacity", (g * 100) + "%")
        }
    }
    f.visPropOld.fillColor = h;
    f.visPropOld.fillOpacity = g
};
JXG.VMLRenderer.prototype.remove = function (d)
{
    if (d != null)
    {
        d.removeNode(true)
    }
};
JXG.VMLRenderer.prototype.suspendRedraw = function ()
{
    this.container.style.display = "none"
};
JXG.VMLRenderer.prototype.unsuspendRedraw = function ()
{
    this.container.style.display = ""
};
JXG.VMLRenderer.prototype.setAttributes = function (h, g, l, f)
{
    var k, e, j, d = g.length;
    for (e = 0; e < d; e++)
    {
        j = g[e];
        if (f[j] != null)
        {
            k = this.evaluate(f[j]);
            k = (k > 0) ? k : 0;
            this.setAttr(h, l[e], k)
        }
    }
};
JXG.VMLRenderer.prototype.setGridDash = function (e, d)
{
    var d = this.getElementById(e + "_stroke");
    this.setAttr(d, "dashstyle", "Dash")
};
JXG.VMLRenderer.prototype.setObjectStrokeWidth = function (f, e)
{
    var d = this.evaluate(e),
        g;
    if (f.visPropOld.strokeWidth == d)
    {
        return
    }
    g = f.rendNode;
    this.setPropertyPrim(g, "stroked", "true");
    if (d != null)
    {
        this.setPropertyPrim(g, "stroke-width", d)
    }
    f.visPropOld.strokeWidth = d
};
JXG.VMLRenderer.prototype.createPrim = function (e, j)
{
    var f, d = this.createNode("fill"),
        i = this.createNode("stroke"),
        h = this.createNode("shadow"),
        g;
    this.setAttr(d, "id", this.container.id + "_" + j + "_fill");
    this.setAttr(i, "id", this.container.id + "_" + j + "_stroke");
    this.setAttr(h, "id", this.container.id + "_" + j + "_shadow");
    if (e == "circle" || e == "ellipse")
    {
        f = this.createNode("oval");
        f.appendChild(d);
        f.appendChild(i);
        f.appendChild(h)
    }
    else
    {
        if (e == "polygon" || e == "path" || e == "shape" || e == "line")
        {
            f = this.createNode("shape");
            f.appendChild(d);
            f.appendChild(i);
            f.appendChild(h);
            g = this.createNode("path");
            this.setAttr(g, "id", this.container.id + "_" + j + "_path");
            f.appendChild(g)
        }
        else
        {
            f = this.createNode(e);
            f.appendChild(d);
            f.appendChild(i);
            f.appendChild(h)
        }
    }
    f.style.position = "absolute";
    this.setAttr(f, "id", this.container.id + "_" + j);
    return f
};
JXG.VMLRenderer.prototype.appendNodesToElement = function (d, e)
{
    if (e == "shape" || e == "path" || e == "polygon")
    {
        d.rendNodePath = this.getElementById(d.id + "_path")
    }
    d.rendNodeFill = this.getElementById(d.id + "_fill");
    d.rendNodeStroke = this.getElementById(d.id + "_stroke");
    d.rendNodeShadow = this.getElementById(d.id + "_shadow");
    d.rendNode = this.getElementById(d.id)
};
JXG.VMLRenderer.prototype.makeArrows = function (e)
{
    var d;
    if (e.visPropOld.firstArrow == e.visProp.firstArrow && e.visPropOld.lastArrow == e.visProp.lastArrow)
    {
        return
    }
    if (e.visProp.firstArrow)
    {
        d = e.rendNodeStroke;
        this.setAttr(d, "startarrow", "block");
        this.setAttr(d, "startarrowlength", "long")
    }
    else
    {
        d = e.rendNodeStroke;
        if (d != null)
        {
            this.setAttr(d, "startarrow", "none")
        }
    }
    if (e.visProp.lastArrow)
    {
        d = e.rendNodeStroke;
        this.setAttr(d, "id", this.container.id + "_" + e.id + "stroke");
        this.setAttr(d, "endarrow", "block");
        this.setAttr(d, "endarrowlength", "long")
    }
    else
    {
        d = e.rendNodeStroke;
        if (d != null)
        {
            this.setAttr(d, "endarrow", "none")
        }
    }
    e.visPropOld.firstArrow = e.visProp.firstArrow;
    e.visPropOld.lastArrow = e.visProp.lastArrow
};
JXG.VMLRenderer.prototype.updateLinePrim = function (k, e, d, g, f, i)
{
    var h, j = this.resolution;
    h = ["m ", j * e, ", ", j * d, " l ", j * g, ", ", j * f];
    this.updatePathPrim(k, h, i)
};
JXG.VMLRenderer.prototype.updateCirclePrim = function (f, d, g, e)
{
    f.style.left = (d - e) + "px";
    f.style.top = (g - e) + "px";
    f.style.width = (e * 2) + "px";
    f.style.height = (e * 2) + "px"
};
JXG.VMLRenderer.prototype.updateRectPrim = function (g, d, i, e, f)
{
    g.style.left = (d) + "px";
    g.style.top = (i) + "px";
    g.style.width = (e) + "px";
    g.style.height = (f) + "px"
};
JXG.VMLRenderer.prototype.updateEllipsePrim = function (e, d, h, g, f)
{
    e.style.left = (d - g) + "px";
    e.style.top = (h - f) + "px";
    e.style.width = (g * 2) + "px";
    e.style.height = (f * 2) + "px"
};
JXG.VMLRenderer.prototype.updatePathPrim = function (f, g, e)
{
    var d = e.canvasWidth,
        h = e.canvasHeight;
    f.style.width = d;
    f.style.height = h;
    this.setAttr(f, "coordsize", [(this.resolution * d), (this.resolution * h)].join(","));
    this.setAttr(f, "path", g.join(""))
};
JXG.VMLRenderer.prototype.updatePathStringPrim = function (e)
{
    var l = [],
        k, n, d = this.resolution,
        j = Math.round,
        g = " m ",
        h = " l ",
        f = g,
        p = (e.curveType != "plot"),
        m = Math.min(e.numberPoints, 8192);
    if (e.numberPoints <= 0)
    {
        return ""
    }
    if (p && e.board.options.curve.RDPsmoothing)
    {
        e.points = this.RamenDouglasPeuker(e.points, 1)
    }
    m = Math.min(m, e.points.length);
    for (k = 0; k < m; k++)
    {
        n = e.points[k].scrCoords;
        if (isNaN(n[1]) || isNaN(n[2]))
        {
            f = g
        }
        else
        {
            if (n[1] > 20000)
            {
                n[1] = 20000
            }
            else
            {
                if (n[1] < -20000)
                {
                    n[1] = -20000
                }
            }
            if (n[2] > 20000)
            {
                n[2] = 20000
            }
            else
            {
                if (n[2] < -20000)
                {
                    n[2] = -20000
                }
            }
            l.push([f, j(d * n[1]), ", ", j(d * n[2])].join(""));
            f = h
        }
    }
    l.push(" e");
    return l
};
JXG.VMLRenderer.prototype.updatePathStringPoint = function (h, e, g)
{
    var f = [],
        k = h.coords.scrCoords,
        j = e * Math.sqrt(3) * 0.5,
        d = e * 0.5,
        i = this.resolution;
    if (g == "x")
    {
        f.push(["m ", (i * (k[1] - e)), ", ", (i * (k[2] - e)), " l ", (i * (k[1] + e)), ", ", (i * (k[2] + e)), " m ", (i * (k[1] + e)), ", ", (i * (k[2] - e)), " l ", (i * (k[1] - e)), ", ", (i * (k[2] + e))].join(""))
    }
    else
    {
        if (g == "+")
        {
            f.push(["m ", (i * (k[1] - e)), ", ", (i * (k[2])), " l ", (i * (k[1] + e)), ", ", (i * (k[2])), " m ", (i * (k[1])), ", ", (i * (k[2] - e)), " l ", (i * (k[1])), ", ", (i * (k[2] + e))].join(""))
        }
        else
        {
            if (g == "<>")
            {
                f.push(["m ", (i * (k[1] - e)), ", ", (i * (k[2])), " l ", (i * (k[1])), ", ", (i * (k[2] + e)), " l ", (i * (k[1] + e)), ", ", (i * (k[2])), " l ", (i * (k[1])), ", ", (i * (k[2] - e)), " x e "].join(""))
            }
            else
            {
                if (g == "^")
                {
                    f.push(["m ", (i * (k[1])), ", ", (i * (k[2] - e)), " l ", Math.round(i * (k[1] - j)), ", ", (i * (k[2] + d)), " l ", Math.round(i * (k[1] + j)), ", ", (i * (k[2] + d)), " x e "].join(""))
                }
                else
                {
                    if (g == "v")
                    {
                        f.push(["m ", (i * (k[1])), ", ", (i * (k[2] + e)), " l ", Math.round(i * (k[1] - j)), ", ", (i * (k[2] - d)), " l ", Math.round(i * (k[1] + j)), ", ", (i * (k[2] - d)), " x e "].join(""))
                    }
                    else
                    {
                        if (g == ">")
                        {
                            f.push(["m ", (i * (k[1] + e)), ", ", (i * (k[2])), " l ", (i * (k[1] - d)), ", ", Math.round(i * (k[2] - j)), " l ", (i * (k[1] - d)), ", ", Math.round(i * (k[2] + j)), " l ", (i * (k[1] + e)), ", ", (i * (k[2]))].join(""))
                        }
                        else
                        {
                            if (g == "<")
                            {
                                f.push(["m ", (i * (k[1] - e)), ", ", (i * (k[2])), " l ", (i * (k[1] + d)), ", ", Math.round(i * (k[2] - j)), " l ", (i * (k[1] + d)), ", ", Math.round(i * (k[2] + j)), " x e "].join(""))
                            }
                        }
                    }
                }
            }
        }
    }
    return f
};
JXG.VMLRenderer.prototype.updatePolygonPrim = function (h, f)
{
    var j = f.vertices[0].coords.scrCoords[1],
        e = f.vertices[0].coords.scrCoords[1],
        g = f.vertices[0].coords.scrCoords[2],
        d = f.vertices[0].coords.scrCoords[2],
        k, m = f.vertices.length,
        n, q, p, l = [];
    this.setAttr(h, "stroked", "false");
    for (k = 1; k < m - 1; k++)
    {
        n = f.vertices[k].coords.scrCoords;
        if (n[1] < j)
        {
            j = n[1]
        }
        else
        {
            if (n[1] > e)
            {
                e = n[1]
            }
        }
        if (n[2] < g)
        {
            g = n[2]
        }
        else
        {
            if (n[2] > d)
            {
                d = n[2]
            }
        }
    }
    q = Math.round(e - j);
    p = Math.round(d - g);
    if (!isNaN(q) && !isNaN(p))
    {
        h.style.width = q;
        h.style.height = p;
        this.setAttr(h, "coordsize", q + "," + p)
    }
    n = f.vertices[0].coords.scrCoords;
    l.push(["m ", n[1], ",", n[2], " l "].join(""));
    for (k = 1; k < m - 1; k++)
    {
        n = f.vertices[k].coords.scrCoords;
        l.push(n[1] + "," + n[2]);
        if (k < m - 2)
        {
            l.push(", ")
        }
    }
    l.push(" x e");
    this.setAttr(h, "path", l.join(""))
};
JXG.VMLRenderer.prototype.appendChildPrim = function (d, e)
{
    if (!JXG.exists(e))
    {
        e = 0
    }
    d.style.zIndex = e;
    this.container.appendChild(d)
};
JXG.VMLRenderer.prototype.setPropertyPrim = function (h, g, i)
{
    var f = "",
        d, e;
    switch (g)
    {
    case "stroke":
        f = "strokecolor";
        break;
    case "stroke-width":
        f = "strokeweight";
        break;
    case "stroke-dasharray":
        f = "dashstyle";
        break
    }
    if (f != "")
    {
        e = this.evaluate(i);
        this.setAttr(h, f, e)
    }
};
JXG.VMLRenderer.prototype.drawVerticalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridx"),
        d = [];
    while (g.scrCoords[1] < e.scrCoords[1] + i - 1)
    {
        d.push(" m " + (this.resolution * g.scrCoords[1]) + ", " + 0 + " l " + (this.resolution * g.scrCoords[1]) + ", " + (this.resolution * f.canvasHeight) + " ");
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1] + i, g.scrCoords[2]])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.VMLRenderer.prototype.drawHorizontalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridy"),
        d = [];
    while (g.scrCoords[2] <= e.scrCoords[2] + i - 1)
    {
        d.push(" m " + 0 + ", " + (this.resolution * g.scrCoords[2]) + " l " + (this.resolution * f.canvasWidth) + ", " + (this.resolution * g.scrCoords[2]) + " ");
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1], g.scrCoords[2] + i])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.CanvasRenderer = function (d)
{
    var e;
    this.constructor();
    this.canvasRoot = null;
    this.suspendHandle = null;
    this.canvasId = JXG.Util.genUUID();
    this.canvasNamespace = null;
    this.container = d;
    this.container.style.MozUserSelect = "none";
    this.container.style.overflow = "hidden";
    if (this.container.style.position == "")
    {
        this.container.style.position = "relative"
    }
    this.container.innerHTML = '<canvas id="' + this.canvasId + '" width="' + this.container.style.width + '" height="' + this.container.style.height + '"></canvas>';
    this.canvasRoot = document.getElementById(this.canvasId);
    this.context = this.canvasRoot.getContext("2d");
    this.dashArray = [
        [2, 2],
        [5, 5],
        [10, 10],
        [20, 20],
        [20, 10, 10, 10],
        [20, 5, 10, 5]
    ]
};
JXG.CanvasRenderer.prototype = JXG.AbstractRenderer();
JXG.CanvasRenderer.prototype.updateStencilBuffer = function (e)
{
    var d;
    if (typeof e.board.highlightedObjects[e.id] != "undefined" && e.board.highlightedObjects[e.id] != null)
    {
        if (e.visProp.strokeColor != "none")
        {
            this.context.strokeStyle = e.visProp.highlightStrokeColor
        }
        if (e.visProp.fillColor != "none")
        {
            this.context.fillStyle = e.visProp.highlightFillColor
        }
        this.context.lineWidth = parseFloat(e.visProp.strokeWidth);
        this.context.globalAlpha = e.visProp.highlightFillOpacity;
        d = true
    }
    else
    {
        if (e.visProp.strokeColor != "none")
        {
            this.context.strokeStyle = e.visProp.strokeColor
        }
        if (e.visProp.fillColor != "none")
        {
            this.context.fillStyle = e.visProp.fillColor
        }
        this.context.lineWidth = parseFloat(e.visProp.strokeWidth);
        this.context.globalAlpha = e.visProp.fillOpacity;
        d = false
    }
    return d
};
JXG.CanvasRenderer.prototype.setColor = function (e, d)
{
    var g = true,
        f = false;
    if (!JXG.exists(e.board) || !JXG.exists(e.board.highlightedObjects))
    {
        f = true
    }
    if (d == "fill")
    {
        if (!f && typeof e.board.highlightedObjects[e.id] != "undefined" && e.board.highlightedObjects[e.id] != null)
        {
            if (e.visProp.highlightFillColor != "none")
            {
                this.context.globalAlpha = e.visProp.highlightFillOpacity;
                this.context.fillStyle = e.visProp.highlightFillColor
            }
            else
            {
                g = false
            }
        }
        else
        {
            if (e.visProp.fillColor != "none")
            {
                this.context.globalAlpha = e.visProp.fillOpacity;
                this.context.fillStyle = e.visProp.fillColor
            }
            else
            {
                g = false
            }
        }
    }
    else
    {
        if (!f && typeof e.board.highlightedObjects[e.id] != "undefined" && e.board.highlightedObjects[e.id] != null)
        {
            if (e.visProp.highlightStrokeColor != "none")
            {
                this.context.globalAlpha = e.visProp.highlightStrokeOpacity;
                this.context.strokeStyle = e.visProp.highlightStrokeColor
            }
            else
            {
                g = false
            }
        }
        else
        {
            if (e.visProp.strokeColor != "none")
            {
                this.context.globalAlpha = e.visProp.strokeOpacity;
                this.context.strokeStyle = e.visProp.strokeColor
            }
            else
            {
                g = false
            }
        }
        this.context.lineWidth = parseFloat(e.visProp.strokeWidth)
    }
    return g
};
JXG.CanvasRenderer.prototype.fill = function (d)
{
    this.context.save();
    if (this.setColor(d, "fill"))
    {
        this.context.fill()
    }
    this.context.restore()
};
JXG.CanvasRenderer.prototype.stroke = function (d)
{
    this.context.save();
    if (d.visProp.dash > 0)
    {
    }
    else
    {
        this.context.lineDashArray = []
    }
    if (this.setColor(d, "stroke"))
    {
        this.context.stroke()
    }
    this.context.restore()
};
JXG.CanvasRenderer.prototype.setShadow = function (d)
{
    if (d.visPropOld.shadow == d.visProp.shadow)
    {
        return
    }
    d.visPropOld.shadow = d.visProp.shadow
};
JXG.CanvasRenderer.prototype.setGradient = function (f)
{
    var n = f.rendNode,
        g, i, h, m, l, e, d, k, j;
    if (typeof f.visProp.fillOpacity == "function")
    {
        i = f.visProp.fillOpacity()
    }
    else
    {
        i = f.visProp.fillOpacity
    }
    i = (i > 0) ? i : 0;
    if (typeof f.visProp.fillColor == "function")
    {
        g = f.visProp.fillColor()
    }
    else
    {
        g = f.visProp.fillColor
    }
};
JXG.CanvasRenderer.prototype.updateGradient = function (d)
{
};
JXG.CanvasRenderer.prototype.displayCopyright = function (e, d)
{
    this.context.save();
    this.context.font = d + "px Arial";
    this.context.fillStyle = "#aaa";
    this.context.lineWidth = 0.5;
    this.context.fillText(e, 10, 2 + d);
    this.context.restore()
};
JXG.CanvasRenderer.prototype.drawInternalText = function (d)
{
    this.context.save();
    if (this.setColor(d, "stroke"))
    {
        if (typeof d.board.highlightedObjects[d.id] != "undefined" && d.board.highlightedObjects[d.id] != null)
        {
            this.context.fillStyle = d.visProp.highlightStrokeColor
        }
        else
        {
            this.context.fillStyle = d.visProp.strokeColor
        }
        this.context.font = d.board.options.text.fontSize + "px Arial";
        this.context.fillText(d.plaintextStr, d.coords.scrCoords[1], d.coords.scrCoords[2])
    }
    this.context.restore();
    return null
};
JXG.CanvasRenderer.prototype.updateInternalText = function (d)
{
    this.drawInternalText(d)
};
JXG.CanvasRenderer.prototype.drawTicks = function (d)
{
};
JXG.CanvasRenderer.prototype.updateTicks = function (g, j, f, k, h)
{
    var e, l, d = g.ticks.length;
    this.context.beginPath();
    for (e = 0; e < d; e++)
    {
        l = g.ticks[e].scrCoords;
        if (g.ticks[e].major)
        {
            if ((g.board.needsFullUpdate || g.needsRegularUpdate || g.labels[e].display == "internal") && g.labels[e].visProp.visible)
            {
                this.drawText(g.labels[e])
            }
            this.context.moveTo(l[1] + j, l[2] - f);
            this.context.lineTo(l[1] - j, l[2] + f)
        }
        else
        {
            this.context.moveTo(l[1] + k, l[2] - h);
            this.context.lineTo(l[1] - k, l[2] + h)
        }
    }
    this.stroke(g)
};
JXG.CanvasRenderer.prototype.drawImage = function (e)
{
    var d = this.updateImage;
    e.rendNode = new Image();
    this.updateImage(e)
};
JXG.CanvasRenderer.prototype.updateImageURL = function (e)
{
    var d;
    if (JXG.isFunction(e.url))
    {
        d = e.url()
    }
    else
    {
        d = e.url
    }
    if (e.rendNode.src != d)
    {
        e.imgIsLoaded = false;
        e.rendNode.src = d;
        return true
    }
    else
    {
        return false
    }
};
JXG.CanvasRenderer.prototype.updateImage = function (f)
{
    var d = this.context,
        g = this.transformImageParent,
        e = this.transformImage,
        h = function ()
        {
            d.save();
            if (f.parent != null)
            {
                g(f, f.parent.imageTransformMatrix, d)
            }
            else
            {
                g(f, null, d)
            }
            e(f, f.transformations, d);
            d.drawImage(f.rendNode, f.coords.scrCoords[1], f.coords.scrCoords[2] - f.size[1], f.size[0], f.size[1]);
            d.restore();
            f.imgIsLoaded = true
        };
    if (this.updateImageURL(f))
    {
        f.rendNode.onload = h
    }
    else
    {
        if (f.imgIsLoaded)
        {
            h()
        }
    }
};
JXG.CanvasRenderer.prototype.transformImage = function (j, h, f)
{
    var e, g, d = h.length;
    for (g = 0; g < d; g++)
    {
        e = h[g].matrix;
        f.transform(e[1][1], e[2][1], e[1][2], e[2][2], e[1][0], e[2][0])
    }
};
JXG.CanvasRenderer.prototype.joinTransforms = function (e, d)
{
    return ""
};
JXG.CanvasRenderer.prototype.transformImageParent = function (f, d, e)
{
    if (d != null)
    {
        e.setTransform(d[1][1], d[2][1], d[1][2], d[2][2], d[1][0], d[2][0])
    }
    else
    {
        e.setTransform(1, 0, 0, 1, 0, 0)
    }
};
JXG.CanvasRenderer.prototype.setArrowAtts = function (d, f, e)
{
};
JXG.CanvasRenderer.prototype.setObjectStrokeColor = function (f, d, e)
{
};
JXG.CanvasRenderer.prototype.setObjectFillColor = function (f, d, e)
{
};
JXG.CanvasRenderer.prototype.setObjectStrokeWidth = function (e, d)
{
};
JXG.CanvasRenderer.prototype.hide = function (d)
{
    if (JXG.exists(d.rendNode))
    {
        d.rendNode.style.visibility = "hidden"
    }
};
JXG.CanvasRenderer.prototype.show = function (d)
{
    if (JXG.exists(d.rendNode))
    {
        d.rendNode.style.visibility = "inherit"
    }
};
JXG.CanvasRenderer.prototype.remove = function (d)
{
    if (d != null && d.parentNode != null)
    {
        d.parentNode.removeChild(d)
    }
};
JXG.CanvasRenderer.prototype.suspendRedraw = function ()
{
    this.context.save();
    this.context.clearRect(0, 0, this.canvasRoot.width, this.canvasRoot.height);
    this.displayCopyright(JXG.JSXGraph.licenseText, 12)
};
JXG.CanvasRenderer.prototype.unsuspendRedraw = function ()
{
    this.context.restore()
};
JXG.CanvasRenderer.prototype.setDashStyle = function (e, d)
{
};
JXG.CanvasRenderer.prototype.setGridDash = function (d)
{
};
JXG.CanvasRenderer.prototype.createPrim = function (d, e)
{
};
JXG.CanvasRenderer.prototype.createArrowHead = function (d, e)
{
};
JXG.CanvasRenderer.prototype._drawFilledPolygon = function (e)
{
    var f, d = e.length;
    if (d <= 0)
    {
        return
    }
    this.context.beginPath();
    this.context.moveTo(e[0][0], e[0][1]);
    for (f = 0; f < d; f++)
    {
        if (f > 0)
        {
            this.context.lineTo(e[f][0], e[f][1])
        }
    }
    this.context.lineTo(e[0][0], e[0][1]);
    this.context.fill()
};
JXG.CanvasRenderer.prototype._translateShape = function (f, e, j)
{
    var g, h = [],
        d = f.length;
    if (d <= 0)
    {
        return f
    }
    for (g = 0; g < d; g++)
    {
        h.push([f[g][0] + e, f[g][1] + j])
    }
    return h
};
JXG.CanvasRenderer.prototype._rotateShape = function (e, f)
{
    var g, h = [],
        d = e.length;
    if (d <= 0)
    {
        return e
    }
    for (g = 0; g < d; g++)
    {
        h.push(this._rotatePoint(f, e[g][0], e[g][1]))
    }
    return h
};
JXG.CanvasRenderer.prototype._rotatePoint = function (e, d, f)
{
    return [(d * Math.cos(e)) - (f * Math.sin(e)), (d * Math.sin(e)) + (f * Math.cos(e))]
};
JXG.CanvasRenderer.prototype.makeArrows = function (g, k, i)
{
    var h;
    var e = [
        [2, 0],
        [-10, -4],
        [-10, 4]
    ],
        m = [
            [-2, 0],
            [10, -4],
            [10, 4]
        ],
        f, l, d, j, h;
    if (g.visProp.strokeColor != "none" && (g.visProp.lastArrow || g.visProp.firstArrow))
    {
        if (g.elementClass == JXG.OBJECT_CLASS_LINE)
        {
            f = k.scrCoords[1];
            l = k.scrCoords[2];
            d = i.scrCoords[1];
            j = i.scrCoords[2]
        }
        else
        {
            return
        }
        this.context.save();
        if (this.setColor(g, "stroke"))
        {
            if (typeof g.board.highlightedObjects[g.id] != "undefined" && g.board.highlightedObjects[g.id] != null)
            {
                this.context.fillStyle = g.visProp.highlightStrokeColor
            }
            else
            {
                this.context.fillStyle = g.visProp.strokeColor
            }
            var h = Math.atan2(j - l, d - f);
            if (g.visProp.lastArrow)
            {
                this._drawFilledPolygon(this._translateShape(this._rotateShape(e, h), d, j))
            }
            if (g.visProp.firstArrow)
            {
                this._drawFilledPolygon(this._translateShape(this._rotateShape(m, h), f, l))
            }
        }
        this.context.restore()
    }
};
JXG.CanvasRenderer.prototype.updateLinePrim = function (h, e, d, g, f)
{
};
JXG.CanvasRenderer.prototype.updateCirclePrim = function (f, d, g, e)
{
};
JXG.CanvasRenderer.prototype.updateEllipsePrim = function (e, d, h, g, f)
{
};
JXG.CanvasRenderer.prototype.updateRectPrim = function (g, d, i, e, f)
{
};
JXG.CanvasRenderer.prototype.updatePathPrim = function (e, f, d)
{
};
JXG.CanvasRenderer.prototype.updatePathStringPrim = function (d)
{
    var f = "M",
        g = "L",
        e = f,
        n = 5000,
        j = "",
        h, l, m = (d.curveType != "plot"),
        k;
    if (d.numberPoints <= 0)
    {
        return ""
    }
    if (m && d.board.options.curve.RDPsmoothing)
    {
        d.points = this.RamenDouglasPeuker(d.points, 0.5)
    }
    k = Math.min(d.points.length, d.numberPoints);
    this.context.beginPath();
    for (h = 0; h < k; h++)
    {
        l = d.points[h].scrCoords;
        if (isNaN(l[1]) || isNaN(l[2]))
        {
            e = f
        }
        else
        {
            if (l[1] > n)
            {
                l[1] = n
            }
            else
            {
                if (l[1] < -n)
                {
                    l[1] = -n
                }
            }
            if (l[2] > n)
            {
                l[2] = n
            }
            else
            {
                if (l[2] < -n)
                {
                    l[2] = -n
                }
            }
            if (e == "M")
            {
                this.context.moveTo(l[1], l[2])
            }
            else
            {
                this.context.lineTo(l[1], l[2])
            }
            e = g
        }
    }
    this.fill(d);
    this.stroke(d);
    return null
};
JXG.CanvasRenderer.prototype.appendChildPrim = function (d, e)
{
};
JXG.CanvasRenderer.prototype.setPropertyPrim = function (e, d, f)
{
    if (d == "stroked")
    {
    }
};
JXG.CanvasRenderer.prototype.drawVerticalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridx"),
        d = "";
    while (g.scrCoords[1] < e.scrCoords[1] + i - 1)
    {
        d += " M " + g.scrCoords[1] + " " + 0 + " L " + g.scrCoords[1] + " " + f.canvasHeight + " ";
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1] + i, g.scrCoords[2]])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.CanvasRenderer.prototype.drawHorizontalGrid = function (g, e, i, f)
{
    var h = this.createPrim("path", "gridy"),
        d = "";
    while (g.scrCoords[2] <= e.scrCoords[2] + i - 1)
    {
        d += " M " + 0 + " " + g.scrCoords[2] + " L " + f.canvasWidth + " " + g.scrCoords[2] + " ";
        g.setCoordinates(JXG.COORDS_BY_SCREEN, [g.scrCoords[1], g.scrCoords[2] + i])
    }
    this.updatePathPrim(h, d, f);
    return h
};
JXG.CanvasRenderer.prototype.appendNodesToElement = function (d, e)
{
};
JXG.CanvasRenderer.prototype.drawPoint = function (h)
{
    var i = h.visProp.face,
        g = h.visProp.size,
        k = h.coords.scrCoords,
        j = g * Math.sqrt(3) * 0.5,
        d = g * 0.5,
        e = parseFloat(h.visProp.strokeWidth) / 2;
    if (g <= 0)
    {
        return
    }
    switch (i)
    {
    case "cross":
    case "x":
        this.context.beginPath();
        this.context.moveTo(k[1] - g, k[2] - g);
        this.context.lineTo(k[1] + g, k[2] + g);
        this.context.moveTo(k[1] + g, k[2] - g);
        this.context.lineTo(k[1] - g, k[2] + g);
        this.context.closePath();
        this.stroke(h);
        break;
    case "circle":
    case "o":
        this.context.beginPath();
        this.context.arc(k[1], k[2], g + 1 + e, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break;
    case "square":
    case "[]":
        if (g <= 0)
        {
            break
        }
        this.context.save();
        if (this.setColor(h, "stroke"))
        {
            if (typeof h.board.highlightedObjects[h.id] != "undefined" && h.board.highlightedObjects[h.id] != null)
            {
                this.context.fillStyle = h.visProp.highlightStrokeColor
            }
            else
            {
                this.context.fillStyle = h.visProp.strokeColor
            }
            this.context.fillRect(k[1] - g - e, k[2] - g - e, g * 2 + 3 * e, g * 2 + 3 * e)
        }
        this.context.restore();
        this.context.save();
        this.setColor(h, "fill");
        this.context.fillRect(k[1] - g + e, k[2] - g + e, g * 2 - e, g * 2 - e);
        this.context.restore();
        break;
    case "plus":
    case "+":
        this.context.beginPath();
        this.context.moveTo(k[1] - g, k[2]);
        this.context.lineTo(k[1] + g, k[2]);
        this.context.moveTo(k[1], k[2] - g);
        this.context.lineTo(k[1], k[2] + g);
        this.context.closePath();
        this.stroke(h);
        break;
    case "diamond":
    case "<>":
        this.context.beginPath();
        this.context.moveTo(k[1] - g, k[2]);
        this.context.lineTo(k[1], k[2] + g);
        this.context.lineTo(k[1] + g, k[2]);
        this.context.lineTo(k[1], k[2] - g);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break;
    case "triangleup":
    case "a":
    case "^":
        this.context.beginPath();
        this.context.moveTo(k[1], k[2] - g);
        this.context.lineTo(k[1] - j, k[2] + d);
        this.context.lineTo(k[1] + j, k[2] + d);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break;
    case "triangledown":
    case "v":
        this.context.beginPath();
        this.context.moveTo(k[1], k[2] + g);
        this.context.lineTo(k[1] - j, k[2] - d);
        this.context.lineTo(k[1] + j, k[2] - d);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break;
    case "triangleleft":
    case "<":
        this.context.beginPath();
        this.context.moveTo(k[1] - g, k[2]);
        this.context.lineTo(k[1] + d, k[2] - j);
        this.context.lineTo(k[1] + d, k[2] + j);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break;
    case "triangleright":
    case ">":
        this.context.beginPath();
        this.context.moveTo(k[1] + g, k[2]);
        this.context.lineTo(k[1] - d, k[2] - j);
        this.context.lineTo(k[1] - d, k[2] + j);
        this.context.closePath();
        this.fill(h);
        this.stroke(h);
        break
    }
};
JXG.CanvasRenderer.prototype.updatePoint = function (d)
{
    this.drawPoint(d)
};
JXG.CanvasRenderer.prototype.changePointStyle = function (d)
{
    this.drawPoint(d)
};
JXG.CanvasRenderer.prototype.drawText = function (d)
{
    var e;
    if (d.display == "html")
    {
        e = this.container.ownerDocument.createElement("div");
        e.style.position = "absolute";
        e.style.color = d.visProp.strokeColor;
        e.className = "JXGtext";
        e.style.zIndex = "10";
        this.container.appendChild(e);
        e.setAttribute("id", this.container.id + "_" + d.id);
        e.style.fontSize = d.board.options.text.fontSize + "px"
    }
    else
    {
        e = this.drawInternalText(d)
    }
    d.rendNode = e;
    d.htmlStr = "";
    this.updateText(d)
};
JXG.CanvasRenderer.prototype.updateText = function (d)
{
    if (d.visProp.visible === false)
    {
        return
    }
    if (isNaN(d.coords.scrCoords[1] + d.coords.scrCoords[2]))
    {
        return
    }
    this.updateTextStyle(d);
    if (d.display == "html")
    {
        d.rendNode.style.left = (d.coords.scrCoords[1]) + "px";
        d.rendNode.style.top = (d.coords.scrCoords[2] - this.vOffsetText) + "px";
        d.updateText();
        if (d.htmlStr != d.plaintextStr)
        {
            d.rendNode.innerHTML = d.plaintextStr;
            if (d.board.options.text.useASCIIMathML)
            {
                AMprocessNode(d.rendNode, false)
            }
            d.htmlStr = d.plaintextStr
        }
    }
    else
    {
        this.updateInternalText(d)
    }
};
JXG.CanvasRenderer.prototype.drawLine = function (e)
{
    var l = new JXG.Coords(JXG.COORDS_BY_USER, e.point1.coords.usrCoords, e.board),
        j = new JXG.Coords(JXG.COORDS_BY_USER, e.point2.coords.usrCoords, e.board),
        d, q, i, h, p, g, n, k, f;
    this.calcStraight(e, l, j);
    this.context.beginPath();
    this.context.moveTo(l.scrCoords[1], l.scrCoords[2]);
    this.context.lineTo(j.scrCoords[1], j.scrCoords[2]);
    this.stroke(e);
    if (e.image != null)
    {
        d = l.scrCoords[1];
        q = l.scrCoords[2];
        i = j.scrCoords[1];
        h = j.scrCoords[2];
        p = Math.atan2(h - q, i - d);
        n = 250;
        k = 256;
        f = [
            [1, 0, 0],
            [n * (1 - Math.cos(p)) + k * Math.sin(p), Math.cos(p), -Math.sin(p)],
            [k * (1 - Math.cos(p)) - n * Math.sin(p), Math.sin(p), Math.cos(p)]
        ];
        e.imageTransformMatrix = f
    }
    this.makeArrows(e, l, j)
};
JXG.CanvasRenderer.prototype.updateLine = function (d)
{
    this.drawLine(d)
};
JXG.CanvasRenderer.prototype.drawCurve = function (d)
{
    this.updatePathStringPrim(d)
};
JXG.CanvasRenderer.prototype.updateCurve = function (d)
{
    this.drawCurve(d)
};
JXG.CanvasRenderer.prototype.drawEllipse = function (h, t, r, g, f, n, m)
{
    var p = n * g,
        q = m * f,
        l = t - p / 2,
        k = r - q / 2,
        s = (p / 2) * 0.5522848,
        e = (q / 2) * 0.5522848,
        d = l + p,
        u = k + q,
        j = l + p / 2,
        i = k + q / 2;
    if (n > 0 && m > 0 && !isNaN(t + r))
    {
        this.context.beginPath();
        this.context.moveTo(l, i);
        this.context.bezierCurveTo(l, i - e, j - s, k, j, k);
        this.context.bezierCurveTo(j + s, k, d, i - e, d, i);
        this.context.bezierCurveTo(d, i + e, j + s, u, j, u);
        this.context.bezierCurveTo(j - s, u, l, i + e, l, i);
        this.context.closePath();
        this.fill(h);
        this.stroke(h)
    }
};
JXG.CanvasRenderer.prototype.drawCircle = function (d)
{
    this.drawEllipse(d, d.midpoint.coords.scrCoords[1], d.midpoint.coords.scrCoords[2], d.board.stretchX, d.board.stretchY, 2 * d.Radius(), 2 * d.Radius())
};
JXG.CanvasRenderer.prototype.updateCircle = function (d)
{
    this.drawCircle(d)
};
JXG.CanvasRenderer.prototype.drawPolygon = function (d)
{
};
JXG.CanvasRenderer.prototype.updatePolygonPrim = function (h, g)
{
    var j = "",
        e, f, d = g.vertices.length;
    if (d <= 0)
    {
        return
    }
    this.context.beginPath();
    e = g.vertices[0].coords.scrCoords;
    this.context.moveTo(e[1], e[2]);
    for (f = 1; f < d; f++)
    {
        e = g.vertices[f].coords.scrCoords;
        this.context.lineTo(e[1], e[2])
    }
    this.context.closePath();
    this.fill(g)
};
JXG.CanvasRenderer.prototype.highlight = function (d)
{
    d.board.prepareUpdate();
    d.board.renderer.suspendRedraw();
    d.board.updateRenderer();
    d.board.renderer.unsuspendRedraw();
    return this
};
JXG.CanvasRenderer.prototype.noHighlight = function (d)
{
    d.board.prepareUpdate();
    d.board.renderer.suspendRedraw();
    d.board.updateRenderer();
    d.board.renderer.unsuspendRedraw();
    return this
};