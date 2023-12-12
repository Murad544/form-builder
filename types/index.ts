export interface ExtensionSettings {
  label?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
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
  slug: string;
  settings?: ExtensionSettings;
  renderSettings?: (props: ExtensionSettings) => JSX.Element;
  render: (props: ExtensionSettings | undefined) => JSX.Element;
}
