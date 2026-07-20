import * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          loading?: string;
          "aria-label"?: string;
          role?: string;
          tabIndex?: number;
        },
        HTMLElement
      >;
    }
  }
}
