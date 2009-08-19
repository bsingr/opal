/* 
 * math.h
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


extern double acos(double);
extern float acosf(float);

extern double asin(double);
extern float asinf(float);

extern double atan(double);
extern float atanf(float);

extern double atan2(double, double);
extern float atan2f(float, float);

extern double cos(double);
extern float cosf(float);

extern double sin(double);
extern float sinf(float);

extern double tan(double);
extern float tanf(float);

extern double acosh(double);
extern float acoshf(float);

extern double asinh(double);
extern float asinhf(float);

extern double atanh(double);
extern float atanhf(float);

extern double cosh(double);
extern float coshf(float);

extern double sinh(double);
extern float sinhf(float);

extern double tanh(double);
extern float tanhf(float);

extern double exp(double);
extern float expf(float);

extern double exp2(double); 
extern float exp2f(float);

extern double expm1(double); 
extern float expm1f(float);

extern double log(double);
extern float logf(float);

extern double log10(double);
extern float log10f(float);

extern double log2(double);
extern float log2f(float);

extern double log1p(double);
extern float log1pf(float);

extern double logb(double);
extern float logbf(float);

extern double modf(double, double *);
extern float modff(float, float *);

extern double ldexp(double, int);
extern float ldexpf(float, int);

extern double frexp(double, int *);
extern float frexpf(float, int *);

extern int ilogb(double);
extern int ilogbf(float);

extern double scalbn(double, int);
extern float scalbnf(float, int);

extern double scalbln(double, int);
extern float scalblnf(float, int);

extern double fabs(double);
extern float fabsf(float);

extern double cbrt(double);
extern float cbrtf(float);

extern double hypot(double, double);
extern float hypotf(float, float);

extern double pow(double, double);
extern float powf(float, float);

extern double sqrt(double);
extern float sqrtf(float);

extern double erf(double);
extern float erff(float);

extern double erfc(double);
extern float erfcf(float);

extern double lgamma(double);
extern float lgammaf(float);

extern double tgamma(double);
extern float tgammaf(float);

extern double ceil(double);
extern float ceilf(float);

extern double floor(double);
extern float floorf(float);

extern double nearbyint(double);
extern float nearbyintf(float);

extern double rint(double);
extern float rintf(float);

extern int lrint(double);
extern int lrintf(float);

extern double round(double);
extern float roundf(float);

extern int lround(double);
extern int lroundf(float);

extern double trunc(double);
extern float truncf(float);

extern double fmod(double, double);
extern float fmodf(float, float);

extern double remainder(double, double);
extern float remainderf(float, float);

extern double remquo(double, double, int *);
extern float remquof(float, float, int *);

extern double copysign(double, double);
extern float copysignf(float, float);

extern double nan(const char *);
extern float nanf(const char *);

extern double nextafter(double, double);
extern float nextafterf(float, float);

extern double fdim(double, double);
extern float fdimf(float, float);

extern double fmax(double, double);
extern float fmaxf(float, float);

extern double fmin(double, double);
extern float fminf(float, float);

extern double fma(double, double, double);
extern float fmaf(float, float, float);

extern double acosl(double);
extern double asinl(double);
extern double atanl(double);
extern double atan2l(double, double);
extern double cosl(double);
extern double sinl(double);
extern double tanl(double);
extern double acoshl(double);
extern double asinhl(double);
extern double atanhl(double);
extern double coshl(double);
extern double sinhl(double);
extern double tanhl(double);
extern double expl(double);
extern double exp2l(double);
extern double expm1l(double);
extern double logl(double);
extern double log10l(double);
extern double log2l(double);
extern double log1pl(double);
extern double logbl(double);
extern double modfl(double, double *);
extern double ldexpl(double, int);
extern double frexpl(double, int *);
extern int ilogbl(double);
extern double scalbnl(double, int);
extern double scalblnl(double, int);
extern double fabsl(double);
extern double cbrtl(double);
extern double hypotl(double, double);
extern double powl(double, double);
extern double sqrtl(double);
extern double erfl(double);
extern double erfcl(double);

extern double lgammal(double);
extern double tgammal(double);
extern double ceill(double);
extern double floorl(double);
extern double nearbyintl(double);
extern double rintl(double);
extern int lrintl(double);
extern double roundl(double);
extern int lroundl(double);


extern double truncl(double);
extern double fmodl(double, double);
extern double remainderl(double, double);
extern double remquol(double, double, int *);
extern double copysignl(double, double);
extern double nanl(const char *);
extern double nextafterl(double, double);
extern double nexttoward(double, double);
extern float nexttowardf(float, double);
extern double nexttowardl(double, double);
extern double fdiml(double, double);
extern double fmaxl(double, double);
extern double fminl(double, double);
extern double fmal(double, double, double);

#define isgreater(x, y) __builtin_isgreater((x),(y))
#define isgreaterequal(x, y) __builtin_isgreaterequal((x),(y))
#define isless(x, y) __builtin_isless((x),(y))
#define islessequal(x, y) __builtin_islessequal((x),(y))
#define islessgreater(x, y) __builtin_islessgreater((x),(y))
#define isunordered(x, y) __builtin_isunordered((x),(y))

extern double scalb(double, double); 

#define M_E   2.71828182845904523536028747135266250
#define M_LOG2E   1.44269504088896340735992468100189214
#define M_LOG10E  0.434294481903251827651128918916605082
#define M_LN2  0.693147180559945309417232121458176568
#define M_LN10   2.30258509299404568401799145468436421
#define M_PI  3.14159265358979323846264338327950288
#define M_PI_2   1.57079632679489661923132169163975144
#define M_PI_4   0.785398163397448309615660845819875721
#define M_1_PI   0.318309886183790671537767526745028724
#define M_2_PI   0.636619772367581343075535053490057448
#define M_2_SQRTPI 1.12837916709551257389615890312154517
#define M_SQRT2   1.41421356237309504880168872420969808
#define M_SQRT1_2  0.707106781186547524400844362104849039

#define  MAXFLOAT  0x1.fffffep+127f
