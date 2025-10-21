
export interface SheetRow {
  'مسلسل': string;
  'الكود': string;
  'اسم الصنف': string;
  'الوحدة': string;
  'سعر الوحدة': string;
  'اخر سعر': string;
  'الكمية': string;
  'اجمالي': string;
  [key: string]: string; // Index signature to allow dynamic access
}
