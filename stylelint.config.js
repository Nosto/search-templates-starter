export default {
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  rules: {
    "custom-property-pattern": "^ns-[a-z][a-z0-9]*(-[a-z0-9]+)*$",
    "selector-class-pattern": null,
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "alpha-value-notation": null,
    "color-hex-length": null,
    "number-max-precision": null,
    "media-feature-range-notation": null,
    "declaration-block-no-duplicate-properties": null,
    "no-duplicate-selectors": null,
    "selector-pseudo-element-colon-notation": null,
    "selector-pseudo-element-no-unknown": null,
    "media-feature-name-value-no-unknown": null,
    "declaration-property-value-no-unknown": null,
    "declaration-block-no-shorthand-property-overrides": null,
    "no-descending-specificity": null,
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    // Enforce modern CSS standards
    "property-disallowed-list": [
      // Disallow deprecated MS vendor prefixes
      "-ms-flex",
      "-ms-flex-direction",
      "-ms-flex-pack",
      "-ms-user-select",
      "-ms-transform",
      "-ms-transition"
    ],
    "selector-pseudo-element-disallowed-list": [
      // Disallow deprecated MS pseudo-elements
      "ms-expand"
    ]
  }
}
