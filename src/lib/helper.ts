function removeSvelteClasses(element: Node) {
	if (element instanceof HTMLElement) {
		element.classList.forEach((className) => {
			if (className.startsWith('s-') || className.startsWith('svelte-')) {
				element.classList.remove(className);
			}
		});
	}

	for (let i = 0; i < element.childNodes.length; i++) {
		removeSvelteClasses(element.childNodes[i]);
	}

	return element;
}

export { removeSvelteClasses };
