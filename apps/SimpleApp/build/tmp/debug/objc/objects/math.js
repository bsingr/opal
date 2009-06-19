var acos(aDouble);
var acosf(aFloat);

var asin(aDouble);
var asinf(aFloat);

var atan(aDouble);
var atanf(aFloat);

var atan2(double, double);
var atan2f(float, float);

var cos(aDouble);
var cosf(aFloat);

var sin(aDouble);
var sinf(aFloat);

var tan(aDouble);
var tanf(aFloat);

var acosh(aDouble);
var acoshf(aFloat);

var asinh(aDouble);
var asinhf(aFloat);

var atanh(aDouble);
var atanhf(aFloat);

var cosh(aDouble);
var coshf(aFloat);

var sinh(aDouble);
var sinhf(aFloat);

var tanh(aDouble);
var tanhf(aFloat);

var exp(aDouble);
var expf(aFloat);

var exp2(aDouble); 
var exp2f(aFloat);

var expm1(aDouble); 
var expm1f(aFloat);

var log(aDouble);
var logf(aFloat);

var log10(aDouble);
var log10f(aFloat);

var log2(aDouble);
var log2f(aFloat);

var log1p(aDouble);
var log1pf(aFloat);

var logb(aDouble);
var logbf(aFloat);

var modf(double, double *);
var modff(float, float *);

var ldexp(double, int);
var ldexpf(float, int);

var frexp(double, int *);
var frexpf(float, int *);

var ilogb(aDouble);
var ilogbf(aFloat);

var scalbn(double, int);
var scalbnf(float, int);

var scalbln(double, int);
var scalblnf(float, int);

var fabs(aDouble);
var fabsf(aFloat);

var cbrt(aDouble);
var cbrtf(aFloat);

var hypot(double, double);
var hypotf(float, float);

var pow(double, double);
var powf(float, float);

var sqrt(aDouble);
var sqrtf(aFloat);

var erf(aDouble);
var erff(aFloat);

var erfc(aDouble);
var erfcf(aFloat);

var lgamma(aDouble);
var lgammaf(aFloat);

var tgamma(aDouble);
var tgammaf(aFloat);

var ceil = Math.ceil;
var ceilf = Math.ceil;

var floor = Math.floor;
var floorf = Math.floor;

var nearbyint(aDouble);
var nearbyintf(aFloat);

var rint(aDouble);
var rintf(aFloat);

var lrint(aDouble);
var lrintf(aFloat);

var round = Math.round;

var roundf = Math.round;

var lround(aDouble);
var lroundf(aFloat);

var trunc(aDouble);
var truncf(aFloat);

var fmod(double, double);
var fmodf(float, float);

var remainder(double, double);
var remainderf(float, float);

var remquo(double, double, int *);
var remquof(float, float, int *);

var copysign(double, double);
var copysignf(float, float);

var nan(const char *);
var nanf(const char *);

var nextafter(double, double);
var nextafterf(float, float);

var fdim(double, double);
var fdimf(float, float);

var fmax(double, double);
var fmaxf(float, float);

var fmin(double, double);
var fminf(float, float);

var fma(double, double, double);
var fmaf(float, float, float);

var acosl(aDouble);
var asinl(aDouble);
var atanl(aDouble);
var atan2l(double, double);
var cosl(aDouble);
var sinl(aDouble);
var tanl(aDouble);
var acoshl(aDouble);
var asinhl(aDouble);
var atanhl(aDouble);
var coshl(aDouble);
var sinhl(aDouble);
var tanhl(aDouble);
var expl(aDouble);
var exp2l(aDouble);
var expm1l(aDouble);
var logl(aDouble);
var log10l(aDouble);
var log2l(aDouble);
var log1pl(aDouble);
var logbl(aDouble);
var modfl(double, double *);
var ldexpl(double, int);
var frexpl(double, int *);
var ilogbl(aDouble);
var scalbnl(double, int);
var scalblnl(double, int);
var fabsl(aDouble);
var cbrtl(aDouble);
var hypotl(double, double);
var powl(double, double);
var sqrtl(aDouble);
var erfl(aDouble);
var erfcl(aDouble);

var lgammal(aDouble);
var tgammal(aDouble);
var ceill(aDouble);
var floorl(aDouble);
var nearbyintl(aDouble);
var rintl(aDouble);
var lrintl(aDouble);
var roundl(aDouble);
var lroundl(aDouble);


var truncl(aDouble);
var fmodl(double, double);
var remainderl(double, double);
var remquol(double, double, int *);
var copysignl(double, double);
var nanl(const char *);
var nextafterl(double, double);
var nexttoward(double, double);
var nexttowardf(float, double);
var nexttowardl(double, double);
var fdiml(double, double);
var fmaxl(double, double);
var fminl(double, double);
var fmal(double, double, double);

#define isgreater(x, y) __builtin_isgreater((x),(y))
#define isgreaterequal(x, y) __builtin_isgreaterequal((x),(y))
#define isless(x, y) __builtin_isless((x),(y))
#define islessequal(x, y) __builtin_islessequal((x),(y))
#define islessgreater(x, y) __builtin_islessgreater((x),(y))
#define isunordered(x, y) __builtin_isunordered((x),(y))

var scalb(double, double); 

#define M_E     2.71828182845904523536028747135266250
#define M_LOG2E   1.44269504088896340735992468100189214
#define M_LOG10E  0.434294481903251827651128918916605082
#define M_LN2    0.693147180559945309417232121458176568
#define M_LN10   2.30258509299404568401799145468436421
#define M_PI    3.14159265358979323846264338327950288
#define M_PI_2   1.57079632679489661923132169163975144
#define M_PI_4   0.785398163397448309615660845819875721
#define M_1_PI   0.318309886183790671537767526745028724
#define M_2_PI   0.636619772367581343075535053490057448
#define M_2_SQRTPI 1.12837916709551257389615890312154517
#define M_SQRT2   1.41421356237309504880168872420969808
#define M_SQRT1_2  0.707106781186547524400844362104849039

#define  MAXFLOAT  0x1.fffffep+127f
