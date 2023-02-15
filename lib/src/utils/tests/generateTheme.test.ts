import { ThemeUtils } from '..';

const defaultTheme = `:root {
  /*
   *
   * Primary
   *
   */
  
  /* Primary - Base */
  --primary: #0f52ba;
  --primary-rgba: rgba(15 82 186 / 100%);
  --primary-components: 15 82 186;
  
  /* Primary - Hover */
  --primary-hover: #0e4aa7;
  --primary-hover-rgba: rgba(14 74 167 / 100%);
  --primary-hover-components: 14 74 167;
  
  /* Primary - Disabled */
  --primary-disabled: #4b5f7e;
  --primary-disabled-rgba: rgba(75 95 126 / 100%);
  --primary-disabled-components: 75 95 126;
  
  /* Primary - Tint */
  --primary-tint: #115acd;
  --primary-tint-rgba: rgba(17 90 205 / 100%);
  --primary-tint-components: 17 90 205;
  
  /* Primary - Shade */
  --primary-shade: #0e4aa7;
  --primary-shade-rgba: rgba(14 74 167 / 100%);
  --primary-shade-components: 14 74 167;
  
  /* Primary - Text */
  --primary-text: #ffffff;
  --primary-text-rgba: rgba(255 255 255 / 100%);
  --primary-text-components: 255 255 255;
  
  /* Primary - Contrast */
  --primary-contrast: #ffffff;
  --primary-contrast-rgba: rgba(255 255 255 / 100%);
  --primary-contrast-components: 255 255 255;
  
  
  /*
   *
   * Secondary
   *
   */
  
  /* Secondary - Base */
  --secondary: #111e6c;
  --secondary-rgba: rgba(17 30 108 / 100%);
  --secondary-components: 17 30 108;
  
  /* Secondary - Hover */
  --secondary-hover: #0f1b61;
  --secondary-hover-rgba: rgba(15 27 97 / 100%);
  --secondary-hover-components: 15 27 97;
  
  /* Secondary - Disabled */
  --secondary-disabled: #31354c;
  --secondary-disabled-rgba: rgba(49 53 76 / 100%);
  --secondary-disabled-components: 49 53 76;
  
  /* Secondary - Tint */
  --secondary-tint: #132177;
  --secondary-tint-rgba: rgba(19 33 119 / 100%);
  --secondary-tint-components: 19 33 119;
  
  /* Secondary - Shade */
  --secondary-shade: #0f1b61;
  --secondary-shade-rgba: rgba(15 27 97 / 100%);
  --secondary-shade-components: 15 27 97;
  
  /* Secondary - Text */
  --secondary-text: #ffffff;
  --secondary-text-rgba: rgba(255 255 255 / 100%);
  --secondary-text-components: 255 255 255;
  
  /* Secondary - Contrast */
  --secondary-contrast: #ffffff;
  --secondary-contrast-rgba: rgba(255 255 255 / 100%);
  --secondary-contrast-components: 255 255 255;
  
  
  /*
   *
   * Tertiary
   *
   */
  
  /* Tertiary - Base */
  --tertiary: #26d1c1;
  --tertiary-rgba: rgba(38 209 193 / 100%);
  --tertiary-components: 38 209 193;
  
  /* Tertiary - Hover */
  --tertiary-hover: #22bcae;
  --tertiary-hover-rgba: rgba(34 188 174 / 100%);
  --tertiary-hover-components: 34 188 174;
  
  /* Tertiary - Disabled */
  --tertiary-disabled: #629590;
  --tertiary-disabled-rgba: rgba(98 149 144 / 100%);
  --tertiary-disabled-components: 98 149 144;
  
  /* Tertiary - Tint */
  --tertiary-tint: #2ae6d4;
  --tertiary-tint-rgba: rgba(42 230 212 / 100%);
  --tertiary-tint-components: 42 230 212;
  
  /* Tertiary - Shade */
  --tertiary-shade: #22bcae;
  --tertiary-shade-rgba: rgba(34 188 174 / 100%);
  --tertiary-shade-components: 34 188 174;
  
  /* Tertiary - Text */
  --tertiary-text: #000000;
  --tertiary-text-rgba: rgba(0 0 0 / 100%);
  --tertiary-text-components: 0 0 0;
  
  /* Tertiary - Contrast */
  --tertiary-contrast: #000000;
  --tertiary-contrast-rgba: rgba(0 0 0 / 100%);
  --tertiary-contrast-components: 0 0 0;
  
  
  /*
   *
   * Background
   *
   */
  
  /* Background - Base */
  --background: #ecf1f9;
  --background-rgba: rgba(236 241 249 / 100%);
  --background-components: 236 241 249;
  
  /* Background - Hover */
  --background-hover: #d4d9e0;
  --background-hover-rgba: rgba(212 217 224 / 100%);
  --background-hover-components: 212 217 224;
  
  /* Background - Disabled */
  --background-disabled: #f1f2f4;
  --background-disabled-rgba: rgba(241 242 244 / 100%);
  --background-disabled-components: 241 242 244;
  
  /* Background - Tint */
  --background-tint: #ffffff;
  --background-tint-rgba: rgba(255 255 255 / 100%);
  --background-tint-components: 255 255 255;
  
  /* Background - Shade */
  --background-shade: #d4d9e0;
  --background-shade-rgba: rgba(212 217 224 / 100%);
  --background-shade-components: 212 217 224;
  
  /* Background - Text */
  --background-text: #000000;
  --background-text-rgba: rgba(0 0 0 / 100%);
  --background-text-components: 0 0 0;
  
  /* Background - Contrast */
  --background-contrast: #000000;
  --background-contrast-rgba: rgba(0 0 0 / 100%);
  --background-contrast-components: 0 0 0;
  
  
  /*
   *
   * Surface
   *
   */
  
  /* Surface - Base */
  --surface: #f7f9fc;
  --surface-rgba: rgba(247 249 252 / 100%);
  --surface-components: 247 249 252;
  
  /* Surface - Hover */
  --surface-hover: #dee0e3;
  --surface-hover-rgba: rgba(222 224 227 / 100%);
  --surface-hover-components: 222 224 227;
  
  /* Surface - Disabled */
  --surface-disabled: #f9f9fa;
  --surface-disabled-rgba: rgba(249 249 250 / 100%);
  --surface-disabled-components: 249 249 250;
  
  /* Surface - Tint */
  --surface-tint: #ffffff;
  --surface-tint-rgba: rgba(255 255 255 / 100%);
  --surface-tint-components: 255 255 255;
  
  /* Surface - Shade */
  --surface-shade: #dee0e3;
  --surface-shade-rgba: rgba(222 224 227 / 100%);
  --surface-shade-components: 222 224 227;
  
  /* Surface - Text */
  --surface-text: #000000;
  --surface-text-rgba: rgba(0 0 0 / 100%);
  --surface-text-components: 0 0 0;
  
  /* Surface - Contrast */
  --surface-contrast: #000000;
  --surface-contrast-rgba: rgba(0 0 0 / 100%);
  --surface-contrast-components: 0 0 0;
  
  
  /*
   *
   * Border
   *
   */
  
  /* Border - Base */
  --border: #c2cad6;
  --border-rgba: rgba(194 202 214 / 100%);
  --border-components: 194 202 214;
  
  /* Border - Hover */
  --border-hover: #afb6c1;
  --border-hover-rgba: rgba(175 182 193 / 100%);
  --border-hover-components: 175 182 193;
  
  /* Border - Disabled */
  --border-disabled: #c9cbcf;
  --border-disabled-rgba: rgba(201 203 207 / 100%);
  --border-disabled-components: 201 203 207;
  
  /* Border - Tint */
  --border-tint: #d5deeb;
  --border-tint-rgba: rgba(213 222 235 / 100%);
  --border-tint-components: 213 222 235;
  
  /* Border - Shade */
  --border-shade: #afb6c1;
  --border-shade-rgba: rgba(175 182 193 / 100%);
  --border-shade-components: 175 182 193;
  
  /* Border - Text */
  --border-text: #000000;
  --border-text-rgba: rgba(0 0 0 / 100%);
  --border-text-components: 0 0 0;
  
  /* Border - Contrast */
  --border-contrast: #000000;
  --border-contrast-rgba: rgba(0 0 0 / 100%);
  --border-contrast-components: 0 0 0;
  
  
  /*
   *
   * Light
   *
   */
  
  /* Light - Base */
  --light: #c9cbcf;
  --light-rgba: rgba(201 203 207 / 100%);
  --light-components: 201 203 207;
  
  /* Light - Hover */
  --light-hover: #b5b7ba;
  --light-hover-rgba: rgba(181 183 186 / 100%);
  --light-hover-components: 181 183 186;
  
  /* Light - Disabled */
  --light-disabled: #cbcccd;
  --light-disabled-rgba: rgba(203 204 205 / 100%);
  --light-disabled-components: 203 204 205;
  
  /* Light - Tint */
  --light-tint: #dddfe4;
  --light-tint-rgba: rgba(221 223 228 / 100%);
  --light-tint-components: 221 223 228;
  
  /* Light - Shade */
  --light-shade: #b5b7ba;
  --light-shade-rgba: rgba(181 183 186 / 100%);
  --light-shade-components: 181 183 186;
  
  /* Light - Text */
  --light-text: #000000;
  --light-text-rgba: rgba(0 0 0 / 100%);
  --light-text-components: 0 0 0;
  
  /* Light - Contrast */
  --light-contrast: #000000;
  --light-contrast-rgba: rgba(0 0 0 / 100%);
  --light-contrast-components: 0 0 0;
  
  
  /*
   *
   * Medium
   *
   */
  
  /* Medium - Base */
  --medium: #797e86;
  --medium-rgba: rgba(121 126 134 / 100%);
  --medium-components: 121 126 134;
  
  /* Medium - Hover */
  --medium-hover: #6d7179;
  --medium-hover-rgba: rgba(109 113 121 / 100%);
  --medium-hover-components: 109 113 121;
  
  /* Medium - Disabled */
  --medium-disabled: #7e7f81;
  --medium-disabled-rgba: rgba(126 127 129 / 100%);
  --medium-disabled-components: 126 127 129;
  
  /* Medium - Tint */
  --medium-tint: #858b93;
  --medium-tint-rgba: rgba(133 139 147 / 100%);
  --medium-tint-components: 133 139 147;
  
  /* Medium - Shade */
  --medium-shade: #6d7179;
  --medium-shade-rgba: rgba(109 113 121 / 100%);
  --medium-shade-components: 109 113 121;
  
  /* Medium - Text */
  --medium-text: #000000;
  --medium-text-rgba: rgba(0 0 0 / 100%);
  --medium-text-components: 0 0 0;
  
  /* Medium - Contrast */
  --medium-contrast: #000000;
  --medium-contrast-rgba: rgba(0 0 0 / 100%);
  --medium-contrast-components: 0 0 0;
  
  
  /*
   *
   * Dark
   *
   */
  
  /* Dark - Base */
  --dark: #303236;
  --dark-rgba: rgba(48 50 54 / 100%);
  --dark-components: 48 50 54;
  
  /* Dark - Hover */
  --dark-hover: #2b2d31;
  --dark-hover-rgba: rgba(43 45 49 / 100%);
  --dark-hover-components: 43 45 49;
  
  /* Dark - Disabled */
  --dark-disabled: #323334;
  --dark-disabled-rgba: rgba(50 51 52 / 100%);
  --dark-disabled-components: 50 51 52;
  
  /* Dark - Tint */
  --dark-tint: #35373b;
  --dark-tint-rgba: rgba(53 55 59 / 100%);
  --dark-tint-components: 53 55 59;
  
  /* Dark - Shade */
  --dark-shade: #2b2d31;
  --dark-shade-rgba: rgba(43 45 49 / 100%);
  --dark-shade-components: 43 45 49;
  
  /* Dark - Text */
  --dark-text: #ffffff;
  --dark-text-rgba: rgba(255 255 255 / 100%);
  --dark-text-components: 255 255 255;
  
  /* Dark - Contrast */
  --dark-contrast: #ffffff;
  --dark-contrast-rgba: rgba(255 255 255 / 100%);
  --dark-contrast-components: 255 255 255;
  
  
  /*
   *
   * Success
   *
   */
  
  /* Success - Base */
  --success: #26d17b;
  --success-rgba: rgba(38 209 123 / 100%);
  --success-components: 38 209 123;
  
  /* Success - Hover */
  --success-hover: #22bc6f;
  --success-hover-rgba: rgba(34 188 111 / 100%);
  --success-hover-components: 34 188 111;
  
  /* Success - Disabled */
  --success-disabled: #62957b;
  --success-disabled-rgba: rgba(98 149 123 / 100%);
  --success-disabled-components: 98 149 123;
  
  /* Success - Tint */
  --success-tint: #2ae687;
  --success-tint-rgba: rgba(42 230 135 / 100%);
  --success-tint-components: 42 230 135;
  
  /* Success - Shade */
  --success-shade: #22bc6f;
  --success-shade-rgba: rgba(34 188 111 / 100%);
  --success-shade-components: 34 188 111;
  
  /* Success - Text */
  --success-text: #000000;
  --success-text-rgba: rgba(0 0 0 / 100%);
  --success-text-components: 0 0 0;
  
  /* Success - Contrast */
  --success-contrast: #000000;
  --success-contrast-rgba: rgba(0 0 0 / 100%);
  --success-contrast-components: 0 0 0;
  
  
  /*
   *
   * Warning
   *
   */
  
  /* Warning - Base */
  --warning: #f87304;
  --warning-rgba: rgba(248 115 4 / 100%);
  --warning-components: 248 115 4;
  
  /* Warning - Hover */
  --warning-hover: #df6804;
  --warning-hover-rgba: rgba(223 104 4 / 100%);
  --warning-hover-components: 223 104 4;
  
  /* Warning - Disabled */
  --warning-disabled: #a37b59;
  --warning-disabled-rgba: rgba(163 123 89 / 100%);
  --warning-disabled-components: 163 123 89;
  
  /* Warning - Tint */
  --warning-tint: #ff7f04;
  --warning-tint-rgba: rgba(255 127 4 / 100%);
  --warning-tint-components: 255 127 4;
  
  /* Warning - Shade */
  --warning-shade: #df6804;
  --warning-shade-rgba: rgba(223 104 4 / 100%);
  --warning-shade-components: 223 104 4;
  
  /* Warning - Text */
  --warning-text: #000000;
  --warning-text-rgba: rgba(0 0 0 / 100%);
  --warning-text-components: 0 0 0;
  
  /* Warning - Contrast */
  --warning-contrast: #000000;
  --warning-contrast-rgba: rgba(0 0 0 / 100%);
  --warning-contrast-components: 0 0 0;
  
  
  /*
   *
   * Danger
   *
   */
  
  /* Danger - Base */
  --danger: #d44205;
  --danger-rgba: rgba(212 66 5 / 100%);
  --danger-components: 212 66 5;
  
  /* Danger - Hover */
  --danger-hover: #bf3b05;
  --danger-hover-rgba: rgba(191 59 5 / 100%);
  --danger-hover-components: 191 59 5;
  
  /* Danger - Disabled */
  --danger-disabled: #8c604d;
  --danger-disabled-rgba: rgba(140 96 77 / 100%);
  --danger-disabled-components: 140 96 77;
  
  /* Danger - Tint */
  --danger-tint: #e94906;
  --danger-tint-rgba: rgba(233 73 6 / 100%);
  --danger-tint-components: 233 73 6;
  
  /* Danger - Shade */
  --danger-shade: #bf3b05;
  --danger-shade-rgba: rgba(191 59 5 / 100%);
  --danger-shade-components: 191 59 5;
  
  /* Danger - Text */
  --danger-text: #000000;
  --danger-text-rgba: rgba(0 0 0 / 100%);
  --danger-text-components: 0 0 0;
  
  /* Danger - Contrast */
  --danger-contrast: #000000;
  --danger-contrast-rgba: rgba(0 0 0 / 100%);
  --danger-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-red
   *
   */
  
  /* Palette-red - Base */
  --palette-red: #c92510;
  --palette-red-rgba: rgba(201 37 16 / 100%);
  --palette-red-components: 201 37 16;
  
  /* Palette-red - Hover */
  --palette-red-hover: #b5210e;
  --palette-red-hover-rgba: rgba(181 33 14 / 100%);
  --palette-red-hover-components: 181 33 14;
  
  /* Palette-red - Disabled */
  --palette-red-disabled: #885751;
  --palette-red-disabled-rgba: rgba(136 87 81 / 100%);
  --palette-red-disabled-components: 136 87 81;
  
  /* Palette-red - Tint */
  --palette-red-tint: #dd2912;
  --palette-red-tint-rgba: rgba(221 41 18 / 100%);
  --palette-red-tint-components: 221 41 18;
  
  /* Palette-red - Shade */
  --palette-red-shade: #b5210e;
  --palette-red-shade-rgba: rgba(181 33 14 / 100%);
  --palette-red-shade-components: 181 33 14;
  
  /* Palette-red - Text */
  --palette-red-text: #ffffff;
  --palette-red-text-rgba: rgba(255 255 255 / 100%);
  --palette-red-text-components: 255 255 255;
  
  /* Palette-red - Contrast */
  --palette-red-contrast: #ffffff;
  --palette-red-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-red-contrast-components: 255 255 255;
  
  
  /*
   *
   * Palette-orange
   *
   */
  
  /* Palette-orange - Base */
  --palette-orange: #d78a11;
  --palette-orange-rgba: rgba(215 138 17 / 100%);
  --palette-orange-components: 215 138 17;
  
  /* Palette-orange - Hover */
  --palette-orange-hover: #c27c0f;
  --palette-orange-hover-rgba: rgba(194 124 15 / 100%);
  --palette-orange-hover-components: 194 124 15;
  
  /* Palette-orange - Disabled */
  --palette-orange-disabled: #927b56;
  --palette-orange-disabled-rgba: rgba(146 123 86 / 100%);
  --palette-orange-disabled-components: 146 123 86;
  
  /* Palette-orange - Tint */
  --palette-orange-tint: #ed9813;
  --palette-orange-tint-rgba: rgba(237 152 19 / 100%);
  --palette-orange-tint-components: 237 152 19;
  
  /* Palette-orange - Shade */
  --palette-orange-shade: #c27c0f;
  --palette-orange-shade-rgba: rgba(194 124 15 / 100%);
  --palette-orange-shade-components: 194 124 15;
  
  /* Palette-orange - Text */
  --palette-orange-text: #000000;
  --palette-orange-text-rgba: rgba(0 0 0 / 100%);
  --palette-orange-text-components: 0 0 0;
  
  /* Palette-orange - Contrast */
  --palette-orange-contrast: #000000;
  --palette-orange-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-orange-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-yellow
   *
   */
  
  /* Palette-yellow - Base */
  --palette-yellow: #c1d711;
  --palette-yellow-rgba: rgba(193 215 17 / 100%);
  --palette-yellow-components: 193 215 17;
  
  /* Palette-yellow - Hover */
  --palette-yellow-hover: #aec20f;
  --palette-yellow-hover-rgba: rgba(174 194 15 / 100%);
  --palette-yellow-hover-components: 174 194 15;
  
  /* Palette-yellow - Disabled */
  --palette-yellow-disabled: #8b9256;
  --palette-yellow-disabled-rgba: rgba(139 146 86 / 100%);
  --palette-yellow-disabled-components: 139 146 86;
  
  /* Palette-yellow - Tint */
  --palette-yellow-tint: #d4ed13;
  --palette-yellow-tint-rgba: rgba(212 237 19 / 100%);
  --palette-yellow-tint-components: 212 237 19;
  
  /* Palette-yellow - Shade */
  --palette-yellow-shade: #aec20f;
  --palette-yellow-shade-rgba: rgba(174 194 15 / 100%);
  --palette-yellow-shade-components: 174 194 15;
  
  /* Palette-yellow - Text */
  --palette-yellow-text: #000000;
  --palette-yellow-text-rgba: rgba(0 0 0 / 100%);
  --palette-yellow-text-components: 0 0 0;
  
  /* Palette-yellow - Contrast */
  --palette-yellow-contrast: #000000;
  --palette-yellow-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-yellow-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-chartreuse
   *
   */
  
  /* Palette-chartreuse - Base */
  --palette-chartreuse: #52ba0f;
  --palette-chartreuse-rgba: rgba(82 186 15 / 100%);
  --palette-chartreuse-components: 82 186 15;
  
  /* Palette-chartreuse - Hover */
  --palette-chartreuse-hover: #4aa70e;
  --palette-chartreuse-hover-rgba: rgba(74 167 14 / 100%);
  --palette-chartreuse-hover-components: 74 167 14;
  
  /* Palette-chartreuse - Disabled */
  --palette-chartreuse-disabled: #5f7e4b;
  --palette-chartreuse-disabled-rgba: rgba(95 126 75 / 100%);
  --palette-chartreuse-disabled-components: 95 126 75;
  
  /* Palette-chartreuse - Tint */
  --palette-chartreuse-tint: #5acd11;
  --palette-chartreuse-tint-rgba: rgba(90 205 17 / 100%);
  --palette-chartreuse-tint-components: 90 205 17;
  
  /* Palette-chartreuse - Shade */
  --palette-chartreuse-shade: #4aa70e;
  --palette-chartreuse-shade-rgba: rgba(74 167 14 / 100%);
  --palette-chartreuse-shade-components: 74 167 14;
  
  /* Palette-chartreuse - Text */
  --palette-chartreuse-text: #000000;
  --palette-chartreuse-text-rgba: rgba(0 0 0 / 100%);
  --palette-chartreuse-text-components: 0 0 0;
  
  /* Palette-chartreuse - Contrast */
  --palette-chartreuse-contrast: #000000;
  --palette-chartreuse-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-chartreuse-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-green
   *
   */
  
  /* Palette-green - Base */
  --palette-green: #0fba22;
  --palette-green-rgba: rgba(15 186 34 / 100%);
  --palette-green-components: 15 186 34;
  
  /* Palette-green - Hover */
  --palette-green-hover: #0ea71f;
  --palette-green-hover-rgba: rgba(14 167 31 / 100%);
  --palette-green-hover-components: 14 167 31;
  
  /* Palette-green - Disabled */
  --palette-green-disabled: #4b7e51;
  --palette-green-disabled-rgba: rgba(75 126 81 / 100%);
  --palette-green-disabled-components: 75 126 81;
  
  /* Palette-green - Tint */
  --palette-green-tint: #11cd25;
  --palette-green-tint-rgba: rgba(17 205 37 / 100%);
  --palette-green-tint-components: 17 205 37;
  
  /* Palette-green - Shade */
  --palette-green-shade: #0ea71f;
  --palette-green-shade-rgba: rgba(14 167 31 / 100%);
  --palette-green-shade-components: 14 167 31;
  
  /* Palette-green - Text */
  --palette-green-text: #000000;
  --palette-green-text-rgba: rgba(0 0 0 / 100%);
  --palette-green-text-components: 0 0 0;
  
  /* Palette-green - Contrast */
  --palette-green-contrast: #000000;
  --palette-green-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-green-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-emerald
   *
   */
  
  /* Palette-emerald - Base */
  --palette-emerald: #0fba77;
  --palette-emerald-rgba: rgba(15 186 119 / 100%);
  --palette-emerald-components: 15 186 119;
  
  /* Palette-emerald - Hover */
  --palette-emerald-hover: #0ea76b;
  --palette-emerald-hover-rgba: rgba(14 167 107 / 100%);
  --palette-emerald-hover-components: 14 167 107;
  
  /* Palette-emerald - Disabled */
  --palette-emerald-disabled: #4b7e6a;
  --palette-emerald-disabled-rgba: rgba(75 126 106 / 100%);
  --palette-emerald-disabled-components: 75 126 106;
  
  /* Palette-emerald - Tint */
  --palette-emerald-tint: #11cd83;
  --palette-emerald-tint-rgba: rgba(17 205 131 / 100%);
  --palette-emerald-tint-components: 17 205 131;
  
  /* Palette-emerald - Shade */
  --palette-emerald-shade: #0ea76b;
  --palette-emerald-shade-rgba: rgba(14 167 107 / 100%);
  --palette-emerald-shade-components: 14 167 107;
  
  /* Palette-emerald - Text */
  --palette-emerald-text: #000000;
  --palette-emerald-text-rgba: rgba(0 0 0 / 100%);
  --palette-emerald-text-components: 0 0 0;
  
  /* Palette-emerald - Contrast */
  --palette-emerald-contrast: #000000;
  --palette-emerald-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-emerald-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-teal
   *
   */
  
  /* Palette-teal - Base */
  --palette-teal: #0fa7ba;
  --palette-teal-rgba: rgba(15 167 186 / 100%);
  --palette-teal-components: 15 167 186;
  
  /* Palette-teal - Hover */
  --palette-teal-hover: #0e96a7;
  --palette-teal-hover-rgba: rgba(14 150 167 / 100%);
  --palette-teal-hover-components: 14 150 167;
  
  /* Palette-teal - Disabled */
  --palette-teal-disabled: #4b787e;
  --palette-teal-disabled-rgba: rgba(75 120 126 / 100%);
  --palette-teal-disabled-components: 75 120 126;
  
  /* Palette-teal - Tint */
  --palette-teal-tint: #11b8cd;
  --palette-teal-tint-rgba: rgba(17 184 205 / 100%);
  --palette-teal-tint-components: 17 184 205;
  
  /* Palette-teal - Shade */
  --palette-teal-shade: #0e96a7;
  --palette-teal-shade-rgba: rgba(14 150 167 / 100%);
  --palette-teal-shade-components: 14 150 167;
  
  /* Palette-teal - Text */
  --palette-teal-text: #000000;
  --palette-teal-text-rgba: rgba(0 0 0 / 100%);
  --palette-teal-text-components: 0 0 0;
  
  /* Palette-teal - Contrast */
  --palette-teal-contrast: #000000;
  --palette-teal-contrast-rgba: rgba(0 0 0 / 100%);
  --palette-teal-contrast-components: 0 0 0;
  
  
  /*
   *
   * Palette-blue
   *
   */
  
  /* Palette-blue - Base */
  --palette-blue: #0f52ba;
  --palette-blue-rgba: rgba(15 82 186 / 100%);
  --palette-blue-components: 15 82 186;
  
  /* Palette-blue - Hover */
  --palette-blue-hover: #0e4aa7;
  --palette-blue-hover-rgba: rgba(14 74 167 / 100%);
  --palette-blue-hover-components: 14 74 167;
  
  /* Palette-blue - Disabled */
  --palette-blue-disabled: #4b5f7e;
  --palette-blue-disabled-rgba: rgba(75 95 126 / 100%);
  --palette-blue-disabled-components: 75 95 126;
  
  /* Palette-blue - Tint */
  --palette-blue-tint: #115acd;
  --palette-blue-tint-rgba: rgba(17 90 205 / 100%);
  --palette-blue-tint-components: 17 90 205;
  
  /* Palette-blue - Shade */
  --palette-blue-shade: #0e4aa7;
  --palette-blue-shade-rgba: rgba(14 74 167 / 100%);
  --palette-blue-shade-components: 14 74 167;
  
  /* Palette-blue - Text */
  --palette-blue-text: #ffffff;
  --palette-blue-text-rgba: rgba(255 255 255 / 100%);
  --palette-blue-text-components: 255 255 255;
  
  /* Palette-blue - Contrast */
  --palette-blue-contrast: #ffffff;
  --palette-blue-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-blue-contrast-components: 255 255 255;
  
  
  /*
   *
   * Palette-indigo
   *
   */
  
  /* Palette-indigo - Base */
  --palette-indigo: #210fba;
  --palette-indigo-rgba: rgba(33 15 186 / 100%);
  --palette-indigo-components: 33 15 186;
  
  /* Palette-indigo - Hover */
  --palette-indigo-hover: #1e0ea7;
  --palette-indigo-hover-rgba: rgba(30 14 167 / 100%);
  --palette-indigo-hover-components: 30 14 167;
  
  /* Palette-indigo - Disabled */
  --palette-indigo-disabled: #504b7e;
  --palette-indigo-disabled-rgba: rgba(80 75 126 / 100%);
  --palette-indigo-disabled-components: 80 75 126;
  
  /* Palette-indigo - Tint */
  --palette-indigo-tint: #2411cd;
  --palette-indigo-tint-rgba: rgba(36 17 205 / 100%);
  --palette-indigo-tint-components: 36 17 205;
  
  /* Palette-indigo - Shade */
  --palette-indigo-shade: #1e0ea7;
  --palette-indigo-shade-rgba: rgba(30 14 167 / 100%);
  --palette-indigo-shade-components: 30 14 167;
  
  /* Palette-indigo - Text */
  --palette-indigo-text: #ffffff;
  --palette-indigo-text-rgba: rgba(255 255 255 / 100%);
  --palette-indigo-text-components: 255 255 255;
  
  /* Palette-indigo - Contrast */
  --palette-indigo-contrast: #ffffff;
  --palette-indigo-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-indigo-contrast-components: 255 255 255;
  
  
  /*
   *
   * Palette-purple
   *
   */
  
  /* Palette-purple - Base */
  --palette-purple: #770fba;
  --palette-purple-rgba: rgba(119 15 186 / 100%);
  --palette-purple-components: 119 15 186;
  
  /* Palette-purple - Hover */
  --palette-purple-hover: #6b0ea7;
  --palette-purple-hover-rgba: rgba(107 14 167 / 100%);
  --palette-purple-hover-components: 107 14 167;
  
  /* Palette-purple - Disabled */
  --palette-purple-disabled: #6a4b7e;
  --palette-purple-disabled-rgba: rgba(106 75 126 / 100%);
  --palette-purple-disabled-components: 106 75 126;
  
  /* Palette-purple - Tint */
  --palette-purple-tint: #8311cd;
  --palette-purple-tint-rgba: rgba(131 17 205 / 100%);
  --palette-purple-tint-components: 131 17 205;
  
  /* Palette-purple - Shade */
  --palette-purple-shade: #6b0ea7;
  --palette-purple-shade-rgba: rgba(107 14 167 / 100%);
  --palette-purple-shade-components: 107 14 167;
  
  /* Palette-purple - Text */
  --palette-purple-text: #ffffff;
  --palette-purple-text-rgba: rgba(255 255 255 / 100%);
  --palette-purple-text-components: 255 255 255;
  
  /* Palette-purple - Contrast */
  --palette-purple-contrast: #ffffff;
  --palette-purple-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-purple-contrast-components: 255 255 255;
  
  
  /*
   *
   * Palette-pink
   *
   */
  
  /* Palette-pink - Base */
  --palette-pink: #ba0fa7;
  --palette-pink-rgba: rgba(186 15 167 / 100%);
  --palette-pink-components: 186 15 167;
  
  /* Palette-pink - Hover */
  --palette-pink-hover: #a70e96;
  --palette-pink-hover-rgba: rgba(167 14 150 / 100%);
  --palette-pink-hover-components: 167 14 150;
  
  /* Palette-pink - Disabled */
  --palette-pink-disabled: #7e4b78;
  --palette-pink-disabled-rgba: rgba(126 75 120 / 100%);
  --palette-pink-disabled-components: 126 75 120;
  
  /* Palette-pink - Tint */
  --palette-pink-tint: #cd11b8;
  --palette-pink-tint-rgba: rgba(205 17 184 / 100%);
  --palette-pink-tint-components: 205 17 184;
  
  /* Palette-pink - Shade */
  --palette-pink-shade: #a70e96;
  --palette-pink-shade-rgba: rgba(167 14 150 / 100%);
  --palette-pink-shade-components: 167 14 150;
  
  /* Palette-pink - Text */
  --palette-pink-text: #ffffff;
  --palette-pink-text-rgba: rgba(255 255 255 / 100%);
  --palette-pink-text-components: 255 255 255;
  
  /* Palette-pink - Contrast */
  --palette-pink-contrast: #ffffff;
  --palette-pink-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-pink-contrast-components: 255 255 255;
  
  
  /*
   *
   * Palette-magenta
   *
   */
  
  /* Palette-magenta - Base */
  --palette-magenta: #c91058;
  --palette-magenta-rgba: rgba(201 16 88 / 100%);
  --palette-magenta-components: 201 16 88;
  
  /* Palette-magenta - Hover */
  --palette-magenta-hover: #b50e4f;
  --palette-magenta-hover-rgba: rgba(181 14 79 / 100%);
  --palette-magenta-hover-components: 181 14 79;
  
  /* Palette-magenta - Disabled */
  --palette-magenta-disabled: #885166;
  --palette-magenta-disabled-rgba: rgba(136 81 102 / 100%);
  --palette-magenta-disabled-components: 136 81 102;
  
  /* Palette-magenta - Tint */
  --palette-magenta-tint: #dd1261;
  --palette-magenta-tint-rgba: rgba(221 18 97 / 100%);
  --palette-magenta-tint-components: 221 18 97;
  
  /* Palette-magenta - Shade */
  --palette-magenta-shade: #b50e4f;
  --palette-magenta-shade-rgba: rgba(181 14 79 / 100%);
  --palette-magenta-shade-components: 181 14 79;
  
  /* Palette-magenta - Text */
  --palette-magenta-text: #ffffff;
  --palette-magenta-text-rgba: rgba(255 255 255 / 100%);
  --palette-magenta-text-components: 255 255 255;
  
  /* Palette-magenta - Contrast */
  --palette-magenta-contrast: #ffffff;
  --palette-magenta-contrast-rgba: rgba(255 255 255 / 100%);
  --palette-magenta-contrast-components: 255 255 255;
}
`;

describe('generateThemeVariable', () => {
  test('it should generate our default theme if no variables are passed to it', () => {
    const output = ThemeUtils.generateThemeVariableString({});
    expect(output).toEqual(defaultTheme);
  });
});

export {};
