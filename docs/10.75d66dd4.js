parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"m7eB":[function(require,module,exports) {
var jsstats=jsstats||{};!function(jss){var NormalDistribution=function(t,i){t||(t=0),i||(i=1),this.mean=t,this.sd=i,this.Sqrt2=1.4142135623730951,this.Sqrt2PI=2.5066282746310007,this.lnconstant=-Math.log(this.Sqrt2PI*i)};NormalDistribution.prototype.sample=function(){},NormalDistribution.prototype.cumulativeProbability=function(t){var i=(t-this.mean)/(this.Sqrt2*this.sd);return.5+.5*this.errorFunc(i)},NormalDistribution.prototype.invCumulativeProbability=function(t){return this.Sqrt2*this.invErrorFunc(2*t-1)*this.sd+this.mean},NormalDistribution.prototype.errorFunc=function(t){var i=1/(1+.5*Math.abs(t)),r=1-i*Math.exp(-t*t-1.26551223+i*(1.00002368+i*(.37409196+i*(.09678418+i*(i*(.27886807+i*(i*(1.48851587+i*(.17087277*i-.82215223))-1.13520398))-.18628806)))));return t>=0?r:-r},NormalDistribution.prototype.invErrorFunc=function(t){var i,r;if(r=0==t?0:t>0?1:-1,0!=t){var o=Math.log(1-t*t),a=o/.147,s=o/2+2/(.147*Math.PI),e=Math.sqrt(s*s-a);i=Math.sqrt(e-s)*r}else i=0;return i},jss.NormalDistribution=NormalDistribution;var TDistribution=function(t){t&&(this.df=t)};TDistribution.prototype.LogGamma=function(Z){with(Math)var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-536382e-11/(Z+5),LG=(Z-.5)*log(Z+4.5)-(Z+4.5)+log(2.50662827465*S);return LG},TDistribution.prototype.Betinc=function(t,i,r){for(var o,a=0,s=1,e=1,n=1,u=0,h=0;Math.abs((e-h)/e)>1e-5;)h=e,s=n+(o=-(i+u)*(i+r+u)*t/(i+2*u)/(i+2*u+1))*s,e=(a=e+o*a)+(o=(u+=1)*(r-u)*t/(i+2*u-1)/(i+2*u))*e,a/=n=s+o*n,s/=n,e/=n,n=1;return e/i},TDistribution.prototype.cumulativeProbability=function(X,df){with(df||(df=this.df),Math)df<=0?console.error("Degrees of freedom must be positive"):(A=df/2,S=A+.5,Z=df/(df+X*X),BT=exp(this.LogGamma(S)-this.LogGamma(.5)-this.LogGamma(A)+A*log(Z)+.5*log(1-Z)),Z<(A+1)/(S+2)?betacdf=BT*this.Betinc(Z,A,.5):betacdf=1-BT*this.Betinc(1-Z,.5,A),tcdf=X<0?betacdf/2:1-betacdf/2),tcdf=round(1e5*tcdf)/1e5;return tcdf},TDistribution.prototype.invCumulativeProbability=function(t,i){i||(i=this.df);if(t>=.5){var r=0;for(a=0;a<100&&!(this.cumulativeProbability(a,i)>=t);a++)r=a;for(var o=r,a=0;a<100&&!(this.cumulativeProbability(r+a/100)>=t);a+=1)o=r+a/100;var s=o;for(a=0;a<100&&!(this.cumulativeProbability(o+a/1e4)>=t);a+=1)s=o+a/1e4;return s}for(r=0,a=0;a<100&&!(this.cumulativeProbability(-a,i)<=t);a++)r=a;for(o=r,a=0;a<100&&!(this.cumulativeProbability(-r-a/100)<=t);a+=1)o=r+a/100;for(s=o,a=0;a<100&&!(this.cumulativeProbability(-o-a/1e4)<=t);a+=1)s=o+a/1e4;return-s},jss.TDistribution=TDistribution;var FDistribution=function(t,i){this.df1=t,this.df2=i,this.EPSILON=1e-10};FDistribution.prototype.L504=function(t,i,r,o){var a=t*i/(t*i+r),s=Math.sqrt(a),e=Math.log(s),n=Math.sqrt(1-a),u=Math.log(n),h=1-2*Math.atan(s/Math.sqrt(-s*s+1))/Math.PI,f=0;if(1!=r){var l=Math.log(2*s/Math.PI);if(h-=Math.exp(l+u),3!=r)for(var b=Math.floor((r-3)/2),M=1;M<=b;M++){var c=2*M+1;(v=(f+=Math.log((c-1)/c))+u*c+l)>-78.4&&(h-=Math.exp(v))}}if(1!=t){l=f;if(r>1&&(l+=Math.log(r-1)),(l+=Math.log(2/Math.PI)+e+u*r)>-78.4&&(h+=Math.exp(l)),3!=t){b=Math.floor((t-3)/2);f=0;for(M=1;M<=b;M++){var v;c=2*M+1;(v=(f+=Math.log((r+c-2)/c))+e*(c-1)+l)>-78.4&&(h+=Math.exp(v))}}}return h},FDistribution.prototype.L401=function(t,i,r,o){var a=t*i/(t*i+r),s=Math.log(a),e=0,n=Math.log(1-a)*r/2;if(n>-78.4&&(e=Math.exp(n)),2!=t)for(var u=Math.floor(t/2-1),h=0,f=1;f<=u;f++){var l=2*f;(h+=Math.log(r+l-2)-Math.log(l)+s)+n>-78.4&&(e+=Math.exp(h+n))}return 1==o&&(e=1-e),e},FDistribution.prototype.ProbF=function(t,i,r){var o=r,a=t,s=i,e=0;return 2*Math.floor(a/2)==a?this.L401(a,o,s,e):2*Math.floor(s/2)!=s?this.L504(a,o,s,e):(o=1/o,a=i,s=t,e=1,this.L401(a,o,s,e))},FDistribution.prototype.cumulativeProbability=function(t){if(this.df1>.01&this.df2>.01&t>this.EPSILON)return 1-this.ProbF(this.df1,this.df2,t);console.error("df1, df2, and F must be numbers greater than 0.")},jss.FDistribution=FDistribution;var ChiSquareDistribution=function(t){this.df=t};ChiSquareDistribution.prototype.ChiSquaredProbability=function(t){var i,r,o,a,s,e,n=0,u=this.df,h=Math.log(Math.sqrt(Math.PI)),f=1/Math.sqrt(Math.PI);if(t<=0||u<1)return 1;if(i=.5*t,even=parseInt(u/2*2,2)==u,u>1&&(n=Math.exp(-i)),r=even?n:2*new jsstats.NormalDistribution(0,1).cumulativeProbability(-Math.sqrt(t)),u>2){if(t=.5*(u-1),s=even?1:.5,i>20){for(o=even?0:h,a=Math.log(i);s<=t;)e=a*s-i-(o=Math.log(s)+o),r+=Math.exp(e),s+=1;return r}for(o=even?1:f/Math.sqrt(i),a=0;s<=t;)a+=o*=i/s,s+=1;return a*n+r}return r},ChiSquareDistribution.prototype.cumulativeProbability=function(t){return 1-this.ChiSquaredProbability(t)},jss.ChiSquareDistribution=ChiSquareDistribution}(jsstats);var module=module||{};module&&(module.exports=jsstats);
},{}],"xoiM":[function(require,module,exports) {
module.exports=require("./src/jsstats");
},{"./src/jsstats":"m7eB"}],"PXIi":[function(require,module,exports) {
module.exports=function(e){if(1===e||2===e)return 0;if(0===e)return 1/0;if(isNaN(e))throw new Error("The value is not a number.");if(e<0)throw new Error("The value is a negative number.");let r,t,n,o=1.000000000190015;return n=(t=r=e)+5.5,n-=(r+.5)*Math.log(n),[76.18009172947146,-86.50532032941678,24.01409824083091,-1.231739572450155,.001208650973866179,-5395239384953e-18].map(e=>{o+=e/++t}),Math.log(2.5066282746310007*o/r)-n};
},{}],"Dysa":[function(require,module,exports) {
const r=require("./logGamma.js");module.exports=function(e,a){if(isNaN(e))throw new Error("The value in param a is not a number.");if(isNaN(a))throw new Error("The value in param x is not a number.");if(e<=0)throw new Error("The number in param a is equal or less tham 0.");if(a<0)throw new Error("The number in param x is a negative number.");const t=r(e);let n=a+1-e,o=1/1e-30,i=1/n,h=i,l=1;const m=-~(8.5*Math.log(e>=1?e:1/e)+.4*e+17);if(a<e+1){let r=1/e,n=r;for(let t=e;l<=m;l++)r+=n*=a/++t;return r*Math.exp(-a+e*Math.log(a)-t)}let s;for(;l<=m;l++)h*=(i=1/(i=(s=-l*(l-e))*i+(n+=2)))*(o=n+s/o);return 1-h*Math.exp(-a+e*Math.log(a)-t)};
},{"./logGamma.js":"PXIi"}],"oy9s":[function(require,module,exports) {
const a=require("./logGamma.js"),t=require("./regLowGamma.js");module.exports=function(r,e){if(isNaN(r))throw new Error('The value in param "p" is not an number.');if(isNaN(e))throw new Error('The value in param "a" is not an number.');if(r>=1)return Math.max(100,e+100*Math.sqrt(e));if(r<=0)return 0;const h=e-1,o=a(e);let n,M,i,s,m,u,l;e>1?(u=Math.log(h),l=Math.exp(h*(u-1)-o),m=r<.5?r:1-r,n=(2.30753+.27061*(i=Math.sqrt(-2*Math.log(m))))/(1+i*(.99229+.04481*i))-i,r<.5&&(n=-n),n=Math.max(.001,e*Math.pow(1-1/(9*e)-n/(3*Math.sqrt(e)),3))):n=r<(i=1-e*(.253+.12*e))?Math.pow(r/i,1/e):1-Math.log(1-(r-i)/(1-i));for(let a=0;a<12;a++){if(n<=0)return 0;if((n-=i=(s=(M=t(e,n)-r)/(i=e>1?l*Math.exp(-(n-h)+h*(Math.log(n)-u)):Math.exp(-n+h*Math.log(n)-o)))/(1-.5*Math.min(1,s*((e-1)/n-1))))<=0&&(n=.5*(n+i)),Math.abs(i)<1e-8*n)break}return n};
},{"./logGamma.js":"PXIi","./regLowGamma.js":"Dysa"}],"kyfB":[function(require,module,exports) {
const r=require("./invRegLowGamma.js");module.exports=function(e,n){if(isNaN(e))throw new Error('The value in param "probability" is not an number.');if(isNaN(n))throw new Error('The value in param "degreeOfFreedom" is not an number.');if(e>=1||e<=0)throw new Error('The number in param "probability" must lie in the interval [0 1].');if(n<=0)throw new Error('The number in param "degreeOfFreedom" must be greater than 0.');return 2*r(e,.5*n)};
},{"./invRegLowGamma.js":"oy9s"}],"GOJ3":[function(require,module,exports) {
const e=require("./invChiSquareCDF.js"),a=require("./invRegLowGamma.js"),m=require("./logGamma.js"),r=require("./regLowGamma.js");module.exports={invChiSquareCDF:(a,m)=>e(a,m),invRegLowGamma:(e,m)=>a(e,m),logGamma:e=>m(e),regLowGamma:(e,a)=>r(e,a)};
},{"./invChiSquareCDF.js":"kyfB","./invRegLowGamma.js":"oy9s","./logGamma.js":"PXIi","./regLowGamma.js":"Dysa"}],"gfSe":[function(require,module,exports) {
"use strict";function e(e){var r=1+76.18009173/e-86.50532033/(e+1)+24.01409822/(e+2)-1.231739516/(e+3)+.00120858003/(e+4)-536382e-11/(e+5);return(e-.5)*Math.log(e+4.5)-(e+4.5)+Math.log(2.50662827465*r)}function r(r,t){for(var o=0,n=1,u=1,a=r,s=0,i=0;Math.abs((u-s)/u)>1e-5;)s=u,u=r*(o=u+((i+=1)-t)*o)+i*u,o/=a=r*(n=a+(i-t)*n)+i*a,n/=a,u/=a,a=1;return 1-Math.exp(t*Math.log(r)-r-e(t))*u}function t(r,t){for(var o=1/t,n=o,u=1;o>1e-5*n;)n+=o=o*r/(t+u),u+=1;return n*=Math.exp(t*Math.log(r)-r-e(t))}function o(e,o){return e<=0?0:e<o+1?t(e,o):r(e,o)}function n(e,r){if(e<=0)throw new Error("Degrees of freedom must be positive");return o(r/2,e/2)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.js_chi_square=void 0,exports.js_chi_square=n;
},{}],"I5Qw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fdistr=void 0;var t=5;function a(t,a){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";if(a<=0||a>1)throw"Invalid p: $p\n";return q(I(t-0,a-0))}function r(t){if(t>1||t<=0)throw"Invalid p: $p\n";return q(l(t-0))}function n(t,a){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";if(a<=0||a>=1)throw"Invalid p: $p\n";return q(v(t-0,a-0))}function h(t,a,r){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";if(a<=0||Math.abs(a)-Math.abs(x(a))!=0)throw"Invalid m: $m\n";if(r<=0||r>1)throw"Invalid p: $p\n";return q(w(t-0,a-0,r-0))}function M(t){return q(u(t-0))}function e(t,a){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";return q(s(t-0,a-0))}function o(t,a){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";return q(p(t-0,a-0))}function i(t,a,r){if(t<=0||Math.abs(t)-Math.abs(x(t))!=0)throw"Invalid n: $n\n";if(a<=0||Math.abs(a)-Math.abs(x(a))!=0)throw"Invalid m: $m\n";return q(f(t-0,a-0,r-0))}function f(t,a,r){var n;if(r<=0)n=1;else if(a%2==0){for(var h=a/(a+t*r),M=1,e=a-2;e>=2;e-=2)M=1+(t+e-2)/e*h*M;n=1-Math.pow(1-h,t/2)*M}else if(t%2==0){for(h=t*r/(a+t*r),M=1,e=t-2;e>=2;e-=2)M=1+(a+e-2)/e*h*M;n=Math.pow(1-h,a/2)*M}else{var o=Math.atan2(Math.sqrt(t*r/a),1);for(h=Math.pow(Math.sin(o),2),M=1==t?0:1,e=t-2;e>=3;e-=2)M=1+(a+e-2)/e*h*M;var i=Math.PI;for(e=2;e<=a-1;e+=2)i*=(e-1)/e;var f=2/i*Math.sin(o)*Math.pow(Math.cos(o),a)*M;h=Math.pow(Math.cos(o),2),M=1==a?0:1;for(e=a-2;e>=3;e-=2)M=1+(e-1)/e*h*M;n=d(0,f+1-2*o/Math.PI-2/Math.PI*Math.sin(o)*Math.cos(o)*M)}return n}function s(t,a){var r;if(a<=0)r=1;else if(t>100)r=u((Math.pow(a/t,1/3)-(1-2/9/t))/Math.sqrt(2/9/t));else if(a>400)r=0;else{var n,h,M;for(t%2!=0?(r=2*u(Math.sqrt(a)),n=Math.sqrt(2/Math.PI)*Math.exp(-a/2)/Math.sqrt(a),M=1):(r=n=Math.exp(-a/2),M=2),h=M;h<=t-2;h+=2)r+=n*=a/h}return r}function l(t){var a=-Math.log(4*t*(1-t)),r=Math.sqrt(a*(1.570796288+a*(.03706987906+a*(a*(a*(6841218299e-15+a*(5824238515e-15+a*(a*(8.360937017e-8+a*(a*(3.657763036e-11+6.936233982e-13*a)-3.231081277e-9))-104527497e-14)))-.0002250947176)-.0008364353589))));return t>.5&&(r=-r),r}function u(t){var a=0,r=Math.abs(t);if(r<1.9)a=Math.pow(1+r*(.049867347+r*(.0211410061+r*(.0032776263+r*(380036e-10+r*(488906e-10+5383e-9*r))))),-16)/2;else if(r<=100){for(var n=18;n>=1;n--)a=n/(r+a);a=Math.exp(-.5*r*r)/Math.sqrt(2*Math.PI)/(r+a)}return t<0&&(a=1-a),a}function v(t,a){if(a>=1||a<=0)throw"Invalid p: $p\n";if(.5==a)return 0;if(a<.5)return-v(t,1-a);var r,n=l(a),h=Math.pow(n,2),M=n*(1+((h+1)/4+(((5*h+16)*h+3)/96+((((3*h+19)*h+17)*h-15)/384+(((((79*h+776)*h+1482)*h-1920)*h-945)/92160+(((((27*h+339)*h+930)*h-1782)*h-765)*h+17955)/368640/t)/t)/t)/t)/t);if(t<=Math.pow(b(a),2)+3)do{var e=t+1,o=(p(t,M)-a)/Math.exp((e*Math.log(e/(t+M*M))+Math.log(t/e/2/Math.PI)-1+(1/e-1/t)/6)/2);M+=o,r=P(o,Math.abs(x(b(Math.abs(M))-4)))}while(M&&0!=r);return M}function p(t,a){for(var r,n,h=Math.atan2(a/Math.sqrt(t),1),M=Math.pow(Math.cos(h),2),e=1,o=t-2;o>=2;o-=2)e=1+(o-1)/o*M*e;return t%2==0?(r=Math.sin(h)/2,n=.5):(r=1==t?0:Math.sin(h)*Math.cos(h)/Math.PI,n=.5+h/Math.PI),d(0,1-n-r*e)}function w(t,a,r){var n;if(r>=1||r<=0)throw"Invalid p: $p\n";if(1==r)n=0;else if(1==a)n=1/Math.pow(v(t,.5-r/2),2);else if(1==t)n=Math.pow(v(a,r/2),2);else if(2==a){var h=I(a,1-r),M=a-2;n=1/(h/a*(1+((h-M)/2+(((4*h-11*M)*h+M*(7*a-10))/24+(((2*h-10*M)*h+M*(17*a-26))*h-M*M*(9*a-6))/48/t)/t)/t))}else n=t>a?1/c(a,t,1-r):c(t,a,r);return n}function c(t,a,r){var n,h=I(t,r),M=t-2,e=h/t*(1+((h-M)/2+(((4*h-11*M)*h+M*(7*t-10))/24+(((2*h-10*M)*h+M*(17*t-26))*h-M*M*(9*t-6))/48/a)/a)/a);do{var o=Math.exp(((t+a)*Math.log((t+a)/(t*e+a))+(t-2)*Math.log(e)+Math.log(t*a/(t+a))-Math.log(4*Math.PI)-(1/t+1/a-1/(t+a))/6)/2);e+=n=(f(t,a,e)-r)/o}while(Math.abs(n)>3e-4);return e}function I(t,a){var r;if(a>1||a<=0)throw"Invalid p: $p\n";if(1==a)r=0;else if(1==t)r=Math.pow(l(a/2),2);else if(2==t)r=-2*Math.log(a);else{var n,h,M=l(a),e=M*M;if(r=d(0,t+Math.sqrt(2*t)*M+2/3*(e-1)+M*(e-7)/9/Math.sqrt(2*t)-2/405/t*(e*(3*e+7)-16)),t<=100)do{if(n=r,r<0)h=1;else if(t>100)h=u((Math.pow(r/t,1/3)-(1-2/9/t))/Math.sqrt(2/9/t));else if(r>400)h=0;else{var o,i;t%2!=0?(h=2*u(Math.sqrt(r)),i=Math.sqrt(2/Math.PI)*Math.exp(-r/2)/Math.sqrt(r),o=1):(h=i=Math.exp(-r/2),o=2);for(var f=o;f<=t-2;f+=2)h+=i*=r/f}r=P(r+=(h-a)/Math.exp(((t-1)*Math.log(r/t)-Math.log(4*Math.PI*r)+t-r-1/t/6)/2),5)}while(t<31&&Math.abs(n-r)>1e-4)}return r}function b(t){return Math.log(t)/Math.log(10)}function d(){for(var t=[],a=0;a<arguments.length;a++)t[a]=arguments[a];for(var r=t[0],n=0;n<t.length;n++)r<t[n]&&(r=t[n]);return r}function g(){for(var t=[],a=0;a<arguments.length;a++)t[a]=arguments[a];for(var r=t[0],n=0;n<t.length;n++)r>t[n]&&(r=t[n]);return r}function $(a){return Math.abs(x(b(Math.abs(a))-t))}function q(t){return t?P(t,$(t)):"0"}function P(t,a){return t*=Math.pow(10,a),(t=Math.round(t))/Math.pow(10,a)}function x(t){return t>0?Math.floor(t):Math.ceil(t)}exports.fdistr=h;
},{}],"xRVE":[function(require,module,exports) {
"use strict";var t=this&&this.__createBinding||(Object.create?function(t,e,i,n){void 0===n&&(n=i),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,n){void 0===n&&(n=i),t[n]=e[i]}),e=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),i=this&&this.__importStar||function(i){if(i&&i.__esModule)return i;var n={};if(null!=i)for(var r in i)Object.hasOwnProperty.call(i,r)&&t(n,i,r);return e(n,i),n};Object.defineProperty(exports,"__esModule",{value:!0}),exports.inv_fisher=exports.fisher=exports.chi_square=exports.inv_chi_square=exports.inv_student=exports.inv_standart_deviation=exports.std_cumulative_distribution=void 0;var n=i(require("js-stats")),r=require("inv-chisquare-cdf"),o=require("./stat.chi_square"),s=require("./stat.statistics-distributions-001");function u(t){return new n.NormalDistribution(0,1).cumulativeProbability(t)}function a(t){return new n.NormalDistribution(0,1).invCumulativeProbability(t)}function c(t,e){return new n.TDistribution(t).invCumulativeProbability(e)}function f(t,e){return r.invChiSquareCDF(e,t)}function l(t,e){return o.js_chi_square(t,e)}function d(t,e,i){void 0===i&&(i=3);var n=Math.pow(10,i);if(Math.round(t*n)!=Math.round(e*n))throw new Error("x1="+t+" "+Math.round(t*n)+" x2="+e+" "+Math.round(e*n));var r=Math.pow(10,i+2);Math.round(t*r)!=Math.round(e*r)&&console.warn("Self-check warning: x1="+t+" x2="+e+" ("+Math.round(t*r)+", "+Math.round(e*r)+")")}function _(t,e,i){return new n.FDistribution(t,e).cumulativeProbability(i)}function v(t,e,i){return void 0===i&&(i=.05),s.fdistr(t,e,i)}exports.std_cumulative_distribution=u,exports.inv_standart_deviation=a,exports.inv_student=c,exports.inv_chi_square=f,exports.chi_square=l,exports.fisher=_,exports.inv_fisher=v,console.info("Self-testing inv_chi_square..."),d(f(10,.95),18.3,1),d(f(20,.3),16.3,1),d(f(6,.99),16.8,1),d(f(3,.95),7.81,1),console.info("Self-testing chi_square..."),d(l(10,18.3),.95),d(l(20,16.3),.3,2),d(l(6,16.8),.99),d(l(3,7.81),.95),console.info("Self-testing int_student..."),d(c(10,.75),.7),d(c(10,.995),3.169),d(c(20,.95),1.725),d(c(15,.95),1.753),console.info("Self-testing inv_standart_deviation..."),d(a(.9),1.282),d(a(.95),1.645),d(a(.99),2.326,1),d(a(.999),3.09,1),console.info("Self-testing standart_deviation..."),d(u(0),.5,4),d(u(1.05),.8531,4),d(u(.59),.7224,4),d(u(3.14),.9992,4),console.info("Self-testing fisher..."),d(_(3,5,5.41),.95),d(_(2,12,3.88),.95),d(_(12,13,2.6),.95),d(_(5,150,2.27),.95),console.info("Self-testing inv_fisher..."),d(v(4,7,.05),4.12),d(v(3,5,.05),5.41,2),d(v(2,12,.05),3.88,1),d(v(12,13,.05),2.6,2),d(v(5,150,.05),2.27,2),console.info("Self-test is done");
},{"js-stats":"xoiM","inv-chisquare-cdf":"GOJ3","./stat.chi_square":"gfSe","./stat.statistics-distributions-001":"I5Qw"}],"kLTt":[function(require,module,exports) {
"use strict";function t(t,e){if(t.length!==e)throw new Error("Wrong N");return t.reduce(function(t,e){return t+e},0)/e}function e(t,e,r){if(t.length!==r)throw new Error("Wrong N");return t.map(function(t){return t*t}).reduce(function(t,e){return t+e},0)/(r-1)-r*(e*e)/(r-1)}function r(t){for(var e=Math.pow(1,2)/12,r=[],n=0;n<t;n++){for(var o=0,a=0;a<12;a++){o+=0+1*Math.random()}var u=(o-6)/(Math.sqrt(e)*Math.sqrt(12));r.push(u)}return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.log=exports.getNormalSet=exports.getEstimateD=exports.getEstimateMean=void 0,exports.getEstimateMean=t,exports.getEstimateD=e,exports.getNormalSet=r;var n=" ";function o(t){var e=document.getElementById("log"),r=document.createElement("div");r.innerHTML=t||n,e.appendChild(r)}exports.log=o;
},{}],"Ecp0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./stat"),o=require("./lib");function t(t){var n=t.length,e=0;t.forEach(function(r){return e+=r.length}),o.log("Имеется "+n+" массивов: "+t.map(function(r){return r.length}).join(", ")+". Всего "+e+" элементов");var a=new Array(n).fill(0);t.forEach(function(r,o){r.forEach(function(r){a[o]+=r})});var i=0;a.forEach(function(r){return i+=r}),o.log("Суммы Aj = "+a.join(", ")),o.log("Сумма A = "+i);var u=0;t.forEach(function(r){return r.forEach(function(r){return u+=Math.pow(r,2)})}),u-=i*i/e,o.log("Q="+u.toFixed(2));var l=0;a.forEach(function(r,o){return l+=Math.pow(a[o],2)/t[o].length}),l-=i*i/e,o.log("Q1 = "+l.toFixed(2));var f=u-l;o.log("Q2 = "+f.toFixed(2));var c=l/(n-1),g=f/(e-n);o.log("S₁²="+c.toFixed(2)),o.log("S₂²="+g.toFixed(2));var h=c/g;o.log("Z = "+h.toFixed(2));var v=r.fisher(n-1,e-n,h);o.log("Достоверность = F("+(n-1)+", "+(e-n)+", "+h.toFixed(2)+") = "+v.toFixed(4));for(var d=0,p=[.1,.05,.01];d<p.length;d++){var x=p[d];o.log("  α="+x+" ("+100*x+"%)");var F=r.inv_fisher(n-1,e-n,x);F>h?o.log("  Перцентиль="+F+" > Z, гипотеза не отвергается"):o.log("  Перцентиль="+F+" ≤ Z, гипотеза отвергается")}}var n=4,e=50,a=[50,80,70].map(function(r){return o.getNormalSet(r).map(function(r){return Math.round(r*n+e)})});a.push(o.getNormalSet(60).map(function(r){return Math.round(r*n+e+1)}));var i=[[18,28,12,14,32],[24,36,28,40,16],[36,12,22,45,40]];t(a);
},{"./stat":"xRVE","./lib":"kLTt"}]},{},["Ecp0"], null)
//# sourceMappingURL=/10.75d66dd4.js.map