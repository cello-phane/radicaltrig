// NOTE: Loaded whenever the corresponding markdown has finished rendering
(() => {
  const previousButtonClass = 'tus-back-to-previous';
  const previousButtonDisabledClass = 'tus-back-to-previous--disabled';

  const previousStack = [];
  const previousStackSize = 20;

  const anchorElementList = document.querySelectorAll('a');
  const previousButtonList = document.querySelectorAll('.' + previousButtonClass);
  const origin = new URL(window.location.href).origin;

  const enablePreviousButtons = () => {
    for (const previousButton of previousButtonList)
      previousButton.classList.remove(previousButtonDisabledClass);
  };

  const disablePreviousButtons = () => {
    for (const previousButton of previousButtonList)
      previousButton.classList.add(previousButtonDisabledClass);
  };

  const addToPreviousStack = (href) => {
    enablePreviousButtons();

    if (previousStack.length < previousStackSize) {
      previousStack.push(href);
      return;
    }

    for (let i = 0; i < previousStackSize - 1; i++)
      previousStack[i] = previousStack[i + 1];
    previousStack[previousStackSize - 1] = href;
  };

  const decideAnchorParentHref = (element, testCount = 0) => {
    let currentElement = element;

    while (currentElement.previousSibling) {
      currentElement = currentElement.previousSibling;

      // The next-up headline should be within reach... Avoid useless lag spikes.
      if (++testCount > 100)
        return null;

      if (/^(h|H)[1-9]$/.test(currentElement.tagName) && currentElement.id) {
        const currentUrl = new URL(window.location.href);
        return currentUrl.origin + currentUrl.pathname + '#' + currentElement.id;
      }
    }

    if (element.parentElement)
      return decideAnchorParentHref(element.parentElement, testCount);

    return null;
  };

  const onAnchorClick = (element) => {
    if (!(element.href.startsWith(origin)))
      return;

    const parentHref = decideAnchorParentHref(element);
    const currentHref = window.location.href;

    if (new URL(currentHref).hash)
      addToPreviousStack(currentHref);

    // "Came" from this section, so it should also be pushed onto the stack
    // This type of navigation feels more natural to me
    if (parentHref && currentHref != parentHref)
      addToPreviousStack(parentHref);
  };

  const onPreviousClick = () => {
    const previousHref = previousStack.pop();

    if (previousHref && previousStack.length == 0)
      disablePreviousButtons();

    if (previousHref)
      window.location.href = previousHref;
  };

  // Initially, the stack starts out empty
  disablePreviousButtons();

  for (const previousButton of previousButtonList)
    previousButton.addEventListener('click', onPreviousClick);

  for (const anchorElement of anchorElementList)
    anchorElement.addEventListener('click', event => onAnchorClick(event.target));
})();