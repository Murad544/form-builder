export interface ExtensionSettings {
  label?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  value?: string | number | boolean;
  options?: Array<string | number>; // For elements like select or radio
  onChange?: (e: any) => void;
  // Add other common properties here

  // For extension-specific properties, you can use an index signature
  [key: string]: any;
}

export interface Extension {
  id?: number;
  extensionId: number;
  name: string;
  slug: string;
  settings?: ExtensionSettings;
  renderSettings?: (settings: ExtensionSettings, handleChange: (value: any, key: any) => void) => JSX.Element;
  render?: (settings: ExtensionSettings) => JSX.Element;
}
