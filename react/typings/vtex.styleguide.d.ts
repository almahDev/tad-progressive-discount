declare module "vtex.styleguide" {
  // eslint-disable-next-line no-unused-vars
  import { ComponentType } from "react";

  export const Input: ComponentType<ComponentProps>;
  export const Button: ComponentType<ComponentProps>;
  export const Spinner: ComponentType<ComponentProps>;
  export const Modal: ComponentType<ComponentProps>;
  export const EXPERIMENTAL_Select: ComponentType<ComponentProps>;

  interface ComponentProps {
    [key: string]: any;
  }
}
