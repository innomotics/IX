# inno-select



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                 | Default     |
| ------------ | ------------- | ----------- | -------------------- | ----------- |
| `disabled`   | `disabled`    |             | `boolean`            | `false`     |
| `iconDriven` | `icon-driven` |             | `boolean`            | `false`     |
| `isFocused`  | `is-focused`  |             | `boolean`            | `undefined` |
| `label`      | `label`       |             | `string`             | `undefined` |
| `name`       | `name`        |             | `string`             | `undefined` |
| `type`       | `type`        |             | `"number" \| "text"` | `'text'`    |
| `value`      | `value`       |             | `string`             | `undefined` |
| `variant`    | `variant`     |             | `"dark" \| "light"`  | `'light'`   |


## Events

| Event          | Description | Type                  |
| -------------- | ----------- | --------------------- |
| `valueChanged` |             | `CustomEvent<string>` |


## Dependencies

### Depends on

- [inno-icon](../inno-icon)

### Graph
```mermaid
graph TD;
  inno-select --> inno-icon
  style inno-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
