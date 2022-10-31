export function useClick(context, options = {}) {
  const { open } = context;
  const { enabled = true, toggle = true } = options;

  if (!enabled) return {};

  return {
    reference: {
      onClick(_event) {
        if (open.value && toggle) {
          open.value = false;
        } else {
          open.value = true;
        }
      },
    },
  };
}

// with the current implementation, this should be run only once
// and reactive context and
export function useClickInteractionware(options = {}) {
  return {
    name: 'useClickware',
    fn(context) {
      return useClick(context, options);
    },
  };
}
