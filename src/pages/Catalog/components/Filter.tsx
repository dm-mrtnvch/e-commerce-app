import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGetProductTypesQuery } from '../../../redux/services/product-types';
import { AttributeEnumType, AttributePlainEnumValue, ProductType } from '../../../types/product-type';
import { FilterList } from '@mui/icons-material';

interface Props {
  selectedProductTypes: string[];
  setSelectedProductTypes: Dispatch<SetStateAction<string[]>>;
  selectedAttributes: { [key: string]: AttributePlainEnumValue[] };
  setSelectedAttributes: Dispatch<SetStateAction<{ [key: string]: AttributePlainEnumValue[] }>>;
}

interface Attribute {
  name: string;
  values: AttributePlainEnumValue[];
}

const extractAttributes = (data: ProductType[]): Attribute[] => {
  const attributesMap = new Map();

  data.forEach((productType) => {
    productType?.attributes?.forEach((attribute) => {
      if (attribute.type.name === 'enum') {
        if (!attributesMap.has(attribute.name)) {
          attributesMap.set(attribute.name, {
            name: attribute.label['en-US'],
            values: [],
          });
        }
        attribute.type.values.forEach((value) => {
          attributesMap.get(attribute.name).values.find((v: AttributeEnumType['values'][0]) => v.key === value.key) ||
            attributesMap.get(attribute.name).values.push({
              key: value.key,
              label: value.label,
            });
        });
      }
    });
  });

  return Array.from(attributesMap.values());
};

const Filter = ({
  selectedProductTypes,
  setSelectedProductTypes,
  selectedAttributes,
  setSelectedAttributes,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetProductTypesQuery({});
  const productTypes = data?.results?.map((type) => ({
    id: type.id,
    name: type.name,
  }));
  const attributes = extractAttributes(data?.results || []);

  const handleChangeSelectedProductTypes = (value: string[]) => {
    setSelectedProductTypes(value);
  };

  const handleChange = (key: string, value: AttributePlainEnumValue[]) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [key]: value,
    });
  };

  const handleOpenFilter = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='text' color='inherit' endIcon={<FilterList />} onClick={handleOpenFilter}>
        Filters
      </Button>
      <Drawer
        open={open}
        anchor='right'
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography variant='h6'>Filters</Typography>
          <Divider />
          <Typography variant='subtitle2'>Product Types</Typography>
          <Stack>
            {!isLoading ? (
              productTypes?.map((type) => (
                <FormControlLabel
                  key={type.id}
                  label={type.name}
                  control={<Checkbox size='small' />}
                  checked={selectedProductTypes.includes(type.id)}
                  onChange={(e) =>
                    handleChangeSelectedProductTypes(
                      (e.target as HTMLInputElement).checked
                        ? [...selectedProductTypes, type.id]
                        : selectedProductTypes.filter((b) => b !== type.id),
                    )
                  }
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: 14,
                    },
                  }}
                />
              ))
            ) : (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <FormControlLabel
                    key={index}
                    label={<Skeleton variant='text' width='150px' component='div' />}
                    control={<Checkbox size='small' />}
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: 14,
                      },
                    }}
                  />
                ))}
              </>
            )}
          </Stack>

          <Divider />
          <Typography variant='subtitle2'>Attributes</Typography>
          <Stack spacing={1}>
            {attributes.map((attribute) => (
              <Autocomplete
                multiple
                loading={isLoading}
                key={attribute.name}
                options={attribute.values}
                value={selectedAttributes[attribute.name] || []}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.key === value.key}
                onChange={(_, value) => handleChange(attribute.name, value)}
                renderInput={(params) => (
                  <TextField {...params} size='small' variant='outlined' label={attribute.name} />
                )}
              />
            ))}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default Filter;
