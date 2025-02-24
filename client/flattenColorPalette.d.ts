declare module "tailwindcss/lib/util/flattenColorPalette.js" {
  type ColorValue = string | ColorPalette;
  interface ColorPalette {
    [key: string]: ColorValue;
  }
  /**
   * Fungsi ini menerima objek warna (yang bisa bersarang) dan mengembalikannya
   * sebagai objek datar dengan kunci berupa string (misalnya "gray-100") dan
   * nilai berupa string warna.
   */
  export default function flattenColorPalette(colors: ColorPalette): Record<string, string>;
}
