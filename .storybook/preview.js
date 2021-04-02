import { addParameters } from "@storybook/react";

const customViewports = {
  DesktopSmall: {
    name: "1024x768",
    styles: {
      width: "1024px",
      height: "768px"
    }
  },
  MacBookPro13: {
    name: 'MacBook Pro 13"',
    styles: {
      width: "1680px",
      height: "1050px"
    }
  }
};

addParameters({
  viewport: { viewports: customViewports }
});
