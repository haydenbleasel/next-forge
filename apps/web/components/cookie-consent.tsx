"use client";
import React, { useEffect } from "react";
import * as vCookieConsent from "vanilla-cookieconsent";
import type { CookieConsentConfig } from "vanilla-cookieconsent";
import { useTheme } from "next-themes";

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  onFirstConsent: function () {
    console.log("onFirstAction fired");
  },

  onConsent: function ({ cookie }) {
    console.log("onConsent fired ...", cookie);
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log("onChange fired ...", changedCategories, cookie);
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
  },

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly. <a href="#privacy-policy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>',
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          //closeIconLabel: 'Close',
          footer: `
            <a href="#link">Privacy Policy</a>
            <a href="#link">Impressum</a>
          `,
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie Usage",
              description:
                'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc__link">privacy policy</a>.',
            },
            {
              title: "Strictly necessary cookies",
              description: "Description",
              linkedCategory: "necessary",
            },
            {
              title: "Performance and Analytics cookies",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description:
                      'Cookie set by <a href="#das">Google Analytics</a>.',
                    expiration: "Expires after 12 days",
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description:
                      'Cookie set by <a href="#das">Google Analytics</a>',
                    expiration: "Session",
                  },
                ],
              },
            },
            {
              title: "More information",
              description:
                'For any queries in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
    },
  },
};

export function CookieConsent() {
  const { theme } = useTheme();

  useEffect(() => {
    // Add custom CSS variables to match the theme
    const addCustomStyles = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        #cc-main {
          --cc-bg: hsl(var(--background));
          --cc-text: hsl(var(--foreground));
          --cc-btn-primary-bg: hsl(var(--primary));
          --cc-btn-primary-text: hsl(var(--primary-foreground));
          --cc-btn-primary-hover-bg: hsl(var(--primary) / 0.9);
          --cc-btn-secondary-bg: hsl(var(--secondary));
          --cc-btn-secondary-text: hsl(var(--secondary-foreground));
          --cc-btn-secondary-hover-bg: hsl(var(--secondary) / 0.9);
          --cc-toggle-on-bg: hsl(var(--primary));
          --cc-toggle-off-bg: hsl(var(--muted));
          --cc-toggle-on-knob-bg: hsl(var(--primary-foreground));
          --cc-toggle-off-knob-bg: hsl(var(--muted-foreground) / 0.5);
          --cc-modal-bg: hsl(var(--background));
          --cc-modal-text: hsl(var(--foreground));
          --cc-cookie-category-block-bg: hsl(var(--muted) / 0.1);
          --cc-cookie-category-block-border: hsl(var(--border));
          --cc-section-border: hsl(var(--border));
          --cc-cookie-table-border: hsl(var(--border));
          --cc-overlay-bg: hsl(var(--background) / 0.8);
          --cc-link-color: hsl(var(--primary));
        }
      `;
      document.head.appendChild(style);
    };

    addCustomStyles();
    vCookieConsent.run(pluginConfig);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("cc--darkmode");
    } else {
      document.documentElement.classList.remove("cc--darkmode");
    }
  }, [theme]);

  return <></>;
}
