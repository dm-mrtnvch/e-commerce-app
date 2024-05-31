import { AttributePlainEnumValue } from '../types/product-type';

const generateFilter = ({
  productTypes,
  attributes,
  category,
}: {
  productTypes: string[];
  attributes: { [key: string]: AttributePlainEnumValue[] };
  category: string;
}) => {
  let filter = '';
  if (productTypes.length > 0) {
    filter += `productType.id:"${productTypes.join('","')}"`;
  }
  if (Object.keys(attributes).length > 0) {
    const attributesFilter = Object.entries(attributes)
      .map(([key, values]) =>
        values.length > 0
          ? `variants.attributes.${key.toLocaleLowerCase()}.key:"${values.map((value) => value.key).join('","')}"`
          : undefined,
      )
      .filter(Boolean)
      .join('&filter=');
    filter += filter ? `&filter=${attributesFilter}` : attributesFilter;
  }
  if (category) {
    filter += filter ? `&filter=categories.id:"${category}"` : `categories.id:"${category}"`;
  }

  return filter ? filter : undefined;
};

export default generateFilter;
