window.Webflow ||= [];
window.Webflow.push(() => {
  // Function to extract price from text content
  function extractPrice(priceText: string) {
    const match = priceText.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  // Function to format price with currency symbol
  function formatPrice(price: number, currency = '$') {
    const formattedPrice = currency === '$' ? `${currency}${price}` : `${price} ${currency}`;
    return formattedPrice;
  }

  const totalElement = document.querySelector('[eigo-element="price"]');
  const currency = totalElement?.getAttribute('eigo-currency') as string;
  let total = 0;

  // Process each accordion item
  const accordions = document.querySelectorAll('[role="rowgroup"]');
  accordions.forEach((accordion) => {
    const prices = accordion.querySelectorAll('[fs-cmssort-field="price"]');
    const allPricesEmpty = Array.from(prices).every((price) => price.textContent === '-');

    if (allPricesEmpty) {
      accordion.remove();
    } else {
      let accordionTotal = 0;
      prices.forEach((price) => {
        const priceText = price.textContent;
        if (priceText && priceText !== '-') {
          const priceValue = extractPrice(priceText);
          accordionTotal += priceValue;
          price.textContent = formatPrice(priceValue, currency);
        }
      });

      const accordionPriceTotal = accordion.querySelector('[eigo-element="domain-price"]');
      if (accordionPriceTotal) {
        accordionPriceTotal.textContent = formatPrice(accordionTotal, currency);
      }
    }
  });

  // Process each price element
  const priceElements = document.querySelectorAll('[fs-cmssort-field="price"]');
  priceElements.forEach((priceElement) => {
    const row = priceElement.closest('.home_how-it-works_item');
    if (!row) return;

    const priceText = priceElement.textContent;
    if (priceText === '-') {
      row.remove();
    } else {
      const priceValue = priceText ? extractPrice(priceText) : 0;
      total += priceValue;
      priceElement.textContent = formatPrice(priceValue, currency);
    }
  });

  // Update the total element
  if (totalElement) {
    totalElement.textContent = formatPrice(total, currency);
  }
});
