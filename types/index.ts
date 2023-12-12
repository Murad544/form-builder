export interface ExtensionProps {
  label?: string;
  placeholder?: string;
  value?: string | number | boolean;
  options?: Array<string | number>; // For elements like select or radio
  onChange?: (value: string | number | boolean) => void;
  // Add other common properties here

  // For extension-specific properties, you can use an index signature
  [key: string]: any;
}

export interface Extension {
  id: number;
  name: string;
  extension: string;
  settings?: ExtensionProps;
}
