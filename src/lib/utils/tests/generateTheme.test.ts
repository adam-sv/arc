import { ThemeUtils } from '@adam-sv/arc';

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
   * Red
   *
   */
  
  /* Red - Base */
  --red: #d44205;
  --red-rgba: rgba(212 66 5 / 100%);
  --red-components: 212 66 5;
  
  /* Red - Hover */
  --red-hover: #bf3b05;
  --red-hover-rgba: rgba(191 59 5 / 100%);
  --red-hover-components: 191 59 5;
  
  /* Red - Disabled */
  --red-disabled: #8c604d;
  --red-disabled-rgba: rgba(140 96 77 / 100%);
  --red-disabled-components: 140 96 77;
  
  /* Red - Tint */
  --red-tint: #e94906;
  --red-tint-rgba: rgba(233 73 6 / 100%);
  --red-tint-components: 233 73 6;
  
  /* Red - Shade */
  --red-shade: #bf3b05;
  --red-shade-rgba: rgba(191 59 5 / 100%);
  --red-shade-components: 191 59 5;
  
  /* Red - Text */
  --red-text: #000000;
  --red-text-rgba: rgba(0 0 0 / 100%);
  --red-text-components: 0 0 0;
  
  /* Red - Contrast */
  --red-contrast: #000000;
  --red-contrast-rgba: rgba(0 0 0 / 100%);
  --red-contrast-components: 0 0 0;
  
  
  /*
   *
   * Orange
   *
   */
  
  /* Orange - Base */
  --orange: #f87304;
  --orange-rgba: rgba(248 115 4 / 100%);
  --orange-components: 248 115 4;
  
  /* Orange - Hover */
  --orange-hover: #df6804;
  --orange-hover-rgba: rgba(223 104 4 / 100%);
  --orange-hover-components: 223 104 4;
  
  /* Orange - Disabled */
  --orange-disabled: #a37b59;
  --orange-disabled-rgba: rgba(163 123 89 / 100%);
  --orange-disabled-components: 163 123 89;
  
  /* Orange - Tint */
  --orange-tint: #ff7f04;
  --orange-tint-rgba: rgba(255 127 4 / 100%);
  --orange-tint-components: 255 127 4;
  
  /* Orange - Shade */
  --orange-shade: #df6804;
  --orange-shade-rgba: rgba(223 104 4 / 100%);
  --orange-shade-components: 223 104 4;
  
  /* Orange - Text */
  --orange-text: #000000;
  --orange-text-rgba: rgba(0 0 0 / 100%);
  --orange-text-components: 0 0 0;
  
  /* Orange - Contrast */
  --orange-contrast: #000000;
  --orange-contrast-rgba: rgba(0 0 0 / 100%);
  --orange-contrast-components: 0 0 0;
  
  
  /*
   *
   * Yellow
   *
   */
  
  /* Yellow - Base */
  --yellow: #f8e71c;
  --yellow-rgba: rgba(248 231 28 / 100%);
  --yellow-components: 248 231 28;
  
  /* Yellow - Hover */
  --yellow-hover: #dfd019;
  --yellow-hover-rgba: rgba(223 208 25 / 100%);
  --yellow-hover-components: 223 208 25;
  
  /* Yellow - Disabled */
  --yellow-disabled: #aba669;
  --yellow-disabled-rgba: rgba(171 166 105 / 100%);
  --yellow-disabled-components: 171 166 105;
  
  /* Yellow - Tint */
  --yellow-tint: #fffe1f;
  --yellow-tint-rgba: rgba(255 254 31 / 100%);
  --yellow-tint-components: 255 254 31;
  
  /* Yellow - Shade */
  --yellow-shade: #dfd019;
  --yellow-shade-rgba: rgba(223 208 25 / 100%);
  --yellow-shade-components: 223 208 25;
  
  /* Yellow - Text */
  --yellow-text: #000000;
  --yellow-text-rgba: rgba(0 0 0 / 100%);
  --yellow-text-components: 0 0 0;
  
  /* Yellow - Contrast */
  --yellow-contrast: #000000;
  --yellow-contrast-rgba: rgba(0 0 0 / 100%);
  --yellow-contrast-components: 0 0 0;
  
  
  /*
   *
   * Chartreuse
   *
   */
  
  /* Chartreuse - Base */
  --chartreuse: #c1d711;
  --chartreuse-rgba: rgba(193 215 17 / 100%);
  --chartreuse-components: 193 215 17;
  
  /* Chartreuse - Hover */
  --chartreuse-hover: #aec20f;
  --chartreuse-hover-rgba: rgba(174 194 15 / 100%);
  --chartreuse-hover-components: 174 194 15;
  
  /* Chartreuse - Disabled */
  --chartreuse-disabled: #8b9256;
  --chartreuse-disabled-rgba: rgba(139 146 86 / 100%);
  --chartreuse-disabled-components: 139 146 86;
  
  /* Chartreuse - Tint */
  --chartreuse-tint: #d4ed13;
  --chartreuse-tint-rgba: rgba(212 237 19 / 100%);
  --chartreuse-tint-components: 212 237 19;
  
  /* Chartreuse - Shade */
  --chartreuse-shade: #aec20f;
  --chartreuse-shade-rgba: rgba(174 194 15 / 100%);
  --chartreuse-shade-components: 174 194 15;
  
  /* Chartreuse - Text */
  --chartreuse-text: #000000;
  --chartreuse-text-rgba: rgba(0 0 0 / 100%);
  --chartreuse-text-components: 0 0 0;
  
  /* Chartreuse - Contrast */
  --chartreuse-contrast: #000000;
  --chartreuse-contrast-rgba: rgba(0 0 0 / 100%);
  --chartreuse-contrast-components: 0 0 0;
  
  
  /*
   *
   * Green
   *
   */
  
  /* Green - Base */
  --green: #26d17b;
  --green-rgba: rgba(38 209 123 / 100%);
  --green-components: 38 209 123;
  
  /* Green - Hover */
  --green-hover: #22bc6f;
  --green-hover-rgba: rgba(34 188 111 / 100%);
  --green-hover-components: 34 188 111;
  
  /* Green - Disabled */
  --green-disabled: #62957b;
  --green-disabled-rgba: rgba(98 149 123 / 100%);
  --green-disabled-components: 98 149 123;
  
  /* Green - Tint */
  --green-tint: #2ae687;
  --green-tint-rgba: rgba(42 230 135 / 100%);
  --green-tint-components: 42 230 135;
  
  /* Green - Shade */
  --green-shade: #22bc6f;
  --green-shade-rgba: rgba(34 188 111 / 100%);
  --green-shade-components: 34 188 111;
  
  /* Green - Text */
  --green-text: #000000;
  --green-text-rgba: rgba(0 0 0 / 100%);
  --green-text-components: 0 0 0;
  
  /* Green - Contrast */
  --green-contrast: #000000;
  --green-contrast-rgba: rgba(0 0 0 / 100%);
  --green-contrast-components: 0 0 0;
  
  
  /*
   *
   * Emerald
   *
   */
  
  /* Emerald - Base */
  --emerald: #26d17b;
  --emerald-rgba: rgba(38 209 123 / 100%);
  --emerald-components: 38 209 123;
  
  /* Emerald - Hover */
  --emerald-hover: #22bc6f;
  --emerald-hover-rgba: rgba(34 188 111 / 100%);
  --emerald-hover-components: 34 188 111;
  
  /* Emerald - Disabled */
  --emerald-disabled: #62957b;
  --emerald-disabled-rgba: rgba(98 149 123 / 100%);
  --emerald-disabled-components: 98 149 123;
  
  /* Emerald - Tint */
  --emerald-tint: #2ae687;
  --emerald-tint-rgba: rgba(42 230 135 / 100%);
  --emerald-tint-components: 42 230 135;
  
  /* Emerald - Shade */
  --emerald-shade: #22bc6f;
  --emerald-shade-rgba: rgba(34 188 111 / 100%);
  --emerald-shade-components: 34 188 111;
  
  /* Emerald - Text */
  --emerald-text: #000000;
  --emerald-text-rgba: rgba(0 0 0 / 100%);
  --emerald-text-components: 0 0 0;
  
  /* Emerald - Contrast */
  --emerald-contrast: #000000;
  --emerald-contrast-rgba: rgba(0 0 0 / 100%);
  --emerald-contrast-components: 0 0 0;
  
  
  /*
   *
   * Teal
   *
   */
  
  /* Teal - Base */
  --teal: #26d1c1;
  --teal-rgba: rgba(38 209 193 / 100%);
  --teal-components: 38 209 193;
  
  /* Teal - Hover */
  --teal-hover: #22bcae;
  --teal-hover-rgba: rgba(34 188 174 / 100%);
  --teal-hover-components: 34 188 174;
  
  /* Teal - Disabled */
  --teal-disabled: #629590;
  --teal-disabled-rgba: rgba(98 149 144 / 100%);
  --teal-disabled-components: 98 149 144;
  
  /* Teal - Tint */
  --teal-tint: #2ae6d4;
  --teal-tint-rgba: rgba(42 230 212 / 100%);
  --teal-tint-components: 42 230 212;
  
  /* Teal - Shade */
  --teal-shade: #22bcae;
  --teal-shade-rgba: rgba(34 188 174 / 100%);
  --teal-shade-components: 34 188 174;
  
  /* Teal - Text */
  --teal-text: #000000;
  --teal-text-rgba: rgba(0 0 0 / 100%);
  --teal-text-components: 0 0 0;
  
  /* Teal - Contrast */
  --teal-contrast: #000000;
  --teal-contrast-rgba: rgba(0 0 0 / 100%);
  --teal-contrast-components: 0 0 0;
  
  
  /*
   *
   * Blue
   *
   */
  
  /* Blue - Base */
  --blue: #0f52ba;
  --blue-rgba: rgba(15 82 186 / 100%);
  --blue-components: 15 82 186;
  
  /* Blue - Hover */
  --blue-hover: #115acd;
  --blue-hover-rgba: rgba(17 90 205 / 100%);
  --blue-hover-components: 17 90 205;
  
  /* Blue - Disabled */
  --blue-disabled: #4b5f7e;
  --blue-disabled-rgba: rgba(75 95 126 / 100%);
  --blue-disabled-components: 75 95 126;
  
  /* Blue - Tint */
  --blue-tint: #115acd;
  --blue-tint-rgba: rgba(17 90 205 / 100%);
  --blue-tint-components: 17 90 205;
  
  /* Blue - Shade */
  --blue-shade: #0e4aa7;
  --blue-shade-rgba: rgba(14 74 167 / 100%);
  --blue-shade-components: 14 74 167;
  
  /* Blue - Text */
  --blue-text: #ffffff;
  --blue-text-rgba: rgba(255 255 255 / 100%);
  --blue-text-components: 255 255 255;
  
  /* Blue - Contrast */
  --blue-contrast: #ffffff;
  --blue-contrast-rgba: rgba(255 255 255 / 100%);
  --blue-contrast-components: 255 255 255;
  
  
  /*
   *
   * Indigo
   *
   */
  
  /* Indigo - Base */
  --indigo: #111e6c;
  --indigo-rgba: rgba(17 30 108 / 100%);
  --indigo-components: 17 30 108;
  
  /* Indigo - Hover */
  --indigo-hover: #132177;
  --indigo-hover-rgba: rgba(19 33 119 / 100%);
  --indigo-hover-components: 19 33 119;
  
  /* Indigo - Disabled */
  --indigo-disabled: #31354c;
  --indigo-disabled-rgba: rgba(49 53 76 / 100%);
  --indigo-disabled-components: 49 53 76;
  
  /* Indigo - Tint */
  --indigo-tint: #132177;
  --indigo-tint-rgba: rgba(19 33 119 / 100%);
  --indigo-tint-components: 19 33 119;
  
  /* Indigo - Shade */
  --indigo-shade: #0f1b61;
  --indigo-shade-rgba: rgba(15 27 97 / 100%);
  --indigo-shade-components: 15 27 97;
  
  /* Indigo - Text */
  --indigo-text: #ffffff;
  --indigo-text-rgba: rgba(255 255 255 / 100%);
  --indigo-text-components: 255 255 255;
  
  /* Indigo - Contrast */
  --indigo-contrast: #ffffff;
  --indigo-contrast-rgba: rgba(255 255 255 / 100%);
  --indigo-contrast-components: 255 255 255;
  
  
  /*
   *
   * Purple
   *
   */
  
  /* Purple - Base */
  --purple: #420fb8;
  --purple-rgba: rgba(66 15 184 / 100%);
  --purple-components: 66 15 184;
  
  /* Purple - Hover */
  --purple-hover: #4911ca;
  --purple-hover-rgba: rgba(73 17 202 / 100%);
  --purple-hover-components: 73 17 202;
  
  /* Purple - Disabled */
  --purple-disabled: #594a7d;
  --purple-disabled-rgba: rgba(89 74 125 / 100%);
  --purple-disabled-components: 89 74 125;
  
  /* Purple - Tint */
  --purple-tint: #4911ca;
  --purple-tint-rgba: rgba(73 17 202 / 100%);
  --purple-tint-components: 73 17 202;
  
  /* Purple - Shade */
  --purple-shade: #3b0ea6;
  --purple-shade-rgba: rgba(59 14 166 / 100%);
  --purple-shade-components: 59 14 166;
  
  /* Purple - Text */
  --purple-text: #ffffff;
  --purple-text-rgba: rgba(255 255 255 / 100%);
  --purple-text-components: 255 255 255;
  
  /* Purple - Contrast */
  --purple-contrast: #ffffff;
  --purple-contrast-rgba: rgba(255 255 255 / 100%);
  --purple-contrast-components: 255 255 255;
  
  
  /*
   *
   * Pink
   *
   */
  
  /* Pink - Base */
  --pink: #ff8fd0;
  --pink-rgba: rgba(255 143 208 / 100%);
  --pink-components: 255 143 208;
  
  /* Pink - Hover */
  --pink-hover: #e681bb;
  --pink-hover-rgba: rgba(230 129 187 / 100%);
  --pink-hover-components: 230 129 187;
  
  /* Pink - Disabled */
  --pink-disabled: #d8b6ca;
  --pink-disabled-rgba: rgba(216 182 202 / 100%);
  --pink-disabled-components: 216 182 202;
  
  /* Pink - Tint */
  --pink-tint: #ff9de5;
  --pink-tint-rgba: rgba(255 157 229 / 100%);
  --pink-tint-components: 255 157 229;
  
  /* Pink - Shade */
  --pink-shade: #e681bb;
  --pink-shade-rgba: rgba(230 129 187 / 100%);
  --pink-shade-components: 230 129 187;
  
  /* Pink - Text */
  --pink-text: #000000;
  --pink-text-rgba: rgba(0 0 0 / 100%);
  --pink-text-components: 0 0 0;
  
  /* Pink - Contrast */
  --pink-contrast: #000000;
  --pink-contrast-rgba: rgba(0 0 0 / 100%);
  --pink-contrast-components: 0 0 0;
  
  
  /*
   *
   * Magenta
   *
   */
  
  /* Magenta - Base */
  --magenta: #cc338b;
  --magenta-rgba: rgba(204 51 139 / 100%);
  --magenta-components: 204 51 139;
  
  /* Magenta - Hover */
  --magenta-hover: #e03899;
  --magenta-hover-rgba: rgba(224 56 153 / 100%);
  --magenta-hover-components: 224 56 153;
  
  /* Magenta - Disabled */
  --magenta-disabled: #966983;
  --magenta-disabled-rgba: rgba(150 105 131 / 100%);
  --magenta-disabled-components: 150 105 131;
  
  /* Magenta - Tint */
  --magenta-tint: #e03899;
  --magenta-tint-rgba: rgba(224 56 153 / 100%);
  --magenta-tint-components: 224 56 153;
  
  /* Magenta - Shade */
  --magenta-shade: #b82e7d;
  --magenta-shade-rgba: rgba(184 46 125 / 100%);
  --magenta-shade-components: 184 46 125;
  
  /* Magenta - Text */
  --magenta-text: #ffffff;
  --magenta-text-rgba: rgba(255 255 255 / 100%);
  --magenta-text-components: 255 255 255;
  
  /* Magenta - Contrast */
  --magenta-contrast: #ffffff;
  --magenta-contrast-rgba: rgba(255 255 255 / 100%);
  --magenta-contrast-components: 255 255 255;
}
`;

describe('generateThemeVariable', () => {
  test('it should generate our default theme if no variables are passed to it', () => {
    const output = ThemeUtils.generateThemeVariableString({});
    expect(output).toEqual(defaultTheme);
  });
});

export {};
