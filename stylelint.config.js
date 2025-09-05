export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  rules: {
    // Allow custom properties (CSS variables) with --ns- prefix
    "custom-property-pattern": "^ns-[a-z][a-z0-9]*(-[a-z0-9]+)*$",
    // Allow CSS modules class naming patterns
    "selector-class-pattern": null,
    // Allow @keyframes animations
    "keyframes-name-pattern": null,
    // Allow vendor prefixes for better browser support
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    // Allow duplicate properties for progressive enhancement
    "declaration-block-no-duplicate-properties": null,
    // Allow shorthand after longhand for specific overrides
    "declaration-block-no-shorthand-property-overrides": null,
    // Allow IE-specific pseudo-elements and media queries
    "selector-pseudo-element-no-unknown": null,
    "media-feature-name-value-no-unknown": null,
    // Allow both single and double colon pseudo-element notation
    "selector-pseudo-element-colon-notation": null,
    // More flexible color and number formatting
    "color-hex-length": null,
    "alpha-value-notation": null,
    "number-max-precision": null,
    // Allow duplicate selectors (common in CSS modules)
    "no-duplicate-selectors": null,
    // More flexible media query notation
    "media-feature-range-notation": null,
    // Allow redundant longhand properties
    "declaration-block-no-redundant-longhand-properties": null,
    // Allow unknown property values (for newer CSS properties)
    "declaration-property-value-no-unknown": null,
    // More flexible rule spacing
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    // Allow descending specificity (common in CSS modules)
    "no-descending-specificity": null
  }
}
