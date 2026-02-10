# Project Notes

## Images

- When using Astro's `<Image>` component, set `width` to 2x the desired display size for retina sharpness. Use CSS `max-width` to constrain the visual size. For example, to display at 400px: `width={800}` + `style="max-width: 400px;"`.
